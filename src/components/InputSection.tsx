import React from 'react';
import { Sparkles } from 'lucide-react';

interface InputSectionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const InputSection: React.FC<InputSectionProps> = ({ 
  value, 
  onChange, 
  onKeyPress, 
  placeholder 
}) => {
  return (
    <div className="input-section">
      <label className="input-label">Enter text to memorize</label>
      <div className="input-wrapper">
        <input
          type="text"
          value={value}
          onChange={onChange}
          onKeyPress={onKeyPress}
          placeholder={placeholder || "e.g., HOMES, RGB, PEMDAS, etc."}
          className="text-input"
        />
        <Sparkles size={20} className="input-icon" />
      </div>
    </div>
  );
};

export default InputSection;