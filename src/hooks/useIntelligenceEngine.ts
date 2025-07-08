
import { useCallback, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { ContextItem, IntelligenceInsight } from '@/types/context';

export const useIntelligenceEngine = () => {
  const { state, dispatch } = useAppContext();

  // Analyze user patterns and generate intelligent suggestions
  const analyzePatterns = useCallback(() => {
    const { userBehavior, contexts, activeView } = state;
    
    // Analyze view transitions to predict next likely actions
    const recentTransitions = userBehavior.viewTransitions.slice(-10);
    const transitionPatterns = recentTransitions.reduce((acc, transition) => {
      const key = `${transition.from}->${transition.to}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Generate contextual suggestions based on current view and patterns
    const suggestions: string[] = [];
    const nextActions: Array<{ id: string; label: string; confidence: number }> = [];

    if (activeView === 'hub') {
      if (userBehavior.featureUsage.chat > 2) {
        suggestions.push("You frequently use AI Chat - consider exploring Memory Keeper to retain insights");
        nextActions.push({ id: 'memory', label: 'Explore Memory Keeper', confidence: 0.8 });
      }
      if (contexts.some(c => c.type === 'document')) {
        suggestions.push("Document contexts detected - Doc Digest could provide deeper analysis");
        nextActions.push({ id: 'digest', label: 'Analyze Documents', confidence: 0.9 });
      }
    }

    if (activeView === 'chat') {
      if (contexts.some(c => c.type === 'meeting')) {
        suggestions.push("Meeting context available - prepare with Meeting Intelligence");
        nextActions.push({ id: 'meeting', label: 'Prepare for Meeting', confidence: 0.85 });
      }
    }

    // Time-based suggestions
    const currentHour = new Date().getHours();
    if (currentHour >= 9 && currentHour <= 11) {
      suggestions.push("Morning focus time - ideal for document analysis and planning");
    } else if (currentHour >= 14 && currentHour <= 16) {
      suggestions.push("Afternoon collaboration window - good time for team communications");
    }

    dispatch({ type: 'UPDATE_SUGGESTIONS', payload: suggestions });
    dispatch({ type: 'UPDATE_NEXT_ACTIONS', payload: nextActions });

    // Generate insights based on patterns
    if (recentTransitions.length >= 5) {
      const mostCommonTransition = Object.entries(transitionPatterns)
        .sort(([,a], [,b]) => b - a)[0];
      
      if (mostCommonTransition && mostCommonTransition[1] >= 2) {
        const insight: IntelligenceInsight = {
          id: `pattern-${Date.now()}`,
          type: 'pattern',
          title: 'Navigation Pattern Detected',
          description: `You often navigate ${mostCommonTransition[0].replace('->', ' to ')}. Consider bookmarking this workflow.`,
          confidence: Math.min(mostCommonTransition[1] / 5, 0.95),
          actionable: true,
          relatedItems: [],
          timestamp: new Date()
        };
        dispatch({ type: 'ADD_INSIGHT', payload: insight });
      }
    }
  }, [state, dispatch]);

  // Track user actions for learning
  const trackAction = useCallback((action: string, context?: string) => {
    dispatch({ 
      type: 'TRACK_BEHAVIOR', 
      payload: { action, context: context || state.activeView } 
    });
  }, [dispatch, state.activeView]);

  // Add context with intelligent connections
  const addIntelligentContext = useCallback((context: Omit<ContextItem, 'id' | 'timestamp' | 'connections'>) => {
    const newContext: ContextItem = {
      ...context,
      id: `ctx-${Date.now()}`,
      timestamp: new Date(),
      connections: []
    };

    // Find related contexts based on type, content similarity, or timing
    const relatedContexts = state.contexts.filter(existingCtx => {
      // Same type contexts are related
      if (existingCtx.type === newContext.type) return true;
      
      // Recent contexts in similar domains
      const timeDiff = new Date().getTime() - existingCtx.timestamp.getTime();
      const isRecent = timeDiff < 24 * 60 * 60 * 1000; // Within 24 hours
      
      if (isRecent && (
        existingCtx.title.toLowerCase().includes(newContext.title.toLowerCase().split(' ')[0]) ||
        newContext.title.toLowerCase().includes(existingCtx.title.toLowerCase().split(' ')[0])
      )) {
        return true;
      }
      
      return false;
    });

    newContext.connections = relatedContexts.slice(0, 3).map(ctx => ctx.id);
    
    dispatch({ type: 'ADD_CONTEXT', payload: newContext });
    
    // Generate insight about the new context
    if (relatedContexts.length > 0) {
      const insight: IntelligenceInsight = {
        id: `connection-${Date.now()}`,
        type: 'opportunity',
        title: 'Context Connections Found',
        description: `New ${newContext.type} context connects to ${relatedContexts.length} existing items`,
        confidence: 0.7,
        actionable: true,
        relatedItems: [newContext.id, ...relatedContexts.map(c => c.id)],
        timestamp: new Date()
      };
      dispatch({ type: 'ADD_INSIGHT', payload: insight });
    }

    return newContext.id;
  }, [state.contexts, dispatch]);

  // Analyze patterns periodically
  useEffect(() => {
    const interval = setInterval(analyzePatterns, 30000); // Every 30 seconds
    return () => clearInterval(interval);
  }, [analyzePatterns]);

  // Initial analysis
  useEffect(() => {
    analyzePatterns();
  }, [state.activeView, state.contexts.length]);

  return {
    trackAction,
    addIntelligentContext,
    analyzePatterns,
    suggestions: state.contextualSuggestions,
    nextActions: state.nextBestActions,
    insights: state.insights,
    contexts: state.contexts
  };
};
