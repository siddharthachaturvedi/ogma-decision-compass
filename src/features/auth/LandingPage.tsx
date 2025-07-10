import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { Brain, Sparkles, Network, Zap, Eye, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleExploreDemo = () => {
    navigate('/demo');
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Refined background with subtle gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-background to-neural-50/20" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-primary-100/20 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-neural-100/15 to-transparent blur-3xl" />
      </div>
      
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="container-adaptive py-6 lg:py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Brain className="h-8 w-8 text-primary-600 animate-intelligence-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse" />
              </div>
              <div>
                <span className="text-xl font-semibold text-foreground tracking-tight">Project Ogma</span>
                <div className="text-xs text-muted-foreground font-mono">Post-Agentic AI</div>
              </div>
            </div>
            
            <Button
              onClick={handleExploreDemo}
              variant="outline"
              className="hidden sm:flex items-center space-x-2 transition-smooth hover:shadow-soft"
            >
              <Sparkles className="h-4 w-4" />
              <span>Explore Demo</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="container-adaptive">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center min-h-[calc(100vh-200px)]">
            {/* Left side - Hero Content */}
            <div className="lg:col-span-7 space-y-8 lg:space-y-12">
              <div className="space-y-6 lg:space-y-8">
                <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 rounded-full px-4 py-2 text-sm font-medium border border-primary-100">
                  <Sparkles className="h-4 w-4" />
                  <span>Next-Generation Intelligence Platform</span>
                </div>
                
                <div className="space-y-4">
                  <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-medium text-foreground leading-[0.95] tracking-tight">
                    Intelligence that
                    <span className="block gradient-text">anticipates</span>
                    your needs
                  </h1>
                  
                  <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl font-light">
                    Experience the next evolution of AI—seamlessly woven into every interaction, 
                    predicting needs before they arise, and transforming how you work.
                  </p>
                </div>
              </div>
              
              {/* Feature highlights - Responsive Grid */}
              <div className="grid sm:grid-cols-2 gap-4 lg:gap-6">
                {[
                  { 
                    icon: Eye, 
                    title: 'Anticipatory Intelligence', 
                    description: 'Surfaces insights before you ask, learning from patterns in your workflow',
                  },
                  { 
                    icon: Network, 
                    title: 'Contextual Awareness', 
                    description: 'Connects all information streams across your digital ecosystem',
                  },
                  { 
                    icon: Zap, 
                    title: 'Ambient Processing', 
                    description: 'Intelligence woven into every interaction, invisible yet powerful',
                  },
                  { 
                    icon: Shield, 
                    title: 'Privacy-First Design', 
                    description: 'Advanced AI processing with uncompromising data protection',
                  }
                ].map((feature, index) => (
                  <div 
                    key={feature.title} 
                    className="group p-6 rounded-2xl glass hover:shadow-medium transition-smooth border border-border/50 hover:border-primary-200/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-smooth">
                        <feature.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground mb-2 text-base lg:text-lg">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social proof - Responsive Layout */}
              <div className="flex flex-wrap items-center gap-8 lg:gap-12 pt-8">
                {[
                  { value: '10K+', label: 'Active Users' },
                  { value: '99.9%', label: 'Uptime' },
                  { value: '24/7', label: 'AI Support' }
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-foreground font-mono">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side - Authentication */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="w-full max-w-md">
                <LoginForm 
                  onToggleMode={() => setIsSignUp(!isSignUp)}
                  isSignUp={isSignUp}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="container-adaptive py-8 border-t border-border/30 mt-16">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Brain className="h-4 w-4" />
              <span>© 2025 Project Ogma. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary-600 transition-smooth">Privacy</a>
              <a href="#" className="hover:text-primary-600 transition-smooth">Terms</a>
              <a href="#" className="hover:text-primary-600 transition-smooth">Support</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}