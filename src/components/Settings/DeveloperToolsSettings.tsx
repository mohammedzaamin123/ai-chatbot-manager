
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Code, Database, Webhook, Terminal, Key, Monitor, Activity } from 'lucide-react';
import { toast } from 'sonner';

export const DeveloperToolsSettings = () => {
  const [devSettings, setDevSettings] = useState({
    enableDebugMode: false,
    enableApiLogging: true,
    enablePerformanceMonitoring: true,
    logLevel: 'info',
    maxLogRetention: 30,
    enableCORS: true,
    rateLimitEnabled: true,
    rateLimitRequests: 100,
    rateLimitWindow: 60,
    enableGraphQL: false,
    enableWebhookRetries: true,
    webhookTimeout: 30,
    enableDatabaseOptimization: true
  });

  const [apiEndpoints, setApiEndpoints] = useState([
    { id: 1, method: 'GET', path: '/api/v1/chatbots', description: 'List all chatbots', enabled: true },
    { id: 2, method: 'POST', path: '/api/v1/chatbots', description: 'Create new chatbot', enabled: true },
    { id: 3, method: 'GET', path: '/api/v1/conversations', description: 'Get conversations', enabled: true },
    { id: 4, method: 'POST', path: '/api/v1/webhook/receive', description: 'Receive webhooks', enabled: true }
  ]);

  const [customCode, setCustomCode] = useState({
    preProcessorCode: '// Pre-process incoming messages\nfunction preProcess(message) {\n  return message.toLowerCase();\n}',
    postProcessorCode: '// Post-process outgoing responses\nfunction postProcess(response) {\n  return response;\n}',
    customValidation: '// Custom validation logic\nfunction validateInput(input) {\n  return input.length > 0;\n}'
  });

  const handleSettingChange = (key: string, value: any) => {
    setDevSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleCodeChange = (key: string, value: string) => {
    setCustomCode(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveDevSettings = () => {
    toast.success('Developer settings saved successfully!');
    console.log('Saving dev settings:', devSettings, customCode);
  };

  const toggleEndpoint = (id: number) => {
    setApiEndpoints(prev => 
      prev.map(endpoint => 
        endpoint.id === id 
          ? { ...endpoint, enabled: !endpoint.enabled }
          : endpoint
      )
    );
  };

  const runDatabaseOptimization = () => {
    toast.info('Running database optimization...');
    setTimeout(() => {
      toast.success('Database optimization completed!');
    }, 3000);
  };

  const clearLogs = () => {
    toast.info('Clearing system logs...');
    setTimeout(() => {
      toast.success('System logs cleared successfully!');
    }, 1000);
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="font-poppins flex items-center">
          <Code className="w-5 h-5 mr-2" />
          Developer Tools & Advanced Settings
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Configure API endpoints, monitoring, custom code, and performance optimization
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* API Configuration */}
        <div className="space-y-4">
          <h3 className="font-medium font-poppins flex items-center">
            <Terminal className="w-4 h-4 mr-2" />
            API Configuration
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Enable CORS</Label>
                <p className="text-sm text-muted-foreground">
                  Allow cross-origin requests
                </p>
              </div>
              <Switch
                checked={devSettings.enableCORS}
                onCheckedChange={(checked) => handleSettingChange('enableCORS', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>GraphQL Endpoint</Label>
                <p className="text-sm text-muted-foreground">
                  Enable GraphQL API access
                </p>
              </div>
              <Switch
                checked={devSettings.enableGraphQL}
                onCheckedChange={(checked) => handleSettingChange('enableGraphQL', checked)}
              />
            </div>
          </div>

          {/* Rate Limiting */}
          <div className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Rate Limiting</h4>
              <Switch
                checked={devSettings.rateLimitEnabled}
                onCheckedChange={(checked) => handleSettingChange('rateLimitEnabled', checked)}
              />
            </div>
            
            {devSettings.rateLimitEnabled && (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="rate-limit-requests">Requests per window</Label>
                  <Input
                    id="rate-limit-requests"
                    type="number"
                    value={devSettings.rateLimitRequests}
                    onChange={(e) => handleSettingChange('rateLimitRequests', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="rate-limit-window">Window (seconds)</Label>
                  <Input
                    id="rate-limit-window"
                    type="number"
                    value={devSettings.rateLimitWindow}
                    onChange={(e) => handleSettingChange('rateLimitWindow', parseInt(e.target.value))}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* API Endpoints Management */}
        <div className="space-y-4">
          <h3 className="font-medium font-poppins">API Endpoints</h3>
          
          <div className="space-y-2">
            {apiEndpoints.map((endpoint) => (
              <div key={endpoint.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant={endpoint.method === 'GET' ? 'default' : 'secondary'} className="text-xs min-w-16 justify-center">
                    {endpoint.method}
                  </Badge>
                  <div>
                    <code className="text-sm font-mono">{endpoint.path}</code>
                    <p className="text-xs text-muted-foreground">{endpoint.description}</p>
                  </div>
                </div>
                <Switch
                  checked={endpoint.enabled}
                  onCheckedChange={() => toggleEndpoint(endpoint.id)}
                />
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Monitoring & Logging */}
        <div className="space-y-4">
          <h3 className="font-medium font-poppins flex items-center">
            <Monitor className="w-4 h-4 mr-2" />
            Monitoring & Logging
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Debug Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Enable detailed debugging
                </p>
              </div>
              <Switch
                checked={devSettings.enableDebugMode}
                onCheckedChange={(checked) => handleSettingChange('enableDebugMode', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>API Logging</Label>
                <p className="text-sm text-muted-foreground">
                  Log all API requests
                </p>
              </div>
              <Switch
                checked={devSettings.enableApiLogging}
                onCheckedChange={(checked) => handleSettingChange('enableApiLogging', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Performance Monitoring</Label>
                <p className="text-sm text-muted-foreground">
                  Track performance metrics
                </p>
              </div>
              <Switch
                checked={devSettings.enablePerformanceMonitoring}
                onCheckedChange={(checked) => handleSettingChange('enablePerformanceMonitoring', checked)}
              />
            </div>
            
            <div>
              <Label htmlFor="log-retention">Log Retention (days)</Label>
              <Input
                id="log-retention"
                type="number"
                value={devSettings.maxLogRetention}
                onChange={(e) => handleSettingChange('maxLogRetention', parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Custom Code */}
        <div className="space-y-4">
          <h3 className="font-medium font-poppins">Custom Code Execution</h3>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="pre-processor">Message Pre-processor</Label>
              <Textarea
                id="pre-processor"
                value={customCode.preProcessorCode}
                onChange={(e) => handleCodeChange('preProcessorCode', e.target.value)}
                rows={4}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                JavaScript code to process incoming messages before AI processing
              </p>
            </div>
            
            <div>
              <Label htmlFor="post-processor">Response Post-processor</Label>
              <Textarea
                id="post-processor"
                value={customCode.postProcessorCode}
                onChange={(e) => handleCodeChange('postProcessorCode', e.target.value)}
                rows={4}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground mt-1">
                JavaScript code to modify AI responses before sending
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Database Optimization */}
        <div className="space-y-4">
          <h3 className="font-medium font-poppins flex items-center">
            <Database className="w-4 h-4 mr-2" />
            Database Optimization
          </h3>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Auto Database Optimization</Label>
              <p className="text-sm text-muted-foreground">
                Automatically optimize database performance
              </p>
            </div>
            <Switch
              checked={devSettings.enableDatabaseOptimization}
              onCheckedChange={(checked) => handleSettingChange('enableDatabaseOptimization', checked)}
            />
          </div>

          <div className="bg-muted/20 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Database Status</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-lg font-bold">2.4GB</div>
                <div className="text-xs text-muted-foreground">Storage Used</div>
              </div>
              <div>
                <div className="text-lg font-bold">1,247</div>
                <div className="text-xs text-muted-foreground">Active Connections</div>
              </div>
              <div>
                <div className="text-lg font-bold">45ms</div>
                <div className="text-xs text-muted-foreground">Avg Query Time</div>
              </div>
              <div>
                <div className="text-lg font-bold">99.9%</div>
                <div className="text-xs text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>
        </div>

        {/* System Metrics */}
        <div className="bg-muted/20 p-4 rounded-lg">
          <h4 className="font-medium font-poppins mb-3 flex items-center">
            <Activity className="w-4 h-4 mr-2" />
            Real-time Metrics
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-green-500">●</div>
              <div className="text-xs text-muted-foreground">System Status</div>
            </div>
            <div>
              <div className="text-lg font-bold">23ms</div>
              <div className="text-xs text-muted-foreground">API Response</div>
            </div>
            <div>
              <div className="text-lg font-bold">94%</div>
              <div className="text-xs text-muted-foreground">CPU Usage</div>
            </div>
            <div>
              <div className="text-lg font-bold">12GB</div>
              <div className="text-xs text-muted-foreground">Memory Usage</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 pt-4">
          <Button variant="outline" onClick={runDatabaseOptimization}>
            Optimize Database
          </Button>
          <Button variant="outline" onClick={clearLogs}>
            Clear Logs
          </Button>
          <Button variant="outline">
            Export Settings
          </Button>
          <Button onClick={handleSaveDevSettings} className="bg-foreground text-background hover:bg-foreground/90">
            Save Developer Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
