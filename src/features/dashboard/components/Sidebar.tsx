import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/stores/appStore';
import { Button } from '@/components/ui/button';
import { 
  Brain, 
  MessageCircle, 
  Mail, 
  FileText, 
  PenTool, 
  Share2, 
  Users, 
  Clock,
  Menu,
  LogOut,
  Home,
  ArrowLeft
} from 'lucide-react';
import { toast } from 'sonner';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'chat', label: 'AI Assistant', icon: MessageCircle },
  { id: 'inbox', label: 'Smart Inbox', icon: Mail },
  { id: 'digest', label: 'Doc Digest', icon: FileText },
  { id: 'tone', label: 'ToneAware', icon: PenTool },
  { id: 'social', label: 'Social Personalizer', icon: Share2 },
  { id: 'meeting', label: 'Meeting Intelligence', icon: Users },
  { id: 'memory', label: 'Memory Keeper', icon: Clock },
];

export function Sidebar() {
  const navigate = useNavigate();
  const { activeView, setActiveView, sidebarCollapsed, setSidebarCollapsed } = useAppStore();

  const handleBackToLanding = () => {
    toast.success('Thanks for exploring Project Ogma!');
    navigate('/');
  };

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-card border-r border-border transition-all duration-300 z-50 ${
      sidebarCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
              <Brain className="h-6 w-6 text-primary animate-pulse" />
              {!sidebarCollapsed && (
                <div>
                  <h2 className="font-semibold text-foreground">Project Ogma</h2>
                  <p className="text-xs text-muted-foreground">Intelligence Platform</p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="h-8 w-8"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeView === item.id ? "secondary" : "ghost"}
              className={`w-full ${sidebarCollapsed ? 'justify-center px-0' : 'justify-start'} h-10`}
              onClick={() => setActiveView(item.id)}
            >
              <item.icon className="h-4 w-4" />
              {!sidebarCollapsed && <span className="ml-3">{item.label}</span>}
            </Button>
          ))}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-border">
          {!sidebarCollapsed && (
            <div className="mb-3 p-2 rounded-lg bg-muted/50">
              <p className="text-sm font-medium text-foreground truncate">
                demo@projectogma.ai
              </p>
              <p className="text-xs text-muted-foreground">Demo User</p>
            </div>
          )}
          <Button
            variant="outline"
            onClick={handleBackToLanding}
            className={`w-full ${sidebarCollapsed ? 'px-0' : ''}`}
          >
            <ArrowLeft className="h-4 w-4" />
            {!sidebarCollapsed && <span className="ml-2">Back to Landing</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}