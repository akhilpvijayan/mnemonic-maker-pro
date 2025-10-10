import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Close"
        >
          <X size={20} color="#9ca3af" /> {/* gray-400 */}
        </button>

        {/* Warning Icon */}
        <div className="modal-icon">
          <AlertTriangle size={40} color="#f87171" /> {/* red-400 */}
        </div>

        {/* Content */}
        <h3 className="modal-title">Confirm Logout</h3>
        <p className="modal-text">
          Are you sure you want to logout? You'll need to sign in again to access your mnemonics and saved content.
        </p>

        {/* Action Buttons */}
        <div className="modal-buttons">
          <button onClick={onClose} className="modal-btn-cancel">
            Cancel
          </button>
          <button onClick={onConfirm} className="modal-btn-logout">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
