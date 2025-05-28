
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="w-9 h-9 p-0"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-5 h-5">
        {theme === 'light' ? (
          // Sun icon
          <div className="w-5 h-5 relative">
            <div className="absolute inset-1 bg-foreground rounded-full"></div>
            <div className="absolute top-0 left-1/2 w-0.5 h-1 bg-foreground transform -translate-x-1/2"></div>
            <div className="absolute bottom-0 left-1/2 w-0.5 h-1 bg-foreground transform -translate-x-1/2"></div>
            <div className="absolute left-0 top-1/2 w-1 h-0.5 bg-foreground transform -translate-y-1/2"></div>
            <div className="absolute right-0 top-1/2 w-1 h-0.5 bg-foreground transform -translate-y-1/2"></div>
          </div>
        ) : (
          // Moon icon
          <div className="w-5 h-5 relative">
            <div className="absolute inset-0 bg-foreground rounded-full"></div>
            <div className="absolute top-0.5 right-0.5 w-3 h-3 bg-background rounded-full"></div>
          </div>
        )}
      </div>
    </Button>
  );
};
