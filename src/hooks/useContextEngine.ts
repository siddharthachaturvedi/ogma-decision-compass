
import { useState, useEffect } from 'react';

export interface ContextItem {
  id: string;
  type: 'meeting' | 'social' | 'email' | 'document' | 'memory' | 'idea';
  title: string;
  content: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'active' | 'pending' | 'completed' | 'archived';
  connections: string[]; // IDs of related items
  metadata: Record<string, any>;
}

export interface IntelligenceInsight {
  id: string;
  type: 'pattern' | 'suggestion' | 'warning' | 'opportunity';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
  relatedItems: string[];
  timestamp: Date;
}

interface ContextEngineState {
  contexts: ContextItem[];
  insights: IntelligenceInsight[];
  activeContext: string | null;
  crossModuleConnections: Map<string, string[]>;
}

export const useContextEngine = () => {
  const [state, setState] = useState<ContextEngineState>({
    contexts: [],
    insights: [],
    activeContext: null,
    crossModuleConnections: new Map()
  });

  // Mock data initialization
  useEffect(() => {
    const mockContexts: ContextItem[] = [
      {
        id: 'ctx-1',
        type: 'meeting',
        title: 'Q4 Budget Review',
        content: 'Meeting with finance team discussing budget allocation',
        timestamp: new Date('2024-01-15T10:00:00Z'),
        priority: 'high',
        status: 'completed',
        connections: ['ctx-2', 'ctx-4'],
        metadata: { duration: 45, participants: 4, decisions: 2 }
      },
      {
        id: 'ctx-2',
        type: 'email',
        title: 'Budget Follow-up Email',
        content: 'Draft email to team about budget decisions',
        timestamp: new Date('2024-01-15T11:30:00Z'),
        priority: 'medium',
        status: 'pending',
        connections: ['ctx-1'],
        metadata: { tone: 'professional', recipients: 12 }
      },
      {
        id: 'ctx-3',
        type: 'social',
        title: 'LinkedIn Post - Team Success',
        content: 'Post about successful Q4 planning',
        timestamp: new Date('2024-01-15T14:00:00Z'),
        priority: 'low',
        status: 'active',
        connections: ['ctx-1'],
        metadata: { platform: 'linkedin', scheduled: true }
      },
      {
        id: 'ctx-4',
        type: 'document',
        title: 'Budget Analysis Report',
        content: 'Detailed analysis of Q4 budget proposals',
        timestamp: new Date('2024-01-14T16:20:00Z'),
        priority: 'high',
        status: 'completed',
        connections: ['ctx-1', 'ctx-2'],
        metadata: { pages: 12, insights: 8, riskLevel: 'medium' }
      },
      {
        id: 'ctx-5',
        type: 'idea',
        title: 'Process Improvement Idea',
        content: 'Streamline budget review process with automated reports',
        timestamp: new Date('2024-01-15T09:15:00Z'),
        priority: 'medium',
        status: 'pending',
        connections: [],
        metadata: { category: 'process', impact: 'high' }
      }
    ];

    const mockInsights: IntelligenceInsight[] = [
      {
        id: 'ins-1',
        type: 'pattern',
        title: 'Budget Discussion Pattern',
        description: 'You typically follow budget meetings with team emails and LinkedIn posts',
        confidence: 0.85,
        actionable: true,
        relatedItems: ['ctx-1', 'ctx-2', 'ctx-3'],
        timestamp: new Date()
      },
      {
        id: 'ins-2',
        type: 'suggestion',
        title: 'Content Opportunity',
        description: 'Your budget analysis could make a great thought leadership post',
        confidence: 0.72,
        actionable: true,
        relatedItems: ['ctx-4'],
        timestamp: new Date()
      },
      {
        id: 'ins-3',
        type: 'warning',
        title: 'Pending Follow-up',
        description: 'Budget follow-up email has been pending for 3 hours',
        confidence: 0.95,
        actionable: true,
        relatedItems: ['ctx-2'],
        timestamp: new Date()
      }
    ];

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

  const getRelatedContexts = (contextId: string): ContextItem[] => {
    const context = state.contexts.find(c => c.id === contextId);
    if (!context) return [];
    
    return state.contexts.filter(c => 
      context.connections.includes(c.id) || 
      c.connections.includes(contextId)
    );
  };

  const getContextsByType = (type: ContextItem['type']): ContextItem[] => {
    return state.contexts.filter(c => c.type === type);
  };

  const getPriorityContexts = (): ContextItem[] => {
    return state.contexts
      .filter(c => c.status === 'active' || c.status === 'pending')
      .sort((a, b) => {
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
  };

  return {
    ...state,
    addContext,
    updateContext,
    setActiveContext,
    getRelatedContexts,
    getContextsByType,
    getPriorityContexts
  };
};
