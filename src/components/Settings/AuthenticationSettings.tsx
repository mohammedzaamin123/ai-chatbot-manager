
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Shield, Key, Smartphone, Mail, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export const AuthenticationSettings = () => {
  const [authSettings, setAuthSettings] = useState({
    enableMFA: true,
    enableSSOGoogle: false,
    enableSSOGitHub: false,
    passwordExpiry: 90,
    maxLoginAttempts: 5,
    sessionTimeout: 30,
    requireEmailVerification: true,
    allowPasswordReset: true,
    enableAPIKeyAuth: true,
    enforceStrongPasswords: true
  });

  const handleSettingChange = (key: string, value: any) => {
    setAuthSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveAuth = () => {
    toast.success('Authentication settings saved successfully!');
    console.log('Saving auth settings:', authSettings);
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="font-poppins flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Authentication & Security
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Configure login methods, security policies, and access controls
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Multi-Factor Authentication */}
        <div className="space-y-4">
          <h3 className="font-medium font-poppins flex items-center">
            <Smartphone className="w-4 h-4 mr-2" />
            Multi-Factor Authentication
          </h3>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Enable MFA for All Users</Label>
              <p className="text-sm text-muted-foreground">
                Require two-factor authentication for enhanced security
              </p>
            </div>
            <Switch
              checked={authSettings.enableMFA}
              onCheckedChange={(checked) => handleSettingChange('enableMFA', checked)}
            />
          </div>

          {authSettings.enableMFA && (
            <div className="ml-4 p-4 bg-muted/20 rounded-lg space-y-2">
              <Badge className="bg-green-100 text-green-800">
                MFA Methods Available
              </Badge>
              <div className="text-sm space-y-1">
                <div>• SMS Text Messages</div>
                <div>• Authenticator Apps (Google, Authy)</div>
                <div>• Email Verification Codes</div>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Single Sign-On */}
        <div className="space-y-4">
          <h3 className="font-medium font-poppins">Single Sign-On (SSO)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Google SSO</Label>
                <p className="text-xs text-muted-foreground">
                  Sign in with Google accounts
                </p>
              </div>
              <Switch
                checked={authSettings.enableSSOGoogle}
                onCheckedChange={(checked) => handleSettingChange('enableSSOGoogle', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>GitHub SSO</Label>
                <p className="text-xs text-muted-foreground">
                  Sign in with GitHub accounts
                </p>
              </div>
              <Switch
                checked={authSettings.enableSSOGitHub}
                onCheckedChange={(checked) => handleSettingChange('enableSSOGitHub', checked)}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Password Policies */}
        <div className="space-y-4">
          <h3 className="font-medium font-poppins flex items-center">
            <Key className="w-4 h-4 mr-2" />
            Password Policies
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="password-expiry">Password Expiry (days)</Label>
              <Input
                id="password-expiry"
                type="number"
                value={authSettings.passwordExpiry}
                onChange={(e) => handleSettingChange('passwordExpiry', parseInt(e.target.value))}
              />
            </div>
            
            <div>
              <Label htmlFor="max-attempts">Max Login Attempts</Label>
              <Input
                id="max-attempts"
                type="number"
                value={authSettings.maxLoginAttempts}
                onChange={(e) => handleSettingChange('maxLoginAttempts', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Enforce Strong Passwords</Label>
              <p className="text-sm text-muted-foreground">
                Require uppercase, lowercase, numbers, and special characters
              </p>
            </div>
            <Switch
              checked={authSettings.enforceStrongPasswords}
              onCheckedChange={(checked) => handleSettingChange('enforceStrongPasswords', checked)}
            />
          </div>
        </div>

        <Separator />

        {/* Session Management */}
        <div className="space-y-4">
          <h3 className="font-medium font-poppins">Session Management</h3>
          
          <div>
            <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
            <Input
              id="session-timeout"
              type="number"
              value={authSettings.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
              className="max-w-48"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Automatically log out inactive users
            </p>
          </div>
        </div>

        <Separator />

        {/* Email & Recovery */}
        <div className="space-y-4">
          <h3 className="font-medium font-poppins flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            Email & Recovery
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <Label>Require Email Verification</Label>
                <p className="text-sm text-muted-foreground">
                  Users must verify email before accessing platform
                </p>
              </div>
              <Switch
                checked={authSettings.requireEmailVerification}
                onCheckedChange={(checked) => handleSettingChange('requireEmailVerification', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Allow Password Reset</Label>
                <p className="text-sm text-muted-foreground">
                  Enable password recovery via email
                </p>
              </div>
              <Switch
                checked={authSettings.allowPasswordReset}
                onCheckedChange={(checked) => handleSettingChange('allowPasswordReset', checked)}
              />
            </div>
          </div>
        </div>

        {/* Security Alert */}
        <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-orange-800 dark:text-orange-200">Security Recommendation</h4>
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-1">
                Enable MFA and enforce strong passwords for optimal security. Regular security audits are recommended.
              </p>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <Button onClick={handleSaveAuth} className="bg-foreground text-background hover:bg-foreground/90">
            Save Authentication Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
