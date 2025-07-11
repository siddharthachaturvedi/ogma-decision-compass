import React from 'react';
import { useContexts, useInsights } from '@/hooks/useDemoData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ArrowRight,
  Sparkles,
  MessageCircle,
  FileText,
  Mail
} from 'lucide-react';
import { useAppStore } from '@/stores/appStore';
import { formatDate } from '@/lib/utils';

export function OverviewView() {
  const { data: contexts, isLoading: contextsLoading } = useContexts();
  const { data: insights, isLoading: insightsLoading } = useInsights();
  const { setActiveView } = useAppStore();

  const recentContexts = contexts?.slice(0, 3) || [];
  const topInsights = insights?.slice(0, 2) || [];

  const stats = {
    totalContexts: contexts?.length || 0,
    activeInsights: insights?.filter(i => i.actionable)?.length || 0,
    completedToday: contexts?.filter(c => 
      c.status === 'completed' && 
      new Date(c.updated_at).toDateString() === new Date().toDateString()
    )?.length || 0,
    avgConfidence: insights?.reduce((acc, i) => acc + i.confidence, 0) / (insights?.length || 1) || 0
  };

  const quickActions = [
    {
      id: 'assistant',
      title: 'Ask AI Assistant',
      description: 'Get help with tasks and questions',
      icon: MessageCircle,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      action: () => setActiveView('assistant')
    },
    {
      id: 'documents',
      title: 'Process Document',
      description: 'Upload and analyze documents',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      action: () => setActiveView('documents')
    },
    {
      id: 'inbox',
      title: 'Check Smart Inbox',
      description: 'Review prioritized communications',
      icon: Mail,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: () => setActiveView('inbox')
    }
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Welcome Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Brain className="h-8 w-8 text-primary-600 animate-intelligence-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-foreground tracking-tight">
              Welcome back
            </h1>
            <p className="text-muted-foreground">
              Your AI intelligence platform is ready to assist
            </p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-primary-50">
                <Brain className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.totalContexts}</p>
                <p className="text-sm text-muted-foreground">Active Contexts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-orange-50">
                <Sparkles className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.activeInsights}</p>
                <p className="text-sm text-muted-foreground">AI Insights</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-green-50">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.completedToday}</p>
                <p className="text-sm text-muted-foreground">Completed Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-blue-50">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {Math.round(stats.avgConfidence * 100)}%
                </p>
                <p className="text-sm text-muted-foreground">AI Confidence</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Card 
              key={action.id}
              className="border-border/50 hover:shadow-medium transition-smooth cursor-pointer group"
              onClick={action.action}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl ${action.bgColor} group-hover:scale-105 transition-smooth`}>
                    <action.icon className={`h-5 w-5 ${action.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary-600 transition-smooth">
                      {action.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {action.description}
                    </p>
                    <div className="flex items-center text-primary-600 text-sm font-medium">
                      <span>Get started</span>
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>Recent Activity</span>
            </CardTitle>
            <CardDescription>
              Latest contexts and updates from your workflow
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {contextsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : recentContexts.length > 0 ? (
              recentContexts.map((context) => (
                <div key={context.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-smooth">
                  <div className={`p-2 rounded-lg ${
                    context.type === 'meeting' ? 'bg-blue-50 text-blue-600' :
                    context.type === 'document' ? 'bg-green-50 text-green-600' :
                    context.type === 'email' ? 'bg-purple-50 text-purple-600' :
                    'bg-gray-50 text-gray-600'
                  }`}>
                    {context.type === 'meeting' ? <MessageCircle className="h-4 w-4" /> :
                     context.type === 'document' ? <FileText className="h-4 w-4" /> :
                     context.type === 'email' ? <Mail className="h-4 w-4" /> :
                     <Brain className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{context.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{context.content}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(context.updated_at)}
                    </p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    context.priority === 'high' ? 'bg-red-50 text-red-700' :
                    context.priority === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                    'bg-green-50 text-green-700'
                  }`}>
                    {context.priority}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No recent activity</p>
                <p className="text-sm">Start by asking the AI assistant a question</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary-600" />
              <span>AI Insights</span>
            </CardTitle>
            <CardDescription>
              Intelligent suggestions based on your activity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {insightsLoading ? (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-muted rounded w-full mb-2"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : topInsights.length > 0 ? (
              topInsights.map((insight) => (
                <div key={insight.id} className="p-4 rounded-lg border border-border/30 hover:border-primary-200 transition-smooth">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      insight.type === 'suggestion' ? 'bg-blue-50 text-blue-600' :
                      insight.type === 'pattern' ? 'bg-purple-50 text-purple-600' :
                      insight.type === 'optimization' ? 'bg-green-50 text-green-600' :
                      'bg-orange-50 text-orange-600'
                    }`}>
                      {insight.actionable ? <AlertCircle className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground mb-1">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{insight.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-muted rounded-full h-1.5">
                            <div 
                              className="bg-primary-600 h-1.5 rounded-full transition-all duration-500"
                              style={{ width: `${insight.confidence * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {Math.round(insight.confidence * 100)}% confidence
                          </span>
                        </div>
                        {insight.actionable && (
                          <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-700">
                            Act on this
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No insights yet</p>
                <p className="text-sm">AI will generate insights as you use the platform</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}