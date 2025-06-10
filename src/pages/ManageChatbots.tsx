
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Bot, 
  Users, 
  Settings, 
  Copy, 
  Play, 
  Pause, 
  Edit, 
  Trash2, 
  Search,
  Plus,
  BarChart3,
  MessageSquare,
  Database,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

interface Chatbot {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'training';
  model: string;
  database: string;
  assignedUsers: number;
  totalConversations: number;
  lastActive: string;
  tenant: string;
  permissions: string[];
}

export const ManageChatbots = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTenant, setSelectedTenant] = useState('all');

  const [chatbots] = useState<Chatbot[]>([
    {
      id: '1',
      name: 'Customer Support Bot',
      description: 'Handles general customer inquiries and support tickets',
      status: 'active',
      model: 'GPT-4 Turbo',
      database: 'MongoDB - Support DB',
      assignedUsers: 12,
      totalConversations: 1247,
      lastActive: '2 minutes ago',
      tenant: 'Acme Corp',
      permissions: ['read', 'write']
    },
    {
      id: '2',
      name: 'Sales Assistant',
      description: 'Assists with product information and sales inquiries',
      status: 'active',
      model: 'Claude 3 Opus',
      database: 'PostgreSQL - Products DB',
      assignedUsers: 8,
      totalConversations: 892,
      lastActive: '15 minutes ago',
      tenant: 'Tech Solutions',
      permissions: ['read']
    },
    {
      id: '3',
      name: 'HR Onboarding Bot',
      description: 'Guides new employees through onboarding process',
      status: 'training',
      model: 'GPT-3.5 Turbo',
      database: 'MySQL - HR Database',
      assignedUsers: 25,
      totalConversations: 156,
      lastActive: '1 hour ago',
      tenant: 'Global Enterprises',
      permissions: ['read', 'write', 'delete']
    }
  ]);

  const filteredChatbots = chatbots.filter(bot => {
    const matchesSearch = bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bot.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTenant = selectedTenant === 'all' || bot.tenant === selectedTenant;
    return matchesSearch && matchesTenant;
  });

  const handleToggleStatus = (botId: string) => {
    toast.success('Chatbot status updated successfully');
  };

  const handleCloneBot = (botId: string) => {
    toast.success('Chatbot cloned successfully');
  };

  const handleDeleteBot = (botId: string) => {
    toast.success('Chatbot deleted successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
      case 'training': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-poppins">Manage Chatbots</h1>
          <p className="text-muted-foreground mt-2">
            Monitor, configure, and manage all your AI chatbots across tenants
          </p>
        </div>
        <Button className="bg-foreground text-background">
          <Plus className="w-4 h-4 mr-2" />
          Create New Chatbot
        </Button>
      </div>

      {/* Filters and Search */}
      <Card className="glass">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search chatbots..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="md:w-48">
              <select 
                className="w-full p-2 border border-border rounded-md bg-background"
                value={selectedTenant}
                onChange={(e) => setSelectedTenant(e.target.value)}
              >
                <option value="all">All Tenants</option>
                <option value="Acme Corp">Acme Corp</option>
                <option value="Tech Solutions">Tech Solutions</option>
                <option value="Global Enterprises">Global Enterprises</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Bot className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Chatbots</p>
                <p className="text-2xl font-bold">{chatbots.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{chatbots.reduce((sum, bot) => sum + bot.assignedUsers, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center">
              <MessageSquare className="w-8 h-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total Conversations</p>
                <p className="text-2xl font-bold">{chatbots.reduce((sum, bot) => sum + bot.totalConversations, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass">
          <CardContent className="p-6">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-orange-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Active Bots</p>
                <p className="text-2xl font-bold">{chatbots.filter(bot => bot.status === 'active').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chatbots List */}
      <div className="space-y-4">
        {filteredChatbots.map((bot) => (
          <Card key={bot.id} className="glass">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback>
                      <Bot className="w-6 h-6" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold font-poppins">{bot.name}</h3>
                      <Badge className={getStatusColor(bot.status)}>
                        {bot.status}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-3">{bot.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Tenant:</span>
                        <p className="font-medium">{bot.tenant}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Model:</span>
                        <p className="font-medium">{bot.model}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Database:</span>
                        <p className="font-medium">{bot.database}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Active:</span>
                        <p className="font-medium">{bot.lastActive}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4 mt-3 text-sm">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1 text-muted-foreground" />
                        <span>{bot.assignedUsers} users</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="w-4 h-4 mr-1 text-muted-foreground" />
                        <span>{bot.totalConversations} conversations</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Database className="w-4 h-4 text-muted-foreground" />
                        <span>Permissions:</span>
                        {bot.permissions.map((perm) => (
                          <Badge key={perm} variant="outline" className="text-xs">
                            {perm}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleStatus(bot.id)}
                  >
                    {bot.status === 'active' ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCloneBot(bot.id)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteBot(bot.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredChatbots.length === 0 && (
        <Card className="glass">
          <CardContent className="p-12 text-center">
            <Bot className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No chatbots found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? 'Try adjusting your search criteria' : 'Create your first chatbot to get started'}
            </p>
            <Button className="bg-foreground text-background">
              <Plus className="w-4 h-4 mr-2" />
              Create New Chatbot
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
