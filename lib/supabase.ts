import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for database tables
export interface UserProgress {
    id: string
    user_id: string
    scenario_id: string
    best_score: number
    attempts: number
    last_attempt: string
    created_at: string
}

export interface GTOScenario {
    id: string
    title: string
    description: string
    solution: Record<string, string>
    difficulty: 'beginner' | 'intermediate' | 'advanced'
    category: string
    created_at: string
}

export interface DrillSession {
    id: string
    user_id: string
    scenario_id: string
    score: number
    time_taken_ms: number
    mistakes: string[]
    completed_at: string
}
