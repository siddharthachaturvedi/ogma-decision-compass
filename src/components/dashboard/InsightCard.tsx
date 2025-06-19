import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Lightbulb, AlertTriangle, Target, Brain } from 'lucide-react';
import { IntelligenceInsight } from '@/types/context';

interface InsightCardProps {
  insight: IntelligenceInsight;
  isSelected: boolean;
  onClick: () => void;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight, isSelected, onClick }) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'pattern': return <TrendingUp size={16} />;
      case 'suggestion': return <Lightbulb size={16} />;
      case 'warning': return <AlertTriangle size={16} />;
      case 'opportunity': return <Target size={16} />;
      default: return <Brain size={16} />;
    }
  };

  const getInsightColors = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-red-100 text-red-600';
      case 'opportunity': return 'bg-green-100 text-green-600';
      case 'suggestion': return 'bg-blue-100 text-blue-600';
      default: return 'bg-purple-100 text-purple-600';
    }
  };

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-lg ${getInsightColors(insight.type)}`}>
            {getInsightIcon(insight.type)}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-slate-900">{insight.title}</h3>
              <Badge variant={insight.confidence > 0.8 ? "default" : "secondary"}>
                {Math.round(insight.confidence * 100)}% confident
              </Badge>
            </div>
            <p className="text-sm text-slate-600 mb-3">{insight.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-500">
                {insight.relatedItems.length} related items
              </span>
              {insight.actionable && (
                <Button size="sm" variant="outline">
                  Take Action
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
