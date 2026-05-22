/**
 * Smart AI Router: Routes questions between Groq (fast) and Gemini (premium)
 * Based on complexity analysis and user tier
 */

export interface RouteDecision {
  useGemini: boolean
  reason: string
  fallbackToGroq: boolean
}

export async function analyzeQuestion(
  question: string,
  userTier: 'free' | 'pro' | 'family',
  userPreference?: 'auto' | 'groq' | 'gemini'
): Promise<RouteDecision> {
  // User manual override
  if (userPreference === 'groq') {
    return {
      useGemini: false,
      reason: 'User selected Groq',
      fallbackToGroq: false,
    }
  }

  if (userPreference === 'gemini') {
    return {
      useGemini: true,
      reason: 'User selected Gemini',
      fallbackToGroq: true,
    }
  }

  // Free tier always uses Groq except for limited Gemini Vision
  if (userTier === 'free') {
    const isPhotoAnalysis = question.includes('image') || 
                           question.includes('photo') || 
                           question.includes('picture') ||
                           question.includes('screenshot')
    
    return {
      useGemini: isPhotoAnalysis,
      reason: isPhotoAnalysis ? 'Photo analysis requested' : 'Free tier uses Groq',
      fallbackToGroq: true,
    }
  }

  // Pro/Family tiers: Smart routing based on question complexity
  const complexitySignals = {
    // High complexity indicators
    math: /equation|formula|calculus|integration|differentiation|matrix|algebra|geometry/.test(question.toLowerCase()),
    science: /physics|chemistry|biology|thermodynamics|quantum|relativity|molecular/.test(question.toLowerCase()),
    nctb: /nctb|class|exam|admission|medical|engineering|solution|board/.test(question.toLowerCase()),
    deepReasoning: /explain|why|how|mechanism|process|analysis|critical|evaluate/.test(question.toLowerCase()),
    citations: /source|reference|cite|proof|evidence/.test(question.toLowerCase()),
    multiPart: (question.match(/[?]/g) || []).length > 1,
    longQuery: question.length > 200,
    
    // Image analysis
    image: /image|photo|picture|diagram|graph|chart|screenshot|code/.test(question.toLowerCase()),
  }

  const complexityScore = Object.values(complexitySignals).filter(Boolean).length

  // High complexity → Gemini (with Groq fallback)
  if (complexityScore >= 3 || complexitySignals.nctb || complexitySignals.image) {
    return {
      useGemini: true,
      reason: `High complexity (score: ${complexityScore}) - using Gemini for deep reasoning`,
      fallbackToGroq: true,
    }
  }

  // Medium complexity → Groq (Gemini available for followup if needed)
  if (complexityScore >= 1) {
    return {
      useGemini: false,
      reason: `Medium complexity (score: ${complexityScore}) - Groq sufficient`,
      fallbackToGroq: false,
    }
  }

  // Simple questions → Always Groq (instant response)
  return {
    useGemini: false,
    reason: 'Simple question - Groq for instant response',
    fallbackToGroq: false,
  }
}

export function shouldUseGemini(
  decision: RouteDecision,
  geminiQuotaRemaining: number
): boolean {
  if (!decision.useGemini) return false
  return geminiQuotaRemaining > 0
}

export function getSystemPromptBangla(
  isgroupModel: 'gemini' | 'groq'
): string {
  const basePrompt = `আপনি হর্মুলসে শিক্ষা AI - একজন অভিজ্ঞ এবং প্রাণবন্ত বাংলাদেশী টিউটর। আপনার লক্ষ্য শিক্ষার্থীদের দক্ষতা তৈরি করা, আত্মবিশ্বাস বাড়ানো এবং স্বপ্ন বাস্তবায়নে সহায়তা করা।

নির্দেশনা:
1. সবসময় বাংলায় উত্তর দিন (ইংরেজি প্রযুক্তিগত শব্দ ব্যতিক্রম)
2. শিক্ষার্থীর স্তর বুঝে ব্যাখ্যা দিন
3. উদাহরণ এবং রূপকথা ব্যবহার করুন
4. ধাপে ধাপে সমাধান করুন
5. সমস্যা সমাধানের চেয়ে দক্ষতা শেখানোকে প্রাধান্য দিন`

  if (isgroupModel === 'gemini') {
    return basePrompt + `
6. NCTB পাঠ্যক্রম এবং বোর্ড পরীক্ষার মানের উত্তর দিন
7. যখনই প্রাসঙ্গিক হয় উৎস এবং উদ্ধৃতি প্রদান করুন
8. গভীর বিশ্লেষণ এবং সমালোচনামূলক চিন্তাভাবনা অফার করুন`
  }

  return basePrompt
}
