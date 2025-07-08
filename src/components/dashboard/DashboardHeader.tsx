
import React from 'react';
import { Button } from '@/components/ui/button';
import { Brain, Zap, Eye } from 'lucide-react';
import { useEmotionalColor } from '@/hooks/useEmotionalColor';
import KineticText from '@/components/KineticText';

interface DashboardHeaderProps {
  onNavigate: (view: string) => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onNavigate }) => {
  const { colors } = useEmotionalColor('analytical');

  return (
    <div className="mb-8">
      {/* Main header with responsive layout */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 lg:gap-4">
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div 
              className="p-2 rounded-lg gradient-primary animate-neural-pulse"
              style={{ color: colors.primary }}
            >
              <Brain className="h-6 w-6 lg:h-7 lg:w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                <KineticText variant="title" emotion="analytical">
                  Intelligence Hub
                </KineticText>
              </h1>
              <KineticText variant="body" emotion="analytical" className="text-sm lg:text-base text-muted-foreground">
                Your unified context engine across all activities
              </KineticText>
            </div>
          </div>
        </div>
        
        {/* Action buttons with responsive layout */}
        <div className="flex flex-col sm:flex-row gap-3 lg:gap-2">
          <Button 
            variant="outline" 
            onClick={() => onNavigate('chat')}
            className="flex items-center justify-center lg:justify-start space-x-2 h-11 shadow-soft hover:shadow-medium transition-all duration-200"
          >
            <Zap className="h-4 w-4" />
            <span>AI Assistant</span>
          </Button>
          <Button 
            onClick={() => onNavigate('memory')}
            className="flex items-center justify-center lg:justify-start space-x-2 h-11 gradient-primary hover:scale-[1.02] transition-all duration-300 shadow-medium"
          >
            <Eye className="h-4 w-4" />
            <span>Memory Keeper</span>
          </Button>
        </div>
      </div>
      
      {/* Enhanced context indicator */}
      <div className="mt-6 p-4 rounded-lg glass border border-border/50 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-foreground">System Status: Active</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>Neural processing enabled</span>
            <div className="h-1 w-1 rounded-full bg-muted-foreground" />
            <span>Context awareness: High</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
