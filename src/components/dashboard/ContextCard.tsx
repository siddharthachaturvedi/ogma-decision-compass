import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MessageSquare, FileText, Users, Clock, Lightbulb, Brain } from 'lucide-react';
import { ContextItem } from '@/types/context';

interface ContextCardProps {
  context: ContextItem;
  onFocus: (contextId: string) => void;
}

const ContextCard: React.FC<ContextCardProps> = ({ context, onFocus }) => {
  const getTypeIcon = (type: ContextItem['type']) => {
    switch (type) {
      case 'meeting': return <Calendar size={16} />;
      case 'social': return <Users size={16} />;
      case 'email': return <MessageSquare size={16} />;
      case 'document': return <FileText size={16} />;
      case 'memory': return <Clock size={16} />;
      case 'idea': return <Lightbulb size={16} />;
      default: return <Brain size={16} />;
    }
  };

  const getTypeColor = (type: ContextItem['type']) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-700';
      case 'social': return 'bg-green-100 text-green-700';
      case 'email': return 'bg-purple-100 text-purple-700';
      case 'document': return 'bg-orange-100 text-orange-700';
      case 'memory': return 'bg-gray-100 text-gray-700';
      case 'idea': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${getTypeColor(context.type)}`}>
              {getTypeIcon(context.type)}
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">{context.title}</h3>
              <p className="text-sm text-slate-600">{context.content}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge 
              variant={
                context.priority === 'urgent' ? 'destructive' :
                context.priority === 'high' ? 'default' :
                'secondary'
              }
            >
              {context.priority}
            </Badge>
            <Badge variant="outline">{context.status}</Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onFocus(context.id)}
            >
              Focus
            </Button>
          </div>
        </div>
        {context.connections.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-200">
            <p className="text-xs text-slate-500">
              Connected to {context.connections.length} other context(s)
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContextCard;
