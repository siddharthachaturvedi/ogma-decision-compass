
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Sparkles,
  Inbox, 
  FileText, 
  MessageSquare, 
  Clock,
  Share2,
  Mic,
  Settings,
  User
} from 'lucide-react';

const Sidebar = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: 'chat', label: 'AI Assistant', icon: Sparkles },
    { id: 'inbox', label: 'Smart Inbox', icon: Inbox },
    { id: 'digest', label: 'Doc Digest', icon: FileText },
    { id: 'tone', label: 'ToneAware', icon: MessageSquare },
    { id: 'social', label: 'Social Personalizer', icon: Share2 },
    { id: 'meeting', label: 'Meeting Intelligence', icon: Mic },
    { id: 'memory', label: 'Memory Keeper', icon: Clock },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white">Ogma</h1>
        <p className="text-slate-400 text-sm">AI Executive Assistant</p>
      </div>
      
      <nav className="flex-1 px-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={activeView === item.id ? "secondary" : "ghost"}
                className={`w-full justify-start text-left ${
                  activeView === item.id 
                    ? 'bg-slate-700 text-white' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                onClick={() => setActiveView(item.id)}
              >
                <Icon size={18} className="mr-3" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User size={16} />
          </div>
          <div>
            <p className="text-sm font-medium">Executive User</p>
            <p className="text-xs text-slate-400">Premium Plan</p>
          </div>
        </div>
        <Button variant="ghost" className="w-full justify-start text-slate-300 hover:text-white">
          <Settings size={16} className="mr-3" />
          Settings
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
