import React, { useState } from 'react';
import { useAppStore } from '@/stores/appStore';
import { useContexts, useInsights, useChatMessages, useSendMessage, useToneAnalysis, useDocumentProcess } from '@/hooks/useDemoData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Globe,
  Send,
  Loader2,
  Upload,
  CheckCircle,
  AlertCircle,
  Info,
  Star,
  ThumbsUp,
  MessageSquare,
  Hash,
  AtSign,
  Smile,
  Image,
  Link,
  MoreHorizontal,
  Filter,
  Search,
  Plus,
  Download,
  Share,
  Bookmark,
  Archive,
  Trash2,
  Edit3,
  Copy,
  ExternalLink,
  PlayCircle,
  PauseCircle,
  Volume2,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Phone,
  PhoneOff,
  Settings,
  Bell,
  BellOff,
  Shield,
  Lock,
  Unlock,
  Key,
  Database,
  Server,
  Cloud,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Cpu,
  HardDrive,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Desktop,
  Watch,
  Headphones,
  Camera,
  Printer,
  Scanner,
  Keyboard,
  Mouse,
  Gamepad2,
  Joystick,
  Radio,
  Tv,
  Speaker,
  Microphone,
  Webcam,
  Router,
  Modem,
  Ethernet,
  Bluetooth,
  Usb,
  SdCard,
  HardDisk,
  Disc,
  Floppy,
  Cassette,
  Film,
  Music,
  Video as VideoIcon,
  Image as ImageIcon,
  FileAudio,
  FileVideo,
  FileImage,
  FileSpreadsheet,
  FileCode,
  FileArchive,
  FilePdf,
  FileWord,
  FilePowerpoint,
  FileExcel,
  FileJson,
  FileXml,
  FileCsv,
  FileZip,
  FileRar,
  File7z,
  FileTar,
  FileGz,
  FileBz2,
  FileXz,
  FileLz,
  FileZ,
  FileIso,
  FileDmg,
  FileExe,
  FileMsi,
  FileDeb,
  FileRpm,
  FileApk,
  FileIpa,
  FileApp,
  FilePkg,
  FileTar2,
  FileGz2,
  FileBz22,
  FileXz2,
  FileLz2,
  FileZ2
} from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';

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
    { id: 'chat', label: 'AI Assistant', icon: MessageCircle, description: 'Get intelligent help', color: 'text-primary-600', count: '3 active' },
    { id: 'inbox', label: 'Smart Inbox', icon: Mail, description: 'Process communications', color: 'text-blue-600', count: '12 unread' },
    { id: 'digest', label: 'Doc Digest', icon: FileText, description: 'Analyze documents', color: 'text-green-600', count: '5 processed' },
    { id: 'tone', label: 'ToneAware', icon: PenTool, description: 'Refine your writing', color: 'text-purple-600', count: '94% accuracy' },
  ];

  const stats = [
    { label: 'Active Contexts', value: contexts?.length || 0, icon: Network, trend: '+12%', description: 'Information streams' },
    { label: 'Insights Generated', value: insights?.length || 0, icon: Eye, trend: '+8%', description: 'AI discoveries' },
    { label: 'Tasks Completed', value: 24, icon: Activity, trend: '+15%', description: 'Today' },
    { label: 'Efficiency Score', value: '94%', icon: TrendingUp, trend: '+3%', description: 'This week' },
  ];

  const recentActivity = [
    { type: 'insight', title: 'Pattern detected in client feedback', time: '2 min ago', icon: Brain, color: 'text-primary-600' },
    { type: 'document', title: 'Q4 Report processed', time: '15 min ago', icon: FileText, color: 'text-green-600' },
    { type: 'meeting', title: 'Team sync analyzed', time: '1 hour ago', icon: Users, color: 'text-indigo-600' },
    { type: 'email', title: 'Client inquiry categorized', time: '2 hours ago', icon: Mail, color: 'text-blue-600' },
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl lg:text-4xl font-semibold text-foreground tracking-tight">
              Intelligence Dashboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Your AI-powered workspace, anticipating your needs
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Context
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="glass border-border/50 hover:shadow-medium transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary-50 text-primary-600">
                  <stat.icon className="h-5 w-5" />
                </div>
                <span className="text-xs text-success font-medium">{stat.trend}</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground font-mono mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Card 
              key={action.id} 
              className="glass border-border/50 hover:shadow-medium transition-smooth cursor-pointer group"
              onClick={() => setActiveView(action.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gray-50 ${action.color} group-hover:scale-110 transition-smooth`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary-600 transition-smooth" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary-600 transition-smooth mb-1">
                    {action.label}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {action.description}
                  </p>
                  <p className="text-xs text-primary-600 font-medium">
                    {action.count}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Recent Contexts */}
        <Card className="glass border-border/50 lg:col-span-2">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Contexts</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setActiveView('memory')}>
                  View All
                </Button>
              </div>
            </div>
            <CardDescription>
              Latest information processed by your AI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {contextsLoading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              contexts?.slice(0, 4).map((context) => (
                <div key={context.id} className="p-4 rounded-xl border border-border/30 hover:border-primary-200/50 transition-smooth group">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-medium text-foreground truncate">{context.title}</h4>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          context.priority === 'high' ? 'bg-red-50 text-red-700' :
                          context.priority === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                          'bg-green-50 text-green-700'
                        }`}>
                          {context.priority}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {context.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            context.type === 'meeting' ? 'bg-indigo-50 text-indigo-700' :
                            context.type === 'document' ? 'bg-green-50 text-green-700' :
                            context.type === 'email' ? 'bg-blue-50 text-blue-700' :
                            'bg-gray-50 text-gray-700'
                          }`}>
                            {context.type}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {formatDate(context.created_at)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-smooth">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Bookmark className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Share className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* AI Insights */}
          <Card className="glass border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center space-x-2">
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
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-full"></div>
                    </div>
                  ))}
                </div>
              ) : (
                insights?.slice(0, 3).map((insight) => (
                  <div key={insight.id} className="p-4 rounded-xl bg-primary-50/50 border border-primary-100/50 group hover:shadow-soft transition-smooth">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-primary-100 text-primary-600">
                        <Brain className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-foreground mb-1">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {insight.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-primary-600 font-medium">
                            {Math.round(insight.confidence * 100)}% confidence
                          </span>
                          {insight.actionable && (
                            <Button size="sm" variant="ghost" className="text-xs h-6 px-2 opacity-0 group-hover:opacity-100 transition-smooth">
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

          {/* Recent Activity */}
          <Card className="glass border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
              <CardDescription>
                Latest AI processing events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/30 transition-smooth">
                  <div className={`p-2 rounded-lg bg-gray-50 ${activity.color}`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ChatView() {
  const { data: messages, isLoading } = useChatMessages();
  const sendMessage = useSendMessage();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const message = inputValue;
    setInputValue('');
    setIsTyping(true);
    
    try {
      await sendMessage.mutateAsync(message);
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsTyping(false);
    }
  };

  const suggestedQuestions = [
    "What insights can you share from my recent meetings?",
    "Help me prioritize my tasks for today",
    "Analyze the client feedback patterns",
    "What are the key takeaways from the Q4 report?"
  ];

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border/30 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground flex items-center space-x-3">
              <MessageCircle className="h-6 w-6 text-primary-600" />
              <span>AI Assistant</span>
            </h1>
            <p className="text-muted-foreground">Your intelligent conversation partner</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Archive className="h-4 w-4 mr-2" />
              History
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
                <div className="h-16 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {messages?.map((message) => (
              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-2xl ${message.role === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`p-4 rounded-2xl ${
                    message.role === 'user' 
                      ? 'bg-primary-600 text-primary-foreground ml-12' 
                      : 'bg-card border border-border/50 mr-12'
                  }`}>
                    {message.metadata?.thinking ? (
                      <div className="flex items-center space-x-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-sm">Thinking...</span>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    )}
                  </div>
                  <div className={`flex items-center mt-2 space-x-2 text-xs text-muted-foreground ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                    <span>{formatDate(message.timestamp)}</span>
                    {message.metadata?.confidence && (
                      <span className="text-primary-600">
                        {Math.round(message.metadata.confidence * 100)}% confidence
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Suggested Questions */}
            {messages?.length === 1 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Try asking:</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="text-left h-auto p-4 justify-start"
                      onClick={() => setInputValue(question)}
                    >
                      <MessageSquare className="h-4 w-4 mr-3 flex-shrink-0" />
                      <span className="text-sm">{question}</span>
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Input */}
      <div className="p-6 border-t border-border/30 bg-card/50 backdrop-blur-sm">
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about your data..."
              className="min-h-[44px] resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
          </div>
          <Button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || sendMessage.isPending}
            className="h-11 px-6"
          >
            {sendMessage.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function InboxView() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [filter, setFilter] = useState('all');

  const emails = [
    {
      id: 1,
      from: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      subject: 'Q4 Budget Review - Action Required',
      preview: 'Hi team, I need your input on the Q4 budget allocations. Please review the attached spreadsheet and provide feedback by Friday...',
      time: '2 hours ago',
      priority: 'high',
      category: 'work',
      unread: true,
      attachments: 2,
      aiSummary: 'Budget review request with deadline Friday. Requires team input on Q4 allocations.',
      suggestedActions: ['Review budget', 'Schedule meeting', 'Prepare feedback']
    },
    {
      id: 2,
      from: 'Mike Chen',
      email: 'mike@innovatelabs.io',
      subject: 'Partnership Proposal - Project Ogma Integration',
      preview: 'Hello! We\'ve been following Project Ogma\'s development and would love to discuss a potential partnership opportunity...',
      time: '4 hours ago',
      priority: 'medium',
      category: 'business',
      unread: true,
      attachments: 1,
      aiSummary: 'Partnership inquiry from InnovateLabs regarding Project Ogma integration.',
      suggestedActions: ['Schedule call', 'Review proposal', 'Forward to business dev']
    },
    {
      id: 3,
      from: 'Alex Rodriguez',
      email: 'alex@dataflow.com',
      subject: 'Feature Request: Advanced Analytics Dashboard',
      preview: 'Our team has been using Project Ogma for the past month and we\'re impressed with the results. We have a feature request...',
      time: '6 hours ago',
      priority: 'medium',
      category: 'product',
      unread: false,
      attachments: 0,
      aiSummary: 'Feature request for advanced analytics dashboard from existing customer.',
      suggestedActions: ['Log feature request', 'Assess feasibility', 'Respond to customer']
    },
    {
      id: 4,
      from: 'Emma Wilson',
      email: 'emma@designstudio.co',
      subject: 'UI/UX Feedback on Latest Release',
      preview: 'Hi there! I wanted to share some feedback on the latest UI updates. Overall, the changes are fantastic, but I noticed...',
      time: '1 day ago',
      priority: 'low',
      category: 'feedback',
      unread: false,
      attachments: 3,
      aiSummary: 'Positive UI/UX feedback with specific improvement suggestions.',
      suggestedActions: ['Review feedback', 'Share with design team', 'Thank customer']
    }
  ];

  const filteredEmails = emails.filter(email => {
    if (filter === 'unread') return email.unread;
    if (filter === 'high') return email.priority === 'high';
    return true;
  });

  return (
    <div className="h-screen flex">
      {/* Email List */}
      <div className="w-1/3 border-r border-border/30 bg-card/30">
        {/* Header */}
        <div className="p-6 border-b border-border/30">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-foreground flex items-center space-x-3">
              <Mail className="h-6 w-6 text-blue-600" />
              <span>Smart Inbox</span>
            </h1>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Compose
            </Button>
          </div>
          
          {/* Filters */}
          <div className="flex items-center space-x-2">
            {[
              { key: 'all', label: 'All', count: emails.length },
              { key: 'unread', label: 'Unread', count: emails.filter(e => e.unread).length },
              { key: 'high', label: 'High Priority', count: emails.filter(e => e.priority === 'high').length }
            ].map((filterOption) => (
              <Button
                key={filterOption.key}
                variant={filter === filterOption.key ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setFilter(filterOption.key)}
                className="text-xs"
              >
                {filterOption.label} ({filterOption.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Email List */}
        <div className="overflow-y-auto">
          {filteredEmails.map((email) => (
            <div
              key={email.id}
              className={`p-4 border-b border-border/20 cursor-pointer hover:bg-muted/30 transition-smooth ${
                selectedEmail?.id === email.id ? 'bg-primary-50 border-primary-200' : ''
              }`}
              onClick={() => setSelectedEmail(email)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${email.unread ? 'bg-primary-600' : 'bg-transparent'}`} />
                  <span className={`font-medium text-sm ${email.unread ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {email.from}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  {email.priority === 'high' && (
                    <AlertCircle className="h-3 w-3 text-red-500" />
                  )}
                  {email.attachments > 0 && (
                    <div className="flex items-center space-x-1">
                      <Link className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{email.attachments}</span>
                    </div>
                  )}
                </div>
              </div>
              <h3 className={`text-sm mb-1 line-clamp-1 ${email.unread ? 'font-medium text-foreground' : 'text-muted-foreground'}`}>
                {email.subject}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                {email.preview}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{email.time}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  email.category === 'work' ? 'bg-blue-50 text-blue-700' :
                  email.category === 'business' ? 'bg-green-50 text-green-700' :
                  email.category === 'product' ? 'bg-purple-50 text-purple-700' :
                  'bg-gray-50 text-gray-700'
                }`}>
                  {email.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 flex flex-col">
        {selectedEmail ? (
          <>
            {/* Email Header */}
            <div className="p-6 border-b border-border/30 bg-card/50">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    {selectedEmail.subject}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>From: {selectedEmail.from} &lt;{selectedEmail.email}&gt;</span>
                    <span>{selectedEmail.time}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Archive className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* AI Summary */}
              <Card className="bg-primary-50/50 border-primary-100">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Brain className="h-5 w-5 text-primary-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-2">AI Summary</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        {selectedEmail.aiSummary}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedEmail.suggestedActions.map((action, index) => (
                          <Button key={index} variant="outline" size="sm" className="text-xs h-6">
                            {action}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Email Body */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="prose prose-sm max-w-none">
                <p className="text-foreground leading-relaxed">
                  {selectedEmail.preview}
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  I hope this email finds you well. I wanted to reach out regarding the upcoming project milestones and ensure we're all aligned on the deliverables.
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  Based on our previous discussions, I believe we can move forward with the proposed timeline. However, I'd like to schedule a brief meeting to discuss any potential concerns or adjustments.
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  Please let me know your availability for next week, and I'll send out a calendar invite.
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  Best regards,<br />
                  {selectedEmail.from}
                </p>
              </div>
            </div>

            {/* Reply Section */}
            <div className="p-6 border-t border-border/30 bg-card/50">
              <div className="flex items-center space-x-3">
                <Button>
                  <Send className="h-4 w-4 mr-2" />
                  Reply
                </Button>
                <Button variant="outline">
                  <Share className="h-4 w-4 mr-2" />
                  Forward
                </Button>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Mail className="h-16 w-16 text-muted-foreground mx-auto" />
              <h3 className="text-lg font-medium text-foreground">Select an email</h3>
              <p className="text-muted-foreground">Choose an email from the list to view its content</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function DigestView() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const documentProcess = useDocumentProcess();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file) => {
    setUploadedFile(file);
    try {
      await documentProcess.mutateAsync(file);
      toast.success('Document processed successfully!');
    } catch (error) {
      toast.error('Failed to process document');
    }
  };

  const recentDocuments = [
    {
      id: 1,
      name: 'Q4 Financial Report.pdf',
      size: '2.4 MB',
      processed: '2 hours ago',
      insights: 12,
      summary: 'Strong Q4 performance with 15% revenue growth. Key areas: product sales up 22%, service revenue stable.',
      status: 'completed'
    },
    {
      id: 2,
      name: 'Market Research Analysis.docx',
      size: '1.8 MB',
      processed: '1 day ago',
      insights: 8,
      summary: 'Comprehensive market analysis revealing emerging trends in AI adoption and customer preferences.',
      status: 'completed'
    },
    {
      id: 3,
      name: 'Product Roadmap 2025.pptx',
      size: '5.2 MB',
      processed: '2 days ago',
      insights: 15,
      summary: 'Strategic roadmap outlining key product initiatives, timeline, and resource requirements for 2025.',
      status: 'completed'
    }
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-semibold text-foreground tracking-tight flex items-center space-x-3">
          <FileText className="h-8 w-8 text-green-600" />
          <span>Document Digest</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Transform lengthy documents into actionable insights
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upload Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upload Area */}
          <Card className="glass border-border/50">
            <CardContent className="p-8">
              <div
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-smooth ${
                  dragActive 
                    ? 'border-primary-400 bg-primary-50' 
                    : 'border-border hover:border-primary-300 hover:bg-primary-50/30'
                }`}
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
              >
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Drop your document here
                </h3>
                <p className="text-muted-foreground mb-6">
                  Supports PDF, DOCX, PPTX, TXT files up to 10MB
                </p>
                <Button>
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Processing Status */}
          {documentProcess.isPending && (
            <Card className="glass border-border/50">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Loader2 className="h-6 w-6 animate-spin text-primary-600" />
                  <div>
                    <h4 className="font-medium text-foreground">Processing Document</h4>
                    <p className="text-sm text-muted-foreground">
                      Analyzing content and extracting insights...
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Processing Results */}
          {documentProcess.data && (
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Processing Complete</span>
                </CardTitle>
                <CardDescription>
                  Document: {documentProcess.data.fileName}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Summary */}
                <div>
                  <h4 className="font-medium text-foreground mb-2">Summary</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {documentProcess.data.summary}
                  </p>
                </div>

                {/* Key Insights */}
                <div>
                  <h4 className="font-medium text-foreground mb-3">Key Insights</h4>
                  <div className="space-y-2">
                    {documentProcess.data.insights.map((insight, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                        <Eye className="h-4 w-4 text-primary-600 mt-0.5" />
                        <span className="text-sm text-foreground">{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-3 pt-4 border-t border-border/30">
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share className="h-4 w-4 mr-2" />
                    Share Insights
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save to Memory
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recent Documents */}
        <div className="space-y-6">
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Documents</CardTitle>
              <CardDescription>
                Previously processed files
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentDocuments.map((doc) => (
                <div key={doc.id} className="p-4 rounded-xl border border-border/30 hover:border-primary-200/50 transition-smooth group">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground truncate text-sm">
                        {doc.name}
                      </h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-muted-foreground">{doc.size}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{doc.processed}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-smooth">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                    {doc.summary}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-primary-600 font-medium">
                      {doc.insights} insights
                    </span>
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Processing Stats */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Processing Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Documents Processed</span>
                <span className="font-mono font-bold text-foreground">247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Insights Generated</span>
                <span className="font-mono font-bold text-foreground">1,832</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Time Saved</span>
                <span className="font-mono font-bold text-foreground">156h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Accuracy Rate</span>
                <span className="font-mono font-bold text-success">94.2%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ToneView() {
  const [text, setText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const toneAnalysis = useToneAnalysis();

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    
    try {
      const result = await toneAnalysis.mutateAsync(text);
      setAnalysisResult(result);
      toast.success('Tone analysis complete!');
    } catch (error) {
      toast.error('Failed to analyze tone');
    }
  };

  const sampleTexts = [
    {
      title: 'Professional Email',
      content: 'Dear Mr. Johnson, I hope this email finds you well. I wanted to follow up on our previous discussion regarding the project timeline. Could we schedule a brief meeting to discuss the next steps? I look forward to hearing from you soon. Best regards, Sarah'
    },
    {
      title: 'Casual Message',
      content: 'Hey team! Hope everyone had a great weekend. Just wanted to check in about the project status. Let me know if you need any help or have questions. Thanks!'
    },
    {
      title: 'Urgent Request',
      content: 'Hi there, I need your immediate attention on the client presentation. The deadline has been moved up to tomorrow morning. Please review the attached files and provide feedback ASAP. This is critical for our Q4 goals.'
    }
  ];

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-semibold text-foreground tracking-tight flex items-center space-x-3">
          <PenTool className="h-8 w-8 text-purple-600" />
          <span>ToneAware</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Analyze and refine your writing tone for perfect communication
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Text Input */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Text Analysis</CardTitle>
              <CardDescription>
                Enter your text to analyze its tone and get improvement suggestions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text here to analyze its tone..."
                className="w-full h-40 p-4 rounded-xl border border-border/50 bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-smooth"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {text.length} characters
                </span>
                <Button 
                  onClick={handleAnalyze}
                  disabled={!text.trim() || toneAnalysis.isPending}
                >
                  {toneAnalysis.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Brain className="h-4 w-4 mr-2" />
                  )}
                  Analyze Tone
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysisResult && (
            <Card className="glass border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span>Tone Analysis Results</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tone Metrics */}
                <div>
                  <h4 className="font-medium text-foreground mb-4">Tone Breakdown</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {Object.entries(analysisResult.analysis).map(([tone, score]) => (
                      <div key={tone} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground capitalize">
                            {tone}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {Math.round(score)}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-smooth"
                            style={{ width: `${score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggestions */}
                {analysisResult.suggestions.length > 0 && (
                  <div>
                    <h4 className="font-medium text-foreground mb-4">Improvement Suggestions</h4>
                    <div className="space-y-3">
                      {analysisResult.suggestions.map((suggestion, index) => (
                        <div key={index} className="p-4 rounded-xl bg-muted/30 border border-border/30">
                          <div className="flex items-start space-x-3">
                            <div className={`p-2 rounded-lg ${
                              suggestion.type === 'improvement' ? 'bg-blue-50 text-blue-600' :
                              suggestion.type === 'balance' ? 'bg-green-50 text-green-600' :
                              'bg-yellow-50 text-yellow-600'
                            }`}>
                              {suggestion.type === 'improvement' ? <TrendingUp className="h-4 w-4" /> :
                               suggestion.type === 'balance' ? <CheckCircle className="h-4 w-4" /> :
                               <AlertCircle className="h-4 w-4" />}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-foreground mb-1">
                                {suggestion.message}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Example: {suggestion.example}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Sample Texts */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Sample Texts</CardTitle>
              <CardDescription>
                Try these examples to see tone analysis in action
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {sampleTexts.map((sample, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left h-auto p-4 justify-start"
                  onClick={() => setText(sample.content)}
                >
                  <div>
                    <div className="font-medium text-sm mb-1">{sample.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-2">
                      {sample.content}
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Tone Guidelines */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Tone Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                  <h5 className="font-medium text-blue-900 text-sm mb-1">Professional</h5>
                  <p className="text-xs text-blue-700">
                    Formal language, clear structure, respectful tone
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-green-50 border border-green-100">
                  <h5 className="font-medium text-green-900 text-sm mb-1">Friendly</h5>
                  <p className="text-xs text-green-700">
                    Warm, approachable, conversational style
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-purple-50 border border-purple-100">
                  <h5 className="font-medium text-purple-900 text-sm mb-1">Confident</h5>
                  <p className="text-xs text-purple-700">
                    Assertive, decisive, clear statements
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-orange-50 border border-orange-100">
                  <h5 className="font-medium text-orange-900 text-sm mb-1">Empathetic</h5>
                  <p className="text-xs text-orange-700">
                    Understanding, supportive, considerate
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Usage Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Texts Analyzed</span>
                <span className="font-mono font-bold text-foreground">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg. Accuracy</span>
                <span className="font-mono font-bold text-foreground">94.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Improvements Made</span>
                <span className="font-mono font-bold text-foreground">892</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function SocialView() {
  const [platform, setPlatform] = useState('twitter');
  const [content, setContent] = useState('');
  const [generatedPosts, setGeneratedPosts] = useState([]);

  const platforms = [
    { id: 'twitter', name: 'Twitter', icon: Hash, limit: 280, color: 'text-blue-500' },
    { id: 'linkedin', name: 'LinkedIn', icon: AtSign, limit: 3000, color: 'text-blue-700' },
    { id: 'instagram', name: 'Instagram', icon: Image, limit: 2200, color: 'text-pink-600' },
    { id: 'facebook', name: 'Facebook', icon: Share2, limit: 63206, color: 'text-blue-600' }
  ];

  const samplePosts = [
    {
      id: 1,
      platform: 'twitter',
      content: '🚀 Just shipped a major update to Project Ogma! Our AI now anticipates user needs with 94% accuracy. The future of intelligent assistance is here. #AI #Innovation #TechUpdate',
      engagement: { likes: 234, shares: 45, comments: 12 },
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      platform: 'linkedin',
      content: 'Excited to share insights from our latest AI research! Project Ogma\'s post-agentic intelligence platform is revolutionizing how we interact with technology. Key findings: 40% increase in productivity, 60% reduction in cognitive load. What are your thoughts on the future of AI assistance?',
      engagement: { likes: 156, shares: 23, comments: 8 },
      timestamp: '1 day ago'
    },
    {
      id: 3,
      platform: 'instagram',
      content: '✨ Behind the scenes at Project Ogma! Our team is working on the next generation of AI that doesn\'t just respond—it anticipates. Swipe to see our design process! #BehindTheScenes #AI #Design #Innovation',
      engagement: { likes: 89, shares: 12, comments: 5 },
      timestamp: '2 days ago'
    }
  ];

  const generatePost = () => {
    const templates = {
      twitter: [
        '🚀 Exciting news! {content} #AI #Innovation',
        '💡 Just discovered: {content} What do you think?',
        '🔥 Hot take: {content} Agree or disagree?'
      ],
      linkedin: [
        'I\'m excited to share some insights about {content}. In my experience, this represents a significant shift in how we approach technology.',
        'Reflecting on recent developments in AI: {content}. I\'d love to hear your thoughts on this trend.',
        'Key takeaway from today: {content}. This has important implications for our industry.'
      ],
      instagram: [
        '✨ {content} Swipe for more insights! #AI #Tech #Innovation',
        '🌟 Sharing some thoughts: {content} What\'s your take? #TechTalk',
        '💫 Today\'s inspiration: {content} #Motivation #AI #Future'
      ]
    };

    const platformTemplates = templates[platform] || templates.twitter;
    const template = platformTemplates[Math.floor(Math.random() * platformTemplates.length)];
    const generated = template.replace('{content}', content || 'the future of AI assistance');
    
    const newPost = {
      id: Date.now(),
      platform,
      content: generated,
      engagement: {
        likes: Math.floor(Math.random() * 500),
        shares: Math.floor(Math.random() * 100),
        comments: Math.floor(Math.random() * 50)
      },
      timestamp: 'Just now'
    };

    setGeneratedPosts([newPost, ...generatedPosts]);
    toast.success('Post generated successfully!');
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-semibold text-foreground tracking-tight flex items-center space-x-3">
          <Share2 className="h-8 w-8 text-pink-600" />
          <span>Social Personalizer</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Craft personalized social content that resonates with your audience
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Content Creation */}
        <div className="lg:col-span-2 space-y-6">
          {/* Platform Selection */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Create Content</CardTitle>
              <CardDescription>
                Choose your platform and let AI personalize your message
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Platform Tabs */}
              <div className="flex flex-wrap gap-2">
                {platforms.map((p) => (
                  <Button
                    key={p.id}
                    variant={platform === p.id ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setPlatform(p.id)}
                    className="flex items-center space-x-2"
                  >
                    <p.icon className={`h-4 w-4 ${p.color}`} />
                    <span>{p.name}</span>
                  </Button>
                ))}
              </div>

              {/* Content Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Content Topic or Key Message
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter your main message or topic..."
                  className="w-full h-24 p-4 rounded-xl border border-border/50 bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-smooth"
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Character limit: {platforms.find(p => p.id === platform)?.limit}
                  </span>
                  <Button onClick={generatePost}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Post
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generated Posts */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Generated Content</CardTitle>
              <CardDescription>
                AI-personalized posts for your selected platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {generatedPosts.length === 0 ? (
                <div className="text-center py-8">
                  <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Generate your first post to see AI-personalized content
                  </p>
                </div>
              ) : (
                generatedPosts.map((post) => (
                  <div key={post.id} className="p-4 rounded-xl border border-border/30 hover:border-primary-200/50 transition-smooth group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {platforms.find(p => p.id === post.platform)?.icon && (
                          <div className={`p-2 rounded-lg bg-gray-50 ${platforms.find(p => p.id === post.platform)?.color}`}>
                            {React.createElement(platforms.find(p => p.id === post.platform)?.icon, { className: "h-4 w-4" })}
                          </div>
                        )}
                        <span className="font-medium text-sm capitalize">{post.platform}</span>
                      </div>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-smooth">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Edit3 className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-foreground mb-4 leading-relaxed">
                      {post.content}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <ThumbsUp className="h-3 w-3" />
                          <span>{post.engagement.likes}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Share className="h-3 w-3" />
                          <span>{post.engagement.shares}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{post.engagement.comments}</span>
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Posts */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Recent Posts</CardTitle>
              <CardDescription>
                Your latest social media activity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {samplePosts.map((post) => (
                <div key={post.id} className="p-3 rounded-lg border border-border/30 hover:border-primary-200/50 transition-smooth">
                  <div className="flex items-center space-x-2 mb-2">
                    {platforms.find(p => p.id === post.platform)?.icon && (
                      <div className={`p-1 rounded ${platforms.find(p => p.id === post.platform)?.color}`}>
                        {React.createElement(platforms.find(p => p.id === post.platform)?.icon, { className: "h-3 w-3" })}
                      </div>
                    )}
                    <span className="text-xs font-medium capitalize">{post.platform}</span>
                    <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                  </div>
                  <p className="text-xs text-foreground line-clamp-3 mb-2">
                    {post.content}
                  </p>
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <span>{post.engagement.likes} likes</span>
                    <span>{post.engagement.shares} shares</span>
                    <span>{post.engagement.comments} comments</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Content Tips */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Content Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                <h5 className="font-medium text-blue-900 text-sm mb-1">Engagement</h5>
                <p className="text-xs text-blue-700">
                  Ask questions to encourage interaction
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 border border-green-100">
                <h5 className="font-medium text-green-900 text-sm mb-1">Timing</h5>
                <p className="text-xs text-green-700">
                  Post when your audience is most active
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50 border border-purple-100">
                <h5 className="font-medium text-purple-900 text-sm mb-1">Hashtags</h5>
                <p className="text-xs text-purple-700">
                  Use relevant hashtags to increase reach
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Analytics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Posts Created</span>
                <span className="font-mono font-bold text-foreground">156</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Avg. Engagement</span>
                <span className="font-mono font-bold text-foreground">8.4%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Best Platform</span>
                <span className="font-mono font-bold text-foreground">LinkedIn</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MeetingView() {
  const [isRecording, setIsRecording] = useState(false);
  const [meetingStatus, setMeetingStatus] = useState('idle'); // idle, active, processing

  const upcomingMeetings = [
    {
      id: 1,
      title: 'Q1 Planning Session',
      time: '2:00 PM - 3:30 PM',
      attendees: ['Sarah Johnson', 'Mike Chen', 'Alex Rodriguez'],
      type: 'Strategy',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Client Review - TechCorp',
      time: '4:00 PM - 5:00 PM',
      attendees: ['Emma Wilson', 'David Kim'],
      type: 'Client',
      status: 'upcoming'
    }
  ];

  const recentMeetings = [
    {
      id: 1,
      title: 'Team Standup',
      date: '2 hours ago',
      duration: '30 min',
      attendees: 8,
      insights: 5,
      actionItems: 3,
      summary: 'Productive standup covering sprint progress, blockers, and upcoming deliverables.',
      keyPoints: ['Sprint on track', '2 blockers identified', 'Demo scheduled for Friday'],
      sentiment: 'positive'
    },
    {
      id: 2,
      title: 'Product Roadmap Review',
      date: '1 day ago',
      duration: '90 min',
      attendees: 12,
      insights: 8,
      actionItems: 6,
      summary: 'Comprehensive review of Q1 roadmap with stakeholder feedback and priority adjustments.',
      keyPoints: ['Q1 priorities confirmed', 'Resource allocation approved', 'Timeline adjusted'],
      sentiment: 'neutral'
    },
    {
      id: 3,
      title: 'Client Feedback Session',
      date: '2 days ago',
      duration: '60 min',
      attendees: 6,
      insights: 12,
      actionItems: 4,
      summary: 'Valuable client feedback session revealing key improvement areas and feature requests.',
      keyPoints: ['Mobile app improvements needed', 'API enhancements requested', 'Overall satisfaction high'],
      sentiment: 'positive'
    }
  ];

  const startRecording = () => {
    setIsRecording(true);
    setMeetingStatus('active');
    toast.success('Meeting recording started');
  };

  const stopRecording = () => {
    setIsRecording(false);
    setMeetingStatus('processing');
    toast.success('Recording stopped, processing insights...');
    
    // Simulate processing
    setTimeout(() => {
      setMeetingStatus('idle');
      toast.success('Meeting analysis complete!');
    }, 3000);
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-semibold text-foreground tracking-tight flex items-center space-x-3">
          <Users className="h-8 w-8 text-indigo-600" />
          <span>Meeting Intelligence</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Transform meetings into actionable insights with AI-powered analysis
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Meeting Control */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center space-x-2">
                <Video className="h-5 w-5 text-indigo-600" />
                <span>Live Meeting</span>
              </CardTitle>
              <CardDescription>
                Start recording to capture and analyze meeting insights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Recording Status */}
              <div className={`p-6 rounded-xl border-2 border-dashed transition-smooth ${
                meetingStatus === 'active' ? 'border-red-300 bg-red-50' :
                meetingStatus === 'processing' ? 'border-yellow-300 bg-yellow-50' :
                'border-border hover:border-primary-300'
              }`}>
                <div className="text-center space-y-4">
                  {meetingStatus === 'active' ? (
                    <>
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                        <span className="font-medium text-red-700">Recording Active</span>
                      </div>
                      <p className="text-sm text-red-600">
                        AI is capturing and analyzing your meeting in real-time
                      </p>
                    </>
                  ) : meetingStatus === 'processing' ? (
                    <>
                      <Loader2 className="h-8 w-8 animate-spin text-yellow-600 mx-auto" />
                      <span className="font-medium text-yellow-700">Processing Meeting</span>
                      <p className="text-sm text-yellow-600">
                        Generating insights and action items...
                      </p>
                    </>
                  ) : (
                    <>
                      <Mic className="h-12 w-12 text-muted-foreground mx-auto" />
                      <h3 className="text-lg font-medium text-foreground">Ready to Record</h3>
                      <p className="text-muted-foreground">
                        Start recording to capture meeting insights automatically
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-4">
                {!isRecording ? (
                  <Button onClick={startRecording} className="bg-red-600 hover:bg-red-700">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Start Recording
                  </Button>
                ) : (
                  <Button onClick={stopRecording} variant="outline" className="border-red-300 text-red-700 hover:bg-red-50">
                    <PauseCircle className="h-4 w-4 mr-2" />
                    Stop Recording
                  </Button>
                )}
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Meetings */}
          <Card className="glass border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Recent Meetings</CardTitle>
                <Button variant="ghost" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              <CardDescription>
                AI-analyzed meetings with insights and action items
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentMeetings.map((meeting) => (
                <div key={meeting.id} className="p-4 rounded-xl border border-border/30 hover:border-primary-200/50 transition-smooth group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">{meeting.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{meeting.date}</span>
                        <span>{meeting.duration}</span>
                        <span>{meeting.attendees} attendees</span>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      meeting.sentiment === 'positive' ? 'bg-green-50 text-green-700' :
                      meeting.sentiment === 'neutral' ? 'bg-yellow-50 text-yellow-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {meeting.sentiment}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {meeting.summary}
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-sm font-medium text-foreground mb-2">Key Points</h5>
                      <div className="space-y-1">
                        {meeting.keyPoints.map((point, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span className="text-xs text-muted-foreground">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-border/30">
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{meeting.insights} insights</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>{meeting.actionItems} actions</span>
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-smooth">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Download className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Share className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Meetings */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Upcoming</CardTitle>
              <CardDescription>
                Today's scheduled meetings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingMeetings.map((meeting) => (
                <div key={meeting.id} className="p-3 rounded-lg border border-border/30 hover:border-primary-200/50 transition-smooth">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground text-sm">{meeting.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      meeting.type === 'Strategy' ? 'bg-purple-50 text-purple-700' :
                      meeting.type === 'Client' ? 'bg-blue-50 text-blue-700' :
                      'bg-gray-50 text-gray-700'
                    }`}>
                      {meeting.type}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{meeting.time}</p>
                  <div className="flex items-center space-x-2">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {meeting.attendees.length} attendees
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Meeting Stats */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Meeting Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">This Week</span>
                <span className="font-mono font-bold text-foreground">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Hours</span>
                <span className="font-mono font-bold text-foreground">18.5h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Action Items</span>
                <span className="font-mono font-bold text-foreground">47</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Completion Rate</span>
                <span className="font-mono font-bold text-success">89%</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Upload className="h-4 w-4 mr-2" />
                Upload Recording
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export Reports
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function MemoryView() {
  const { data: contexts, isLoading } = useContexts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { key: 'all', label: 'All Contexts', count: contexts?.length || 0 },
    { key: 'meeting', label: 'Meetings', count: contexts?.filter(c => c.type === 'meeting').length || 0 },
    { key: 'document', label: 'Documents', count: contexts?.filter(c => c.type === 'document').length || 0 },
    { key: 'email', label: 'Emails', count: contexts?.filter(c => c.type === 'email').length || 0 },
  ];

  const filteredContexts = contexts?.filter(context => {
    const matchesFilter = selectedFilter === 'all' || context.type === selectedFilter;
    const matchesSearch = !searchQuery || 
      context.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      context.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  }) || [];

  const memoryStats = {
    totalContexts: contexts?.length || 0,
    totalInsights: 1247,
    connectionsFound: 89,
    memoryEfficiency: '96.2%'
  };

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl lg:text-4xl font-semibold text-foreground tracking-tight flex items-center space-x-3">
          <Clock className="h-8 w-8 text-orange-600" />
          <span>Memory Keeper</span>
        </h1>
        <p className="text-muted-foreground text-lg">
          Your AI memory system that never forgets important context and connections
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search through your memory..."
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.key}
              variant={selectedFilter === filter.key ? "secondary" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter.key)}
              className="text-xs"
            >
              {filter.label} ({filter.count})
            </Button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Memory Stats */}
        <div className="lg:col-span-1">
          <Card className="glass border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Memory Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Contexts</span>
                  <span className="font-mono font-bold text-foreground">{memoryStats.totalContexts}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Insights Generated</span>
                  <span className="font-mono font-bold text-foreground">{memoryStats.totalInsights}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Connections Found</span>
                  <span className="font-mono font-bold text-foreground">{memoryStats.connectionsFound}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Memory Efficiency</span>
                  <span className="font-mono font-bold text-success">{memoryStats.memoryEfficiency}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Context List */}
        <div className="lg:col-span-3">
          <Card className="glass border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Memory Archive</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Context
                  </Button>
                </div>
              </div>
              <CardDescription>
                {filteredContexts.length} contexts found
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-full"></div>
                    </div>
                  ))}
                </div>
              ) : filteredContexts.length === 0 ? (
                <div className="text-center py-12">
                  <Database className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No contexts found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery ? 'Try adjusting your search terms' : 'Start by adding some contexts to your memory'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredContexts.map((context) => (
                    <div key={context.id} className="p-4 rounded-xl border border-border/30 hover:border-primary-200/50 transition-smooth group">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium text-foreground truncate">{context.title}</h4>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              context.type === 'meeting' ? 'bg-indigo-50 text-indigo-700' :
                              context.type === 'document' ? 'bg-green-50 text-green-700' :
                              context.type === 'email' ? 'bg-blue-50 text-blue-700' :
                              'bg-gray-50 text-gray-700'
                            }`}>
                              {context.type}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              context.priority === 'high' ? 'bg-red-50 text-red-700' :
                              context.priority === 'medium' ? 'bg-yellow-50 text-yellow-700' :
                              'bg-green-50 text-green-700'
                            }`}>
                              {context.priority}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {context.content}
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                            <span>{formatDate(context.created_at)}</span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full ${
                              context.status === 'active' ? 'bg-green-50 text-green-700' :
                              context.status === 'pending' ? 'bg-yellow-50 text-yellow-700' :
                              'bg-gray-50 text-gray-700'
                            }`}>
                              {context.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-smooth">
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Edit3 className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Share className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Metadata */}
                      {context.metadata && Object.keys(context.metadata).length > 0 && (
                        <div className="pt-3 border-t border-border/30">
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(context.metadata).slice(0, 3).map(([key, value]) => (
                              <span key={key} className="text-xs bg-muted/50 text-muted-foreground px-2 py-1 rounded">
                                {key}: {Array.isArray(value) ? value.length : String(value).slice(0, 20)}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}