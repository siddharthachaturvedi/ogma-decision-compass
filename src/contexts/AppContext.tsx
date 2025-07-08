
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { ContextItem, IntelligenceInsight } from '@/types/context';

interface UserBehavior {
  viewTransitions: Array<{ from: string; to: string; timestamp: Date }>;
  featureUsage: Record<string, number>;
  timeSpentInViews: Record<string, number>;
  actionPatterns: Array<{ action: string; context: string; timestamp: Date }>;
}

interface AppState {
  // Navigation & UI
  activeView: string;
  isThinking: boolean;
  showOnboarding: boolean;
  
  // Intelligence & Context
  contexts: ContextItem[];
  insights: IntelligenceInsight[];
  activeContext: string | null;
  userBehavior: UserBehavior;
  
  // Real-time suggestions
  contextualSuggestions: string[];
  nextBestActions: Array<{ id: string; label: string; confidence: number }>;
}

type AppAction = 
  | { type: 'SET_ACTIVE_VIEW'; payload: string }
  | { type: 'SET_THINKING'; payload: boolean }
  | { type: 'SET_ONBOARDING'; payload: boolean }
  | { type: 'ADD_CONTEXT'; payload: ContextItem }
  | { type: 'UPDATE_CONTEXT'; payload: { id: string; updates: Partial<ContextItem> } }
  | { type: 'ADD_INSIGHT'; payload: IntelligenceInsight }
  | { type: 'SET_ACTIVE_CONTEXT'; payload: string | null }
  | { type: 'TRACK_BEHAVIOR'; payload: { action: string; context: string } }
  | { type: 'UPDATE_SUGGESTIONS'; payload: string[] }
  | { type: 'UPDATE_NEXT_ACTIONS'; payload: Array<{ id: string; label: string; confidence: number }> };

const initialState: AppState = {
  activeView: 'hub',
  isThinking: false,
  showOnboarding: true,
  contexts: [],
  insights: [],
  activeContext: null,
  userBehavior: {
    viewTransitions: [],
    featureUsage: {},
    timeSpentInViews: {},
    actionPatterns: []
  },
  contextualSuggestions: [],
  nextBestActions: []
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_ACTIVE_VIEW':
      const newTransition = {
        from: state.activeView,
        to: action.payload,
        timestamp: new Date()
      };
      return {
        ...state,
        activeView: action.payload,
        userBehavior: {
          ...state.userBehavior,
          viewTransitions: [...state.userBehavior.viewTransitions, newTransition],
          featureUsage: {
            ...state.userBehavior.featureUsage,
            [action.payload]: (state.userBehavior.featureUsage[action.payload] || 0) + 1
          }
        }
      };

    case 'SET_THINKING':
      return { ...state, isThinking: action.payload };

    case 'SET_ONBOARDING':
      return { ...state, showOnboarding: action.payload };

    case 'ADD_CONTEXT':
      return {
        ...state,
        contexts: [...state.contexts, action.payload]
      };

    case 'UPDATE_CONTEXT':
      return {
        ...state,
        contexts: state.contexts.map(ctx =>
          ctx.id === action.payload.id ? { ...ctx, ...action.payload.updates } : ctx
        )
      };

    case 'ADD_INSIGHT':
      return {
        ...state,
        insights: [...state.insights, action.payload]
      };

    case 'SET_ACTIVE_CONTEXT':
      return { ...state, activeContext: action.payload };

    case 'TRACK_BEHAVIOR':
      return {
        ...state,
        userBehavior: {
          ...state.userBehavior,
          actionPatterns: [
            ...state.userBehavior.actionPatterns,
            { ...action.payload, timestamp: new Date() }
          ]
        }
      };

    case 'UPDATE_SUGGESTIONS':
      return { ...state, contextualSuggestions: action.payload };

    case 'UPDATE_NEXT_ACTIONS':
      return { ...state, nextBestActions: action.payload };

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize with some mock data for demonstration
  useEffect(() => {
    // Add initial contexts
    const initialContexts: ContextItem[] = [
      {
        id: 'ctx-welcome',
        type: 'idea',
        title: 'Welcome to Project Ogma',
        content: 'Your adaptive intelligence platform is ready to learn from your behavior',
        timestamp: new Date(),
        priority: 'medium',
        status: 'active',
        connections: [],
        metadata: { category: 'onboarding' }
      }
    ];

    const initialInsights: IntelligenceInsight[] = [
      {
        id: 'ins-welcome',
        type: 'suggestion',
        title: 'Start Your Intelligence Journey',
        description: 'Begin by exploring different features to help the AI learn your patterns',
        confidence: 0.9,
        actionable: true,
        relatedItems: ['ctx-welcome'],
        timestamp: new Date()
      }
    ];

    initialContexts.forEach(context => {
      dispatch({ type: 'ADD_CONTEXT', payload: context });
    });

    initialInsights.forEach(insight => {
      dispatch({ type: 'ADD_INSIGHT', payload: insight });
    });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
