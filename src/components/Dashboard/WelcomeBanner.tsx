
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/contexts/UserContext';
import { 
  Bot, 
  Database, 
  Users, 
  Rocket,
  ArrowRight,
  CheckCircle,
  Clock
} from 'lucide-react';

const onboardingSteps = [
  { id: 'profile', title: 'Complete Profile', completed: true, icon: Users },
  { id: 'database', title: 'Connect Database', completed: true, icon: Database },
  { id: 'chatbot', title: 'Create First Bot', completed: false, icon: Bot },
  { id: 'deploy', title: 'Deploy Bot', completed: false, icon: Rocket },
];

export const WelcomeBanner = () => {
  const { user } = useUser();
  const completedSteps = onboardingSteps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / onboardingSteps.length) * 100;

  return (
    <Card className="glass border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Welcome Message */}
          <div className="space-y-3">
            <div>
              <h1 className="text-2xl font-bold font-poppins text-gray-800 dark:text-gray-100">
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Let's build your next chatbot and grow your business
              </p>
            </div>

            {/* Progress Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Setup Progress
                </span>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                  {completedSteps}/{onboardingSteps.length} Complete
                </Badge>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              
              <div className="flex items-center space-x-4 mt-3">
                {onboardingSteps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.id} className="flex items-center space-x-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                      </div>
                      <span className={`text-xs font-medium hidden sm:block ${
                        step.completed ? 'text-green-600 dark:text-green-400' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              <Bot className="w-4 h-4 mr-2" />
              Create Bot
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" size="sm">
              <Database className="w-4 h-4 mr-2" />
              View Tutorial
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
