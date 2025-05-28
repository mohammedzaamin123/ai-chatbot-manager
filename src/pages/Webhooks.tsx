
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Send, Settings, Activity, Clock, CheckCircle, XCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Webhook {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'Active' | 'Inactive' | 'Failed';
  lastTriggered: string;
  successRate: number;
}

const mockWebhooks: Webhook[] = [
  {
    id: '1',
    name: 'User Registration Hook',
    url: 'https://api.example.com/webhooks/user-registration',
    events: ['user.created', 'user.verified'],
    status: 'Active',
    lastTriggered: '2024-01-15 14:30',
    successRate: 98.5
  },
  {
    id: '2',
    name: 'Chat Completion Hook',
    url: 'https://api.example.com/webhooks/chat-complete',
    events: ['chat.completed', 'chat.escalated'],
    status: 'Active',
    lastTriggered: '2024-01-15 12:15',
    successRate: 95.2
  },
  {
    id: '3',
    name: 'Payment Processing',
    url: 'https://api.example.com/webhooks/payment',
    events: ['payment.success', 'payment.failed'],
    status: 'Failed',
    lastTriggered: '2024-01-14 16:45',
    successRate: 87.3
  }
];

const availableEvents = [
  'user.created',
  'user.verified',
  'user.deleted',
  'chat.started',
  'chat.completed',
  'chat.escalated',
  'payment.success',
  'payment.failed',
  'tenant.created',
  'tenant.updated'
];

export const Webhooks = () => {
  const [webhooks, setWebhooks] = useState(mockWebhooks);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newWebhook, setNewWebhook] = useState({
    name: '',
    url: '',
    events: [] as string[],
    retryCount: 3,
    timeout: 30
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'Inactive':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
      case 'Failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return '';
    }
  };

  const handleAddWebhook = () => {
    if (!newWebhook.name || !newWebhook.url || newWebhook.events.length === 0) return;

    const webhook: Webhook = {
      id: (webhooks.length + 1).toString(),
      name: newWebhook.name,
      url: newWebhook.url,
      events: newWebhook.events,
      status: 'Active',
      lastTriggered: 'Never',
      successRate: 100
    };

    setWebhooks([...webhooks, webhook]);
    setNewWebhook({ name: '', url: '', events: [], retryCount: 3, timeout: 30 });
    setIsAddModalOpen(false);
  };

  const handleEventToggle = (event: string) => {
    setNewWebhook(prev => ({
      ...prev,
      events: prev.events.includes(event)
        ? prev.events.filter(e => e !== event)
        : [...prev.events, event]
    }));
  };

  const toggleWebhookStatus = (id: string) => {
    setWebhooks(prev => prev.map(webhook => 
      webhook.id === id 
        ? { ...webhook, status: webhook.status === 'Active' ? 'Inactive' : 'Active' as 'Active' | 'Inactive' | 'Failed' }
        : webhook
    ));
  };

  const testWebhook = (webhook: Webhook) => {
    console.log('Testing webhook:', webhook.name);
    // In real implementation, this would send a test payload
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-poppins">Webhooks</h1>
          <p className="text-muted-foreground mt-2">
            Manage webhook endpoints and event subscriptions
          </p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-foreground text-background hover:bg-foreground/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Webhook
            </Button>
          </DialogTrigger>
          <DialogContent className="glass max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-poppins">Add New Webhook</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="webhook-name">Webhook Name</Label>
                  <Input
                    id="webhook-name"
                    value={newWebhook.name}
                    onChange={(e) => setNewWebhook(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., User Registration Hook"
                  />
                </div>
                <div>
                  <Label htmlFor="webhook-url">Endpoint URL</Label>
                  <Input
                    id="webhook-url"
                    type="url"
                    value={newWebhook.url}
                    onChange={(e) => setNewWebhook(prev => ({ ...prev, url: e.target.value }))}
                    placeholder="https://api.example.com/webhooks"
                  />
                </div>
              </div>

              <div>
                <Label>Event Subscriptions</Label>
                <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto">
                  {availableEvents.map(event => (
                    <div key={event} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={event}
                        checked={newWebhook.events.includes(event)}
                        onChange={() => handleEventToggle(event)}
                        className="rounded border-border"
                      />
                      <Label htmlFor={event} className="text-sm font-mono">
                        {event}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="retry-count">Retry Count</Label>
                  <Input
                    id="retry-count"
                    type="number"
                    value={newWebhook.retryCount}
                    onChange={(e) => setNewWebhook(prev => ({ ...prev, retryCount: parseInt(e.target.value) }))}
                    min="0"
                    max="10"
                  />
                </div>
                <div>
                  <Label htmlFor="timeout">Timeout (seconds)</Label>
                  <Input
                    id="timeout"
                    type="number"
                    value={newWebhook.timeout}
                    onChange={(e) => setNewWebhook(prev => ({ ...prev, timeout: parseInt(e.target.value) }))}
                    min="5"
                    max="300"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddWebhook}
                  className="bg-foreground text-background"
                >
                  Create Webhook
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Webhooks
            </CardTitle>
            <Settings className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">{webhooks.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Configured endpoints
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Webhooks
            </CardTitle>
            <Activity className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">
              {webhooks.filter(w => w.status === 'Active').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Failed Webhooks
            </CardTitle>
            <XCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">
              {webhooks.filter(w => w.status === 'Failed').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Need attention
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Success Rate
            </CardTitle>
            <CheckCircle className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">
              {(webhooks.reduce((acc, w) => acc + w.successRate, 0) / webhooks.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Delivery success
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-poppins">Webhook Endpoints</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Events</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Success Rate</TableHead>
                <TableHead>Last Triggered</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {webhooks.map((webhook) => (
                <TableRow key={webhook.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{webhook.name}</TableCell>
                  <TableCell className="font-mono text-sm text-muted-foreground max-w-xs truncate">
                    {webhook.url}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {webhook.events.slice(0, 2).map(event => (
                        <Badge key={event} variant="outline" className="text-xs">
                          {event}
                        </Badge>
                      ))}
                      {webhook.events.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{webhook.events.length - 2}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(webhook.status)}>
                      {webhook.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-foreground" 
                          style={{ width: `${webhook.successRate}%` }}
                        />
                      </div>
                      <span className="text-sm">{webhook.successRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{webhook.lastTriggered}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={webhook.status === 'Active'}
                        onCheckedChange={() => toggleWebhookStatus(webhook.id)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => testWebhook(webhook)}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
