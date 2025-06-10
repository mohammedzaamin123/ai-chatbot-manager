
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Zap,
  BarChart3,
  Eye,
  Heart,
  Share2,
  Calendar
} from 'lucide-react';

export const Analytics = () => {
  const performanceMetrics = [
    {
      title: 'Total Reach',
      value: '124.5K',
      change: '+15.2%',
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Engagement',
      value: '8.4%',
      change: '+3.1%',
      icon: Heart,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Shares',
      value: '2.1K',
      change: '+12.8%',
      icon: Share2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Messages',
      value: '456',
      change: '+8.5%',
      icon: MessageSquare,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100'
    }
  ];

  const platformData = [
    { platform: 'Instagram', followers: '45.2K', engagement: '9.2%', growth: '+18%' },
    { platform: 'Facebook', followers: '32.1K', engagement: '6.8%', growth: '+12%' },
    { platform: 'Twitter', followers: '28.7K', engagement: '4.5%', growth: '+8%' },
    { platform: 'LinkedIn', followers: '18.4K', engagement: '11.2%', growth: '+22%' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground">
          Track your social media performance and engagement metrics
        </p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {performanceMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.title} className="glass border-0 rounded-2xl shadow-lg hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {metric.title}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        {metric.change}
                      </Badge>
                    </div>
                  </div>
                  <div className={`p-3 ${metric.bgColor} rounded-xl`}>
                    <Icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Platform Performance */}
      <Card className="glass border-0 rounded-2xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
            Platform Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {platformData.map((platform) => (
              <div key={platform.platform} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-xl">
                <div>
                  <h3 className="font-medium">{platform.platform}</h3>
                  <p className="text-sm text-muted-foreground">{platform.followers} followers</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{platform.engagement}</p>
                  <p className="text-sm text-green-600">{platform.growth}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass border-0 rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
              Growth Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-green-50/50 to-blue-50/50 rounded-xl">
                <h4 className="font-medium">This Week</h4>
                <p className="text-2xl font-bold text-green-600">+2.4K</p>
                <p className="text-sm text-muted-foreground">New followers</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-xl">
                <h4 className="font-medium">This Month</h4>
                <p className="text-2xl font-bold text-blue-600">+8.7K</p>
                <p className="text-sm text-muted-foreground">Total reach</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-0 rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-600" />
              Top Performing Posts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-purple-50/50 to-pink-50/50 rounded-xl">
                <h4 className="font-medium">AI Marketing Tips</h4>
                <p className="text-sm text-muted-foreground mb-2">Posted 2 days ago</p>
                <div className="flex space-x-4 text-sm">
                  <span className="text-purple-600">1.2K likes</span>
                  <span className="text-blue-600">89 shares</span>
                </div>
              </div>
              <div className="p-4 bg-gradient-to-r from-teal-50/50 to-green-50/50 rounded-xl">
                <h4 className="font-medium">Product Launch</h4>
                <p className="text-sm text-muted-foreground mb-2">Posted 5 days ago</p>
                <div className="flex space-x-4 text-sm">
                  <span className="text-teal-600">956 likes</span>
                  <span className="text-green-600">124 shares</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
