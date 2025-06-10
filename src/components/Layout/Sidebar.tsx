
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  Database,
  Key,
  Webhook,
  Search,
  User,
  Calendar,
  FileText,
  BarChart3,
  Bot,
  Puzzle,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  Shield,
  Palette,
  Code
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

// Platform Management items (moved to top)
const platformItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Tenants', path: '/tenants' },
  { icon: User, label: 'Users & Roles', path: '/users' },
  { icon: Database, label: 'Database', path: '/database' },
  { icon: Search, label: 'Channels', path: '/channels' },
  { icon: Key, label: 'API Keys', path: '/api-keys' },
  { icon: Puzzle, label: 'Integrations', path: '/integrations' },
  { icon: Webhook, label: 'Webhooks', path: '/webhooks' },
];

// Chatbot & AI related items (second section)
const chatbotItems = [
  { icon: Bot, label: 'Create Chatbot', path: '/chatbot' },
  { icon: Bot, label: 'Manage Chatbots', path: '/manage-chatbots' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
];

// Content Management items (third section)
const contentItems = [
  { icon: Calendar, label: 'Social Media', path: '/social-media' },
  { icon: FileText, label: 'Content Hub', path: '/content-hub' },
];

const settingsSubItems = [
  { icon: Settings, label: 'General', path: '/settings', tabValue: 'general' },
  { icon: Palette, label: 'Theme', path: '/settings', tabValue: 'theme' },
  { icon: Shield, label: 'Security', path: '/settings', tabValue: 'auth' },
  { icon: Puzzle, label: 'Integrations', path: '/settings', tabValue: 'integrations' },
  { icon: Bot, label: 'AI Config', path: '/settings', tabValue: 'ai' },
  { icon: Code, label: 'Developer', path: '/settings', tabValue: 'developer' },
];

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();
  const [settingsExpanded, setSettingsExpanded] = useState(location.pathname === '/settings');

  const handleSettingsClick = () => {
    if (!collapsed) {
      setSettingsExpanded(!settingsExpanded);
    }
  };

  const isSettingsPage = location.pathname === '/settings';

  const renderMenuSection = (items: any[], sectionTitle: string) => (
    <div className="space-y-1">
      {!collapsed && (
        <div className="px-3 py-2">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {sectionTitle}
          </h3>
        </div>
      )}
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
              isActive
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/50 dark:hover:to-purple-950/50 hover:text-blue-700 dark:hover:text-blue-300",
              collapsed && "justify-center"
            )}
            title={collapsed ? item.label : undefined}
          >
            <Icon className={cn(
              "w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110",
              isActive && "text-white"
            )} />
            {!collapsed && (
              <span className="ml-3 truncate">{item.label}</span>
            )}
            {isActive && (
              <div className="absolute right-2 w-2 h-2 bg-white rounded-full opacity-80"></div>
            )}
          </Link>
        );
      })}
    </div>
  );

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-gradient-to-b from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/30 border-r border-blue-100 dark:border-blue-900/50 transition-all duration-300 z-40 shadow-lg",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 border-b border-blue-100 dark:border-blue-900/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-poppins font-bold text-gray-800 dark:text-gray-100">
                  AI Platform
                </h1>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  Smart Dashboard
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
          {/* Platform Management Section (first) */}
          {renderMenuSection(platformItems, "Platform")}
          
          {/* Chatbot & AI Section (second) */}
          {renderMenuSection(chatbotItems, "Chatbot & AI")}
          
          {/* Content Management Section (third) */}
          {renderMenuSection(contentItems, "Content Management")}

          {/* Settings with Sub-menu (last) */}
          <div className="space-y-1">
            {!collapsed && (
              <div className="px-3 py-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Configuration
                </h3>
              </div>
            )}
            
            <div>
              <button
                onClick={handleSettingsClick}
                className={cn(
                  "w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                  isSettingsPage
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/50 dark:hover:to-purple-950/50 hover:text-blue-700 dark:hover:text-blue-300",
                  collapsed && "justify-center"
                )}
                title={collapsed ? "Settings" : undefined}
              >
                <Settings className={cn(
                  "w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110",
                  isSettingsPage && "text-white"
                )} />
                {!collapsed && (
                  <>
                    <span className="ml-3 truncate">Settings</span>
                    {settingsExpanded ? (
                      <ChevronDown className="w-4 h-4 ml-auto" />
                    ) : (
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    )}
                  </>
                )}
                {isSettingsPage && (
                  <div className="absolute right-2 w-2 h-2 bg-white rounded-full opacity-80"></div>
                )}
              </button>

              {/* Settings Sub-menu */}
              {!collapsed && settingsExpanded && (
                <div className="ml-6 mt-1 space-y-1">
                  {settingsSubItems.map((subItem) => {
                    const SubIcon = subItem.icon;
                    const searchParams = new URLSearchParams(location.search);
                    const currentTab = searchParams.get('tab') || 'general';
                    const isSubActive = location.pathname === subItem.path && currentTab === subItem.tabValue;
                    
                    return (
                      <Link
                        key={subItem.tabValue}
                        to={`${subItem.path}?tab=${subItem.tabValue}`}
                        className={cn(
                          "flex items-center px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 group",
                          isSubActive
                            ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200"
                        )}
                      >
                        <SubIcon className="w-4 h-4 flex-shrink-0" />
                        <span className="ml-2 truncate">{subItem.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </nav>

        {/* Collapse Button */}
        <div className="p-3 border-t border-blue-100 dark:border-blue-900/50">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center py-2 px-3 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/50 dark:hover:to-purple-950/50 transition-colors group"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <div className={cn(
              "w-4 h-4 transition-transform group-hover:scale-110",
              collapsed ? "rotate-180" : ""
            )}>
              ←
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
