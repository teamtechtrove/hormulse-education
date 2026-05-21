'use client'

import { useState, FormEvent, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Spinner } from '@/components/ui/spinner'

interface ImageFormProps {
  onImageGenerated: (url: string, text?: string) => void
  isLoading: boolean
  error: string | null
}

export function ImageForm({
  onImageGenerated,
  isLoading,
  error,
}: ImageFormProps) {
  const [prompt, setPrompt] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!prompt.trim() || isLoading) return

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt.trim() }),
      })

      if (!response.ok) {
        const { error: errorMsg } = await response.json()
        throw new Error(errorMsg || 'Failed to generate image')
      }

      const { image, text } = await response.json()
      onImageGenerated(image, text)
      setPrompt('')
    } catch (err) {
      console.error('Generation failed:', err)
      throw err
    }
  }

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="space-y-4">
        <div>
          <label
            htmlFor="prompt"
            className="block text-sm font-medium text-foreground mb-2"
          >
            Describe your image
          </label>
          <Textarea
            id="prompt"
            placeholder="A serene mountain landscape at sunset, with golden clouds reflecting in a calm lake..."
            value={prompt}
            onChange={handleChange}
            disabled={isLoading}
            className="min-h-24 resize-none"
          />
        </div>

        {error && (
          <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={!prompt.trim() || isLoading}
          size="lg"
          className="w-full"
        >
          {isLoading ? (
            <>
              <Spinner className="mr-2 h-4 w-4" />
              Generating...
            </>
          ) : (
            'Generate Image'
          )}
        </Button>
      </div>
    </form>
  )
}
