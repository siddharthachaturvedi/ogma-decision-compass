import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { Brain, Sparkles, Network, Zap, Eye, Shield } from 'lucide-react';

export default function LandingPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced background with subtle gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/8" />
      
      {/* Floating ambient elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/10 animate-neural-pulse" />
      <div className="absolute bottom-32 right-16 w-16 h-16 rounded-full bg-accent/20 animate-gentle-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-12 h-12 rounded-full bg-muted/30 animate-context-awareness" style={{ animationDelay: '4s' }} />
      <div className="absolute top-1/3 right-1/3 w-8 h-8 rounded-full bg-primary/15 animate-neural-pulse" style={{ animationDelay: '6s' }} />
      
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Brain className="h-8 w-8 text-primary animate-neural-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div>
                <span className="text-xl font-bold text-foreground">Project Ogma</span>
                <div className="text-xs text-muted-foreground">Post-Agentic AI</div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
            {/* Left side - Hero Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-muted/50 rounded-full px-4 py-2 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4" />
                  <span>Next-Generation Intelligence Platform</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight tracking-tight">
                  Intelligence that
                  <span className="block text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">anticipates</span>
                  your needs
                </h1>
                
                <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  Experience the next evolution of AI—seamlessly woven into every interaction, 
                  predicting needs before they arise, and transforming how you work.
                </p>
              </div>
              
              {/* Feature highlights */}
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { 
                    icon: Eye, 
                    title: 'Anticipatory', 
                    description: 'Surfaces insights before you ask',
                  },
                  { 
                    icon: Network, 
                    title: 'Contextual', 
                    description: 'Connects all information streams',
                  },
                  { 
                    icon: Zap, 
                    title: 'Ambient', 
                    description: 'Intelligence in every interaction',
                  },
                  { 
                    icon: Shield, 
                    title: 'Secure', 
                    description: 'Privacy-first AI processing',
                  }
                ].map((feature, index) => (
                  <div 
                    key={feature.title} 
                    className="flex items-start space-x-4 p-6 rounded-xl glass shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50 hover:border-primary/30 hover:scale-[1.02]"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="p-3 rounded-xl bg-primary/10 animate-gentle-float" style={{ animationDelay: `${index * 0.5}s` }}>
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-2 text-lg">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="flex items-center space-x-12 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">24/7</div>
                  <div className="text-sm text-muted-foreground">AI Support</div>
                </div>
              </div>
            </div>

            {/* Right side - Authentication */}
            <div className="flex justify-center lg:justify-end">
              <LoginForm 
                onToggleMode={() => setIsSignUp(!isSignUp)}
                isSignUp={isSignUp}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="container mx-auto px-4 py-6 border-t border-border/30">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Brain className="h-4 w-4" />
              <span>© 2025 Project Ogma. All rights reserved.</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}