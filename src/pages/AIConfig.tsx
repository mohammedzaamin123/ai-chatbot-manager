
import React from 'react';
import { AIModelSettings } from '@/components/Settings/AIModelSettings';

export const AIConfig = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold font-poppins">AI Configuration</h1>
        <p className="text-muted-foreground mt-2">
          Configure AI models, behavior, and chatbot responses
        </p>
      </div>
      
      <AIModelSettings />
    </div>
  );
};
