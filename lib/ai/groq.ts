import OpenAI from 'openai'
import { getSystemPromptBangla } from './router'

let groq: OpenAI | null = null

function getGroqClient() {
  if (!groq) {
    groq = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: 'https://api.groq.com/openai/v1',
    })
  }
  return groq
}

export interface GroqResponse {
  content: string
  tokensUsed: number
  model: string
}

export async function getGroqResponse(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  userTier: 'free' | 'pro' | 'family' = 'free'
): Promise<GroqResponse> {
  try {
    // Free tier: llama-3.1-8b-instant (14,400 RPD)
    // Pro tier: llama-3.3-70b-versatile (1,000 RPD, better quality)
    const model = userTier === 'free' 
      ? 'llama-3.1-8b-instant' 
      : 'llama-3.3-70b-versatile'

    const systemPrompt = getSystemPromptBangla('groq')

    const response = await getGroqClient().chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 1,
    })

    const content = response.choices[0]?.message?.content || ''
    const tokensUsed = response.usage?.total_tokens || 0

    return {
      content,
      tokensUsed,
      model,
    }
  } catch (error) {
    console.error('[Groq Error]', error)
    throw new Error('Failed to get response from Groq. Please try again.')
  }
}

/**
 * Stream-based Groq response for real-time chat
 */
export async function streamGroqResponse(
  messages: Array<{ role: 'user' | 'assistant'; content: string }>,
  onChunk: (chunk: string) => void,
  userTier: 'free' | 'pro' | 'family' = 'free'
): Promise<{ fullContent: string; tokensUsed: number }> {
  try {
    const model = userTier === 'free' 
      ? 'llama-3.1-8b-instant' 
      : 'llama-3.3-70b-versatile'

    const systemPrompt = getSystemPromptBangla('groq')

    const stream = await groq.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 1,
      stream: true,
    })

    let fullContent = ''
    let tokensUsed = 0

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || ''
      if (content) {
        fullContent += content
        onChunk(content)
      }

      if (chunk.usage) {
        tokensUsed = chunk.usage.total_tokens
      }
    }

    return { fullContent, tokensUsed }
  } catch (error) {
    console.error('[Groq Stream Error]', error)
    throw new Error('Failed to stream response from Groq. Please try again.')
  }
}
