import { NextRequest, NextResponse } from 'next/server'
import { createClient as createServerClient } from '@/lib/supabase/server'
import { analyzeQuestion, shouldUseGemini, RouteDecision } from '@/lib/ai/router'
import { getGeminiResponse } from '@/lib/ai/gemini'
import { getGroqResponse } from '@/lib/ai/groq'
import { z } from 'zod'
import { toast } from 'sonner'

const ChatRequestSchema = z.object({
  sessionId: z.string(),
  message: z.string().min(1),
  userTier: z.enum(['free', 'pro', 'family']).optional().default('free'),
  userPreference: z.enum(['auto', 'groq', 'gemini']).optional().default('auto'),
})

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()

    // Check authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validation = ChatRequestSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: validation.error },
        { status: 400 }
      )
    }

    const { sessionId, message, userTier, userPreference } = validation.data

    // Verify session ownership
    const { data: session, error: sessionError } = await supabase
      .from('chat_sessions')
      .select('id')
      .eq('id', sessionId)
      .eq('user_id', user.id)
      .single()

    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Get user profile for quota tracking
    const { data: userProfile } = await supabase
      .from('users')
      .select('daily_chat_count, daily_chat_limit, daily_gemini_vision_count, daily_gemini_vision_limit')
      .eq('id', user.id)
      .single()

    // Check chat quota
    if (userProfile && userProfile.daily_chat_count >= userProfile.daily_chat_limit) {
      return NextResponse.json(
        { error: 'দৈনিক চ্যাট সীমা অতিক্রম করেছেন। আগামীকাল পুনরায় চেষ্টা করুন বা আপগ্রেড করুন।' },
        { status: 429 }
      )
    }

    // Store user message
    const { data: userMessageData, error: userMessageError } = await supabase
      .from('messages')
      .insert({
        session_id: sessionId,
        role: 'user',
        content: message,
      })
      .select()
      .single()

    if (userMessageError) {
      return NextResponse.json(
        { error: 'Failed to store message' },
        { status: 500 }
      )
    }

    // Analyze question for routing
    const routeDecision = await analyzeQuestion(message, userTier, userPreference)

    let response: { content: string; model: string; citations?: string[] }

    // Decide which AI to use
    if (shouldUseGemini(routeDecision, userProfile?.daily_gemini_vision_count ?? 0)) {
      try {
        const geminiRes = await getGeminiResponse(
          [{ role: 'user', content: message }]
        )
        response = {
          content: geminiRes.content,
          model: 'gemini-3.5-flash',
          citations: geminiRes.citations,
        }
      } catch (geminiError) {
        console.error('[Gemini Fallback Error]', geminiError)
        // Fallback to Groq
        const groqRes = await getGroqResponse(
          [{ role: 'user', content: message }],
          userTier
        )
        response = {
          content: `⚡ দ্রুত টিউটর ব্যবহার করা হচ্ছে — প্রিমিয়াম টিউটরের জন্য আপগ্রেড করুন\n\n${groqRes.content}`,
          model: 'groq-fast',
        }
      }
    } else {
      const groqRes = await getGroqResponse(
        [{ role: 'user', content: message }],
        userTier
      )
      response = {
        content: groqRes.content,
        model: 'groq-fast',
      }
    }

    // Store AI response
    const { data: aiMessageData, error: aiMessageError } = await supabase
      .from('messages')
      .insert({
        session_id: sessionId,
        role: 'assistant',
        content: response.content,
        ai_model: response.model,
        citations: response.citations ? JSON.stringify(response.citations) : [],
      })
      .select()
      .single()

    if (aiMessageError) {
      console.error('Failed to store AI message:', aiMessageError)
    }

    // Update user chat quota
    await supabase.rpc('increment_daily_chat_count', { user_id: user.id })

    // Update session
    await supabase
      .from('chat_sessions')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', sessionId)

    return NextResponse.json({
      success: true,
      userMessage: userMessageData,
      aiMessage: aiMessageData,
      routingInfo: routeDecision,
    })
  } catch (error) {
    console.error('[Chat API Error]', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
