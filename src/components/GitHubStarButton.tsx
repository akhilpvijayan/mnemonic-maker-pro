import React from 'react';
import { Github, Star } from 'lucide-react';

interface GitHubStarButtonProps {
  repoUrl: string;
}

const GitHubStarButton: React.FC<GitHubStarButtonProps> = ({ repoUrl }) => {
  const handleClick = () => {
    window.open(repoUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <button onClick={handleClick} className="github-star-btn-elegant">
      <Github size={16} />
      <span className="github-star-text">Star on GitHub</span>
      <Star size={16} className="github-star-icon" />
    </button>
  );
};

export default GitHubStarButton;