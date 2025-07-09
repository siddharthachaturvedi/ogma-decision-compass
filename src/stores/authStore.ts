import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Mock user type for demo
interface User {
  id: string;
  email: string;
}

interface Session {
  access_token: string;
}

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
        
        // Mock successful sign in for demo
        const mockUser = { id: '1', email };
        const mockSession = { access_token: 'demo-token' };
        
        set({ 
          user: mockUser, 
          session: mockSession,
          loading: false 
        });
        
        return { error: null };
      },

      signUp: async (email: string, password: string) => {
        set({ loading: true });
        
        // Mock successful sign up for demo
        const mockUser = { id: '1', email };
        const mockSession = { access_token: 'demo-token' };
        
        set({ 
          user: mockUser, 
          session: mockSession,
          loading: false 
        });
        
        return { error: null };
      },

      signOut: async () => {
        set({ loading: true });
        set({ 
          user: null, 
          session: null, 
          loading: false 
        });
      },

      initialize: async () => {
        set({ loading: true });
        // For demo, don't auto-login
        set({ 
          user: null, 
          session: null, 
          loading: false, 
          initialized: true 
        });
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