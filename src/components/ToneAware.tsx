
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Wand2, 
  Copy,
  Send,
  RotateCcw
} from 'lucide-react';

const ToneAware = () => {
  const [originalText, setOriginalText] = useState('');
  const [revisedText, setRevisedText] = useState('');
  const [formality, setFormality] = useState([50]);
  const [empathy, setEmpathy] = useState([50]);
  const [processing, setProcessing] = useState(false);

  const presets = [
    { name: 'Professional', formality: 80, empathy: 30 },
    { name: 'Friendly', formality: 40, empathy: 70 },
    { name: 'Diplomatic', formality: 70, empathy: 60 },
    { name: 'Neurodiverse-Friendly', formality: 60, empathy: 80 },
    { name: 'Executive Brief', formality: 90, empathy: 20 }
  ];

  const sampleText = "I need to discuss the budget proposal with the team. There are some concerns about the timeline and resource allocation that we should address before moving forward.";

  const generateRevision = () => {
    if (!originalText) return;
    
    setProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      let revised = originalText;
      
      // Apply formality adjustments
      if (formality[0] > 70) {
        revised = revised.replace(/I need to/, "I would like to formally");
        revised = revised.replace(/some concerns/, "several considerations");
        revised = revised.replace(/should/, "must");
      } else if (formality[0] < 30) {
        revised = revised.replace(/discuss/, "chat about");
        revised = revised.replace(/concerns/, "worries");
        revised = revised.replace(/address/, "tackle");
      }
      
      // Apply empathy adjustments
      if (empathy[0] > 70) {
        revised = revised.replace(/There are/, "I understand there are");
        revised = revised + " I'm happy to work together to find solutions that work for everyone.";
      } else if (empathy[0] < 30) {
        revised = revised.replace(/concerns/, "issues");
        revised = revised.replace(/we should/, "we need to");
      }
      
      setRevisedText(revised);
      setProcessing(false);
    }, 1000);
  };

  const applyPreset = (preset) => {
    setFormality([preset.formality]);
    setEmpathy([preset.empathy]);
    if (originalText) {
      generateRevision();
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">ToneAware Composer</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare size={24} />
                <span>Original Message</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Type your message here..."
                value={originalText}
                onChange={(e) => setOriginalText(e.target.value)}
                className="min-h-32 mb-4"
              />
              <div className="flex space-x-2">
                <Button onClick={() => setOriginalText(sampleText)} variant="outline" size="sm">
                  Use Sample
                </Button>
                <Button onClick={() => setOriginalText('')} variant="outline" size="sm">
                  <RotateCcw size={16} className="mr-2" />
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tone Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Tone Adjustments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-slate-700">Formality</label>
                  <Badge variant="outline">{formality[0]}%</Badge>
                </div>
                <Slider
                  value={formality}
                  onValueChange={setFormality}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Casual</span>
                  <span>Professional</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-slate-700">Empathy</label>
                  <Badge variant="outline">{empathy[0]}%</Badge>
                </div>
                <Slider
                  value={empathy}
                  onValueChange={setEmpathy}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Direct</span>
                  <span>Supportive</span>
                </div>
              </div>

              <Button 
                onClick={generateRevision} 
                disabled={!originalText || processing}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {processing ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Wand2 size={16} className="mr-2" />
                )}
                Generate Revision
              </Button>
            </CardContent>
          </Card>

          {/* Revised Message */}
          {revisedText && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Revised Message</span>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Copy size={16} className="mr-2" />
                      Copy
                    </Button>
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <Send size={16} className="mr-2" />
                      Send
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 p-4 rounded-lg border">
                  <p className="text-slate-700 leading-relaxed">{revisedText}</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Presets & Settings */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tone Presets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {presets.map((preset, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => applyPreset(preset)}
                  >
                    {preset.name}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Messages today</span>
                <Badge>12/50</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-slate-600">Time saved</span>
                <Badge variant="secondary">2h 15m</Badge>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full w-1/4"></div>
              </div>
              <p className="text-xs text-slate-500">24% of daily limit used</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ToneAware;
