
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useContextEngine } from '@/hooks/useContextEngine';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import QuickStatsGrid from '@/components/dashboard/QuickStatsGrid';
import InsightCard from '@/components/dashboard/InsightCard';
import ContextCard from '@/components/dashboard/ContextCard';
import ConnectionsOverview from '@/components/dashboard/ConnectionsOverview';
import DomainCollaboration from '@/components/dashboard/DomainCollaboration';

interface UnifiedDashboardProps {
  onNavigate: (view: string) => void;
}

const UnifiedDashboard: React.FC<UnifiedDashboardProps> = ({ onNavigate }) => {
  const { contexts, insights, getPriorityContexts, setActiveContext } = useContextEngine();
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);

  const priorityContexts = getPriorityContexts();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <DashboardHeader onNavigate={onNavigate} />
      
      <QuickStatsGrid contexts={contexts} insights={insights} />

      <Tabs defaultValue="insights" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-card/50 border border-primary/20">
          <TabsTrigger value="insights" className="data-[state=active]:bg-primary/20">AI Insights</TabsTrigger>
          <TabsTrigger value="contexts" className="data-[state=active]:bg-primary/20">Active Contexts</TabsTrigger>
          <TabsTrigger value="collaboration" className="data-[state=active]:bg-primary/20">Domain Network</TabsTrigger>
          <TabsTrigger value="connections" className="data-[state=active]:bg-primary/20">Neural Connections</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {insights.map((insight) => (
              <InsightCard
                key={insight.id}
                insight={insight}
                isSelected={selectedInsight === insight.id}
                onClick={() => setSelectedInsight(insight.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contexts" className="space-y-4">
          <div className="space-y-3">
            {priorityContexts.map((context) => (
              <ContextCard
                key={context.id}
                context={context}
                onFocus={setActiveContext}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="collaboration" className="space-y-4">
          <DomainCollaboration />
        </TabsContent>

        <TabsContent value="connections" className="space-y-4">
          <ConnectionsOverview contexts={contexts} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UnifiedDashboard;
