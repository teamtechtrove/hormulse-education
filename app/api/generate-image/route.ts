import { generateImage } from 'ai'

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    if (!prompt || typeof prompt !== 'string') {
      return Response.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    const result = await generateImage({
      model: 'google/gemini-3.1-flash-image-preview',
      prompt: prompt,
      size: '1024x1024',
    })

    return Response.json({
      image: result.image.url,
      text: result.text,
      rawResponse: result.rawResponse,
    })
  } catch (error) {
    console.error('Image generation error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate image'
    return Response.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
