import React from 'react';
import { Star, X, Github } from 'lucide-react';

interface GitHubStarModalProps {
  isOpen: boolean;
  onClose: () => void;
  repoUrl: string;
}

const GitHubStarModal: React.FC<GitHubStarModalProps> = ({ isOpen, onClose, repoUrl }) => {
  if (!isOpen) return null;

  const handleStarClick = () => {
    window.open(repoUrl, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="modal-content">
          <div className="modal-icon">
            <Star size={48} className="star-icon-large" />
          </div>
          
          <h2 className="modal-title">Enjoying Mnemonic Maker?</h2>
          
          <p className="modal-text">
            You've generated 3 amazing mnemonics! 🎉
          </p>
          
          <p className="modal-text">
            If you find this tool helpful, please consider giving us a star on GitHub. 
            It helps others discover this project!
          </p>
          
          <div className="modal-buttons">
            <button onClick={handleStarClick} className="modal-star-btn">
              <Github size={20} />
              <Star size={20} />
              Star on GitHub
            </button>
            <button onClick={onClose} className="modal-later-btn">
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GitHubStarModal; 