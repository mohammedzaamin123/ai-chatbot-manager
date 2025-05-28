
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
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Tenants', path: '/tenants' },
  { icon: User, label: 'Users & Roles', path: '/users' },
  { icon: Search, label: 'Channels', path: '/channels' },
  { icon: Settings, label: 'Chatbot Fine-Tuning', path: '/chatbot' },
  { icon: Key, label: 'API Keys', path: '/api-keys' },
  { icon: Database, label: 'Database', path: '/database' },
  { icon: Settings, label: 'Integrations', path: '/integrations' },
  { icon: Webhook, label: 'Webhooks', path: '/webhooks' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = ({ collapsed, onToggle }: SidebarProps) => {
  const location = useLocation();

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 z-40",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-sidebar-primary-foreground rounded-sm"></div>
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-poppins font-semibold text-sidebar-foreground">
                  AI Platform
                </h1>
                <p className="text-xs text-sidebar-foreground/60">
                  Admin Dashboard
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors hover-lift",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  collapsed && "justify-center"
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="ml-3 truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse Button */}
        <div className="p-2 border-t border-sidebar-border">
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center py-2 px-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <div className={cn(
              "w-4 h-4 transition-transform",
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
