
import React from 'react';
import { WelcomeSection } from '@/components/Dashboard/WelcomeSection';
import { QuickActionCards } from '@/components/Dashboard/QuickActionCards';
import { LatestMessages } from '@/components/Dashboard/LatestMessages';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, MessageSquare, Zap } from 'lucide-react';

export const Dashboard = () => {
  const quickStats = [
    {
      title: 'Active Campaigns',
      value: '12',
      change: '+23%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Total Reach',
      value: '84.2K',
      change: '+12%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Engagement Rate',
      value: '7.8%',
      change: '+5.4%',
      icon: MessageSquare,
      color: 'text-purple-600'
    },
    {
      title: 'AI Generations',
      value: '156',
      change: '+67%',
      icon: Zap,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <WelcomeSection />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="glass border-0 rounded-2xl shadow-lg hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        {stat.change}
                      </Badge>
                    </div>
                  </div>
                  <div className={`p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-100">
          Quick Actions
        </h2>
        <QuickActionCards />
      </div>

      {/* Messages and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LatestMessages />
        
        <Card className="glass border-0 rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50/50 to-blue-50/50 rounded-xl">
                <div>
                  <p className="font-medium">Content Performance</p>
                  <p className="text-sm text-muted-foreground">Average engagement across all platforms</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">8.4%</p>
                  <p className="text-xs text-green-600">+2.1% from last week</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-xl">
                <div>
                  <p className="font-medium">AI Efficiency</p>
                  <p className="text-sm text-muted-foreground">Time saved through automation</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">24.5h</p>
                  <p className="text-xs text-blue-600">This month</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-xl">
                <div>
                  <p className="font-medium">Response Rate</p>
                  <p className="text-sm text-muted-foreground">Customer engagement rate</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-600">92%</p>
                  <p className="text-xs text-purple-600">+5% improvement</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
