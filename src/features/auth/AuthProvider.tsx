import React, { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, setSession, initialize, initialized } = useAuthStore();

  useEffect(() => {
    // Initialize auth state
    initialize();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        setSession(session);
        setUser(session?.user ?? null);

        if (event === 'SIGNED_IN') {
          // Handle sign in
          console.log('User signed in');
        } else if (event === 'SIGNED_OUT') {
          // Handle sign out
          console.log('User signed out');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setSession, initialize]);

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}