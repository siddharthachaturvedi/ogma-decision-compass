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
  Home,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

// Simplified navigation following MECE principles
const menuItems = [
  { id: 'overview', label: 'Overview', icon: Home, color: 'text-primary-600', description: 'Dashboard and insights' },
  { id: 'assistant', label: 'AI Assistant', icon: MessageCircle, color: 'text-blue-600', description: 'Chat and get help' },
  { id: 'documents', label: 'Documents', icon: FileText, color: 'text-green-600', description: 'Process and analyze files' },
  { id: 'inbox', label: 'Communications', icon: Mail, color: 'text-purple-600', description: 'Smart email management' },
];

export function Sidebar() {
  const navigate = useNavigate();
  const { activeView, setActiveView, sidebarCollapsed, setSidebarCollapsed } = useAppStore();

  const handleBackToLanding = () => {
    toast.success('Thanks for exploring Project Ogma!');
    navigate('/');
  };

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-card/95 backdrop-blur-xl border-r border-border/50 transition-all duration-300 z-50 ${
      sidebarCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-border/30">
          <div className="flex items-center justify-between">
            <div className={`flex items-center space-x-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
              <div className="relative">
                <Brain className="h-6 w-6 text-primary-600 animate-intelligence-pulse" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-success rounded-full animate-pulse" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h2 className="font-semibold text-foreground tracking-tight">Project Ogma</h2>
                  <p className="text-xs text-muted-foreground font-mono">Intelligence Platform</p>
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="h-8 w-8 hover:bg-muted/50 transition-smooth"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => (
            <div key={item.id}>
              <Button
                variant={activeView === item.id ? "secondary" : "ghost"}
                className={`w-full ${sidebarCollapsed ? 'justify-center px-0' : 'justify-start'} h-12 transition-smooth ${
                  activeView === item.id 
                    ? 'bg-primary-50 text-primary-700 shadow-soft border border-primary-100' 
                    : 'hover:bg-muted/50'
                }`}
                onClick={() => setActiveView(item.id)}
              >
                <item.icon className={`h-5 w-5 ${activeView === item.id ? 'text-primary-600' : item.color}`} />
                {!sidebarCollapsed && (
                  <div className="ml-3 text-left flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.description}</div>
                  </div>
                )}
              </Button>
            </div>
          ))}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-border/30 space-y-3">
          {!sidebarCollapsed && (
            <div className="p-3 rounded-xl bg-muted/30 border border-border/30">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-primary-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    Demo User
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    demo@projectogma.ai
                  </p>
                </div>
              </div>
            </div>
          )}
          <Button
            variant="outline"
            onClick={handleBackToLanding}
            className={`w-full border-border/50 hover:border-primary-200 hover:bg-primary-50/50 transition-smooth ${sidebarCollapsed ? 'px-0' : ''}`}
          >
            <ArrowLeft className="h-4 w-4" />
            {!sidebarCollapsed && <span className="ml-2">Back to Landing</span>}
          </Button>
        </div>
      </div>
    </aside>
  );
}