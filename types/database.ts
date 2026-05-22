export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string | null
          phone: string | null
          full_name: string | null
          avatar_url: string | null
          student_level: 'ssc_science' | 'ssc_humanities' | 'ssc_business' | 'hsc_science' | 'hsc_humanities' | 'hsc_business' | 'admission_engineering' | 'admission_medical' | 'admission_university' | 'general' | null
          board: string | null
          subjects: string[] | null
          institution: string | null
          kyc_status: 'pending' | 'verified' | 'rejected'
          kyc_document_url: string | null
          subscription_tier: 'free' | 'pro' | 'family'
          subscription_expires_at: string | null
          daily_chat_count: number
          daily_chat_limit: number
          daily_image_count: number
          daily_image_limit: number
          daily_gemini_vision_count: number
          daily_gemini_vision_limit: number
          total_chats: number
          preferred_tutor: 'auto' | 'groq' | 'gemini'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email?: string | null
          phone?: string | null
          full_name?: string | null
          avatar_url?: string | null
          student_level?: 'ssc_science' | 'ssc_humanities' | 'ssc_business' | 'hsc_science' | 'hsc_humanities' | 'hsc_business' | 'admission_engineering' | 'admission_medical' | 'admission_university' | 'general' | null
          board?: string | null
          subjects?: string[] | null
          institution?: string | null
          kyc_status?: 'pending' | 'verified' | 'rejected'
          kyc_document_url?: string | null
          subscription_tier?: 'free' | 'pro' | 'family'
          subscription_expires_at?: string | null
          daily_chat_count?: number
          daily_chat_limit?: number
          daily_image_count?: number
          daily_image_limit?: number
          daily_gemini_vision_count?: number
          daily_gemini_vision_limit?: number
          total_chats?: number
          preferred_tutor?: 'auto' | 'groq' | 'gemini'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          phone?: string | null
          full_name?: string | null
          avatar_url?: string | null
          student_level?: 'ssc_science' | 'ssc_humanities' | 'ssc_business' | 'hsc_science' | 'hsc_humanities' | 'hsc_business' | 'admission_engineering' | 'admission_medical' | 'admission_university' | 'general' | null
          board?: string | null
          subjects?: string[] | null
          institution?: string | null
          kyc_status?: 'pending' | 'verified' | 'rejected'
          kyc_document_url?: string | null
          subscription_tier?: 'free' | 'pro' | 'family'
          subscription_expires_at?: string | null
          daily_chat_count?: number
          daily_chat_limit?: number
          daily_image_count?: number
          daily_image_limit?: number
          daily_gemini_vision_count?: number
          daily_gemini_vision_limit?: number
          total_chats?: number
          preferred_tutor?: 'auto' | 'groq' | 'gemini'
          created_at?: string
          updated_at?: string
        }
      }
      chat_sessions: {
        Row: {
          id: string
          user_id: string
          title: string
          subject: string | null
          chapter: string | null
          level: string | null
          type: 'chat' | 'photo_analysis' | 'mock_test' | 'ai_image'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title?: string
          subject?: string | null
          chapter?: string | null
          level?: string | null
          type?: 'chat' | 'photo_analysis' | 'mock_test' | 'ai_image'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          subject?: string | null
          chapter?: string | null
          level?: string | null
          type?: 'chat' | 'photo_analysis' | 'mock_test' | 'ai_image'
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          session_id: string
          role: 'user' | 'assistant' | 'system'
          content: string
          citations: Json
          image_url: string | null
          ai_model: string
          tokens_used: number
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          role: 'user' | 'assistant' | 'system'
          content: string
          citations?: Json
          image_url?: string | null
          ai_model?: string
          tokens_used?: number
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          role?: 'user' | 'assistant' | 'system'
          content?: string
          citations?: Json
          image_url?: string | null
          ai_model?: string
          tokens_used?: number
          created_at?: string
        }
      }
    }
  }
}
