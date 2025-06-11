
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  MessageSquare, 
  Users, 
  Zap, 
  Shield, 
  Globe,
  ArrowRight,
  Check,
  Mail,
  Github
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { toast } from 'sonner';

export const Landing = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setUser({
        id: '1',
        name: name || 'John Doe',
        email: email,
        role: 'Admin'
      });
      toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
      navigate('/onboarding');
      setIsLoading(false);
    }, 1500);
  };

  const handleSSOLogin = (provider: string) => {
    toast.success(`Redirecting to ${provider}...`);
    // In real app, this would redirect to SSO provider
  };

  const features = [
    { icon: Bot, title: 'AI-Powered Chatbots', description: 'Build intelligent chatbots in minutes' },
    { icon: MessageSquare, title: 'Multi-Channel Support', description: 'Deploy across web, WhatsApp, and more' },
    { icon: Users, title: 'Team Collaboration', description: 'Invite teammates and manage permissions' },
    { icon: Zap, title: 'Database Integration', description: 'Connect your data for smart responses' },
    { icon: Shield, title: 'Enterprise Security', description: 'SOC 2 compliant with role-based access' },
    { icon: Globe, title: 'Global Scale', description: 'Handle millions of conversations' }
  ];

  const testimonials = [
    { name: 'Sarah Chen', role: 'Head of Support, TechCorp', quote: 'Reduced our response time by 80%' },
    { name: 'Mike Johnson', role: 'CEO, StartupXYZ', quote: 'Game-changer for customer engagement' },
    { name: 'Lisa Park', role: 'CTO, DataFlow', quote: 'Seamless integration with our systems' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-poppins font-bold text-xl text-gray-800 dark:text-gray-100">
                ChatBot Pro
              </h1>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Instantly build and manage AI chatbots
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-100 text-green-800 px-3 py-1">
              <Check className="w-3 h-3 mr-1" />
              SOC 2 Certified
            </Badge>
            <Button variant="ghost" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign Up' : 'Sign In'}
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                🚀 New: Advanced AI Models Available
              </Badge>
              <h1 className="text-5xl font-bold font-poppins bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                Build AI Chatbots That Actually Work
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                Create intelligent chatbots with database integration, multi-channel deployment, 
                and enterprise-grade security. No coding required.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.slice(0, 4).map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="font-medium text-sm">{feature.title}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-gray-600">Active Bots</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>

          {/* Right Column - Auth Form */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md glass shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-poppins">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </CardTitle>
                <p className="text-muted-foreground">
                  {isLogin ? 'Sign in to your account' : 'Start building chatbots today'}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* SSO Buttons */}
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleSSOLogin('Google')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Continue with Google
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleSSOLogin('GitHub')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Continue with GitHub
                  </Button>
                </div>

                <div className="relative">
                  <Separator />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-background px-2 text-xs text-muted-foreground">
                      or continue with email
                    </span>
                  </div>
                </div>

                {/* Email Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        required={!isLogin}
                      />
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  {isLogin && (
                    <div className="text-right">
                      <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    ) : null}
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </form>

                <div className="text-center text-sm text-muted-foreground">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-poppins mb-4">
              Everything you need to build amazing chatbots
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Powerful features that scale with your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="glass hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center mx-auto">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-24 space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold font-poppins mb-4">
              Trusted by teams worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass">
                <CardContent className="p-6 space-y-4">
                  <p className="text-lg italic">"{testimonial.quote}"</p>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
