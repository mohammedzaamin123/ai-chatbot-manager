
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
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
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTenant, setSelectedTenant] = useState('all');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedChatbot, setSelectedChatbot] = useState<Chatbot | null>(null);
  const [newChatbot, setNewChatbot] = useState({
    name: '',
    description: '',
    model: 'gpt-4-turbo',
    database: 'mongodb-support',
    tenant: 'Acme Corp'
  });

  const [chatbots, setChatbots] = useState<Chatbot[]>([
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
    setChatbots(prev => prev.map(bot => 
      bot.id === botId 
        ? { ...bot, status: bot.status === 'active' ? 'inactive' : 'active' }
        : bot
    ));
    toast.success('Chatbot status updated successfully');
  };

  const handleCloneBot = (botId: string) => {
    const botToClone = chatbots.find(bot => bot.id === botId);
    if (botToClone) {
      const clonedBot: Chatbot = {
        ...botToClone,
        id: (chatbots.length + 1).toString(),
        name: `${botToClone.name} (Copy)`,
        status: 'inactive',
        totalConversations: 0,
        lastActive: 'Never'
      };
      setChatbots(prev => [...prev, clonedBot]);
      toast.success('Chatbot cloned successfully');
    }
  };

  const handleDeleteBot = (botId: string) => {
    setChatbots(prev => prev.filter(bot => bot.id !== botId));
    toast.success('Chatbot deleted successfully');
  };

  const handleEditBot = (bot: Chatbot) => {
    setSelectedChatbot(bot);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (selectedChatbot) {
      setChatbots(prev => prev.map(bot => 
        bot.id === selectedChatbot.id ? selectedChatbot : bot
      ));
      setEditDialogOpen(false);
      toast.success('Chatbot updated successfully');
    }
  };

  const handleCreateChatbot = () => {
    if (!newChatbot.name || !newChatbot.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    const chatbotData: Chatbot = {
      id: (chatbots.length + 1).toString(),
      name: newChatbot.name,
      description: newChatbot.description,
      status: 'inactive',
      model: newChatbot.model,
      database: newChatbot.database,
      assignedUsers: 0,
      totalConversations: 0,
      lastActive: 'Never',
      tenant: newChatbot.tenant,
      permissions: ['read']
    };

    setChatbots(prev => [...prev, chatbotData]);
    setNewChatbot({ name: '', description: '', model: 'gpt-4-turbo', database: 'mongodb-support', tenant: 'Acme Corp' });
    setCreateDialogOpen(false);
    toast.success('Chatbot created successfully');
  };

  const handleSettings = (botId: string) => {
    navigate('/chatbot');
    toast.info('Opening chatbot configuration...');
  };

  const handleViewDetails = (botId: string) => {
    toast.info('Opening detailed analytics...');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'inactive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
      case 'training': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive': return <AlertCircle className="w-4 h-4 text-gray-400" />;
      case 'training': return <Clock className="w-4 h-4 text-blue-500 animate-pulse" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-400" />;
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
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-foreground text-background">
              <Plus className="w-4 h-4 mr-2" />
              Create New Chatbot
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Chatbot</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="chatbot-name">Chatbot Name</Label>
                <Input
                  id="chatbot-name"
                  value={newChatbot.name}
                  onChange={(e) => setNewChatbot(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter chatbot name"
                />
              </div>
              
              <div>
                <Label htmlFor="chatbot-description">Description</Label>
                <Textarea
                  id="chatbot-description"
                  value={newChatbot.description}
                  onChange={(e) => setNewChatbot(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this chatbot does..."
                  rows={3}
                />
              </div>

              <div>
                <Label>AI Model</Label>
                <Select value={newChatbot.model} onValueChange={(value) => setNewChatbot(prev => ({ ...prev, model: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                    <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Database</Label>
                <Select value={newChatbot.database} onValueChange={(value) => setNewChatbot(prev => ({ ...prev, database: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mongodb-support">MongoDB - Support DB</SelectItem>
                    <SelectItem value="postgresql-products">PostgreSQL - Products DB</SelectItem>
                    <SelectItem value="mysql-hr">MySQL - HR Database</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Tenant</Label>
                <Select value={newChatbot.tenant} onValueChange={(value) => setNewChatbot(prev => ({ ...prev, tenant: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Acme Corp">Acme Corp</SelectItem>
                    <SelectItem value="Tech Solutions">Tech Solutions</SelectItem>
                    <SelectItem value="Global Enterprises">Global Enterprises</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleCreateChatbot} className="flex-1">
                  Create Chatbot
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
              <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tenants</SelectItem>
                  <SelectItem value="Acme Corp">Acme Corp</SelectItem>
                  <SelectItem value="Tech Solutions">Tech Solutions</SelectItem>
                  <SelectItem value="Global Enterprises">Global Enterprises</SelectItem>
                </SelectContent>
              </Select>
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
          <Card key={bot.id} className="glass hover:shadow-lg transition-shadow">
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
                      {getStatusIcon(bot.status)}
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
                    title={bot.status === 'active' ? 'Pause chatbot' : 'Start chatbot'}
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
                    title="Clone chatbot"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditBot(bot)}
                    title="Edit chatbot"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(bot.id)}
                    title="View details"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleSettings(bot.id)}
                    title="Configure chatbot"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        title="Delete chatbot"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Chatbot</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete "{bot.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDeleteBot(bot.id)} className="bg-red-600 hover:bg-red-700">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
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
            <Button className="bg-foreground text-background" onClick={() => setCreateDialogOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create New Chatbot
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Edit Chatbot Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Chatbot</DialogTitle>
          </DialogHeader>
          {selectedChatbot && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Chatbot Name</Label>
                <Input
                  id="edit-name"
                  value={selectedChatbot.name}
                  onChange={(e) => setSelectedChatbot(prev => prev ? { ...prev, name: e.target.value } : null)}
                />
              </div>
              
              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={selectedChatbot.description}
                  onChange={(e) => setSelectedChatbot(prev => prev ? { ...prev, description: e.target.value } : null)}
                  rows={3}
                />
              </div>

              <div>
                <Label>AI Model</Label>
                <Select value={selectedChatbot.model} onValueChange={(value) => setSelectedChatbot(prev => prev ? { ...prev, model: value } : null)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GPT-4 Turbo">GPT-4 Turbo</SelectItem>
                    <SelectItem value="GPT-3.5 Turbo">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="Claude 3 Opus">Claude 3 Opus</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setEditDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleSaveEdit} className="flex-1">
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
