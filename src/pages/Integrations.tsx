
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Phone, Camera, Users, Settings } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  type: 'WhatsApp' | 'Instagram' | 'Facebook' | 'Slack';
  status: 'Connected' | 'Disconnected' | 'Error';
  icon: React.ElementType;
  description: string;
  apiKey?: string;
  webhookUrl?: string;
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
    webhookUrl: 'https://api.example.com/webhook/whatsapp'
  },
  {
    id: '2',
    name: 'Instagram Messaging',
    type: 'Instagram',
    status: 'Connected',
    icon: Camera,
    description: 'Handle Instagram direct messages through your chatbot',
    apiKey: 'ig_live_efgh5678'
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
    description: 'Send notifications to your Slack workspace'
  }
];

export const Integrations = () => {
  const [integrations, setIntegrations] = useState(mockIntegrations);

  const toggleIntegration = (integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId 
        ? { 
            ...integration, 
            status: integration.status === 'Connected' ? 'Disconnected' : 'Connected' 
          }
        : integration
    ));
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

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold font-poppins">Integrations</h1>
        <p className="text-muted-foreground mt-2">
          Connect external services to extend your chatbot's capabilities
        </p>
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((integration) => {
          const Icon = integration.icon;
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
                    <Badge className={getStatusColor(integration.status)}>
                      {integration.status}
                    </Badge>
                    <Switch
                      checked={integration.status === 'Connected'}
                      onCheckedChange={() => toggleIntegration(integration.id)}
                    />
                  </div>
                </div>
              </CardHeader>
              
              {integration.status === 'Connected' && (
                <CardContent>
                  <div className="space-y-4">
                    {integration.apiKey && (
                      <div>
                        <Label htmlFor={`api-key-${integration.id}`}>API Key</Label>
                        <Input
                          id={`api-key-${integration.id}`}
                          type="password"
                          value={integration.apiKey}
                          readOnly
                          className="font-mono text-sm"
                        />
                      </div>
                    )}
                    
                    {integration.webhookUrl && (
                      <div>
                        <Label htmlFor={`webhook-${integration.id}`}>Webhook URL</Label>
                        <Input
                          id={`webhook-${integration.id}`}
                          value={integration.webhookUrl}
                          readOnly
                          className="font-mono text-sm"
                        />
                      </div>
                    )}
                    
                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" size="sm">
                        Test Connection
                      </Button>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
};
