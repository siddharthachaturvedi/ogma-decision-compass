import React from 'react';
import { useAppStore } from '@/stores/appStore';
import { Sidebar } from './components/Sidebar';
import { DashboardContent } from './components/DashboardContent';

export default function Dashboard() {
  const { sidebarCollapsed } = useAppStore();

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