
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Users, 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Crown, 
  UserCheck, 
  Eye,
  Search,
  Mail,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  permissions: string[];
  users: User[];
  isSystem?: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'pending';
}

export const RoleAssignmentManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [isAddingRole, setIsAddingRole] = useState(false);

  const permissions: Permission[] = [
    { id: 'read_all', name: 'Read All Data', description: 'View all database records', category: 'Database' },
    { id: 'write_data', name: 'Write Data', description: 'Create and modify records', category: 'Database' },
    { id: 'delete_data', name: 'Delete Data', description: 'Remove database records', category: 'Database' },
    { id: 'manage_users', name: 'Manage Users', description: 'Add, edit, and remove users', category: 'User Management' },
    { id: 'manage_roles', name: 'Manage Roles', description: 'Create and modify roles', category: 'User Management' },
    { id: 'view_analytics', name: 'View Analytics', description: 'Access analytics dashboard', category: 'Analytics' },
    { id: 'manage_chatbots', name: 'Manage Chatbots', description: 'Create and configure chatbots', category: 'Chatbot' },
    { id: 'deploy_chatbots', name: 'Deploy Chatbots', description: 'Deploy chatbots to production', category: 'Chatbot' },
    { id: 'system_settings', name: 'System Settings', description: 'Modify system configuration', category: 'System' }
  ];

  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'admin',
      name: 'Administrator',
      description: 'Full system access with all permissions',
      color: 'red',
      permissions: permissions.map(p => p.id),
      users: [
        { id: '1', name: 'John Smith', email: 'admin@company.com', status: 'active' }
      ],
      isSystem: true
    },
    {
      id: 'manager',
      name: 'Manager',
      description: 'Manage users and view analytics',
      color: 'blue',
      permissions: ['read_all', 'manage_users', 'view_analytics', 'manage_chatbots'],
      users: [
        { id: '2', name: 'Sarah Johnson', email: 'manager@company.com', status: 'active' }
      ]
    },
    {
      id: 'agent',
      name: 'Support Agent',
      description: 'Handle customer support tasks',
      color: 'green',
      permissions: ['read_all', 'view_analytics'],
      users: [
        { id: '3', name: 'Mike Wilson', email: 'agent1@company.com', status: 'active' },
        { id: '4', name: 'Lisa Brown', email: 'agent2@company.com', status: 'inactive' }
      ]
    }
  ]);

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPermissionsByCategory = () => {
    const grouped = permissions.reduce((acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = [];
      }
      acc[permission.category].push(permission);
      return acc;
    }, {} as Record<string, Permission[]>);
    return grouped;
  };

  const handleAddRole = () => {
    setIsAddingRole(true);
  };

  const handleSaveRole = () => {
    toast.success('Role saved successfully!');
    setIsAddingRole(false);
  };

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    if (role?.isSystem) {
      toast.error('Cannot delete system roles');
      return;
    }
    setRoles(roles.filter(r => r.id !== roleId));
    toast.success('Role deleted successfully');
  };

  const getRoleIcon = (roleName: string) => {
    if (roleName.toLowerCase().includes('admin')) return Crown;
    if (roleName.toLowerCase().includes('manager')) return Shield;
    return UserCheck;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-poppins">Role Assignment Manager</h2>
          <p className="text-muted-foreground">Manage user roles and permissions</p>
        </div>
        <Button onClick={handleAddRole} className="bg-foreground text-background">
          <Plus className="w-4 h-4 mr-2" />
          Add Role
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles List */}
        <Card className="glass lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-poppins flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Roles & Permissions
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredRoles.map((role) => {
              const RoleIcon = getRoleIcon(role.name);
              return (
                <div key={role.id} className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${role.color}-100 dark:bg-${role.color}-900/30`}>
                        <RoleIcon className={`w-5 h-5 text-${role.color}-600 dark:text-${role.color}-400`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{role.name}</h4>
                          {role.isSystem && (
                            <Badge variant="outline" className="text-xs">
                              <Shield className="w-3 h-3 mr-1" />
                              System
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{role.description}</p>
                        
                        <div className="mt-2 space-y-2">
                          <div>
                            <Label className="text-xs text-muted-foreground">
                              Permissions ({role.permissions.length})
                            </Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {role.permissions.slice(0, 3).map((permId) => {
                                const perm = permissions.find(p => p.id === permId);
                                return (
                                  <Badge key={permId} variant="outline" className="text-xs">
                                    {perm?.name}
                                  </Badge>
                                );
                              })}
                              {role.permissions.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{role.permissions.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-xs text-muted-foreground">
                              Users ({role.users.length})
                            </Label>
                            <div className="flex items-center space-x-2 mt-1">
                              {role.users.slice(0, 2).map((user) => (
                                <div key={user.id} className="flex items-center space-x-1">
                                  <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                                    <span className="text-xs font-medium">
                                      {user.name.split(' ').map(n => n[0]).join('')}
                                    </span>
                                  </div>
                                  <Badge className={`text-xs ${getStatusColor(user.status)}`}>
                                    {user.status}
                                  </Badge>
                                </div>
                              ))}
                              {role.users.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{role.users.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedRole(role.id)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      {!role.isSystem && (
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteRole(role.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Permission Categories */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="font-poppins flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Permission Categories
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(getPermissionsByCategory()).map(([category, perms]) => (
              <div key={category} className="space-y-2">
                <Label className="font-medium">{category}</Label>
                <div className="space-y-1">
                  {perms.map((permission) => (
                    <div key={permission.id} className="p-2 border border-border rounded text-sm">
                      <div className="font-medium">{permission.name}</div>
                      <div className="text-xs text-muted-foreground">{permission.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
