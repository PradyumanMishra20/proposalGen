import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationProps {
  type?: NotificationType;
  title?: string;
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const Notification: React.FC<NotificationProps> = ({ 
  type = 'info', 
  title,
  message, 
  onClose, 
  autoClose = true, 
  duration = 5000,
  action
}) => {
  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
    return undefined;
  }, [autoClose, duration, onClose]);

  const getIcon = (): React.ReactNode => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-blue-400" />;
    }
  };

  const getBackgroundColor = (): string => {
    switch (type) {
      case 'success':
        return 'bg-green-900/90 border-green-500/30';
      case 'error':
        return 'bg-red-900/90 border-red-500/30';
      case 'warning':
        return 'bg-yellow-900/90 border-yellow-500/30';
      case 'info':
      default:
        return 'bg-blue-900/90 border-blue-500/30';
    }
  };

  return (
    <div className={`
      max-w-sm w-full rounded-lg border p-4 shadow-lg backdrop-blur-sm
      transition-all duration-300 ease-in-out
      ${getBackgroundColor()}
    `}>
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="text-sm font-semibold text-white mb-1">
              {title}
            </h4>
          )}
          <p className="text-sm text-gray-200 break-words">
            {message}
          </p>
          
          {action && (
            <button
              onClick={action.onClick}
              className="mt-2 text-sm font-medium text-blue-300 hover:text-blue-200 transition-colors"
            >
              {action.label}
            </button>
          )}
        </div>

        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="flex-shrink-0 p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Notification;
