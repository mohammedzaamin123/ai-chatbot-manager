
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Plus, Search, MoreHorizontal, UserCheck, Shield, Users2, UserX, Eye, Edit, Trash2, UserCog } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AddUserModal, NewUser } from '@/components/UserManagement/AddUserModal';
import { UserDetailsModal } from '@/components/UserManagement/UserDetailsModal';
import { useToast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Counselor';
  status: 'Active' | 'Inactive';
  lastLogin: string;
  department?: string;
  phone?: string;
  created: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-01-15 14:30',
    department: 'IT',
    phone: '+1 (555) 123-4567',
    created: '2024-01-10 09:00'
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    role: 'Counselor',
    status: 'Active',
    lastLogin: '2024-01-15 12:15',
    department: 'Customer Support',
    phone: '+1 (555) 234-5678',
    created: '2024-01-12 11:30'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    role: 'User',
    status: 'Active',
    lastLogin: '2024-01-14 16:45',
    department: 'Marketing',
    created: '2024-01-13 14:20'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'Counselor',
    status: 'Inactive',
    lastLogin: '2024-01-12 10:20',
    department: 'Customer Support',
    phone: '+1 (555) 345-6789',
    created: '2024-01-11 16:45'
  }
];

export const Users = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const { toast } = useToast();

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'Counselor':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
      case 'User':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
      default:
        return '';
    }
  };

  const handleAddUser = (newUserData: NewUser) => {
    const newUser: User = {
      id: (users.length + 1).toString(),
      name: newUserData.name,
      email: newUserData.email,
      role: newUserData.role,
      status: newUserData.isActive ? 'Active' : 'Inactive',
      lastLogin: 'Never',
      department: newUserData.department,
      phone: newUserData.phone,
      created: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };

    setUsers(prev => [...prev, newUser]);
    toast({
      title: "User Added",
      description: `${newUser.name} has been successfully added to the system.`,
    });
  };

  const handleUpdateUser = (userId: string, updates: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, ...updates } : user
    ));
    toast({
      title: "User Updated",
      description: "User information has been successfully updated.",
    });
  };

  const handleDeleteUser = (user: User) => {
    setUsers(prev => prev.filter(u => u.id !== user.id));
    setUserToDelete(null);
    toast({
      title: "User Deleted",
      description: `${user.name} has been removed from the system.`,
      variant: "destructive"
    });
  };

  const handleImpersonateUser = (user: User) => {
    toast({
      title: "Impersonation Started",
      description: `You are now impersonating ${user.name}. Be careful with this privilege.`,
    });
    console.log('Impersonating user:', user.name);
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' as 'Active' | 'Inactive' }
        : user
    ));
  };

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setIsDetailsModalOpen(true);
  };

  const userStats = {
    total: users.length,
    active: users.filter(u => u.status === 'Active').length,
    counselors: users.filter(u => u.role === 'Counselor').length,
    admins: users.filter(u => u.role === 'Admin').length
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-poppins">Users & Roles</h1>
          <p className="text-muted-foreground mt-2">
            Manage user accounts and role-based permissions
          </p>
        </div>
        
        <Button 
          className="bg-foreground text-background hover:bg-foreground/90"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
            <Users2 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">{userStats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All registered users
            </p>
          </CardContent>
        </Card>

        <Card className="glass hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Users
            </CardTitle>
            <UserCheck className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">{userStats.active}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently active
            </p>
          </CardContent>
        </Card>

        <Card className="glass hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Counselors
            </CardTitle>
            <Shield className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">{userStats.counselors}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Support staff
            </p>
          </CardContent>
        </Card>

        <Card className="glass hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Administrators
            </CardTitle>
            <UserCog className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">{userStats.admins}</div>
            <p className="text-xs text-muted-foreground mt-1">
              System admins
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="glass">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="font-poppins">All Users</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search users..."
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
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                    <Badge className={getRoleBadgeColor(user.role)}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.department || 'Not specified'}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={user.status === 'Active' ? 'default' : 'secondary'}
                      className={user.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : ''}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="glass">
                        <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
                          {user.status === 'Active' ? (
                            <>
                              <UserX className="w-4 h-4 mr-2" />
                              Deactivate
                            </>
                          ) : (
                            <>
                              <UserCheck className="w-4 h-4 mr-2" />
                              Activate
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleImpersonateUser(user)}>
                          <UserCog className="w-4 h-4 mr-2" />
                          Impersonate
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => setUserToDelete(user)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete User
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

      {/* Add User Modal */}
      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddUser={handleAddUser}
      />

      {/* User Details Modal */}
      <UserDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        user={selectedUser}
        onUpdateUser={handleUpdateUser}
      />

      {/* Delete Confirmation */}
      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent className="glass">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {userToDelete?.name}? This action cannot be undone.
              All user data, including chat history and sessions, will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => userToDelete && handleDeleteUser(userToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
