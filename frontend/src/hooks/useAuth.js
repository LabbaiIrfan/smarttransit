import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { supabase } from '../lib/supabase'
import { setUser, clearUser } from '../store/slices/authSlice'

export const useAuthActions = () => {
  const dispatch = useDispatch()

  const signUp = useCallback(async (email, password, name) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: 'user',
          },
        },
      })

      if (error) throw error

      if (data?.user) {
        dispatch(setUser({
          id: data.user.id,
          email: data.user.email,
          role: data.user.user_metadata?.role || 'user',
          name: data.user.user_metadata?.name || data.user.email,
        }))
      }

      return { success: true, data }
    } catch (error) {
      console.error('Sign up error:', error)
      return { success: false, error: error.message }
    }
  }, [dispatch])

  const signIn = useCallback(async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data?.user) {
        dispatch(setUser({
          id: data.user.id,
          email: data.user.email,
          role: data.user.user_metadata?.role || 'user',
          name: data.user.user_metadata?.name || data.user.email,
        }))
      }

      return { success: true, data }
    } catch (error) {
      console.error('Sign in error:', error)
      return { success: false, error: error.message }
    }
  }, [dispatch])

  const signOut = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      dispatch(clearUser())
      return { success: true }
    } catch (error) {
      console.error('Sign out error:', error)
      return { success: false, error: error.message }
    }
  }, [dispatch])

  const resetPassword = useCallback(async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Reset password error:', error)
      return { success: false, error: error.message }
    }
  }, [])

  return {
    signUp,
    signIn,
    signOut,
    resetPassword,
  }
}