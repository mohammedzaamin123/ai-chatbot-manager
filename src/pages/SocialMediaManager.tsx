
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar as CalendarIcon,
  Instagram,
  Facebook,
  Linkedin,
  MessageSquare,
  Image as ImageIcon,
  Video,
  Sparkles,
  Clock,
  Target
} from 'lucide-react';

export const SocialMediaManager = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [contentGoal, setContentGoal] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [tone, setTone] = useState('professional');
  
  const platforms = [
    { name: 'Instagram', icon: Instagram, color: 'bg-pink-500', selected: true },
    { name: 'Facebook', icon: Facebook, color: 'bg-blue-500', selected: true },
    { name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700', selected: false },
    { name: 'Twitter', icon: MessageSquare, color: 'bg-sky-500', selected: true }
  ];

  const scheduledPosts = [
    {
      id: 1,
      platform: 'Instagram',
      content: 'Exciting news coming this week! 🚀',
      date: '2024-06-12',
      time: '10:00 AM',
      status: 'scheduled'
    },
    {
      id: 2,
      platform: 'Facebook',
      content: 'Behind the scenes of our latest project...',
      date: '2024-06-12',
      time: '2:00 PM',
      status: 'draft'
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          AI Social Media Manager
        </h1>
        <p className="text-muted-foreground mt-2">
          Create, schedule, and manage your social media content with AI assistance
        </p>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-1">
          <TabsTrigger value="create" className="rounded-xl">Create Content</TabsTrigger>
          <TabsTrigger value="schedule" className="rounded-xl">Schedule Posts</TabsTrigger>
          <TabsTrigger value="calendar" className="rounded-xl">Calendar View</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Content Creation Form */}
            <Card className="glass border-0 rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                  AI Content Generator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="goal">Content Goal</Label>
                  <Textarea
                    id="goal"
                    placeholder="What do you want to achieve with this post?"
                    value={contentGoal}
                    onChange={(e) => setContentGoal(e.target.value)}
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="audience">Target Audience</Label>
                  <Input
                    id="audience"
                    placeholder="e.g., young professionals, tech enthusiasts"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <Label>Tone</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['professional', 'casual', 'humorous', 'inspirational'].map((t) => (
                      <Badge
                        key={t}
                        variant={tone === t ? 'default' : 'outline'}
                        className={`cursor-pointer rounded-xl ${
                          tone === t 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                            : 'hover:bg-purple-50'
                        }`}
                        onClick={() => setTone(t)}
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Platform Selection</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {platforms.map((platform) => {
                      const Icon = platform.icon;
                      return (
                        <div
                          key={platform.name}
                          className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${
                            platform.selected
                              ? 'border-purple-300 bg-purple-50'
                              : 'border-gray-200 hover:border-purple-200'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <div className={`p-1 rounded ${platform.color}`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-sm font-medium">{platform.name}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <Label>Content Type</Label>
                  <div className="flex space-x-2 mt-2">
                    <Button variant="outline" className="rounded-xl flex-1">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Text
                    </Button>
                    <Button variant="outline" className="rounded-xl flex-1">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Image
                    </Button>
                    <Button variant="outline" className="rounded-xl flex-1">
                      <Video className="w-4 h-4 mr-2" />
                      Video
                    </Button>
                  </div>
                </div>

                <Button className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Content
                </Button>
              </CardContent>
            </Card>

            {/* Generated Content Preview */}
            <Card className="glass border-0 rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle>Generated Content Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <h4 className="font-medium mb-2">Instagram Post</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      🚀 Exciting things are happening! We're revolutionizing the way businesses connect with their customers through AI-powered solutions. 
                      
                      What's your biggest challenge in customer engagement? Let us know in the comments! 
                      
                      #AI #Innovation #CustomerExperience #TechStartup
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-pink-100 text-pink-800">Instagram</Badge>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline" className="rounded-lg">Edit</Button>
                        <Button size="sm" className="rounded-lg bg-pink-500 hover:bg-pink-600">Schedule</Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <h4 className="font-medium mb-2">Facebook Post</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      We believe in the power of artificial intelligence to transform businesses. Our latest solutions are designed to help companies of all sizes enhance their customer relationships and drive growth.
                      
                      Curious about how AI can benefit your business? Check out our latest blog post or schedule a free consultation.
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge className="bg-blue-100 text-blue-800">Facebook</Badge>
                      <div className="space-x-2">
                        <Button size="sm" variant="outline" className="rounded-lg">Edit</Button>
                        <Button size="sm" className="rounded-lg bg-blue-500 hover:bg-blue-600">Schedule</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="glass border-0 rounded-2xl shadow-lg">
                <CardHeader>
                  <CardTitle>Scheduled Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scheduledPosts.map((post) => (
                      <div key={post.id} className="p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={`${
                            post.platform === 'Instagram' ? 'bg-pink-100 text-pink-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {post.platform}
                          </Badge>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {post.date} at {post.time}
                          </div>
                        </div>
                        <p className="text-sm mb-3">{post.content}</p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="rounded-lg">Edit</Button>
                          <Button size="sm" variant="outline" className="rounded-lg">Reschedule</Button>
                          <Badge variant={post.status === 'scheduled' ? 'default' : 'secondary'}>
                            {post.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="glass border-0 rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle>Quick Schedule</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-xl"
                />
                <div className="space-y-2">
                  <Label>Time</Label>
                  <Input type="time" className="rounded-xl" />
                </div>
                <Button className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-500">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Schedule Post
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <Card className="glass border-0 rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle>Content Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-4 mb-6">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center font-medium text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-4">
                {Array.from({ length: 35 }, (_, i) => (
                  <div key={i} className="aspect-square border rounded-xl p-2 hover:bg-muted/30 cursor-pointer">
                    <div className="text-sm text-muted-foreground mb-1">
                      {((i % 31) + 1)}
                    </div>
                    {i === 12 && (
                      <div className="space-y-1">
                        <div className="w-full h-1 bg-pink-300 rounded"></div>
                        <div className="w-full h-1 bg-blue-300 rounded"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
