import React, { useState, useRef, useEffect } from 'react';
import { useChatMessages, useSendMessage, ChatMessage } from '@/hooks/useDemoData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Send, 
  Brain, 
  User, 
  Loader2, 
  Sparkles, 
  MessageCircle,
  Clock,
  CheckCircle
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export function AssistantView() {
  const [message, setMessage] = useState('');
  const { data: messages, isLoading } = useChatMessages();
  const sendMessage = useSendMessage();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim() || sendMessage.isPending) return;
    
    const messageToSend = message;
    setMessage('');
    
    try {
      await sendMessage.mutateAsync(messageToSend);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "What action items need my attention?",
    "Summarize my recent meeting notes",
    "Help me draft a follow-up email",
    "What patterns do you see in my work?"
  ];

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border/50 p-6">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Brain className="h-8 w-8 text-primary-600 animate-intelligence-pulse" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">AI Assistant</h1>
            <p className="text-muted-foreground">
              Your intelligent companion for tasks, insights, and productivity
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-hidden flex">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
              </div>
            ) : messages && messages.length > 0 ? (
              messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex space-x-3 max-w-3xl ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      msg.role === 'user' 
                        ? 'bg-primary-100 text-primary-700' 
                        : 'bg-neural-100 text-neural-700'
                    }`}>
                      {msg.role === 'user' ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <Brain className={`h-5 w-5 ${msg.metadata?.thinking ? 'animate-pulse' : ''}`} />
                      )}
                    </div>

                    {/* Message Content */}
                    <div className={`flex-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                      <div className={`inline-block p-4 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-primary-600 text-primary-foreground'
                          : msg.metadata?.thinking
                          ? 'bg-muted/50 text-muted-foreground border border-border/50'
                          : 'bg-card text-card-foreground border border-border/50 shadow-soft'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {msg.content}
                        </p>
                        
                        {/* Metadata for AI messages */}
                        {msg.role === 'assistant' && msg.metadata && !msg.metadata.thinking && (
                          <div className="mt-3 pt-3 border-t border-border/30">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center space-x-2">
                                {msg.metadata.confidence && (
                                  <div className="flex items-center space-x-1">
                                    <CheckCircle className="h-3 w-3" />
                                    <span>{Math.round(msg.metadata.confidence * 100)}% confident</span>
                                  </div>
                                )}
                                {msg.metadata.relatedContext && (
                                  <div className="flex items-center space-x-1">
                                    <Sparkles className="h-3 w-3" />
                                    <span>Related: {msg.metadata.relatedContext}</span>
                                  </div>
                                )}
                              </div>
                              <span>{formatDate(msg.timestamp)}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-6 max-w-md">
                  <div className="relative">
                    <Brain className="h-16 w-16 mx-auto text-primary-600 animate-intelligence-pulse" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                      <Sparkles className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Ready to assist you
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      I can help with tasks, answer questions, and provide insights based on your data. 
                      Try asking me something!
                    </p>
                  </div>
                  
                  {/* Suggested Questions */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Try asking:</p>
                    <div className="space-y-2">
                      {suggestedQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="w-full text-left justify-start h-auto p-3 text-sm"
                          onClick={() => setMessage(question)}
                        >
                          <MessageCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{question}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border/50 p-6">
            <div className="flex space-x-3">
              <div className="flex-1">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your work, tasks, or data..."
                  className="h-12 text-base"
                  disabled={sendMessage.isPending}
                />
              </div>
              <Button
                onClick={handleSend}
                disabled={!message.trim() || sendMessage.isPending}
                className="h-12 px-6"
              >
                {sendMessage.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              AI responses are generated based on your data and context. Always verify important information.
            </p>
          </div>
        </div>

        {/* Context Panel */}
        <div className="w-80 border-l border-border/50 bg-muted/20 p-6 space-y-4">
          <h3 className="font-semibold text-foreground flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-primary-600" />
            <span>Context & Insights</span>
          </h3>
          
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Active Context</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Last activity: 2 minutes ago</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Brain className="h-4 w-4 text-primary-600" />
                <span className="text-foreground">Processing your recent contexts</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-foreground">Ready to provide insights</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "Summarize recent activity",
                "Find action items",
                "Draft email response",
                "Analyze patterns"
              ].map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start h-auto p-2 text-xs"
                  onClick={() => setMessage(action)}
                >
                  {action}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}