import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

// Theme toggle props interface
export interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  'aria-label'?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = '',
  size = 'md',
  'aria-label': ariaLabel = 'Toggle theme'
}) => {
  const { toggleTheme, isDark } = useTheme();

  // Size configurations
  const sizeClasses = {
    sm: { container: 'w-8 h-8', icon: 'w-4 h-4' },
    md: { container: 'w-10 h-10', icon: 'w-5 h-5' },
    lg: { container: 'w-12 h-12', icon: 'w-6 h-6' }
  };

  const currentSize = sizeClasses[size];

  // Generate aria-label if not provided
  const generatedAriaLabel = ariaLabel || `Switch to ${isDark ? 'light' : 'dark'} mode`;

  return (
    <motion.button
      onClick={toggleTheme}
      className={`
        relative rounded-full p-2 transition-all duration-300 shadow-lg hover:shadow-xl
        ${isDark 
          ? 'bg-gradient-to-r from-slate-800 to-gray-700 hover:from-slate-700 hover:to-gray-600 text-yellow-400 border border-slate-600' 
          : 'bg-gradient-to-r from-gray-100 to-white hover:from-gray-50 hover:to-gray-50 text-gray-700 border border-gray-300'
        }
        ${currentSize.container}
        ${className}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={generatedAriaLabel}
      aria-checked={isDark}
      role="switch"
    >
      {/* Enhanced Sun/Moon Icon with glow effect */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        initial={{ rotate: 0 }}
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Icon glow effect */}
        <div className="absolute inset-0 rounded-full opacity-20">
          <div className={`absolute inset-0 rounded-full ${
            isDark 
              ? 'bg-yellow-400 blur-md' 
              : 'bg-blue-400 blur-md'
          }`}></div>
        </div>
        
        <div className="relative z-10">
          {isDark ? (
            <Moon className={`${currentSize.icon} text-yellow-400 drop-shadow-lg`} />
          ) : (
            <Sun className={`${currentSize.icon} text-yellow-500 drop-shadow-lg`} />
          )}
        </div>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className={`absolute inset-0 rounded-full ${
          isDark 
            ? 'bg-yellow-400/20' 
            : 'bg-blue-400/20'
        }`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isDark ? [1, 1.2, 1] : [1, 1.2, 1], 
          opacity: isDark ? [0, 0.5, 0] : [0, 0.3, 0] 
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          repeatDelay: 1
        }}
      />

      {/* Subtle ring animation */}
      <motion.div
        className={`absolute inset-0 rounded-full border-2 ${
          isDark 
            ? 'border-yellow-400/30' 
            : 'border-blue-400/30'
        }`}
        initial={{ scale: 1, opacity: 0 }}
        animate={{ 
          scale: [1, 1.3, 1.5], 
          opacity: [0, 0.3, 0] 
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          repeatDelay: 0.5
        }}
      />
    </motion.button>
  );
};

export default ThemeToggle;
