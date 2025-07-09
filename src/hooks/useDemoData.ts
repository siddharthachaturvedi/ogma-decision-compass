import { useQuery } from '@tanstack/react-query';

// Enhanced mock data for demo
const mockContexts = [
  {
    id: '1',
    user_id: '1',
    type: 'meeting' as const,
    title: 'Q4 Planning Meeting',
    content: 'Discussed quarterly goals, budget allocation, and team expansion plans. Key decisions made on product roadmap and resource allocation.',
    priority: 'high' as const,
    status: 'active' as const,
    metadata: {
      attendees: ['Sarah Johnson', 'Mike Chen', 'Alex Rodriguez'],
      duration: '90 minutes',
      actionItems: 3
    },
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    updated_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    user_id: '1',
    type: 'document' as const,
    title: 'Market Analysis Report',
    content: 'Comprehensive analysis of market trends, competitor landscape, and growth opportunities for Q1 2025.',
    priority: 'medium' as const,
    status: 'completed' as const,
    metadata: {
      pages: 24,
      insights: 8,
      recommendations: 5
    },
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updated_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    user_id: '1',
    type: 'email' as const,
    title: 'Client Feedback Summary',
    content: 'Consolidated feedback from key clients regarding product features and service improvements.',
    priority: 'high' as const,
    status: 'pending' as const,
    metadata: {
      clients: 5,
      sentiment: 'positive',
      urgentItems: 2
    },
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    user_id: '1',
    type: 'task' as const,
    title: 'Product Roadmap Review',
    content: 'Review and update product roadmap based on market analysis and client feedback.',
    priority: 'medium' as const,
    status: 'active' as const,
    metadata: {
      deadline: '2025-01-15',
      assignee: 'Product Team',
      progress: 60
    },
    created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
    updated_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() // 4 hours ago
  },
  {
    id: '5',
    user_id: '1',
    type: 'conversation' as const,
    title: 'AI Strategy Discussion',
    content: 'Brainstorming session on implementing AI features in our product suite.',
    priority: 'low' as const,
    status: 'completed' as const,
    metadata: {
      participants: ['Tech Team', 'Product Team'],
      ideas: 12,
      feasible: 7
    },
    created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updated_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString()
  }
];

const mockInsights = [
  {
    id: '1',
    user_id: '1',
    type: 'suggestion' as const,
    title: 'Meeting Follow-up Needed',
    description: 'Three action items from the Q4 Planning Meeting require immediate attention. Consider scheduling individual check-ins with team leads.',
    confidence: 0.92,
    actionable: true,
    metadata: {
      relatedContext: 'Q4 Planning Meeting',
      urgency: 'high',
      estimatedTime: '30 minutes'
    },
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
    updated_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    user_id: '1',
    type: 'pattern' as const,
    title: 'Recurring Client Concerns',
    description: 'Analysis shows similar feedback patterns across multiple clients regarding feature requests. This presents a product development opportunity.',
    confidence: 0.87,
    actionable: true,
    metadata: {
      pattern: 'Feature Requests',
      frequency: 'Weekly',
      impact: 'High'
    },
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    updated_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    user_id: '1',
    type: 'optimization' as const,
    title: 'Meeting Efficiency Opportunity',
    description: 'Your recent meetings average 20% longer than scheduled. Consider implementing time-boxing techniques for better productivity.',
    confidence: 0.78,
    actionable: true,
    metadata: {
      metric: 'Meeting Duration',
      improvement: '20% time savings',
      difficulty: 'Easy'
    },
    created_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    updated_at: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    user_id: '1',
    type: 'connection' as const,
    title: 'Cross-Context Insight',
    description: 'Market analysis findings align with client feedback trends. This correlation suggests prioritizing mobile-first features in the roadmap.',
    confidence: 0.94,
    actionable: true,
    metadata: {
      contexts: ['Market Analysis', 'Client Feedback'],
      correlation: 0.89,
      recommendation: 'Mobile-first development'
    },
    created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
    updated_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '5',
    user_id: '1',
    type: 'prediction' as const,
    title: 'Budget Allocation Forecast',
    description: 'Based on current spending patterns and Q4 decisions, you may exceed the engineering budget by 8% in Q1. Early adjustment recommended.',
    confidence: 0.83,
    actionable: true,
    metadata: {
      forecast: 'Budget Overrun',
      timeline: 'Q1 2025',
      severity: 'Medium'
    },
    created_at: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), // 10 hours ago
    updated_at: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString()
  }
];

// Hook for contexts
export function useContexts() {
  return useQuery({
    queryKey: ['contexts'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockContexts;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook for insights
export function useInsights() {
  return useQuery({
    queryKey: ['insights'],
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockInsights;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook for creating contexts (demo)
export function useCreateContext() {
  return {
    mutate: (data: any) => {
      console.log('Demo: Creating context', data);
      // In a real app, this would make an API call
    },
    isLoading: false,
    error: null
  };
}

// Hook for updating contexts (demo)
export function useUpdateContext() {
  return {
    mutate: (data: any) => {
      console.log('Demo: Updating context', data);
      // In a real app, this would make an API call
    },
    isLoading: false,
    error: null
  };
}