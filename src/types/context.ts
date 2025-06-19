
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

export interface ContextEngineState {
  contexts: ContextItem[];
  insights: IntelligenceInsight[];
  activeContext: string | null;
  crossModuleConnections: Map<string, string[]>;
}
