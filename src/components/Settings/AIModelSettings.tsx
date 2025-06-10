
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Bot, Brain, Zap, Settings as SettingsIcon, MessageSquare, Target } from 'lucide-react';
import { toast } from 'sonner';

export const AIModelSettings = () => {
  const [aiConfig, setAiConfig] = useState({
    primaryModel: 'gpt-4-turbo',
    fallbackModel: 'gpt-3.5-turbo',
    temperature: 0.7,
    maxTokens: 2048,
    topP: 0.9,
    frequencyPenalty: 0,
    presencePenalty: 0,
    systemPrompt: 'You are a helpful AI assistant for customer support. Be concise, friendly, and professional.',
    responseTimeout: 30,
    enableFallback: true,
    enableContextMemory: true,
    maxConversationLength: 10,
    enableSentimentAnalysis: true,
    autoTranslate: false,
    defaultLanguage: 'en'
  });

  const [customPrompts, setCustomPrompts] = useState([
    { id: 1, name: 'Customer Support', prompt: 'You are a customer support specialist...', active: true },
    { id: 2, name: 'Sales Assistant', prompt: 'You are a sales assistant helping customers...', active: false },
    { id: 3, name: 'Technical Support', prompt: 'You are a technical support expert...', active: false }
  ]);

  const handleConfigChange = (key: string, value: any) => {
    setAiConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleSliderChange = (key: string, value: number[]) => {
    setAiConfig(prev => ({ ...prev, [key]: value[0] }));
  };

  const handleSaveConfig = () => {
    toast.success('AI model configuration saved successfully!');
    console.log('Saving AI config:', aiConfig);
  };

  const testAIResponse = () => {
    toast.info('Testing AI model response...');
    setTimeout(() => {
      toast.success('AI model test completed successfully!');
    }, 3000);
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="font-poppins flex items-center">
          <Bot className="w-5 h-5 mr-2" />
          AI Model Configuration
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Fine-tune AI behavior, response patterns, and model performance
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Model Selection */}
        <div className="space-y-4">
          <h3 className="font-medium font-poppins flex items-center">
            <Brain className="w-4 h-4 mr-2" />
            Model Selection
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="primary-model">Primary AI Model</Label>
              <Select value={aiConfig.primaryModel} onValueChange={(value) => handleConfigChange('primaryModel', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                  <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                </SelectContent>
              </Select>
              <Badge className="mt-1 bg-green-100 text-green-800 text-xs">
                Primary Choice
              </Badge>
            </div>
            
            <div>
              <Label htmlFor="fallback-model">Fallback Model</Label>
              <Select value={aiConfig.fallbackModel} onValueChange={(value) => handleConfigChange('fallbackModel', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                  <SelectItem value="gpt-4">GPT-4</SelectItem>
                  <SelectItem value="claude-3-haiku">Claude 3 Haiku</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center mt-1">
                <Switch
                  checked={aiConfig.enableFallback}
                  onCheckedChange={(checked) => handleConfigChange('enableFallback', checked)}
                  className="mr-2"
                />
                <span className="text-xs text-muted-foreground">Enable fallback</span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Response Parameters */}
        <div className="space-y-4">
          <h3 className="font-medium font-poppins flex items-center">
            <SettingsIcon className="w-4 h-4 mr-2" />
            Response Parameters
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label>Temperature: {aiConfig.temperature}</Label>
                <Slider
                  value={[aiConfig.temperature]}
                  onValueChange={(value) => handleSliderChange('temperature', value)}
                  max={1}
                  min={0}
                  step={0.1}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground">Controls randomness (0 = focused, 1 = creative)</p>
              </div>
              
              <div>
                <Label>Top P: {aiConfig.topP}</Label>
                <Slider
                  value={[aiConfig.topP]}
                  onValueChange={(value) => handleSliderChange('topP', value)}
                  max={1}
                  min={0}
                  step={0.1}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground">Nucleus sampling parameter</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="max-tokens">Max Tokens</Label>
                <Input
                  id="max-tokens"
                  type="number"
                  value={aiConfig.maxTokens}
                  onChange={(e) => handleConfigChange('maxTokens', parseInt(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">Maximum response length</p>
              </div>
              
              <div>
                <Label htmlFor="response-timeout">Response Timeout (seconds)</Label>
                <Input
                  id="response-timeout"
                  type="number"
                  value={aiConfig.responseTimeout}
                  onChange={(e) => handleConfigChange('responseTimeout', parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* System Prompt */}
        <div className="space-y-4">
          <h3 className="font-medium font-poppins flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            System Prompt & Behavior
          </h3>
          
          <div>
            <Label htmlFor="system-prompt">Global System Prompt</Label>
            <Textarea
              id="system-prompt"
              value={aiConfig.systemPrompt}
              onChange={(e) => handleConfigChange('systemPrompt', e.target.value)}
              rows={4}
              placeholder="Define the AI's personality and behavior..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              This prompt defines the AI's role and personality across all conversations
            </p>
          </div>

          {/* Custom Prompts */}
          <div className="space-y-3">
            <h4 className="font-medium">Role-Specific Prompts</h4>
            {customPrompts.map((prompt) => (
              <div key={prompt.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div>
                  <span className="font-medium text-sm">{prompt.name}</span>
                  <p className="text-xs text-muted-foreground truncate max-w-md">
                    {prompt.prompt}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {prompt.active && (
                    <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
                  )}
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              + Add Custom Prompt
            </Button>
          </div>
        </div>

        <Separator />

        {/* Advanced Features */}
        <div className="space-y-4">
          <h3 className="font-medium font-poppins flex items-center">
            <Zap className="w-4 h-4 mr-2" />
            Advanced Features
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Context Memory</Label>
                <p className="text-sm text-muted-foreground">
                  Remember conversation history
                </p>
              </div>
              <Switch
                checked={aiConfig.enableContextMemory}
                onCheckedChange={(checked) => handleConfigChange('enableContextMemory', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Sentiment Analysis</Label>
                <p className="text-sm text-muted-foreground">
                  Analyze customer sentiment
                </p>
              </div>
              <Switch
                checked={aiConfig.enableSentimentAnalysis}
                onCheckedChange={(checked) => handleConfigChange('enableSentimentAnalysis', checked)}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Translate</Label>
                <p className="text-sm text-muted-foreground">
                  Translate responses automatically
                </p>
              </div>
              <Switch
                checked={aiConfig.autoTranslate}
                onCheckedChange={(checked) => handleConfigChange('autoTranslate', checked)}
              />
            </div>
            
            <div>
              <Label htmlFor="conversation-length">Max Conversation Length</Label>
              <Input
                id="conversation-length"
                type="number"
                value={aiConfig.maxConversationLength}
                onChange={(e) => handleConfigChange('maxConversationLength', parseInt(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-muted/20 p-4 rounded-lg">
          <h4 className="font-medium font-poppins mb-3 flex items-center">
            <Target className="w-4 h-4 mr-2" />
            Performance Metrics
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold">1.2s</div>
              <div className="text-xs text-muted-foreground">Avg Response Time</div>
            </div>
            <div>
              <div className="text-lg font-bold">94%</div>
              <div className="text-xs text-muted-foreground">Success Rate</div>
            </div>
            <div>
              <div className="text-lg font-bold">4.7/5</div>
              <div className="text-xs text-muted-foreground">User Rating</div>
            </div>
            <div>
              <div className="text-lg font-bold">1,247</div>
              <div className="text-xs text-muted-foreground">Daily Conversations</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={testAIResponse}>
            Test AI Response
          </Button>
          <Button onClick={handleSaveConfig} className="bg-foreground text-background hover:bg-foreground/90">
            Save AI Configuration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
