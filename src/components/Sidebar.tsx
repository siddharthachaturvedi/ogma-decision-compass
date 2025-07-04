
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
    { id: 'inbox', label: 'Smart Inbox', icon: Mail, color: 'text-accent' },
    { id: 'digest', label: 'Doc Digest', icon: FileText, color: 'text-purple-600' },
    { id: 'tone', label: 'ToneAware', icon: PenTool, color: 'text-emerald-600' },
    { id: 'social', label: 'Social Personalizer', icon: Share2, color: 'text-blue-600' },
    { id: 'meeting', label: 'Meeting Intelligence', icon: Users, color: 'text-orange-600' },
    { id: 'memory', label: 'Memory Keeper', icon: Clock, color: 'text-pink-600' },
  ];

  return (
    <aside className="w-72 glass border-r border-border/50 h-screen py-8 px-4 flex flex-col shadow-medium">
      <div className="mb-10 px-2">
        <div className="flex items-center space-x-3 mb-3">
          <Brain className="h-8 w-8 text-primary animate-neural-pulse" />
          <h2 className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Project Ogma
          </h2>
        </div>
        <p className="text-sm text-muted-foreground font-medium">
          Post-agentic intelligence platform
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeView === item.id ? "secondary" : "ghost"}
            className={`w-full justify-start font-medium h-12 transition-all duration-300 ${
              activeView === item.id 
                ? "shadow-soft scale-105" 
                : "hover:shadow-soft hover:scale-105"
            }`}
            onClick={() => setActiveView(item.id)}
          >
            <div className={`p-2 rounded-lg mr-3 ${
              activeView === item.id 
                ? 'bg-primary/10' 
                : 'bg-transparent group-hover:bg-primary/5'
            } transition-colors duration-300`}>
              <item.icon className={`h-5 w-5 ${item.color}`} />
            </div>
            <span className="text-base">{item.label}</span>
          </Button>
        ))}
      </nav>

      <div className="mt-8 pt-6 border-t border-border/50">
        <p className="text-xs text-muted-foreground uppercase font-semibold mb-4 px-2 tracking-wider">
          Neural Profile
        </p>
        <Button variant="ghost" className="w-full justify-start mb-4 p-3 h-auto hover:shadow-soft transition-all duration-300">
          <div className="mr-4 h-10 w-10 rounded-full gradient-primary flex items-center justify-center animate-neural-pulse shadow-medium">
            <span className="text-sm font-bold text-primary-foreground">JD</span>
          </div>
          <div className="text-left flex-1">
            <div className="text-base font-semibold text-foreground">John Doe</div>
            <div className="text-sm text-muted-foreground">@company.com</div>
          </div>
        </Button>
        <Button 
          variant="outline" 
          className="w-full justify-center border-border/50 hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive transition-all duration-300 font-medium" 
          onClick={onLogout}
        >
          Disconnect
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
