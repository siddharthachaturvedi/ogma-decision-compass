
import { useCallback } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIntelligenceEngine } from './useIntelligenceEngine';

export const useNavigationEngine = () => {
  const { state, dispatch } = useAppContext();
  const { trackAction } = useIntelligenceEngine();

  const navigateToView = useCallback((view: string, reason?: string) => {
    // Track the navigation action
    trackAction(`navigate-to-${view}`, reason);
    
    // Update active view
    dispatch({ type: 'SET_ACTIVE_VIEW', payload: view });
    
    console.log(`Navigation: ${state.activeView} -> ${view}${reason ? ` (${reason})` : ''}`);
  }, [dispatch, trackAction, state.activeView]);

  const navigateWithContext = useCallback((view: string, contextId: string) => {
    dispatch({ type: 'SET_ACTIVE_CONTEXT', payload: contextId });
    navigateToView(view, `context-${contextId}`);
  }, [dispatch, navigateToView]);

  const getViewDescription = useCallback((view: string): string => {
    const descriptions: Record<string, string> = {
      'hub': 'Analyzing cross-platform patterns and intelligence insights',
      'chat': 'AI conversation with contextual learning and memory',
      'inbox': 'Smart email analysis with relationship mapping',
      'digest': 'Document processing with knowledge extraction',
      'tone': 'Communication style analysis and optimization',
      'social': 'Social dynamics and relationship intelligence',
      'meeting': 'Meeting context and collaboration insights',
      'memory': 'Knowledge retention and contextual memory systems'
    };
    return descriptions[view] || 'Processing contextual information';
  }, []);

  const getSuggestedViews = useCallback((currentView: string): string[] => {
    // Use actual user behavior to suggest next views
    const { userBehavior } = state;
    
    // Find common transitions from current view
    const transitionsFromCurrent = userBehavior.viewTransitions
      .filter(t => t.from === currentView)
      .map(t => t.to);
    
    // Count frequency of each destination
    const frequency = transitionsFromCurrent.reduce((acc, view) => {
      acc[view] = (acc[view] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    // Return top 3 most frequent destinations, fallback to defaults
    const suggested = Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([view]) => view);
    
    // Fallback suggestions if no history
    if (suggested.length === 0) {
      const defaults: Record<string, string[]> = {
        'hub': ['chat', 'inbox', 'digest'],
        'chat': ['memory', 'digest', 'hub'],
        'inbox': ['social', 'meeting', 'chat'],
        'digest': ['memory', 'chat', 'hub'],
        'tone': ['social', 'inbox', 'chat'],
        'social': ['meeting', 'tone', 'inbox'],
        'meeting': ['social', 'memory', 'inbox'],
        'memory': ['chat', 'digest', 'hub']
      };
      return defaults[currentView] || ['hub', 'chat', 'memory'];
    }
    
    return suggested;
  }, [state]);

  return {
    activeView: state.activeView,
    navigateToView,
    navigateWithContext,
    getViewDescription,
    getSuggestedViews,
    activeContext: state.activeContext
  };
};
