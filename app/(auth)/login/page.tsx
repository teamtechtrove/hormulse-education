'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast.error(error.message)
        setLoading(false)
        return
      }

      toast.success('লগইন সফল! আপনাকে স্বাগতম।')
      router.push('/dashboard')
    } catch (err) {
      toast.error('লগইনে ত্রুটি ঘটেছে। দয়া করে পুনরায় চেষ্টা করুন।')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-cream to-cream-light flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-primary-green mb-2 text-center font-bangla">
          আপনার অ্যাকাউন্টে লগইন করুন
        </h1>
        <p className="text-gray-600 text-center mb-6 font-bangla">
          হর্মুলসে শিক্ষায় আপনাকে স্বাগতম
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
              ইমেইল
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="আপনার ইমেইল"
              required
              disabled={loading}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
              পাসওয়ার্ড
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="আপনার পাসওয়ার্ড"
              required
              disabled={loading}
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-green hover:bg-primary-green-light text-white font-bangla"
          >
            {loading ? 'লগইন করছি...' : 'লগইন করুন'}
          </Button>
        </form>

        <div className="mt-6 text-center font-bangla">
          <p className="text-gray-600">
            এখনও অ্যাকাউন্ট নেই?{' '}
            <Link href="/register" className="text-primary-green font-semibold hover:underline">
              নিবন্ধন করুন
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/forgot-password"
            className="text-sm text-primary-green hover:underline font-bangla"
          >
            পাসওয়ার্ড ভুলে গেছেন?
          </Link>
        </div>
      </Card>
    </main>
  )
}
