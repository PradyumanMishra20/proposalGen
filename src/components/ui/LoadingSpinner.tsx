import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Sparkles } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  showProgress?: boolean;
  progress?: number;
  variant?: 'spinner' | 'dots' | 'pulse';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  message = 'Loading...',
  showProgress = false,
  progress = 0,
  variant = 'spinner',
  className = ''
}) => {
  const { theme } = useTheme();

  // Size configurations
  const sizeConfig = {
    sm: {
      spinner: 'w-4 h-4',
      dots: 'w-1 h-1',
      container: 'p-3',
      text: 'text-sm'
    },
    md: {
      spinner: 'w-6 h-6',
      dots: 'w-2 h-2',
      container: 'p-4',
      text: 'text-base'
    },
    lg: {
      spinner: 'w-8 h-8',
      dots: 'w-2.5 h-2.5',
      container: 'p-6',
      text: 'text-lg'
    },
    xl: {
      spinner: 'w-12 h-12',
      dots: 'w-3 h-3',
      container: 'p-8',
      text: 'text-xl'
    }
  };

  const currentSize = sizeConfig[size];

  // Spinner variant
  if (variant === 'spinner') {
    return (
      <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
        <div className={`relative ${currentSize.container}`}>
          {/* Main spinner */}
          <motion.div
            className={`${currentSize.spinner} text-primary-600 dark:text-primary-400`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          >
            <Loader2 className="w-full h-full" />
          </motion.div>
          
          {/* Orbiting sparkles */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <motion.div
              className="absolute w-2 h-2 bg-primary-400 rounded-full"
              style={{ top: '-8px' }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute w-1.5 h-1.5 bg-secondary-400 rounded-full"
              style={{ bottom: '-6px' }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            />
          </motion.div>

          {/* Glow effect */}
          <motion.div
            className={`absolute inset-0 ${currentSize.spinner} bg-primary-500/20 rounded-full blur-xl`}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {message && (
          <motion.div
            className={`text-center space-y-2`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <p className={`${currentSize.text} font-medium ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}>
              {message}
            </p>
            
            {showProgress && (
              <div className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            )}
          </motion.div>
        )}
      </div>
    );
  }

  // Dots variant
  if (variant === 'dots') {
    return (
      <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
        <div className={`flex space-x-2 ${currentSize.container}`}>
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className={`${currentSize.dots} bg-primary-600 dark:bg-primary-400 rounded-full`}
              animate={{ 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>

        {message && (
          <motion.p
            className={`${currentSize.text} font-medium ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            {message}
          </motion.p>
        )}
      </div>
    );
  }

  // Pulse variant
  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <div className={`relative ${currentSize.container}`}>
        <motion.div
          className={`${currentSize.spinner} bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full`}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-1/2 h-1/2 text-white" />
          </motion.div>
        </motion.div>

        {/* Ripple effect */}
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className={`absolute inset-0 ${currentSize.spinner} border-2 border-primary-300 dark:border-primary-600 rounded-full`}
            animate={{ 
              scale: [1, 2, 2],
              opacity: [0.8, 0, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.6,
              ease: 'easeOut'
            }}
          />
        ))}
      </div>

      {message && (
        <motion.p
          className={`${currentSize.text} font-medium ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
};

export default LoadingSpinner;
