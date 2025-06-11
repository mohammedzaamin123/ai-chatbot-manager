
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Database, Plus, Plug } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface CreateDatabaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const databaseTypes = [
  { value: 'mongodb', label: 'MongoDB', description: 'Document database for flexible schemas' },
  { value: 'postgresql', label: 'PostgreSQL', description: 'Relational database with JSON support' },
  { value: 'mysql', label: 'MySQL', description: 'Popular relational database' },
  { value: 'redis', label: 'Redis', description: 'In-memory data structure store' }
];

const tenantOptions = ['Acme Corp', 'TechStart Inc', 'RetailPlus', 'Global'];

export const CreateDatabaseModal = ({ open, onOpenChange }: CreateDatabaseModalProps) => {
  const [databaseName, setDatabaseName] = useState('');
  const [databaseType, setDatabaseType] = useState('');
  const [selectedTenant, setSelectedTenant] = useState('');
  const [connectionString, setConnectionString] = useState('');

  const handleCreate = () => {
    if (!databaseName || !databaseType || !selectedTenant) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Simulate database creation
    toast.success(`${databaseType} database "${databaseName}" created successfully`);
    onOpenChange(false);
    
    // Reset form
    setDatabaseName('');
    setDatabaseType('');
    setSelectedTenant('');
    setConnectionString('');
  };

  const generateConnectionString = () => {
    if (!databaseType || !databaseName) return '';
    
    const baseStrings = {
      mongodb: `mongodb://localhost:27017/${databaseName}`,
      postgresql: `postgresql://user:password@localhost:5432/${databaseName}`,
      mysql: `mysql://user:password@localhost:3306/${databaseName}`,
      redis: `redis://localhost:6379/0`
    };
    
    return baseStrings[databaseType as keyof typeof baseStrings] || '';
  };

  React.useEffect(() => {
    setConnectionString(generateConnectionString());
  }, [databaseType, databaseName]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-poppins flex items-center">
            <Database className="w-5 h-5 mr-2" />
            Create New Database
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="db-name">Database Name</Label>
              <Input
                id="db-name"
                value={databaseName}
                onChange={(e) => setDatabaseName(e.target.value)}
                placeholder="my-chatbot-db"
              />
            </div>
            
            <div>
              <Label htmlFor="tenant">Assign to Tenant</Label>
              <Select value={selectedTenant} onValueChange={setSelectedTenant}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tenant" />
                </SelectTrigger>
                <SelectContent>
                  {tenantOptions.map((tenant) => (
                    <SelectItem key={tenant} value={tenant}>
                      {tenant}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Database Type</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {databaseTypes.map((type) => (
                <div
                  key={type.value}
                  className={`border rounded-lg p-4 cursor-pointer transition-all hover:border-blue-500 ${
                    databaseType === type.value ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' : ''
                  }`}
                  onClick={() => setDatabaseType(type.value)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">{type.label}</h3>
                    <Badge variant="outline" className="text-xs">
                      {type.value}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </div>
              ))}
            </div>
          </div>

          {connectionString && (
            <div>
              <Label>Connection String (Auto-generated)</Label>
              <div className="mt-2 p-3 bg-muted rounded-lg">
                <code className="text-sm break-all">{connectionString}</code>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                This connection string will be used by your chatbots to connect to the database
              </p>
            </div>
          )}

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Plug className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 dark:text-blue-100">Database Integration</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Once created, this database will be available for your chatbots to store conversation history, 
                  user data, and custom knowledge bases.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={!databaseName || !databaseType || !selectedTenant}>
              <Plus className="w-4 h-4 mr-2" />
              Create Database
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
