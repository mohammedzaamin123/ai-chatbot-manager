
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  delay?: number;
}

const MetricCard = ({ title, value, subtitle, trend, delay = 0 }: MetricCardProps) => (
  <Card className="glass hover-lift" style={{ animationDelay: `${delay}ms` }}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold font-poppins">{value}</div>
      {subtitle && (
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      )}
      {trend && (
        <p className="text-xs text-green-600 dark:text-green-400 mt-1">{trend}</p>
      )}
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold font-poppins">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to your AI chatbot platform overview
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Tenants"
          value={24}
          subtitle="Active organizations"
          trend="+12% from last month"
          delay={0}
        />
        <MetricCard
          title="Active Chats"
          value="1,432"
          subtitle="Web, WhatsApp, IG, FB"
          trend="+5.2% from yesterday"
          delay={100}
        />
        <MetricCard
          title="API Requests Today"
          value="89,247"
          subtitle="Across all endpoints"
          trend="+23% from yesterday"
          delay={200}
        />
        <MetricCard
          title="Pending Webhooks"
          value={7}
          subtitle="Delivery queue"
          trend="Normal load"
          delay={300}
        />
      </div>

      {/* Additional Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="font-poppins">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                'New tenant "Acme Corp" added',
                'API key generated for tenant ID: 1234',
                'Webhook delivery failed for tenant "TechStart"',
                'User role updated: john@example.com → Admin',
                'Database connection established for "RetailPlus"'
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 rounded hover:bg-muted/30 transition-colors">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">{activity}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader>
            <CardTitle className="font-poppins">System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { service: 'API Gateway', status: 'Operational', color: 'bg-green-500' },
                { service: 'Database', status: 'Operational', color: 'bg-green-500' },
                { service: 'Webhook Service', status: 'Operational', color: 'bg-green-500' },
                { service: 'Chat Engine', status: 'Operational', color: 'bg-green-500' },
                { service: 'File Storage', status: 'Degraded', color: 'bg-yellow-500' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded hover:bg-muted/30 transition-colors">
                  <span className="text-sm font-medium">{item.service}</span>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${item.color}`}></div>
                    <span className="text-xs text-muted-foreground">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
