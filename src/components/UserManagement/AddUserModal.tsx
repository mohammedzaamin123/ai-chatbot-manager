
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { UserRole } from '@/contexts/UserContext';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: NewUser) => void;
}

export interface NewUser {
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  phone?: string;
  bio?: string;
  isActive: boolean;
  sendWelcomeEmail: boolean;
  permissions: string[];
}

const rolePermissions = {
  Admin: [
    'manage_users',
    'manage_tenants',
    'manage_integrations',
    'view_analytics',
    'manage_webhooks',
    'manage_api_keys',
    'access_database',
    'manage_settings'
  ],
  Counselor: [
    'view_chats',
    'respond_chats',
    'escalate_chats',
    'view_user_profiles',
    'manage_chat_assignments'
  ],
  User: [
    'start_chat',
    'view_chat_history',
    'update_profile'
  ]
};

export const AddUserModal = ({ isOpen, onClose, onAddUser }: AddUserModalProps) => {
  const [formData, setFormData] = useState<NewUser>({
    name: '',
    email: '',
    role: 'User',
    department: '',
    phone: '',
    bio: '',
    isActive: true,
    sendWelcomeEmail: true,
    permissions: rolePermissions.User
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onAddUser(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      email: '',
      role: 'User',
      department: '',
      phone: '',
      bio: '',
      isActive: true,
      sendWelcomeEmail: true,
      permissions: rolePermissions.User
    });
    setErrors({});
    onClose();
  };

  const handleRoleChange = (role: UserRole) => {
    setFormData(prev => ({
      ...prev,
      role,
      permissions: rolePermissions[role]
    }));
  };

  const togglePermission = (permission: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="glass max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-poppins">Add New User</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="font-medium">Basic Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe"
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john@example.com"
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="role">Role *</Label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger className={errors.role ? 'border-red-500' : ''}>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Counselor">Counselor</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role}</p>}
              </div>
              
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  value={formData.department}
                  onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  placeholder="Customer Support"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Brief description about the user..."
                className="min-h-[80px]"
              />
            </div>
          </div>

          {/* Permissions */}
          <div className="space-y-4">
            <h3 className="font-medium">Permissions</h3>
            <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
              {rolePermissions[formData.role].map(permission => (
                <div key={permission} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={permission}
                    checked={formData.permissions.includes(permission)}
                    onChange={() => togglePermission(permission)}
                    className="rounded border-border"
                  />
                  <Label htmlFor={permission} className="text-sm">
                    {permission.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h3 className="font-medium">Settings</h3>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Account Status</Label>
                <p className="text-sm text-muted-foreground">User can log in and access the system</p>
              </div>
              <Switch
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Send Welcome Email</Label>
                <p className="text-sm text-muted-foreground">Send login credentials and welcome message</p>
              </div>
              <Switch
                checked={formData.sendWelcomeEmail}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, sendWelcomeEmail: checked }))}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-foreground text-background">
              Create User
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
