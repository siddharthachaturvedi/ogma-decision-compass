
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brain, ArrowRight, Sparkles, Network, Zap, Eye } from 'lucide-react';

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
      <div className="absolute inset-0 gradient-hero opacity-50" />
      
      {/* Floating ambient elements with gentle animation */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-transparent animate-gentle-float" />
      <div className="absolute bottom-40 right-20 w-24 h-24 rounded-full bg-gradient-to-tl from-accent/20 to-transparent animate-gentle-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-transparent animate-gentle-float" style={{ animationDelay: '4s' }} />
      
      <div className="relative z-10 flex min-h-screen">
        {/* Enhanced Left side - Hero */}
        <div className="flex-1 flex items-center justify-center p-12">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-6 mb-12">
              <div className="relative">
                <Brain className="h-16 w-16 text-primary animate-neural-pulse" />
                <div className="absolute inset-0 animate-pulse">
                  <Brain className="h-16 w-16 text-primary/30" />
                </div>
              </div>
              <div>
                <h1 className="text-5xl md:text-7xl font-heading font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-predictive-emerge">
                  Project Ogma
                </h1>
                <p className="text-lg text-muted-foreground mt-2 font-medium">
                  Post-Agentic Intelligence Platform
                </p>
              </div>
            </div>
            
            <div className="space-y-6 mb-12">
              <p className="text-2xl md:text-3xl text-foreground leading-relaxed font-heading font-medium">
                Intelligence that <span className="text-primary font-semibold">anticipates</span> your needs, 
                <span className="text-accent font-semibold"> connects</span> contexts, and 
                <span className="text-purple-600 font-semibold"> amplifies</span> human wisdom.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Experience the next evolution of AI—seamlessly woven into every interaction, 
                predicting needs before they arise, and transforming how you work, think, and create.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {[
                { 
                  icon: Eye, 
                  title: 'Anticipatory Intelligence', 
                  description: 'Surfaces insights and solutions before you even ask',
                  color: 'text-primary'
                },
                { 
                  icon: Network, 
                  title: 'Contextual Awareness', 
                  description: 'Connects all your information streams seamlessly',
                  color: 'text-accent'
                },
                { 
                  icon: Zap, 
                  title: 'Ambient Computing', 
                  description: 'Intelligence woven into every digital interaction',
                  color: 'text-purple-600'
                },
                { 
                  icon: Sparkles, 
                  title: 'Wisdom Amplification', 
                  description: 'Enhances human insight, not just data processing',
                  color: 'text-emerald-600'
                }
              ].map((feature, index) => (
                <div 
                  key={feature.title} 
                  className="group p-6 rounded-xl glass shadow-soft hover:shadow-medium transition-all duration-300 animate-predictive-emerge border border-border/50"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br from-${feature.color.replace('text-', '')}/10 to-${feature.color.replace('text-', '')}/20 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-foreground text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social proof placeholder */}
            <div className="flex items-center space-x-8 text-muted-foreground">
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-foreground">10K+</div>
                <div className="text-sm">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-foreground">99.9%</div>
                <div className="text-sm">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-foreground">24/7</div>
                <div className="text-sm">AI Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Right side - Authentication */}
        <div className="w-full max-w-lg flex items-center justify-center p-12">
          <Card className="w-full glass shadow-large animate-predictive-emerge border-border/50">
            <CardHeader className="text-center space-y-4">
              <CardTitle className="text-3xl font-heading font-bold">
                {isSignUp ? 'Join Project Ogma' : 'Welcome Back'}
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                {isSignUp 
                  ? 'Create your account to access post-agentic intelligence and transform how you work.'
                  : 'Sign in to your intelligent workspace and continue where you left off.'
                }
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 border-border/50 focus:border-primary bg-background/50 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 border-border/50 focus:border-primary bg-background/50 backdrop-blur-sm"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-12 gradient-primary hover:scale-105 transition-all duration-300 shadow-medium font-medium"
                  disabled={!email || !password}
                >
                  {isSignUp ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="ml-2 h-5 w-5" />
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

              <div className="p-4 rounded-lg bg-muted/30 border border-border/30 backdrop-blur-sm">
                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  <strong className="text-foreground">Demo Mode:</strong> Full authentication requires Supabase integration. 
                  For now, enter any email to explore the platform and experience post-agentic intelligence.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Landing;
