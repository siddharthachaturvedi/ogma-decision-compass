import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Session } from '@supabase/supabase-js';
import { auth } from '@/lib/supabase';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  initialized: boolean;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      session: null,
      loading: false,
      initialized: false,

      // Actions
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setLoading: (loading) => set({ loading }),
      setInitialized: (initialized) => set({ initialized }),

      signIn: async (email: string, password: string) => {
        set({ loading: true });
        const { data, error } = await auth.signIn(email, password);
        
        if (!error && data.session) {
          set({ 
            user: data.user, 
            session: data.session,
            loading: false 
          });
        } else {
          set({ loading: false });
        }
        
        return { error };
      },

      signUp: async (email: string, password: string) => {
        set({ loading: true });
        const { data, error } = await auth.signUp(email, password);
        
        if (!error && data.session) {
          set({ 
            user: data.user, 
            session: data.session,
            loading: false 
          });
        } else {
          set({ loading: false });
        }
        
        return { error };
      },

      signOut: async () => {
        set({ loading: true });
        await auth.signOut();
        set({ 
          user: null, 
          session: null, 
          loading: false 
        });
      },

      initialize: async () => {
        set({ loading: true });
        const { session } = await auth.getSession();
        
        if (session) {
          const { user } = await auth.getUser();
          set({ 
            user, 
            session, 
            loading: false, 
            initialized: true 
          });
        } else {
          set({ 
            user: null, 
            session: null, 
            loading: false, 
            initialized: true 
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        session: state.session 
      })
    }
  )
);