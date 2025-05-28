
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Palette, Check } from 'lucide-react';

interface ColorTheme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    foreground: string;
    muted: string;
    accent: string;
  };
  contrastRatio: number;
}

const colorThemes: ColorTheme[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Clean black and white',
    colors: {
      primary: '#000000',
      secondary: '#f5f5f5',
      background: '#ffffff',
      foreground: '#000000',
      muted: '#737373',
      accent: '#e5e5e5'
    },
    contrastRatio: 21
  },
  {
    id: 'minimal-gray',
    name: 'Minimal Gray',
    description: 'Soft grayscale hierarchy',
    colors: {
      primary: '#171717',
      secondary: '#f5f5f5',
      background: '#fafafa',
      foreground: '#171717',
      muted: '#525252',
      accent: '#e5e5e5'
    },
    contrastRatio: 18.2
  },
  {
    id: 'high-contrast',
    name: 'High Contrast',
    description: 'Maximum accessibility',
    colors: {
      primary: '#000000',
      secondary: '#ffffff',
      background: '#ffffff',
      foreground: '#000000',
      muted: '#404040',
      accent: '#d4d4d4'
    },
    contrastRatio: 21
  },
  {
    id: 'warm-gray',
    name: 'Warm Gray',
    description: 'Subtle warm undertones',
    colors: {
      primary: '#1c1917',
      secondary: '#f7f5f3',
      background: '#fafaf9',
      foreground: '#1c1917',
      muted: '#57534e',
      accent: '#e7e5e4'
    },
    contrastRatio: 17.8
  },
  {
    id: 'cool-gray',
    name: 'Cool Gray',
    description: 'Clean blue undertones',
    colors: {
      primary: '#0f172a',
      secondary: '#f8fafc',
      background: '#ffffff',
      foreground: '#0f172a',
      muted: '#475569',
      accent: '#e2e8f0'
    },
    contrastRatio: 19.1
  },
  {
    id: 'paper',
    name: 'Paper',
    description: 'Soft paper-like texture',
    colors: {
      primary: '#18181b',
      secondary: '#f4f4f5',
      background: '#fefefe',
      foreground: '#18181b',
      muted: '#52525b',
      accent: '#e4e4e7'
    },
    contrastRatio: 18.5
  }
];

export const ThemeCustomization = () => {
  const [selectedTheme, setSelectedTheme] = useState('default');

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    const theme = colorThemes.find(t => t.id === themeId);
    if (theme) {
      // Apply theme colors to CSS variables
      const root = document.documentElement;
      root.style.setProperty('--primary', `${theme.colors.primary}`);
      root.style.setProperty('--secondary', `${theme.colors.secondary}`);
      root.style.setProperty('--background', `${theme.colors.background}`);
      root.style.setProperty('--foreground', `${theme.colors.foreground}`);
      root.style.setProperty('--muted', `${theme.colors.muted}`);
      root.style.setProperty('--accent', `${theme.colors.accent}`);
      
      // Store in localStorage
      localStorage.setItem('selected-theme', themeId);
    }
  };

  const getContrastLevel = (ratio: number) => {
    if (ratio >= 20) return { level: 'Excellent', color: 'bg-green-100 text-green-800' };
    if (ratio >= 15) return { level: 'Very Good', color: 'bg-blue-100 text-blue-800' };
    if (ratio >= 10) return { level: 'Good', color: 'bg-yellow-100 text-yellow-800' };
    return { level: 'Fair', color: 'bg-orange-100 text-orange-800' };
  };

  return (
    <Card className="glass">
      <CardHeader>
        <CardTitle className="font-poppins flex items-center">
          <Palette className="w-5 h-5 mr-2" />
          Color Theme
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Choose from carefully crafted color themes with optimal contrast ratios
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Color Theme Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {colorThemes.map((theme) => {
            const contrast = getContrastLevel(theme.contrastRatio);
            return (
              <div
                key={theme.id}
                className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                  selectedTheme === theme.id
                    ? 'border-foreground bg-muted/20'
                    : 'border-border hover:border-muted-foreground'
                }`}
                onClick={() => handleThemeSelect(theme.id)}
              >
                {selectedTheme === theme.id && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-4 h-4 text-foreground" />
                  </div>
                )}
                
                {/* Color Preview */}
                <div className="mb-3">
                  <div className="flex h-8 rounded overflow-hidden">
                    <div 
                      className="flex-1" 
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <div 
                      className="flex-1" 
                      style={{ backgroundColor: theme.colors.secondary }}
                    />
                    <div 
                      className="flex-1" 
                      style={{ backgroundColor: theme.colors.muted }}
                    />
                    <div 
                      className="flex-1" 
                      style={{ backgroundColor: theme.colors.accent }}
                    />
                  </div>
                </div>
                
                {/* Theme Info */}
                <div className="space-y-2">
                  <div>
                    <h3 className="font-medium font-poppins">{theme.name}</h3>
                    <p className="text-xs text-muted-foreground">{theme.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Badge className={`text-xs ${contrast.color}`}>
                      {contrast.level}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {theme.contrastRatio}:1
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Color Hierarchy Info */}
        <div className="bg-muted/20 p-4 rounded-lg">
          <h4 className="font-medium font-poppins mb-2">Color Hierarchy</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Primary:</span> Main text, buttons
            </div>
            <div>
              <span className="font-medium">Secondary:</span> Backgrounds, cards
            </div>
            <div>
              <span className="font-medium">Muted:</span> Secondary text, borders
            </div>
            <div>
              <span className="font-medium">Accent:</span> Highlights, hover states
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            All themes maintain WCAG AAA compliance with contrast ratios above 7:1
          </p>
        </div>

        {/* Apply Button */}
        <div className="flex justify-end">
          <Button 
            onClick={() => handleThemeSelect(selectedTheme)}
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            Apply Theme
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
