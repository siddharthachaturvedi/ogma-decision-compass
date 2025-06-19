
import React from 'react';
import { EmotionType, useEmotionalColor } from '@/hooks/useEmotionalColor';

interface ThinkingIndicatorProps {
  emotion?: EmotionType;
  message?: string;
}

const ThinkingIndicator: React.FC<ThinkingIndicatorProps> = ({ 
  emotion = 'neutral',
  message = 'Thinking...' 
}) => {
  const { colors } = useEmotionalColor();

  const getDotAnimation = (index: number) => ({
    animationDelay: `${index * 0.2}s`,
    backgroundColor: colors.primary
  });

  const getContainerStyle = () => ({
    background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent}20)`,
    borderLeft: `3px solid ${colors.primary}`,
    boxShadow: `0 4px 12px ${colors.glow}`
  });

  return (
    <div 
      className="flex items-center space-x-3 p-4 rounded-lg animate-thought-bubble"
      style={getContainerStyle()}
    >
      <div className="flex space-x-1">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full animate-typing-dots"
            style={getDotAnimation(index)}
          />
        ))}
      </div>
      <span 
        className="text-sm font-medium animate-pulse"
        style={{ color: colors.primary }}
      >
        {message}
      </span>
    </div>
  );
};

export default ThinkingIndicator;
