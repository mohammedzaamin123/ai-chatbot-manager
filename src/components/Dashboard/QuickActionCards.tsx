
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  FileText, 
  BarChart3, 
  Bot, 
  Puzzle, 
  MessageSquare,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  stats?: string;
  buttonText: string;
  delay?: number;
}

const QuickActionCard = ({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  bgColor, 
  stats, 
  buttonText,
  delay = 0 
}: QuickActionCardProps) => (
  <Card 
    className="glass hover-lift border-0 rounded-2xl shadow-lg transition-all duration-300"
    style={{ animationDelay: `${delay}ms` }}
  >
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <div className={`p-3 ${bgColor} rounded-xl`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        {stats && (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {stats}
          </Badge>
        )}
      </div>
      <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        {description}
      </p>
      <Button 
        className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
        size="sm"
      >
        <Zap className="w-4 h-4 mr-2" />
        {buttonText}
      </Button>
    </CardContent>
  </Card>
);

export const QuickActionCards = () => {
  const cards = [
    {
      title: 'Campaigns',
      description: 'Create and manage AI-powered marketing campaigns across all platforms',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      stats: '+12%',
      buttonText: 'Create Campaign'
    },
    {
      title: 'Content Hub',
      description: 'Generate engaging content with AI assistance for all your social channels',
      icon: FileText,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      stats: '23 drafts',
      buttonText: 'Generate Content'
    },
    {
      title: 'Analytics',
      description: 'Track performance and insights across all your marketing channels',
      icon: BarChart3,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      stats: '+34%',
      buttonText: 'View Analytics'
    },
    {
      title: 'Chatbot',
      description: 'Manage and customize your AI chatbot for customer engagement',
      icon: Bot,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      stats: '89% satisfaction',
      buttonText: 'Configure Bot'
    },
    {
      title: 'Integrations',
      description: 'Connect your favorite tools and platforms for seamless workflow',
      icon: Puzzle,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      stats: '8 connected',
      buttonText: 'Manage Integrations'
    },
    {
      title: 'Messages',
      description: 'Unified inbox for all your customer conversations and engagement',
      icon: MessageSquare,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
      stats: '12 new',
      buttonText: 'View Messages'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <QuickActionCard
          key={card.title}
          {...card}
          delay={index * 100}
        />
      ))}
    </div>
  );
};
