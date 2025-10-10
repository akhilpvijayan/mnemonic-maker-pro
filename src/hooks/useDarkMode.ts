import { useState, useEffect } from 'react';

const DARK_MODE_KEY = 'mnemonic_maker_dark_mode';

export const useDarkMode = () => {
  // Initialize from localStorage or default to true
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(DARK_MODE_KEY);
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Update localStorage whenever darkMode changes
  useEffect(() => {
    localStorage.setItem(DARK_MODE_KEY, JSON.stringify(darkMode));
    
    // Apply to document root for global access
    document.documentElement.classList.toggle('dark', darkMode);
    document.documentElement.classList.toggle('light', !darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  return { darkMode, toggleDarkMode, setDarkMode };
};