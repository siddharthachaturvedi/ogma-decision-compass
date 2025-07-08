
import React, { useState } from 'react';
import AdaptiveWorkspace from '@/components/AdaptiveWorkspace';
import ContextualActionButton from '@/components/ContextualActionButton';
import SmartInbox from '@/components/SmartInbox';
import DocDigest from '@/components/DocDigest';
import ToneAware from '@/components/ToneAware';
import MemoryKeeper from '@/components/MemoryKeeper';
import SocialPersonalizer from '@/components/SocialPersonalizer';
import MeetingIntelligence from '@/components/MeetingIntelligence';
import AIChat from '@/components/AIChat';
import UnifiedDashboard from '@/components/UnifiedDashboard';
import OnboardingModal from '@/components/OnboardingModal';
import AmbientBackground from '@/components/AmbientBackground';
import { useEmotionalColor } from '@/hooks/useEmotionalColor';
import { useAmbientIntelligence } from '@/hooks/useAmbientIntelligence';

interface IndexProps {
  onLogout: () => void;
}

const Index: React.FC<IndexProps> = ({ onLogout }) => {
  const [activeView, setActiveView] = useState('hub');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const { emotion } = useEmotionalColor(activeView);
  const { observePattern } = useAmbientIntelligence();

  const handleNavigation = (view: string) => {
    observePattern('workflow', `navigate-${activeView}-to-${view}`);
    setActiveView(view);
  };

  const getContextDescription = (view: string): string => {
    const contexts: Record<string, string> = {
      'hub': 'Analyzing cross-platform patterns and connections',
      'chat': 'AI conversation context and learning patterns',
      'inbox': 'Email analysis and communication insights',
      'digest': 'Document processing and knowledge extraction',
      'tone': 'Communication style analysis and optimization',
      'social': 'Social dynamics and relationship mapping',
      'meeting': 'Meeting context and collaboration insights',
      'memory': 'Knowledge retention and contextual memory'
    };
    return contexts[view] || 'Processing current context';
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'hub':
        return <UnifiedDashboard onNavigate={handleNavigation} />;
      case 'chat':
        return <AIChat onNavigate={handleNavigation} />;
      case 'inbox':
        return <SmartInbox />;
      case 'digest':
        return <DocDigest />;
      case 'tone':
        return <ToneAware />;
      case 'social':
        return <SocialPersonalizer />;
      case 'meeting':
        return <MeetingIntelligence />;
      case 'memory':
        return <MemoryKeeper />;
      default:
        return <UnifiedDashboard onNavigate={handleNavigation} />;
    }
  };

  return (
    <AmbientBackground emotion={emotion}>
      <div className="min-h-screen flex bg-background">
        <AdaptiveWorkspace 
          activeView={activeView} 
          onNavigate={handleNavigation} 
          onLogout={onLogout} 
        />
        
        <main className="flex-1 relative min-w-0">
          <div className="h-full">
            {renderActiveView()}
          </div>
          
          <ContextualActionButton 
            currentContext={getContextDescription(activeView)}
            onNavigate={handleNavigation} 
          />
        </main>

        {showOnboarding && (
          <OnboardingModal onClose={() => setShowOnboarding(false)} />
        )}
      </div>
    </AmbientBackground>
  );
};

export default Index;
