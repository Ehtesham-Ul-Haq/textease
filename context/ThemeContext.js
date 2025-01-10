import React, { createContext, useState, useEffect } from 'react';

// Create the ThemeContext
export const ThemeContext = createContext();

// ThemeProvider Component
const ThemeProvider = ({ children }) => {
  // State to manage the current theme
  const [theme, setTheme] = useState('system'); // Default theme is 'system'

  // Effect to initialize the theme based on localStorage (only on the client side)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      setTheme(savedTheme || 'system');
    }
  }, []);

  // Function to apply the selected theme
  const applyTheme = (themeMode) => {
    const root = document.documentElement;

    if (themeMode === 'system') {
      // Check the user's system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', systemPrefersDark);
    } else {
      // Apply light or dark mode
      root.classList.toggle('dark', themeMode === 'dark');
    }
  };

  // Effect to update theme whenever it changes
  useEffect(() => {
    if (theme !== 'system') {
      applyTheme(theme);
      localStorage.setItem('theme', theme); // Save the selected theme to localStorage
    }
  }, [theme]);

  // Listener for system theme changes when in 'system' mode
  useEffect(() => {
    if (theme === 'system') {
      const handleSystemChange = (e) => {
        const systemPrefersDark = e.matches;
        document.documentElement.classList.toggle('dark', systemPrefersDark);
      };

      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
      systemTheme.addEventListener('change', handleSystemChange);

      return () => {
        systemTheme.removeEventListener('change', handleSystemChange);
      };
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
