import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageSquare, 
  Wand2, 
  Copy,
  Share2,
  Target,
  Sparkles,
  Users,
  TrendingUp,
  Calendar,
  CheckCircle
} from 'lucide-react';

type PlatformPosts = {
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  threads?: string;
};

const SocialPersonalizer = () => {
  const [marketingCopy, setMarketingCopy] = useState('');
  const [personalizedPosts, setPersonalizedPosts] = useState<PlatformPosts>({});
  const [voiceProfile, setVoiceProfile] = useState('');
  const [processing, setProcessing] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState(['linkedin', 'twitter']);
  const { toast } = useToast();

  const platforms = [
    { 
      id: 'linkedin', 
      name: 'LinkedIn', 
      icon: Users, 
      constraints: '3000 char max, professional tone',
      color: 'bg-blue-600'
    },
    { 
      id: 'twitter', 
      name: 'Twitter/X', 
      icon: MessageSquare, 
      constraints: '280 char max, conversational',
      color: 'bg-slate-800'
    },
    { 
      id: 'instagram', 
      name: 'Instagram', 
      icon: Target, 
      constraints: '2200 char max, visual focus',
      color: 'bg-pink-500'
    },
    { 
      id: 'threads', 
      name: 'Threads', 
      icon: Share2, 
      constraints: '500 char max, authentic',
      color: 'bg-purple-600'
    }
  ];

  const voicePresets = [
    { name: 'Visionary Leader', traits: 'Forward-thinking, inspiring, strategic' },
    { name: 'Industry Expert', traits: 'Analytical, data-driven, authoritative' },
    { name: 'People-First CEO', traits: 'Empathetic, collaborative, authentic' },
    { name: 'Disruptor', traits: 'Bold, challenging status-quo, provocative' },
    { name: 'Thought Leader', traits: 'Insightful, educational, storytelling' }
  ];

  const sampleCopy = "Excited to announce our Q4 results! Revenue grew 45% YoY, driven by our new AI capabilities. Our team's dedication and innovation continue to set us apart in the market. Looking forward to 2024 opportunities!";

  const copyToClipboard = async (text: string, platform: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard!",
        description: `${platform} post copied successfully.`,
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please try selecting and copying manually.",
        variant: "destructive",
      });
    }
  };

  const sharePost = (platform: string) => {
    const urls = {
      linkedin: 'https://www.linkedin.com/sharing/share-offsite/',
      twitter: 'https://twitter.com/intent/tweet',
      instagram: 'https://www.instagram.com/',
      threads: 'https://www.threads.net/'
    };
    
    window.open(urls[platform as keyof typeof urls], '_blank');
    toast({
      title: "Opening " + platform,
      description: "Redirecting to post composer...",
    });
  };

  const personalizePosts = () => {
    if (!marketingCopy) {
      toast({
        title: "Missing content",
        description: "Please add marketing copy to personalize.",
        variant: "destructive",
      });
      return;
    }
    
    setProcessing(true);
    
    // Enhanced AI processing simulation
    setTimeout(() => {
      const results: PlatformPosts = {};
      
      if (selectedPlatforms.includes('linkedin')) {
        results.linkedin = `${marketingCopy.replace('Excited to announce', 'I\'m proud to share')} 

What I've learned through this journey is that sustainable growth comes from empowering your team to innovate. Our 45% YoY growth isn't just a number—it's a testament to the incredible talent we've assembled.

As we head into 2024, I'm particularly excited about how AI will reshape not just our industry, but how we work together as humans. The future belongs to companies that can blend cutting-edge technology with authentic human connection.

What trends are you seeing in your industry? I'd love to hear your perspective.

#Leadership #Innovation #AI #Growth`;
      }
      
      if (selectedPlatforms.includes('twitter')) {
        results.twitter = `Just dropped our Q4 numbers 📈

45% YoY growth powered by AI innovation

The secret? Amazing people + bold bets = extraordinary results

2024 is going to be wild 🚀`;
      }
      
      if (selectedPlatforms.includes('instagram')) {
        results.instagram = `Behind every great quarter is an incredible team 💪

45% growth didn't happen by accident. It happened because we:
✨ Invested in our people
🚀 Bet big on AI
💡 Never stopped innovating

Grateful to lead such an amazing group of humans. The best is yet to come!

#TeamWork #Leadership #Growth #AI #Grateful`;
      }
      
      if (selectedPlatforms.includes('threads')) {
        results.threads = `Real talk: 45% growth feels amazing, but what I'm most proud of is how our team stepped up this quarter.

Growth is great. Growing together is everything.`;
      }
      
      setPersonalizedPosts(results);
      setProcessing(false);
      
      toast({
        title: "Posts personalized!",
        description: `Created ${selectedPlatforms.length} platform-specific posts.`,
      });
    }, 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Social Media Personalizer</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Sparkles size={16} className="mr-2" />
          Voice Training
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp size={24} />
                <span>Marketing Copy Input</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Paste your marketing team's copy here..."
                value={marketingCopy}
                onChange={(e) => setMarketingCopy(e.target.value)}
                className="min-h-32 mb-4"
              />
              <div className="flex space-x-2 mb-4">
                <Button onClick={() => setMarketingCopy(sampleCopy)} variant="outline" size="sm">
                  Use Sample
                </Button>
                <Button onClick={() => setMarketingCopy('')} variant="outline" size="sm">
                  Clear
                </Button>
              </div>
              
              <div className="mb-4">
                <label className="text-sm font-medium text-slate-700 mb-2 block">Your Voice Profile</label>
                <Input
                  placeholder="e.g., Strategic visionary with authentic leadership style..."
                  value={voiceProfile}
                  onChange={(e) => setVoiceProfile(e.target.value)}
                  className="mb-2"
                />
                <div className="flex flex-wrap gap-2">
                  {voicePresets.map((preset, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      onClick={() => setVoiceProfile(preset.traits)}
                    >
                      {preset.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-sm font-medium text-slate-700 mb-2 block">Target Platforms</label>
                <div className="grid grid-cols-2 gap-2">
                  {platforms.map((platform) => {
                    const Icon = platform.icon;
                    const isSelected = selectedPlatforms.includes(platform.id);
                    return (
                      <Button
                        key={platform.id}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          if (isSelected) {
                            setSelectedPlatforms(prev => prev.filter(p => p !== platform.id));
                          } else {
                            setSelectedPlatforms(prev => [...prev, platform.id]);
                          }
                        }}
                        className={`justify-start ${isSelected ? platform.color : ''}`}
                      >
                        <Icon size={16} className="mr-2" />
                        {platform.name}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <Button 
                onClick={personalizePosts} 
                disabled={!marketingCopy || processing}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                {processing ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <Wand2 size={16} className="mr-2" />
                )}
                Personalize for All Platforms
              </Button>
            </CardContent>
          </Card>

          {/* Generated Posts */}
          {Object.keys(personalizedPosts).length > 0 && (
            <div className="space-y-4">
              {selectedPlatforms.map(platformId => {
                const platform = platforms.find(p => p.id === platformId);
                const post = personalizedPosts[platformId as keyof PlatformPosts];
                const Icon = platform?.icon;
                
                if (!post) return null;
                
                return (
                  <Card key={platformId}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Icon size={20} />
                          <span>{platform?.name} Post</span>
                          <Badge variant="outline">{post.length} chars</Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => copyToClipboard(post, platform?.name || '')}
                          >
                            <Copy size={16} className="mr-2" />
                            Copy
                          </Button>
                          <Button 
                            size="sm" 
                            className={platform?.color}
                            onClick={() => sharePost(platformId)}
                          >
                            <Share2 size={16} className="mr-2" />
                            Post
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-slate-50 p-4 rounded-lg border">
                        <p className="text-slate-700 leading-relaxed whitespace-pre-line">{post}</p>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">{platform?.constraints}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Analytics & Features */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Smart Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Calendar size={16} className="mr-2" />
                Schedule Posts
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target size={16} className="mr-2" />
                A/B Test Variants
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp size={16} className="mr-2" />
                Engagement Predictor
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Sparkles size={16} className="mr-2" />
                Hashtag Optimizer
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Voice Consistency Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold text-green-600 mb-2">92%</div>
                <p className="text-sm text-slate-600">Authentic to your voice</p>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Leadership tone</span>
                  <Badge variant="secondary">95%</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Industry expertise</span>
                  <Badge variant="secondary">88%</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Personal style</span>
                  <Badge variant="secondary">93%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Creative Boosters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start text-left">
                <Sparkles size={16} className="mr-2" />
                <div>
                  <div className="font-medium">Story Extractor</div>
                  <div className="text-xs text-slate-500">Find narratives in data</div>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start text-left">
                <Target size={16} className="mr-2" />
                <div>
                  <div className="font-medium">Controversy Detector</div>
                  <div className="text-xs text-slate-500">Flag sensitive topics</div>
                </div>
              </Button>
              <Button variant="outline" className="w-full justify-start text-left">
                <TrendingUp size={16} className="mr-2" />
                <div>
                  <div className="font-medium">Trend Aligner</div>
                  <div className="text-xs text-slate-500">Match current conversations</div>
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SocialPersonalizer;
