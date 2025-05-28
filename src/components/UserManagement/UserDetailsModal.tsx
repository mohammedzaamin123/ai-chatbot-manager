
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, Shield, Activity, Clock, MessageSquare } from 'lucide-react';

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onUpdateUser: (userId: string, updates: any) => void;
}

export const UserDetailsModal = ({ isOpen, onClose, user, onUpdateUser }: UserDetailsModalProps) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user || {});

  const handleSave = () => {
    onUpdateUser(user.id, formData);
    setEditMode(false);
  };

  const mockActivities = [
    { action: 'Logged in', timestamp: '2024-01-15 14:30', ip: '192.168.1.1' },
    { action: 'Started chat session', timestamp: '2024-01-15 14:25', ip: '192.168.1.1' },
    { action: 'Updated profile', timestamp: '2024-01-15 12:15', ip: '192.168.1.1' },
    { action: 'Password changed', timestamp: '2024-01-14 16:45', ip: '192.168.1.2' }
  ];

  const mockSessions = [
    { id: '1', browser: 'Chrome 120', os: 'Windows 10', location: 'New York, US', active: true, lastActive: '2024-01-15 14:30' },
    { id: '2', browser: 'Safari 17', os: 'macOS', location: 'San Francisco, US', active: false, lastActive: '2024-01-14 10:20' }
  ];

  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="font-poppins">User Details</DialogTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? 'Cancel' : 'Edit'}
              </Button>
              {editMode && (
                <Button size="sm" onClick={handleSave}>
                  Save Changes
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Full Name</Label>
                    {editMode ? (
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{user.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label>Email</Label>
                    {editMode ? (
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    )}
                  </div>

                  <div>
                    <Label>Role</Label>
                    <div className="flex items-center space-x-2">
                      <Badge className={
                        user.role === 'Admin' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100' :
                        user.role === 'Counselor' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
                      }>
                        {user.role}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Label>Status</Label>
                    <div className="flex items-center space-x-2">
                      <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                      {editMode && (
                        <Switch
                          checked={formData.status === 'Active'}
                          onCheckedChange={(checked) => 
                            setFormData(prev => ({ ...prev, status: checked ? 'Active' : 'Inactive' }))
                          }
                        />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-lg">Additional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Department</Label>
                    {editMode ? (
                      <Input
                        value={formData.department || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
                        placeholder="Department"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{user.department || 'Not specified'}</p>
                    )}
                  </div>

                  <div>
                    <Label>Phone</Label>
                    {editMode ? (
                      <Input
                        value={formData.phone || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="Phone number"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{user.phone || 'Not provided'}</p>
                    )}
                  </div>

                  <div>
                    <Label>Last Login</Label>
                    <p className="text-sm text-muted-foreground">{user.lastLogin}</p>
                  </div>

                  <div>
                    <Label>Created</Label>
                    <p className="text-sm text-muted-foreground">{user.created || '2024-01-10 09:00'}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {editMode && (
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="text-lg">Bio</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={formData.bio || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="User bio..."
                    className="min-h-[100px]"
                  />
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="permissions">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Role Permissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {['manage_users', 'view_analytics', 'manage_settings', 'access_database'].map(permission => (
                    <div key={permission} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={true}
                        disabled={!editMode}
                        className="rounded border-border"
                      />
                      <Label className="text-sm">
                        {permission.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Activity className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Action</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>IP Address</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockActivities.map((activity, index) => (
                      <TableRow key={index}>
                        <TableCell>{activity.action}</TableCell>
                        <TableCell className="text-muted-foreground">{activity.timestamp}</TableCell>
                        <TableCell className="font-mono text-sm">{activity.ip}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Active Sessions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Browser</TableHead>
                      <TableHead>OS</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockSessions.map((session) => (
                      <TableRow key={session.id}>
                        <TableCell>{session.browser}</TableCell>
                        <TableCell>{session.os}</TableCell>
                        <TableCell>{session.location}</TableCell>
                        <TableCell>
                          <Badge variant={session.active ? 'default' : 'secondary'}>
                            {session.active ? 'Active' : 'Inactive'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{session.lastActive}</TableCell>
                        <TableCell>
                          {session.active && (
                            <Button variant="destructive" size="sm">
                              Terminate
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
