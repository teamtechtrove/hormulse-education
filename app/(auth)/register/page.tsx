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

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('পাসওয়ার্ড মেলে না')
      return
    }

    if (password.length < 6) {
      toast.error('পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) {
        toast.error(error.message)
        setLoading(false)
        return
      }

      toast.success('নিবন্ধন সফল! অনুগ্রহ করে আপনার ইমেইল নিশ্চিত করুন।')
      router.push('/onboarding')
    } catch (err) {
      toast.error('নিবন্ধনে ত্রুটি ঘটেছে। দয়া করে পুনরায় চেষ্টা করুন।')
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-cream to-cream-light flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-primary-green mb-2 text-center font-bangla">
          নতুন অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-gray-600 text-center mb-6 font-bangla">
          হর্মুলসে শিক্ষায় যোগদান করুন
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
              সম্পূর্ণ নাম
            </label>
            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="আপনার নাম"
              required
              disabled={loading}
              className="w-full"
            />
          </div>

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
              placeholder="কমপক্ষে ৬ অক্ষর"
              required
              disabled={loading}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-bangla">
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <Input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="পাসওয়ার্ড আবার লিখুন"
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
            {loading ? 'নিবন্ধন করছি...' : 'নিবন্ধন করুন'}
          </Button>
        </form>

        <div className="mt-6 text-center font-bangla">
          <p className="text-gray-600">
            ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
            <Link href="/login" className="text-primary-green font-semibold hover:underline">
              লগইন করুন
            </Link>
          </p>
        </div>

        <div className="mt-4 text-xs text-gray-500 text-center font-bangla">
          নিবন্ধন করে আপনি আমাদের শর্তাবলী সম্মত হচ্ছেন
        </div>
      </Card>
    </main>
  )
}
