
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Brain, 
  MessageCircle, 
  Mail, 
  FileText, 
  PenTool, 
  Share2, 
  Users, 
  Clock,
  Zap,
  Activity,
  Target
} from 'lucide-react';

interface AdaptiveWorkspaceProps {
  currentContext: string;
  suggestedFeatures: string[];
  onNavigate: (view: string) => void;
}

const AdaptiveWorkspace: React.FC<AdaptiveWorkspaceProps> = ({
  currentContext,
  suggestedFeatures,
  onNavigate
}) => {
  const getFeatureIcon = (feature: string) => {
    const iconMap: Record<string, any> = {
      'chat': MessageCircle,
      'inbox': Mail,
      'digest': FileText,
      'tone': PenTool,
      'social': Share2,
      'meeting': Users,
      'memory': Clock,
      'hub': Brain
    };
    return iconMap[feature] || Target;
  };

  const getFeatureLabel = (feature: string) => {
    const labelMap: Record<string, string> = {
      'chat': 'AI Assistant',
      'inbox': 'Smart Inbox',
      'digest': 'Doc Digest',
      'tone': 'ToneAware',
      'social': 'Social Personalizer',
      'meeting': 'Meeting Intelligence',
      'memory': 'Memory Keeper',
      'hub': 'Intelligence Hub'
    };
    return labelMap[feature] || feature;
  };

  return (
    <div className="w-80 glass border-r border-border h-screen flex flex-col shadow-medium">
      {/* Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2 rounded-lg gradient-primary">
            <Brain className="h-5 w-5 text-primary-foreground animate-neural-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Project Ogma</h2>
            <p className="text-xs text-muted-foreground">Adaptive Intelligence</p>
          </div>
        </div>
      </div>

      {/* Current Context */}
      <div className="p-4">
        <Card className="shadow-soft border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center space-x-2">
              <Activity className="h-4 w-4 text-primary" />
              <span>Current Context</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-xs text-muted-foreground">{currentContext}</p>
          </CardContent>
        </Card>
      </div>

      {/* Suggested Features */}
      <div className="flex-1 p-4 space-y-3">
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
          <Zap className="h-4 w-4 text-primary" />
          <span>Smart Suggestions</span>
        </h3>
        
        <div className="space-y-2">
          {suggestedFeatures.map((feature, index) => {
            const Icon = getFeatureIcon(feature);
            return (
              <Button
                key={feature}
                variant="ghost"
                className="w-full justify-start h-auto p-3 hover:shadow-soft hover:scale-[1.02] transition-all duration-200 animate-predictive-emerge"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onNavigate(feature)}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 rounded-md bg-primary/5">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-foreground">
                      {getFeatureLabel(feature)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Suggested for current context
                    </div>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-border/50">
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs hover:shadow-soft transition-all duration-200"
            onClick={() => onNavigate('hub')}
          >
            <Brain className="h-3 w-3 mr-1" />
            Hub
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs hover:shadow-soft transition-all duration-200"
            onClick={() => onNavigate('chat')}
          >
            <MessageCircle className="h-3 w-3 mr-1" />
            Chat
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdaptiveWorkspace;
