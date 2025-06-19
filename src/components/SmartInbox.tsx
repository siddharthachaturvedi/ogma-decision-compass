
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Clock, 
  AlertTriangle, 
  CheckCircle,
  TrendingUp,
  Filter
} from 'lucide-react';

const SmartInbox = () => {
  const [selectedEmail, setSelectedEmail] = useState(null);

  const emailSummaries = [
    {
      id: 1,
      from: "sarah.chen@company.com",
      subject: "Q4 Budget Review Meeting",
      summary: "Budget review scheduled for next week. Requires approval on marketing spend increase.",
      priority: "high",
      actions: ["Approve budget", "Schedule follow-up"],
      timeSaved: "12 min",
      sentiment: "neutral"
    },
    {
      id: 2,
      from: "mike.johnson@vendor.com",
      subject: "Contract Renewal Discussion",
      summary: "Contract renewal terms discussed. Price increase of 15% proposed.",
      priority: "medium",
      actions: ["Review terms", "Counter-propose"],
      timeSaved: "8 min",
      sentiment: "positive"
    },
    {
      id: 3,
      from: "team@hr.company.com",
      subject: "New Hire Onboarding Updates",
      summary: "Three new team members starting next month. Equipment and training scheduled.",
      priority: "low",
      actions: ["Acknowledge", "Set welcome meetings"],
      timeSaved: "5 min",
      sentiment: "positive"
    }
  ];

  const stats = {
    totalEmails: 47,
    processed: 32,
    timeSaved: "2h 45m",
    actionItems: 7
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header Stats */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Smart Inbox</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Mail className="text-blue-600" size={20} />
                <div>
                  <p className="text-sm text-slate-600">Total Emails</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.totalEmails}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-600" size={20} />
                <div>
                  <p className="text-sm text-slate-600">Processed</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.processed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="text-purple-600" size={20} />
                <div>
                  <p className="text-sm text-slate-600">Time Saved</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.timeSaved}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="text-orange-600" size={20} />
                <div>
                  <p className="text-sm text-slate-600">Action Items</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.actionItems}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 flex justify-between items-center">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
          <Badge variant="secondary">Last updated: 2 min ago</Badge>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Process New Emails
        </Button>
      </div>

      {/* Email List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Email Summaries</h2>
          {emailSummaries.map((email) => (
            <Card 
              key={email.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedEmail(email)}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{email.subject}</CardTitle>
                    <p className="text-sm text-slate-600 mt-1">{email.from}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge 
                      variant={email.priority === 'high' ? 'destructive' : 
                               email.priority === 'medium' ? 'default' : 'secondary'}
                    >
                      {email.priority}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {email.timeSaved} saved
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 mb-3">{email.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {email.actions.map((action, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {action}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detail Panel */}
        <div>
          <h2 className="text-xl font-semibold text-slate-900 mb-4">Email Details</h2>
          {selectedEmail ? (
            <Card>
              <CardHeader>
                <CardTitle>{selectedEmail.subject}</CardTitle>
                <p className="text-slate-600">From: {selectedEmail.from}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Summary</h4>
                  <p className="text-slate-700">{selectedEmail.summary}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Recommended Actions</h4>
                  <div className="space-y-2">
                    {selectedEmail.actions.map((action, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-slate-700">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    Quick Reply
                  </Button>
                  <Button size="sm" variant="outline">
                    Schedule
                  </Button>
                  <Button size="sm" variant="outline">
                    Delegate
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Mail className="mx-auto text-slate-400 mb-4" size={48} />
                <p className="text-slate-600">Select an email to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartInbox;
