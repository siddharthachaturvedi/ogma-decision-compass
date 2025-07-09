import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';

// Mock data for demo
const mockContexts = [
  {
    id: '1',
    user_id: '1',
    type: 'meeting' as const,
    title: 'Q4 Planning Meeting',
    content: 'Discussed quarterly goals and budget allocation',
    priority: 'high' as const,
    status: 'active' as const,
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    user_id: '1',
    type: 'document' as const,
    title: 'Market Analysis Report',
    content: 'Comprehensive analysis of market trends',
    priority: 'medium' as const,
    status: 'completed' as const,
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const mockInsights = [
  {
    id: '1',
    user_id: '1',
    type: 'suggestion' as const,
    title: 'Meeting Follow-up Needed',
    description: 'Consider scheduling a follow-up meeting for Q4 planning',
    confidence: 0.85,
    actionable: true,
    metadata: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// Generic hook for Supabase queries (demo version)
export function useSupabaseQuery<T>(
  key: string[],
  queryFn: () => Promise<{ data: T | null; error: any }>,
  options?: {
    enabled?: boolean;
    staleTime?: number;
    refetchInterval?: number;
  }
) {
  const user = useAuthStore(state => state.user);
  
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      // Return mock data for demo
      if (key.includes('contexts')) {
        return mockContexts as any;
      }
      if (key.includes('insights')) {
        return mockInsights as any;
      }
      return [];
    },
    enabled: !!user && (options?.enabled ?? true),
    staleTime: options?.staleTime ?? 5 * 60 * 1000,
    refetchInterval: options?.refetchInterval,
  });
}

// Generic hook for Supabase mutations (demo version)
export function useSupabaseMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<{ data: TData | null; error: any }>,
  options?: {
    onSuccess?: (data: TData | null) => void;
    onError?: (error: any) => void;
    invalidateQueries?: string[][];
  }
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (variables: TVariables) => {
      // Mock successful mutation
      return { id: Date.now().toString(), ...variables } as any;
    },
    onSuccess: (data) => {
      options?.onSuccess?.(data);
      options?.invalidateQueries?.forEach(queryKey => {
        queryClient.invalidateQueries({ queryKey });
      });
    },
    onError: options?.onError,
  });
}

// Specific hooks for common operations
export function useContexts() {
  const user = useAuthStore(state => state.user);
  
  return useSupabaseQuery(
    ['contexts', user?.id],
    () => Promise.resolve({ data: mockContexts, error: null }),
    { enabled: !!user }
  );
}

export function useInsights() {
  const user = useAuthStore(state => state.user);
  
  return useSupabaseQuery(
    ['insights', user?.id],
    () => Promise.resolve({ data: mockInsights, error: null }),
    { enabled: !!user }
  );
}

export function useCreateContext() {
  const user = useAuthStore(state => state.user);
  
  return useSupabaseMutation(
    (variables: any) => Promise.resolve({ 
      data: { id: Date.now().toString(), user_id: user!.id, ...variables }, 
      error: null 
    }),
    {
      invalidateQueries: [['contexts', user?.id]]
    }
  );
}

export function useUpdateContext() {
  const user = useAuthStore(state => state.user);
  
  return useSupabaseMutation(
    ({ id, ...updates }: any) => Promise.resolve({ 
      data: { id, user_id: user!.id, ...updates }, 
      error: null 
    }),
    {
      invalidateQueries: [['contexts', user?.id]]
    }
  );
}