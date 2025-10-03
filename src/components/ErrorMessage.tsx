import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="error-message">
      <AlertCircle size={16} />
      <span>{message}</span>
    </div>
  );
};

export default ErrorMessage;