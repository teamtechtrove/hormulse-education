'use client'

import { useState } from 'react'
import { ImageForm } from '@/components/image-form'
import { ImageDisplay } from '@/components/image-display'
import { Sparkles } from 'lucide-react'

export default function Home() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [generatedText, setGeneratedText] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageGenerated = (url: string, text?: string) => {
    setImageUrl(url)
    setGeneratedText(text)
    setError(null)
    setIsLoading(false)
  }

  const handleSubmit = async (prompt: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        const { error: errorMsg } = await response.json()
        setError(errorMsg || 'Failed to generate image')
        setIsLoading(false)
        return
      }

      const { image, text } = await response.json()
      handleImageGenerated(image, text)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred'
      setError(message)
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        {/* Header */}
        <div className="mb-12 text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="rounded-lg bg-primary/10 p-2.5">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Image Generator
            </h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Create stunning AI-generated images using Google&apos;s Nano Banana model
            powered by the Vercel AI Gateway
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Form Column */}
          <div className="flex flex-col justify-start">
            <div className="rounded-2xl border border-primary/10 bg-card/50 backdrop-blur p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Create Your Image
              </h2>
              <ImageForm
                onImageGenerated={handleImageGenerated}
                isLoading={isLoading}
                error={error}
              />

              {/* Quick Examples */}
              <div className="mt-8 pt-6 border-t border-border/50">
                <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                  Try these prompts
                </p>
                <div className="space-y-2">
                  {[
                    'A futuristic city with neon lights reflected in water',
                    'A cozy medieval library filled with ancient books',
                    'Aurora borealis over a frozen mountain landscape',
                  ].map((example, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        handleSubmit(example)
                      }}
                      disabled={isLoading}
                      className="w-full text-left text-xs sm:text-sm p-2.5 rounded-lg bg-muted/50 hover:bg-muted disabled:opacity-50 transition-colors text-muted-foreground hover:text-foreground"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Image Display Column */}
          <div className="flex flex-col justify-start">
            <div className="rounded-2xl border border-primary/10 bg-card/50 backdrop-blur p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Your Creation
              </h2>
              <ImageDisplay imageUrl={imageUrl} text={generatedText} />
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 rounded-xl border border-border/30 bg-muted/30 p-6 max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground text-center">
            Powered by{' '}
            <span className="font-semibold text-foreground">
              Google Gemini 3.1 Flash (Nano Banana)
            </span>{' '}
            via the Vercel AI Gateway. Each image takes a few seconds to generate.
          </p>
        </div>
      </div>
    </main>
  )
}
