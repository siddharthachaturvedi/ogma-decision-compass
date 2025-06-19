
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import SmartInbox from '@/components/SmartInbox';
import DocDigest from '@/components/DocDigest';
import ToneAware from '@/components/ToneAware';
import MemoryKeeper from '@/components/MemoryKeeper';
import OnboardingModal from '@/components/OnboardingModal';

const Index = () => {
  const [activeView, setActiveView] = useState('inbox');
  const [showOnboarding, setShowOnboarding] = useState(true);

  const renderActiveView = () => {
    switch (activeView) {
      case 'inbox':
        return <SmartInbox />;
      case 'digest':
        return <DocDigest />;
      case 'tone':
        return <ToneAware />;
      case 'memory':
        return <MemoryKeeper />;
      default:
        return <SmartInbox />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-hidden">
        {renderActiveView()}
      </main>
      {showOnboarding && (
        <OnboardingModal onClose={() => setShowOnboarding(false)} />
      )}
    </div>
  );
};

export default Index;
