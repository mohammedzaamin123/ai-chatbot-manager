
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Puzzle, MessageSquare, Instagram, Facebook, Globe, Key, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Integration {
  id: string;
  name: string;
  icon: React.ElementType;
  connected: boolean;
  apiKey?: string;
  webhookUrl?: string;
  enabled: boolean;
}

export const PlatformIntegrationsSettings = () => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'whatsapp',
      name: 'WhatsApp Business API',
      icon: MessageSquare,
      connected: true,
      apiKey: '••••••••••••1234',
      webhookUrl: 'https://webhook.site/whatsapp',
      enabled: true
    },
    {
      id: 'instagram',
      name: 'Instagram Messaging',
      icon: Instagram,
      connected: false,
      enabled: false
    },
    {
      id: 'facebook',
      name: 'Facebook Messenger',
      icon: Facebook,
      connected: true,
      apiKey: '••••••••••••5678',
      enabled: true
    },
    {
      id: 'website',
      name: 'Website Chat Widget',
      icon: Globe,
      connected: true,
      enabled: true
    }
  ]);

  const [webhookSettings, setWebhookSettings] = useState({
    globalWebhookUrl: 'https://api.yourplatform.com/webhooks',
    enableLogging: true,
    retryFailedWebhooks: true,
    maxRetries: 3
  });

  const handleIntegrationToggle = (id: string, field: 'connected' | 'enabled') => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, [field]: !integration[field] }
          : integration
      )
    );
    toast.success(`Integration ${field} status updated`);
  };

  const handleApiKeyUpdate = (id: string, apiKey: string) => {
    setIntegrations(prev => 
      prev.map(integration => 
        integration.id === id 
          ? { ...integration, apiKey }
          : integration
      )
    );
  };

  const handleWebhookSettingChange = (key: string, value: any) => {
    setWebhookSettings(prev => ({ ...prev, [key]: value }));
  };

  const testIntegration = (integrationId: string) => {
    toast.info(`Testing ${integrationId} integration...`);
    // Simulate API test
    setTimeout(() => {
      toast.success(`${integrationId} integration test successful!`);
    }, 2000);
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="font-poppins flex items-center">
          <Puzzle className="w-5 h-5 mr-2" />
          Platform Integrations
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Connect and manage social media platforms, messaging services, and external APIs
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Social Media Integrations */}
        <div className="space-y-4">
          <h3 className="font-medium font-poppins">Social Media & Messaging Platforms</h3>
          
          <div className="space-y-4">
            {integrations.map((integration) => {
              const Icon = integration.icon;
              return (
                <div key={integration.id} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5" />
                      <div>
                        <h4 className="font-medium">{integration.name}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          {integration.connected ? (
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Connected
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Not Connected
                            </Badge>
                          )}
                          {integration.enabled && (
                            <Badge className="bg-blue-100 text-blue-800 text-xs">
                              Enabled
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={integration.enabled}
                        onCheckedChange={() => handleIntegrationToggle(integration.id, 'enabled')}
                        disabled={!integration.connected}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => testIntegration(integration.id)}
                        disabled={!integration.connected}
                      >
                        Test
                      </Button>
                    </div>
                  </div>
                  
                  {integration.connected && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-border">
                      <div>
                        <Label htmlFor={`${integration.id}-api-key`} className="text-xs">API Key</Label>
                        <div className="flex space-x-2">
                          <Input
                            id={`${integration.id}-api-key`}
                            type="password"
                            value={integration.apiKey || ''}
                            onChange={(e) => handleApiKeyUpdate(integration.id, e.target.value)}
                            placeholder="Enter API key"
                            className="text-xs"
                          />
                          <Button variant="outline" size="sm">
                            <Key className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {integration.webhookUrl && (
                        <div>
                          <Label htmlFor={`${integration.id}-webhook`} className="text-xs">Webhook URL</Label>
                          <Input
                            id={`${integration.id}-webhook`}
                            value={integration.webhookUrl}
                            placeholder="Webhook URL"
                            className="text-xs"
                            readOnly
                          />
                        </div>
                      )}
                    </div>
                  )}
                  
                  {!integration.connected && (
                    <Button 
                      className="w-full"
                      onClick={() => handleIntegrationToggle(integration.id, 'connected')}
                    >
                      Connect {integration.name}
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <Separator />

        {/* Webhook Configuration */}
        <div className="space-y-4">
          <h3 className="font-medium font-poppins">Webhook Configuration</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="global-webhook">Global Webhook URL</Label>
              <Input
                id="global-webhook"
                value={webhookSettings.globalWebhookUrl}
                onChange={(e) => handleWebhookSettingChange('globalWebhookUrl', e.target.value)}
                placeholder="https://api.yourplatform.com/webhooks"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Default webhook endpoint for all integrations
              </p>
            </div>
            
            <div>
              <Label htmlFor="max-retries">Max Retry Attempts</Label>
              <Input
                id="max-retries"
                type="number"
                value={webhookSettings.maxRetries}
                onChange={(e) => handleWebhookSettingChange('maxRetries', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable Webhook Logging</Label>
                <p className="text-sm text-muted-foreground">
                  Log all webhook requests and responses
                </p>
              </div>
              <Switch
                checked={webhookSettings.enableLogging}
                onCheckedChange={(checked) => handleWebhookSettingChange('enableLogging', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Retry Failed Webhooks</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically retry failed webhook deliveries
                </p>
              </div>
              <Switch
                checked={webhookSettings.retryFailedWebhooks}
                onCheckedChange={(checked) => handleWebhookSettingChange('retryFailedWebhooks', checked)}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* API Endpoints */}
        <div className="space-y-4">
          <h3 className="font-medium font-poppins">API Endpoints</h3>
          
          <div className="bg-muted/20 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Available Endpoints</h4>
            <div className="space-y-2 text-sm font-mono">
              <div>GET /api/v1/integrations</div>
              <div>POST /api/v1/integrations/{'{id}'}/test</div>
              <div>POST /api/v1/webhooks/receive</div>
              <div>GET /api/v1/webhooks/logs</div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <Button className="bg-foreground text-background hover:bg-foreground/90">
            Save Integration Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
