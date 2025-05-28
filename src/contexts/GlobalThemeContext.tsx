
import React, { createContext, useContext, useEffect, useState } from 'react';

interface GlobalThemeContextType {
  currentTheme: string;
  applyGlobalTheme: (themeId: string) => void;
}

const GlobalThemeContext = createContext<GlobalThemeContextType | undefined>(undefined);

export const useGlobalTheme = () => {
  const context = useContext(GlobalThemeContext);
  if (!context) {
    throw new Error('useGlobalTheme must be used within a GlobalThemeProvider');
  }
  return context;
};

export const GlobalThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState('default');

  useEffect(() => {
    const savedTheme = localStorage.getItem('selected-theme');
    if (savedTheme) {
      setCurrentTheme(savedTheme);
      applyGlobalTheme(savedTheme);
    }
  }, []);

  const applyGlobalTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem('selected-theme', themeId);
    
    // Dispatch a custom event to notify all components
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { themeId } }));
  };

  return (
    <GlobalThemeContext.Provider value={{ currentTheme, applyGlobalTheme }}>
      {children}
    </GlobalThemeContext.Provider>
  );
};
