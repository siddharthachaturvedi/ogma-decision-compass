
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Mail, 
  FileText, 
  MessageSquare, 
  ChevronRight,
  Check,
  Cloud,
  Shield
} from 'lucide-react';

interface OnboardingModalProps {
  onClose: () => void;
}

const OnboardingModal = ({ onClose }: OnboardingModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPersona, setSelectedPersona] = useState('');
  const [emailConnected, setEmailConnected] = useState(false);
  const [storageConnected, setStorageConnected] = useState(false);

  const personas = [
    { id: 'exec', label: 'Executive', description: 'C-level, VP roles' },
    { id: 'chief-of-staff', label: 'Chief of Staff', description: 'Strategic support roles' },
    { id: 'pm', label: 'Product Manager', description: 'Product & project leads' }
  ];

  const steps = [
    {
      title: 'Choose Your Role',
      description: 'Help us tailor your experience',
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 mb-6">Select the role that best describes you:</p>
          <div className="space-y-3">
            {personas.map((persona) => (
              <button
                key={persona.id}
                onClick={() => setSelectedPersona(persona.id)}
                className={`w-full p-4 rounded-lg border text-left transition-colors ${
                  selectedPersona === persona.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="font-medium text-slate-900">{persona.label}</div>
                <div className="text-sm text-slate-600">{persona.description}</div>
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Connect Your Email',
      description: 'Access your inbox for smart processing',
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 mb-6">Connect your email to get started with Smart Inbox:</p>
          <div className="space-y-3">
            <Button 
              className="w-full justify-start bg-blue-600 hover:bg-blue-700"
              onClick={() => setEmailConnected(true)}
            >
              <Mail size={20} className="mr-3" />
              Connect Gmail
              {emailConnected && <Check size={16} className="ml-auto text-green-500" />}
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => setEmailConnected(true)}
            >
              <Mail size={20} className="mr-3" />
              Connect Outlook
              {emailConnected && <Check size={16} className="ml-auto text-green-500" />}
            </Button>
          </div>
          {emailConnected && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 text-green-700">
                <Check size={16} />
                <span className="text-sm font-medium">Email connected successfully!</span>
              </div>
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Secure Your Data',
      description: 'Choose where to store your processed data',
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
            <div className="flex items-center space-x-2 text-blue-700 mb-2">
              <Shield size={20} />
              <span className="font-medium">Your data stays in your cloud</span>
            </div>
            <p className="text-blue-600 text-sm">
              Ogma processes data securely and stores results in your chosen cloud storage.
            </p>
          </div>
          
          <div className="space-y-3">
            <Button 
              className="w-full justify-start"
              variant="outline"
              onClick={() => setStorageConnected(true)}
            >
              <Cloud size={20} className="mr-3" />
              Connect OneDrive
              {storageConnected && <Check size={16} className="ml-auto text-green-500" />}
            </Button>
            <Button 
              className="w-full justify-start"
              variant="outline"
              onClick={() => setStorageConnected(true)}
            >
              <Cloud size={20} className="mr-3" />
              Connect Google Drive
              {storageConnected && <Check size={16} className="ml-auto text-green-500" />}
            </Button>
          </div>
        </div>
      )
    },
    {
      title: 'Quick Tour',
      description: 'Learn about Ogma\'s key features',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-slate-50">
              <Mail className="text-blue-600 mt-1" size={24} />
              <div>
                <h3 className="font-medium text-slate-900 mb-1">Smart Inbox</h3>
                <p className="text-sm text-slate-600">AI-powered email summaries with action items</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-slate-50">
              <FileText className="text-green-600 mt-1" size={24} />
              <div>
                <h3 className="font-medium text-slate-900 mb-1">Doc Digest</h3>
                <p className="text-sm text-slate-600">Extract key insights from documents with risk analysis</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 rounded-lg bg-slate-50">
              <MessageSquare className="text-purple-600 mt-1" size={24} />
              <div>
                <h3 className="font-medium text-slate-900 mb-1">ToneAware</h3>
                <p className="text-sm text-slate-600">Adjust message tone for perfect communication</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Ready to Start!',
      description: 'Let\'s process your emails',
      content: (
        <div className="text-center space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">You're all set!</h3>
            <p className="text-slate-600 mb-4">
              Ogma will now process your top 25 emails to show you the time-saving power of AI.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">25</div>
                <div className="text-slate-600">Emails</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">7</div>
                <div className="text-slate-600">Actions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">43m</div>
                <div className="text-slate-600">Saved</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep - 1];
  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedPersona !== '';
      case 2: return emailConnected;
      case 3: return storageConnected;
      default: return true;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">{currentStepData.title}</CardTitle>
              <p className="text-slate-600 mt-1">{currentStepData.description}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X size={20} />
            </Button>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex space-x-2 mt-4">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 flex-1 rounded-full ${
                  idx + 1 <= currentStep ? 'bg-blue-600' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </CardHeader>
        
        <CardContent className="min-h-64">
          {currentStepData.content}
          
          <div className="flex justify-between items-center mt-8">
            <div className="text-sm text-slate-500">
              Step {currentStep} of {steps.length}
            </div>
            <div className="space-x-3">
              {currentStep > 1 && (
                <Button variant="outline" onClick={() => setCurrentStep(currentStep - 1)}>
                  Back
                </Button>
              )}
              <Button 
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {currentStep === steps.length ? 'Get Started' : 'Continue'}
                <ChevronRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingModal;
