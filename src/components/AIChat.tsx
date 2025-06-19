import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff,
  Sparkles,
  Brain,
  Clock,
  FileText,
  Share2,
  Calendar
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  intent?: string;
  actions?: Array<{
    label: string;
    action: string;
    data?: any;
  }>;
}

interface AIIntentResult {
  intent: string;
  confidence: number;
  suggestedActions: Array<{
    label: string;
    action: string;
    data?: any;
  }>;
  contextualInfo?: string;
}

const AIChat = ({ onNavigate }: { onNavigate: (view: string) => void }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your AI assistant. I can help you with social media posts, meeting notes, document analysis, and more. What would you like to work on today?",
      timestamp: new Date(),
      intent: 'greeting'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectIntent = (message: string): AIIntentResult => {
    const lowerMessage = message.toLowerCase();
    
    // Social media intent
    if (lowerMessage.includes('post') || lowerMessage.includes('social') || 
        lowerMessage.includes('linkedin') || lowerMessage.includes('twitter') ||
        lowerMessage.includes('instagram') || lowerMessage.includes('share')) {
      return {
        intent: 'social_media',
        confidence: 0.9,
        suggestedActions: [
          { label: 'Create Social Posts', action: 'navigate', data: 'social' },
          { label: 'View Memory Timeline', action: 'navigate', data: 'memory' }
        ],
        contextualInfo: "I can help you create personalized posts for different platforms."
      };
    }

    // Meeting intent
    if (lowerMessage.includes('meeting') || lowerMessage.includes('notes') || 
        lowerMessage.includes('record') || lowerMessage.includes('transcript')) {
      return {
        intent: 'meeting',
        confidence: 0.85,
        suggestedActions: [
          { label: 'Start Meeting Intelligence', action: 'navigate', data: 'meeting' },
          { label: 'View Past Meetings', action: 'navigate', data: 'memory' }
        ],
        contextualInfo: "I can help you record meetings and extract key insights."
      };
    }

    // Document intent
    if (lowerMessage.includes('document') || lowerMessage.includes('analyze') || 
        lowerMessage.includes('summary') || lowerMessage.includes('digest')) {
      return {
        intent: 'document',
        confidence: 0.8,
        suggestedActions: [
          { label: 'Open Doc Digest', action: 'navigate', data: 'digest' },
          { label: 'View Analysis History', action: 'navigate', data: 'memory' }
        ],
        contextualInfo: "I can analyze documents and create comprehensive summaries."
      };
    }

    // Email/Communication intent
    if (lowerMessage.includes('email') || lowerMessage.includes('tone') || 
        lowerMessage.includes('communication') || lowerMessage.includes('draft')) {
      return {
        intent: 'communication',
        confidence: 0.8,
        suggestedActions: [
          { label: 'Use ToneAware', action: 'navigate', data: 'tone' },
          { label: 'Check Recent Drafts', action: 'navigate', data: 'memory' }
        ],
        contextualInfo: "I can help improve the tone and clarity of your communications."
      };
    }

    // Memory/Search intent
    if (lowerMessage.includes('remember') || lowerMessage.includes('find') || 
        lowerMessage.includes('search') || lowerMessage.includes('history')) {
      return {
        intent: 'memory',
        confidence: 0.9,
        suggestedActions: [
          { label: 'Search Memory Keeper', action: 'navigate', data: 'memory' },
          { label: 'View Timeline', action: 'navigate', data: 'memory' }
        ],
        contextualInfo: "I can help you find and recall past interactions and insights."
      };
    }

    // General/Chat intent
    return {
      intent: 'general',
      confidence: 0.6,
      suggestedActions: [
        { label: 'View Smart Inbox', action: 'navigate', data: 'inbox' },
        { label: 'Browse All Features', action: 'navigate', data: 'inbox' }
      ],
      contextualInfo: "I'm here to help with any task. What would you like to explore?"
    };
  };

  const generateAIResponse = (userMessage: string, intentResult: AIIntentResult): string => {
    const responses = {
      social_media: [
        "I can help you create engaging social media content! Let me analyze your recent activities to suggest personalized posts.",
        "Perfect! I'll help you craft posts that match your professional voice. Should we start with LinkedIn or explore all platforms?",
        "Great idea! I can create platform-specific content that resonates with your audience. Let's get started!"
      ],
      meeting: [
        "I'm ready to help with your meeting! I can record, transcribe, and extract key insights automatically.",
        "Excellent! I'll help you capture and organize meeting insights. Would you like to start a new recording or review past meetings?",
        "I can make your meetings more productive by tracking action items and key decisions. Let's set that up!"
      ],
      document: [
        "I'll analyze your document and create a comprehensive summary with key insights and recommendations.",
        "Perfect! I can extract the most important information and help you understand complex documents quickly.",
        "Document analysis is one of my strengths! I can identify risks, opportunities, and key takeaways."
      ],
      communication: [
        "I'll help you craft the perfect message with the right tone for your audience and context.",
        "Great! I can analyze your communication style and suggest improvements for clarity and impact.",
        "Let me help you communicate more effectively. I can adjust tone, style, and messaging for different contexts."
      ],
      memory: [
        "I can search through all your past interactions and help you find exactly what you're looking for.",
        "Perfect! I remember everything we've worked on together. What specific information do you need?",
        "I've been keeping track of all your activities. Let me help you find those insights quickly."
      ],
      general: [
        "I'm here to help with any task! I can assist with social media, meetings, documents, communications, and more.",
        "What would you like to work on? I can help with content creation, analysis, or finding past work.",
        "I'm ready to assist! Whether it's creating content, analyzing documents, or organizing thoughts, I'm here for you."
      ]
    };

    const intentResponses = responses[intentResult.intent as keyof typeof responses] || responses.general;
    return intentResponses[Math.floor(Math.random() * intentResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const intentResult = detectIntent(inputValue);
      const aiResponse = generateAIResponse(inputValue, intentResult);

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date(),
        intent: intentResult.intent,
        actions: intentResult.suggestedActions
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);

      // Auto-save to memory
      saveToMemory(userMessage, aiMessage, intentResult);
    }, 1000);
  };

  const saveToMemory = (userMessage: ChatMessage, aiMessage: ChatMessage, intentResult: AIIntentResult) => {
    // This would integrate with the actual Memory Keeper
    console.log('Saving to memory:', {
      userMessage: userMessage.content,
      aiResponse: aiMessage.content,
      intent: intentResult.intent,
      timestamp: new Date()
    });
  };

  const handleAction = (action: string, data?: any) => {
    if (action === 'navigate' && data) {
      onNavigate(data);
      toast({
        title: "Navigating to " + data,
        description: "Opening the requested feature..."
      });
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Recording started",
        description: "Speak now, I'm listening..."
      });
    } else {
      toast({
        title: "Recording stopped",
        description: "Processing your voice input..."
      });
    }
  };

  const getIntentIcon = (intent?: string) => {
    switch (intent) {
      case 'social_media': return <Share2 size={16} />;
      case 'meeting': return <Calendar size={16} />;
      case 'document': return <FileText size={16} />;
      case 'communication': return <MessageCircle size={16} />;
      case 'memory': return <Clock size={16} />;
      default: return <Brain size={16} />;
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-2">
            <Sparkles className="text-blue-600" />
            <span>AI Assistant</span>
          </h1>
          <p className="text-slate-600">Conversational AI that understands context and learns from your patterns</p>
        </div>
      </div>

      {/* Chat Messages */}
      <Card className="flex-1 flex flex-col mb-4">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle size={20} />
            <span>Conversation</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-900'
                  }`}
                >
                  {message.type === 'ai' && message.intent && (
                    <div className="flex items-center space-x-2 mb-2">
                      {getIntentIcon(message.intent)}
                      <Badge variant="outline" className="text-xs">
                        {message.intent.replace('_', ' ')}
                      </Badge>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                  {message.actions && message.actions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.actions.map((action, idx) => (
                        <Button
                          key={idx}
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          onClick={() => handleAction(action.action, action.data)}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-slate-100 rounded-lg p-3">
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm text-slate-600">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="flex items-center space-x-2">
            <Button
              variant={isRecording ? "destructive" : "outline"}
              size="sm"
              onClick={toggleRecording}
            >
              {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
            </Button>
            <Input
              placeholder="Ask me anything or describe what you'd like to work on..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
              <Send size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIChat;
