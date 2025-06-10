
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap } from 'lucide-react';

export const WelcomeSection = () => {
  return (
    <Card className="glass border-0 bg-gradient-to-br from-blue-50/80 to-purple-50/80 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl shadow-lg">
      <CardContent className="p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-6 h-6 text-purple-500" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome back, Alex
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Your AI-powered workspace is ready. Manage campaigns, create content, and engage with your audience seamlessly.
            </p>
            <div className="flex space-x-3 pt-2">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl">
                <Zap className="w-4 h-4 mr-2" />
                Quick Generate
              </Button>
              <Button variant="outline" className="rounded-xl border-purple-200 hover:bg-purple-50">
                View Analytics
              </Button>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-16 h-16 text-purple-400" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
