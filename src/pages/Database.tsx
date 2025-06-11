
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Database as DatabaseIcon, Search, ChevronRight, ChevronDown, Table, FileText, Building, Plug, Bot, Settings } from 'lucide-react';
import { CreateDatabaseModal } from '@/components/Database/CreateDatabaseModal';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

interface DatabaseCollection {
  name: string;
  documents: number;
  size: string;
  expanded?: boolean;
  tenant: string;
}

const mockCollections: DatabaseCollection[] = [
  { name: 'users', documents: 1247, size: '2.3 MB', tenant: 'Acme Corp' },
  { name: 'conversations', documents: 8941, size: '45.2 MB', tenant: 'Acme Corp' },
  { name: 'messages', documents: 127834, size: '342.8 MB', tenant: 'Acme Corp' },
  { name: 'users', documents: 567, size: '1.2 MB', tenant: 'TechStart Inc' },
  { name: 'conversations', documents: 3421, size: '18.7 MB', tenant: 'TechStart Inc' },
  { name: 'messages', documents: 45632, size: '128.4 MB', tenant: 'TechStart Inc' },
  { name: 'users', documents: 234, size: '512 KB', tenant: 'RetailPlus' },
  { name: 'conversations', documents: 1876, size: '9.3 MB', tenant: 'RetailPlus' },
  { name: 'templates', documents: 23, size: '128 KB', tenant: 'Global' },
  { name: 'settings', documents: 12, size: '45 KB', tenant: 'Global' }
];

const tenants = ['All Tenants', 'Acme Corp', 'TechStart Inc', 'RetailPlus', 'Global'];

export const Database = () => {
  const [collections, setCollections] = useState(mockCollections);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTenant, setSelectedTenant] = useState('All Tenants');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [connectionData, setConnectionData] = useState({
    type: 'mongodb',
    name: '',
    uri: '',
    username: '',
    password: ''
  });

  const toggleCollection = (collectionName: string, tenant: string) => {
    setCollections(prev => prev.map(col => 
      col.name === collectionName && col.tenant === tenant 
        ? { ...col, expanded: !col.expanded }
        : col
    ));
  };

  const filteredCollections = collections.filter(col => {
    const matchesSearch = col.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTenant = selectedTenant === 'All Tenants' || col.tenant === selectedTenant;
    return matchesSearch && matchesTenant;
  });

  const getTenantStats = (tenant: string) => {
    const tenantCollections = collections.filter(col => col.tenant === tenant);
    return {
      collections: tenantCollections.length,
      documents: tenantCollections.reduce((sum, col) => sum + col.documents, 0),
      size: tenantCollections.reduce((sum, col) => {
        const sizeInMB = parseFloat(col.size.replace(/[^\d.]/g, ''));
        const unit = col.size.includes('KB') ? 0.001 : col.size.includes('GB') ? 1000 : 1;
        return sum + (sizeInMB * unit);
      }, 0).toFixed(1) + ' MB'
    };
  };

  const handleConnectDatabase = () => {
    if (!connectionData.name || !connectionData.uri) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate successful connection
    toast.success(`Successfully connected to ${connectionData.name}!`);
    setIsConnectModalOpen(false);
    setConnectionData({
      type: 'mongodb',
      name: '',
      uri: '',
      username: '',
      password: ''
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-poppins">Database Management</h1>
          <p className="text-muted-foreground mt-2">
            Monitor database collections and performance across tenants
          </p>
        </div>
        
        <Dialog open={isConnectModalOpen} onOpenChange={setIsConnectModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plug className="w-4 h-4 mr-2" />
              Connect Database
            </Button>
          </DialogTrigger>
          <DialogContent className="glass">
            <DialogHeader>
              <DialogTitle className="font-poppins">Connect External Database</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="db-type">Database Type</Label>
                <Select value={connectionData.type} onValueChange={(value) => setConnectionData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mongodb">MongoDB</SelectItem>
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                    <SelectItem value="mysql">MySQL</SelectItem>
                    <SelectItem value="sqlite">SQLite</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="db-name">Database Name</Label>
                <Input
                  id="db-name"
                  value={connectionData.name}
                  onChange={(e) => setConnectionData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter database name"
                />
              </div>
              
              <div>
                <Label htmlFor="db-uri">Connection URI</Label>
                <Input
                  id="db-uri"
                  type="password"
                  value={connectionData.uri}
                  onChange={(e) => setConnectionData(prev => ({ ...prev, uri: e.target.value }))}
                  placeholder="mongodb://localhost:27017/mydb"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="db-username">Username (Optional)</Label>
                  <Input
                    id="db-username"
                    value={connectionData.username}
                    onChange={(e) => setConnectionData(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="Username"
                  />
                </div>
                <div>
                  <Label htmlFor="db-password">Password (Optional)</Label>
                  <Input
                    id="db-password"
                    type="password"
                    value={connectionData.password}
                    onChange={(e) => setConnectionData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Password"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsConnectModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConnectDatabase}>
                  Connect Database
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tenant-specific Stats */}
      {selectedTenant !== 'All Tenants' && (
        <Card className="glass border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="font-poppins flex items-center">
              <Building className="w-5 h-5 mr-2" />
              {selectedTenant} Database Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(() => {
                const stats = getTenantStats(selectedTenant);
                return (
                  <>
                    <div className="text-center">
                      <div className="text-2xl font-bold font-poppins">{stats.collections}</div>
                      <div className="text-sm text-muted-foreground">Collections</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold font-poppins">{stats.documents.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Documents</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold font-poppins">{stats.size}</div>
                      <div className="text-sm text-muted-foreground">Storage Used</div>
                    </div>
                  </>
                );
              })()}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Global Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Collections
            </CardTitle>
            <DatabaseIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">{filteredCollections.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {selectedTenant === 'All Tenants' ? 'Across all tenants' : `In ${selectedTenant}`}
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">
              {filteredCollections.reduce((sum, col) => sum + col.documents, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Active documents
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Tenants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">
              {[...new Set(filteredCollections.map(col => col.tenant))].length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              With databases
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Health Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins text-green-600">Healthy</div>
            <p className="text-xs text-muted-foreground mt-1">
              All databases
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Collections Table */}
      <Card className="glass">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="font-poppins">Database Collections</CardTitle>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search collections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tenants.map((tenant) => (
                    <SelectItem key={tenant} value={tenant}>
                      {tenant}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Link to="/chatbot">
                <Button variant="outline" size="sm">
                  <Bot className="w-4 h-4 mr-2" />
                  Create Chatbot
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredCollections.map((collection, index) => (
              <div key={`${collection.name}-${collection.tenant}-${index}`} className="border rounded-lg">
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => toggleCollection(collection.name, collection.tenant)}
                >
                  <div className="flex items-center space-x-3">
                    {collection.expanded ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                    <Table className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{collection.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {collection.tenant}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {collection.documents.toLocaleString()} documents
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Badge variant="outline">{collection.size}</Badge>
                    <Button variant="outline" size="sm">
                      Query
                    </Button>
                  </div>
                </div>
                
                {collection.expanded && (
                  <div className="border-t bg-muted/20 p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Recent Documents</h4>
                        <div className="space-y-1">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center space-x-2 text-sm">
                              <FileText className="w-3 h-3" />
                              <span className="text-muted-foreground">Document {i}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Indexes</h4>
                        <div className="space-y-1">
                          <Badge variant="outline" className="text-xs">_id</Badge>
                          <Badge variant="outline" className="text-xs">tenant_id</Badge>
                          <Badge variant="outline" className="text-xs">createdAt</Badge>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Actions</h4>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full text-xs">
                            Export Collection
                          </Button>
                          <Button variant="outline" size="sm" className="w-full text-xs">
                            View Schema
                          </Button>
                          <Button variant="outline" size="sm" className="w-full text-xs">
                            Backup Data
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <CreateDatabaseModal 
        open={isCreateModalOpen} 
        onOpenChange={setIsCreateModalOpen} 
      />
    </div>
  );
};
