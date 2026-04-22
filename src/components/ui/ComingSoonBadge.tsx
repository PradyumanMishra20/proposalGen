import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Bell } from 'lucide-react';

interface ComingSoonBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'badge' | 'inline' | 'tooltip';
}

const ComingSoonBadge: React.FC<ComingSoonBadgeProps> = ({ 
  className = '',
  size = 'sm',
  variant = 'badge'
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  const baseClasses = `inline-flex items-center gap-1.5 font-medium rounded-full transition-all duration-200 ${sizeClasses[size]}`;

  if (variant === 'inline') {
    return (
      <span className={`${baseClasses} bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 ${className}`}>
        <Clock className="w-3 h-3" />
        Coming Soon
      </span>
    );
  }

  if (variant === 'tooltip') {
    return (
      <div className={`relative inline-block ${className}`}>
        <motion.div
          className={`${baseClasses} bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 cursor-help`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="w-3 h-3" />
          Coming Soon
        </motion.div>
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 pointer-events-none hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          This feature is coming soon! Stay tuned.
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`${baseClasses} bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Clock className="w-3 h-3" />
      Coming Soon
    </motion.div>
  );
};

export default ComingSoonBadge;
