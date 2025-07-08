import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Target,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { useAppContext } from '@/contexts/AppContext';
import { useNavigationEngine } from '@/hooks/useNavigationEngine';

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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { state } = useAppContext();
  const { getViewDescription, getSuggestedViews } = useNavigationEngine();

  const menuItems = [
    { id: 'hub', label: 'Intelligence Hub', icon: Brain, color: 'text-primary' },
    { id: 'chat', label: 'AI Assistant', icon: MessageCircle, color: 'text-primary' },
    { id: 'inbox', label: 'Smart Inbox', icon: Mail, color: 'text-muted-foreground' },
    { id: 'digest', label: 'Doc Digest', icon: FileText, color: 'text-muted-foreground' },
    { id: 'tone', label: 'ToneAware', icon: PenTool, color: 'text-muted-foreground' },
    { id: 'social', label: 'Social Personalizer', icon: Share2, color: 'text-muted-foreground' },
    { id: 'meeting', label: 'Meeting Intelligence', icon: Users, color: 'text-muted-foreground' },
    { id: 'memory', label: 'Memory Keeper', icon: Clock, color: 'text-muted-foreground' },
  ];

  const suggestedFeatures = getSuggestedViews(activeView);
  const currentContext = getViewDescription(activeView);

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

  const handleNavigation = (view: string) => {
    onNavigate(view);
    setIsMobileOpen(false);
  };

  // Mobile overlay
  if (isMobileOpen) {
    return (
      <div className="fixed inset-0 z-50 lg:hidden">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setIsMobileOpen(false)} />
        <div className="relative h-full w-80 bg-background border-r border-border shadow-large">
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg gradient-primary">
                  <Brain className="h-5 w-5 text-primary-foreground animate-neural-pulse" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Project Ogma</h2>
                  <p className="text-xs text-muted-foreground">Adaptive Intelligence</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-4 space-y-6">
            {/* Navigation */}
            <div className="space-y-2">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeView === item.id ? "secondary" : "ghost"}
                  className={`w-full justify-start h-11 transition-all duration-200 ${
                    activeView === item.id 
                      ? "shadow-soft bg-secondary/80" 
                      : "hover:shadow-soft hover:bg-secondary/40"
                  }`}
                  onClick={() => handleNavigation(item.id)}
                >
                  <div className={`p-1.5 rounded-md mr-3 ${
                    activeView === item.id 
                      ? 'bg-primary/10' 
                      : 'bg-transparent'
                  }`}>
                    <item.icon className={`h-4 w-4 ${item.color}`} />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                  {activeView === item.id && <ChevronRight className="ml-auto h-4 w-4" />}
                </Button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-border/50">
              <Button 
                variant="outline" 
                className="w-full justify-center border-border hover:bg-destructive/5 hover:border-destructive/30 hover:text-destructive transition-all duration-200" 
                onClick={onLogout}
              >
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-40 lg:hidden h-10 w-10 p-0 glass shadow-medium"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Desktop sidebar */}
      <div className={`hidden lg:flex flex-col h-screen glass border-r border-border shadow-medium transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-80'
      }`}>
        {/* Header */}
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="p-2 rounded-lg gradient-primary">
                <Brain className="h-5 w-5 text-primary-foreground animate-neural-pulse" />
              </div>
              {!isCollapsed && (
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Project Ogma</h2>
                  <p className="text-xs text-muted-foreground">Adaptive Intelligence</p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8 p-0"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Current Context with real data */}
        {!isCollapsed && (
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
                <div className="mt-2 text-xs text-primary">
                  {state.contexts.length} active contexts • {state.insights.length} insights
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Navigation */}
        <div className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeView === item.id ? "secondary" : "ghost"}
              className={`w-full ${isCollapsed ? 'justify-center p-0 h-12 w-12' : 'justify-start h-11'} transition-all duration-200 ${
                activeView === item.id 
                  ? "shadow-soft bg-secondary/80" 
                  : "hover:shadow-soft hover:bg-secondary/40"
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <div className={`p-1.5 rounded-md ${isCollapsed ? '' : 'mr-3'} ${
                activeView === item.id 
                  ? 'bg-primary/10' 
                  : 'bg-transparent'
              }`}>
                <item.icon className={`h-4 w-4 ${item.color}`} />
              </div>
              {!isCollapsed && (
                <>
                  <span className="text-sm font-medium">{item.label}</span>
                  {activeView === item.id && <ChevronRight className="ml-auto h-4 w-4" />}
                </>
              )}
            </Button>
          ))}
        </div>

        {/* Intelligent Suggestions based on real behavior */}
        {!isCollapsed && (
          <div className="p-4 space-y-3">
            <h3 className="text-sm font-medium text-foreground flex items-center space-x-2">
              <Zap className="h-4 w-4 text-primary" />
              <span>Smart Suggestions</span>
            </h3>
            
            <div className="space-y-2">
              {suggestedFeatures.slice(0, 2).map((feature, index) => {
                const Icon = getFeatureIcon(feature);
                return (
                  <Button
                    key={feature}
                    variant="ghost"
                    className="w-full justify-start h-auto p-3 hover:shadow-soft hover:scale-[1.01] transition-all duration-200 animate-predictive-emerge"
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
                          Based on your patterns
                        </div>
                      </div>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-border/50">
          <Button 
            variant="outline" 
            className={`w-full justify-center border-border hover:bg-destructive/5 hover:border-destructive/30 hover:text-destructive transition-all duration-200 ${
              isCollapsed ? 'p-0 h-10 w-10' : ''
            }`}
            onClick={onLogout}
          >
            {isCollapsed ? <X className="h-4 w-4" /> : 'Disconnect'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdaptiveWorkspace;
