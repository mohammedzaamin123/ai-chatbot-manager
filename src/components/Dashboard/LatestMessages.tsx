
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MessageSquare, Clock, ArrowRight } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  avatar?: string;
  platform: 'WhatsApp' | 'Instagram' | 'Facebook' | 'Web';
  message: string;
  time: string;
  status: 'new' | 'replied' | 'pending';
}

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'Sarah Johnson',
    platform: 'WhatsApp',
    message: 'Hi! I\'m interested in your premium package. Can you provide more details?',
    time: '2 min ago',
    status: 'new'
  },
  {
    id: '2',
    sender: 'Mike Chen',
    platform: 'Instagram',
    message: 'Love your latest post! When will you have new products available?',
    time: '15 min ago',
    status: 'replied'
  },
  {
    id: '3',
    sender: 'Emma Rodriguez',
    platform: 'Facebook',
    message: 'Could you help me with my order? I haven\'t received tracking info.',
    time: '1 hour ago',
    status: 'pending'
  },
  {
    id: '4',
    sender: 'David Wilson',
    platform: 'Web',
    message: 'Great service! Quick question about your return policy.',
    time: '2 hours ago',
    status: 'replied'
  }
];

const getPlatformColor = (platform: string) => {
  switch (platform) {
    case 'WhatsApp':
      return 'bg-green-100 text-green-800';
    case 'Instagram':
      return 'bg-pink-100 text-pink-800';
    case 'Facebook':
      return 'bg-blue-100 text-blue-800';
    case 'Web':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'new':
      return 'bg-red-100 text-red-800';
    case 'replied':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const LatestMessages = () => {
  return (
    <Card className="glass border-0 rounded-2xl shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-xl font-semibold">Latest Messages</CardTitle>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl">
            View All
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockMessages.map((message) => (
          <div 
            key={message.id} 
            className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-xl hover:from-blue-50 hover:to-purple-50 transition-colors cursor-pointer"
          >
            <Avatar className="w-10 h-10">
              <AvatarImage src={message.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-400 text-white">
                {message.sender.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                  {message.sender}
                </h4>
                <div className="flex items-center space-x-2">
                  <Badge 
                    className={`text-xs px-2 py-1 ${getPlatformColor(message.platform)}`}
                  >
                    {message.platform}
                  </Badge>
                  <Badge 
                    className={`text-xs px-2 py-1 ${getStatusColor(message.status)}`}
                  >
                    {message.status}
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {message.message}
              </p>
              
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="w-3 h-3 mr-1" />
                {message.time}
              </div>
            </div>
          </div>
        ))}
        
        <div className="pt-2">
          <Button className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
            Open Messaging Hub
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
