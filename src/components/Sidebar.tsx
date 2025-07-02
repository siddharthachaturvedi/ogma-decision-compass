import React from 'react';
import { 
  Brain, 
  MessageCircle, 
  Mail, 
  FileText, 
  PenTool, 
  Share2, 
  Users, 
  Clock 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onLogout: () => void;
}

const Sidebar = ({ activeView, setActiveView, onLogout }: SidebarProps) => {
  const menuItems = [
    { id: 'hub', label: 'Intelligence Hub', icon: Brain, color: 'text-primary' },
    { id: 'chat', label: 'AI Assistant', icon: MessageCircle, color: 'text-primary' },
    { id: 'inbox', label: 'Smart Inbox', icon: Mail, color: 'text-primary' },
    { id: 'digest', label: 'Doc Digest', icon: FileText, color: 'text-primary' },
    { id: 'tone', label: 'ToneAware', icon: PenTool, color: 'text-primary' },
    { id: 'social', label: 'Social Personalizer', icon: Share2, color: 'text-primary' },
    { id: 'meeting', label: 'Meeting Intelligence', icon: Users, color: 'text-primary' },
    { id: 'memory', label: 'Memory Keeper', icon: Clock, color: 'text-primary' },
  ];

  return (
    <aside className="w-64 bg-card border-r border-border h-screen py-8 px-3 flex flex-col backdrop-blur-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight">
          Project Ogma
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Post-agentic intelligence platform
        </p>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeView === item.id ? "secondary" : "ghost"}
            className="w-full justify-start font-medium"
            onClick={() => setActiveView(item.id)}
          >
            <item.icon className="mr-2 h-4 w-4" style={{ color: item.color }} />
            {item.label}
          </Button>
        ))}
      </nav>

      <div className="mt-8">
        <p className="text-xs text-muted-foreground uppercase font-medium mb-3">
          Neural Profile
        </p>
        <Button variant="ghost" className="w-full justify-start mb-2 group">
          <div className="mr-3 h-8 w-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-neural-pulse">
            <span className="text-xs font-bold text-primary-foreground">JD</span>
          </div>
          <div className="text-left">
            <div className="text-sm font-medium">John Doe</div>
            <div className="text-xs text-muted-foreground">@company.com</div>
          </div>
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-center border-primary/30 hover:bg-primary/10" 
          onClick={onLogout}
        >
          Disconnect
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
