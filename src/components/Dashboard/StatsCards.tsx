
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Users, 
  MessageSquare, 
  Clock,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

const stats = [
  {
    title: 'Chatbots Created',
    value: '12',
    change: '+3',
    changeType: 'increase',
    icon: Bot,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    description: 'Active chatbots'
  },
  {
    title: 'Active Users',
    value: '2,847',
    change: '+247',
    changeType: 'increase',
    icon: Users,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    description: 'This month'
  },
  {
    title: 'Messages/Day',
    value: '1,429',
    change: '+12%',
    changeType: 'increase',
    icon: MessageSquare,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    description: 'Average daily'
  },
  {
    title: 'Response Time',
    value: '0.8s',
    change: '-0.2s',
    changeType: 'decrease',
    icon: Clock,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    description: 'Average response'
  }
];

export const StatsCards = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold font-poppins text-gray-800 dark:text-gray-100">
        Performance Overview
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isIncrease = stat.changeType === 'increase';
          
          return (
            <Card key={stat.title} className="glass border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold font-poppins">{stat.value}</p>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          className={`text-xs px-2 py-1 ${
                            isIncrease 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          }`}
                        >
                          {isIncrease ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {stat.change}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {stat.description}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
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
