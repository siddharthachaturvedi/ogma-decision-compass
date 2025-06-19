
import { ContextItem, IntelligenceInsight } from '@/types/context';

export const mockContexts: ContextItem[] = [
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

export const mockInsights: IntelligenceInsight[] = [
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
