import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if we're in development mode
const isDevelopment = import.meta.env.DEV

// Create a mock supabase client for development without credentials
const createMockSupabase = () => {
  console.warn('⚠️ Using mock Supabase client. For full functionality, add Supabase credentials to .env')
  
  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      signInWithPassword: async () => ({ 
        data: { 
          user: { 
            id: 'mock-user-id', 
            email: 'demo@example.com',
            user_metadata: { name: 'Demo User', role: 'user' }
          } 
        }, 
        error: null 
      }),
      signUp: async () => ({ 
        data: { 
          user: { 
            id: 'mock-user-id', 
            email: 'demo@example.com',
            user_metadata: { name: 'Demo User', role: 'user' }
          } 
        }, 
        error: null 
      }),
      signOut: async () => ({ error: null }),
      onAuthStateChange: (callback) => {
        // Simulate auth state changes
        if (isDevelopment) {
          setTimeout(() => {
            callback('SIGNED_IN', {
              user: {
                id: 'mock-user-id',
                email: 'demo@example.com',
                user_metadata: { name: 'Demo User', role: 'user' }
              }
            })
          }, 1000)
        }
        
        return {
          data: { subscription: { unsubscribe: () => {} } }
        }
      }
    },
    from: () => ({
      select: () => ({
        data: [],
        error: null
      }),
      insert: () => ({
        data: null,
        error: null
      }),
      update: () => ({
        data: null,
        error: null
      }),
      delete: () => ({
        data: null,
        error: null
      })
    })
  }
}

// Create the actual Supabase client or mock based on environment variables
let supabase

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  })
  console.log('✅ Supabase client initialized with provided credentials')
} else if (isDevelopment) {
  supabase = createMockSupabase()
  console.log('🚨 Supabase credentials missing. Running in mock mode.')
} else {
  // In production, throw error if credentials are missing
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export { supabase }