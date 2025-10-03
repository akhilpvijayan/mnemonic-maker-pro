import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ResultCardProps {
  result: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!result) return null;

  return (
    <div className="result-card">
      <div className="result-header">
        <h3>Your AI-Generated Mnemonic</h3>
        <button onClick={copyToClipboard} className="copy-btn">
          {copied ? (
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
      <p className="result-text">{result}</p>
    </div>
  );
};

export default ResultCard;