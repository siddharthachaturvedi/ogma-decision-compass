
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Search, 
  Filter,
  FileText,
  Mail,
  MessageSquare,
  Calendar,
  Download
} from 'lucide-react';

const MemoryKeeper = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const memoryItems = [
    {
      id: 1,
      type: 'digest',
      title: 'Q4 Budget Review Analysis',
      timestamp: '2024-01-15T10:30:00Z',
      content: 'Analyzed budget proposal with 15% marketing increase recommendation.',
      tags: ['budget', 'marketing', 'Q4'],
      riskLevel: 'medium',
      icon: FileText
    },
    {
      id: 2,
      type: 'email',
      title: 'Contract Renewal Discussion',
      timestamp: '2024-01-15T09:15:00Z',
      content: 'Email summary: Contract terms discussed, 15% price increase proposed.',
      tags: ['contract', 'vendor', 'pricing'],
      riskLevel: 'high',
      icon: Mail
    },
    {
      id: 3,
      type: 'tone',
      title: 'Team Communication Draft',
      timestamp: '2024-01-14T16:45:00Z',
      content: 'ToneAware revision: Professional tone for team budget meeting.',
      tags: ['communication', 'team', 'meeting'],
      riskLevel: 'low',
      icon: MessageSquare
    },
    {
      id: 4,
      type: 'outcome',
      title: 'Marketing Campaign Simulation',
      timestamp: '2024-01-14T14:20:00Z',
      content: 'Outcome simulation showed 3 risk scenarios for new campaign.',
      tags: ['marketing', 'simulation', 'risk'],
      riskLevel: 'medium',
      icon: Calendar
    }
  ];

  const filteredItems = memoryItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const filters = [
    { id: 'all', label: 'All Items', count: memoryItems.length },
    { id: 'digest', label: 'Digests', count: memoryItems.filter(i => i.type === 'digest').length },
    { id: 'email', label: 'Emails', count: memoryItems.filter(i => i.type === 'email').length },
    { id: 'tone', label: 'ToneAware', count: memoryItems.filter(i => i.type === 'tone').length },
    { id: 'outcome', label: 'Simulations', count: memoryItems.filter(i => i.type === 'outcome').length }
  ];

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Memory Keeper</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Download size={16} className="mr-2" />
          Export Timeline
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-slate-400" size={20} />
          <Input
            placeholder="Search memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter.id)}
              className="flex items-center space-x-2"
            >
              <span>{filter.label}</span>
              <Badge variant="secondary" className="ml-2">
                {filter.count}
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">127</p>
              <p className="text-sm text-slate-600">Total Memories</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">15h</p>
              <p className="text-sm text-slate-600">Time Saved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">23</p>
              <p className="text-sm text-slate-600">This Week</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">8</p>
              <p className="text-sm text-slate-600">High Priority</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock size={24} />
            <span>Timeline</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-slate-50 transition-colors border border-slate-200">
                  <div className={`p-2 rounded-lg ${
                    item.type === 'digest' ? 'bg-blue-100 text-blue-600' :
                    item.type === 'email' ? 'bg-green-100 text-green-600' :
                    item.type === 'tone' ? 'bg-purple-100 text-purple-600' :
                    'bg-orange-100 text-orange-600'
                  }`}>
                    <Icon size={20} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-slate-900">{item.title}</h3>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={
                            item.riskLevel === 'high' ? 'destructive' :
                            item.riskLevel === 'medium' ? 'default' :
                            'secondary'
                          }
                        >
                          {item.riskLevel}
                        </Badge>
                        <span className="text-sm text-slate-500">
                          {formatTimestamp(item.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-slate-700 mb-3">{item.content}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-8">
              <Clock className="mx-auto text-slate-400 mb-4" size={48} />
              <p className="text-slate-600">No memories found matching your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MemoryKeeper;
