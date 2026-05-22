'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowRight, BookOpen, Zap, Users, Award } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-cream to-cream-light">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-primary-green">হর্মুলসে</div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="ghost">লগইন</Button>
          </Link>
          <Link href="/register">
            <Button className="bg-primary-green hover:bg-primary-green-light">
              শুরু করুন
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-primary-green mb-6 font-bangla">
          প্রতিটি শিক্ষার্থীর জন্য গুণমানের শিক্ষা
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto font-bangla">
          AI টিউটর যা ২৪/৭ উপলব্ধ, সাশ্রয়ী এবং প্রতিটি শিক্ষার্থীর জন্য ব্যক্তিগত
        </p>
        <Link href="/register">
          <Button
            size="lg"
            className="bg-primary-green hover:bg-primary-green-light text-white gap-2"
          >
            বিনামূল্যে শুরু করুন <ArrowRight size={20} />
          </Button>
        </Link>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-primary-green mb-12 font-bangla">
          কেন হর্মুলসে?
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 border-0 bg-white hover:shadow-lg transition-shadow">
            <Zap className="w-12 h-12 text-gold mb-4" />
            <h3 className="text-xl font-bold text-primary-green mb-2 font-bangla">
              দ্রুত সমাধান
            </h3>
            <p className="text-gray-600 font-bangla">
              সেকেন্ডের মধ্যে যেকোনো প্রশ্নের উত্তর পান
            </p>
          </Card>

          <Card className="p-6 border-0 bg-white hover:shadow-lg transition-shadow">
            <BookOpen className="w-12 h-12 text-gold mb-4" />
            <h3 className="text-xl font-bold text-primary-green mb-2 font-bangla">
              NCTB সংযুক্ত
            </h3>
            <p className="text-gray-600 font-bangla">
              বাংলাদেশের পাঠ্যক্রম অনুযায়ী শিক্ষা
            </p>
          </Card>

          <Card className="p-6 border-0 bg-white hover:shadow-lg transition-shadow">
            <Award className="w-12 h-12 text-gold mb-4" />
            <h3 className="text-xl font-bold text-primary-green mb-2 font-bangla">
              পরীক্ষায় প্রস্তুত
            </h3>
            <p className="text-gray-600 font-bangla">
              সকল বোর্ড পরীক্ষার জন্য প্রস্তুত হন
            </p>
          </Card>

          <Card className="p-6 border-0 bg-white hover:shadow-lg transition-shadow">
            <Users className="w-12 h-12 text-gold mb-4" />
            <h3 className="text-xl font-bold text-primary-green mb-2 font-bangla">
              অনলাইন টিউটিং
            </h3>
            <p className="text-gray-600 font-bangla">
              যেকোনো সময়, যেকোনো জায়গা থেকে শিখুন
            </p>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-primary-green mb-12 font-bangla">
          সাশ্রয়ী মূল্যে প্রিমিয়াম শিক্ষা
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Free Tier */}
          <Card className="p-8 border-2 border-primary-green bg-white">
            <h3 className="text-2xl font-bold text-primary-green mb-4 font-bangla">
              বিনামূল্যে
            </h3>
            <div className="text-4xl font-bold text-primary-green mb-6">
              ৳<span className="text-3xl">0</span>
            </div>
            <ul className="space-y-3 mb-8 font-bangla">
              <li className="flex items-center gap-2">
                <span className="text-gold">✓</span>
                দৈনিক ১৫টি চ্যাট
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">✓</span>
                ছবি বিশ্লেষণ (৩/দিন)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">✓</span>
                দ্রুত AI টিউটর
              </li>
            </ul>
            <Link href="/register">
              <Button className="w-full bg-primary-green hover:bg-primary-green-light">
                শুরু করুন
              </Button>
            </Link>
          </Card>

          {/* Pro Tier */}
          <Card className="p-8 border-2 border-gold bg-gradient-to-b from-cream to-white shadow-lg">
            <div className="bg-gold text-primary-green px-3 py-1 rounded w-fit mb-4 font-bold font-bangla">
              জনপ্রিয়
            </div>
            <h3 className="text-2xl font-bold text-primary-green mb-4 font-bangla">
              প্রো
            </h3>
            <div className="text-4xl font-bold text-primary-green mb-6">
              ৳<span className="text-3xl">129</span>
              <span className="text-lg font-normal text-gray-600">/মাস</span>
            </div>
            <ul className="space-y-3 mb-8 font-bangla">
              <li className="flex items-center gap-2">
                <span className="text-gold">✓</span>
                সীমাহীন চ্যাট
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">✓</span>
                প্রিমিয়াম Gemini টিউটর
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">✓</span>
                ছবি বিশ্লেষণ (২০/দিন)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">✓</span>
                মক টেস্ট
              </li>
            </ul>
            <Link href="/register">
              <Button className="w-full bg-gold text-primary-green hover:bg-gold-light">
                এখনই আপগ্রেড করুন
              </Button>
            </Link>
          </Card>

          {/* Family Tier */}
          <Card className="p-8 border-2 border-primary-green bg-white">
            <h3 className="text-2xl font-bold text-primary-green mb-4 font-bangla">
              পরিবার
            </h3>
            <div className="text-4xl font-bold text-primary-green mb-6">
              ৳<span className="text-3xl">249</span>
              <span className="text-lg font-normal text-gray-600">/মাস</span>
            </div>
            <ul className="space-y-3 mb-8 font-bangla">
              <li className="flex items-center gap-2">
                <span className="text-gold">✓</span>
                প্রো সব বৈশিষ্ট্য
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">✓</span>
                ৪টি প্রোফাইল পর্যন্ত
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">✓</span>
                অভিভাবক ড্যাশবোর্ড
              </li>
              <li className="flex items-center gap-2">
                <span className="text-gold">✓</span>
                AI ছবি ৫০/দিন
              </li>
            </ul>
            <Link href="/register">
              <Button className="w-full bg-primary-green hover:bg-primary-green-light">
                পরিবার প্যাকেজ বেছে নিন
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-green text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4 font-bangla">হর্মুলসে</h4>
              <p className="text-cream font-bangla">
                শিক্ষা AI প্ল্যাটফর্ম যা প্রতিটি শিক্ষার্থীকে সফল করতে প্রতিশ্রুতিবদ্ধ
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 font-bangla">পণ্য</h4>
              <ul className="space-y-2 font-bangla">
                <li>
                  <Link href="#" className="hover:text-gold">
                    AI টিউটর
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gold">
                    মক টেস্ট
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 font-bangla">কোম্পানি</h4>
              <ul className="space-y-2 font-bangla">
                <li>
                  <Link href="/about" className="hover:text-gold">
                    আমাদের সম্পর্কে
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gold">
                    যোগাযোগ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 font-bangla">আইনি</h4>
              <ul className="space-y-2 font-bangla">
                <li>
                  <Link href="#" className="hover:text-gold">
                    গোপনীয়তা নীতি
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gold">
                    শর্তাবলী
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-primary-green-light pt-8 text-center font-bangla text-cream">
            <p>© ২০২৬ হর্মুলসে শিক্ষা AI। সর্বস্বত্ব সংরক্ষিত।</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
