
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  MessageSquare, 
  Users, 
  Clock,
  Download,
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  Calendar,
  Bot,
  Eye,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

const timeRanges = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 3 months' },
  { value: 'custom', label: 'Custom range' }
];

const chatLogs = [
  {
    id: '1',
    timestamp: '2024-01-15 14:23:45',
    user: 'customer@email.com',
    bot: 'Support Assistant',
    messages: 8,
    duration: '4m 32s',
    satisfaction: 'Good',
    status: 'Resolved'
  },
  {
    id: '2',
    timestamp: '2024-01-15 14:18:12',
    user: 'john@company.com',
    bot: 'Sales Helper',
    messages: 12,
    duration: '7m 15s',
    satisfaction: 'Excellent',
    status: 'Converted'
  },
  {
    id: '3',
    timestamp: '2024-01-15 14:15:33',
    user: 'support@client.org',
    bot: 'FAQ Assistant',
    messages: 3,
    duration: '1m 45s',
    satisfaction: 'Poor',
    status: 'Escalated'
  },
  {
    id: '4',
    timestamp: '2024-01-15 14:12:08',
    user: 'info@business.net',
    bot: 'Support Assistant',
    messages: 5,
    duration: '3m 22s',
    satisfaction: 'Good',
    status: 'Resolved'
  }
];

const overviewStats = [
  {
    title: 'Total Conversations',
    value: '12,847',
    change: '+23.5%',
    changeType: 'increase',
    icon: MessageSquare,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    title: 'Active Bots',
    value: '8',
    change: '+2',
    changeType: 'increase',
    icon: Bot,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    title: 'Avg Response Time',
    value: '0.8s',
    change: '-0.3s',
    changeType: 'decrease',
    icon: Clock,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    title: 'User Satisfaction',
    value: '4.7/5',
    change: '+0.2',
    changeType: 'increase',
    icon: Users,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30'
  }
];

export const Analytics = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBot, setSelectedBot] = useState('all');

  const handleExport = (format: string) => {
    toast.success(`Exporting data as ${format.toUpperCase()}...`);
  };

  const filteredLogs = chatLogs.filter(log => 
    log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.bot.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-poppins">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor chatbot performance and user engagement metrics
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-48">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {timeRanges.map((range) => (
                <SelectItem key={range.value} value={range.value}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={() => handleExport('csv')}>
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          
          <Button variant="outline" onClick={() => handleExport('json')}>
            <Download className="w-4 h-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat) => {
          const Icon = stat.icon;
          const isIncrease = stat.changeType === 'increase';
          
          return (
            <Card key={stat.title} className="glass border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <div className="space-y-1">
                      <p className="text-2xl font-bold font-poppins">{stat.value}</p>
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

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="conversations">Conversations</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="users">User Behavior</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Message Volume Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  <div className="text-center space-y-2">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto" />
                    <p className="text-muted-foreground">Chart visualization would go here</p>
                    <p className="text-sm text-muted-foreground">Integration with charting library</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Bot Performance Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50/50 dark:bg-blue-950/30 rounded-lg">
                    <div>
                      <div className="font-medium">Support Assistant</div>
                      <div className="text-sm text-muted-foreground">45% of conversations</div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">4.8/5</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50/50 dark:bg-green-950/30 rounded-lg">
                    <div>
                      <div className="font-medium">Sales Helper</div>
                      <div className="text-sm text-muted-foreground">30% of conversations</div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">4.6/5</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-purple-50/50 dark:bg-purple-950/30 rounded-lg">
                    <div>
                      <div className="font-medium">FAQ Assistant</div>
                      <div className="text-sm text-muted-foreground">25% of conversations</div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800">4.4/5</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversations" className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chat Logs
                </CardTitle>
                
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search conversations..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  
                  <Select value={selectedBot} onValueChange={setSelectedBot}>
                    <SelectTrigger className="w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="All Bots" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Bots</SelectItem>
                      <SelectItem value="support">Support Assistant</SelectItem>
                      <SelectItem value="sales">Sales Helper</SelectItem>
                      <SelectItem value="faq">FAQ Assistant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Bot</TableHead>
                    <TableHead>Messages</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Satisfaction</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLogs.map((log) => (
                    <TableRow key={log.id} className="hover:bg-muted/30">
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.bot}</Badge>
                      </TableCell>
                      <TableCell>{log.messages}</TableCell>
                      <TableCell>{log.duration}</TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            log.satisfaction === 'Excellent' ? 'bg-green-100 text-green-800' :
                            log.satisfaction === 'Good' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }
                        >
                          {log.satisfaction}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={log.status === 'Resolved' ? 'default' : 'secondary'}
                          className={
                            log.status === 'Converted' ? 'bg-green-100 text-green-800' :
                            log.status === 'Escalated' ? 'bg-red-100 text-red-800' :
                            ''
                          }
                        >
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Response Time Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">&lt; 1 second</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 h-2 bg-muted rounded-full">
                        <div className="w-24 h-2 bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">75%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">1-3 seconds</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 h-2 bg-muted rounded-full">
                        <div className="w-16 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">20%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">&gt; 3 seconds</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 h-2 bg-muted rounded-full">
                        <div className="w-4 h-2 bg-red-500 rounded-full"></div>
                      </div>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Error Rate Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">0.3%</div>
                    <div className="text-sm text-muted-foreground">Current error rate</div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Database timeouts</span>
                      <span className="font-medium">40%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>API rate limits</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Model failures</span>
                      <span className="font-medium">25%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>User Engagement Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50/50 dark:bg-blue-950/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Peak Hours</span>
                      <Badge className="bg-blue-100 text-blue-800">9 AM - 11 AM</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Highest conversation volume during business hours
                    </p>
                  </div>
                  
                  <div className="p-4 bg-green-50/50 dark:bg-green-950/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Avg Session Duration</span>
                      <Badge className="bg-green-100 text-green-800">4m 23s</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Users spend good time engaging with bots
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-50/50 dark:bg-purple-950/30 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Return Rate</span>
                      <Badge className="bg-purple-100 text-purple-800">68%</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Users return within 7 days for more assistance
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle>Top User Queries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { query: 'How to reset password?', count: 247 },
                    { query: 'Pricing information', count: 189 },
                    { query: 'Technical support', count: 156 },
                    { query: 'Account settings', count: 134 },
                    { query: 'Integration help', count: 98 }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted/20 rounded-lg">
                      <span className="text-sm">{item.query}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{item.count}</Badge>
                        <Button variant="ghost" size="sm">
                          <ArrowRight className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
