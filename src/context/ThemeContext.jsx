import React, { createContext, useContext, useState, useEffect } from 'react';
import { tokens } from '../theme/tokens';

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  // Default to 'dark' as explicitly required
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('mdi_dashboard_theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    localStorage.setItem('mdi_dashboard_theme', mode);
  }, [mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = tokens(mode);

  return (
    <ThemeContext.Provider value={{ mode, toggleColorMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};

