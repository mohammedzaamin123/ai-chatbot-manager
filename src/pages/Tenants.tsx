
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, MoreHorizontal, Edit, Trash2, Upload, Eye } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { TenantDetailsModal } from '@/components/Tenants/TenantDetailsModal';
import { toast } from 'sonner';

interface Tenant {
  id: string;
  name: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  channels: string[];
  lastUpdated: string;
  logo?: string;
  mongoUri?: string;
}

const mockTenants: Tenant[] = [
  {
    id: '1',
    name: 'Acme Corp',
    status: 'Active',
    channels: ['Web', 'WhatsApp'],
    lastUpdated: '2024-01-15',
    mongoUri: 'mongodb://acme-db'
  },
  {
    id: '2',
    name: 'TechStart Inc',
    status: 'Active',
    channels: ['Web', 'Instagram', 'Facebook'],
    lastUpdated: '2024-01-14',
    mongoUri: 'mongodb://techstart-db'
  },
  {
    id: '3',
    name: 'RetailPlus',
    status: 'Inactive',
    channels: ['Web'],
    lastUpdated: '2024-01-10',
    mongoUri: 'mongodb://retail-db'
  }
];

export const Tenants = () => {
  const [tenants, setTenants] = useState(mockTenants);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);
  const [newTenant, setNewTenant] = useState({
    name: '',
    mongoUri: '',
    logo: null as File | null
  });

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = event.target.files?.[0];
    if (file) {
      if (isEdit && editingTenant) {
        setEditingTenant(prev => prev ? { ...prev, logo: file.name } : null);
      } else {
        setNewTenant(prev => ({ ...prev, logo: file }));
      }
    }
  };

  const handleAddTenant = () => {
    if (!newTenant.name || !newTenant.mongoUri) {
      toast.error('Please fill in all required fields');
      return;
    }

    const tenant: Tenant = {
      id: (tenants.length + 1).toString(),
      name: newTenant.name,
      status: 'Active',
      channels: ['Web'],
      lastUpdated: new Date().toISOString().split('T')[0],
      mongoUri: newTenant.mongoUri,
      logo: newTenant.logo?.name
    };

    setTenants(prev => [...prev, tenant]);
    setNewTenant({ name: '', mongoUri: '', logo: null });
    setIsAddModalOpen(false);
    toast.success('Tenant added successfully!');
  };

  const handleEditTenant = (tenant: Tenant) => {
    setEditingTenant({ ...tenant });
    setIsEditModalOpen(true);
  };

  const handleUpdateTenant = () => {
    if (!editingTenant?.name || !editingTenant?.mongoUri) {
      toast.error('Please fill in all required fields');
      return;
    }

    setTenants(prev => prev.map(tenant => 
      tenant.id === editingTenant.id ? editingTenant : tenant
    ));
    setIsEditModalOpen(false);
    setEditingTenant(null);
    toast.success('Tenant updated successfully!');
  };

  const handleDeleteTenant = (tenantId: string) => {
    setTenants(prev => prev.filter(tenant => tenant.id !== tenantId));
    toast.success('Tenant deleted successfully!');
  };

  const handleTenantClick = (tenant: Tenant) => {
    setSelectedTenant(tenant);
    setIsDetailsModalOpen(true);
  };

  const handleViewDetails = (tenant: Tenant, event: React.MouseEvent) => {
    event.stopPropagation();
    handleTenantClick(tenant);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-poppins">Tenants</h1>
          <p className="text-muted-foreground mt-2">
            Manage your organization tenants and their configurations
          </p>
        </div>
        
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-foreground text-background hover:bg-foreground/90">
              <Plus className="w-4 h-4 mr-2" />
              Add Tenant
            </Button>
          </DialogTrigger>
          <DialogContent className="glass">
            <DialogHeader>
              <DialogTitle className="font-poppins">Add New Tenant</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="tenant-name">Tenant Name</Label>
                <Input
                  id="tenant-name"
                  value={newTenant.name}
                  onChange={(e) => setNewTenant(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter tenant name"
                />
              </div>
              
              <div>
                <Label htmlFor="mongo-uri">MongoDB URI</Label>
                <Input
                  id="mongo-uri"
                  type="password"
                  value={newTenant.mongoUri}
                  onChange={(e) => setNewTenant(prev => ({ ...prev, mongoUri: e.target.value }))}
                  placeholder="mongodb://..."
                />
              </div>
              
              <div>
                <Label htmlFor="logo-upload">Logo Upload</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag & drop your logo here, or click to browse
                  </p>
                  <Input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLogoUpload(e)}
                    className="hidden"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => document.getElementById('logo-upload')?.click()}
                  >
                    Choose File
                  </Button>
                  {newTenant.logo && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Selected: {newTenant.logo.name}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTenant}>
                  Add Tenant
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="glass">
          <DialogHeader>
            <DialogTitle className="font-poppins">Edit Tenant</DialogTitle>
          </DialogHeader>
          {editingTenant && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-tenant-name">Tenant Name</Label>
                <Input
                  id="edit-tenant-name"
                  value={editingTenant.name}
                  onChange={(e) => setEditingTenant(prev => prev ? { ...prev, name: e.target.value } : null)}
                  placeholder="Enter tenant name"
                />
              </div>
              
              <div>
                <Label htmlFor="edit-mongo-uri">MongoDB URI</Label>
                <Input
                  id="edit-mongo-uri"
                  type="password"
                  value={editingTenant.mongoUri || ''}
                  onChange={(e) => setEditingTenant(prev => prev ? { ...prev, mongoUri: e.target.value } : null)}
                  placeholder="mongodb://..."
                />
              </div>
              
              <div>
                <Label htmlFor="edit-logo-upload">Logo Upload</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <Input
                    id="edit-logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleLogoUpload(e, true)}
                    className="hidden"
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => document.getElementById('edit-logo-upload')?.click()}
                  >
                    Choose File
                  </Button>
                  {editingTenant.logo && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Current: {editingTenant.logo}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleUpdateTenant}>
                  Update Tenant
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Card className="glass">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="font-poppins">All Tenants</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search tenants..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tenant Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Channels</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTenants.map((tenant) => (
                <TableRow 
                  key={tenant.id} 
                  className="hover:bg-muted/30 cursor-pointer"
                  onClick={() => handleTenantClick(tenant)}
                >
                  <TableCell className="font-medium">{tenant.name}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={tenant.status === 'Active' ? 'default' : 'secondary'}
                      className={tenant.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : ''}
                    >
                      {tenant.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {tenant.channels.map((channel) => (
                        <Badge key={channel} variant="outline" className="text-xs">
                          {channel}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{tenant.lastUpdated}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass">
                        <DropdownMenuItem onClick={(e) => handleViewDetails(tenant, e)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleEditTenant(tenant);
                        }}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive" 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteTenant(tenant.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
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

      <TenantDetailsModal 
        tenant={selectedTenant}
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
      />
    </div>
  );
};
