import React from 'react';
import { useAppStore } from '@/stores/appStore';
import { useContexts, useInsights } from '@/hooks/useDemoData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  MessageCircle, 
  Mail, 
  FileText, 
  PenTool, 
  Share2, 
  Users, 
  Clock,
  TrendingUp,
  Zap,
  Eye,
  Network,
  ArrowRight,
  Sparkles,
  Activity,
  BarChart3,
  Calendar,
  Globe
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

const viewComponents = {
  dashboard: DashboardView,
  chat: ChatView,
  inbox: InboxView,
  digest: DigestView,
  tone: ToneView,
  social: SocialView,
  meeting: MeetingView,
  memory: MemoryView,
};

export function DashboardContent() {
  const { activeView } = useAppStore();
  const ViewComponent = viewComponents[activeView as keyof typeof viewComponents] || DashboardView;
  
  return (
    <div className="min-h-screen bg-background">
      <ViewComponent />
    </div>
  );
}

function DashboardView() {
  const { data: contexts, isLoading: contextsLoading } = useContexts();
  const { data: insights, isLoading: insightsLoading } = useInsights();
  const { setActiveView } = useAppStore();

  const quickActions = [
    { id: 'chat', label: 'AI Assistant', icon: MessageCircle, description: 'Get intelligent help', color: 'text-primary-600' },
    { id: 'inbox', label: 'Smart Inbox', icon: Mail, description: 'Process communications', color: 'text-blue-600' },
    { id: 'digest', label: 'Doc Digest', icon: FileText, description: 'Analyze documents', color: 'text-green-600' },
    { id: 'tone', label: 'ToneAware', icon: PenTool, description: 'Refine your writing', color: 'text-purple-600' },
  ];

  const stats = [
    { label: 'Active Contexts', value: contexts?.length || 0, icon: Network, trend: '+12%' },
    { label: 'Insights Generated', value: insights?.length || 0, icon: Eye, trend: '+8%' },
    { label: 'Tasks Completed', value: 24, icon: Activity, trend: '+15%' },
    { label: 'Efficiency Score', value: '94%', icon: TrendingUp, trend: '+3%' },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-semibold text-foreground tracking-tight">
          Intelligence Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Your AI-powered workspace, anticipating your needs
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="glass border-border/50 hover:shadow-medium transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground font-mono">{stat.value}</p>
                  <p className="text-xs text-success font-medium">{stat.trend}</p>
                </div>
                <div className="p-3 rounded-xl bg-primary-50 text-primary-600">
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Card 
              key={action.id} 
              className="glass border-border/50 hover:shadow-medium transition-smooth cursor-pointer group"
              onClick={() => setActiveView(action.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl bg-gray-50 ${action.color} group-hover:scale-110 transition-smooth`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground group-hover:text-primary-600 transition-smooth">
                      {action.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary-600 transition-smooth" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity Grid */}
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Recent Contexts */}
        <Card className="glass border-border/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Contexts</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setActiveView('memory')}>
                View All
              </Button>
            </div>
            <CardDescription>
              Latest information processed by your AI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {contextsLoading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              contexts?.slice(0, 3).map((context) => (
                <div key={context.id} className="p-4 rounded-xl border border-border/30 hover:border-primary-200/50 transition-smooth">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate">{context.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {context.content}
                      </p>
                      <div className="flex items-center space-x-4 mt-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          context.priority === 'high' ? 'bg-red-50 text-red-700' :
                          context.priority === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                          'bg-green-50 text-green-700'
                        }`}>
                          {context.priority}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(context.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="glass border-border/50">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-primary-600" />
                <span>AI Insights</span>
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setActiveView('chat')}>
                Explore
              </Button>
            </div>
            <CardDescription>
              Intelligent suggestions based on your activity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {insightsLoading ? (
              <div className="space-y-3">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : (
              insights?.slice(0, 2).map((insight) => (
                <div key={insight.id} className="p-4 rounded-xl bg-primary-50/50 border border-primary-100/50">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-primary-100 text-primary-600">
                      <Brain className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {insight.description}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-primary-600 font-medium">
                          {Math.round(insight.confidence * 100)}% confidence
                        </span>
                        {insight.actionable && (
                          <Button size="sm" variant="ghost" className="text-xs h-6 px-2">
                            Take Action
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
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
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 py-16">
          <MessageCircle className="h-16 w-16 text-primary-600 mx-auto" />
          <h2 className="text-2xl font-semibold text-foreground">AI Assistant</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your intelligent conversation partner, ready to help with any task or question.
          </p>
          <Button className="mt-6">Start Conversation</Button>
        </div>
      </div>
    </div>
  );
}

function InboxView() {
  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 py-16">
          <Mail className="h-16 w-16 text-blue-600 mx-auto" />
          <h2 className="text-2xl font-semibold text-foreground">Smart Inbox</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            AI-powered email processing that understands context and prioritizes what matters.
          </p>
          <Button className="mt-6">Process Inbox</Button>
        </div>
      </div>
    </div>
  );
}

function DigestView() {
  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 py-16">
          <FileText className="h-16 w-16 text-green-600 mx-auto" />
          <h2 className="text-2xl font-semibold text-foreground">Document Digest</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Transform lengthy documents into actionable insights and key takeaways.
          </p>
          <Button className="mt-6">Upload Document</Button>
        </div>
      </div>
    </div>
  );
}

function ToneView() {
  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 py-16">
          <PenTool className="h-16 w-16 text-purple-600 mx-auto" />
          <h2 className="text-2xl font-semibold text-foreground">ToneAware</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Analyze and refine your writing tone for perfect communication in any context.
          </p>
          <Button className="mt-6">Analyze Text</Button>
        </div>
      </div>
    </div>
  );
}

function SocialView() {
  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 py-16">
          <Share2 className="h-16 w-16 text-pink-600 mx-auto" />
          <h2 className="text-2xl font-semibold text-foreground">Social Personalizer</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Craft personalized social content that resonates with your audience.
          </p>
          <Button className="mt-6">Create Content</Button>
        </div>
      </div>
    </div>
  );
}

function MeetingView() {
  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 py-16">
          <Users className="h-16 w-16 text-indigo-600 mx-auto" />
          <h2 className="text-2xl font-semibold text-foreground">Meeting Intelligence</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Transform meetings into actionable insights with AI-powered analysis and follow-up.
          </p>
          <Button className="mt-6">Analyze Meeting</Button>
        </div>
      </div>
    </div>
  );
}

function MemoryView() {
  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-4 py-16">
          <Clock className="h-16 w-16 text-orange-600 mx-auto" />
          <h2 className="text-2xl font-semibold text-foreground">Memory Keeper</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Your AI memory system that never forgets important context and connections.
          </p>
          <Button className="mt-6">Explore Memory</Button>
        </div>
      </div>
    </div>
  );
}