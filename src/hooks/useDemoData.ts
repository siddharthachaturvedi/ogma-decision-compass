import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

// Enhanced mock data with more realistic content
const initialContexts = [
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
      actionItems: 3,
      nextSteps: ['Finalize hiring plan', 'Review budget allocation', 'Update product specs']
    },
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
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
      recommendations: 5,
      keyFindings: ['Mobile-first trend accelerating', 'AI adoption increasing 40% YoY', 'Customer retention focus critical']
    },
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
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
      urgentItems: 2,
      commonRequests: ['Mobile app improvements', 'Better reporting', 'API enhancements']
    },
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
  }
];

const initialInsights = [
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
      estimatedTime: '30 minutes',
      suggestedActions: ['Schedule check-in with Sarah', 'Review budget docs', 'Update timeline']
    },
    created_at: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
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
      impact: 'High',
      affectedClients: ['TechCorp', 'InnovateLabs', 'DataFlow Inc']
    },
    created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
  }
];

// Dynamic data generation
const generateNewContext = () => {
  const types = ['meeting', 'document', 'email', 'task', 'conversation'] as const;
  const priorities = ['low', 'medium', 'high'] as const;
  const statuses = ['active', 'pending', 'completed'] as const;
  
  const contextTemplates = [
    {
      type: 'meeting',
      titles: ['Weekly Standup', 'Client Review', 'Product Demo', 'Team Sync', 'Strategy Session'],
      content: 'Meeting notes and key discussion points captured automatically.'
    },
    {
      type: 'email',
      titles: ['Partnership Inquiry', 'Feature Request', 'Support Ticket', 'Newsletter Update', 'Meeting Invite'],
      content: 'Email thread analyzed for key information and action items.'
    },
    {
      type: 'document',
      titles: ['Technical Spec', 'User Guide', 'Proposal Draft', 'Research Notes', 'Project Plan'],
      content: 'Document processed and key insights extracted automatically.'
    }
  ];

  const randomType = types[Math.floor(Math.random() * types.length)];
  const template = contextTemplates.find(t => t.type === randomType) || contextTemplates[0];
  const randomTitle = template.titles[Math.floor(Math.random() * template.titles.length)];

  return {
    id: `dynamic-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    user_id: '1',
    type: randomType,
    title: randomTitle,
    content: template.content,
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    metadata: {
      autoGenerated: true,
      confidence: Math.random() * 0.3 + 0.7 // 0.7 to 1.0
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
};

const generateNewInsight = () => {
  const types = ['suggestion', 'pattern', 'optimization', 'connection', 'prediction'] as const;
  
  const insightTemplates = [
    {
      type: 'suggestion',
      title: 'Action Item Detected',
      description: 'New task identified from recent activity that may require your attention.'
    },
    {
      type: 'pattern',
      title: 'Trend Analysis',
      description: 'Recurring pattern detected across multiple data points.'
    },
    {
      type: 'optimization',
      title: 'Efficiency Opportunity',
      description: 'Potential workflow improvement identified based on your activity.'
    },
    {
      type: 'connection',
      title: 'Context Link Found',
      description: 'Related information discovered across different contexts.'
    },
    {
      type: 'prediction',
      title: 'Predictive Alert',
      description: 'Forecast based on current trends and historical data.'
    }
  ];

  const template = insightTemplates[Math.floor(Math.random() * insightTemplates.length)];

  return {
    id: `insight-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    user_id: '1',
    type: template.type,
    title: template.title,
    description: template.description,
    confidence: Math.random() * 0.3 + 0.7,
    actionable: Math.random() > 0.3,
    metadata: {
      autoGenerated: true,
      timestamp: new Date().toISOString()
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
};

// Global state for dynamic data
let dynamicContexts = [...initialContexts];
let dynamicInsights = [...initialInsights];

// Chat messages state
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    thinking?: boolean;
    relatedContext?: string;
    confidence?: number;
  };
}

let chatMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hello! I'm your AI assistant. I can help you with tasks, answer questions, and provide insights based on your data. I've already analyzed your recent meeting notes and can suggest some follow-up actions. What would you like to explore today?",
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    metadata: { confidence: 0.95 }
  }
];

// Hook for contexts with dynamic updates
export function useContexts() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new contexts (20% chance every 10 seconds)
      if (Math.random() < 0.2) {
        const newContext = generateNewContext();
        dynamicContexts = [newContext, ...dynamicContexts].slice(0, 20); // Keep last 20
        setLastUpdate(Date.now());
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return useQuery({
    queryKey: ['contexts', lastUpdate],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return [...dynamicContexts];
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Hook for insights with dynamic updates
export function useInsights() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new insights (15% chance every 15 seconds)
      if (Math.random() < 0.15) {
        const newInsight = generateNewInsight();
        dynamicInsights = [newInsight, ...dynamicInsights].slice(0, 15); // Keep last 15
        setLastUpdate(Date.now());
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return useQuery({
    queryKey: ['insights', lastUpdate],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 200));
      return [...dynamicInsights];
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Hook for chat messages
export function useChatMessages() {
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  return useQuery({
    queryKey: ['chat-messages', lastUpdate],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 100));
      return [...chatMessages];
    },
    staleTime: 1 * 60 * 1000,
    refetchInterval: 2000, // Refetch every 2 seconds for real-time feel
  });
}

// Hook for sending chat messages
export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (message: string) => {
      // Add user message immediately
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: message,
        timestamp: new Date(),
      };
      
      chatMessages = [...chatMessages, userMessage];
      queryClient.invalidateQueries({ queryKey: ['chat-messages'] });

      // Simulate AI thinking
      const thinkingMessage: ChatMessage = {
        id: `thinking-${Date.now()}`,
        role: 'assistant',
        content: 'Analyzing your request...',
        timestamp: new Date(),
        metadata: { thinking: true }
      };
      
      chatMessages = [...chatMessages, thinkingMessage];
      queryClient.invalidateQueries({ queryKey: ['chat-messages'] });

      // Simulate AI response delay
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

      // Remove thinking message and add real response
      chatMessages = chatMessages.filter(msg => msg.id !== thinkingMessage.id);

      // Generate contextual AI response
      const aiResponse = generateAIResponse(message);
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: aiResponse.content,
        timestamp: new Date(),
        metadata: aiResponse.metadata
      };

      chatMessages = [...chatMessages, assistantMessage];
      return assistantMessage;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-messages'] });
    },
  });
}

// AI response generation
function generateAIResponse(userMessage: string): { content: string; metadata: any } {
  const lowerMessage = userMessage.toLowerCase();
  
  // Context-aware responses based on user input
  if (lowerMessage.includes('meeting') || lowerMessage.includes('q4')) {
    return {
      content: "I can see you're interested in the Q4 Planning Meeting. Based on my analysis, there are 3 key action items that need attention: finalizing the hiring plan with Sarah, reviewing budget allocation, and updating product specifications. Would you like me to draft follow-up emails for any of these items?",
      metadata: { 
        confidence: 0.94, 
        relatedContext: 'Q4 Planning Meeting',
        suggestedActions: ['Draft email to Sarah', 'Review budget docs', 'Update specs']
      }
    };
  }
  
  if (lowerMessage.includes('client') || lowerMessage.includes('feedback')) {
    return {
      content: "I've analyzed the recent client feedback and identified some interesting patterns. Multiple clients are requesting mobile app improvements and better reporting features. This aligns with our market analysis showing a 40% increase in mobile-first preferences. Should I prepare a summary of these requests for the product team?",
      metadata: { 
        confidence: 0.89, 
        relatedContext: 'Client Feedback Summary',
        patterns: ['Mobile improvements', 'Reporting features']
      }
    };
  }
  
  if (lowerMessage.includes('document') || lowerMessage.includes('analysis')) {
    return {
      content: "I can help you process and analyze documents. The recent Market Analysis Report revealed some key trends: mobile-first adoption is accelerating, AI adoption is up 40% year-over-year, and customer retention is becoming critical. Would you like me to dive deeper into any of these findings or help you create action items based on them?",
      metadata: { 
        confidence: 0.91, 
        relatedContext: 'Market Analysis Report',
        keyInsights: ['Mobile-first trend', 'AI adoption growth', 'Retention focus']
      }
    };
  }
  
  if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
    return {
      content: "I'm your intelligent assistant that connects all your contexts. I can help you with meeting follow-ups, analyze documents, process emails, suggest optimizations, and identify patterns across your work. I've already noticed some connections between your recent market analysis and client feedback that might interest you. What specific area would you like to explore?",
      metadata: { 
        confidence: 0.96,
        capabilities: ['Meeting analysis', 'Document processing', 'Email insights', 'Pattern recognition']
      }
    };
  }
  
  // Default contextual responses
  const defaultResponses = [
    {
      content: "That's an interesting point. Based on your recent activity, I can see connections to your Q4 planning and client feedback. Let me analyze how this relates to your current priorities and suggest some actionable next steps.",
      metadata: { confidence: 0.82, relatedContext: 'Recent Activity' }
    },
    {
      content: "I understand what you're looking for. From analyzing your recent contexts, I notice this ties into the patterns I've been tracking around your team's productivity and client satisfaction. Would you like me to elaborate on these connections?",
      metadata: { confidence: 0.78, relatedContext: 'Pattern Analysis' }
    },
    {
      content: "Great question! This reminds me of insights from your recent market analysis. I can see how this connects to the mobile-first trends and client requests we've been tracking. Let me provide some context-aware suggestions.",
      metadata: { confidence: 0.85, relatedContext: 'Market Trends' }
    }
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Hook for creating contexts
export function useCreateContext() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: any) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const newContext = {
        ...data,
        id: `created-${Date.now()}`,
        user_id: '1',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      dynamicContexts = [newContext, ...dynamicContexts];
      return newContext;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contexts'] });
    },
  });
}

// Hook for updating contexts
export function useUpdateContext() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...data }: any) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      dynamicContexts = dynamicContexts.map(context => 
        context.id === id 
          ? { ...context, ...data, updated_at: new Date().toISOString() }
          : context
      );
      return { id, ...data };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contexts'] });
    },
  });
}

// Hook for tone analysis
export function useToneAnalysis() {
  return useMutation({
    mutationFn: async (text: string): Promise<{ analysis: Record<string, number>; suggestions: Array<{ type: string; message: string; example: string }> }> => {
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));
      
      // Simulate tone analysis
      const analysis = {
        professional: Math.random() * 40 + 60, // 60-100%
        friendly: Math.random() * 50 + 30,     // 30-80%
        urgent: Math.random() * 60 + 10,       // 10-70%
        confident: Math.random() * 40 + 40,    // 40-80%
        empathetic: Math.random() * 50 + 20,   // 20-70%
      };
      
      const suggestions = [];
      
      if (analysis.professional < 75) {
        suggestions.push({
          type: 'improvement',
          message: 'Consider using more formal language to enhance professionalism',
          example: 'Replace "Hey there" with "Dear [Name]" or "Hello [Name]"'
        });
      }
      
      if (analysis.friendly > 85) {
        suggestions.push({
          type: 'balance',
          message: 'Excellent friendly tone! Consider balancing with professional elements',
          example: 'Add a clear call-to-action or formal closing'
        });
      }
      
      if (analysis.urgent > 65) {
        suggestions.push({
          type: 'caution',
          message: 'High urgency detected - ensure this tone is intentional',
          example: 'Consider softening with phrases like "when convenient" or "at your earliest opportunity"'
        });
      }
      
      if (analysis.empathetic < 40 && text.toLowerCase().includes('problem')) {
        suggestions.push({
          type: 'improvement',
          message: 'Consider adding more empathetic language when discussing issues',
          example: 'Use phrases like "I understand this may be challenging" or "I appreciate your patience"'
        });
      }
      
      return { analysis, suggestions };
    },
  });
}

// Hook for document processing
export function useDocumentProcess() {
  return useMutation({
    mutationFn: async (file: File): Promise<{ fileName: string; fileSize: number; summary: string; insights: string[]; confidence: number; processingTime: number }> => {
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
      
      // Simulate document processing
      const documentInsights = [
        'Key themes identified: strategic planning, operational efficiency, market expansion',
        'Action items extracted: 8 high-priority tasks requiring immediate attention',
        'Sentiment analysis: 82% positive outlook, 12% neutral, 6% areas of concern',
        'Related contexts found: Q4 Planning Meeting, Client Feedback Summary, Market Analysis',
        'Financial projections indicate 15% growth potential in identified market segments',
        'Risk assessment reveals 3 critical areas requiring mitigation strategies',
        'Stakeholder alignment score: 94% consensus on proposed initiatives',
        'Timeline analysis suggests 6-month implementation window for optimal results'
      ];
      
      const summary = `Document "${file.name}" has been comprehensively analyzed using advanced AI processing. The analysis reveals a strong strategic focus on operational improvements and market expansion initiatives. Key stakeholders mentioned include executive leadership, department heads, and external partners. The document contains actionable insights for Q1-Q2 implementation with clear success metrics and risk mitigation strategies.`;
      
      return {
        fileName: file.name,
        fileSize: file.size,
        summary,
        insights: documentInsights,
        confidence: Math.random() * 0.15 + 0.85, // 85-100% confidence
        processingTime: Math.floor(Math.random() * 2500 + 1500) // 1.5-4 seconds
      };
    },
  });
}