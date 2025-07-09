import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onToggleMode: () => void;
  isSignUp: boolean;
}

export function LoginForm({ onToggleMode, isSignUp }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    
    // Simulate loading for demo
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success(isSignUp ? 'Account created successfully!' : 'Welcome to Project Ogma!');
    navigate('/demo');
  };

  const handleDemoAccess = () => {
    toast.success('Welcome to the Project Ogma demo!');
    navigate('/demo');
  };

  return (
    <Card className="w-full max-w-md glass shadow-2xl border-border/50">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold">
          {isSignUp ? 'Create Account' : 'Welcome Back'}
        </CardTitle>
        <CardDescription>
          {isSignUp 
            ? 'Start your journey with Project Ogma'
            : 'Sign in to continue your intelligence journey'
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register('email')}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••"
                {...register('password')}
                className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
          </div>
          
          {errors.root && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">{errors.root.message}</p>
            </div>
          )}
          
          <Button 
            type="submit" 
            className="w-full h-11"
            variant="gradient"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
            ) : (
              <>
                {isSignUp ? 'Create Account' : 'Sign In'}
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border/30" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or</span>
          </div>
        </div>
        
        <Button
          onClick={handleDemoAccess}
          variant="outline"
          className="w-full h-11"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Explore Demo
        </Button>
        
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={onToggleMode}
            className="text-muted-foreground hover:text-primary"
          >
            {isSignUp 
              ? 'Already have an account? Sign in' 
              : "Don't have an account? Sign up"
            }
          </Button>
        </div>
        
        {!isSignUp && (
          <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              <strong className="text-foreground">Demo:</strong> Click "Explore Demo" to see the full experience
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}