import React, { useEffect } from 'react';
import { XMarkIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface ToastProps {
  message: string;
  type: 'error' | 'success';
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type, 
  onClose, 
  duration = 5000 
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const iconClasses = {
    error: 'text-red-400',
    success: 'text-green-400'
  };

  const bgClasses = {
    error: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
  };

  const Icon = type === 'error' ? ExclamationTriangleIcon : CheckCircleIcon;

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full ${bgClasses[type]} border rounded-lg shadow-lg p-4 transition-all duration-300 ease-in-out`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className={`h-5 w-5 ${iconClasses[type]}`} />
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm font-medium ${
            type === 'error' 
              ? 'text-red-800 dark:text-red-200' 
              : 'text-green-800 dark:text-green-200'
          }`}>
            {message}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <button
            onClick={onClose}
            className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              type === 'error'
                ? 'text-red-400 hover:text-red-600 focus:ring-red-500'
                : 'text-green-400 hover:text-green-600 focus:ring-green-500'
            }`}
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast; 