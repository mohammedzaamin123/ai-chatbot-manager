
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { MessageSquare, Globe, Phone, Camera, Users } from 'lucide-react';

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
  const [channels, setChannels] = useState(mockChannels);

  const toggleChannelStatus = (channelId: string) => {
    setChannels(prev => prev.map(channel => 
      channel.id === channelId 
        ? { ...channel, status: channel.status === 'Active' ? 'Inactive' : 'Active' }
        : channel
    ));
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
      <div>
        <h1 className="text-3xl font-bold font-poppins">Channels</h1>
        <p className="text-muted-foreground mt-2">
          Monitor and manage your communication channels
        </p>
      </div>

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
                  <Switch
                    checked={channel.status === 'Active'}
                    onCheckedChange={() => toggleChannelStatus(channel.id)}
                  />
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
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
