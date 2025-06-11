
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  AlertTriangle, 
  UserPlus, 
  Bot,
  ExternalLink,
  Clock
} from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'message',
    title: 'New conversation started',
    description: 'Customer asked about product pricing',
    bot: 'Support Assistant',
    timestamp: '2 minutes ago',
    status: 'active',
    icon: MessageSquare,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    id: 2,
    type: 'error',
    title: 'Bot response failed',
    description: 'Database connection timeout',
    bot: 'Sales Helper',
    timestamp: '15 minutes ago',
    status: 'error',
    icon: AlertTriangle,
    color: 'text-red-600',
    bgColor: 'bg-red-100 dark:bg-red-900/30'
  },
  {
    id: 3,
    type: 'user',
    title: 'Team member invited',
    description: 'sarah@company.com joined as Manager',
    bot: null,
    timestamp: '1 hour ago',
    status: 'success',
    icon: UserPlus,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    id: 4,
    type: 'bot',
    title: 'Chatbot deployed',
    description: 'FAQ Assistant is now live',
    bot: 'FAQ Assistant',
    timestamp: '2 hours ago',
    status: 'success',
    icon: Bot,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    id: 5,
    type: 'message',
    title: 'High volume detected',
    description: '50+ messages in the last hour',
    bot: 'Support Assistant',
    timestamp: '3 hours ago',
    status: 'warning',
    icon: MessageSquare,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30'
  }
];

export const RecentActivity = () => {
  return (
    <Card className="glass border-0 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-poppins text-lg">Recent Activity</CardTitle>
        <Button variant="outline" size="sm">
          <ExternalLink className="w-4 h-4 mr-2" />
          View All
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <div className={`p-2 rounded-lg ${activity.bgColor} flex-shrink-0`}>
                <Icon className={`w-4 h-4 ${activity.color}`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-sm">{activity.title}</h4>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                
                {activity.bot && (
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      {activity.bot}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        
        <div className="text-center pt-4">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Load more activities
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
