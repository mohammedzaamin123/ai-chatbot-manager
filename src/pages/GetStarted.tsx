
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowRight, 
  Database, 
  Bot, 
  Users, 
  Settings, 
  Rocket,
  CheckCircle,
  PlayCircle,
  BookOpen,
  Zap
} from 'lucide-react';

export const GetStarted = () => {
  const steps = [
    {
      id: 1,
      title: 'Connect Your Database',
      description: 'Start by connecting your database to enable AI-powered data access',
      icon: Database,
      link: '/database',
      status: 'start',
      time: '2 min'
    },
    {
      id: 2,
      title: 'Create Your First Chatbot',
      description: 'Build an intelligent chatbot with custom database collections',
      icon: Bot,
      link: '/chatbot',
      status: 'pending',
      time: '5 min'
    },
    {
      id: 3,
      title: 'Set Up User Roles',
      description: 'Configure user permissions and role-based access control',
      icon: Users,
      link: '/users',
      status: 'pending',
      time: '3 min'
    },
    {
      id: 4,
      title: 'Deploy & Configure',
      description: 'Deploy your chatbot and configure advanced settings',
      icon: Settings,
      link: '/settings',
      status: 'pending',
      time: '2 min'
    }
  ];

  const quickActions = [
    { title: 'View Analytics', description: 'Check chatbot performance', link: '/analytics', icon: Zap },
    { title: 'Manage API Keys', description: 'Configure integrations', link: '/api-keys', icon: Database },
    { title: 'Content Hub', description: 'Manage your content', link: '/content-hub', icon: BookOpen }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Rocket className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold font-poppins bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to AI Platform
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Build intelligent chatbots with database integration in minutes. Follow our guided setup to get started.
        </p>
        <Badge className="bg-green-100 text-green-800 px-4 py-2">
          <CheckCircle className="w-4 h-4 mr-2" />
          Platform Ready
        </Badge>
      </div>

      {/* Getting Started Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold font-poppins text-center">Getting Started in 4 Steps</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={step.id} className="glass hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-poppins">{step.title}</CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {step.time}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-blue-500">
                      {step.id}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{step.description}</p>
                  <Link to={step.link}>
                    <Button className="w-full" variant={step.status === 'start' ? 'default' : 'outline'}>
                      {step.status === 'start' ? (
                        <>
                          <PlayCircle className="w-4 h-4 mr-2" />
                          Start Now
                        </>
                      ) : (
                        <>
                          Coming Next
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold font-poppins text-center">Quick Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card key={action.title} className="glass hover:shadow-md transition-all duration-300">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl flex items-center justify-center mx-auto">
                    <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{action.title}</h3>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                  <Link to={action.link}>
                    <Button variant="outline" size="sm" className="w-full">
                      Access
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Help Section */}
      <Card className="glass text-center">
        <CardContent className="p-8 space-y-4">
          <h3 className="text-xl font-semibold font-poppins">Need Help?</h3>
          <p className="text-muted-foreground">
            Explore our documentation or contact support for assistance
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline">
              <BookOpen className="w-4 h-4 mr-2" />
              Documentation
            </Button>
            <Button variant="outline">
              <Users className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
