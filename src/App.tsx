
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UserProvider } from "@/contexts/UserContext";
import { AdminLayout } from "@/components/Layout/AdminLayout";
import { Dashboard } from "@/pages/Dashboard";
import { Tenants } from "@/pages/Tenants";
import { Users } from "@/pages/Users";
import { Channels } from "@/pages/Channels";
import { ChatbotTuning } from "@/pages/ChatbotTuning";
import { ApiKeys } from "@/pages/ApiKeys";
import { Database } from "@/pages/Database";
import { Integrations } from "@/pages/Integrations";
import { Webhooks } from "@/pages/Webhooks";
import { Settings } from "@/pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={
                <AdminLayout>
                  <Dashboard />
                </AdminLayout>
              } />
              <Route path="/tenants" element={
                <AdminLayout>
                  <Tenants />
                </AdminLayout>
              } />
              <Route path="/users" element={
                <AdminLayout>
                  <Users />
                </AdminLayout>
              } />
              <Route path="/channels" element={
                <AdminLayout>
                  <Channels />
                </AdminLayout>
              } />
              <Route path="/chatbot" element={
                <AdminLayout>
                  <ChatbotTuning />
                </AdminLayout>
              } />
              <Route path="/api-keys" element={
                <AdminLayout>
                  <ApiKeys />
                </AdminLayout>
              } />
              <Route path="/database" element={
                <AdminLayout>
                  <Database />
                </AdminLayout>
              } />
              <Route path="/integrations" element={
                <AdminLayout>
                  <Integrations />
                </AdminLayout>
              } />
              <Route path="/webhooks" element={
                <AdminLayout>
                  <Webhooks />
                </AdminLayout>
              } />
              <Route path="/settings" element={
                <AdminLayout>
                  <Settings />
                </AdminLayout>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
