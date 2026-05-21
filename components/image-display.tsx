'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import Image from 'next/image'

interface ImageDisplayProps {
  imageUrl: string | null
  text?: string
}

export function ImageDisplay({ imageUrl, text }: ImageDisplayProps) {
  if (!imageUrl) {
    return (
      <Card className="w-full h-96 flex items-center justify-center border-dashed border-2 border-muted-foreground/20">
        <div className="text-center text-muted-foreground">
          <p className="text-sm">Generated images will appear here</p>
        </div>
      </Card>
    )
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `generated-${Date.now()}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
    }
  }

  return (
    <div className="w-full space-y-3">
      <Card className="overflow-hidden">
        <div className="relative w-full aspect-square bg-muted">
          <Image
            src={imageUrl}
            alt="Generated image"
            fill
            className="object-cover"
            priority
          />
        </div>
      </Card>

      {text && (
        <div className="rounded-lg bg-muted p-3">
          <p className="text-xs font-medium text-muted-foreground mb-1">
            Generation Notes
          </p>
          <p className="text-sm text-foreground">{text}</p>
        </div>
      )}

      <Button
        onClick={handleDownload}
        variant="outline"
        size="sm"
        className="w-full"
      >
        <Download className="mr-2 h-4 w-4" />
        Download Image
      </Button>
    </div>
  )
}
