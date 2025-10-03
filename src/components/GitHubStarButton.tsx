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
    <button onClick={handleClick} className="github-star-btn">
      <Github size={18} />
      <Star size={18} />
      <span>Star</span>
    </button>
  );
};

export default GitHubStarButton;