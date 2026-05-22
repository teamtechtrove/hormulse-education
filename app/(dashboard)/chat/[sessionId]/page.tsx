'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { Send, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  created_at: string
}

export default function ChatPage() {
  const router = useRouter()
  const params = useParams()
  const supabase = createClient()
  const sessionId = params.sessionId as string

  const [user, setUser] = useState<any>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [userProfile, setUserProfile] = useState<any>(null)
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionLoading, setSessionLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/login')
        return
      }

      setUser(user)

      // Fetch user profile
      const { data: profile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()

      setUserProfile(profile)

      // Verify session ownership and fetch messages
      const { data: sessionData, error: sessionError } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('id', sessionId)
        .eq('user_id', user.id)
        .single()

      if (sessionError || !sessionData) {
        toast.error('চ্যাট সেশন পাওয়া যায়নি')
        router.push('/dashboard')
        return
      }

      // Fetch messages
      const { data: messagesData } = await supabase
        .from('messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true })

      setMessages(messagesData || [])
      setSessionLoading(false)
    }

    checkAuth()
  }, [supabase, router, sessionId])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!inputValue.trim() || loading) return

    const userMessage = inputValue
    setInputValue('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: userMessage,
          userTier: userProfile?.subscription_tier || 'free',
          userPreference: userProfile?.preferred_tutor || 'auto',
        }),
      })

      if (!response.ok) {
        const { error } = await response.json()
        toast.error(error || 'বার্তা পাঠাতে ব্যর্থ')
        setLoading(false)
        return
      }

      const { userMessage: newUserMsg, aiMessage: newAiMsg } = await response.json()

      // Add messages to UI
      setMessages((prev) => [
        ...prev,
        newUserMsg,
        newAiMsg,
      ])
    } catch (error) {
      toast.error('বার্তা পাঠাতে ত্রুটি ঘটেছে')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary-green border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 font-bangla">চ্যাট লোড করছি...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-cream to-cream-light flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-primary-green font-bangla">AI টিউটর</h1>
          <div className="ml-auto text-sm text-gray-600 font-bangla">
            {userProfile?.subscription_tier === 'free' && (
              <span className="text-orange-600">বিনামূল্যে: {userProfile?.daily_chat_limit - userProfile?.daily_chat_count} চ্যাট অবশিষ্ট</span>
            )}
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-8 overflow-y-auto">
        {messages.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-600 text-lg font-bangla mb-4">
              আপনার প্রশ্ন জিজ্ঞাসা করুন
            </p>
            <p className="text-gray-500 font-bangla">
              গণিত, বিজ্ঞান, ইংরেজি বা অন্য যেকোনো বিষয়ে সাহায্য পান
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <Card
                  className={`max-w-xl lg:max-w-2xl p-4 ${
                    message.role === 'user'
                      ? 'bg-primary-green text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <div className="prose prose-sm max-w-none prose-invert-colors">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  )}
                </Card>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <Card className="max-w-xl lg:max-w-2xl p-4 bg-white border border-gray-200">
                  <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 bg-primary-green rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary-green rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-primary-green rounded-full animate-bounce delay-200"></div>
                  </div>
                </Card>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200">
        <form
          onSubmit={handleSendMessage}
          className="max-w-4xl mx-auto px-6 py-4 flex gap-2"
        >
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="আপনার প্রশ্ন লিখুন..."
            disabled={loading}
            className="flex-1 font-bangla"
          />
          <Button
            type="submit"
            disabled={loading || !inputValue.trim()}
            className="bg-primary-green hover:bg-primary-green-light text-white gap-2"
          >
            <Send size={20} />
          </Button>
        </form>
      </div>
    </main>
  )
}
