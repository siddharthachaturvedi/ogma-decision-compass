// Mock Supabase client for demo purposes
export const supabase = {
  auth: {
    signUp: async (credentials: any) => ({
      data: { user: { id: '1', email: credentials.email }, session: { access_token: 'demo' } },
      error: null
    }),
    signInWithPassword: async (credentials: any) => ({
      data: { user: { id: '1', email: credentials.email }, session: { access_token: 'demo' } },
      error: null
    }),
    signOut: async () => ({ error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    getUser: async () => ({ data: { user: null }, error: null }),
    onAuthStateChange: (callback: any) => ({
      data: { subscription: { unsubscribe: () => {} } }
    })
  },
  from: (table: string) => ({
    select: (columns: string) => ({
      eq: (column: string, value: any) => ({
        order: (column: string, options: any) => Promise.resolve({ data: [], error: null })
      })
    }),
    insert: (data: any) => ({
      select: () => ({
        single: () => Promise.resolve({ data: { id: Date.now().toString(), ...data }, error: null })
      })
    }),
    update: (data: any) => ({
      eq: (column: string, value: any) => ({
        select: () => ({
          single: () => Promise.resolve({ data: { id: value, ...data }, error: null })
        })
      })
    })
  })
};

// Auth helpers for demo
export const auth = {
  signUp: async (email: string, password: string) => {
    return {
      data: { 
        user: { id: '1', email }, 
        session: { access_token: 'demo-token' } 
      },
      error: null
    };
  },

  signIn: async (email: string, password: string) => {
    return {
      data: { 
        user: { id: '1', email }, 
        session: { access_token: 'demo-token' } 
      },
      error: null
    };
  },

  signOut: async () => {
    return { error: null };
  },

  getSession: async () => {
    return { session: null, error: null };
  },

  getUser: async () => {
    return { user: null, error: null };
  }
};