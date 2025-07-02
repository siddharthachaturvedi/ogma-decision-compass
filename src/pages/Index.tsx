
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
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

interface IndexProps {
  onLogout: () => void;
}

const Index: React.FC<IndexProps> = ({ onLogout }) => {
  const [activeView, setActiveView] = useState('hub');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const { emotion } = useEmotionalColor(activeView);

  const renderActiveView = () => {
    switch (activeView) {
      case 'hub':
        return <UnifiedDashboard onNavigate={setActiveView} />;
      case 'chat':
        return <AIChat onNavigate={setActiveView} />;
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
        return <UnifiedDashboard onNavigate={setActiveView} />;
    }
  };

  return (
    <AmbientBackground emotion={emotion}>
      <div className="min-h-screen flex">
        <Sidebar activeView={activeView} setActiveView={setActiveView} onLogout={onLogout} />
        <main className="flex-1 overflow-hidden">
          {renderActiveView()}
        </main>
        {showOnboarding && (
          <OnboardingModal onClose={() => setShowOnboarding(false)} />
        )}
      </div>
    </AmbientBackground>
  );
};

export default Index;
