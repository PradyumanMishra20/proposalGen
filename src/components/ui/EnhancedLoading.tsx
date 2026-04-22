import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

// EnhancedLoading component with stunning visual effects
interface EnhancedLoadingProps {
  type?: 'spinner' | 'dots' | 'pulse' | 'skeleton';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const EnhancedLoading: React.FC<EnhancedLoadingProps> = ({ 
  type = 'spinner', 
  size = 'md', 
  className = '' 
}) => {
  const { theme } = useTheme();
  
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const renderLoadingType = () => {
    switch (type) {
      case 'spinner':
        return (
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className={`${sizeClasses[size]} ${theme === 'dark' ? 'text-purple-400' : 'text-indigo-600'}`}
            >
              <Loader2 className="w-full h-full" />
            </motion.div>
          </div>
        );
      
      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={{ 
                  scale: [1, 1.2, 0.8, 1.2, 0.8],
                  opacity: [0.4, 0.6, 0.8, 0.6, 0.8]
                }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className={`${sizeClasses[size]} ${theme === 'dark' ? 'bg-purple-400' : 'bg-indigo-600'} rounded-full`}
              />
            ))}
          </div>
        );
      
      case 'pulse':
        return (
          <div className="relative">
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1, 1.1, 1],
                opacity: [0.5, 0.7, 0.5, 0.7]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={`${sizeClasses[size]} ${theme === 'dark' ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-indigo-600 to-blue-600'} rounded-lg`}
            />
          </div>
        );
      
      case 'skeleton':
        return (
          <div className="space-y-2">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.3, 0.5, 0.7, 0.5] }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`h-2 ${sizeClasses[size]} ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'} rounded`}
              />
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* Sparkle effects */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1, 1.2, 1],
            rotate: [0, 90, 180, 270]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 pointer-events-none"
        >
          <Sparkles className="absolute top-0 left-0 w-4 h-4 text-yellow-400" />
          <Sparkles className="absolute top-0 right-0 w-4 h-4 text-purple-400" />
          <Sparkles className="absolute bottom-0 left-1/2 w-3 h-3 text-pink-400" />
          <Sparkles className="absolute bottom-0 right-1/2 w-3 h-3 text-blue-400" />
        </motion.div>
        
        {/* Main loading element */}
        <div className="relative z-10">
          {renderLoadingType()}
        </div>
      </div>
    </div>
  );
};

export default EnhancedLoading;
