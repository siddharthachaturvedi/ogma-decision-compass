import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';

// Generic hook for Supabase queries
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
      const { data, error } = await queryFn();
      if (error) throw error;
      return data;
    },
    enabled: !!user && (options?.enabled ?? true),
    staleTime: options?.staleTime ?? 5 * 60 * 1000, // 5 minutes
    refetchInterval: options?.refetchInterval,
  });
}

// Generic hook for Supabase mutations
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
      const { data, error } = await mutationFn(variables);
      if (error) throw error;
      return data;
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
    () => supabase
      .from('contexts')
      .select('*')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false }),
    { enabled: !!user }
  );
}

export function useInsights() {
  const user = useAuthStore(state => state.user);
  
  return useSupabaseQuery(
    ['insights', user?.id],
    () => supabase
      .from('insights')
      .select('*')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false }),
    { enabled: !!user }
  );
}

export function useCreateContext() {
  const user = useAuthStore(state => state.user);
  
  return useSupabaseMutation(
    (variables: any) => supabase
      .from('contexts')
      .insert({ ...variables, user_id: user!.id })
      .select()
      .single(),
    {
      invalidateQueries: [['contexts', user?.id]]
    }
  );
}

export function useUpdateContext() {
  const user = useAuthStore(state => state.user);
  
  return useSupabaseMutation(
    ({ id, ...updates }: any) => supabase
      .from('contexts')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user!.id)
      .select()
      .single(),
    {
      invalidateQueries: [['contexts', user?.id]]
    }
  );
}