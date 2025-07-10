import React, { useState, useRef } from 'react';
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
  Users, 
  Clock,
  TrendingUp,
  Lightbulb,
  Activity,
  Zap,
  Send,
  Upload,
  Loader2,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Eye,
  Network,
  Shield
} from 'lucide-react';
import { toast } from 'sonner';

export function DashboardContent() {
  const { activeView, setActiveView } = useAppStore();

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
    <div className="p-6 animate-predictive-emerge">
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
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
      trend: '+12%',
    },
    {
      title: 'AI Insights',
      value: insights.length,
      icon: Lightbulb,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
      trend: '+8%',
    },
    {
      title: 'Pending Actions',
      value: contexts.filter(c => c.status === 'pending').length,
      icon: Activity,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
      trend: '-5%',
    },
    {
      title: 'Total Interactions',
      value: contexts.length,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
      trend: '+23%',
    },
  ];

  const quickActions = [
    {
      title: 'Start AI Chat',
      description: 'Begin a conversation with your AI assistant',
      icon: MessageCircle,
      action: () => {
        setActiveView('chat');
        toast.success('AI Chat interface loaded', {
          description: 'Your assistant is ready to help with contextual insights'
        });
      },
      color: 'bg-gradient-to-r from-blue-600 to-blue-700',
      pulse: true,
    },
    {
      title: 'Process Documents',
      description: 'Upload and analyze documents with AI',
      icon: FileText,
      action: () => {
        setActiveView('digest');
        toast.success('Document processing ready', {
          description: 'AI-powered analysis and insights available'
        });
      },
      color: 'bg-gradient-to-r from-green-600 to-green-700',
    },
    {
      title: 'Check Smart Inbox',
      description: 'Review AI-processed email insights',
      icon: Mail,
      action: () => {
        setActiveView('inbox');
        toast.success('Smart inbox loaded', {
          description: 'Priority emails and AI suggestions ready'
        });
      },
      color: 'bg-gradient-to-r from-purple-600 to-purple-700',
    },
    {
      title: 'Meeting Intelligence',
      description: 'Prepare for or review meetings',
      icon: Users,
      action: () => {
        setActiveView('meeting');
        toast.success('Meeting intelligence ready', {
          description: 'AI-powered meeting insights and preparation'
        });
      },
      color: 'bg-gradient-to-r from-orange-600 to-orange-700',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="relative">
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-primary/5 rounded-full animate-neural-pulse" />
        <div className="relative">
          <h1 className="text-4xl font-bold text-foreground mb-3 tracking-tight">Intelligence Dashboard</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Your unified workspace for AI-powered productivity and contextual intelligence
          </p>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor} animate-gentle-float`} style={{ animationDelay: `${index * 0.5}s` }}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.trend}</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Quick Actions */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <span>Quick Actions</span>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Sparkles className="h-3 w-3" />
              <span>AI-Powered</span>
            </div>
          </CardTitle>
          <CardDescription>
            Jump into your most-used features with intelligent assistance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className={`h-auto p-6 justify-start hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-border/50 ${
                  action.pulse ? 'animate-neural-pulse' : ''
                }`}
                onClick={action.action}
              >
                <div className={`p-3 rounded-xl ${action.color} mr-4 shadow-lg`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-foreground text-base">{action.title}</div>
                  <div className="text-sm text-muted-foreground mt-1">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Network className="h-5 w-5 text-primary" />
              <span>Recent Contexts</span>
            </CardTitle>
            <CardDescription>Your latest AI interactions and insights</CardDescription>
          </CardHeader>
          <CardContent>
            {contexts.length > 0 ? (
              <div className="space-y-4">
                {contexts.slice(0, 5).map((context, index) => (
                  <div 
                    key={context.id} 
                    className="flex items-center space-x-4 p-4 rounded-xl hover:bg-muted/50 transition-all duration-200 border border-border/30 hover:border-primary/30"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`w-3 h-3 rounded-full ${
                      context.status === 'active' ? 'bg-green-500 animate-pulse' :
                      context.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{context.title}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-muted-foreground capitalize">{context.type}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          context.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                          context.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400' :
                          'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400'
                        }`}>
                          {context.priority}
                        </span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(context.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-pulse" />
                <p className="text-sm text-muted-foreground">No contexts yet</p>
                <p className="text-xs text-muted-foreground mt-1">Start interacting to see AI-generated contexts</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-primary" />
              <span>AI Insights</span>
            </CardTitle>
            <CardDescription>Intelligence recommendations and patterns</CardDescription>
          </CardHeader>
          <CardContent>
            {insights.length > 0 ? (
              <div className="space-y-4">
                {insights.slice(0, 5).map((insight, index) => (
                  <div 
                    key={insight.id} 
                    className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-200 hover:shadow-md"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900/20">
                        <Lightbulb className="h-4 w-4 text-yellow-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <p className="text-sm font-semibold text-foreground">{insight.title}</p>
                          <div className="flex items-center space-x-1">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-xs text-muted-foreground">
                              {Math.round(insight.confidence * 100)}% confidence
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed">{insight.description}</p>
                        {insight.actionable && (
                          <div className="mt-2">
                            <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                              Actionable
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4 animate-pulse" />
                <p className="text-sm text-muted-foreground">No insights yet</p>
                <p className="text-xs text-muted-foreground mt-1">AI will generate insights as you interact</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ChatView() {
  const { data: messages = [], isLoading } = useChatMessages();
  const sendMessage = useSendMessage();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || sendMessage.isPending) return;
    
    const message = inputValue.trim();
    setInputValue('');
    
    try {
      await sendMessage.mutateAsync(message);
      toast.success('Message sent', {
        description: 'AI is analyzing your request...'
      });
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)]">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <MessageCircle className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Assistant</h1>
          <p className="text-muted-foreground">Your intelligent conversation partner with contextual awareness</p>
        </div>
      </div>
      
      <Card className="flex-1 flex flex-col h-full border-border/50">
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-4 ${
                  message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                } animate-scale-in`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  message.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}>
                  {message.role === 'user' ? (
                    <span className="text-sm font-medium">You</span>
                  ) : (
                    <Brain className="h-5 w-5 text-primary" />
                  )}
                </div>
                
                <div className={`flex-1 space-y-2 ${message.role === 'user' ? 'text-right' : ''}`}>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-muted-foreground">
                      {message.role === 'user' ? 'You' : 'AI Assistant'}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                    {message.metadata?.confidence && (
                      <span className="text-xs text-green-600">
                        {Math.round(message.metadata.confidence * 100)}% confident
                      </span>
                    )}
                  </div>
                  
                  <div className={`rounded-2xl p-4 max-w-3xl ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground ml-auto'
                      : 'bg-muted/50 border border-border/50'
                  } ${message.metadata?.thinking ? 'animate-pulse' : ''}`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                    
                    {message.metadata?.thinking && (
                      <div className="flex items-center space-x-2 mt-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="text-xs opacity-70">Thinking...</span>
                      </div>
                    )}
                    
                    {message.metadata?.relatedContext && (
                      <div className="mt-3 pt-3 border-t border-border/30">
                        <div className="flex items-center space-x-2">
                          <Network className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            Related to: {message.metadata.relatedContext}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <div className="border-t border-border/30 p-6">
            <div className="flex space-x-4">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your contexts, or request help with tasks..."
                className="flex-1 text-base"
                disabled={sendMessage.isPending}
              />
              <Button 
                onClick={handleSend}
                disabled={!inputValue.trim() || sendMessage.isPending}
                className="px-6"
              >
                {sendMessage.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 flex items-center space-x-1">
              <Sparkles className="h-3 w-3" />
              <span>AI assistant with full context awareness • Press Enter to send</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ToneView() {
  const [inputText, setInputText] = useState("Hi team, I wanted to follow up on our discussion yesterday. Could we schedule a quick meeting to finalize the project details?");
  const toneAnalysis = useToneAnalysis();

  const handleAnalyze = () => {
    if (!inputText.trim()) return;
    toneAnalysis.mutate(inputText);
  };

  React.useEffect(() => {
    // Auto-analyze on component mount
    if (inputText) {
      handleAnalyze();
    }
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Shield className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">ToneAware</h1>
          <p className="text-muted-foreground">Optimize your communication tone and style with AI analysis</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Message Analysis</CardTitle>
            <CardDescription>Real-time communication insights and optimization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Your Message</label>
                <textarea 
                  className="w-full p-4 border border-input rounded-lg bg-background text-sm min-h-[120px] resize-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Type your message here for tone analysis..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={handleAnalyze}
                disabled={!inputText.trim() || toneAnalysis.isPending}
                className="w-full"
              >
                {toneAnalysis.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Analyzing Tone...
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Analyze Tone
                  </>
                )}
              </Button>
              
              {toneAnalysis.data && (
                <div className="space-y-3 pt-4 border-t border-border/30">
                  {Object.entries(toneAnalysis.data.analysis).map(([tone, value]) => (
                    <div key={tone} className="flex items-center justify-between">
                      <span className="text-sm capitalize font-medium">{tone}</span>
                      <div className="flex items-center space-x-3 flex-1 mx-4">
                        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-2 rounded-full transition-all duration-1000 ${
                              value > 80 ? 'bg-green-500' :
                              value > 60 ? 'bg-blue-500' :
                              value > 40 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${value}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground w-12 text-right">
                          {Math.round(value)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>AI Suggestions</CardTitle>
            <CardDescription>Intelligent improvements and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            {toneAnalysis.isPending ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : toneAnalysis.data ? (
              <div className="space-y-4">
                {toneAnalysis.data.suggestions.map((suggestion, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border ${
                      suggestion.type === 'improvement' ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20' :
                      suggestion.type === 'balance' ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' :
                      'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20'
                    } animate-scale-in`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`p-1 rounded ${
                        suggestion.type === 'improvement' ? 'bg-blue-100 dark:bg-blue-800' :
                        suggestion.type === 'balance' ? 'bg-green-100 dark:bg-green-800' :
                        'bg-yellow-100 dark:bg-yellow-800'
                      }`}>
                        {suggestion.type === 'improvement' ? '💡' :
                         suggestion.type === 'balance' ? '✓' : '⚠️'}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm mb-1">{suggestion.message}</p>
                        <p className="text-xs text-muted-foreground">{suggestion.example}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border/30">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Overall Assessment</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your message demonstrates good communication balance. The tone is professional yet approachable, 
                    making it suitable for team collaboration.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">Enter text and click "Analyze Tone" to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DigestView() {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const documentProcess = useDocumentProcess();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast.error('File too large', {
        description: 'Please select a file smaller than 10MB'
      });
      return;
    }
    
    documentProcess.mutate(file);
    toast.success('Processing document', {
      description: `Analyzing "${file.name}" with AI...`
    });
  };

  const recentDocuments = [
    { 
      name: 'Q4 Financial Report.pdf', 
      insights: 'Revenue up 15%, costs optimized, growth trajectory positive', 
      status: 'processed',
      confidence: 0.94,
      processingTime: '2.3s'
    },
    { 
      name: 'Market Analysis.docx', 
      insights: 'Key trends identified, 3 major opportunities, competitive landscape mapped', 
      status: 'processed',
      confidence: 0.87,
      processingTime: '1.8s'
    },
    { 
      name: 'Product Roadmap.pptx', 
      insights: 'Timeline analysis complete, resource allocation optimized', 
      status: 'processing',
      confidence: 0.0,
      processingTime: 'In progress...'
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Document Digest</h1>
          <p className="text-muted-foreground">AI-powered document analysis and intelligent insights</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>Processed and analyzed with AI intelligence</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDocuments.map((doc, i) => (
                <div key={i} className="p-4 border border-border/30 rounded-xl hover:border-primary/30 transition-all duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-semibold text-sm truncate flex-1 mr-2">{doc.name}</p>
                    <div className="flex items-center space-x-2">
                      {doc.status === 'processed' && (
                        <span className="text-xs text-green-600 flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>{Math.round(doc.confidence * 100)}%</span>
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        doc.status === 'processed' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 
                        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">{doc.insights}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Processing time: {doc.processingTime}</span>
                    {doc.status === 'processing' && (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Upload New Document</CardTitle>
            <CardDescription>Drag & drop or click to upload for AI analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                dragActive 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border/50 hover:border-primary/50'
              } ${documentProcess.isPending ? 'opacity-50 pointer-events-none' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {documentProcess.isPending ? (
                <div className="space-y-4">
                  <Loader2 className="h-12 w-12 text-primary mx-auto animate-spin" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Processing Document...</p>
                    <p className="text-xs text-muted-foreground mt-1">AI is analyzing your document</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                      <Sparkles className="h-2 w-2 text-white" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-foreground font-medium mb-2">
                      Drop files here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supports PDF, DOCX, TXT, and more • Max 10MB
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-4"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={handleFileInput}
                    accept=".pdf,.doc,.docx,.txt,.md"
                  />
                </div>
              )}
            </div>
            
            {documentProcess.data && (
              <div className="mt-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 animate-scale-in">
                <div className="flex items-center space-x-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-800 dark:text-green-400">
                    Processing Complete
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong>File:</strong> {documentProcess.data.fileName}</p>
                  <p><strong>Summary:</strong> {documentProcess.data.summary}</p>
                  <div>
                    <strong>Key Insights:</strong>
                    <ul className="list-disc list-inside mt-1 space-y-1 text-xs">
                      {documentProcess.data.insights.map((insight, i) => (
                        <li key={i} className="text-muted-foreground">{insight}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-green-200 dark:border-green-800">
                    <span className="text-xs text-muted-foreground">
                      Confidence: {Math.round(documentProcess.data.confidence * 100)}%
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Processed in {documentProcess.data.processingTime}ms
                    </span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Placeholder components for other views (keeping them simpler for now)
function InboxView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Mail className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Smart Inbox</h1>
          <p className="text-muted-foreground">AI-powered email intelligence and prioritization</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span>Priority Emails</span>
            </CardTitle>
            <CardDescription>Requires immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { from: 'CEO', subject: 'Q4 Budget Review', priority: 'high', time: '2 min ago' },
                { from: 'Client', subject: 'Project Deadline', priority: 'high', time: '15 min ago' },
              ].map((email, i) => (
                <div key={i} className="p-3 border border-red-200 dark:border-red-800 rounded-lg bg-red-50 dark:bg-red-900/20 hover:shadow-md transition-all">
                  <p className="font-medium text-sm">{email.subject}</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-muted-foreground">From: {email.from}</p>
                    <p className="text-xs text-muted-foreground">{email.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <span>AI Insights</span>
            </CardTitle>
            <CardDescription>Smart recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <p className="font-medium text-sm">Meeting Follow-up</p>
                <p className="text-xs text-muted-foreground">3 emails need responses</p>
              </div>
              <div className="p-3 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20">
                <p className="font-medium text-sm">Auto-drafted Replies</p>
                <p className="text-xs text-muted-foreground">2 responses ready for review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-500" />
              <span>Recent Activity</span>
            </CardTitle>
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

function SocialView() {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Network className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Social Personalizer</h1>
          <p className="text-muted-foreground">AI-powered social media content optimization</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-border/50">
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
                <div key={i} className="p-3 border border-border/30 rounded-lg hover:border-primary/30 transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{item.platform}</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.engagement === 'High' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 
                      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
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
        
        <Card className="border-border/50">
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
        
        <Card className="border-border/50">
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
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Users className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Meeting Intelligence</h1>
          <p className="text-muted-foreground">AI-powered meeting preparation and analysis</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Upcoming Meetings</CardTitle>
            <CardDescription>AI-prepared insights and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  title: 'Q1 Strategy Review', 
                  time: 'Today, 2:00 PM', 
                  attendees: 5,
                  preparation: 'Budget docs reviewed, key metrics prepared',
                  confidence: 0.92
                },
                { 
                  title: 'Product Roadmap Sync', 
                  time: 'Tomorrow, 10:00 AM', 
                  attendees: 8,
                  preparation: 'Feature priorities analyzed, timeline optimized',
                  confidence: 0.87
                },
              ].map((meeting, i) => (
                <div key={i} className="p-4 border border-border/30 rounded-xl hover:border-primary/30 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-sm">{meeting.title}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">{meeting.attendees} attendees</span>
                      <span className="text-xs text-green-600">{Math.round(meeting.confidence * 100)}%</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{meeting.time}</p>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3 text-green-600" />
                    <p className="text-xs text-green-600">{meeting.preparation}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Recent Meeting Summary</CardTitle>
            <CardDescription>Q4 Planning Meeting - Yesterday</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Key Decisions</span>
                </h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  <li>• Budget increased by 15% for Q1</li>
                  <li>• New product launch moved to March</li>
                  <li>• Team expansion approved for engineering</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-sm mb-2 flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-blue-600" />
                  <span>Action Items</span>
                </h4>
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
                <h4 className="font-medium text-sm mb-2 flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-purple-600" />
                  <span>Next Steps</span>
                </h4>
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
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Clock className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Memory Keeper</h1>
          <p className="text-muted-foreground">Your AI-powered knowledge retention and connection system</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Recent Memories</CardTitle>
            <CardDescription>Automatically captured insights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { type: 'Meeting', title: 'Q4 Budget Decision', time: '2 hours ago', confidence: 0.94 },
                { type: 'Document', title: 'Market Analysis Key Points', time: '1 day ago', confidence: 0.87 },
                { type: 'Conversation', title: 'Client Feedback Summary', time: '2 days ago', confidence: 0.91 },
              ].map((memory, i) => (
                <div key={i} className="p-3 border border-border/30 rounded-lg hover:border-primary/30 transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-primary">{memory.type}</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-xs text-muted-foreground">{Math.round(memory.confidence * 100)}%</span>
                    </div>
                  </div>
                  <p className="text-sm font-medium">{memory.title}</p>
                  <p className="text-xs text-muted-foreground">{memory.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Knowledge Graph</CardTitle>
            <CardDescription>Connected insights and relationships</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border border-border/30 rounded-lg">
                <p className="font-medium text-sm">Budget Planning</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 rounded">Q4 Review</span>
                  <span className="px-2 py-1 text-xs bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 rounded">Team Expansion</span>
                  <span className="px-2 py-1 text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400 rounded">Product Launch</span>
                </div>
              </div>
              
              <div className="p-3 border border-border/30 rounded-lg">
                <p className="font-medium text-sm">Market Research</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <span className="px-2 py-1 text-xs bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 rounded">Trends</span>
                  <span className="px-2 py-1 text-xs bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 rounded">Competitors</span>
                  <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400 rounded">Opportunities</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Smart Reminders</CardTitle>
            <CardDescription>AI-suggested follow-ups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border border-yellow-200 dark:border-yellow-800 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                <p className="font-medium text-sm text-yellow-800 dark:text-yellow-400">📅 Follow-up Due</p>
                <p className="text-xs text-yellow-600 dark:text-yellow-500">Check on hiring plan progress with Sarah</p>
              </div>
              
              <div className="p-3 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <p className="font-medium text-sm text-blue-800 dark:text-blue-400">🔄 Recurring Review</p>
                <p className="text-xs text-blue-600 dark:text-blue-500">Weekly market analysis update available</p>
              </div>
              
              <div className="p-3 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20">
                <p className="font-medium text-sm text-green-800 dark:text-green-400">💡 Connection Found</p>
                <p className="text-xs text-green-600 dark:text-green-500">New insight links to previous client feedback</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}