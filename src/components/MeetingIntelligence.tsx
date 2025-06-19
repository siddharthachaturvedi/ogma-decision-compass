
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mic, 
  MicOff, 
  Users, 
  Clock,
  AlertTriangle,
  TrendingUp,
  Brain,
  Zap,
  Eye,
  Target,
  MessageCircle
} from 'lucide-react';

const MeetingIntelligence = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [meetingData, setMeetingData] = useState(null);

  const mockMeetingData = {
    duration: '47 min',
    participants: ['You', 'Sarah Chen', 'Mike Rodriguez', 'Alex Kim'],
    sentiment: 'Mostly positive',
    keyTopics: ['Q4 Budget', 'New Hire', 'Product Launch'],
    actionItems: 4,
    decisions: 2,
    conflicts: 1,
    energyLevel: 78,
    speakingTime: {
      'You': 35,
      'Sarah Chen': 28,
      'Mike Rodriguez': 22,
      'Alex Kim': 15
    },
    insights: [
      'Sarah showed resistance to budget increase (3 interruptions)',
      'Mike dominated technical discussion (68% of tech talk)',
      'Decision on product launch delayed twice',
      'Team energy dropped 20% after budget discussion'
    ]
  };

  const creativeFeatures = [
    {
      id: 'mood-tracker',
      name: 'Meeting Mood Tracker',
      description: 'Real-time sentiment analysis with energy dips/peaks',
      icon: TrendingUp,
      color: 'bg-blue-500'
    },
    {
      id: 'interruption-meter',
      name: 'Interruption Meter',
      description: 'Tracks who interrupts whom and suggests balance',
      icon: MessageCircle,
      color: 'bg-yellow-500'
    },
    {
      id: 'decision-velocity',
      name: 'Decision Velocity Tracker',
      description: 'Measures time from discussion to decision',
      icon: Zap,
      color: 'bg-green-500'
    },
    {
      id: 'conflict-radar',
      name: 'Conflict Radar',
      description: 'Detects brewing tensions before they explode',
      icon: AlertTriangle,
      color: 'bg-red-500'
    },
    {
      id: 'influence-map',
      name: 'Influence Mapping',
      description: 'Shows who influences decisions and how',
      icon: Target,
      color: 'bg-purple-500'
    },
    {
      id: 'attention-heatmap',
      name: 'Attention Heatmap',
      description: 'Visualizes when participants zone out',
      icon: Eye,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Meeting Intelligence</h1>
        <Button 
          onClick={() => setIsRecording(!isRecording)}
          className={isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'}
        >
          {isRecording ? <MicOff size={16} className="mr-2" /> : <Mic size={16} className="mr-2" />}
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Button>
      </div>

      {isRecording && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="font-medium text-red-800">Recording in progress...</span>
              </div>
              <div className="flex space-x-4 text-sm text-red-700">
                <span>⏱️ 12:34</span>
                <span>👥 4 voices detected</span>
                <span>🎯 3 decisions pending</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Analysis */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain size={24} />
                <span>Last Meeting Analysis</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockMeetingData ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <Clock size={20} className="mx-auto mb-1 text-slate-600" />
                      <p className="text-lg font-bold">{mockMeetingData.duration}</p>
                      <p className="text-xs text-slate-600">Duration</p>
                    </div>
                    <div className="text-center">
                      <Users size={20} className="mx-auto mb-1 text-slate-600" />
                      <p className="text-lg font-bold">{mockMeetingData.participants.length}</p>
                      <p className="text-xs text-slate-600">Participants</p>
                    </div>
                    <div className="text-center">
                      <Target size={20} className="mx-auto mb-1 text-slate-600" />
                      <p className="text-lg font-bold">{mockMeetingData.actionItems}</p>
                      <p className="text-xs text-slate-600">Action Items</p>
                    </div>
                    <div className="text-center">
                      <TrendingUp size={20} className="mx-auto mb-1 text-slate-600" />
                      <p className="text-lg font-bold">{mockMeetingData.energyLevel}%</p>
                      <p className="text-xs text-slate-600">Energy Level</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Speaking Time Distribution</h4>
                    <div className="space-y-2">
                      {Object.entries(mockMeetingData.speakingTime).map(([person, percentage]) => (
                        <div key={person} className="flex items-center space-x-3">
                          <span className="text-sm w-20">{person}</span>
                          <div className="flex-1 bg-slate-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-slate-600 w-10">{percentage}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Key Insights</h4>
                    <div className="space-y-2">
                      {mockMeetingData.insights.map((insight, idx) => (
                        <div key={idx} className="flex items-start space-x-2 p-2 bg-slate-50 rounded">
                          <AlertTriangle size={16} className="text-amber-500 mt-0.5" />
                          <span className="text-sm text-slate-700">{insight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Mic className="mx-auto text-slate-400 mb-4" size={48} />
                  <p className="text-slate-600">Start recording to see real-time analysis</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Creative Features Grid */}
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Meeting Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {creativeFeatures.map((feature) => {
                  const Icon = feature.icon;
                  return (
                    <div key={feature.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${feature.color} text-white`}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900">{feature.name}</h4>
                          <p className="text-sm text-slate-600 mt-1">{feature.description}</p>
                          <Button size="sm" variant="outline" className="mt-2">
                            Enable
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Engagement Score</span>
                <Badge className="bg-green-100 text-green-800">High</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Decision Progress</span>
                <Badge variant="outline">3/5 Made</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Time Efficiency</span>
                <Badge className="bg-yellow-100 text-yellow-800">85%</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Smart Suggestions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm font-medium text-blue-800">💡 Meeting Tip</p>
                <p className="text-sm text-blue-700">Alex hasn't spoken in 8 minutes. Consider asking for their input.</p>
              </div>
              <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                <p className="text-sm font-medium text-amber-800">⚠️ Energy Alert</p>
                <p className="text-sm text-amber-700">Team energy is dropping. Consider a 5-minute break.</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                <p className="text-sm font-medium text-green-800">✅ Progress Note</p>
                <p className="text-sm text-green-700">Great! You've made 2 key decisions in the last 10 minutes.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Meeting History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 hover:bg-slate-50 rounded">
                  <div>
                    <p className="text-sm font-medium">Q4 Planning</p>
                    <p className="text-xs text-slate-500">Yesterday, 2:00 PM</p>
                  </div>
                  <Badge>92%</Badge>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-slate-50 rounded">
                  <div>
                    <p className="text-sm font-medium">Team Standup</p>
                    <p className="text-xs text-slate-500">2 days ago, 9:00 AM</p>
                  </div>
                  <Badge variant="secondary">78%</Badge>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-slate-50 rounded">
                  <div>
                    <p className="text-sm font-medium">Board Review</p>
                    <p className="text-xs text-slate-500">1 week ago, 3:00 PM</p>
                  </div>
                  <Badge>95%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MeetingIntelligence;
