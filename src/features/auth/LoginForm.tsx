import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Eye, EyeOff, Sparkles, Loader2 } from 'lucide-react';
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
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    
    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success(isSignUp ? 'Account created successfully!' : 'Welcome to Project Ogma!');
    navigate('/demo');
  };

  const handleDemoAccess = () => {
    toast.success('Welcome to the Project Ogma demo!');
    navigate('/demo');
  };

  return (
    <Card className="w-full glass shadow-strong border-border/50 backdrop-blur-xl">
      <CardHeader className="text-center space-y-3 pb-6">
        <CardTitle className="text-2xl font-semibold tracking-tight">
          {isSignUp ? 'Join Project Ogma' : 'Welcome Back'}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {isSignUp 
            ? 'Experience the future of AI assistance'
            : 'Continue your intelligent workflow'
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-foreground">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register('email')}
              className={`transition-smooth ${errors.email ? 'border-destructive focus:border-destructive' : 'focus:border-primary-500'}`}
            />
            {errors.email && (
              <p className="text-sm text-destructive animate-fade-in">{errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-foreground">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••"
                {...register('password')}
                className={`pr-12 transition-smooth ${errors.password ? 'border-destructive focus:border-destructive' : 'focus:border-primary-500'}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth focus-ring rounded-md p-1"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-destructive animate-fade-in">{errors.password.message}</p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 bg-primary-600 hover:bg-primary-700 text-primary-foreground shadow-medium hover:shadow-strong transition-smooth"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
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
            <span className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-3 text-muted-foreground font-medium">Or</span>
          </div>
        </div>
        
        <Button
          onClick={handleDemoAccess}
          variant="outline"
          className="w-full h-12 border-primary-200 bg-primary-50/30 hover:bg-primary-50 text-primary-700 hover:text-primary-800 transition-smooth"
        >
          <Sparkles className="mr-2 h-4 w-4 text-primary-600" />
          <span>Try Demo</span>
        </Button>
        
        <div className="text-center pt-2">
          <Button
            variant="ghost"
            onClick={onToggleMode}
            className="text-muted-foreground hover:text-primary-600 transition-smooth"
          >
            {isSignUp 
              ? 'Already have an account? Sign in' 
              : "Don't have an account? Sign up"
            }
          </Button>
        </div>
        
        {!isSignUp && (
          <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
            <p className="text-xs text-center leading-relaxed">
              <span className="text-primary-700 font-medium">Try the demo</span>
              <span className="text-muted-foreground"> to experience AI that anticipates your needs</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}