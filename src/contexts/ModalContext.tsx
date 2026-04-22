import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

// Modal types
export interface ModalOptions {
  closable?: boolean;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  showCloseButton?: boolean;
}

export interface ModalContent {
  id: string;
  component: ReactNode;
  props?: Record<string, any>;
  options?: ModalOptions;
}

// Modal context interface
export interface ModalContextType {
  isOpen: boolean;
  modalContent: ModalContent | null;
  openModal: (content: ModalContent) => void;
  closeModal: () => void;
  replaceModal: (content: ModalContent) => void;
  isModalOpen: () => boolean;
  getCurrentModal: () => ModalContent | null;
}

// Create context
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Custom hook to use modal context
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

// Modal provider props
export interface ModalProviderProps {
  children: ReactNode;
}

// Modal component
const Modal: React.FC<{ content: ModalContent; onClose: () => void }> = ({ content, onClose }) => {
  const {
    component,
    props = {},
    options = {}
  } = content;

  const {
    closable = true,
    closeOnBackdropClick = true,
    closeOnEscape = true,
    size = 'md',
    className = '',
    showCloseButton = true
  } = options;

  // Handle escape key press
  React.useEffect(() => {
    if (closeOnEscape) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
    return undefined;
  }, [closeOnEscape, onClose]);

  // Size configurations
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-full mx-4'
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleBackdropClick}
      />

      {/* Modal Content */}
      <motion.div
        className={`
          relative w-full ${sizeClasses[size]} 
          bg-white dark:bg-slate-800 rounded-xl shadow-2xl
          border border-gray-200 dark:border-slate-700
          max-h-[90vh] overflow-hidden
          ${className}
        `}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ 
          duration: 0.2,
          ease: 'easeOut'
        }}
      >
        {/* Close Button */}
        {showCloseButton && closable && (
          <button
            onClick={onClose}
            className={`
              absolute top-4 right-4 z-10
              p-2 rounded-lg
              bg-gray-100 dark:bg-slate-700
              hover:bg-gray-200 dark:hover:bg-slate-600
              text-gray-600 dark:text-gray-300
              hover:text-gray-900 dark:hover:text-white
              transition-colors duration-200
            `}
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Modal Body */}
        <div className="overflow-y-auto max-h-[90vh]">
          {React.isValidElement(component) 
            ? React.cloneElement(component as React.ReactElement, { ...props, onClose })
            : component
          }
        </div>
      </motion.div>
    </div>
  );
};

// Modal Provider Component
export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);

  const openModal = useCallback((content: ModalContent) => {
    setModalContent(content);
  }, []);

  const closeModal = useCallback(() => {
    setModalContent(null);
  }, []);

  const replaceModal = useCallback((content: ModalContent) => {
    setModalContent(content);
  }, []);

  const isModalOpen = useCallback(() => {
    return modalContent !== null;
  }, [modalContent]);

  const getCurrentModal = useCallback(() => {
    return modalContent;
  }, [modalContent]);

  const value: ModalContextType = {
    isOpen: modalContent !== null,
    modalContent,
    openModal,
    closeModal,
    replaceModal,
    isModalOpen,
    getCurrentModal
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      
      {/* Modal Portal */}
      <AnimatePresence>
        {modalContent && (
          <div className="modal-portal">
            <Modal 
              content={modalContent} 
              onClose={closeModal}
            />
          </div>
        )}
      </AnimatePresence>
    </ModalContext.Provider>
  );
};

// Helper function to create modal content
export const createModal = (
  id: string,
  component: ReactNode,
  props?: Record<string, any>,
  options?: ModalOptions
): ModalContent => ({
  id,
  component,
  props,
  options
});

// Higher-order component for modal-ready components
export const withModal = <P extends object>(
  Component: React.ComponentType<P & { onClose?: () => void }>
) => {
  const WithModalComponent = (props: P) => {
    const { closeModal } = useModal();
    return <Component {...props} onClose={closeModal} />;
  };
  
  WithModalComponent.displayName = `withModal(${Component.displayName || Component.name})`;
  return WithModalComponent;
};

// Hook for modal management with convenience methods
export const useModalManager = () => {
  const { openModal, closeModal, replaceModal, isModalOpen, getCurrentModal } = useModal();

  const openModalWithDefaults = useCallback((
    id: string,
    component: ReactNode,
    props?: Record<string, any>,
    options?: Partial<ModalOptions>
  ) => {
    const defaultOptions: ModalOptions = {
      closable: true,
      closeOnBackdropClick: true,
      closeOnEscape: true,
      size: 'md',
      showCloseButton: true,
      ...options
    };

    openModal(createModal(id, component, props, defaultOptions));
  }, [openModal]);

  const closeCurrentModal = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const replaceCurrentModal = useCallback((
    id: string,
    component: ReactNode,
    props?: Record<string, any>,
    options?: Partial<ModalOptions>
  ) => {
    const defaultOptions: ModalOptions = {
      closable: true,
      closeOnBackdropClick: true,
      closeOnEscape: true,
      size: 'md',
      showCloseButton: true,
      ...options
    };

    replaceModal(createModal(id, component, props, defaultOptions));
  }, [replaceModal]);

  return {
    openModal: openModalWithDefaults,
    closeModal: closeCurrentModal,
    replaceModal: replaceCurrentModal,
    isModalOpen,
    getCurrentModal
  };
};

export default ModalProvider;
