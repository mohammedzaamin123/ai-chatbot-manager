
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Database as DatabaseIcon, Search, ChevronRight, ChevronDown, Table, FileText } from 'lucide-react';

interface DatabaseCollection {
  name: string;
  documents: number;
  size: string;
  expanded?: boolean;
}

const mockCollections: DatabaseCollection[] = [
  { name: 'users', documents: 1247, size: '2.3 MB' },
  { name: 'conversations', documents: 8941, size: '45.2 MB' },
  { name: 'messages', documents: 127834, size: '342.8 MB' },
  { name: 'templates', documents: 23, size: '128 KB' },
  { name: 'settings', documents: 12, size: '45 KB' }
];

export const Database = () => {
  const [collections, setCollections] = useState(mockCollections);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCollection = (collectionName: string) => {
    setCollections(prev => prev.map(col => 
      col.name === collectionName 
        ? { ...col, expanded: !col.expanded }
        : col
    ));
  };

  const filteredCollections = collections.filter(col =>
    col.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold font-poppins">Database</h1>
        <p className="text-muted-foreground mt-2">
          Monitor database collections and performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Collections
            </CardTitle>
            <DatabaseIcon className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">{collections.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total collections
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">
              {collections.reduce((sum, col) => sum + col.documents, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total documents
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Storage Used
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins">390.5 MB</div>
            <p className="text-xs text-muted-foreground mt-1">
              Total size
            </p>
          </CardContent>
        </Card>

        <Card className="glass">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-poppins text-green-600">Online</div>
            <p className="text-xs text-muted-foreground mt-1">
              Database health
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="font-poppins">Collections</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredCollections.map((collection) => (
              <div key={collection.name} className="border rounded-lg">
                <div 
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => toggleCollection(collection.name)}
                >
                  <div className="flex items-center space-x-3">
                    {collection.expanded ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                    <Table className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">{collection.name}</h3>
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
    </div>
  );
};
