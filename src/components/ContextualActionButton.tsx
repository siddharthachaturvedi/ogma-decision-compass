
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Zap, 
  MessageCircle, 
  Clock, 
  Users, 
  FileText,
  ChevronUp,
  X
} from 'lucide-react';
import { useContextEngine } from '@/hooks/useContextEngine';
import { useAmbientIntelligence } from '@/hooks/useAmbientIntelligence';

interface ContextualActionButtonProps {
  onNavigate: (view: string) => void;
}

const ContextualActionButton: React.FC<ContextualActionButtonProps> = ({ onNavigate }) => {
  const { contexts, insights } = useContextEngine();
  const { ambientState, observePattern } = useAmbientIntelligence();
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestedActions, setSuggestedActions] = useState<Array<{
    id: string;
    label: string;
    description: string;
    action: () => void;
    icon: React.ElementType;
    priority: number;
  }>>([]);

  useEffect(() => {
    const actions = [];
    
    // High priority urgent items
    const urgentContexts = contexts.filter(c => c.priority === 'urgent' && c.status === 'pending');
    if (urgentContexts.length > 0) {
      actions.push({
        id: 'urgent-items',
        label: `${urgentContexts.length} Urgent Items`,
        description: 'Requires immediate attention',
        action: () => onNavigate('hub'),
        icon: Clock,
        priority: 1
      });
    }

    // High confidence insights
    const actionableInsights = insights.filter(i => i.actionable && i.confidence > 0.8);
    if (actionableInsights.length > 0) {
      actions.push({
        id: 'high-confidence-insights',
        label: 'AI Recommendations',
        description: `${actionableInsights.length} high-confidence suggestions`,
        action: () => onNavigate('hub'),
        icon: Zap,
        priority: 2
      });
    }

    // Context-specific suggestions
    if (ambientState.workspaceMode === 'collaborative') {
      actions.push({
        id: 'meeting-prep',
        label: 'Meeting Intelligence',
        description: 'Prepare for upcoming collaboration',
        action: () => onNavigate('meeting'),
        icon: Users,
        priority: 3
      });
    }

    // Time-sensitive email follow-ups
    const pendingEmails = contexts.filter(c => c.type === 'email' && c.status === 'pending');
    if (pendingEmails.length > 0) {
      actions.push({
        id: 'email-followup',
        label: 'Pending Communications',
        description: `${pendingEmails.length} items need responses`,
        action: () => onNavigate('inbox'),
        icon: MessageCircle,
        priority: 4
      });
    }

    // Always available: Quick AI assistance
    actions.push({
      id: 'ai-assistant',
      label: 'AI Assistant',
      description: 'Get help with anything',
      action: () => onNavigate('chat'),
      icon: MessageCircle,
      priority: 5
    });

    setSuggestedActions(actions.sort((a, b) => a.priority - b.priority).slice(0, 4));
  }, [contexts, insights, ambientState.workspaceMode, onNavigate]);

  const handleActionClick = (action: typeof suggestedActions[0]) => {
    observePattern('workflow', `contextual-action-${action.id}`);
    action.action();
    setIsExpanded(false);
  };

  const primaryAction = suggestedActions[0];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Expanded Actions Panel */}
      {isExpanded && suggestedActions.length > 1 && (
        <Card className="mb-4 w-80 glass shadow-large border border-primary/20 animate-scale-in">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-foreground">Suggested Actions</h3>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsExpanded(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {suggestedActions.slice(1).map((action) => (
                <Button
                  key={action.id}
                  variant="ghost"
                  className="w-full justify-start h-auto p-3 hover:bg-primary/10"
                  onClick={() => handleActionClick(action)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-1 bg-primary/10 rounded">
                      <action.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-left flex-1">
                      <div className="font-medium text-sm">{action.label}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Primary Action Button */}
      {primaryAction && (
        <div className="flex items-center space-x-2">
          {suggestedActions.length > 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="glass shadow-medium hover:shadow-large transition-all duration-300"
            >
              <ChevronUp className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </Button>
          )}
          
          <Button
            onClick={() => handleActionClick(primaryAction)}
            className="gradient-primary text-primary-foreground shadow-large hover:shadow-xl hover:scale-110 transition-all duration-300 animate-neural-pulse h-14 px-6"
          >
            <primaryAction.icon className="h-5 w-5 mr-2" />
            <div className="text-left">
              <div className="font-medium text-sm">{primaryAction.label}</div>
              <div className="text-xs opacity-90">{primaryAction.description}</div>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default ContextualActionButton;
