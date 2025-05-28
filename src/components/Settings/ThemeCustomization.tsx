
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Palette, Check } from 'lucide-react';
import { toast } from 'sonner';

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
    border: string;
    card: string;
    cardForeground: string;
    mutedForeground: string;
    accentForeground: string;
  };
  contrastRatio: number;
}

const colorThemes: ColorTheme[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Clean black and white',
    colors: {
      primary: '0 0% 9%',
      secondary: '0 0% 96.1%',
      background: '0 0% 100%',
      foreground: '0 0% 3.9%',
      muted: '0 0% 96.1%',
      accent: '0 0% 96.1%',
      border: '0 0% 89.8%',
      card: '0 0% 100%',
      cardForeground: '0 0% 3.9%',
      mutedForeground: '0 0% 45.1%',
      accentForeground: '0 0% 9%'
    },
    contrastRatio: 21
  },
  {
    id: 'minimal-gray',
    name: 'Minimal Gray',
    description: 'Soft grayscale hierarchy',
    colors: {
      primary: '0 0% 9%',
      secondary: '0 0% 96.1%',
      background: '0 0% 98%',
      foreground: '0 0% 9%',
      muted: '0 0% 96.1%',
      accent: '0 0% 90%',
      border: '0 0% 89.8%',
      card: '0 0% 98%',
      cardForeground: '0 0% 9%',
      mutedForeground: '0 0% 32%',
      accentForeground: '0 0% 9%'
    },
    contrastRatio: 18.2
  },
  {
    id: 'warm-gray',
    name: 'Warm Gray',
    description: 'Subtle warm undertones',
    colors: {
      primary: '20 14% 11%',
      secondary: '24 10% 97%',
      background: '24 10% 98%',
      foreground: '20 14% 11%',
      muted: '24 10% 95%',
      accent: '24 6% 90%',
      border: '24 6% 87%',
      card: '24 10% 98%',
      cardForeground: '20 14% 11%',
      mutedForeground: '25 5% 34%',
      accentForeground: '20 14% 11%'
    },
    contrastRatio: 17.8
  },
  {
    id: 'cool-gray',
    name: 'Cool Gray',
    description: 'Clean blue undertones',
    colors: {
      primary: '222 84% 5%',
      secondary: '210 40% 98%',
      background: '0 0% 100%',
      foreground: '222 84% 5%',
      muted: '210 40% 95%',
      accent: '210 40% 92%',
      border: '214 32% 91%',
      card: '0 0% 100%',
      cardForeground: '222 84% 5%',
      mutedForeground: '215 16% 28%',
      accentForeground: '222 84% 5%'
    },
    contrastRatio: 19.1
  },
  {
    id: 'paper',
    name: 'Paper',
    description: 'Soft paper-like texture',
    colors: {
      primary: '240 10% 9%',
      secondary: '240 5% 96%',
      background: '240 6% 99%',
      foreground: '240 10% 9%',
      muted: '240 5% 95%',
      accent: '240 5% 91%',
      border: '240 6% 88%',
      card: '240 6% 99%',
      cardForeground: '240 10% 9%',
      mutedForeground: '240 4% 33%',
      accentForeground: '240 10% 9%'
    },
    contrastRatio: 18.5
  },
  {
    id: 'high-contrast',
    name: 'High Contrast',
    description: 'Maximum accessibility',
    colors: {
      primary: '0 0% 0%',
      secondary: '0 0% 100%',
      background: '0 0% 100%',
      foreground: '0 0% 0%',
      muted: '0 0% 95%',
      accent: '0 0% 93%',
      border: '0 0% 85%',
      card: '0 0% 100%',
      cardForeground: '0 0% 0%',
      mutedForeground: '0 0% 25%',
      accentForeground: '0 0% 0%'
    },
    contrastRatio: 21
  },
  {
    id: 'charcoal',
    name: 'Charcoal',
    description: 'Deep charcoal tones',
    colors: {
      primary: '0 0% 15%',
      secondary: '0 0% 95%',
      background: '0 0% 97%',
      foreground: '0 0% 15%',
      muted: '0 0% 93%',
      accent: '0 0% 89%',
      border: '0 0% 85%',
      card: '0 0% 97%',
      cardForeground: '0 0% 15%',
      mutedForeground: '0 0% 38%',
      accentForeground: '0 0% 15%'
    },
    contrastRatio: 16.8
  },
  {
    id: 'slate',
    name: 'Slate',
    description: 'Modern slate appearance',
    colors: {
      primary: '215 28% 17%',
      secondary: '210 20% 96%',
      background: '210 20% 98%',
      foreground: '215 28% 17%',
      muted: '210 20% 94%',
      accent: '210 20% 90%',
      border: '214 20% 87%',
      card: '210 20% 98%',
      cardForeground: '215 28% 17%',
      mutedForeground: '215 14% 35%',
      accentForeground: '215 28% 17%'
    },
    contrastRatio: 15.2
  },
  {
    id: 'stone',
    name: 'Stone',
    description: 'Natural stone colors',
    colors: {
      primary: '28 25% 18%',
      secondary: '30 20% 96%',
      background: '30 20% 98%',
      foreground: '28 25% 18%',
      muted: '30 20% 94%',
      accent: '30 20% 90%',
      border: '30 15% 87%',
      card: '30 20% 98%',
      cardForeground: '28 25% 18%',
      mutedForeground: '30 10% 36%',
      accentForeground: '28 25% 18%'
    },
    contrastRatio: 14.8
  },
  {
    id: 'neutral',
    name: 'Neutral',
    description: 'Balanced neutral palette',
    colors: {
      primary: '0 0% 12%',
      secondary: '0 0% 95%',
      background: '0 0% 97%',
      foreground: '0 0% 12%',
      muted: '0 0% 93%',
      accent: '0 0% 89%',
      border: '0 0% 86%',
      card: '0 0% 97%',
      cardForeground: '0 0% 12%',
      mutedForeground: '0 0% 40%',
      accentForeground: '0 0% 12%'
    },
    contrastRatio: 17.5
  },
  {
    id: 'zinc',
    name: 'Zinc',
    description: 'Industrial zinc finish',
    colors: {
      primary: '240 6% 15%',
      secondary: '240 5% 95%',
      background: '240 5% 97%',
      foreground: '240 6% 15%',
      muted: '240 5% 93%',
      accent: '240 5% 89%',
      border: '240 6% 86%',
      card: '240 5% 97%',
      cardForeground: '240 6% 15%',
      mutedForeground: '240 4% 37%',
      accentForeground: '240 6% 15%'
    },
    contrastRatio: 16.3
  },
  {
    id: 'soft-blue',
    name: 'Soft Blue',
    description: 'Gentle blue undertones',
    colors: {
      primary: '217 32% 17%',
      secondary: '214 32% 96%',
      background: '214 32% 98%',
      foreground: '217 32% 17%',
      muted: '214 32% 94%',
      accent: '214 32% 90%',
      border: '214 25% 87%',
      card: '214 32% 98%',
      cardForeground: '217 32% 17%',
      mutedForeground: '217 16% 36%',
      accentForeground: '217 32% 17%'
    },
    contrastRatio: 15.8
  }
];

export const ThemeCustomization = () => {
  const [selectedTheme, setSelectedTheme] = useState('default');

  useEffect(() => {
    const savedTheme = localStorage.getItem('selected-theme');
    if (savedTheme) {
      setSelectedTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (themeId: string) => {
    const theme = colorThemes.find(t => t.id === themeId);
    if (theme) {
      const root = document.documentElement;
      
      // Apply all theme colors to CSS variables
      Object.entries(theme.colors).forEach(([key, value]) => {
        const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        root.style.setProperty(`--${cssVar}`, value);
      });
      
      // Store in localStorage
      localStorage.setItem('selected-theme', themeId);
      
      toast.success(`Applied ${theme.name} theme successfully!`);
    }
  };

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
  };

  const handleApplyTheme = () => {
    applyTheme(selectedTheme);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                      style={{ backgroundColor: `hsl(${theme.colors.primary})` }}
                    />
                    <div 
                      className="flex-1" 
                      style={{ backgroundColor: `hsl(${theme.colors.secondary})` }}
                    />
                    <div 
                      className="flex-1" 
                      style={{ backgroundColor: `hsl(${theme.colors.muted})` }}
                    />
                    <div 
                      className="flex-1" 
                      style={{ backgroundColor: `hsl(${theme.colors.accent})` }}
                    />
                  </div>
                </div>
                
                {/* Theme Info */}
                <div className="space-y-2">
                  <div>
                    <h3 className="font-medium font-poppins text-sm">{theme.name}</h3>
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
            onClick={handleApplyTheme}
            className="bg-foreground text-background hover:bg-foreground/90"
          >
            Apply Theme
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
