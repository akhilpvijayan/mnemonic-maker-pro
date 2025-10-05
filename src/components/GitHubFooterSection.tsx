import React from 'react';
import { Github, Star, Heart } from 'lucide-react';

interface GitHubFooterSectionProps {
  repoUrl: string;
}

const GitHubFooterSection: React.FC<GitHubFooterSectionProps> = ({ repoUrl }) => {
  const handleClick = () => {
    window.open(repoUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="github-footer-section">
      <div className="github-footer-content">
        <div className="github-footer-icon">
          <Heart size={24} className="heart-icon" />
        </div>
        <div className="github-footer-text">
          <h3>Love this tool?</h3>
          <p>Give us a star on GitHub and help others discover it!</p>
        </div>
        <button onClick={handleClick} className="github-footer-btn">
          <Github size={18} />
          <Star size={18} className="star-icon-btn" />
          <span>Star on GitHub</span>
        </button>
      </div>
    </div>
  );
};

export default GitHubFooterSection;