
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText,
  Copy,
  Download,
  Edit,
  History,
  Sparkles,
  Target,
  Users,
  Zap,
  RefreshCw
} from 'lucide-react';

export const ContentHub = () => {
  const [contentGoal, setContentGoal] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [tone, setTone] = useState('professional');
  const [contentType, setContentType] = useState('blog');

  const versionHistory = [
    { id: 1, version: 'v1.0', date: '2024-06-10 14:30', status: 'current' },
    { id: 2, version: 'v0.9', date: '2024-06-10 14:15', status: 'previous' },
    { id: 3, version: 'v0.8', date: '2024-06-10 13:45', status: 'archived' }
  ];

  const generatedContent = {
    title: "Revolutionizing Customer Experience with AI-Powered Solutions",
    content: `In today's rapidly evolving digital landscape, businesses are constantly seeking innovative ways to enhance customer experience and drive engagement. Artificial Intelligence (AI) has emerged as a game-changing technology that's transforming how companies interact with their customers.

## The Power of AI in Customer Experience

AI-powered solutions offer unprecedented opportunities to:

- **Personalize interactions** at scale across all touchpoints
- **Predict customer needs** before they even express them  
- **Automate responses** while maintaining a human touch
- **Analyze sentiment** to improve service quality continuously

## Real-World Applications

### 1. Intelligent Chatbots
Modern AI chatbots can handle complex queries, understand context, and provide personalized responses that feel natural and helpful.

### 2. Predictive Analytics
By analyzing customer behavior patterns, AI can predict future needs and proactively offer solutions.

### 3. Dynamic Content Personalization
AI algorithms can customize content, recommendations, and offers based on individual customer preferences and behavior.

## The Future is Now

Companies that embrace AI-powered customer experience solutions today will have a significant competitive advantage tomorrow. The technology is not just about automation—it's about creating meaningful, personalized connections at scale.

Ready to transform your customer experience? Let's explore how AI can revolutionize your business operations and drive unprecedented growth.`,
    tags: ['AI', 'Customer Experience', 'Technology', 'Innovation', 'Digital Transformation'],
    wordCount: 187,
    readingTime: '2 min'
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
          AI Content Hub
        </h1>
        <p className="text-muted-foreground mt-2">
          Generate, edit, and manage high-quality content with AI assistance
        </p>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-1">
          <TabsTrigger value="create" className="rounded-xl">Create Content</TabsTrigger>
          <TabsTrigger value="manage" className="rounded-xl">Manage Content</TabsTrigger>
          <TabsTrigger value="history" className="rounded-xl">Version History</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Form */}
            <Card className="glass border-0 rounded-2xl shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-500" />
                  Content Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="content-goal">Content Goal</Label>
                  <Textarea
                    id="content-goal"
                    placeholder="What do you want to achieve with this content?"
                    value={contentGoal}
                    onChange={(e) => setContentGoal(e.target.value)}
                    className="rounded-xl"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="target-audience">Target Audience</Label>
                  <Input
                    id="target-audience"
                    placeholder="e.g., B2B decision makers, tech enthusiasts"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <Label>Content Type</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {['blog', 'email', 'social', 'article'].map((type) => (
                      <Badge
                        key={type}
                        variant={contentType === type ? 'default' : 'outline'}
                        className={`cursor-pointer rounded-xl text-center py-2 ${
                          contentType === type 
                            ? 'bg-gradient-to-r from-green-500 to-blue-500' 
                            : 'hover:bg-green-50'
                        }`}
                        onClick={() => setContentType(type)}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Tone & Style</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {['professional', 'casual', 'formal', 'conversational'].map((t) => (
                      <Badge
                        key={t}
                        variant={tone === t ? 'default' : 'outline'}
                        className={`cursor-pointer rounded-xl text-center py-2 ${
                          tone === t 
                            ? 'bg-gradient-to-r from-green-500 to-blue-500' 
                            : 'hover:bg-green-50'
                        }`}
                        onClick={() => setTone(t)}
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Additional Options</Label>
                  <Input placeholder="Keywords (comma-separated)" className="rounded-xl" />
                  <Input placeholder="Word count (optional)" type="number" className="rounded-xl" />
                </div>

                <Button className="w-full rounded-xl bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Content
                </Button>
              </CardContent>
            </Card>

            {/* Generated Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass border-0 rounded-2xl shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-blue-500" />
                      Generated Content
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-green-100 text-green-800">
                        {generatedContent.wordCount} words
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-800">
                        {generatedContent.readingTime} read
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
                        {generatedContent.title}
                      </h2>
                      <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
                        {generatedContent.content.split('\n').map((paragraph, index) => {
                          if (paragraph.startsWith('##')) {
                            return (
                              <h3 key={index} className="text-lg font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-200">
                                {paragraph.replace('## ', '')}
                              </h3>
                            );
                          }
                          if (paragraph.startsWith('###')) {
                            return (
                              <h4 key={index} className="text-base font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">
                                {paragraph.replace('### ', '')}
                              </h4>
                            );
                          }
                          if (paragraph.startsWith('- **')) {
                            return (
                              <li key={index} className="ml-4 mb-1">
                                {paragraph.replace('- **', '').replace('**', ': ').split(': ').map((part, i) => 
                                  i === 0 ? <strong key={i}>{part}:</strong> : part
                                )}
                              </li>
                            );
                          }
                          if (paragraph.trim()) {
                            return (
                              <p key={index} className="mb-4 leading-relaxed">
                                {paragraph}
                              </p>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-4 border-t">
                      {generatedContent.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="rounded-xl">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <Card className="glass border-0 rounded-2xl shadow-lg">
                <CardContent className="p-4">
                  <div className="flex flex-wrap gap-3">
                    <Button variant="outline" className="rounded-xl">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" className="rounded-xl">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" className="rounded-xl">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" className="rounded-xl">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                    <Button className="rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white ml-auto">
                      <Zap className="w-4 h-4 mr-2" />
                      Publish
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="manage">
          <Card className="glass border-0 rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle>Content Library</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Card key={item} className="border rounded-2xl hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2">
                        Sample Content Title {item}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                        This is a preview of the generated content that shows the first few lines...
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">Blog</Badge>
                        <div className="flex space-x-1">
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card className="glass border-0 rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                <History className="w-5 h-5 mr-2" />
                Version History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {versionHistory.map((version) => (
                  <div key={version.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                    <div>
                      <h4 className="font-medium">{version.version}</h4>
                      <p className="text-sm text-muted-foreground">{version.date}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={version.status === 'current' ? 'default' : 'outline'}>
                        {version.status}
                      </Badge>
                      <Button size="sm" variant="outline" className="rounded-lg">
                        View
                      </Button>
                      {version.status !== 'current' && (
                        <Button size="sm" variant="outline" className="rounded-lg">
                          Restore
                        </Button>
                      )}
                    </div>
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
