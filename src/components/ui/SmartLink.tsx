import React from 'react';
import { motion } from 'framer-motion';
import { useModalManager } from '../../contexts/ModalContext';

// SmartLink Props Interface
export interface SmartLinkProps {
  component: React.ReactNode;
  componentProps?: Record<string, any>;
  modalOptions?: {
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    closable?: boolean;
    closeOnBackdropClick?: boolean;
    closeOnEscape?: boolean;
    showCloseButton?: boolean;
    className?: string;
  };
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  underline?: boolean;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: (e: React.MouseEvent) => void;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

// Color configurations
const colorClasses = {
  primary: {
    light: 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
    hover: 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
  },
  secondary: {
    light: 'text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300',
    hover: 'hover:bg-gray-50 dark:hover:bg-gray-900/20'
  },
  accent: {
    light: 'text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300',
    hover: 'hover:bg-purple-50 dark:hover:bg-purple-900/20'
  },
  success: {
    light: 'text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300',
    hover: 'hover:bg-green-50 dark:hover:bg-green-900/20'
  },
  warning: {
    light: 'text-yellow-600 hover:text-yellow-700 dark:text-yellow-400 dark:hover:text-yellow-300',
    hover: 'hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
  },
  danger: {
    light: 'text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300',
    hover: 'hover:bg-red-50 dark:hover:bg-red-900/20'
  }
};

// Size configurations
const sizeClasses = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg'
};

// Underline animations
const underlineVariants = {
  initial: { width: '0%' },
  hover: { width: '100%' }
};

const SmartLink: React.FC<SmartLinkProps> = ({
  component,
  componentProps = {},
  modalOptions = {},
  children,
  className = '',
  disabled = false,
  underline = true,
  color = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  onClick,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy
}) => {
  const { openModal } = useModalManager();

  const handleClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    
    if (disabled) return;
    
    // Call custom onClick if provided
    if (onClick) {
      onClick(e);
    }
    
    // Open modal with the component
    const modalId = `smart-link-${Date.now()}`;
    openModal(
      modalId,
      component,
      { ...componentProps, onClose: () => {} },
      {
        size: 'md',
        closable: true,
        closeOnBackdropClick: true,
        closeOnEscape: true,
        showCloseButton: true,
        ...modalOptions
      }
    );
  };

  const colorConfig = colorClasses[color];
  const sizeConfig = sizeClasses[size];
  
  const baseClasses = `
    inline-flex items-center gap-2
    font-medium
    transition-all duration-200 ease-in-out
    cursor-pointer
    focus:outline-none focus:ring-2 focus:ring-offset-2
    ${colorConfig.light}
    ${colorConfig.hover}
    ${sizeConfig}
    ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
    ${className}
  `;

  const focusRingColors = {
    primary: 'focus:ring-blue-500',
    secondary: 'focus:ring-gray-500',
    accent: 'focus:ring-purple-500',
    success: 'focus:ring-green-500',
    warning: 'focus:ring-yellow-500',
    danger: 'focus:ring-red-500'
  };

  const combinedClasses = `${baseClasses} ${focusRingColors[color]}`;

  const renderContent = () => {
    if (icon && iconPosition === 'left') {
      return (
        <>
          <span className="flex-shrink-0">{icon}</span>
          <span>{children}</span>
        </>
      );
    }
    
    if (icon && iconPosition === 'right') {
      return (
        <>
          <span>{children}</span>
          <span className="flex-shrink-0">{icon}</span>
        </>
      );
    }
    
    return <span>{children}</span>;
  };

  return (
    <motion.button
      type="button"
      className={combinedClasses}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      transition={{ duration: 0.1 }}
    >
      {renderContent()}
      
      {/* Underline animation */}
      {underline && !disabled && (
        <motion.div
          className={`
            absolute bottom-0 left-0 h-0.5
            ${color === 'primary' ? 'bg-blue-600 dark:bg-blue-400' : 
              color === 'secondary' ? 'bg-gray-600 dark:bg-gray-400' :
              color === 'accent' ? 'bg-purple-600 dark:bg-purple-400' :
              color === 'success' ? 'bg-green-600 dark:bg-green-400' :
              color === 'warning' ? 'bg-yellow-600 dark:bg-yellow-400' :
              'bg-red-600 dark:bg-red-400'}
          `}
          variants={underlineVariants}
          initial="initial"
          whileHover="hover"
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        />
      )}
    </motion.button>
  );
};

// Higher-order component for creating smart links with predefined components
export const createSmartLink = <P extends object>(
  Component: React.ComponentType<P>,
  defaultModalOptions?: SmartLinkProps['modalOptions']
) => {
  const SmartLinkWrapper: React.FC<Omit<SmartLinkProps, 'component'> & { componentProps?: P }> = ({
    componentProps,
    modalOptions,
    ...props
  }) => {
    return (
      <SmartLink
        component={<Component {...(componentProps as P)} />}
        componentProps={componentProps}
        modalOptions={{ ...defaultModalOptions, ...modalOptions }}
        {...props}
      />
    );
  };
  
  SmartLinkWrapper.displayName = `SmartLink(${Component.displayName || Component.name})`;
  return SmartLinkWrapper;
};

// Preset SmartLink components for common use cases
export const InfoSmartLink = createSmartLink(
  ({ title, content }: { title: string; content: React.ReactNode }) => (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        {title}
      </h3>
      <div className="text-gray-600 dark:text-gray-300">
        {content}
      </div>
    </div>
  ),
  { size: 'md', showCloseButton: true }
);

export const FormSmartLink = createSmartLink(
  ({ fields, onSubmit }: { 
    fields: Array<{ name: string; label: string; type: string }>;
    onSubmit: (data: Record<string, any>) => void;
  }) => (
    <form className="p-6 space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
            {field.label}
          </label>
          <input
            type={field.type}
            name={field.name}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        onClick={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget.form!);
          const data = Object.fromEntries(formData.entries());
          onSubmit(data);
        }}
      >
        Submit
      </button>
    </form>
  ),
  { size: 'lg', closeOnBackdropClick: false }
);

export default SmartLink;
