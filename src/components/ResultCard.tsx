import React, { useState } from 'react';
import { Copy, Check, Star } from 'lucide-react';

interface ResultCardProps {
  result: string;
}

interface ParsedMnemonic {
  main: string;
  description: string;
  alternatives: Array<{
    text: string;
    description: string;
  }>;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const [copied, setCopied] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const parseResult = (text: string): ParsedMnemonic | null => {
    if (!text) return null;

    try {
      // Split by MNEMONIC, STORY, RHYME, or STRATEGY markers
      const sections = text.split(/(?:MNEMONIC|STORY|RHYME|STRATEGY)\s+\d+:/i).filter(s => s.trim());
      
      if (sections.length < 3) {
        // Fallback: return as single result
        return {
          main: text,
          description: '',
          alternatives: []
        };
      }

      const parseSection = (section: string) => {
        const parts = section.split(/(?:Description:|Why it works:|Memorability tip:|Logic:)/i);
        return {
          text: parts[0]?.trim() || '',
          description: parts[1]?.trim() || ''
        };
      };

      const main = parseSection(sections[0]);
      const alt1 = parseSection(sections[1]);
      const alt2 = parseSection(sections[2]);

      return {
        main: main.text,
        description: main.description,
        alternatives: [
          { text: alt1.text, description: alt1.description },
          { text: alt2.text, description: alt2.description }
        ]
      };
    } catch (error) {
      console.error('Error parsing result:', error);
      return {
        main: text,
        description: '',
        alternatives: []
      };
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  if (!result) return null;

  const parsed = parseResult(result);
  if (!parsed) return null;

  const allResults = [
    { text: parsed.main, description: parsed.description, label: 'Main Result' },
    ...parsed.alternatives.map((alt, idx) => ({
      text: alt.text,
      description: alt.description,
      label: `Alternative ${idx + 1}`
    }))
  ];

  const selectedResult = allResults[selectedIndex];

  return (
    <div className="results-container">
      {/* Main Result Display */}
      <div className="result-card main-result">
        <div className="result-header">
          <div className="result-label">
            <Star size={16} className="star-icon" />
            <span>{selectedResult.label}</span>
          </div>
          <button 
            onClick={() => copyToClipboard(selectedResult.text, selectedIndex)} 
            className="copy-btn"
          >
            {copied === selectedIndex ? (
              <>
                <Check size={16} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy
              </>
            )}
          </button>
        </div>
        <div className="result-content">
          <p className="result-text">{selectedResult.text}</p>
          {selectedResult.description && (
            <p className="result-description">
              <strong>💡 How it helps:</strong> {selectedResult.description}
            </p>
          )}
        </div>
      </div>

      {/* Alternative Results */}
      {allResults.length > 1 && (
        <div className="alternatives-section">
          <h4 className="alternatives-title">Choose Your Favorite:</h4>
          <div className="alternatives-grid">
            {allResults.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`alternative-card ${selectedIndex === index ? 'selected' : ''}`}
              >
                <div className="alternative-header">
                  <span className="alternative-label">{item.label}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(item.text, index);
                    }}
                    className="alternative-copy-btn"
                  >
                    {copied === index ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
                <p className="alternative-text">{item.text}</p>
                {item.description && (
                  <p className="alternative-desc">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultCard;