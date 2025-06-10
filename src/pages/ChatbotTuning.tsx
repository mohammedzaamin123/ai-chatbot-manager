
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Send, 
  Save, 
  Database, 
  Users, 
  Shield, 
  Webhook, 
  Settings,
  Brain,
  MessageSquare,
  ExternalLink,
  Copy,
  Play,
  Eye,
  Upload,
  Download
} from 'lucide-react';
import { toast } from 'sonner';

export const ChatbotTuning = () => {
  const [activeTab, setActiveTab] = useState('database');
  
  // Database Configuration
  const [selectedDatabase, setSelectedDatabase] = useState('mongodb-support');
  const [testQuery, setTestQuery] = useState('');
  const [queryResults, setQueryResults] = useState('');

  // Permissions Configuration
  const [permissions, setPermissions] = useState({
    read: true,
    write: false,
    delete: false,
    custom: false
  });

  // AI Configuration
  const [aiConfig, setAiConfig] = useState({
    model: 'gpt-4-turbo',
    systemPrompt: `You are a helpful AI assistant for customer support. You should:

- Be polite and professional
- Provide accurate information based on the connected database
- Ask clarifying questions when needed
- Escalate to human agents when appropriate
- Keep responses concise but informative

Always maintain a friendly tone and be empathetic to customer concerns.`,
    temperature: 0.7,
    maxTokens: 500,
    enableMemory: true,
    responseStyle: 'professional'
  });

  // Webhook Configuration
  const [webhooks, setWebhooks] = useState([
    { id: 1, name: 'Slack Notifications', url: 'https://hooks.slack.com/...', active: true },
    { id: 2, name: 'CRM Integration', url: 'https://api.crm.com/webhook', active: false }
  ]);

  // Role Assignment
  const [roleAssignments, setRoleAssignments] = useState([
    { role: 'Admin', users: ['admin@company.com'], permissions: ['read', 'write', 'delete'] },
    { role: 'Manager', users: ['manager@company.com'], permissions: ['read', 'write'] },
    { role: 'Agent', users: ['agent1@company.com', 'agent2@company.com'], permissions: ['read'] }
  ]);

  // Chat Testing
  const [testMessage, setTestMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you today?'
    }
  ]);

  const databases = [
    { id: 'mongodb-support', name: 'MongoDB - Support Database', schema: '5 collections, 12,450 documents' },
    { id: 'postgresql-products', name: 'PostgreSQL - Products Database', schema: '8 tables, 3,200 rows' },
    { id: 'mysql-users', name: 'MySQL - User Database', schema: '12 tables, 45,600 rows' }
  ];

  const aiModels = [
    { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', provider: 'OpenAI' },
    { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI' },
    { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic' },
    { id: 'llama-3-70b', name: 'Llama 3 70B', provider: 'OpenRouter' }
  ];

  const handleTestQuery = () => {
    setQueryResults(`Query executed successfully:
    
Result: Found 25 matching records
Execution time: 0.15s
Status: OK

Sample data:
- Record 1: Customer support ticket #12345
- Record 2: Customer support ticket #12346
- Record 3: Customer support ticket #12347`);
    toast.success('Database query executed successfully');
  };

  const handleTestMessage = () => {
    if (!testMessage.trim()) return;

    const newUserMessage = { role: 'user', content: testMessage };
    const mockResponse = { 
      role: 'assistant', 
      content: `Based on your ${selectedDatabase} database and current configuration, here's my response: ${testMessage}. I can access the connected database to provide accurate information.` 
    };

    setChatHistory(prev => [...prev, newUserMessage, mockResponse]);
    setTestMessage('');
  };

  const handleSaveChatbot = () => {
    toast.success('Chatbot configuration saved successfully!');
  };

  const handleDeployChatbot = () => {
    toast.success('Chatbot deployed successfully! Integration code generated.');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-poppins">Create & Configure Chatbot</h1>
          <p className="text-muted-foreground mt-2">
            Build a comprehensive AI chatbot with database integration, permissions, and deployment options
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSaveChatbot} variant="outline">
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handleDeployChatbot} className="bg-foreground text-background">
            <ExternalLink className="w-4 h-4 mr-2" />
            Deploy
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Database
          </TabsTrigger>
          <TabsTrigger value="permissions" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Permissions
          </TabsTrigger>
          <TabsTrigger value="ai-config" className="flex items-center gap-2">
            <Brain className="w-4 h-4" />
            AI Config
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Webhook className="w-4 h-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="testing" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Testing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="database" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center">
                  <Database className="w-5 h-5 mr-2" />
                  Database Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Choose Database</Label>
                  <Select value={selectedDatabase} onValueChange={setSelectedDatabase}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {databases.map((db) => (
                        <SelectItem key={db.id} value={db.id}>
                          <div>
                            <div className="font-medium">{db.name}</div>
                            <div className="text-sm text-muted-foreground">{db.schema}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-muted/20 rounded-lg">
                  <h4 className="font-medium mb-2">Database Schema Preview</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>• Collections: users, tickets, products, orders, logs</div>
                    <div>• Total Documents: 12,450</div>
                    <div>• Last Updated: 2 minutes ago</div>
                    <div>• Connection Status: <Badge className="bg-green-100 text-green-800">Connected</Badge></div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure Database Connection
                </Button>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle className="font-poppins">Test Database Query</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="test-query">Query</Label>
                  <Textarea
                    id="test-query"
                    value={testQuery}
                    onChange={(e) => setTestQuery(e.target.value)}
                    placeholder="db.tickets.find({status: 'open'}).limit(10)"
                    rows={4}
                  />
                </div>
                
                <Button onClick={handleTestQuery} className="w-full">
                  <Play className="w-4 h-4 mr-2" />
                  Execute Query
                </Button>

                {queryResults && (
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <h4 className="font-medium mb-2">Query Results</h4>
                    <pre className="text-sm text-muted-foreground whitespace-pre-wrap">{queryResults}</pre>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Database Permissions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(permissions).map(([perm, enabled]) => (
                  <div key={perm} className="flex items-center justify-between">
                    <div>
                      <Label className="capitalize">{perm} Access</Label>
                      <p className="text-sm text-muted-foreground">
                        {perm === 'read' && 'View database records and information'}
                        {perm === 'write' && 'Modify and update existing records'}
                        {perm === 'delete' && 'Remove records from database'}
                        {perm === 'custom' && 'Define custom permission rules'}
                      </p>
                    </div>
                    <Switch
                      checked={enabled}
                      onCheckedChange={(checked) => setPermissions(prev => ({ ...prev, [perm]: checked }))}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Role Assignments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {roleAssignments.map((assignment) => (
                  <div key={assignment.role} className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{assignment.role}</h4>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-muted-foreground">Users: </span>
                        <span className="text-sm">{assignment.users.join(', ')}</span>
                      </div>
                      <div className="flex space-x-1">
                        {assignment.permissions.map((perm) => (
                          <Badge key={perm} variant="outline" className="text-xs">
                            {perm}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full">
                  <Users className="w-4 h-4 mr-2" />
                  Add New Role
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-config" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center">
                  <Brain className="w-5 h-5 mr-2" />
                  AI Model Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>AI Model</Label>
                  <Select value={aiConfig.model} onValueChange={(value) => setAiConfig(prev => ({ ...prev, model: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {aiModels.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          <div>
                            <div className="font-medium">{model.name}</div>
                            <div className="text-sm text-muted-foreground">{model.provider}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Response Style</Label>
                  <Select value={aiConfig.responseStyle} onValueChange={(value) => setAiConfig(prev => ({ ...prev, responseStyle: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="concise">Concise</SelectItem>
                      <SelectItem value="detailed">Detailed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Temperature: {aiConfig.temperature}</Label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={aiConfig.temperature}
                    onChange={(e) => setAiConfig(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                    className="w-full"
                  />
                </div>

                <div>
                  <Label htmlFor="max-tokens">Max Tokens</Label>
                  <Input
                    id="max-tokens"
                    type="number"
                    value={aiConfig.maxTokens}
                    onChange={(e) => setAiConfig(prev => ({ ...prev, maxTokens: parseInt(e.target.value) }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Memory</Label>
                    <p className="text-sm text-muted-foreground">Remember conversation context</p>
                  </div>
                  <Switch
                    checked={aiConfig.enableMemory}
                    onCheckedChange={(checked) => setAiConfig(prev => ({ ...prev, enableMemory: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle className="font-poppins">System Prompt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="system-prompt">Define AI Behavior</Label>
                  <Textarea
                    id="system-prompt"
                    value={aiConfig.systemPrompt}
                    onChange={(e) => setAiConfig(prev => ({ ...prev, systemPrompt: e.target.value }))}
                    rows={12}
                    className="font-mono text-sm"
                  />
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Training Data
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Export Config
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="font-poppins flex items-center">
                <Webhook className="w-5 h-5 mr-2" />
                Webhook Integrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {webhooks.map((webhook) => (
                <div key={webhook.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">{webhook.name}</h4>
                    <p className="text-sm text-muted-foreground">{webhook.url}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={webhook.active} />
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                <Webhook className="w-4 h-4 mr-2" />
                Add New Webhook
              </Button>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="font-poppins">Deployment Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <ExternalLink className="w-6 h-6 mb-2" />
                  Website Embed
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Copy className="w-6 h-6 mb-2" />
                  API Integration
                </Button>
              </div>
              
              <div className="p-4 bg-muted/20 rounded-lg">
                <h4 className="font-medium mb-2">Integration Code</h4>
                <pre className="text-sm text-muted-foreground">
{`<script src="https://cdn.chatbot.com/widget.js"></script>
<script>
  ChatbotWidget.init({
    id: 'chatbot-12345',
    theme: 'default'
  });
</script>`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="font-poppins">Live Chat Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4 h-[400px] overflow-y-auto bg-muted/20">
                    {chatHistory.map((message, index) => (
                      <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <div
                          className={`inline-block max-w-[80%] p-3 rounded-lg ${
                            message.role === 'user'
                              ? 'bg-foreground text-background'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Input
                      value={testMessage}
                      onChange={(e) => setTestMessage(e.target.value)}
                      placeholder="Type a test message..."
                      onKeyPress={(e) => e.key === 'Enter' && handleTestMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleTestMessage} size="sm">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle className="font-poppins">Configuration Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">Database:</span>
                    <p className="text-sm text-muted-foreground">{databases.find(db => db.id === selectedDatabase)?.name}</p>
                  </div>
                  
                  <div>
                    <span className="font-medium">AI Model:</span>
                    <p className="text-sm text-muted-foreground">{aiModels.find(model => model.id === aiConfig.model)?.name}</p>
                  </div>
                  
                  <div>
                    <span className="font-medium">Permissions:</span>
                    <div className="flex space-x-1 mt-1">
                      {Object.entries(permissions)
                        .filter(([_, enabled]) => enabled)
                        .map(([perm]) => (
                          <Badge key={perm} variant="outline" className="text-xs">
                            {perm}
                          </Badge>
                        ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="font-medium">Active Webhooks:</span>
                    <p className="text-sm text-muted-foreground">{webhooks.filter(w => w.active).length} configured</p>
                  </div>
                  
                  <div>
                    <span className="font-medium">Assigned Roles:</span>
                    <p className="text-sm text-muted-foreground">{roleAssignments.length} role(s) configured</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button onClick={handleSaveChatbot} variant="outline" className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Configuration
                  </Button>
                  <Button onClick={handleDeployChatbot} className="w-full bg-foreground text-background">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Deploy Chatbot
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
