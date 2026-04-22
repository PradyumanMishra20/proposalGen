import React, { useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Global Modal Props
export interface GlobalModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  overlayClassName?: string;
  preventBodyScroll?: boolean;
  enableHistory?: boolean;
  modalId?: string;
}

// Animation variants for the backdrop - Premium fade with spring physics
const backdropVariants = {
  hidden: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      when: 'beforeChildren' as const
    }
  },
  visible: {
    opacity: 1,
    backdropFilter: 'blur(8px)',
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      when: 'beforeChildren' as const
    }
  },
  exit: {
    opacity: 0,
    backdropFilter: 'blur(0px)',
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      when: 'afterChildren' as const
    }
  }
};

// Animation variants for the modal - Premium Apple-like spring animations
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    y: 40,
    rotateX: -5,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      when: 'beforeChildren' as const
    }
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: 'spring' as const,
      damping: 20,
      stiffness: 300,
      mass: 0.8,
      when: 'beforeChildren' as const,
      staggerChildren: 0.08
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -30,
    rotateX: 5,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      when: 'afterChildren' as const
    }
  }
};

// Mobile-specific animation variants for slide-up effect
const mobileModalVariants = {
  hidden: {
    opacity: 0,
    y: '100%',
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  },
  visible: {
    opacity: 1,
    y: '0%',
    transition: {
      type: 'spring' as const,
      damping: 25,
      stiffness: 400,
      mass: 0.5
    }
  },
  exit: {
    opacity: 0,
    y: '100%',
    transition: {
      duration: 0.25,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

// Size configurations
const sizeClasses = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-full mx-4'
};

const GlobalModal: React.FC<GlobalModalProps> = ({
  isOpen,
  onClose,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOutsideClick = true,
  closeOnEscape = true,
  className = '',
  overlayClassName = '',
  preventBodyScroll = true,
  enableHistory = true,
  modalId = 'modal'
}) => {
  // Ref to track if modal was closed by history navigation
  const isHistoryClose = useRef(false);
  
  // Generate unique modal state for URL
  const modalState = `${modalId}-open`;

  // Mobile detection
  const [isMobile, setIsMobile] = React.useState(false);
  
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle URL history management
  useEffect(() => {
    if (enableHistory) {
      if (isOpen) {
        // Update URL when modal opens
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.set(modalState, 'true');
        const newUrl = currentUrl.toString();
        
        // Push new state to history
        window.history.pushState(
          { modalOpen: true, modalId },
          '',
          newUrl
        );
        
        // Add popstate listener for back button
        const handlePopState = (event: PopStateEvent) => {
          if (event.state?.modalOpen) {
            // Modal was open, now going back - close modal
            isHistoryClose.current = true;
            onClose();
          }
        };
        
        window.addEventListener('popstate', handlePopState);
        
        return () => {
          window.removeEventListener('popstate', handlePopState);
        };
      } else {
        // Handle modal close
        if (!isHistoryClose.current) {
          // Modal closed by user, go back in history
          window.history.back();
        }
        // Reset flag
        isHistoryClose.current = false;
      }
    }
    return undefined;
  }, [isOpen, enableHistory, modalId, modalState, onClose]);
  // Enhanced body scroll prevention with cleanup
  useEffect(() => {
    if (preventBodyScroll && isOpen) {
      // Save original styles
      const originalOverflow = document.body.style.overflow;
      const originalPosition = document.body.style.position;
      const originalTop = document.body.style.top;
      const originalPaddingRight = document.body.style.paddingRight;
      const originalWidth = document.body.style.width;
      
      // Calculate scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Store current scroll position
      const scrollY = window.scrollY;
      
      // Apply scroll prevention styles
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      
      // Ensure no horizontal scroll
      document.documentElement.style.overflow = 'hidden';
      
      return () => {
        // Restore original styles
        document.body.style.overflow = originalOverflow;
        document.body.style.position = originalPosition;
        document.body.style.top = originalTop;
        document.body.style.width = originalWidth;
        document.body.style.paddingRight = originalPaddingRight;
        document.documentElement.style.overflow = '';
        
        // Restore scroll position
        if (originalPosition !== 'fixed') {
          window.scrollTo(0, scrollY);
        }
      };
    }
    return () => {};
  }, [isOpen, preventBodyScroll]);

  // Handle escape key press
const handleEscapeKey = useCallback((event: KeyboardEvent) => {
  if (closeOnEscape && event.key === 'Escape') {
    event.preventDefault();
    onClose();
  }
}, [closeOnEscape, onClose]);

// Add and remove keyboard event listener
useEffect(() => {
  if (isOpen && closeOnEscape) {
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }
    return undefined;
}, [isOpen, closeOnEscape, handleEscapeKey]);

  // Handle outside click
  const handleOutsideClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOutsideClick && event.target === event.currentTarget) {
      event.preventDefault();
      event.stopPropagation();
      onClose();
    }
  }, [closeOnOutsideClick, onClose]);

  // Handle modal content click (prevent propagation)
  const handleModalClick = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  }, []);

  // Handle close button click
  const handleCloseClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="modal-portal">
          {/* Backdrop */}
          <motion.div
            className={`
              fixed inset-0 z-50
              bg-black/60 backdrop-blur-sm
              ${overlayClassName}
            `}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={handleOutsideClick}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            {/* Modal Container */}
            <div className={`
              ${isMobile 
                ? 'fixed inset-0 flex items-end justify-center' 
                : 'flex items-center justify-center min-h-screen p-4'
              }
            `}>
              {/* Modal Box */}
              <motion.div
                className={`
                  relative w-full 
                  ${isMobile 
                    ? 'h-[85vh] max-h-[85vh] rounded-t-3xl' 
                    : `${sizeClasses[size]} rounded-2xl`
                  }
                  bg-white dark:bg-slate-800
                  shadow-2xl
                  border border-gray-200 dark:border-slate-700
                  overflow-hidden
                  transform-gpu
                  ${className}
                `}
                variants={isMobile ? mobileModalVariants : modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onClick={handleModalClick}
                role="document"
              >
                {/* Close Button */}
                {showCloseButton && (
                  <motion.button
                    className={`
                      absolute top-4 right-4 z-10
                      ${isMobile 
                        ? 'p-4 w-12 h-12' 
                        : 'p-2.5 w-10 h-10'
                      } rounded-full
                      bg-white/90 dark:bg-slate-800/90
                      backdrop-blur-sm
                      hover:bg-white dark:hover:bg-slate-800
                      active:bg-gray-100 dark:active:bg-slate-700
                      text-gray-600 dark:text-gray-300
                      hover:text-gray-900 dark:hover:text-white
                      shadow-lg hover:shadow-xl
                      border border-white/20 dark:border-slate-600/50
                      transition-all duration-300
                      ${isMobile ? 'touch-manipulation' : ''}
                    `}
                    onClick={handleCloseClick}
                    aria-label="Close modal"
                    type="button"
                    // Premium spring animations
                    initial={{ opacity: 0, scale: 0.6, rotate: -180 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    whileHover={!isMobile ? { scale: 1.15, rotate: 90 } : {}}
                    whileTap={{ scale: 0.9, rotate: -90 }}
                  >
                    <motion.div animate={{ rotate: [0, 360] }}>
                      <X className={isMobile ? 'w-6 h-6' : 'w-5 h-5'} />
                    </motion.div>
                  </motion.button>
                )}

                {/* Mobile Drag Handle */}
                {isMobile && (
                  <motion.div
                    className="flex justify-center py-3 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onClose();
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full" />
                  </motion.div>
                )}

                {/* Modal Content */}
                <motion.div
                  className={`
                    overflow-y-auto 
                    ${isMobile 
                      ? 'h-full max-h-[70vh] pb-20' 
                      : 'max-h-[90vh]'
                    }
                    ${isMobile ? 'touch-pan-y' : ''}
                    ${isMobile ? 'overscroll-behavior-contain' : ''}
                  `}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: 'spring' as const,
                    damping: 25,
                    stiffness: 400,
                    mass: 0.5,
                    delay: 0.1
                  }}
                  style={{
                    // Mobile scroll optimization
                    ...(isMobile && {
                      WebkitOverflowScrolling: 'touch',
                      scrollBehavior: 'smooth'
                    })
                  }}
                >
                  {children}
                </motion.div>

                {/* Premium border glow effect */}
                <motion.div
                  className={`
                    absolute inset-0 rounded-2xl
                    border border-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30
                    pointer-events-none
                    shadow-lg shadow-blue-500/20
                  `}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ 
                    opacity: [0, 0.6, 0.3],
                    scale: [0.95, 1.01, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(59, 130, 246, 0)',
                      '0 0 20px 5px rgba(59, 130, 246, 0.3)',
                      '0 0 0 0 rgba(59, 130, 246, 0)'
                    ]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: [0.4, 0, 0.2, 1] as const
                  }}
                />
                
                {/* Additional shimmer effect */}
                <motion.div
                  className={`
                    absolute inset-0 rounded-2xl
                    bg-gradient-to-r from-transparent via-white/10 to-transparent
                    pointer-events-none
                  `}
                  initial={{ x: '-100%', opacity: 0 }}
                  animate={{ 
                    x: ['100%', '-100%'],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: [0.4, 0, 0.2, 1] as const
                  }}
                />
              </motion.div>
            </div>

            {/* Focus trap overlay for accessibility */}
            <div 
              className="sr-only" 
              aria-live="polite" 
              aria-atomic="true"
            >
              Modal is open. Press Escape to close.
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Enhanced Global Modal with additional features
export interface EnhancedGlobalModalProps extends GlobalModalProps {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
}

export const EnhancedGlobalModal: React.FC<EnhancedGlobalModalProps> = ({
  title,
  description,
  footer,
  children,
  headerClassName = '',
  contentClassName = '',
  footerClassName = '',
  ...modalProps
}) => {
  return (
    <GlobalModal {...modalProps}>
      {/* Modal Header */}
      {(title || description) && (
        <motion.div
          className={`
            px-6 py-4 border-b border-gray-200 dark:border-slate-700
            ${headerClassName}
          `}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          {title && (
            <h2 
              id="modal-title"
              className="text-xl font-semibold text-gray-900 dark:text-white mb-2"
            >
              {title}
            </h2>
          )}
          {description && (
            <p 
              id="modal-description"
              className="text-gray-600 dark:text-gray-300 text-sm"
            >
              {description}
            </p>
          )}
        </motion.div>
      )}

      {/* Modal Content */}
      <motion.div
        className={`
          px-6 py-4
          ${contentClassName}
        `}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.2 }}
      >
        {children}
      </motion.div>

      {/* Modal Footer */}
      {footer && (
        <motion.div
          className={`
            px-6 py-4 border-t border-gray-200 dark:border-slate-700
            bg-gray-50 dark:bg-slate-900/50
            ${footerClassName}
          `}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.2 }}
        >
          {footer}
        </motion.div>
      )}
    </GlobalModal>
  );
};

// Hook for managing modal state
export const useGlobalModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggleModal = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal
  };
};

export default GlobalModal;
