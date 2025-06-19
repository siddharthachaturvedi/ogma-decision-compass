
import { useState, useEffect } from 'react';
import { ContextItem, IntelligenceInsight, ContextEngineState } from '@/types/context';
import { mockContexts, mockInsights } from '@/data/mockContextData';
import { getRelatedContexts, getContextsByType, getPriorityContexts } from '@/utils/contextUtils';

export const useContextEngine = () => {
  const [state, setState] = useState<ContextEngineState>({
    contexts: [],
    insights: [],
    activeContext: null,
    crossModuleConnections: new Map()
  });

  // Mock data initialization
  useEffect(() => {
    setState(prev => ({
      ...prev,
      contexts: mockContexts,
      insights: mockInsights
    }));
  }, []);

  const addContext = (context: Omit<ContextItem, 'id' | 'timestamp'>) => {
    const newContext: ContextItem = {
      ...context,
      id: `ctx-${Date.now()}`,
      timestamp: new Date()
    };
    
    setState(prev => ({
      ...prev,
      contexts: [...prev.contexts, newContext]
    }));
    
    return newContext.id;
  };

  const updateContext = (id: string, updates: Partial<ContextItem>) => {
    setState(prev => ({
      ...prev,
      contexts: prev.contexts.map(ctx =>
        ctx.id === id ? { ...ctx, ...updates } : ctx
      )
    }));
  };

  const setActiveContext = (contextId: string | null) => {
    setState(prev => ({ ...prev, activeContext: contextId }));
  };

  return {
    ...state,
    addContext,
    updateContext,
    setActiveContext,
    getRelatedContexts: (contextId: string) => getRelatedContexts(state.contexts, contextId),
    getContextsByType: (type: ContextItem['type']) => getContextsByType(state.contexts, type),
    getPriorityContexts: () => getPriorityContexts(state.contexts)
  };
};

// Re-export types for backward compatibility
export type { ContextItem, IntelligenceInsight };
