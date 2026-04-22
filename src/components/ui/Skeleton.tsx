import React from 'react';
import { motion } from 'framer-motion';

// Skeleton variants
type SkeletonVariant = 
  | 'text' 
  | 'circle' 
  | 'button' 
  | 'card' 
  | 'input' 
  | 'textarea' 
  | 'avatar';

// Skeleton props interface
export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  className?: string;
  lines?: number; // For text variant
  animate?: boolean;
  'aria-label'?: string;
  'aria-hidden'?: boolean;
}

const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  lines = 1,
  animate = true,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden = true
}) => {
  // Base styles
  const baseStyles = `
    bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200
    dark:from-gray-700 dark:via-gray-600 dark:to-gray-700
    rounded-md
    ${animate ? 'animate-shimmer' : ''}
    ${className}
  `;

  // Variant-specific styles
  const variantStyles: Record<SkeletonVariant, string> = {
    text: 'h-4',
    circle: 'rounded-full',
    button: 'h-10',
    card: 'h-32',
    input: 'h-10',
    textarea: 'h-24',
    avatar: 'w-12 h-12 rounded-full'
  };

  // Width and height styles
  const sizeStyles = `
    ${width ? `w-${typeof width === 'number' ? width : width}` : ''}
    ${height ? `h-${typeof height === 'number' ? height : height}` : ''}
  `;

  // Combined styles
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles}`;

  // Shimmer animation keyframes
  const shimmerAnimation = {
    shimmer: {
      background: [
        'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        'linear-gradient(90deg, #f0f0f0 25%, #e8e8e8 50%, #f0f0f0 75%)',
        'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)'
      ],
      backgroundSize: '200% 100%',
      backgroundPosition: ['-200% 0', '100% 0', '200% 0']
    }
  };

  // Render different skeleton variants
  const renderSkeleton = () => {
    switch (variant) {
      case 'text':
        return (
          <div className="space-y-2">
            {Array.from({ length: lines }, (_, index) => (
              <motion.div
                key={index}
                className={`${baseStyles} h-4`}
                style={{
                  width: index === lines - 1 ? '60%' : '100%'
                }}
                animate={animate ? shimmerAnimation.shimmer : undefined}
                transition={
                  animate ? {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  } : undefined
                }
                aria-label={ariaLabel}
                aria-hidden={ariaHidden}
              />
            ))}
          </div>
        );

      case 'circle':
        return (
          <motion.div
            className={`${baseStyles} rounded-full`}
            style={{
              width: width || 40,
              height: height || 40
            }}
            animate={animate ? shimmerAnimation.shimmer : undefined}
            transition={
              animate ? {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              } : undefined
            }
            aria-label={ariaLabel}
            aria-hidden={ariaHidden}
          />
        );

      case 'button':
        return (
          <motion.div
            className={`${baseStyles} h-10 px-4 rounded-md`}
            style={{
              width: width || 'auto'
            }}
            animate={animate ? shimmerAnimation.shimmer : undefined}
            transition={
              animate ? {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              } : undefined
            }
            aria-label={ariaLabel}
            aria-hidden={ariaHidden}
          />
        );

      case 'card':
        return (
          <motion.div
            className={`${baseStyles} h-32 rounded-lg`}
            style={{
              width: width || '100%'
            }}
            animate={animate ? shimmerAnimation.shimmer : undefined}
            transition={
              animate ? {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              } : undefined
            }
            aria-label={ariaLabel}
            aria-hidden={ariaHidden}
          />
        );

      case 'input':
        return (
          <motion.div
            className={`${baseStyles} h-10 rounded-md`}
            style={{
              width: width || '100%'
            }}
            animate={animate ? shimmerAnimation.shimmer : undefined}
            transition={
              animate ? {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              } : undefined
            }
            aria-label={ariaLabel}
            aria-hidden={ariaHidden}
          />
        );

      case 'textarea':
        return (
          <motion.div
            className={`${baseStyles} h-24 rounded-md`}
            style={{
              width: width || '100%'
            }}
            animate={animate ? shimmerAnimation.shimmer : undefined}
            transition={
              animate ? {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              } : undefined
            }
            aria-label={ariaLabel}
            aria-hidden={ariaHidden}
          />
        );

      case 'avatar':
        return (
          <motion.div
            className={`${baseStyles} rounded-full`}
            style={{
              width: width || 48,
              height: height || 48
            }}
            animate={animate ? shimmerAnimation.shimmer : undefined}
            transition={
              animate ? {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              } : undefined
            }
            aria-label={ariaLabel}
            aria-hidden={ariaHidden}
          />
        );

      default:
        return (
          <motion.div
            className={combinedStyles}
            animate={animate ? shimmerAnimation.shimmer : undefined}
            transition={
              animate ? {
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut'
              } : undefined
            }
            aria-label={ariaLabel}
            aria-hidden={ariaHidden}
          />
        );
    }
  };

  // Add CSS animation to document head
  React.useEffect(() => {
    if (animate && !document.getElementById('shimmer-styles')) {
      const style = document.createElement('style');
      style.id = 'shimmer-styles';
      style.textContent = `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out infinite;
          background-size: 200% 100%;
        }
      `;
      document.head.appendChild(style);
    }
  }, [animate]);

  return <>{renderSkeleton()}</>;
};

export default Skeleton;
