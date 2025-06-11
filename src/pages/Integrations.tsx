
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { MessageSquare, Phone, Camera, Users, Settings, Plus, CheckCircle, XCircle, AlertCircle, ExternalLink, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface Integration {
  id: string;
  name: string;
  type: 'WhatsApp' | 'Instagram' | 'Facebook' | 'Slack' | 'Discord' | 'Telegram';
  status: 'Connected' | 'Disconnected' | 'Error';
  icon: React.ElementType;
  description: string;
  apiKey?: string;
  webhookUrl?: string;
  lastTested?: string;
}

const mockIntegrations: Integration[] = [
  {
    id: '1',
    name: 'WhatsApp Business',
    type: 'WhatsApp',
    status: 'Connected',
    icon: Phone,
    description: 'Connect your WhatsApp Business account for customer support',
    apiKey: 'wa_live_abcd1234',
    webhookUrl: 'https://api.example.com/webhook/whatsapp',
    lastTested: '2 hours ago'
  },
  {
    id: '2',
    name: 'Instagram Messaging',
    type: 'Instagram',
    status: 'Connected',
    icon: Camera,
    description: 'Handle Instagram direct messages through your chatbot',
    apiKey: 'ig_live_efgh5678',
    lastTested: '1 day ago'
  },
  {
    id: '3',
    name: 'Facebook Messenger',
    type: 'Facebook',
    status: 'Disconnected',
    icon: Users,
    description: 'Integrate with Facebook Messenger for broader reach'
  },
  {
    id: '4',
    name: 'Slack Notifications',
    type: 'Slack',
    status: 'Error',
    icon: MessageSquare,
    description: 'Send notifications to your Slack workspace',
    lastTested: '3 days ago'
  }
];

export const Integrations = () => {
  const [integrations, setIntegrations] = useState(mockIntegrations);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [testingConnection, setTestingConnection] = useState<string | null>(null);
  const [newIntegration, setNewIntegration] = useState({
    name: '',
    type: 'WhatsApp' as const,
    description: '',
    apiKey: '',
    webhookUrl: ''
  });

  const toggleIntegration = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { 
            ...integration, 
            status: integration.status === 'Connected' ? 'Disconnected' : 'Connected' 
          }
        : integration
    ));
    toast.success('Integration status updated');
  };

  const handleTestConnection = async (integrationId: string) => {
    setTestingConnection(integrationId);
    
    // Simulate API call
    setTimeout(() => {
      const integration = integrations.find(i => i.id === integrationId);
      if (integration) {
        setIntegrations(prev => prev.map(i => 
          i.id === integrationId 
            ? { ...i, status: 'Connected', lastTested: 'Just now' }
            : i
        ));
        toast.success(`${integration.name} connection test successful`);
      }
      setTestingConnection(null);
    }, 2000);
  };

  const handleConfigure = (integration: Integration) => {
    setSelectedIntegration(integration);
    setDetailsDialogOpen(true);
  };

  const handleSaveConfiguration = () => {
    if (selectedIntegration) {
      setIntegrations(prev => prev.map(i => 
        i.id === selectedIntegration.id 
          ? { ...selectedIntegration }
          : i
      ));
      toast.success('Configuration saved successfully');
      setDetailsDialogOpen(false);
    }
  };

  const handleCreateIntegration = () => {
    if (!newIntegration.name || !newIntegration.type) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newIntegrationData: Integration = {
      id: (integrations.length + 1).toString(),
      name: newIntegration.name,
      type: newIntegration.type,
      status: 'Disconnected',
      description: newIntegration.description,
      apiKey: newIntegration.apiKey,
      webhookUrl: newIntegration.webhookUrl,
      icon: newIntegration.type === 'WhatsApp' ? Phone :
            newIntegration.type === 'Instagram' ? Camera :
            newIntegration.type === 'Facebook' ? Users : MessageSquare
    };

    setIntegrations(prev => [...prev, newIntegrationData]);
    setNewIntegration({ name: '', type: 'WhatsApp', description: '', apiKey: '', webhookUrl: '' });
    setCreateDialogOpen(false);
    toast.success('Integration created successfully');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Connected':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'Error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'Disconnected':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
      default:
        return '';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Connected':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Error':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'Disconnected':
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-poppins">Integrations</h1>
          <p className="text-muted-foreground mt-2">
            Connect external services to extend your chatbot's capabilities
          </p>
        </div>
        <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-foreground text-background">
              <Plus className="w-4 h-4 mr-2" />
              Create Integration
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Integration</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="integration-name">Integration Name</Label>
                <Input
                  id="integration-name"
                  value={newIntegration.name}
                  onChange={(e) => setNewIntegration(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter integration name"
                />
              </div>
              
              <div>
                <Label>Integration Type</Label>
                <Select value={newIntegration.type} onValueChange={(value: any) => setNewIntegration(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="Facebook">Facebook</SelectItem>
                    <SelectItem value="Slack">Slack</SelectItem>
                    <SelectItem value="Discord">Discord</SelectItem>
                    <SelectItem value="Telegram">Telegram</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="integration-description">Description</Label>
                <Textarea
                  id="integration-description"
                  value={newIntegration.description}
                  onChange={(e) => setNewIntegration(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Integration description"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="integration-api-key">API Key</Label>
                <Input
                  id="integration-api-key"
                  type="password"
                  value={newIntegration.apiKey}
                  onChange={(e) => setNewIntegration(prev => ({ ...prev, apiKey: e.target.value }))}
                  placeholder="Enter API key"
                />
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setCreateDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleCreateIntegration} className="flex-1">
                  Create Integration
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Integrations
            </CardTitle>
            <Settings className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">{integrations.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Available integrations
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Connected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">
              {integrations.filter(i => i.status === 'Connected').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Active connections
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">
              {integrations.filter(i => i.status === 'Error').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Needs attention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Integrations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          const isConnected = integration.status === 'Connected';
          const isTesting = testingConnection === integration.id;
          
          return (
            <Card key={integration.id} className="glass hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-muted rounded-lg">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="font-poppins text-lg">{integration.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(integration.status)}
                    <Badge className={getStatusColor(integration.status)}>
                      {integration.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {integration.lastTested && (
                    <div className="text-sm text-muted-foreground">
                      Last tested: {integration.lastTested}
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleTestConnection(integration.id)}
                      disabled={isTesting}
                      className="flex-1"
                    >
                      {isTesting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Testing...
                        </>
                      ) : (
                        'Test Connection'
                      )}
                    </Button>
                    
                    <Button variant="outline" size="sm" onClick={() => handleConfigure(integration)} className="flex-1">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-sm text-muted-foreground">
                      Auto-sync enabled
                    </span>
                    <Switch
                      checked={integration.status === 'Connected'}
                      onCheckedChange={() => toggleIntegration(integration.id)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Integration Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Configure {selectedIntegration?.name}</DialogTitle>
          </DialogHeader>
          {selectedIntegration && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="detail-name">Integration Name</Label>
                  <Input 
                    id="detail-name" 
                    value={selectedIntegration.name}
                    onChange={(e) => setSelectedIntegration(prev => prev ? { ...prev, name: e.target.value } : null)}
                  />
                </div>
                <div>
                  <Label>Type</Label>
                  <Select value={selectedIntegration.type}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                      <SelectItem value="Instagram">Instagram</SelectItem>
                      <SelectItem value="Facebook">Facebook</SelectItem>
                      <SelectItem value="Slack">Slack</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="detail-description">Description</Label>
                <Textarea 
                  id="detail-description" 
                  value={selectedIntegration.description}
                  onChange={(e) => setSelectedIntegration(prev => prev ? { ...prev, description: e.target.value } : null)}
                  rows={3}
                />
              </div>

              {selectedIntegration.apiKey && (
                <div>
                  <Label htmlFor="detail-api-key">API Key</Label>
                  <Input
                    id="detail-api-key"
                    type="password"
                    value={selectedIntegration.apiKey}
                    onChange={(e) => setSelectedIntegration(prev => prev ? { ...prev, apiKey: e.target.value } : null)}
                  />
                </div>
              )}
              
              {selectedIntegration.webhookUrl && (
                <div>
                  <Label htmlFor="detail-webhook">Webhook URL</Label>
                  <Input
                    id="detail-webhook"
                    value={selectedIntegration.webhookUrl}
                    onChange={(e) => setSelectedIntegration(prev => prev ? { ...prev, webhookUrl: e.target.value } : null)}
                  />
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => handleTestConnection(selectedIntegration.id)}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Test Connection
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setDetailsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveConfiguration}>
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
