
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Users, 
  Lightbulb,
  Clock,
  AlertTriangle,
  TrendingUp,
  Target,
  Zap,
  Eye
} from 'lucide-react';
import { useContextEngine, ContextItem } from '@/hooks/useContextEngine';
import { useEmotionalColor } from '@/hooks/useEmotionalColor';
import KineticText from '@/components/KineticText';

interface UnifiedDashboardProps {
  onNavigate: (view: string) => void;
}

const UnifiedDashboard: React.FC<UnifiedDashboardProps> = ({ onNavigate }) => {
  const { contexts, insights, getPriorityContexts, setActiveContext } = useContextEngine();
  const { colors } = useEmotionalColor('analytical');
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);

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

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'pattern': return <TrendingUp size={16} />;
      case 'suggestion': return <Lightbulb size={16} />;
      case 'warning': return <AlertTriangle size={16} />;
      case 'opportunity': return <Target size={16} />;
      default: return <Brain size={16} />;
    }
  };

  const priorityContexts = getPriorityContexts();
  const activeContexts = contexts.filter(c => c.status === 'active');
  const pendingContexts = contexts.filter(c => c.status === 'pending');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-2">
            <div style={{ color: colors.primary }}>
              <Brain />
            </div>
            <KineticText variant="title" emotion="analytical">
              Intelligence Hub
            </KineticText>
          </h1>
          <KineticText variant="body" emotion="analytical" className="text-slate-600">
            Your unified context engine across all activities
          </KineticText>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => onNavigate('chat')}>
            <Zap size={16} className="mr-2" />
            AI Assistant
          </Button>
          <Button onClick={() => onNavigate('memory')}>
            <Eye size={16} className="mr-2" />
            Memory Keeper
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Active Contexts</p>
                <p className="text-2xl font-bold">{activeContexts.length}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Brain className="text-blue-600" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Pending Actions</p>
                <p className="text-2xl font-bold">{pendingContexts.length}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="text-orange-600" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">AI Insights</p>
                <p className="text-2xl font-bold">{insights.length}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <Lightbulb className="text-green-600" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Connections</p>
                <p className="text-2xl font-bold">
                  {contexts.reduce((sum, ctx) => sum + ctx.connections.length, 0)}
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="text-purple-600" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="insights" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="contexts">Active Contexts</TabsTrigger>
          <TabsTrigger value="connections">Cross-Module Connections</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {insights.map((insight) => (
              <Card 
                key={insight.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedInsight === insight.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedInsight(insight.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      insight.type === 'warning' ? 'bg-red-100 text-red-600' :
                      insight.type === 'opportunity' ? 'bg-green-100 text-green-600' :
                      insight.type === 'suggestion' ? 'bg-blue-100 text-blue-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-slate-900">{insight.title}</h3>
                        <Badge variant={insight.confidence > 0.8 ? "default" : "secondary"}>
                          {Math.round(insight.confidence * 100)}% confident
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{insight.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500">
                          {insight.relatedItems.length} related items
                        </span>
                        {insight.actionable && (
                          <Button size="sm" variant="outline">
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contexts" className="space-y-4">
          <div className="space-y-3">
            {priorityContexts.map((context) => (
              <Card key={context.id} className="hover:shadow-md transition-shadow">
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
                        onClick={() => setActiveContext(context.id)}
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
            ))}
          </div>
        </TabsContent>

        <TabsContent value="connections" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cross-Module Activity Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['meeting', 'social', 'email', 'document', 'memory', 'idea'].map((type) => {
                    const typeContexts = contexts.filter(c => c.type === type);
                    const connections = typeContexts.reduce((sum, ctx) => sum + ctx.connections.length, 0);
                    
                    return (
                      <div key={type} className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className={`p-1 rounded ${getTypeColor(type as ContextItem['type'])}`}>
                            {getTypeIcon(type as ContextItem['type'])}
                          </div>
                          <span className="font-medium capitalize">{type}</span>
                        </div>
                        <div className="text-sm text-slate-600">
                          <p>{typeContexts.length} items</p>
                          <p>{connections} connections</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UnifiedDashboard;
