
import { ContextItem } from '@/types/context';

export const getRelatedContexts = (
  contexts: ContextItem[], 
  contextId: string
): ContextItem[] => {
  const context = contexts.find(c => c.id === contextId);
  if (!context) return [];
  
  return contexts.filter(c => 
    context.connections.includes(c.id) || 
    c.connections.includes(contextId)
  );
};

export const getContextsByType = (
  contexts: ContextItem[], 
  type: ContextItem['type']
): ContextItem[] => {
  return contexts.filter(c => c.type === type);
};

export const getPriorityContexts = (contexts: ContextItem[]): ContextItem[] => {
  return contexts
    .filter(c => c.status === 'active' || c.status === 'pending')
    .sort((a, b) => {
      const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
};
