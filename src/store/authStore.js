import { create } from 'zustand'
import { supabase } from '../config/supabase'

const useAuthStore = create((set, get) => ({
  user: null,
  session: null,
  loading: true,
  subscription: null,

  initialize: async () => {
    const { data: { session } } = await supabase.auth.getSession()
    set({ session, user: session?.user ?? null, loading: false })

    if (session?.user) {
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', session.user.id)
        .single()
      
      set({ subscription })
    }

    supabase.auth.onAuthStateChange(async (event, session) => {
      set({ session, user: session?.user ?? null })
      
      if (session?.user) {
        const { data: subscription } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', session.user.id)
          .single()
        
        set({ subscription })
      } else {
        set({ subscription: null })
      }
    })
  },

  signIn: async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  signUp: async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      set({ user: null, session: null, subscription: null })
    }
    return { error }
  },

  updateSubscription: (subscription) => {
    set({ subscription })
  }
}))

export default useAuthStore