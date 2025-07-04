
import React, { useEffect, useState } from 'react';
import { EmotionType } from '@/hooks/useEmotionalColor';

interface AmbientBackgroundProps {
  emotion: EmotionType;
  children: React.ReactNode;
}

const AmbientBackground: React.FC<AmbientBackgroundProps> = ({ emotion, children }) => {
  const [gradientKey, setGradientKey] = useState(0);

  useEffect(() => {
    setGradientKey(prev => prev + 1);
  }, [emotion]);

  const getGradient = () => {
    switch (emotion) {
      case 'creative':
        return 'bg-gradient-to-br from-background via-background to-pink-950/20';
      case 'focused':
        return 'bg-gradient-to-br from-background via-background to-violet-950/20';
      case 'energetic':
        return 'bg-gradient-to-br from-background via-background to-amber-950/20';
      case 'calm':
        return 'bg-gradient-to-br from-background via-background to-blue-950/20';
      case 'analytical':
        return 'bg-gradient-to-br from-background via-background to-cyan-950/20';
      case 'social':
        return 'bg-gradient-to-br from-background via-background to-emerald-950/20';
      default:
        return 'bg-background';
    }
  };

  const getOverlay = () => {
    switch (emotion) {
      case 'creative':
        return 'hsla(330, 81%, 60%, 0.02)';
      case 'focused':
        return 'hsla(271, 91%, 65%, 0.02)';
      case 'energetic':
        return 'hsla(45, 93%, 47%, 0.02)';
      case 'calm':
        return 'hsla(235, 86%, 65%, 0.02)';
      case 'analytical':
        return 'hsla(188, 94%, 42%, 0.02)';
      case 'social':
        return 'hsla(142, 76%, 36%, 0.02)';
      default:
        return 'hsla(220, 13%, 18%, 0.02)';
    }
  };

  return (
    <div 
      key={gradientKey}
      className={`min-h-screen transition-all duration-1000 ease-in-out ${getGradient()}`}
      style={{
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        className="absolute inset-0 transition-all duration-1000 opacity-30"
        style={{
          background: `radial-gradient(circle at 30% 70%, ${getOverlay()} 0%, transparent 50%)`
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AmbientBackground;
