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
  Users, 
  Clock,
  TrendingUp,
  Lightbulb,
  Activity,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

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
  const { data: contexts = [], isLoading: contextsLoading } = useContexts();
  const { data: insights = [], isLoading: insightsLoading } = useInsights();
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
      action: () => {
        setActiveView('chat');
        toast.info('AI Chat interface loaded');
      },
      color: 'bg-blue-600',
    },
    {
      title: 'Process Documents',
      description: 'Upload and analyze documents with AI',
      icon: FileText,
      action: () => {
        setActiveView('digest');
        toast.info('Document processing ready');
      },
      color: 'bg-green-600',
    },
    {
      title: 'Check Smart Inbox',
      description: 'Review AI-processed email insights',
      icon: Mail,
      action: () => {
        setActiveView('inbox');
        toast.info('Smart inbox loaded');
      },
      color: 'bg-purple-600',
    },
    {
      title: 'Meeting Intelligence',
      description: 'Prepare for or review meetings',
      icon: Users,
      action: () => {
        setActiveView('meeting');
        toast.info('Meeting intelligence ready');
      },
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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">AI Assistant</h1>
        <p className="text-muted-foreground">
          Your intelligent conversation partner
        </p>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-sm text-muted-foreground">AI Assistant</p>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm">Hello! I'm your AI assistant. I can help you with tasks, answer questions, and provide insights based on your data. What would you like to explore today?</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-xs font-medium text-blue-600">You</span>
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-sm text-muted-foreground">You</p>
                <div className="bg-primary/10 rounded-lg p-3">
                  <p className="text-sm">Can you help me analyze my recent meeting notes?</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-sm text-muted-foreground">AI Assistant</p>
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm">I'd be happy to help analyze your meeting notes! I can identify key action items, summarize decisions made, and suggest follow-up tasks. Would you like me to process your Q4 Planning Meeting notes?</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-border/30">
            <div className="flex space-x-2">
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="flex-1 px-3 py-2 border border-input rounded-lg bg-background text-sm"
                disabled
              />
              <Button disabled>Send</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Demo mode - Interactive chat coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function InboxView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Smart Inbox</h1>
        <p className="text-muted-foreground">
          AI-powered email intelligence and prioritization
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Priority Emails</CardTitle>
            <CardDescription>Requires immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { from: 'CEO', subject: 'Q4 Budget Review', priority: 'high' },
                { from: 'Client', subject: 'Project Deadline', priority: 'high' },
              ].map((email, i) => (
                <div key={i} className="p-3 border border-red-200 rounded-lg bg-red-50">
                  <p className="font-medium text-sm">{email.subject}</p>
                  <p className="text-xs text-muted-foreground">From: {email.from}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AI Insights</CardTitle>
            <CardDescription>Smart recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                <p className="font-medium text-sm">Meeting Follow-up</p>
                <p className="text-xs text-muted-foreground">3 emails need responses</p>
              </div>
              <div className="p-3 border border-green-200 rounded-lg bg-green-50">
                <p className="font-medium text-sm">Auto-drafted Replies</p>
                <p className="text-xs text-muted-foreground">2 responses ready for review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
            <CardDescription>Latest email processing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border border-border/30 rounded-lg">
                <p className="font-medium text-sm">Processed 24 emails</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
              <div className="p-3 border border-border/30 rounded-lg">
                <p className="font-medium text-sm">Generated summaries</p>
                <p className="text-xs text-muted-foreground">5 minutes ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DigestView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Document Digest</h1>
        <p className="text-muted-foreground">
          AI-powered document analysis and insights
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>Processed and analyzed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Q4 Financial Report.pdf', insights: 'Revenue up 15%, costs optimized', status: 'processed' },
                { name: 'Market Analysis.docx', insights: 'Key trends identified, 3 opportunities', status: 'processed' },
                { name: 'Product Roadmap.pptx', insights: 'Timeline analysis, resource allocation', status: 'processing' },
              ].map((doc, i) => (
                <div key={i} className="p-4 border border-border/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-sm">{doc.name}</p>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      doc.status === 'processed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{doc.insights}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upload New Document</CardTitle>
            <CardDescription>Drag & drop or click to upload</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-border/30 rounded-lg p-8 text-center">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-sm text-muted-foreground mb-4">
                Drop files here or click to browse
              </p>
              <Button variant="outline" disabled>
                Choose Files
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Demo mode - File upload coming soon
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ToneView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">ToneAware</h1>
        <p className="text-muted-foreground">
          Optimize your communication tone and style
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tone Analysis</CardTitle>
            <CardDescription>Real-time communication insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Your Message</label>
                <textarea 
                  className="w-full mt-1 p-3 border border-input rounded-lg bg-background text-sm"
                  rows={4}
                  placeholder="Type your message here for tone analysis..."
                  defaultValue="Hi team, I wanted to follow up on our discussion yesterday. Could we schedule a quick meeting to finalize the project details?"
                  disabled
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Professional</span>
                  <div className="flex-1 mx-3 bg-muted rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Friendly</span>
                  <div className="flex-1 mx-3 bg-muted rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '70%' }} />
                  </div>
                  <span className="text-sm text-muted-foreground">70%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Urgent</span>
                  <div className="flex-1 mx-3 bg-muted rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '30%' }} />
                  </div>
                  <span className="text-sm text-muted-foreground">30%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Suggestions</CardTitle>
            <CardDescription>AI-powered improvements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 border border-green-200 rounded-lg bg-green-50">
                <p className="font-medium text-sm text-green-800">✓ Great professional tone</p>
                <p className="text-xs text-green-600">Your message strikes the right balance</p>
              </div>
              
              <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                <p className="font-medium text-sm text-blue-800">💡 Consider adding</p>
                <p className="text-xs text-blue-600">"Thanks for your time yesterday" for warmth</p>
              </div>
              
              <div className="p-3 border border-purple-200 rounded-lg bg-purple-50">
                <p className="font-medium text-sm text-purple-800">🎯 Alternative phrasing</p>
                <p className="text-xs text-purple-600">"Let's schedule a brief sync" sounds more casual</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SocialView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Social Personalizer</h1>
        <p className="text-muted-foreground">
          AI-powered social media content optimization
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Content Ideas</CardTitle>
            <CardDescription>AI-generated suggestions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { platform: 'LinkedIn', idea: 'Share insights from Q4 planning meeting', engagement: 'High' },
                { platform: 'Twitter', idea: 'Thread about AI productivity tips', engagement: 'Medium' },
                { platform: 'Instagram', idea: 'Behind-the-scenes office culture', engagement: 'High' },
              ].map((item, i) => (
                <div key={i} className="p-3 border border-border/30 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.platform}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.engagement === 'High' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {item.engagement}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.idea}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Optimal Timing</CardTitle>
            <CardDescription>Best posting schedules</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border border-border/30 rounded-lg">
                <p className="font-medium text-sm">LinkedIn</p>
                <p className="text-xs text-muted-foreground">Tue-Thu, 9-11 AM</p>
                <p className="text-xs text-green-600">+23% engagement</p>
              </div>
              <div className="p-3 border border-border/30 rounded-lg">
                <p className="font-medium text-sm">Twitter</p>
                <p className="text-xs text-muted-foreground">Mon-Fri, 12-3 PM</p>
                <p className="text-xs text-green-600">+18% engagement</p>
              </div>
              <div className="p-3 border border-border/30 rounded-lg">
                <p className="font-medium text-sm">Instagram</p>
                <p className="text-xs text-muted-foreground">Wed-Fri, 6-9 PM</p>
                <p className="text-xs text-green-600">+31% engagement</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
            <CardDescription>Recent post analytics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border border-border/30 rounded-lg">
                <p className="font-medium text-sm">AI Productivity Tips</p>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>👍 234 likes</span>
                  <span>💬 45 comments</span>
                </div>
              </div>
              <div className="p-3 border border-border/30 rounded-lg">
                <p className="font-medium text-sm">Team Culture Post</p>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>👍 189 likes</span>
                  <span>💬 23 comments</span>
                </div>
              </div>
              <div className="p-3 border border-border/30 rounded-lg">
                <p className="font-medium text-sm">Industry Insights</p>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>👍 156 likes</span>
                  <span>💬 67 comments</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MeetingView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Meeting Intelligence</h1>
        <p className="text-muted-foreground">
          AI-powered meeting preparation and analysis
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
            <CardDescription>AI-prepared insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  title: 'Q1 Strategy Review', 
                  time: 'Today, 2:00 PM', 
                  attendees: 5,
                  preparation: 'Budget docs reviewed, key metrics prepared'
                },
                { 
                  title: 'Product Roadmap Sync', 
                  time: 'Tomorrow, 10:00 AM', 
                  attendees: 8,
                  preparation: 'Feature priorities analyzed, timeline optimized'
                },
              ].map((meeting, i) => (
                <div key={i} className="p-4 border border-border/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-sm">{meeting.title}</h3>
                    <span className="text-xs text-muted-foreground">{meeting.attendees} attendees</span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{meeting.time}</p>
                  <p className="text-xs text-green-600">✓ {meeting.preparation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Meeting Summary</CardTitle>
            <CardDescription>Q4 Planning Meeting - Yesterday</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Key Decisions</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Budget increased by 15% for Q1</li>
                  <li>• New product launch moved to March</li>
                  <li>• Team expansion approved for engineering</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-2">Action Items</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <span className="text-xs">Sarah: Finalize hiring plan by Friday</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs">Mike: Budget allocation completed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-xs">Team: Review product specs by Monday</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-2">Next Steps</h4>
                <p className="text-xs text-muted-foreground">
                  Follow-up meeting scheduled for next Tuesday to review progress on action items.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MemoryView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Memory Keeper</h1>
        <p className="text-muted-foreground">
          Your AI-powered knowledge retention system
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Memories</CardTitle>
            <CardDescription>Automatically captured insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: 'Meeting', title: 'Q4 Budget Decision', time: '2 hours ago' },
                { type: 'Document', title: 'Market Analysis Key Points', time: '1 day ago' },
                { type: 'Conversation', title: 'Client Feedback Summary', time: '2 days ago' },
              ].map((memory, i) => (
                <div key={i} className="p-3 border border-border/30 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-primary">{memory.type}</span>
                    <span className="text-xs text-muted-foreground">{memory.time}</span>
                  </div>
                  <p className="text-sm">{memory.title}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Knowledge Graph</CardTitle>
            <CardDescription>Connected insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border border-border/30 rounded-lg">
                <p className="font-medium text-sm">Budget Planning</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">Q4 Review</span>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Team Expansion</span>
                  <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded">Product Launch</span>
                </div>
              </div>
              
              <div className="p-3 border border-border/30 rounded-lg">
                <p className="font-medium text-sm">Market Research</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded">Trends</span>
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded">Competitors</span>
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded">Opportunities</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Smart Reminders</CardTitle>
            <CardDescription>AI-suggested follow-ups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border border-yellow-200 rounded-lg bg-yellow-50">
                <p className="font-medium text-sm text-yellow-800">📅 Follow-up Due</p>
                <p className="text-xs text-yellow-600">Check on hiring plan progress with Sarah</p>
              </div>
              
              <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                <p className="font-medium text-sm text-blue-800">🔄 Recurring Review</p>
                <p className="text-xs text-blue-600">Weekly market analysis update available</p>
              </div>
              
              <div className="p-3 border border-green-200 rounded-lg bg-green-50">
                <p className="font-medium text-sm text-green-800">💡 Connection Found</p>
                <p className="text-xs text-green-600">New insight links to previous client feedback</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}