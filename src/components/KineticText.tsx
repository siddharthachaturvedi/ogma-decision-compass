
import React, { useEffect, useState } from 'react';
import { EmotionType } from '@/hooks/useEmotionalColor';

interface KineticTextProps {
  children: string;
  emotion?: EmotionType;
  variant?: 'title' | 'body' | 'subtitle';
  className?: string;
}

const KineticText: React.FC<KineticTextProps> = ({ 
  children, 
  emotion = 'neutral', 
  variant = 'body',
  className = '' 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 600);
    return () => clearTimeout(timer);
  }, [emotion, children]);

  const getEmotionalStyles = () => {
    const baseStyles = {
      transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      fontWeight: variant === 'title' ? '700' : variant === 'subtitle' ? '600' : '400'
    };

    switch (emotion) {
      case 'creative':
        return {
          ...baseStyles,
          color: '#ec4899',
          letterSpacing: '0.02em',
          transform: isAnimating ? 'translateY(-2px)' : 'translateY(0)',
          textShadow: '0 2px 8px rgba(236, 72, 153, 0.2)'
        };
      case 'focused':
        return {
          ...baseStyles,
          color: '#8b5cf6',
          letterSpacing: '0.01em',
          fontWeight: '500',
          transform: isAnimating ? 'scale(1.02)' : 'scale(1)'
        };
      case 'energetic':
        return {
          ...baseStyles,
          color: '#f59e0b',
          letterSpacing: '0.03em',
          transform: isAnimating ? 'translateY(-1px) scale(1.01)' : 'translateY(0) scale(1)',
          textShadow: '0 1px 4px rgba(245, 158, 11, 0.3)'
        };
      case 'calm':
        return {
          ...baseStyles,
          color: '#6366f1',
          letterSpacing: '0.005em',
          lineHeight: '1.6'
        };
      case 'analytical':
        return {
          ...baseStyles,
          color: '#06b6d4',
          letterSpacing: '0.01em',
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, monospace'
        };
      case 'social':
        return {
          ...baseStyles,
          color: '#10b981',
          letterSpacing: '0.02em',
          transform: isAnimating ? 'translateX(1px)' : 'translateX(0)'
        };
      default:
        return {
          ...baseStyles,
          color: '#64748b'
        };
    }
  };

  const getFontSize = () => {
    switch (variant) {
      case 'title':
        return 'text-2xl md:text-3xl';
      case 'subtitle':
        return 'text-lg md:text-xl';
      default:
        return 'text-sm md:text-base';
    }
  };

  return (
    <span 
      className={`${getFontSize()} ${className} ${isAnimating ? 'animate-message-appear' : ''}`}
      style={getEmotionalStyles()}
    >
      {children}
    </span>
  );
};

export default KineticText;
