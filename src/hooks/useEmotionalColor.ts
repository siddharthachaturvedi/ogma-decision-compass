
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
    primary: 'hsl(235 86% 65%)',
    secondary: 'hsl(235 86% 95%)',
    accent: 'hsl(235 86% 80%)',
    glow: 'hsla(235, 86%, 65%, 0.3)'
  },
  focused: {
    primary: 'hsl(271 91% 65%)',
    secondary: 'hsl(271 91% 95%)',
    accent: 'hsl(271 91% 80%)',
    glow: 'hsla(271, 91%, 65%, 0.3)'
  },
  creative: {
    primary: 'hsl(330 81% 60%)',
    secondary: 'hsl(330 81% 95%)',
    accent: 'hsl(330 81% 75%)',
    glow: 'hsla(330, 81%, 60%, 0.3)'
  },
  analytical: {
    primary: 'hsl(188 94% 42%)',
    secondary: 'hsl(188 94% 95%)',
    accent: 'hsl(188 94% 70%)',
    glow: 'hsla(188, 94%, 42%, 0.3)'
  },
  social: {
    primary: 'hsl(142 76% 36%)',
    secondary: 'hsl(142 76% 95%)',
    accent: 'hsl(142 76% 70%)',
    glow: 'hsla(142, 76%, 36%, 0.3)'
  },
  energetic: {
    primary: 'hsl(45 93% 47%)',
    secondary: 'hsl(45 93% 95%)',
    accent: 'hsl(45 93% 70%)',
    glow: 'hsla(45, 93%, 47%, 0.3)'
  },
  neutral: {
    primary: 'hsl(var(--primary))',
    secondary: 'hsl(var(--secondary))',
    accent: 'hsl(var(--accent))',
    glow: 'hsla(var(--primary) / 0.3)'
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
