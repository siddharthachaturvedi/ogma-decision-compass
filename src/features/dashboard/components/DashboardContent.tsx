import React from 'react';
import { useAppStore } from '@/stores/appStore';
import { useContexts, useInsights } from '@/hooks/useSupabaseQuery';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  MessageCircle, 
  Mail, 
  FileText, 
  Users, 
  Clock,
  TrendingUp,
  Lightbulb,
  Activity,
  Zap
} from 'lucide-react';

export function DashboardContent() {
  const { activeView, setActiveView } = useAppStore();
  const { data: contexts = [], isLoading: contextsLoading } = useContexts();
  const { data: insights = [], isLoading: insightsLoading } = useInsights();

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'chat':
        return <ChatView />;
      case 'inbox':
        return <InboxView />;
      case 'digest':
        return <DigestView />;
      case 'tone':
        return <ToneView />;
      case 'social':
        return <SocialView />;
      case 'meeting':
        return <MeetingView />;
      case 'memory':
        return <MemoryView />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="p-6">
      {renderActiveView()}
    </div>
  );
}

function DashboardOverview() {
  const { data: contexts = [] } = useContexts();
  const { data: insights = [] } = useInsights();
  const { setActiveView } = useAppStore();

  const stats = [
    {
      title: 'Active Contexts',
      value: contexts.filter(c => c.status === 'active').length,
      icon: Brain,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'AI Insights',
      value: insights.length,
      icon: Lightbulb,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Pending Actions',
      value: contexts.filter(c => c.status === 'pending').length,
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Total Interactions',
      value: contexts.length,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const quickActions = [
    {
      title: 'Start AI Chat',
      description: 'Begin a conversation with your AI assistant',
      icon: MessageCircle,
      action: () => setActiveView('chat'),
      color: 'bg-blue-600',
    },
    {
      title: 'Process Documents',
      description: 'Upload and analyze documents with AI',
      icon: FileText,
      action: () => setActiveView('digest'),
      color: 'bg-green-600',
    },
    {
      title: 'Check Smart Inbox',
      description: 'Review AI-processed email insights',
      icon: Mail,
      action: () => setActiveView('inbox'),
      color: 'bg-purple-600',
    },
    {
      title: 'Meeting Intelligence',
      description: 'Prepare for or review meetings',
      icon: Users,
      action: () => setActiveView('meeting'),
      color: 'bg-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Intelligence Dashboard</h1>
        <p className="text-muted-foreground">
          Your unified workspace for AI-powered productivity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-primary" />
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription>
            Jump into your most-used features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 justify-start hover:shadow-md transition-all"
                onClick={action.action}
              >
                <div className={`p-2 rounded-lg ${action.color} mr-4`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-foreground">{action.title}</div>
                  <div className="text-sm text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Contexts</CardTitle>
            <CardDescription>Your latest AI interactions</CardDescription>
          </CardHeader>
          <CardContent>
            {contexts.length > 0 ? (
              <div className="space-y-3">
                {contexts.slice(0, 5).map((context) => (
                  <div key={context.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{context.title}</p>
                      <p className="text-xs text-muted-foreground">{context.type}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(context.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Brain className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No contexts yet</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
            <CardDescription>Intelligence recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            {insights.length > 0 ? (
              <div className="space-y-3">
                {insights.slice(0, 5).map((insight) => (
                  <div key={insight.id} className="p-3 rounded-lg border border-border/50">
                    <div className="flex items-start space-x-2">
                      <Lightbulb className="h-4 w-4 text-yellow-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{insight.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Lightbulb className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No insights yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Placeholder components for other views
function ChatView() {
  return (
    <div className="text-center py-12">
      <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-2">AI Assistant</h2>
      <p className="text-muted-foreground">Chat interface coming soon...</p>
    </div>
  );
}

function InboxView() {
  return (
    <div className="text-center py-12">
      <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-2">Smart Inbox</h2>
      <p className="text-muted-foreground">Email intelligence coming soon...</p>
    </div>
  );
}

function DigestView() {
  return (
    <div className="text-center py-12">
      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-2">Document Digest</h2>
      <p className="text-muted-foreground">Document analysis coming soon...</p>
    </div>
  );
}

function ToneView() {
  return (
    <div className="text-center py-12">
      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-2">ToneAware</h2>
      <p className="text-muted-foreground">Communication optimization coming soon...</p>
    </div>
  );
}

function SocialView() {
  return (
    <div className="text-center py-12">
      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-2">Social Personalizer</h2>
      <p className="text-muted-foreground">Social media tools coming soon...</p>
    </div>
  );
}

function MeetingView() {
  return (
    <div className="text-center py-12">
      <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-2">Meeting Intelligence</h2>
      <p className="text-muted-foreground">Meeting analysis coming soon...</p>
    </div>
  );
}

function MemoryView() {
  return (
    <div className="text-center py-12">
      <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h2 className="text-xl font-semibold mb-2">Memory Keeper</h2>
      <p className="text-muted-foreground">Knowledge retention coming soon...</p>
    </div>
  );
}