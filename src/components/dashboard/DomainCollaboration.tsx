import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Users, Share2, Brain, Zap } from 'lucide-react';

interface CollaboratorProps {
  email: string;
  domain: string;
  activeContexts: number;
  lastActive: string;
}

interface DomainCollaborationProps {
  userEmail?: string;
}

const DomainCollaboration: React.FC<DomainCollaborationProps> = ({ userEmail = 'john@company.com' }) => {
  // Extract domain from user email
  const userDomain = userEmail.split('@')[1] || 'company.com';
  
  // Mock collaborators from the same domain
  const collaborators: CollaboratorProps[] = [
    { email: 'sarah@company.com', domain: userDomain, activeContexts: 12, lastActive: '2 min ago' },
    { email: 'mike@company.com', domain: userDomain, activeContexts: 8, lastActive: '15 min ago' },
    { email: 'alex@company.com', domain: userDomain, activeContexts: 5, lastActive: '1 hour ago' },
  ];

  const sharedInsights = [
    { type: 'pattern', text: 'Team meeting patterns suggest optimal focus time at 2-4 PM' },
    { type: 'connection', text: 'Sarah and Mike both referenced Project Alpha in recent contexts' },
    { type: 'wisdom', text: 'Cross-team knowledge graph shows emerging trends in Q4 planning' }
  ];

  const getInitials = (email: string) => {
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + (name.charAt(1) || '').toUpperCase();
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'pattern': return Brain;
      case 'connection': return Share2;
      case 'wisdom': return Zap;
      default: return Brain;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-gradient-to-br from-card to-card/80">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-primary animate-neural-pulse" />
            <CardTitle className="text-lg">Domain Network: @{userDomain}</CardTitle>
          </div>
          <CardDescription>
            Neural connections across your organization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {collaborators.map((collab, index) => (
              <div 
                key={collab.email}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-primary/10 animate-predictive-emerge"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                    <AvatarFallback className="text-xs bg-primary/10 text-primary">
                      {getInitials(collab.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">{collab.email.split('@')[0]}</p>
                    <p className="text-xs text-muted-foreground">{collab.lastActive}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                  {collab.activeContexts} contexts
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-accent/20 bg-gradient-to-br from-card to-accent/5">
        <CardHeader>
          <CardTitle className="text-lg flex items-center space-x-2">
            <Brain className="h-5 w-5 text-accent animate-pulse" />
            <span>Collective Intelligence</span>
          </CardTitle>
          <CardDescription>
            Insights emerging from your domain's neural network
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sharedInsights.map((insight, index) => {
              const IconComponent = getInsightIcon(insight.type);
              return (
                <div 
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-background/50 border border-accent/20 animate-wisdom-flow"
                  style={{ animationDelay: `${index * 0.5}s` }}
                >
                  <IconComponent className="h-4 w-4 text-accent mt-0.5 animate-neural-pulse" />
                  <p className="text-sm text-muted-foreground flex-1">{insight.text}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DomainCollaboration;