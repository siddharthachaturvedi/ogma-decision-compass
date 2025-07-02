import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Clock, Lightbulb, Target } from 'lucide-react';
import { ContextItem, IntelligenceInsight } from '@/types/context';

interface QuickStatsGridProps {
  contexts: ContextItem[];
  insights: IntelligenceInsight[];
}

const QuickStatsGrid: React.FC<QuickStatsGridProps> = ({ contexts, insights }) => {
  const activeContexts = contexts.filter(c => c.status === 'active');
  const pendingContexts = contexts.filter(c => c.status === 'pending');
  const totalConnections = contexts.reduce((sum, ctx) => sum + ctx.connections.length, 0);

  const stats = [
    {
      label: 'Active Contexts',
      value: activeContexts.length,
      icon: Brain,
      gradient: 'from-primary/20 to-primary/5'
    },
    {
      label: 'Pending Actions',
      value: pendingContexts.length,
      icon: Clock,
      gradient: 'from-accent/20 to-accent/5'
    },
    {
      label: 'AI Insights',
      value: insights.length,
      icon: Lightbulb,
      gradient: 'from-secondary/20 to-secondary/5'
    },
    {
      label: 'Neural Connections',
      value: totalConnections,
      icon: Target,
      gradient: 'from-muted/20 to-muted/5'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4 relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} animate-context-awareness`} />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div className="p-2 bg-primary/10 rounded-lg animate-neural-pulse">
                <stat.icon className="text-primary" size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickStatsGrid;
