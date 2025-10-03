import React from 'react';
import { Brain, Sparkles, Zap, Settings } from 'lucide-react';
import { Mode, MnemonicMode } from '../types';

const modes: Mode[] = [
  { id: 'acrostic', name: 'Acrostic', icon: Brain, desc: 'First letter of each word' },
  { id: 'story', name: 'Story', icon: Sparkles, desc: 'Create a memorable story' },
  { id: 'rhyme', name: 'Rhyme', icon: Zap, desc: 'Generate rhyming phrases' },
  { id: 'chunking', name: 'Chunking', icon: Settings, desc: 'Break into memorable chunks' }
];

interface ModeSelectorProps {
  selectedMode: MnemonicMode;
  onModeChange: (mode: MnemonicMode) => void;
}

const ModeSelector: React.FC<ModeSelectorProps> = ({ selectedMode, onModeChange }) => {
  return (
    <div className="modes-grid">
      {modes.map((mode) => {
        const IconComponent = mode.icon;
        return (
          <div
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`mode-card ${selectedMode === mode.id ? 'active' : ''}`}
          >
            <IconComponent size={24} className="mode-icon" />
            <div className="mode-name">{mode.name}</div>
            <div className="mode-desc">{mode.desc}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ModeSelector;