
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Database, 
  Users, 
  BarChart3,
  Plus,
  Zap,
  MessageSquare,
  Settings
} from 'lucide-react';

const quickActions = [
  {
    title: 'Create Chatbot',
    description: 'Build a new AI chatbot in minutes',
    icon: Bot,
    href: '/chatbot',
    color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    badge: 'Popular',
    badgeColor: 'bg-orange-500'
  },
  {
    title: 'Connect Database',
    description: 'Link your data for smarter responses',
    icon: Database,
    href: '/database',
    color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    badge: null,
    badgeColor: ''
  },
  {
    title: 'Invite Users',
    description: 'Add team members and assign roles',
    icon: Users,
    href: '/users',
    color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    badge: null,
    badgeColor: ''
  },
  {
    title: 'View Analytics',
    description: 'Track performance and engagement',
    icon: BarChart3,
    href: '/analytics',
    color: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
    badge: 'New',
    badgeColor: 'bg-green-500'
  }
];

export const QuickActionsGrid = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold font-poppins text-gray-800 dark:text-gray-100">
        Quick Actions
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link key={action.title} to={action.href}>
              <Card className="glass hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mx-auto`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    {action.badge && (
                      <Badge className={`absolute -top-2 -right-2 ${action.badgeColor} text-white text-xs px-2 py-1`}>
                        {action.badge}
                      </Badge>
                    )}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-base mb-1">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  
                  <Button size="sm" variant="outline" className="w-full">
                    <Plus className="w-4 h-4 mr-2" />
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
