
import { useState, useEffect, useCallback } from 'react';
import { ContextItem, IntelligenceInsight } from '@/types/context';

interface UserPattern {
  id: string;
  type: 'workflow' | 'timing' | 'collaboration' | 'preference';
  pattern: string;
  confidence: number;
  lastObserved: Date;
  frequency: number;
}

interface AmbientState {
  currentContext: string | null;
  workspaceMode: 'focused' | 'collaborative' | 'creative' | 'analytical' | 'social';
  cognitiveLoad: 'low' | 'medium' | 'high';
  nextSuggestedAction: string | null;
  environmentFactors: {
    timeOfDay: 'morning' | 'afternoon' | 'evening';
    dayOfWeek: string;
    meetingProximity: number; // minutes until next meeting
  };
}

export const useAmbientIntelligence = () => {
  const [patterns, setPatterns] = useState<UserPattern[]>([]);
  const [ambientState, setAmbientState] = useState<AmbientState>({
    currentContext: null,
    workspaceMode: 'focused',
    cognitiveLoad: 'low',
    nextSuggestedAction: null,
    environmentFactors: {
      timeOfDay: 'morning',
      dayOfWeek: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
      meetingProximity: 60
    }
  });

  // Observe user behavior patterns
  const observePattern = useCallback((type: UserPattern['type'], action: string) => {
    const patternId = `${type}-${action}`;
    
    setPatterns(prev => {
      const existing = prev.find(p => p.id === patternId);
      
      if (existing) {
        return prev.map(p => 
          p.id === patternId 
            ? { ...p, frequency: p.frequency + 1, lastObserved: new Date(), confidence: Math.min(p.confidence + 0.1, 1) }
            : p
        );
      }
      
      return [...prev, {
        id: patternId,
        type,
        pattern: action,
        confidence: 0.3,
        lastObserved: new Date(),
        frequency: 1
      }];
    });
  }, []);

  // Update ambient state based on context
  const updateAmbientState = useCallback((updates: Partial<AmbientState>) => {
    setAmbientState(prev => ({ ...prev, ...updates }));
  }, []);

  // Predict next best action
  const predictNextAction = useCallback((contexts: ContextItem[], insights: IntelligenceInsight[]) => {
    const recentPatterns = patterns
      .filter(p => p.confidence > 0.6)
      .sort((a, b) => b.frequency - a.frequency);

    const currentHour = new Date().getHours();
    const timeOfDay = currentHour < 12 ? 'morning' : currentHour < 17 ? 'afternoon' : 'evening';

    // Simple prediction logic based on patterns and context
    let prediction = null;
    
    if (timeOfDay === 'morning' && recentPatterns.some(p => p.pattern.includes('email'))) {
      prediction = "Start with Smart Inbox - you typically review emails first thing";
    } else if (contexts.some(c => c.type === 'meeting' && c.status === 'pending')) {
      prediction = "Prepare for upcoming meeting with Meeting Intelligence";
    } else if (insights.some(i => i.type === 'warning' && i.confidence > 0.8)) {
      prediction = "Address high-priority insights in Intelligence Hub";
    }

    setAmbientState(prev => ({ 
      ...prev, 
      nextSuggestedAction: prediction,
      environmentFactors: { ...prev.environmentFactors, timeOfDay }
    }));
  }, [patterns]);

  // Auto-detect workspace mode
  const detectWorkspaceMode = useCallback((activeView: string, contexts: ContextItem[]) => {
    let mode: AmbientState['workspaceMode'] = 'focused';
    
    if (activeView === 'meeting' || contexts.some(c => c.type === 'meeting' && c.status === 'active')) {
      mode = 'collaborative';
    } else if (activeView === 'social' || contexts.some(c => c.type === 'social')) {
      mode = 'social';
    } else if (activeView === 'digest' || contexts.some(c => c.type === 'document')) {
      mode = 'analytical';
    } else if (activeView === 'tone' || contexts.some(c => c.type === 'idea')) {
      mode = 'creative';
    }
    
    updateAmbientState({ workspaceMode: mode });
    observePattern('workflow', `${mode}-mode-${activeView}`);
  }, [observePattern, updateAmbientState]);

  return {
    patterns,
    ambientState,
    observePattern,
    updateAmbientState,
    predictNextAction,
    detectWorkspaceMode
  };
};
