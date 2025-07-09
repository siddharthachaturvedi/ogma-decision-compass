import React from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useAppStore } from '@/stores/appStore';
import { Sidebar } from './components/Sidebar';
import { DashboardContent } from './components/DashboardContent';
import { Brain } from 'lucide-react';

export default function Dashboard() {
  const user = useAuthStore(state => state.user);
  const { sidebarCollapsed } = useAppStore();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-muted-foreground">Loading your intelligence workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <main className={`flex-1 transition-all duration-300 ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <DashboardContent />
      </main>
    </div>
  );
}