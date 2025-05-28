
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Copy, Eye, EyeOff, Trash2, Key } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  status: 'Active' | 'Revoked';
  lastUsed: string;
  requests: number;
  created: string;
}

const mockApiKeys: ApiKey[] = [
  {
    id: '1',
    name: 'Production API',
    key: 'sk-proj-abcd1234efgh5678ijkl9012mnop3456',
    status: 'Active',
    lastUsed: '2024-01-15 14:30',
    requests: 12547,
    created: '2024-01-01'
  },
  {
    id: '2',
    name: 'Development API',
    key: 'sk-proj-wxyz7890abcd1234efgh5678ijkl9012',
    status: 'Active',
    lastUsed: '2024-01-14 09:15',
    requests: 3421,
    created: '2024-01-05'
  },
  {
    id: '3',
    name: 'Staging API',
    key: 'sk-proj-mnop3456wxyz7890abcd1234efgh5678',
    status: 'Revoked',
    lastUsed: '2024-01-10 16:20',
    requests: 892,
    created: '2024-01-03'
  }
];

export const ApiKeys = () => {
  const [apiKeys, setApiKeys] = useState(mockApiKeys);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');

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
    // In real app, show toast notification
    console.log('Copied to clipboard:', text);
  };

  const maskApiKey = (key: string, visible: boolean) => {
    if (visible) return key;
    return key.substring(0, 12) + '••••••••••••••••••••••••';
  };

  const handleGenerateKey = () => {
    const newKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: `sk-proj-${Math.random().toString(36).substring(2)}${Math.random().toString(36).substring(2)}`,
      status: 'Active' as const,
      lastUsed: 'Never',
      requests: 0,
      created: new Date().toISOString().split('T')[0]
    };

    setApiKeys(prev => [...prev, newKey]);
    setIsAddModalOpen(false);
    setNewKeyName('');
  };

  const revokeKey = (keyId: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === keyId ? { ...key, status: 'Revoked' } : key
    ));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-poppins">API Keys</h1>
          <p className="text-muted-foreground mt-2">
            Manage your API keys and monitor usage
          </p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-foreground text-background hover:bg-foreground/90">
              <Plus className="w-4 h-4 mr-2" />
              Generate Key
            </Button>
          </DialogTrigger>
          <DialogContent className="glass">
            <DialogHeader>
              <DialogTitle className="font-poppins">Generate New API Key</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="key-name">Key Name</Label>
                <Input
                  id="key-name"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  placeholder="e.g., Production API, Mobile App, etc."
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleGenerateKey} disabled={!newKeyName.trim()}>
                  Generate Key
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              Generated keys
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
              All time usage
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass">
        <CardHeader>
          <CardTitle className="font-poppins">API Keys</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>API Key</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Requests</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{apiKey.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <code className="text-sm bg-muted px-2 py-1 rounded font-mono">
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
                  <TableCell>{apiKey.requests.toLocaleString()}</TableCell>
                  <TableCell className="text-muted-foreground">{apiKey.lastUsed}</TableCell>
                  <TableCell className="text-muted-foreground">{apiKey.created}</TableCell>
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
    </div>
  );
};
