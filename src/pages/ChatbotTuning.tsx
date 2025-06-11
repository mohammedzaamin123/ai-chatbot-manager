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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CollectionSelector } from '@/components/Database/CollectionSelector';
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
  Download,
  Plus,
  Trash2,
  Edit,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const ChatbotTuning = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('setup');
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [webhookDialogOpen, setWebhookDialogOpen] = useState(false);
  const [deployDialogOpen, setDeployDialogOpen] = useState(false);
  
  // Chatbot Setup
  const [chatbotConfig, setChatbotConfig] = useState({
    name: '',
    description: '',
    purpose: 'customer-support',
    industry: '',
    language: 'english'
  });

  // Database Configuration
  const [selectedDatabase, setSelectedDatabase] = useState('mongodb-support');
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [testQuery, setTestQuery] = useState('');
  const [queryResults, setQueryResults] = useState('');

  // Role Management
  const [roles, setRoles] = useState([
    { id: '1', name: 'Admin', permissions: ['read', 'write', 'delete'], users: ['admin@company.com'] },
    { id: '2', name: 'Manager', permissions: ['read', 'write'], users: ['manager@company.com'] },
    { id: '3', name: 'Agent', permissions: ['read'], users: ['agent1@company.com', 'agent2@company.com'] }
  ]);
  const [newRole, setNewRole] = useState({ name: '', permissions: [], users: [] });

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
    { id: 1, name: 'Slack Notifications', url: 'https://hooks.slack.com/...', active: true, events: ['message', 'error'] },
    { id: 2, name: 'CRM Integration', url: 'https://api.crm.com/webhook', active: false, events: ['conversation_end'] }
  ]);
  const [newWebhook, setNewWebhook] = useState({ name: '', url: '', events: [] });

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

  const handleNextStep = () => {
    const tabs = ['setup', 'database', 'roles', 'ai-config', 'integrations', 'testing'];
    const currentIndex = tabs.indexOf(activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
      toast.success('Moving to next step...');
    } else {
      toast.success('Configuration complete! Ready to deploy.');
    }
  };

  const handleSaveChatbot = () => {
    toast.success('Chatbot configuration saved successfully!');
  };

  const handleDeployChatbot = () => {
    setDeployDialogOpen(true);
  };

  const handleCollectionSelect = (collections: string[]) => {
    setSelectedCollections(collections);
    toast.success(`Selected ${collections.length} collection(s)`);
  };

  const handleAddRole = () => {
    if (!newRole.name) {
      toast.error('Please enter a role name');
      return;
    }
    
    const roleData = {
      id: (roles.length + 1).toString(),
      name: newRole.name,
      permissions: newRole.permissions,
      users: newRole.users
    };

    setRoles(prev => [...prev, roleData]);
    setNewRole({ name: '', permissions: [], users: [] });
    setRoleDialogOpen(false);
    toast.success('Role added successfully');
  };

  const handleAddWebhook = () => {
    if (!newWebhook.name || !newWebhook.url) {
      toast.error('Please fill in all required fields');
      return;
    }

    const webhookData = {
      id: webhooks.length + 1,
      name: newWebhook.name,
      url: newWebhook.url,
      active: true,
      events: newWebhook.events
    };

    setWebhooks(prev => [...prev, webhookData]);
    setNewWebhook({ name: '', url: '', events: [] });
    setWebhookDialogOpen(false);
    toast.success('Webhook added successfully');
  };

  const handleWebhookPageRedirect = () => {
    navigate('/webhooks');
    toast.info('Redirecting to webhooks page...');
  };

  const handleDeploy = (option: string) => {
    toast.success(`Deploying via ${option}...`);
    setDeployDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-poppins">Create & Configure Chatbot</h1>
          <p className="text-muted-foreground mt-2">
            Build a comprehensive AI chatbot with database integration and smart features
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setActiveTab('testing')}>
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

      {/* Progress Indicator */}
      <Card className="glass">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'setup' ? 'bg-foreground text-background' : 'bg-muted'}`}>
                <Bot className="w-4 h-4" />
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'database' ? 'bg-foreground text-background' : 'bg-muted'}`}>
                <Database className="w-4 h-4" />
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'roles' ? 'bg-foreground text-background' : 'bg-muted'}`}>
                <Users className="w-4 h-4" />
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'ai-config' ? 'bg-foreground text-background' : 'bg-muted'}`}>
                <Brain className="w-4 h-4" />
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'integrations' ? 'bg-foreground text-background' : 'bg-muted'}`}>
                <Webhook className="w-4 h-4" />
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'testing' ? 'bg-foreground text-background' : 'bg-muted'}`}>
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            <Button onClick={handleNextStep} className="bg-foreground text-background">
              Next Step <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="setup" className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            Setup
          </TabsTrigger>
          <TabsTrigger value="database" className="flex items-center gap-2">
            <Database className="w-4 h-4" />
            Database
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Roles
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

        <TabsContent value="setup" className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="font-poppins flex items-center">
                <Bot className="w-5 h-5 mr-2" />
                Chatbot Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="chatbot-name">Chatbot Name</Label>
                  <Input
                    id="chatbot-name"
                    value={chatbotConfig.name}
                    onChange={(e) => setChatbotConfig(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter chatbot name"
                  />
                </div>
                <div>
                  <Label htmlFor="chatbot-purpose">Purpose</Label>
                  <Select value={chatbotConfig.purpose} onValueChange={(value) => setChatbotConfig(prev => ({ ...prev, purpose: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="customer-support">Customer Support</SelectItem>
                      <SelectItem value="sales">Sales Assistant</SelectItem>
                      <SelectItem value="lead-generation">Lead Generation</SelectItem>
                      <SelectItem value="information">Information Bot</SelectItem>
                      <SelectItem value="booking">Booking Assistant</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="chatbot-description">Description</Label>
                <Textarea
                  id="chatbot-description"
                  value={chatbotConfig.description}
                  onChange={(e) => setChatbotConfig(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what your chatbot does"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="chatbot-industry">Industry</Label>
                  <Input
                    id="chatbot-industry"
                    value={chatbotConfig.industry}
                    onChange={(e) => setChatbotConfig(prev => ({ ...prev, industry: e.target.value }))}
                    placeholder="e.g., Healthcare, E-commerce, Finance"
                  />
                </div>
                <div>
                  <Label htmlFor="chatbot-language">Primary Language</Label>
                  <Select value={chatbotConfig.language} onValueChange={(value) => setChatbotConfig(prev => ({ ...prev, language: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="italian">Italian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Database Selection - Left Side */}
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

                <Button variant="outline" className="w-full" onClick={() => navigate('/database')}>
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Database Connections
                </Button>

                <div>
                  <Label htmlFor="test-query">Test Query</Label>
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

            {/* Collection Selection - Right Side */}
            <CollectionSelector 
              selectedDatabase={selectedDatabase}
              onCollectionSelect={handleCollectionSelect}
            />
          </div>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-poppins flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Role Management
              </CardTitle>
              <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Role
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Role</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="role-name">Role Name</Label>
                      <Input
                        id="role-name"
                        value={newRole.name}
                        onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter role name"
                      />
                    </div>
                    <div>
                      <Label>Permissions</Label>
                      <div className="flex space-x-2 mt-2">
                        {['read', 'write', 'delete'].map((perm) => (
                          <Badge 
                            key={perm} 
                            variant={newRole.permissions.includes(perm) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => setNewRole(prev => ({
                              ...prev,
                              permissions: prev.permissions.includes(perm) 
                                ? prev.permissions.filter(p => p !== perm)
                                : [...prev.permissions, perm]
                            }))}
                          >
                            {perm}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => setRoleDialogOpen(false)} className="flex-1">
                        Cancel
                      </Button>
                      <Button onClick={handleAddRole} className="flex-1">
                        Add Role
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roles.map((role) => (
                  <div key={role.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium">{role.name}</h4>
                      <div className="flex space-x-1 mt-1">
                        {role.permissions.map((perm) => (
                          <Badge key={perm} variant="outline" className="text-xs">
                            {perm}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {role.users.length} user(s) assigned
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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

                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1" onClick={() => toast.success('Training data uploaded')}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Training Data
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={() => toast.success('Configuration exported')}>
                    <Download className="w-4 h-4 mr-2" />
                    Export Config
                  </Button>
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
                    rows={15}
                    className="font-mono text-sm"
                  />
                </div>
                
                <Button onClick={() => toast.success('System prompt updated')} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Save Prompt
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card className="glass">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-poppins flex items-center">
                <Webhook className="w-5 h-5 mr-2" />
                Webhook Integrations
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleWebhookPageRedirect}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Manage Webhooks
                </Button>
                <Dialog open={webhookDialogOpen} onOpenChange={setWebhookDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Add Webhook
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Webhook</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="webhook-name">Webhook Name</Label>
                        <Input
                          id="webhook-name"
                          value={newWebhook.name}
                          onChange={(e) => setNewWebhook(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Enter webhook name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="webhook-url">Webhook URL</Label>
                        <Input
                          id="webhook-url"
                          value={newWebhook.url}
                          onChange={(e) => setNewWebhook(prev => ({ ...prev, url: e.target.value }))}
                          placeholder="https://your-webhook-url.com"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" onClick={() => setWebhookDialogOpen(false)} className="flex-1">
                          Cancel
                        </Button>
                        <Button onClick={handleAddWebhook} className="flex-1">
                          Add Webhook
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {webhooks.map((webhook) => (
                <div key={webhook.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">{webhook.name}</h4>
                    <p className="text-sm text-muted-foreground">{webhook.url}</p>
                    <div className="flex space-x-1 mt-1">
                      {webhook.events.map((event) => (
                        <Badge key={event} variant="outline" className="text-xs">
                          {event}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch checked={webhook.active} />
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Deployment Options */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="font-poppins">Deployment Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col items-center justify-center"
                  onClick={() => handleDeploy('Website Embed')}
                >
                  <ExternalLink className="w-6 h-6 mb-2" />
                  Website Embed
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 flex flex-col items-center justify-center"
                  onClick={() => handleDeploy('API Integration')}
                >
                  <Copy className="w-6 h-6 mb-2" />
                  API Integration
                </Button>
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
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="font-medium">Database:</span>
                    <p className="text-sm text-muted-foreground ml-2">{databases.find(db => db.id === selectedDatabase)?.name}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="font-medium">AI Model:</span>
                    <p className="text-sm text-muted-foreground ml-2">{aiModels.find(model => model.id === aiConfig.model)?.name}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="font-medium">Roles:</span>
                    <p className="text-sm text-muted-foreground ml-2">{roles.length} role(s) configured</p>
                  </div>
                  
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span className="font-medium">Active Webhooks:</span>
                    <p className="text-sm text-muted-foreground ml-2">{webhooks.filter(w => w.active).length} configured</p>
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

      {/* Deploy Dialog */}
      <Dialog open={deployDialogOpen} onOpenChange={setDeployDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Deploy Chatbot</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Choose how you want to deploy your chatbot:
            </p>
            <div className="space-y-2">
              <Button onClick={() => handleDeploy('Website Widget')} variant="outline" className="w-full justify-start">
                <ExternalLink className="w-4 h-4 mr-2" />
                Website Widget
              </Button>
              <Button onClick={() => handleDeploy('API Endpoint')} variant="outline" className="w-full justify-start">
                <Copy className="w-4 h-4 mr-2" />
                API Endpoint
              </Button>
              <Button onClick={() => handleDeploy('Slack Integration')} variant="outline" className="w-full justify-start">
                <MessageSquare className="w-4 h-4 mr-2" />
                Slack Integration
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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
