'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Heart, Target, Users } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-cream to-cream-light">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft size={20} /> বাড়িতে ফিরুন
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary-green mb-4 font-bangla">
            হর্মুলসে শিক্ষা AI
          </h1>
          <p className="text-xl text-gray-700 mb-8 font-bangla">
            প্রতিটি শিক্ষার্থীর স্বপ্ন পূরণের জন্য প্রতিশ্রুতিবদ্ধ
          </p>
        </section>

        {/* Founder Section */}
        <section className="mb-16">
          <Card className="p-8 border-2 border-primary-green">
            <h2 className="text-3xl font-bold text-primary-green mb-6 font-bangla">
              প্রতিষ্ঠাতা
            </h2>
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-primary-green mb-4 font-bangla">
                  ফারদিন আরমান রাফি
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed font-bangla">
                  হর্মুলসে শিক্ষা AI প্রতিষ্ঠা করেছেন ফারদিন আরমান রাফি, একজন অর্থ ও বিক্রয় পেশাদার যিনি ঢাকা, বাংলাদেশ থেকে এসেছেন। অসংখ্য প্রতিভাবান শিক্ষার্থীকে ব্যয়বহুল ব্যক্তিগত শিক্ষক (৳৩,০০০–১০,০০০/মাস) এবং অ্যাক্সেসযোগ্য কোচিং সেন্টার দ্বারা সীমাবদ্ধ দেখে ক্লান্ত, তিনি এই প্ল্যাটফর্ম তৈরি করছেন।
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed font-bangla">
                  তার দৃষ্টিভঙ্গি সহজ কিন্তু শক্তিশালী: বাংলাদেশের প্রতিটি শিক্ষার্থীকে গুণমানসম্পন্ন, সাশ্রয়ী এবং সহজলভ্য AI টিউটিং সরবরাহ করা। শিক্ষার্থীদের জীবন পরিবর্তন করতে এবং একটি আরও সমান খেলার মাঠ তৈরি করতে এই প্ল্যাটফর্মটি প্রতিশ্রুতিবদ্ধ।
                </p>
                <p className="text-primary-green font-semibold mb-4 font-bangla">
                  পোর্টফোলিও: https://portfolioofarman.netlify.app
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Mission, Vision, Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary-green mb-8 text-center font-bangla">
            আমাদের মূল্যবোধ
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Mission */}
            <Card className="p-6 border-2 border-primary-green-light hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <Target className="w-8 h-8 text-gold" />
                <h3 className="text-xl font-bold text-primary-green font-bangla">
                  আমাদের লক্ষ্য
                </h3>
              </div>
              <p className="text-gray-700 font-bangla">
                প্রতিটি শিক্ষার্থীর জন্য গুণমানের শিক্ষা সহজলভ্য করা, তাদের পটভূমি বা অর্থনৈতিক অবস্থা নির্বিশেষে।
              </p>
            </Card>

            {/* Vision */}
            <Card className="p-6 border-2 border-primary-green-light hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <Heart className="w-8 h-8 text-gold" />
                <h3 className="text-xl font-bold text-primary-green font-bangla">
                  আমাদের স্বপ্ন
                </h3>
              </div>
              <p className="text-gray-700 font-bangla">
                এমন একটি বিশ্ব তৈরি করা যেখানে প্রতিটি শিক্ষার্থী, তারা যেখানেই থাকুক না কেন, বিশ্বমানের শিক্ষা পেতে পারে।
              </p>
            </Card>

            {/* Values */}
            <Card className="p-6 border-2 border-primary-green-light hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <Users className="w-8 h-8 text-gold" />
                <h3 className="text-xl font-bold text-primary-green font-bangla">
                  আমাদের মূল্যবোধ
                </h3>
              </div>
              <ul className="space-y-2 text-gray-700 font-bangla">
                <li>✓ অ্যাক্সেসযোগ্যতা</li>
                <li>✓ গুণমান</li>
                <li>✓ অন্তর্ভুক্তিমূলকতা</li>
                <li>✓ উদ্ভাবন</li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Technology Section */}
        <section className="mb-16">
          <Card className="p-8 bg-gradient-to-r from-primary-green to-primary-green-light text-white">
            <h2 className="text-3xl font-bold mb-4 font-bangla">প্রযুক্তি চালিত</h2>
            <p className="mb-6 font-bangla">
              হর্মুলসে সর্বশেষ AI প্রযুক্তি দ্বারা চালিত - Groq এবং Google Gemini - তাৎক্ষণিক, নির্ভুল এবং গভীর শিক্ষামূলক সমর্থন প্রদান করতে।
            </p>
            <ul className="space-y-2 font-bangla">
              <li>⚡ Groq (দ্রুত AI): তাৎক্ষণিক উত্তর এবং সংজ্ঞা</li>
              <li>👑 Gemini Premium: গভীর বিশ্লেষণ এবং NCTB উদ্ধৃতি</li>
              <li>🖼️ ছবি বিশ্লেষণ: প্রশ্নের ফটো আপলোড করুন</li>
              <li>🎨 AI ছবি প্রজন্ম: ধারণা ভিজ্যুয়ালাইজ করুন</li>
            </ul>
          </Card>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-16">
          <h2 className="text-2xl font-bold text-primary-green mb-6 font-bangla">
            আমাদের সাথে শুরু করুন
          </h2>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-primary-green hover:bg-primary-green-light text-white font-bangla"
            >
              বিনামূল্যে নিবন্ধন করুন
            </Button>
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-primary-green text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center font-bangla text-cream">
          <p>© ২০২৬ হর্মুলসে শিক্ষা AI। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </footer>
    </main>
  )
}
