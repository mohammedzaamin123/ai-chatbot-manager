import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Database, 
  Users, 
  Rocket, 
  ArrowRight, 
  ArrowLeft, 
  Check,
  MessageSquare,
  ShoppingCart,
  HelpCircle,
  SkipForward,
  Sparkles
} from 'lucide-react';
import { toast } from 'sonner';

const steps = [
  { id: 1, title: 'Choose Use Case', icon: Rocket },
  { id: 2, title: 'Connect Database', icon: Database },
  { id: 3, title: 'Create First Bot', icon: Bot },
  { id: 4, title: 'Invite Team', icon: Users }
];

const useCases = [
  {
    id: 'support',
    title: 'Customer Support',
    description: 'Handle customer inquiries and provide instant support',
    icon: MessageSquare,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 'sales',
    title: 'Sales Assistant',
    description: 'Generate leads and guide customers through sales',
    icon: ShoppingCart,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 'faq',
    title: 'FAQ Assistant',
    description: 'Answer frequently asked questions automatically',
    icon: HelpCircle,
    color: 'bg-purple-100 text-purple-600'
  }
];

export const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedUseCase, setSelectedUseCase] = useState('');
  const [databaseConnected, setDatabaseConnected] = useState(false);
  const [botConfig, setBotConfig] = useState({
    name: '',
    greeting: '',
    model: 'gpt-4-turbo'
  });
  const [inviteEmails, setInviteEmails] = useState('');
  const navigate = useNavigate();

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    toast.success('Welcome to ChatBot Pro! Your setup is complete.');
    navigate('/');
  };

  const handleConnectDatabase = () => {
    toast.success('Sample database connected successfully!');
    setDatabaseConnected(true);
    setTimeout(() => handleNext(), 1000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold font-poppins">What's your primary use case?</h2>
              <p className="text-muted-foreground">
                This helps us customize your experience and suggest the best templates
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {useCases.map((useCase) => {
                const Icon = useCase.icon;
                return (
                  <button
                    key={useCase.id}
                    onClick={() => setSelectedUseCase(useCase.id)}
                    className={`p-6 rounded-xl border-2 transition-all text-left hover:shadow-md ${
                      selectedUseCase === useCase.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                        : 'border-border hover:border-blue-200'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 rounded-lg ${useCase.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{useCase.title}</h3>
                        <p className="text-muted-foreground">{useCase.description}</p>
                      </div>
                      {selectedUseCase === useCase.id && (
                        <Check className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold font-poppins">Connect a Database</h2>
              <p className="text-muted-foreground">
                Connect your database to make your chatbot smarter with real data
              </p>
            </div>

            {!databaseConnected ? (
              <div className="space-y-4">
                <Card className="glass border-dashed border-2">
                  <CardContent className="p-8 text-center space-y-4">
                    <Database className="w-12 h-12 text-muted-foreground mx-auto" />
                    <div>
                      <h3 className="font-semibold mb-2">Sample Database Available</h3>
                      <p className="text-muted-foreground text-sm">
                        We've prepared a sample customer support database for you to try
                      </p>
                    </div>
                    <Button onClick={handleConnectDatabase} className="w-full">
                      <Database className="w-4 h-4 mr-2" />
                      Connect Sample Database
                    </Button>
                  </CardContent>
                </Card>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">Or</span>
                  </div>
                </div>

                <Card className="glass">
                  <CardContent className="p-6 space-y-4">
                    <h3 className="font-semibold">Connect Your Own Database</h3>
                    <div className="grid grid-cols-3 gap-3">
                      <Button variant="outline" size="sm">MongoDB</Button>
                      <Button variant="outline" size="sm">PostgreSQL</Button>
                      <Button variant="outline" size="sm">MySQL</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card className="glass border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/30">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800 dark:text-green-300">Database Connected!</h3>
                    <p className="text-green-600 dark:text-green-400 text-sm">
                      Sample customer support database is ready to use
                    </p>
                  </div>
                  <div className="flex justify-center space-x-2">
                    <Badge className="bg-green-100 text-green-800">5 Tables</Badge>
                    <Badge className="bg-green-100 text-green-800">1,247 Records</Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold font-poppins">Create Your First Bot</h2>
              <p className="text-muted-foreground">
                Let's set up your chatbot with a name, greeting, and AI model
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="bot-name">Bot Name</Label>
                <Input
                  id="bot-name"
                  value={botConfig.name}
                  onChange={(e) => setBotConfig({ ...botConfig, name: e.target.value })}
                  placeholder="e.g., Support Assistant, Sales Helper"
                />
              </div>

              <div>
                <Label htmlFor="bot-greeting">Welcome Greeting</Label>
                <Textarea
                  id="bot-greeting"
                  value={botConfig.greeting}
                  onChange={(e) => setBotConfig({ ...botConfig, greeting: e.target.value })}
                  placeholder="Hello! I'm here to help you with any questions you might have."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="bot-model">AI Model</Label>
                <Select value={botConfig.model} onValueChange={(value) => setBotConfig({ ...botConfig, model: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4-turbo">
                      <div>
                        <div className="font-medium">GPT-4 Turbo</div>
                        <div className="text-sm text-muted-foreground">Most capable, best for complex queries</div>
                      </div>
                    </SelectItem>
                    <SelectItem value="gpt-3.5-turbo">
                      <div>
                        <div className="font-medium">GPT-3.5 Turbo</div>
                        <div className="text-sm text-muted-foreground">Fast and cost-effective</div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Card className="glass border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/30">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <Sparkles className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800 dark:text-blue-300">Smart Suggestions</h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        Based on your {selectedUseCase} use case, we've pre-configured optimal settings
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold font-poppins">Invite Your Team</h2>
              <p className="text-muted-foreground">
                Collaborate with teammates to build better chatbots together
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="invite-emails">Email Addresses (one per line)</Label>
                <Textarea
                  id="invite-emails"
                  value={inviteEmails}
                  onChange={(e) => setInviteEmails(e.target.value)}
                  placeholder="colleague@company.com&#10;teammate@company.com"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-4 border border-border rounded-lg">
                  <Users className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <div className="font-medium text-sm">Admin</div>
                  <div className="text-xs text-muted-foreground">Full access</div>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <Bot className="w-6 h-6 mx-auto mb-2 text-green-600" />
                  <div className="font-medium text-sm">Manager</div>
                  <div className="text-xs text-muted-foreground">Edit bots</div>
                </div>
                <div className="text-center p-4 border border-border rounded-lg">
                  <MessageSquare className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                  <div className="font-medium text-sm">Agent</div>
                  <div className="text-xs text-muted-foreground">View only</div>
                </div>
              </div>

              <Card className="glass">
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Don't worry, you can always invite team members later from the Users page
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-poppins font-bold text-lg text-gray-800 dark:text-gray-100">
              ChatBot Pro
            </h1>
          </div>
          
          <Button variant="ghost" onClick={() => navigate('/')}>
            Skip Setup
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12 max-w-2xl">
        {/* Progress */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold font-poppins">Setup Your Platform</h1>
            <Badge variant="outline">Step {currentStep} of {steps.length}</Badge>
          </div>
          
          <Progress value={progress} className="h-2" />
          
          <div className="flex justify-between text-sm">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div 
                  key={step.id}
                  className={`flex items-center space-x-2 ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-muted-foreground'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    isActive ? 'bg-blue-100 dark:bg-blue-900/30' : 
                    isCompleted ? 'bg-green-100 dark:bg-green-900/30' : 
                    'bg-muted'
                  }`}>
                    {isCompleted ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Icon className="w-3 h-3" />
                    )}
                  </div>
                  <span className="hidden sm:block font-medium">{step.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <Card className="glass shadow-xl">
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          <div className="flex space-x-2">
            <Button variant="ghost" onClick={handleSkip}>
              <SkipForward className="w-4 h-4 mr-2" />
              Skip
            </Button>
            
            <Button 
              onClick={handleNext}
              disabled={currentStep === 2 && !databaseConnected && selectedUseCase !== ''}
            >
              {currentStep === steps.length ? 'Finish Setup' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
