
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
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 flex items-center space-x-2">
          <div style={{ color: colors.primary }}>
            <Brain />
          </div>
          <KineticText variant="title" emotion="analytical">
            Intelligence Hub
          </KineticText>
        </h1>
        <KineticText variant="body" emotion="analytical" className="text-slate-600">
          Your unified context engine across all activities
        </KineticText>
      </div>
      <div className="flex space-x-2">
        <Button variant="outline" onClick={() => onNavigate('chat')}>
          <Zap size={16} className="mr-2" />
          AI Assistant
        </Button>
        <Button onClick={() => onNavigate('memory')}>
          <Eye size={16} className="mr-2" />
          Memory Keeper
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
