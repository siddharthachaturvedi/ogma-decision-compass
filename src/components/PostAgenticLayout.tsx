
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
      setTimeout(() => setIsThinking(false), 2000);
    }, 15000);

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
    }, 10000);

    return () => clearTimeout(insightTimer);
  }, []);

  return (
    <div className="relative min-h-screen bg-background">
      {/* Ambient thinking indicator */}
      {isThinking && (
        <div className="fixed top-4 right-4 z-50 animate-predictive-emerge">
          <div className="flex items-center space-x-2 bg-card/90 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 shadow-lg">
            <Brain className="h-4 w-4 text-primary animate-neural-pulse" />
            <span className="text-xs text-muted-foreground">Processing context...</span>
          </div>
        </div>
      )}

      {/* Contextual insights sidebar */}
      {contextualInsights.length > 0 && (
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 max-w-xs animate-predictive-emerge">
          {contextualInsights.map((insight, index) => (
            <div 
              key={index}
              className="mb-3 p-3 bg-card/80 backdrop-blur-sm border border-primary/20 rounded-lg shadow-lg"
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <div className="flex items-start space-x-2">
                <Lightbulb className="h-4 w-4 text-primary mt-0.5" />
                <p className="text-xs text-muted-foreground">{insight}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Predictive action floating button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="group relative p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-neural-pulse">
          <Zap className="h-6 w-6" />
          <div className="absolute -top-12 right-0 bg-card/90 backdrop-blur-sm border border-primary/20 rounded-lg px-3 py-1 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Quick actions based on context
          </div>
        </button>
      </div>

      {/* Main content */}
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
};

export default PostAgenticLayout;
