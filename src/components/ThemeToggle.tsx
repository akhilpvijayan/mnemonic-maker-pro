import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface ThemeToggleProps {
  darkMode: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, onToggle }) => {
  return (
    <div className="header-controls">
      <div onClick={onToggle} className="theme-toggle">
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </div>
    </div>
  );
};

export default ThemeToggle;