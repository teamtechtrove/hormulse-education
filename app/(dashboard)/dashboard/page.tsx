'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { createClient } from '@/lib/supabase/client'
import { LogOut, Plus, MessageSquare, Zap } from 'lucide-react'
import { toast } from 'sonner'

interface ChatSession {
  id: string
  title: string
  created_at: string
  type: string
}

export default function DashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [user, setUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [loading, setLoading] = useState(true)

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

      // Fetch user's chat sessions
      const { data: sessionsData } = await supabase
        .from('chat_sessions')
        .select('id, title, created_at, type')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      setSessions(sessionsData || [])
      setLoading(false)
    }

    checkAuth()
  }, [supabase, router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    toast.success('লগআউট সফল')
    router.push('/')
  }

  const handleNewChat = async () => {
    const { data: newSession } = await supabase
      .from('chat_sessions')
      .insert({
        user_id: user.id,
        title: `চ্যাট ${new Date().toLocaleDateString('bn-BD')}`,
        type: 'chat',
      })
      .select()
      .single()

    if (newSession) {
      router.push(`/chat/${newSession.id}`)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-primary-green border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 font-bangla">লোড হচ্ছে...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-cream to-cream-light">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-primary-green font-bangla">হর্মুলসে</h1>
            {userProfile && (
              <p className="text-sm text-gray-600 font-bangla">
                স্বাগতম, {userProfile.full_name || user?.email}
              </p>
            )}
          </div>
          <div className="flex gap-4">
            <Link href="/profile">
              <Button variant="outline" className="font-bangla">
                প্রোফাইল
              </Button>
            </Link>
            <Button
              onClick={handleLogout}
              variant="destructive"
              className="font-bangla gap-2"
            >
              <LogOut size={18} /> লগআউট
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bangla">আজকের চ্যাট</p>
                <p className="text-3xl font-bold text-primary-green">
                  {userProfile?.daily_chat_count || 0}/{userProfile?.daily_chat_limit || 15}
                </p>
              </div>
              <MessageSquare className="w-8 h-8 text-gold" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-600 text-sm font-bangla">আপনার পরিকল্পনা</p>
                <p className="text-2xl font-bold text-primary-green capitalize font-bangla">
                  {userProfile?.subscription_tier === 'free' ? 'বিনামূল্যে' : userProfile?.subscription_tier === 'pro' ? 'প্রো' : 'পরিবার'}
                </p>
              </div>
              <Zap className="w-8 h-8 text-gold" />
            </div>
          </Card>

          <Card className="p-6">
            <div>
              <p className="text-gray-600 text-sm font-bangla mb-2">মোট চ্যাট</p>
              <p className="text-3xl font-bold text-primary-green">
                {userProfile?.total_chats || 0}
              </p>
              {userProfile?.subscription_tier === 'free' && (
                <Link href="/pricing">
                  <Button
                    size="sm"
                    className="mt-4 bg-gold text-primary-green hover:bg-gold-light font-bangla"
                  >
                    আপগ্রেড করুন
                  </Button>
                </Link>
              )}
            </div>
          </Card>
        </div>

        {/* New Chat Section */}
        <div className="mb-12">
          <Button
            onClick={handleNewChat}
            size="lg"
            className="bg-primary-green hover:bg-primary-green-light text-white gap-2 font-bangla"
          >
            <Plus size={20} /> নতুন চ্যাট শুরু করুন
          </Button>
        </div>

        {/* Recent Chats */}
        <div>
          <h2 className="text-2xl font-bold text-primary-green mb-6 font-bangla">
            সাম্প্রতিক চ্যাট
          </h2>

          {sessions.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-gray-600 font-bangla">এখনও কোনো চ্যাট নেই</p>
              <Button
                onClick={handleNewChat}
                className="mt-4 bg-primary-green hover:bg-primary-green-light text-white font-bangla"
              >
                প্রথম চ্যাট শুরু করুন
              </Button>
            </Card>
          ) : (
            <div className="grid gap-4">
              {sessions.map((session) => (
                <Link key={session.id} href={`/chat/${session.id}`}>
                  <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-primary-green font-bangla">
                          {session.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(session.created_at).toLocaleDateString('bn-BD', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                      <MessageSquare className="w-5 h-5 text-gold" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
