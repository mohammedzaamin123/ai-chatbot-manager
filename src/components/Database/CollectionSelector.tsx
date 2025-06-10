
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { 
  Database, 
  Search, 
  Table, 
  FileText, 
  CheckCircle,
  RefreshCw,
  Filter,
  Eye,
  Settings
} from 'lucide-react';

interface Collection {
  name: string;
  type: string;
  documents: number;
  lastModified: string;
  schema?: string[];
  selected?: boolean;
}

interface CollectionSelectorProps {
  selectedDatabase: string;
  onCollectionSelect: (collections: string[]) => void;
}

export const CollectionSelector = ({ selectedDatabase, onCollectionSelect }: CollectionSelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);

  // Mock collections data - in real app, this would come from API
  const [collections, setCollections] = useState<Collection[]>([
    {
      name: 'users',
      type: 'collection',
      documents: 15420,
      lastModified: '2 hours ago',
      schema: ['id', 'name', 'email', 'created_at', 'role'],
      selected: false
    },
    {
      name: 'support_tickets',
      type: 'collection',
      documents: 8945,
      lastModified: '30 minutes ago',
      schema: ['ticket_id', 'user_id', 'subject', 'status', 'priority', 'created_at'],
      selected: false
    },
    {
      name: 'products',
      type: 'collection',
      documents: 2340,
      lastModified: '1 day ago',
      schema: ['product_id', 'name', 'description', 'price', 'category', 'stock'],
      selected: false
    },
    {
      name: 'orders',
      type: 'collection',
      documents: 12567,
      lastModified: '45 minutes ago',
      schema: ['order_id', 'user_id', 'total', 'status', 'items', 'created_at'],
      selected: false
    },
    {
      name: 'chat_logs',
      type: 'collection',
      documents: 45678,
      lastModified: '5 minutes ago',
      schema: ['log_id', 'session_id', 'message', 'response', 'timestamp'],
      selected: false
    }
  ]);

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCollectionToggle = (collectionName: string) => {
    const updatedCollections = collections.map(col =>
      col.name === collectionName ? { ...col, selected: !col.selected } : col
    );
    setCollections(updatedCollections);

    const selected = updatedCollections.filter(col => col.selected).map(col => col.name);
    setSelectedCollections(selected);
    onCollectionSelect(selected);
  };

  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const selectAll = () => {
    const allSelected = collections.every(col => col.selected);
    const updatedCollections = collections.map(col => ({ ...col, selected: !allSelected }));
    setCollections(updatedCollections);
    
    const selected = allSelected ? [] : updatedCollections.map(col => col.name);
    setSelectedCollections(selected);
    onCollectionSelect(selected);
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="font-poppins flex items-center justify-between">
          <span className="flex items-center">
            <Table className="w-5 h-5 mr-2" />
            Database Collections
          </span>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Badge variant="outline">
              Database: {selectedDatabase}
            </Badge>
            <Badge className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Connected
            </Badge>
          </div>
          <Button variant="outline" size="sm" onClick={selectAll}>
            {collections.every(col => col.selected) ? 'Deselect All' : 'Select All'}
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search collections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {filteredCollections.map((collection) => (
            <div key={collection.name} className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    checked={collection.selected}
                    onCheckedChange={() => handleCollectionToggle(collection.name)}
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{collection.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {collection.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {collection.documents.toLocaleString()} documents • Updated {collection.lastModified}
                    </p>
                    
                    {collection.schema && (
                      <div className="mt-2">
                        <Label className="text-xs text-muted-foreground">Schema:</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {collection.schema.slice(0, 3).map((field) => (
                            <Badge key={field} variant="outline" className="text-xs px-2 py-0">
                              {field}
                            </Badge>
                          ))}
                          {collection.schema.length > 3 && (
                            <Badge variant="outline" className="text-xs px-2 py-0">
                              +{collection.schema.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedCollections.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Selected Collections ({selectedCollections.length})
              </Label>
              <div className="flex flex-wrap gap-2">
                {selectedCollections.map((name) => (
                  <Badge key={name} className="bg-blue-100 text-blue-800">
                    <FileText className="w-3 h-3 mr-1" />
                    {name}
                  </Badge>
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
