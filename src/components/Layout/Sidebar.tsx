
import React from 'react';
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
  MessageSquare
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Calendar, label: 'Social Media', path: '/social-media' },
  { icon: FileText, label: 'Content Hub', path: '/content-hub' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: MessageSquare, label: 'Messages', path: '/messages' },
  { icon: Bot, label: 'Chatbot', path: '/chatbot' },
  { icon: Users, label: 'Tenants', path: '/tenants' },
  { icon: User, label: 'Users & Roles', path: '/users' },
  { icon: Search, label: 'Channels', path: '/channels' },
  { icon: Key, label: 'API Keys', path: '/api-keys' },
  { icon: Database, label: 'Database', path: '/database' },
  { icon: Puzzle, label: 'Integrations', path: '/integrations' },
  { icon: Webhook, label: 'Webhooks', path: '/webhooks' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

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
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
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
