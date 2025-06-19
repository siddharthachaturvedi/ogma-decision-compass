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
}

const Sidebar = ({ activeView, setActiveView }: SidebarProps) => {
  const menuItems = [
    { id: 'hub', label: 'Intelligence Hub', icon: Brain, color: 'text-purple-600' },
    { id: 'chat', label: 'AI Assistant', icon: MessageCircle, color: 'text-blue-600' },
    { id: 'inbox', label: 'Smart Inbox', icon: Mail, color: 'text-green-600' },
    { id: 'digest', label: 'Doc Digest', icon: FileText, color: 'text-orange-600' },
    { id: 'tone', label: 'ToneAware', icon: PenTool, color: 'text-purple-600' },
    { id: 'social', label: 'Social Personalizer', icon: Share2, color: 'text-pink-600' },
    { id: 'meeting', label: 'Meeting Intelligence', icon: Users, color: 'text-indigo-600' },
    { id: 'memory', label: 'Memory Keeper', icon: Clock, color: 'text-teal-600' },
  ];

  return (
    <aside className="w-64 bg-slate-50 border-r border-slate-200 h-screen py-8 px-3 flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Acme Intelligence
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Your AI-powered unified workspace
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
        <p className="text-xs text-slate-400 uppercase font-medium">
          Account
        </p>
        <Button variant="ghost" className="w-full justify-start mt-2">
          <img
            src="https://avatars.dicebear.com/api/open-peeps/example.svg"
            alt="Avatar"
            className="mr-2 h-6 w-6 rounded-full"
          />
          John Doe
        </Button>
        <Button variant="outline" className="w-full justify-center mt-2">
          Logout
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
