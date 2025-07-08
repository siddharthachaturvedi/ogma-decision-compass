
import React from 'react';
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
import { useAppContext } from '@/contexts/AppContext';
import { useNavigationEngine } from '@/hooks/useNavigationEngine';
import { useEmotionalColor } from '@/hooks/useEmotionalColor';

interface IndexProps {
  onLogout: () => void;
}

const Index: React.FC<IndexProps> = ({ onLogout }) => {
  const { state, dispatch } = useAppContext();
  const { activeView, navigateToView, getViewDescription } = useNavigationEngine();
  const { emotion } = useEmotionalColor(activeView);

  const renderActiveView = () => {
    switch (activeView) {
      case 'hub':
        return <UnifiedDashboard onNavigate={navigateToView} />;
      case 'chat':
        return <AIChat onNavigate={navigateToView} />;
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
        return <UnifiedDashboard onNavigate={navigateToView} />;
    }
  };

  return (
    <AmbientBackground emotion={emotion}>
      <div className="min-h-screen flex bg-background">
        <AdaptiveWorkspace 
          activeView={activeView} 
          onNavigate={navigateToView} 
          onLogout={onLogout} 
        />
        
        <main className="flex-1 relative min-w-0">
          <div className="h-full">
            {renderActiveView()}
          </div>
          
          <ContextualActionButton 
            currentContext={getViewDescription(activeView)}
            onNavigate={navigateToView} 
          />
        </main>

        {state.showOnboarding && (
          <OnboardingModal onClose={() => dispatch({ type: 'SET_ONBOARDING', payload: false })} />
        )}
      </div>
    </AmbientBackground>
  );
};

export default Index;
