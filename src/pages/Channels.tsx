
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MessageSquare, Globe, Phone, Camera, Users, Plus, Settings, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface Channel {
  id: string;
  name: string;
  type: 'Web' | 'WhatsApp' | 'Instagram' | 'Facebook';
  status: 'Active' | 'Inactive';
  totalChats: number;
  activeChats: number;
  icon: React.ElementType;
}

const mockChannels: Channel[] = [
  {
    id: '1',
    name: 'Web Chat',
    type: 'Web',
    status: 'Active',
    totalChats: 1247,
    activeChats: 23,
    icon: Globe
  },
  {
    id: '2',
    name: 'WhatsApp Business',
    type: 'WhatsApp',
    status: 'Active',
    totalChats: 892,
    activeChats: 15,
    icon: Phone
  },
  {
    id: '3',
    name: 'Instagram DM',
    type: 'Instagram',
    status: 'Active',
    totalChats: 567,
    activeChats: 8,
    icon: Camera
  },
  {
    id: '4',
    name: 'Facebook Messenger',
    type: 'Facebook',
    status: 'Inactive',
    totalChats: 234,
    activeChats: 0,
    icon: Users
  }
];

export const Channels = () => {
  const navigate = useNavigate();
  const [channels, setChannels] = useState(mockChannels);
  const [configureDialogOpen, setConfigureDialogOpen] = useState(false);
  const [createChannelDialogOpen, setCreateChannelDialogOpen] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [newChannel, setNewChannel] = useState({
    name: '',
    type: 'Web' as const,
    description: '',
    apiKey: '',
    webhookUrl: ''
  });

  const toggleChannelStatus = (channelId: string) => {
    setChannels(prev => prev.map(channel => 
      channel.id === channelId 
        ? { ...channel, status: channel.status === 'Active' ? 'Inactive' : 'Active' }
        : channel
    ));
    toast.success('Channel status updated successfully');
  };

  const handleConfigure = (channel: Channel) => {
    setSelectedChannel(channel);
    setConfigureDialogOpen(true);
  };

  const handleSaveConfiguration = () => {
    toast.success('Channel configuration saved successfully');
    setConfigureDialogOpen(false);
  };

  const handleCreateChannel = () => {
    if (!newChannel.name || !newChannel.type) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newChannelData: Channel = {
      id: (channels.length + 1).toString(),
      name: newChannel.name,
      type: newChannel.type,
      status: 'Inactive',
      totalChats: 0,
      activeChats: 0,
      icon: newChannel.type === 'Web' ? Globe : 
            newChannel.type === 'WhatsApp' ? Phone :
            newChannel.type === 'Instagram' ? Camera : Users
    };

    setChannels(prev => [...prev, newChannelData]);
    setNewChannel({ name: '', type: 'Web', description: '', apiKey: '', webhookUrl: '' });
    setCreateChannelDialogOpen(false);
    toast.success('Channel created successfully');
  };

  const handleConnectToIntegration = () => {
    navigate('/integrations');
    toast.info('Redirecting to integrations page...');
  };

  const getChannelColor = (type: string) => {
    switch (type) {
      case 'Web':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'WhatsApp':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'Instagram':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      case 'Facebook':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-poppins">Channels</h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage your communication channels
          </p>
        </div>
        <Dialog open={createChannelDialogOpen} onOpenChange={setCreateChannelDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-foreground text-background">
              <Plus className="w-4 h-4 mr-2" />
              Create Channel
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Channel</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="channel-name">Channel Name</Label>
                <Input
                  id="channel-name"
                  value={newChannel.name}
                  onChange={(e) => setNewChannel(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter channel name"
                />
              </div>
              
              <div>
                <Label>Channel Type</Label>
                <Select value={newChannel.type} onValueChange={(value: any) => setNewChannel(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Web">Web Chat</SelectItem>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="channel-description">Description</Label>
                <Textarea
                  id="channel-description"
                  value={newChannel.description}
                  onChange={(e) => setNewChannel(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Channel description"
                  rows={3}
                />
              </div>

              <div className="flex space-x-2">
                <Button onClick={handleConnectToIntegration} variant="outline" className="flex-1">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Connect Integration
                </Button>
                <Button onClick={handleCreateChannel} className="flex-1">
                  Create Channel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Channels
            </CardTitle>
            <MessageSquare className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">{channels.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Configured channels
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Channels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">
              {channels.filter(c => c.status === 'Active').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently online
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Chats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">
              {channels.reduce((sum, c) => sum + c.activeChats, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Ongoing conversations
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">
              {channels.reduce((sum, c) => sum + c.totalChats, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              All time
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Channels List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {channels.map((channel) => {
          const Icon = channel.icon;
          return (
            <Card key={channel.id} className="glass hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="font-poppins text-lg">{channel.name}</CardTitle>
                      <Badge className={getChannelColor(channel.type)}>
                        {channel.type}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {channel.status === 'Active' ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                    )}
                    <Switch
                      checked={channel.status === 'Active'}
                      onCheckedChange={() => toggleChannelStatus(channel.id)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Chats</p>
                    <p className="text-2xl font-bold font-poppins">{channel.totalChats.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Now</p>
                    <p className="text-2xl font-bold font-poppins text-green-600">{channel.activeChats}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Status: {channel.status}
                    </span>
                    <Button variant="outline" size="sm" onClick={() => handleConfigure(channel)}>
                      <Settings className="w-4 h-4 mr-1" />
                      Configure
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Configure Channel Dialog */}
      <Dialog open={configureDialogOpen} onOpenChange={setConfigureDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Configure {selectedChannel?.name}</DialogTitle>
          </DialogHeader>
          {selectedChannel && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="config-name">Channel Name</Label>
                  <Input id="config-name" defaultValue={selectedChannel.name} />
                </div>
                <div>
                  <Label>Channel Type</Label>
                  <Select defaultValue={selectedChannel.type}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Web">Web Chat</SelectItem>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="api-key">API Key</Label>
                <Input id="api-key" type="password" placeholder="Enter API key" />
              </div>

              <div>
                <Label htmlFor="webhook-url">Webhook URL</Label>
                <Input id="webhook-url" placeholder="https://your-webhook-url.com" />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Channel description" rows={3} />
              </div>

              <div className="flex justify-between">
                <Button onClick={handleConnectToIntegration} variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Manage Integrations
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setConfigureDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveConfiguration}>
                    Save Configuration
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
