import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/appStore';
import { 
  Brain, 
  MessageCircle, 
  FileText, 
  Mail, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Play,
  BookOpen,
  Target
} from 'lucide-react';

export function OnboardingView() {
  const [currentStep, setCurrentStep] = useState(0);
  const { setActiveView } = useAppStore();

  const steps = [
    {
      id: 'welcome',
      title: 'Welcome to Project Ogma',
      description: 'Your post-agentic AI intelligence platform that anticipates your needs and amplifies your productivity.',
      icon: Brain,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50'
    },
    {
      id: 'assistant',
      title: 'Meet Your AI Assistant',
      description: 'Ask questions, get insights, and receive intelligent suggestions based on your data and context.',
      icon: MessageCircle,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      action: () => setActiveView('assistant'),
      actionLabel: 'Try AI Assistant'
    },
    {
      id: 'documents',
      title: 'Process Documents Intelligently',
      description: 'Upload documents to extract insights, summaries, and actionable information automatically.',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      action: () => setActiveView('documents'),
      actionLabel: 'Upload Document'
    },
    {
      id: 'inbox',
      title: 'Smart Communication Hub',
      description: 'Prioritize emails and messages with AI-powered insights and suggested actions.',
      icon: Mail,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      action: () => setActiveView('inbox'),
      actionLabel: 'Check Inbox'
    }
  ];

  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setActiveView('overview');
    }
  };

  const handleSkip = () => {
    setActiveView('overview');
  };

  const handleTryFeature = () => {
    if (currentStepData.action) {
      currentStepData.action();
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-muted-foreground">
              Getting Started ({currentStep + 1} of {steps.length})
            </h2>
            <Button variant="ghost" size="sm" onClick={handleSkip}>
              Skip tour
            </Button>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Main Content */}
        <Card className="border-border/50 shadow-strong">
          <CardContent className="p-12">
            <div className="text-center space-y-8">
              {/* Icon */}
              <div className="relative">
                <div className={`w-20 h-20 mx-auto rounded-2xl ${currentStepData.bgColor} flex items-center justify-center`}>
                  <currentStepData.icon className={`h-10 w-10 ${currentStepData.color}`} />
                </div>
                {currentStep === 0 && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <Sparkles className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="space-y-4 max-w-2xl mx-auto">
                <h1 className="text-3xl font-semibold text-foreground tracking-tight">
                  {currentStepData.title}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {currentStepData.description}
                </p>
              </div>

              {/* Feature Highlights for Welcome Step */}
              {currentStep === 0 && (
                <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  {[
                    {
                      icon: Target,
                      title: 'Anticipatory Intelligence',
                      description: 'AI that predicts your needs before you ask'
                    },
                    {
                      icon: Brain,
                      title: 'Contextual Awareness',
                      description: 'Connects information across your workflow'
                    },
                    {
                      icon: Sparkles,
                      title: 'Seamless Integration',
                      description: 'Works invisibly in the background'
                    }
                  ].map((feature, index) => (
                    <div key={index} className="p-6 rounded-xl bg-muted/30 border border-border/30">
                      <feature.icon className="h-8 w-8 mx-auto text-primary-600 mb-3" />
                      <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Demo Preview for Feature Steps */}
              {currentStep > 0 && (
                <div className="max-w-2xl mx-auto">
                  <div className="p-6 rounded-xl bg-muted/20 border border-border/30">
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <Play className="h-5 w-5 text-primary-600" />
                      <span className="text-sm font-medium text-foreground">Interactive Demo Available</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Try this feature now to see how it works with your data
                    </p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-center space-x-4 pt-4">
                {currentStepData.action && (
                  <Button onClick={handleTryFeature} variant="outline" className="px-6">
                    <Play className="h-4 w-4 mr-2" />
                    {currentStepData.actionLabel}
                  </Button>
                )}
                <Button onClick={handleNext} className="px-8">
                  {currentStep === steps.length - 1 ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Get Started
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>

              {/* Step Indicators */}
              <div className="flex items-center justify-center space-x-2 pt-6">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentStep(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentStep 
                        ? 'bg-primary-600 scale-110' 
                        : index < currentStep
                        ? 'bg-success'
                        : 'bg-muted hover:bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
            <button className="hover:text-primary-600 transition-smooth flex items-center space-x-1">
              <BookOpen className="h-4 w-4" />
              <span>Documentation</span>
            </button>
            <button className="hover:text-primary-600 transition-smooth flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>Get Help</span>
            </button>
            <button 
              onClick={() => setActiveView('overview')}
              className="hover:text-primary-600 transition-smooth flex items-center space-x-1"
            >
              <Target className="h-4 w-4" />
              <span>Go to Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}