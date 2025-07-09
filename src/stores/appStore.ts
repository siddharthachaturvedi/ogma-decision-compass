import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface AppState {
  // Navigation
  activeView: string;
  previousView: string | null;
  
  // UI State
  sidebarCollapsed: boolean;
  isThinking: boolean;
  
  // Context & Intelligence
  activeContextId: string | null;
  
  // User Behavior Tracking
  viewTransitions: Array<{
    from: string;
    to: string;
    timestamp: Date;
  }>;
  
  // Notifications
  notifications: Array<{
    id: string;
    type: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    timestamp: Date;
  }>;
}

interface AppActions {
  // Navigation
  setActiveView: (view: string) => void;
  
  // UI Actions
  setSidebarCollapsed: (collapsed: boolean) => void;
  setThinking: (thinking: boolean) => void;
  
  // Context Actions
  setActiveContext: (contextId: string | null) => void;
  
  // Behavior Tracking
  trackViewTransition: (from: string, to: string) => void;
  
  // Notifications
  addNotification: (notification: Omit<AppState['notifications'][0], 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useAppStore = create<AppState & AppActions>()(
  subscribeWithSelector((set, get) => ({
    // Initial State
    activeView: 'dashboard',
    previousView: null,
    sidebarCollapsed: false,
    isThinking: false,
    activeContextId: null,
    viewTransitions: [],
    notifications: [],

    // Actions
    setActiveView: (view: string) => {
      const currentView = get().activeView;
      set({ 
        previousView: currentView,
        activeView: view 
      });
      get().trackViewTransition(currentView, view);
    },

    setSidebarCollapsed: (collapsed: boolean) => {
      set({ sidebarCollapsed: collapsed });
    },

    setThinking: (thinking: boolean) => {
      set({ isThinking: thinking });
    },

    setActiveContext: (contextId: string | null) => {
      set({ activeContextId: contextId });
    },

    trackViewTransition: (from: string, to: string) => {
      set(state => ({
        viewTransitions: [
          ...state.viewTransitions.slice(-50), // Keep last 50 transitions
          { from, to, timestamp: new Date() }
        ]
      }));
    },

    addNotification: (notification) => {
      const id = crypto.randomUUID();
      set(state => ({
        notifications: [
          ...state.notifications,
          { ...notification, id, timestamp: new Date() }
        ]
      }));
    },

    removeNotification: (id: string) => {
      set(state => ({
        notifications: state.notifications.filter(n => n.id !== id)
      }));
    },

    clearNotifications: () => {
      set({ notifications: [] });
    }
  }))
);