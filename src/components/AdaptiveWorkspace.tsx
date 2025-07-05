
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Zap, 
  Clock, 
  Users, 
  MessageCircle,
  ChevronRight,
  Lightbulb,
  Target
} from 'lucide-react';
import { useAmbientIntelligence } from '@/hooks/useAmbientIntelligence';
import { useContextEngine } from '@/hooks/useContextEngine';

interface AdaptiveWorkspaceProps {
  activeView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

const AdaptiveWorkspace: React.FC<AdaptiveWorkspaceProps> = ({ 
  activeView, 
  onNavigate, 
  onLogout 
}) => {
  const { contexts, insights } = useContextEngine();
  const { 
    ambientState, 
    observePattern, 
    predictNextAction, 
    detectWorkspaceMode 
  } = useAmbientIntelligence();

  const [contextualFeatures, setContextualFeatures] = useState<string[]>([]);

  // Update workspace mode based on current context
  useEffect(() => {
    detectWorkspaceMode(activeView, contexts);
    predictNextAction(contexts, insights);
  }, [activeView, contexts, insights, detectWorkspaceMode, predictNextAction]);

  // Determine contextually relevant features
  useEffect(() => {
    const relevantFeatures = [];
    
    // Always show intelligence hub
    relevantFeatures.push('hub');
    
    // Context-aware feature suggestions
    if (ambientState.workspaceMode === 'collaborative') {
      relevantFeatures.push('meeting', 'social', 'chat');
    } else if (ambientState.workspaceMode === 'analytical') {
      relevantFeatures.push('digest', 'memory', 'chat');
    } else if (ambientState.workspaceMode === 'creative') {
      relevantFeatures.push('tone', 'social', 'chat');
    } else if (ambientState.workspaceMode === 'social') {
      relevantFeatures.push('social', 'inbox', 'chat');
    } else {
      // Focused mode - show most relevant based on pending contexts
      if (contexts.some(c => c.type === 'email' && c.status === 'pending')) {
        relevantFeatures.push('inbox');
      }
      if (contexts.some(c => c.type === 'meeting' && c.status === 'pending')) {
        relevantFeatures.push('meeting');
      }
      relevantFeatures.push('chat');
    }
    
    setContextualFeatures([...new Set(relevantFeatures)]);
  }, [ambientState.workspaceMode, contexts]);

  const getFeatureConfig = (featureId: string) => {
    const configs = {
      hub: { label: 'Intelligence Hub', icon: Brain, priority: 1 },
      chat: { label: 'AI Assistant', icon: MessageCircle, priority: 2 },
      inbox: { label: 'Smart Inbox', icon: Clock, priority: 3 },
      meeting: { label: 'Meeting Intelligence', icon: Users, priority: 4 },
      social: { label: 'Social Personalizer', icon: Target, priority: 5 },
      digest: { label: 'Doc Digest', icon: Lightbulb, priority: 6 },
      tone: { label: 'ToneAware', icon: Zap, priority: 7 },
      memory: { label: 'Memory Keeper', icon: Clock, priority: 8 }
    };
    return configs[featureId as keyof typeof configs];
  };

  const handleFeatureClick = (featureId: string) => {
    observePattern('workflow', `navigate-to-${featureId}`);
    onNavigate(featureId);
  };

  return (
    <div className="w-80 glass border-r border-border/50 h-screen flex flex-col shadow-medium">
      {/* Adaptive Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center space-x-3 mb-4">
          <Brain className="h-8 w-8 text-primary animate-neural-pulse" />
          <div>
            <h2 className="text-xl font-heading font-bold text-foreground">
              Project Ogma
            </h2>
            <Badge variant="secondary" className="text-xs">
              {ambientState.workspaceMode} mode
            </Badge>
          </div>
        </div>
        
        {/* Ambient Intelligence Indicator */}
        {ambientState.nextSuggestedAction && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-3">
              <div className="flex items-start space-x-2">
                <Lightbulb className="h-4 w-4 text-primary mt-0.5" />
                <p className="text-sm text-foreground leading-relaxed">
                  {ambientState.nextSuggestedAction}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Contextual Navigation */}
      <div className="flex-1 p-4 space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
          Contextual Workspace
        </h3>
        
        {contextualFeatures.map((featureId) => {
          const config = getFeatureConfig(featureId);
          if (!config) return null;
          
          const isActive = activeView === featureId;
          
          return (
            <Button
              key={featureId}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-between font-medium h-12 transition-all duration-300 ${
                isActive 
                  ? "shadow-soft scale-105 bg-primary text-primary-foreground" 
                  : "hover:shadow-soft hover:scale-105"
              }`}
              onClick={() => handleFeatureClick(featureId)}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  isActive 
                    ? 'bg-primary-foreground/20' 
                    : 'bg-primary/10'
                } transition-colors duration-300`}>
                  <config.icon className="h-4 w-4" />
                </div>
                <span>{config.label}</span>
              </div>
              <ChevronRight className="h-4 w-4 opacity-50" />
            </Button>
          );
        })}
      </div>

      {/* Context Summary */}
      <div className="p-4 border-t border-border/50 space-y-3">
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Active Contexts</span>
            <span>{contexts.filter(c => c.status === 'active').length}</span>
          </div>
          <div className="flex justify-between">
            <span>Pending Actions</span>
            <span>{contexts.filter(c => c.status === 'pending').length}</span>
          </div>
          <div className="flex justify-between">
            <span>AI Insights</span>
            <span>{insights.length}</span>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          className="w-full" 
          onClick={onLogout}
        >
          Disconnect
        </Button>
      </div>
    </div>
  );
};

export default AdaptiveWorkspace;
