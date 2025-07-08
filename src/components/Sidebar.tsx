
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
    { id: 'inbox', label: 'Smart Inbox', icon: Mail, color: 'text-muted-foreground' },
    { id: 'digest', label: 'Doc Digest', icon: FileText, color: 'text-muted-foreground' },
    { id: 'tone', label: 'ToneAware', icon: PenTool, color: 'text-muted-foreground' },
    { id: 'social', label: 'Social Personalizer', icon: Share2, color: 'text-muted-foreground' },
    { id: 'meeting', label: 'Meeting Intelligence', icon: Users, color: 'text-muted-foreground' },
    { id: 'memory', label: 'Memory Keeper', icon: Clock, color: 'text-muted-foreground' },
  ];

  return (
    <aside className="w-64 glass border-r border-border h-screen py-6 px-4 flex flex-col shadow-soft">
      <div className="mb-8 px-2">
        <div className="flex items-center space-x-3 mb-2">
          <Brain className="h-7 w-7 text-primary animate-neural-pulse" />
          <h2 className="text-xl font-semibold text-foreground">
            Project Ogma
          </h2>
        </div>
        <p className="text-xs text-muted-foreground font-medium">
          Post-agentic intelligence platform
        </p>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeView === item.id ? "secondary" : "ghost"}
            className={`w-full justify-start font-medium h-10 transition-all duration-200 ${
              activeView === item.id 
                ? "shadow-soft scale-[1.02] bg-secondary/80" 
                : "hover:shadow-soft hover:scale-[1.01] hover:bg-secondary/40"
            }`}
            onClick={() => setActiveView(item.id)}
          >
            <div className={`p-1.5 rounded-md mr-3 ${
              activeView === item.id 
                ? 'bg-primary/10' 
                : 'bg-transparent group-hover:bg-primary/5'
            } transition-colors duration-200`}>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </div>
            <span className="text-sm">{item.label}</span>
          </Button>
        ))}
      </nav>

      <div className="mt-6 pt-4 border-t border-border/50">
        <p className="text-xs text-muted-foreground uppercase font-medium mb-3 px-2 tracking-wide">
          Neural Profile
        </p>
        <Button variant="ghost" className="w-full justify-start mb-3 p-2 h-auto hover:shadow-soft transition-all duration-200">
          <div className="mr-3 h-8 w-8 rounded-lg gradient-primary flex items-center justify-center animate-neural-pulse shadow-soft">
            <span className="text-xs font-semibold text-primary-foreground">JD</span>
          </div>
          <div className="text-left flex-1">
            <div className="text-sm font-medium text-foreground">John Doe</div>
            <div className="text-xs text-muted-foreground">@company.com</div>
          </div>
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-center border-border hover:bg-destructive/5 hover:border-destructive/30 hover:text-destructive transition-all duration-200 font-medium text-sm" 
          onClick={onLogout}
        >
          Disconnect
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
