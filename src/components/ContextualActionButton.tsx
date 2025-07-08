
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  MessageCircle, 
  FileText, 
  Users, 
  Calendar,
  ArrowRight
} from 'lucide-react';

interface ContextualAction {
  id: string;
  label: string;
  description: string;
  icon: any;
  action: () => void;
}

interface ContextualActionButtonProps {
  currentContext: string;
  onNavigate: (view: string) => void;
}

const ContextualActionButton: React.FC<ContextualActionButtonProps> = ({
  currentContext,
  onNavigate
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getContextualActions = (): ContextualAction[] => {
    // Dynamic actions based on context
    return [
      {
        id: 'chat-assist',
        label: 'Ask AI Assistant',
        description: 'Get help with current task',
        icon: MessageCircle,
        action: () => onNavigate('chat')
      },
      {
        id: 'doc-review',
        label: 'Review Documents',
        description: 'Analyze related documents',
        icon: FileText,
        action: () => onNavigate('digest')
      },
      {
        id: 'team-sync',
        label: 'Sync with Team',
        description: 'Check team communications',
        icon: Users,
        action: () => onNavigate('meeting')
      },
      {
        id: 'schedule-focus',
        label: 'Schedule Focus Time',
        description: 'Block time for deep work',
        icon: Calendar,
        action: () => console.log('Schedule focus time')
      }
    ];
  };

  const actions = getContextualActions();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Action Menu */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 w-72 space-y-2 animate-predictive-emerge">
          {actions.map((action, index) => (
            <div
              key={action.id}
              className="glass shadow-medium rounded-lg p-3 cursor-pointer hover:shadow-large hover:scale-[1.02] transition-all duration-200"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => {
                action.action();
                setIsExpanded(false);
              }}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-md bg-primary/5">
                  <action.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">
                    {action.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {action.description}
                  </div>
                </div>
                <ArrowRight className="h-3 w-3 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Main Action Button */}
      <Button
        className={`group relative h-12 w-12 rounded-full gradient-primary text-primary-foreground shadow-large hover:shadow-xl transition-all duration-300 animate-neural-pulse ${
          isExpanded ? 'scale-110 rotate-45' : 'hover:scale-110'
        }`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Zap className="h-5 w-5" />
        
        {/* Tooltip */}
        {!isExpanded && (
          <div className="absolute -top-14 right-0 glass shadow-medium rounded-md px-3 py-2 text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Context-aware actions
          </div>
        )}
      </Button>
    </div>
  );
};

export default ContextualActionButton;
