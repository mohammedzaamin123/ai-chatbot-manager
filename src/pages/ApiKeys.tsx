
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Copy, Eye, EyeOff, Trash2, Key, Settings, Bot, ExternalLink, Info } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  provider: 'OpenAI' | 'Anthropic' | 'Google' | 'Azure' | 'Custom';
  status: 'Active' | 'Revoked';
  lastUsed: string;
  requests: number;
  created: string;
  chatbotCount: number;
}

const mockApiKeys: ApiKey[] = [
  {
    id: '1',
    name: 'OpenAI Production Key',
    key: 'sk-proj-abcd1234efgh5678ijkl9012mnop3456',
    provider: 'OpenAI',
    status: 'Active',
    lastUsed: '2024-01-15 14:30',
    requests: 12547,
    created: '2024-01-01',
    chatbotCount: 3
  },
  {
    id: '2',
    name: 'Anthropic Claude Key',
    key: 'sk-ant-wxyz7890abcd1234efgh5678ijkl9012',
    provider: 'Anthropic',
    status: 'Active',
    lastUsed: '2024-01-14 09:15',
    requests: 3421,
    created: '2024-01-05',
    chatbotCount: 1
  },
  {
    id: '3',
    name: 'Google Gemini Key',
    key: 'AIza-mnop3456wxyz7890abcd1234efgh5678',
    provider: 'Google',
    status: 'Revoked',
    lastUsed: '2024-01-10 16:20',
    requests: 892,
    created: '2024-01-03',
    chatbotCount: 0
  }
];

const providerTemplates = {
  OpenAI: { prefix: 'sk-proj-', placeholder: 'Your OpenAI API key' },
  Anthropic: { prefix: 'sk-ant-', placeholder: 'Your Anthropic API key' },
  Google: { prefix: 'AIza-', placeholder: 'Your Google AI API key' },
  Azure: { prefix: 'azure-', placeholder: 'Your Azure OpenAI key' },
  Custom: { prefix: '', placeholder: 'Your custom API key' }
};

export const ApiKeys = () => {
  const [apiKeys, setApiKeys] = useState(mockApiKeys);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyValue, setNewKeyValue] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<keyof typeof providerTemplates>('OpenAI');

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev);
      if (newSet.has(keyId)) {
        newSet.delete(keyId);
      } else {
        newSet.add(keyId);
      }
      return newSet;
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('API key copied to clipboard');
  };

  const maskApiKey = (key: string, visible: boolean) => {
    if (visible) return key;
    return key.substring(0, 12) + '••••••••••••••••••••••••';
  };

  const handleGenerateKey = () => {
    if (!newKeyName.trim() || !newKeyValue.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    const newKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: newKeyValue,
      provider: selectedProvider,
      status: 'Active' as const,
      lastUsed: 'Never',
      requests: 0,
      created: new Date().toISOString().split('T')[0],
      chatbotCount: 0
    };

    setApiKeys(prev => [...prev, newKey]);
    setIsAddModalOpen(false);
    setNewKeyName('');
    setNewKeyValue('');
    toast.success(`${selectedProvider} API key added successfully`);
  };

  const revokeKey = (keyId: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === keyId ? { ...key, status: 'Revoked' } : key
    ));
    toast.success('API key revoked successfully');
  };

  const getProviderColor = (provider: string) => {
    const colors = {
      OpenAI: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
      Anthropic: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
      Google: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
      Azure: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100',
      Custom: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100'
    };
    return colors[provider as keyof typeof colors] || colors.Custom;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-poppins">Chatbot API Keys</h1>
          <p className="text-muted-foreground mt-2">
            Manage API keys for your AI chatbots and monitor usage
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link to="/chatbot">
            <Button variant="outline">
              <Bot className="w-4 h-4 mr-2" />
              Create Chatbot
            </Button>
          </Link>
          
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-foreground text-background hover:bg-foreground/90">
                <Plus className="w-4 h-4 mr-2" />
                Add API Key
              </Button>
            </DialogTrigger>
            <DialogContent className="glass max-w-md">
              <DialogHeader>
                <DialogTitle className="font-poppins">Add New API Key</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="provider">AI Provider</Label>
                  <Select value={selectedProvider} onValueChange={(value: keyof typeof providerTemplates) => setSelectedProvider(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="OpenAI">OpenAI (GPT-4, GPT-3.5)</SelectItem>
                      <SelectItem value="Anthropic">Anthropic (Claude)</SelectItem>
                      <SelectItem value="Google">Google (Gemini)</SelectItem>
                      <SelectItem value="Azure">Azure OpenAI</SelectItem>
                      <SelectItem value="Custom">Custom Provider</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="key-name">Key Name</Label>
                  <Input
                    id="key-name"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder={`${selectedProvider} Production Key`}
                  />
                </div>

                <div>
                  <Label htmlFor="api-key">API Key</Label>
                  <Input
                    id="api-key"
                    type="password"
                    value={newKeyValue}
                    onChange={(e) => setNewKeyValue(e.target.value)}
                    placeholder={providerTemplates[selectedProvider].placeholder}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Your API key will be encrypted and stored securely
                  </p>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleGenerateKey} disabled={!newKeyName.trim() || !newKeyValue.trim()}>
                    Add Key
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Start Guide */}
      {apiKeys.length === 0 && (
        <Card className="glass border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="font-poppins flex items-center">
              <Info className="w-5 h-5 mr-2 text-blue-500" />
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-muted-foreground">
                Add your first API key to start creating intelligent chatbots:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <span className="text-sm">Add your AI provider API key</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <span className="text-sm">Create your first chatbot</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Keys
            </CardTitle>
            <Key className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">{apiKeys.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Configured keys
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Keys
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">
              {apiKeys.filter(k => k.status === 'Active').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently valid
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">
              {apiKeys.reduce((sum, k) => sum + k.requests, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              API calls made
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Chatbots
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">
              {apiKeys.reduce((sum, k) => sum + k.chatbotCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Using these keys
            </p>
          </CardContent>
        </Card>
      </div>

      {/* API Keys Table */}
      <Card className="glass">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="font-poppins">Your API Keys</CardTitle>
            <Link to="/manage-chatbots">
              <Button variant="outline" size="sm">
                <Bot className="w-4 h-4 mr-2" />
                Manage Chatbots
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>API Key</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Chatbots</TableHead>
                <TableHead>Requests</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{apiKey.name}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={getProviderColor(apiKey.provider)}
                    >
                      {apiKey.provider}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <code className="text-sm bg-muted px-2 py-1 rounded font-mono max-w-xs">
                        {maskApiKey(apiKey.key, visibleKeys.has(apiKey.id))}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                      >
                        {visibleKeys.has(apiKey.id) ? 
                          <EyeOff className="w-3 h-3" /> : 
                          <Eye className="w-3 h-3" />
                        }
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(apiKey.key)}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={apiKey.status === 'Active' ? 'default' : 'secondary'}
                      className={apiKey.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : ''}
                    >
                      {apiKey.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <span>{apiKey.chatbotCount}</span>
                      {apiKey.chatbotCount > 0 && (
                        <Link to="/manage-chatbots">
                          <ExternalLink className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                        </Link>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{apiKey.requests.toLocaleString()}</TableCell>
                  <TableCell className="text-muted-foreground">{apiKey.lastUsed}</TableCell>
                  <TableCell>
                    {apiKey.status === 'Active' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => revokeKey(apiKey.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-poppins">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/chatbot">
              <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                <Bot className="w-6 h-6" />
                <span>Create New Chatbot</span>
              </Button>
            </Link>
            
            <Link to="/manage-chatbots">
              <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                <Settings className="w-6 h-6" />
                <span>Manage Chatbots</span>
              </Button>
            </Link>
            
            <Link to="/analytics">
              <Button variant="outline" className="w-full h-20 flex flex-col space-y-2">
                <Key className="w-6 h-6" />
                <span>Usage Analytics</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
