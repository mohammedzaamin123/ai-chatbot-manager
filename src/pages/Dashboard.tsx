
import React from 'react';
import { WelcomeBanner } from '@/components/Dashboard/WelcomeBanner';
import { QuickActionsGrid } from '@/components/Dashboard/QuickActionsGrid';
import { StatsCards } from '@/components/Dashboard/StatsCards';
import { RecentActivity } from '@/components/Dashboard/RecentActivity';
import { LatestMessages } from '@/components/Dashboard/LatestMessages';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

export const Dashboard = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Stats Cards */}
      <StatsCards />

      {/* Quick Actions */}
      <QuickActionsGrid />

      {/* Messages and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <LatestMessages />
      </div>

      {/* Performance Overview */}
      <Card className="glass border-0 rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center font-poppins">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Performance Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50/50 to-blue-50/50 dark:from-green-950/30 dark:to-blue-950/30 rounded-xl">
              <div>
                <p className="font-medium">Content Performance</p>
                <p className="text-sm text-muted-foreground">Average engagement across all platforms</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">8.4%</p>
                <p className="text-xs text-green-600">+2.1% from last week</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-xl">
              <div>
                <p className="font-medium">AI Efficiency</p>
                <p className="text-sm text-muted-foreground">Time saved through automation</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">24.5h</p>
                <p className="text-xs text-blue-600">This month</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50/50 to-pink-50/50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl">
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
  );
};
