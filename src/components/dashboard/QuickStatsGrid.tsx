
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Clock, Lightbulb, Target } from 'lucide-react';
import { ContextItem, IntelligenceInsight } from '@/hooks/useContextEngine';

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
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      label: 'Pending Actions',
      value: pendingContexts.length,
      icon: Clock,
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      label: 'AI Insights',
      value: insights.length,
      icon: Lightbulb,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      label: 'Connections',
      value: totalConnections,
      icon: Target,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-2 ${stat.bgColor} rounded-lg`}>
                <stat.icon className={stat.iconColor} size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QuickStatsGrid;
