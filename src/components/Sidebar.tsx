
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Mail, 
  FileText, 
  MessageSquare, 
  Clock, 
  BarChart3,
  Settings,
  Crown
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Sidebar = ({ activeView, setActiveView }: SidebarProps) => {
  const menuItems = [
    { id: 'inbox', label: 'Smart Inbox', icon: Mail },
    { id: 'digest', label: 'Doc Digest', icon: FileText },
    { id: 'tone', label: 'ToneAware', icon: MessageSquare },
    { id: 'memory', label: 'Memory Keeper', icon: Clock },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Ogma
        </h1>
        <p className="text-slate-400 text-sm mt-1">AI Executive Assistant</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200",
                activeView === item.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Upgrade Section */}
      <div className="p-4 border-t border-slate-700">
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg p-4 text-center">
          <Crown className="mx-auto mb-2 text-white" size={24} />
          <h3 className="font-semibold text-white text-sm">Upgrade to Pro</h3>
          <p className="text-xs text-white/80 mt-1">Unlock advanced features</p>
          <button className="mt-3 w-full bg-white text-orange-600 rounded-md px-3 py-2 text-sm font-medium hover:bg-slate-100 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>

      {/* Settings */}
      <div className="p-4">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
          <Settings size={20} />
          <span className="font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
