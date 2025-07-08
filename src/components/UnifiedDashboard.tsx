
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useContextEngine } from '@/hooks/useContextEngine';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import QuickStatsGrid from '@/components/dashboard/QuickStatsGrid';
import InsightCard from '@/components/dashboard/InsightCard';
import ContextCard from '@/components/dashboard/ContextCard';
import ConnectionsOverview from '@/components/dashboard/ConnectionsOverview';
import DomainCollaboration from '@/components/dashboard/DomainCollaboration';
import { Brain, Lightbulb, Network, Activity } from 'lucide-react';

interface UnifiedDashboardProps {
  onNavigate: (view: string) => void;
}

const UnifiedDashboard: React.FC<UnifiedDashboardProps> = ({ onNavigate }) => {
  const { contexts, insights, getPriorityContexts, setActiveContext } = useContextEngine();
  const [selectedInsight, setSelectedInsight] = useState<string | null>(null);

  const priorityContexts = getPriorityContexts();

  return (
    <div className="flex-1 overflow-auto">
      {/* Mobile-first header with responsive spacing */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <DashboardHeader onNavigate={onNavigate} />

        {/* Responsive stats grid */}
        <div className="mb-6 lg:mb-8">
          <QuickStatsGrid contexts={contexts} insights={insights} />
        </div>

        {/* Enhanced responsive tabs */}
        <Tabs defaultValue="insights" className="space-y-6">
          <div className="border-b border-border/50">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 bg-card/50 border border-border/20 rounded-lg p-1">
              <TabsTrigger 
                value="insights" 
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium text-sm flex items-center space-x-2"
              >
                <Lightbulb className="h-4 w-4" />
                <span className="hidden sm:inline">AI Insights</span>
                <span className="sm:hidden">Insights</span>
              </TabsTrigger>
              <TabsTrigger 
                value="contexts" 
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium text-sm flex items-center space-x-2"
              >
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">Active Contexts</span>
                <span className="sm:hidden">Contexts</span>
              </TabsTrigger>
              <TabsTrigger 
                value="collaboration" 
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium text-sm flex items-center space-x-2"
              >
                <Network className="h-4 w-4" />
                <span className="hidden sm:inline">Domain Network</span>
                <span className="sm:hidden">Network</span>
              </TabsTrigger>
              <TabsTrigger 
                value="connections" 
                className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium text-sm flex items-center space-x-2"
              >
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline">Neural Connections</span>
                <span className="sm:hidden">Neural</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="insights" className="space-y-4 mt-6">
            {insights.length > 0 ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 lg:gap-6">
                {insights.map((insight) => (
                  <InsightCard
                    key={insight.id}
                    insight={insight}
                    isSelected={selectedInsight === insight.id}
                    onClick={() => setSelectedInsight(insight.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Insights Yet</h3>
                <p className="text-muted-foreground mb-6">AI insights will appear as you interact with the platform</p>
                <Button onClick={() => onNavigate('chat')} variant="outline">
                  Start with AI Assistant
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="contexts" className="space-y-4 mt-6">
            {priorityContexts.length > 0 ? (
              <div className="space-y-3">
                {priorityContexts.map((context) => (
                  <ContextCard
                    key={context.id}
                    context={context}
                    onFocus={setActiveContext}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Active Contexts</h3>
                <p className="text-muted-foreground mb-6">Contexts will be created as you use different features</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => onNavigate('chat')} variant="outline">
                    Chat with AI
                  </Button>
                  <Button onClick={() => onNavigate('digest')} variant="outline">
                    Process Documents
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="collaboration" className="space-y-4 mt-6">
            <DomainCollaboration />
          </TabsContent>

          <TabsContent value="connections" className="space-y-4 mt-6">
            <ConnectionsOverview contexts={contexts} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UnifiedDashboard;
