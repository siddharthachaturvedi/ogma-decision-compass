
import { useState, useEffect } from 'react';

export type EmotionType = 'calm' | 'focused' | 'creative' | 'analytical' | 'social' | 'energetic' | 'neutral';

interface EmotionalColorConfig {
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
}

const emotionColors: Record<EmotionType, EmotionalColorConfig> = {
  calm: {
    primary: '#6366f1',
    secondary: '#e0e7ff',
    accent: '#a5b4fc',
    glow: 'rgba(99, 102, 241, 0.3)'
  },
  focused: {
    primary: '#8b5cf6',
    secondary: '#f3e8ff',
    accent: '#c4b5fd',
    glow: 'rgba(139, 92, 246, 0.3)'
  },
  creative: {
    primary: '#ec4899',
    secondary: '#fdf2f8',
    accent: '#f9a8d4',
    glow: 'rgba(236, 72, 153, 0.3)'
  },
  analytical: {
    primary: '#06b6d4',
    secondary: '#ecfeff',
    accent: '#67e8f9',
    glow: 'rgba(6, 182, 212, 0.3)'
  },
  social: {
    primary: '#10b981',
    secondary: '#ecfdf5',
    accent: '#6ee7b7',
    glow: 'rgba(16, 185, 129, 0.3)'
  },
  energetic: {
    primary: '#f59e0b',
    secondary: '#fffbeb',
    accent: '#fbbf24',
    glow: 'rgba(245, 158, 11, 0.3)'
  },
  neutral: {
    primary: '#64748b',
    secondary: '#f8fafc',
    accent: '#94a3b8',
    glow: 'rgba(100, 116, 139, 0.3)'
  }
};

const detectEmotionFromIntent = (intent?: string): EmotionType => {
  switch (intent) {
    case 'social_media':
      return 'creative';
    case 'meeting':
      return 'focused';
    case 'document':
      return 'analytical';
    case 'communication':
      return 'social';
    case 'memory':
      return 'calm';
    case 'greeting':
      return 'energetic';
    default:
      return 'neutral';
  }
};

export const useEmotionalColor = (intent?: string) => {
  const [currentEmotion, setCurrentEmotion] = useState<EmotionType>('neutral');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const newEmotion = detectEmotionFromIntent(intent);
    if (newEmotion !== currentEmotion) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentEmotion(newEmotion);
        setTimeout(() => setIsTransitioning(false), 300);
      }, 150);
    }
  }, [intent, currentEmotion]);

  const colors = emotionColors[currentEmotion];

  return {
    emotion: currentEmotion,
    colors,
    isTransitioning,
    setEmotion: setCurrentEmotion
  };
};
