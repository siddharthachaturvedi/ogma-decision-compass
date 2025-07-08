
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brain, ArrowRight, Sparkles, Network, Zap, Eye, Shield, Rocket } from 'lucide-react';

interface LandingProps {
  onAuthenticated: (userEmail: string) => void;
}

const Landing: React.FC<LandingProps> = ({ onAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onAuthenticated(email);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced background with subtle gradients */}
      <div className="absolute inset-0 gradient-hero opacity-30" />
      
      {/* Floating ambient elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/10 animate-gentle-float" />
      <div className="absolute bottom-32 right-16 w-16 h-16 rounded-full bg-accent/20 animate-gentle-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-12 h-12 rounded-full bg-muted/30 animate-gentle-float" style={{ animationDelay: '4s' }} />
      
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Brain className="h-8 w-8 text-primary animate-neural-pulse" />
              </div>
              <span className="text-xl font-semibold text-foreground">Project Ogma</span>
            </div>
            <Button variant="ghost" className="text-sm">
              Learn More
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
            {/* Left side - Hero Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-muted/50 rounded-full px-4 py-2 text-sm text-muted-foreground">
                  <Sparkles className="h-4 w-4" />
                  <span>Post-Agentic Intelligence Platform</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                  Intelligence that
                  <span className="block text-primary">anticipates</span>
                  your needs
                </h1>
                
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
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
                    className="flex items-start space-x-3 p-4 rounded-lg glass shadow-soft hover:shadow-medium transition-all duration-300 animate-predictive-emerge border border-border/50"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="p-2 rounded-md bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social proof */}
              <div className="flex items-center space-x-8 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">24/7</div>
                  <div className="text-sm text-muted-foreground">AI Support</div>
                </div>
              </div>
            </div>

            {/* Right side - Authentication */}
            <div className="flex justify-center lg:justify-end">
              <Card className="w-full max-w-md glass shadow-large border-border/50 animate-predictive-emerge">
                <CardHeader className="text-center space-y-2">
                  <CardTitle className="text-2xl font-bold">
                    {isSignUp ? 'Get Started' : 'Welcome Back'}
                  </CardTitle>
                  <CardDescription>
                    {isSignUp 
                      ? 'Create your account to access intelligent workspace'
                      : 'Sign in to continue your journey'
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-11 border-border/50 focus:border-primary bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="h-11 border-border/50 focus:border-primary bg-background/50"
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full h-11 gradient-primary hover:scale-[1.02] transition-all duration-300 shadow-medium font-medium"
                      disabled={!email || !password}
                    >
                      {isSignUp ? 'Create Account' : 'Sign In'}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                  
                  <div className="text-center">
                    <Button
                      variant="ghost"
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {isSignUp 
                        ? 'Already have an account? Sign in' 
                        : "Don't have an account? Sign up"
                      }
                    </Button>
                  </div>

                  <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
                    <p className="text-xs text-muted-foreground text-center leading-relaxed">
                      <strong className="text-foreground">Demo:</strong> Enter any email to explore the platform
                    </p>
                  </div>
                </CardContent>
              </Card>
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
};

export default Landing;
