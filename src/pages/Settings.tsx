
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Settings as SettingsIcon, Bell, Shield, Database, Globe, Palette, Code, Bot, Puzzle } from 'lucide-react';
import { ThemeCustomization } from '@/components/Settings/ThemeCustomization';
import { AuthenticationSettings } from '@/components/Settings/AuthenticationSettings';
import { PlatformIntegrationsSettings } from '@/components/Settings/PlatformIntegrationsSettings';
import { AIModelSettings } from '@/components/Settings/AIModelSettings';
import { DeveloperToolsSettings } from '@/components/Settings/DeveloperToolsSettings';

export const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: 'AI Chatbot Platform',
    siteDescription: 'Multi-tenant AI chatbot platform with role-based access control',
    adminEmail: 'admin@example.com',
    allowRegistration: true,
    requireEmailVerification: true,
    enableNotifications: true,
    enableAnalytics: true,
    maxConcurrentChats: 100,
    sessionTimeout: 30,
    dataRetentionDays: 90,
    enableDarkMode: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = () => {
    console.log('Saving settings:', settings);
    // In real implementation, this would save to API
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold font-poppins">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Configure your AI chatbot platform settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="general" className="flex items-center gap-2">
            <SettingsIcon className="w-4 h-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger value="theme" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Theme</span>
          </TabsTrigger>
          <TabsTrigger value="auth" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Puzzle className="w-4 h-4" />
            <span className="hidden sm:inline">Integrations</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            <span className="hidden sm:inline">AI Config</span>
          </TabsTrigger>
          <TabsTrigger value="developer" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            <span className="hidden sm:inline">Developer</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* General Settings */}
            <Card className="glass lg:col-span-2">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center">
                  <SettingsIcon className="w-5 h-5 mr-2" />
                  General Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="site-name">Platform Name</Label>
                    <Input
                      id="site-name"
                      value={settings.siteName}
                      onChange={(e) => handleSettingChange('siteName', e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="admin-email">Admin Email</Label>
                    <Input
                      id="admin-email"
                      type="email"
                      value={settings.adminEmail}
                      onChange={(e) => handleSettingChange('adminEmail', e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="site-description">Platform Description</Label>
                  <Textarea
                    id="site-description"
                    value={settings.siteDescription}
                    onChange={(e) => handleSettingChange('siteDescription', e.target.value)}
                    rows={3}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">User Management</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Allow User Registration</Label>
                      <p className="text-sm text-muted-foreground">
                        Allow new users to register accounts
                      </p>
                    </div>
                    <Switch
                      checked={settings.allowRegistration}
                      onCheckedChange={(checked) => handleSettingChange('allowRegistration', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Require Email Verification</Label>
                      <p className="text-sm text-muted-foreground">
                        Users must verify their email before accessing
                      </p>
                    </div>
                    <Switch
                      checked={settings.requireEmailVerification}
                      onCheckedChange={(checked) => handleSettingChange('requireEmailVerification', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="font-poppins">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Database className="w-4 h-4 mr-2" />
                  Backup Database
                </Button>
                <Button className="w-full" variant="outline">
                  Export Logs
                </Button>
                <Button className="w-full" variant="outline">
                  Clear Cache
                </Button>
                <Button className="w-full" variant="outline">
                  Restart Services
                </Button>
                <Separator />
                <Button className="w-full bg-foreground text-background" onClick={handleSaveSettings}>
                  Save All Settings
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Notifications */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="font-poppins flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive platform notifications
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableNotifications}
                    onCheckedChange={(checked) => handleSettingChange('enableNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Enable Analytics</Label>
                    <p className="text-sm text-muted-foreground">
                      Track usage analytics
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableAnalytics}
                    onCheckedChange={(checked) => handleSettingChange('enableAnalytics', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Performance */}
            <Card className="glass">
              <CardHeader>
                <CardTitle className="font-poppins">Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input
                    id="session-timeout"
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="max-chats">Max Concurrent Chats</Label>
                  <Input
                    id="max-chats"
                    type="number"
                    value={settings.maxConcurrentChats}
                    onChange={(e) => handleSettingChange('maxConcurrentChats', parseInt(e.target.value))}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="glass">
            <CardHeader>
              <CardTitle className="font-poppins flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="retention-days">Data Retention (days)</Label>
                  <Input
                    id="retention-days"
                    type="number"
                    value={settings.dataRetentionDays}
                    onChange={(e) => handleSettingChange('dataRetentionDays', parseInt(e.target.value))}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    How long to keep chat data
                  </p>
                </div>
                
                <div>
                  <Label>Storage Usage</Label>
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Used</span>
                      <span className="text-sm">2.4 GB / 10 GB</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-foreground h-2 rounded-full" style={{ width: '24%' }}></div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>Backup Status</Label>
                  <div className="mt-2 space-y-2">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                      Last backup: 2 hours ago
                    </Badge>
                    <p className="text-xs text-muted-foreground">
                      Automatic backups enabled
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="theme">
          <ThemeCustomization />
        </TabsContent>

        <TabsContent value="auth">
          <AuthenticationSettings />
        </TabsContent>

        <TabsContent value="integrations">
          <PlatformIntegrationsSettings />
        </TabsContent>

        <TabsContent value="ai">
          <AIModelSettings />
        </TabsContent>

        <TabsContent value="developer">
          <DeveloperToolsSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};
