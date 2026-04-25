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
  // Variant styles with premium design system
  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white border-transparent hover:from-primary-700 hover:to-secondary-700 shadow-primary hover:shadow-lg transition-all duration-250 transform hover:-translate-y-0.5 font-semibold',
    secondary: 'bg-neutral-100 text-neutral-900 border-neutral-300 hover:bg-neutral-200 hover:border-neutral-400 shadow-sm hover:shadow-md transition-all duration-250 font-medium',
    outline: 'bg-transparent text-primary-600 border-primary-300 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-400 transition-all duration-250 font-medium',
    ghost: 'bg-transparent text-neutral-700 border-transparent hover:bg-neutral-100 hover:text-neutral-900 transition-all duration-250 font-medium',
    danger: 'bg-gradient-to-r from-error-600 to-error-700 text-white border-transparent hover:from-error-700 hover:to-error-800 shadow-error hover:shadow-lg transition-all duration-250 transform hover:-translate-y-0.5 font-semibold',
    success: 'bg-gradient-to-r from-success-600 to-success-700 text-white border-transparent hover:from-success-700 hover:to-success-800 shadow-success hover:shadow-lg transition-all duration-250 transform hover:-translate-y-0.5 font-semibold',
    warning: 'bg-gradient-to-r from-warning-500 to-warning-600 text-white border-transparent hover:from-warning-600 hover:to-warning-700 shadow-warning hover:shadow-lg transition-all duration-250 transform hover:-translate-y-0.5 font-semibold',
    gradient: 'bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 text-white border-transparent hover:from-primary-700 hover:via-secondary-600 hover:to-accent-600 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 font-bold'
  };

  // Size styles with design system spacing
  const sizeStyles: Record<ButtonSize, string> = {
    xs: 'px-3 py-1.5 text-xs rounded-md',
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-2.5 text-sm rounded-lg',
    lg: 'px-8 py-3 text-base rounded-xl',
    xl: 'px-10 py-4 text-lg rounded-2xl'
  };

  // Icon size styles
  const iconSizes: Record<ButtonSize, string> = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
    xl: 'w-6 h-6'
  };

  // Base styles with premium design system
  const baseStyles = `
    relative inline-flex items-center justify-center
    font-primary border-2
    transition-all duration-250 ease-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  // Focus ring styles based on variant with design system colors
  const focusRingStyles: Record<ButtonVariant, string> = {
    primary: 'focus:ring-primary-500',
    secondary: 'focus:ring-neutral-500',
    outline: 'focus:ring-primary-500',
    ghost: 'focus:ring-neutral-500',
    danger: 'focus:ring-error-500',
    success: 'focus:ring-success-500',
    warning: 'focus:ring-warning-500',
    gradient: 'focus:ring-primary-500'
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
