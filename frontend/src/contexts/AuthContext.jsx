import { createContext, useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser, clearUser } from '../store/slices/authSlice'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check active sessions and subscribe to auth changes
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        dispatch(setUser({
          id: session.user.id,
          email: session.user.email,
          role: session.user.user_metadata?.role || 'user',
          name: session.user.user_metadata?.name || session.user.email,
        }))
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          dispatch(setUser({
            id: session.user.id,
            email: session.user.email,
            role: session.user.user_metadata?.role || 'user',
            name: session.user.user_metadata?.name || session.user.email,
          }))
        } else {
          dispatch(clearUser())
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [dispatch])

  const value = {
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}