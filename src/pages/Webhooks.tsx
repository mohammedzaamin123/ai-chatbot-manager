
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Plus, Webhook, Send, MoreHorizontal, Play, Pause } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface WebhookEndpoint {
  id: string;
  name: string;
  url: string;
  events: string[];
  status: 'Active' | 'Inactive';
  lastTriggered: string;
  successRate: number;
  totalCalls: number;
}

const mockWebhooks: WebhookEndpoint[] = [
  {
    id: '1',
    name: 'Message Received',
    url: 'https://api.example.com/webhook/message',
    events: ['message.received', 'message.sent'],
    status: 'Active',
    lastTriggered: '2024-01-15 14:30',
    successRate: 98.5,
    totalCalls: 1247
  },
  {
    id: '2',
    name: 'User Registration',
    url: 'https://api.example.com/webhook/user',
    events: ['user.created', 'user.updated'],
    status: 'Active',
    lastTriggered: '2024-01-15 12:15',
    successRate: 100,
    totalCalls: 89
  },
  {
    id: '3',
    name: 'Chat Session',
    url: 'https://api.example.com/webhook/session',
    events: ['session.started', 'session.ended'],
    status: 'Inactive',
    lastTriggered: '2024-01-10 16:20',
    successRate: 87.2,
    totalCalls: 456
  }
];

export const Webhooks = () => {
  const [webhooks, setWebhooks] = useState(mockWebhooks);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newWebhook, setNewWebhook] = useState({
    name: '',
    url: '',
    events: [] as string[]
  });

  const toggleWebhookStatus = (webhookId: string) => {
    setWebhooks(prev => prev.map(webhook => 
      webhook.id === webhookId 
        ? { ...webhook, status: webhook.status === 'Active' ? 'Inactive' : 'Active' }
        : webhook
    ));
  };

  const handleAddWebhook = () => {
    const webhook: WebhookEndpoint = {
      id: Date.now().toString(),
      name: newWebhook.name,
      url: newWebhook.url,
      events: newWebhook.events,
      status: 'Active',
      lastTriggered: 'Never',
      successRate: 0,
      totalCalls: 0
    };

    setWebhooks(prev => [...prev, webhook]);
    setIsAddModalOpen(false);
    setNewWebhook({ name: '', url: '', events: [] });
  };

  const testWebhook = (webhookId: string) => {
    console.log('Testing webhook:', webhookId);
    // In real implementation, this would send a test request
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-poppins">Webhooks</h1>
          <p className="text-muted-foreground mt-2">
            Configure webhook endpoints for real-time event notifications
          </p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-foreground text-background hover:bg-foreground/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Webhook
            </Button>
          </DialogTrigger>
          <DialogContent className="glass">
            <DialogHeader>
              <DialogTitle className="font-poppins">Add New Webhook</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="webhook-name">Webhook Name</Label>
                <Input
                  id="webhook-name"
                  value={newWebhook.name}
                  onChange={(e) => setNewWebhook(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Message Handler"
                />
              </div>
              
              <div>
                <Label htmlFor="webhook-url">Endpoint URL</Label>
                <Input
                  id="webhook-url"
                  type="url"
                  value={newWebhook.url}
                  onChange={(e) => setNewWebhook(prev => ({ ...prev, url: e.target.value }))}
                  placeholder="https://your-api.com/webhook"
                />
              </div>
              
              <div>
                <Label>Events</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    'message.received',
                    'message.sent',
                    'user.created',
                    'user.updated',
                    'session.started',
                    'session.ended'
                  ].map((event) => (
                    <label key={event} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newWebhook.events.includes(event)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewWebhook(prev => ({ 
                              ...prev, 
                              events: [...prev.events, event] 
                            }));
                          } else {
                            setNewWebhook(prev => ({ 
                              ...prev, 
                              events: prev.events.filter(e => e !== event) 
                            }));
                          }
                        }}
                      />
                      <span className="text-sm">{event}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddWebhook}
                  disabled={!newWebhook.name || !newWebhook.url || newWebhook.events.length === 0}
                >
                  Add Webhook
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
            <Webhook className="w-4 h-4 text-muted-foreground" />
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
              Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">
              {webhooks.filter(w => w.status === 'Active').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently enabled
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Calls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">
              {webhooks.reduce((sum, w) => sum + w.totalCalls, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              All time
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Success Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">
              {Math.round(webhooks.reduce((sum, w) => sum + w.successRate, 0) / webhooks.length)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Average success
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
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {webhook.url}
                    </code>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {webhook.events.slice(0, 2).map((event) => (
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
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={webhook.status === 'Active' ? 'default' : 'secondary'}
                        className={webhook.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : ''}
                      >
                        {webhook.status}
                      </Badge>
                      <Switch
                        checked={webhook.status === 'Active'}
                        onCheckedChange={() => toggleWebhookStatus(webhook.id)}
                        size="sm"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={webhook.successRate >= 95 ? 'text-green-600' : 'text-yellow-600'}>
                      {webhook.successRate}%
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{webhook.lastTriggered}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass">
                        <DropdownMenuItem onClick={() => testWebhook(webhook.id)}>
                          <Send className="w-4 h-4 mr-2" />
                          Test Webhook
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          View Logs
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
