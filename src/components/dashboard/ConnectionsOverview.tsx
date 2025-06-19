
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MessageSquare, FileText, Users, Clock, Lightbulb, Brain } from 'lucide-react';
import { ContextItem } from '@/hooks/useContextEngine';

interface ConnectionsOverviewProps {
  contexts: ContextItem[];
}

const ConnectionsOverview: React.FC<ConnectionsOverviewProps> = ({ contexts }) => {
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

  const connectionStats = ['meeting', 'social', 'email', 'document', 'memory', 'idea'].map((type) => {
    const typeContexts = contexts.filter(c => c.type === type);
    const connections = typeContexts.reduce((sum, ctx) => sum + ctx.connections.length, 0);
    
    return {
      type: type as ContextItem['type'],
      itemCount: typeContexts.length,
      connectionCount: connections
    };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cross-Module Activity Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connectionStats.map(({ type, itemCount, connectionCount }) => (
              <div key={type} className="p-4 border rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`p-1 rounded ${getTypeColor(type)}`}>
                    {getTypeIcon(type)}
                  </div>
                  <span className="font-medium capitalize">{type}</span>
                </div>
                <div className="text-sm text-slate-600">
                  <p>{itemCount} items</p>
                  <p>{connectionCount} connections</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConnectionsOverview;
