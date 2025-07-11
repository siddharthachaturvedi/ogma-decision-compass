import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Mail, 
  Search, 
  Filter, 
  Star, 
  Archive, 
  Trash2, 
  Reply, 
  Forward,
  MoreHorizontal,
  Clock,
  AlertCircle,
  CheckCircle,
  User
} from 'lucide-react';

interface EmailItem {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  status: 'unread' | 'read' | 'replied';
  aiInsight?: string;
  actionRequired?: boolean;
}

const mockEmails: EmailItem[] = [
  {
    id: '1',
    sender: 'Sarah Johnson',
    subject: 'Q4 Budget Review - Action Required',
    preview: 'Hi team, I need your input on the Q4 budget allocations. Please review the attached spreadsheet and provide feedback by...',
    timestamp: '2 hours ago',
    priority: 'high',
    status: 'unread',
    aiInsight: 'Budget review requires your approval. Deadline in 3 days.',
    actionRequired: true
  },
  {
    id: '2',
    sender: 'Mike Chen',
    subject: 'Product Demo Feedback',
    preview: 'Great demo yesterday! The client was impressed with the new features. A few follow-up questions from their side...',
    timestamp: '4 hours ago',
    priority: 'medium',
    status: 'read',
    aiInsight: 'Positive client feedback. Consider scheduling follow-up meeting.',
    actionRequired: true
  },
  {
    id: '3',
    sender: 'Alex Rodriguez',
    subject: 'Weekly Team Sync Notes',
    preview: 'Here are the notes from today\'s team sync. Key decisions made: 1. New hire approved for Q1 2. Product roadmap updated...',
    timestamp: '6 hours ago',
    priority: 'medium',
    status: 'read',
    aiInsight: 'Meeting notes contain 3 action items assigned to you.',
    actionRequired: false
  },
  {
    id: '4',
    sender: 'LinkedIn',
    subject: 'Your weekly network update',
    preview: 'See who\'s been viewing your profile and connect with professionals in your industry...',
    timestamp: '1 day ago',
    priority: 'low',
    status: 'read',
    aiInsight: 'Social update - low priority.',
    actionRequired: false
  }
];

export function InboxView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedEmail, setSelectedEmail] = useState<EmailItem | null>(null);

  const filteredEmails = mockEmails.filter(email => {
    const matchesSearch = email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         email.sender.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' ||
                         (selectedFilter === 'unread' && email.status === 'unread') ||
                         (selectedFilter === 'priority' && email.priority === 'high') ||
                         (selectedFilter === 'action' && email.actionRequired);
    
    return matchesSearch && matchesFilter;
  });

  const unreadCount = mockEmails.filter(email => email.status === 'unread').length;
  const actionRequiredCount = mockEmails.filter(email => email.actionRequired).length;

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r border-border/50 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center space-x-3 mb-4">
            <Mail className="h-6 w-6 text-primary-600" />
            <div>
              <h1 className="text-xl font-semibold text-foreground">Smart Inbox</h1>
              <p className="text-sm text-muted-foreground">AI-prioritized communications</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search emails..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="p-4 border-b border-border/50">
          <div className="space-y-1">
            {[
              { id: 'all', label: 'All Messages', count: mockEmails.length },
              { id: 'unread', label: 'Unread', count: unreadCount },
              { id: 'priority', label: 'High Priority', count: mockEmails.filter(e => e.priority === 'high').length },
              { id: 'action', label: 'Action Required', count: actionRequiredCount }
            ].map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "secondary" : "ghost"}
                className="w-full justify-between h-auto p-3"
                onClick={() => setSelectedFilter(filter.id)}
              >
                <span className="text-sm">{filter.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedFilter === filter.id 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {filter.count}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {/* Email List */}
        <div className="flex-1 overflow-y-auto">
          {filteredEmails.map((email) => (
            <div
              key={email.id}
              className={`p-4 border-b border-border/30 cursor-pointer hover:bg-muted/30 transition-smooth ${
                selectedEmail?.id === email.id ? 'bg-primary-50 border-primary-200' : ''
              } ${email.status === 'unread' ? 'bg-blue-50/30' : ''}`}
              onClick={() => setSelectedEmail(email)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className={`text-sm truncate ${
                      email.status === 'unread' ? 'font-semibold text-foreground' : 'font-medium text-foreground'
                    }`}>
                      {email.sender}
                    </p>
                    <div className="flex items-center space-x-1">
                      {email.priority === 'high' && (
                        <AlertCircle className="h-3 w-3 text-red-500" />
                      )}
                      {email.status === 'unread' && (
                        <div className="w-2 h-2 bg-primary-600 rounded-full" />
                      )}
                    </div>
                  </div>
                  <p className={`text-sm mb-1 truncate ${
                    email.status === 'unread' ? 'font-medium text-foreground' : 'text-foreground'
                  }`}>
                    {email.subject}
                  </p>
                  <p className="text-xs text-muted-foreground truncate mb-2">
                    {email.preview}
                  </p>
                  {email.aiInsight && (
                    <div className="flex items-center space-x-1 mb-2">
                      <div className="w-1 h-1 bg-primary-600 rounded-full" />
                      <p className="text-xs text-primary-700 font-medium">
                        {email.aiInsight}
                      </p>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{email.timestamp}</p>
                    {email.actionRequired && (
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3 text-orange-500" />
                        <span className="text-xs text-orange-700 font-medium">Action needed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedEmail ? (
          <>
            {/* Email Header */}
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">{selectedEmail.sender}</h2>
                    <p className="text-sm text-muted-foreground">{selectedEmail.timestamp}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Reply className="h-4 w-4 mr-2" />
                    Reply
                  </Button>
                  <Button variant="outline" size="sm">
                    <Forward className="h-4 w-4 mr-2" />
                    Forward
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <h1 className="text-xl font-semibold text-foreground mb-2">{selectedEmail.subject}</h1>
              {selectedEmail.aiInsight && (
                <div className="p-3 rounded-lg bg-primary-50 border border-primary-200">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-primary-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-primary-900">AI Insight</p>
                      <p className="text-sm text-primary-700">{selectedEmail.aiInsight}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Email Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="prose prose-sm max-w-none">
                <p className="text-foreground leading-relaxed">
                  {selectedEmail.preview}
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p className="text-foreground leading-relaxed mt-4">
                  Best regards,<br />
                  {selectedEmail.sender}
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="p-6 border-t border-border/50 bg-muted/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Archive className="h-4 w-4 mr-2" />
                    Archive
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                  <Button variant="outline" size="sm">
                    <Star className="h-4 w-4 mr-2" />
                    Star
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">
                    <Reply className="h-4 w-4 mr-2" />
                    Reply
                  </Button>
                  <Button>
                    <Forward className="h-4 w-4 mr-2" />
                    Forward
                  </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Mail className="h-16 w-16 mx-auto text-muted-foreground opacity-50" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Select an email</h3>
                <p className="text-muted-foreground">
                  Choose an email from the list to view its contents
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}