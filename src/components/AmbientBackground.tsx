
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
        return 'bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50';
      case 'focused':
        return 'bg-gradient-to-br from-violet-50 via-blue-50 to-indigo-50';
      case 'energetic':
        return 'bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50';
      case 'calm':
        return 'bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50';
      case 'analytical':
        return 'bg-gradient-to-br from-cyan-50 via-teal-50 to-blue-50';
      case 'social':
        return 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50';
      default:
        return 'bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50';
    }
  };

  const getOverlay = () => {
    switch (emotion) {
      case 'creative':
        return 'rgba(236, 72, 153, 0.02)';
      case 'focused':
        return 'rgba(139, 92, 246, 0.02)';
      case 'energetic':
        return 'rgba(245, 158, 11, 0.02)';
      case 'calm':
        return 'rgba(99, 102, 241, 0.02)';
      case 'analytical':
        return 'rgba(6, 182, 212, 0.02)';
      case 'social':
        return 'rgba(16, 185, 129, 0.02)';
      default:
        return 'rgba(100, 116, 139, 0.02)';
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
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${getOverlay()} 0%, transparent 50%)`,
          animation: 'breathe 8s ease-in-out infinite'
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AmbientBackground;
