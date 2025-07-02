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
    // For now, we'll simulate authentication
    // In a real implementation, you would integrate with Supabase here
    if (email) {
      onAuthenticated(email);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Neural network background pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, hsl(var(--neural-primary) / 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, hsl(var(--neural-secondary) / 0.1) 0%, transparent 50%),
            var(--neural-network)
          `
        }}
      />
      
      {/* Floating ambient elements */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-transparent animate-ambient-float" />
      <div className="absolute bottom-40 right-20 w-24 h-24 rounded-full bg-gradient-to-tl from-accent/20 to-transparent animate-ambient-float" style={{ animationDelay: '2s' }} />
      
      <div className="relative z-10 flex min-h-screen">
        {/* Left side - Hero */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-4 mb-8">
              <div className="relative">
                <Brain className="h-12 w-12 text-primary animate-neural-pulse" />
                <div className="absolute inset-0 animate-pulse">
                  <Brain className="h-12 w-12 text-primary/30" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-predictive-emerge">
                Project Ogma
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              A <span className="text-primary font-semibold">post-agentic intelligence platform</span> that anticipates your needs, 
              connects contexts, and amplifies human wisdom across every interaction.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                { icon: Eye, title: 'Anticipatory', description: 'Surfaces insights before you ask' },
                { icon: Network, title: 'Contextual', description: 'Connects all your information streams' },
                { icon: Zap, title: 'Ambient', description: 'Intelligence woven into every interaction' },
                { icon: Sparkles, title: 'Wisdom-first', description: 'Amplifies human insight, not just data' }
              ].map((feature, index) => (
                <div 
                  key={feature.title} 
                  className="flex items-start space-x-3 animate-predictive-emerge"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <feature.icon className="h-6 w-6 text-primary mt-1 animate-neural-pulse" />
                  <div>
                    <h3 className="font-semibold text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Authentication */}
        <div className="w-full max-w-md flex items-center justify-center p-8">
          <Card className="w-full backdrop-blur-sm bg-card/90 border-primary/20 shadow-2xl animate-predictive-emerge">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{isSignUp ? 'Join Project Ogma' : 'Welcome Back'}</CardTitle>
              <CardDescription>
                {isSignUp 
                  ? 'Create your account to access post-agentic intelligence'
                  : 'Sign in to your intelligent workspace'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-primary/30 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-primary/30 focus:border-primary"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground animate-neural-pulse"
                  disabled={!email || !password}
                >
                  {isSignUp ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <Button
                  variant="link"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-muted-foreground"
                >
                  {isSignUp 
                    ? 'Already have an account? Sign in' 
                    : "Don't have an account? Sign up"
                  }
                </Button>
              </div>

              <div className="mt-4 p-4 rounded-lg bg-muted/50 border border-primary/20">
                <p className="text-xs text-muted-foreground text-center">
                  <strong>Note:</strong> Full authentication requires Supabase integration. 
                  For now, enter any email to explore the platform.
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