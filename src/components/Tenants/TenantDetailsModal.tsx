
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Building, 
  Database, 
  MessageCircle, 
  Users, 
  Calendar, 
  Globe, 
  Settings, 
  Activity,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Trash2
} from 'lucide-react';

interface Tenant {
  id: string;
  name: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  channels: string[];
  lastUpdated: string;
  logo?: string;
}

interface TenantDetailsModalProps {
  tenant: Tenant | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TenantDetailsModal = ({ tenant, open, onOpenChange }: TenantDetailsModalProps) => {
  if (!tenant) return null;

  // Mock detailed data - in a real app, this would come from an API
  const tenantDetails = {
    ...tenant,
    email: `contact@${tenant.name.toLowerCase().replace(/\s+/g, '')}.com`,
    phone: '+1 (555) 123-4567',
    address: '123 Business St, Suite 100, City, State 12345',
    plan: 'Enterprise',
    monthlyMessages: 45782,
    totalChatbots: 12,
    activeUsers: 234,
    databases: 4,
    apiCalls: 125000,
    createdAt: '2023-08-15',
    lastActivity: '2024-01-15 14:23',
    billingStatus: 'Current',
    nextBilling: '2024-02-15',
    features: ['Multi-channel Support', 'Custom Branding', 'Analytics Dashboard', 'API Access', 'Priority Support'],
    integrations: ['WhatsApp Business', 'Facebook Messenger', 'Website Widget', 'Slack', 'Teams']
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Inactive':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'Suspended':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'Inactive':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'Suspended':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return '';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Building className="w-6 h-6 text-primary" />
              <div>
                <DialogTitle className="font-poppins text-xl">{tenant.name}</DialogTitle>
                <p className="text-sm text-muted-foreground">Tenant Details & Analytics</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor(tenant.status)}>
                {getStatusIcon(tenant.status)}
                <span className="ml-1">{tenant.status}</span>
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contact Information */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{tenantDetails.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">{tenantDetails.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm text-muted-foreground">{tenantDetails.address}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Plan</p>
                <Badge variant="outline">{tenantDetails.plan}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Usage Statistics */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Usage Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Messages</span>
                </div>
                <span className="font-medium">{tenantDetails.monthlyMessages.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Active Users</span>
                </div>
                <span className="font-medium">{tenantDetails.activeUsers}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">Databases</span>
                </div>
                <span className="font-medium">{tenantDetails.databases}</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-orange-600" />
                  <span className="text-sm">API Calls</span>
                </div>
                <span className="font-medium">{tenantDetails.apiCalls.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium">Created</p>
                <p className="text-sm text-muted-foreground">{tenantDetails.createdAt}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Last Activity</p>
                <p className="text-sm text-muted-foreground">{tenantDetails.lastActivity}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Billing Status</p>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {tenantDetails.billingStatus}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium">Next Billing</p>
                <p className="text-sm text-muted-foreground">{tenantDetails.nextBilling}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Channels & Integrations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Active Channels
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tenant.channels.map((channel) => (
                  <Badge key={channel} variant="outline" className="text-xs">
                    {channel}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Integrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tenantDetails.integrations.map((integration) => (
                  <Badge key={integration} variant="outline" className="text-xs">
                    {integration}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-lg">Enabled Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {tenantDetails.features.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit Tenant
          </Button>
          <Button variant="destructive">
            <Trash2 className="w-4 h-4 mr-2" />
            Suspend Account
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
