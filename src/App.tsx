
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdminLayout } from '@/components/Layout/AdminLayout';
import { Dashboard } from '@/pages/Dashboard';
import { Users } from '@/pages/Users';
import { Tenants } from '@/pages/Tenants';
import { Database } from '@/pages/Database';
import { Settings } from '@/pages/Settings';
import { ApiKeys } from '@/pages/ApiKeys';
import { Webhooks } from '@/pages/Webhooks';
import { Channels } from '@/pages/Channels';
import { Analytics } from '@/pages/Analytics';
import { SocialMediaManager } from '@/pages/SocialMediaManager';
import { ContentHub } from '@/pages/ContentHub';
import { ChatbotTuning } from '@/pages/ChatbotTuning';
import { AIConfig } from '@/pages/AIConfig';
import { Integrations } from '@/pages/Integrations';
import { NotFound } from '@/pages/NotFound';
import { Toaster } from '@/components/ui/sonner';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AdminLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/tenants" element={<Tenants />} />
            <Route path="/database" element={<Database />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/api-keys" element={<ApiKeys />} />
            <Route path="/webhooks" element={<Webhooks />} />
            <Route path="/channels" element={<Channels />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/social-media" element={<SocialMediaManager />} />
            <Route path="/content-hub" element={<ContentHub />} />
            <Route path="/chatbot" element={<ChatbotTuning />} />
            <Route path="/ai-config" element={<AIConfig />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/messages" element={<div className="p-6">Messages Page - Coming Soon</div>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AdminLayout>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
