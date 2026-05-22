import { GoogleGenerativeAI, Part } from '@google/generative-ai'
import { getSystemPromptBangla } from './router'

let genAI: GoogleGenerativeAI | null = null

function getGenAI() {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '')
  }
  return genAI
}

export interface GeminiResponse {
  content: string
  citations: string[]
  tokensUsed: number
  model: string
}

export async function getGeminiResponse(
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string | Part[] }>,
  imageData?: { base64: string; mimeType: string }
): Promise<GeminiResponse> {
  try {
    const model = getGenAI().getGenerativeModel({ model: 'gemini-3.5-flash' })

    // Build message parts
    let parts: Part[] = []
    const lastMessage = messages[messages.length - 1]

    if (lastMessage) {
      if (typeof lastMessage.content === 'string') {
        parts.push({ text: lastMessage.content })
      } else {
        parts = Array.isArray(lastMessage.content) ? lastMessage.content : [lastMessage.content]
      }
    }

    // Add image if provided
    if (imageData) {
      parts.unshift({
        inlineData: {
          data: imageData.base64,
          mimeType: imageData.mimeType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
        },
      })
    }

    const systemPrompt = getSystemPromptBangla('gemini')

    const response = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts,
        },
      ],
      systemInstruction: systemPrompt,
      generationConfig: {
        temperature: 0.7,
        topP: 1,
        topK: 40,
        maxOutputTokens: 2048,
      },
      safetySettings: [
        {
          category: 'HARM_CATEGORY_UNSPECIFIED',
          threshold: 'BLOCK_NONE',
        },
      ],
    })

    const text = response.response.text()
    const citations: string[] = []

    // Extract citations from response metadata if available
    if (response.response.candidates?.[0]?.citationMetadata?.citations) {
      response.response.candidates[0].citationMetadata.citations.forEach((citation) => {
        if (citation.uri) citations.push(citation.uri)
      })
    }

    // Token estimation (Google doesn't return exact token counts in free tier)
    const tokensUsed = Math.ceil(text.length / 3.5)

    return {
      content: text,
      citations,
      tokensUsed,
      model: 'gemini-3.5-flash',
    }
  } catch (error) {
    console.error('[Gemini Error]', error)
    throw new Error(
      'গেমিনি প্রিমিয়াম টিউটর উপলব্ধ নয়। দ্রুত টিউটর ব্যবহার করা হচ্ছে...'
    )
  }
}

/**
 * Generate embeddings for RAG
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'embedding-001' })

    const result = await model.embedContent({
      content: { parts: [{ text }] },
    })

    return result.embedding.values
  } catch (error) {
    console.error('[Embedding Error]', error)
    throw new Error('Failed to generate embedding')
  }
}

/**
 * Analyze image with Gemini Vision
 */
export async function analyzeImageWithGemini(
  base64Image: string,
  mimeType: string,
  question?: string
): Promise<{ analysis: string; tokensUsed: number }> {
  try {
    const model = getGenAI().getGenerativeModel({ model: 'gemini-3.5-flash' })

    const prompt =
      question ||
      'এই ছবিটি বিশ্লেষণ করুন। এটি কী দেখাচ্ছে? বাংলায় বিস্তারিত ব্যাখ্যা দিন।'

    const response = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [
            {
              inlineData: {
                data: base64Image,
                mimeType: mimeType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
              },
            },
            { text: prompt },
          ],
        },
      ],
      systemInstruction: getSystemPromptBangla('gemini'),
      generationConfig: {
        temperature: 0.7,
        topP: 1,
        topK: 40,
        maxOutputTokens: 2048,
      },
    })

    const analysis = response.response.text()
    const tokensUsed = Math.ceil(analysis.length / 3.5)

    return {
      analysis,
      tokensUsed,
    }
  } catch (error) {
    console.error('[Gemini Vision Error]', error)
    throw new Error('ছবি বিশ্লেষণ ব্যর্থ। দয়া করে পুনরায় চেষ্টা করুন।')
  }
}
