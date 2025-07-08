
import React, { useState, useEffect } from 'react';
import { Brain, Lightbulb, Zap } from 'lucide-react';

interface PostAgenticLayoutProps {
  children: React.ReactNode;
  userEmail?: string;
}

const PostAgenticLayout: React.FC<PostAgenticLayoutProps> = ({ children, userEmail }) => {
  const [isThinking, setIsThinking] = useState(false);
  const [contextualInsights, setContextualInsights] = useState<string[]>([]);

  // Simulate ambient intelligence
  useEffect(() => {
    const thinkingInterval = setInterval(() => {
      setIsThinking(true);
      setTimeout(() => setIsThinking(false), 3000);
    }, 20000);

    return () => clearInterval(thinkingInterval);
  }, []);

  // Simulate contextual insights appearing
  useEffect(() => {
    const insights = [
      "Your meeting pattern suggests scheduling focus time at 2 PM",
      "Similar documents from last month might be relevant",
      "Colleague Sarah mentioned this topic in yesterday's chat",
      "Energy levels typically peak in 20 minutes - good time for decisions"
    ];

    const insightTimer = setTimeout(() => {
      const randomInsight = insights[Math.floor(Math.random() * insights.length)];
      setContextualInsights(prev => [...prev.slice(-2), randomInsight]);
    }, 12000);

    return () => clearTimeout(insightTimer);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-50" />
      
      {/* Enhanced thinking indicator */}
      {isThinking && (
        <div className="fixed top-6 right-6 z-50 animate-predictive-emerge">
          <div className="flex items-center space-x-3 glass shadow-medium rounded-lg px-4 py-2.5">
            <Brain className="h-4 w-4 text-primary animate-neural-pulse" />
            <span className="text-sm font-medium text-foreground">Processing context...</span>
          </div>
        </div>
      )}

      {/* Enhanced contextual insights sidebar */}
      {contextualInsights.length > 0 && (
        <div className="fixed left-6 top-1/2 -translate-y-1/2 z-40 max-w-sm space-y-3">
          {contextualInsights.map((insight, index) => (
            <div 
              key={index}
              className="glass shadow-soft rounded-lg p-3 animate-predictive-emerge"
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className="flex items-start space-x-2">
                <div className="p-1.5 rounded-md bg-primary/5">
                  <Lightbulb className="h-3.5 w-3.5 text-primary" />
                </div>
                <p className="text-xs text-foreground leading-relaxed flex-1">{insight}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Enhanced predictive action button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="group relative p-3 gradient-primary text-primary-foreground rounded-lg shadow-medium hover:shadow-large hover:scale-105 transition-all duration-300 animate-neural-pulse">
          <Zap className="h-5 w-5" />
          <div className="absolute -top-12 right-0 glass shadow-medium rounded-md px-3 py-2 text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Quick actions based on context
          </div>
        </button>
      </div>

      {/* Main content with enhanced styling */}
      <div className="relative z-20 p-6 md:p-8 lg:p-12">
        {children}
      </div>
    </div>
  );
};

export default PostAgenticLayout;
