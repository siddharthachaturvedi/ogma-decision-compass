import React from 'react';
import { useAppStore } from '@/stores/appStore';
import { OverviewView } from './views/OverviewView';
import { AssistantView } from './views/AssistantView';
import { InboxView } from './views/InboxView';
import { DocumentsView } from './views/DocumentsView';
import { OnboardingView } from './views/OnboardingView';

export function DashboardContent() {
  const { activeView } = useAppStore();

  const renderView = () => {
    switch (activeView) {
      case 'overview':
        return <OverviewView />;
      case 'assistant':
        return <AssistantView />;
      case 'inbox':
        return <InboxView />;
      case 'documents':
        return <DocumentsView />;
      case 'onboarding':
        return <OnboardingView />;
      default:
        return <OverviewView />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderView()}
    </div>
  );
}