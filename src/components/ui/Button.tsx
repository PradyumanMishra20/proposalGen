import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// Button variants with enhanced visual styles
type ButtonVariant = 
  | 'primary' 
  | 'secondary' 
  | 'outline' 
  | 'ghost' 
  | 'danger' 
  | 'success' 
  | 'warning'
  | 'gradient';

// Button sizes
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Button props interface
export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  id?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  'aria-expanded'?: boolean;
  'aria-pressed'?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingText,
  disabled = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  className = '',
  id,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
  'aria-expanded': ariaExpanded,
  'aria-pressed': ariaPressed
}) => {
  // Variant styles with enhanced gradients and modern effects
  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300',
    secondary: 'bg-gray-200 text-gray-900 border-gray-300 hover:bg-gray-300 shadow-md hover:shadow-lg transition-all duration-300',
    outline: 'bg-transparent text-indigo-600 border-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-700 transition-all duration-300',
    ghost: 'bg-transparent text-gray-700 border-transparent hover:bg-gray-100 hover:text-gray-900 transition-all duration-300',
    danger: 'bg-red-600 text-white border-transparent hover:bg-red-700 hover:shadow-lg transition-all duration-300',
    success: 'bg-green-600 text-white border-transparent hover:bg-green-700 hover:shadow-lg transition-all duration-300',
    warning: 'bg-yellow-500 text-white border-transparent hover:bg-yellow-600 hover:shadow-lg transition-all duration-300',
    gradient: 'bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white border-transparent hover:from-purple-700 hover:via-pink-600 hover:to-orange-500 shadow-xl hover:shadow-2xl transition-all duration-300'
  };

  // Size styles
  const sizeStyles: Record<ButtonSize, string> = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg'
  };

  // Icon size styles
  const iconSizes: Record<ButtonSize, string> = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  };

  // Base styles
  const baseStyles = `
    relative inline-flex items-center justify-center
    font-medium rounded-lg border
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  // Focus ring styles based on variant
  const focusRingStyles: Record<ButtonVariant, string> = {
    primary: 'focus:ring-indigo-500',
    secondary: 'focus:ring-gray-500',
    outline: 'focus:ring-indigo-500',
    ghost: 'focus:ring-gray-500',
    danger: 'focus:ring-red-500',
    success: 'focus:ring-green-500',
    warning: 'focus:ring-yellow-500',
    gradient: 'focus:ring-indigo-500'
  };

  const combinedStyles = `${baseStyles} ${focusRingStyles[variant]}`;

  // Loading spinner
  const LoadingSpinner = () => (
    <motion.div
      className="inline-flex items-center"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <Loader2 className={`${iconSizes[size]}`} />
    </motion.div>
  );

  // Button content
  const renderContent = () => {
    if (loading) {
      return (
        <>
          <LoadingSpinner />
          <span className="ml-2">
            {loadingText || 'Loading...'}
          </span>
        </>
      );
    }

    if (icon && iconPosition === 'left') {
      return (
        <>
          <span className={iconSizes[size]}>
            {icon}
          </span>
          <span className="ml-2">
            {children}
          </span>
        </>
      );
    }

    if (icon && iconPosition === 'right') {
      return (
        <>
          <span className="mr-2">
            {children}
          </span>
          <span className={iconSizes[size]}>
            {icon}
          </span>
        </>
      );
    }

    return children;
  };

  return (
    <motion.button
      type={type}
      className={combinedStyles}
      onClick={onClick}
      disabled={disabled || loading}
      id={id}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      aria-expanded={ariaExpanded}
      aria-pressed={ariaPressed}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      transition={{ duration: 0.1 }}
    >
      {renderContent()}
    </motion.button>
  );
};

export default Button;
