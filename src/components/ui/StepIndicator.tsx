import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Zap, Download, Check } from 'lucide-react';

// Step indicator props
export interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
  className?: string;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// Step configuration
const stepConfig = [
  {
    id: 1,
    name: 'Enter Details',
    icon: FileText,
    description: 'Provide project information'
  },
  {
    id: 2,
    name: 'Generate Proposal',
    icon: Zap,
    description: 'AI creates your proposal'
  },
  {
    id: 3,
    name: 'Review & Download',
    icon: Download,
    description: 'Review and export your proposal'
  }
];

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  totalSteps = 3,
  className = '',
  showLabels = true,
  size = 'md'
}) => {
  // Size configurations
  const sizeClasses = {
    sm: {
      container: 'gap-2',
      step: 'w-8 h-8 text-xs',
      line: 'h-0.5',
      label: 'text-xs',
      description: 'text-xs'
    },
    md: {
      container: 'gap-4',
      step: 'w-10 h-10 text-sm',
      line: 'h-1',
      label: 'text-sm',
      description: 'text-xs'
    },
    lg: {
      container: 'gap-6',
      step: 'w-12 h-12 text-base',
      line: 'h-1',
      label: 'text-base',
      description: 'text-sm'
    }
  };

  const currentSize = sizeClasses[size];

  // Get step status
  const getStepStatus = (stepId: number) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'active';
    return 'pending';
  };

  // Get step styles based on status
  const getStepStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-500 shadow-lg shadow-green-500/25';
      case 'active':
        return 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-indigo-500 shadow-lg shadow-indigo-500/25 ring-4 ring-indigo-500/20';
      case 'pending':
        return 'bg-gray-100 dark:bg-slate-700 text-gray-400 dark:text-gray-500 border-gray-300 dark:border-slate-600';
      default:
        return 'bg-gray-100 text-gray-400 border-gray-300';
    }
  };

  // Get line styles based on status
  const getLineStyles = (stepId: number) => {
    if (stepId < currentStep) {
      return 'bg-gradient-to-r from-green-500 to-emerald-600';
    }
    return 'bg-gray-200 dark:bg-slate-700';
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Progress Bar */}
      <div className="relative mb-8">
        {/* Background line */}
        <div className={`absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-slate-700 -translate-y-1/2`}></div>
        
        {/* Progress line */}
        <div 
          className="absolute top-1/2 left-0 bg-gradient-to-r from-indigo-500 to-purple-600 -translate-y-1/2 transition-all duration-500 ease-out"
          style={{ 
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            height: size === 'sm' ? '2px' : size === 'md' ? '4px' : '4px'
          }}
        ></div>

        {/* Steps */}
        <div className={`relative flex justify-between ${currentSize.container}`}>
          {stepConfig.slice(0, totalSteps).map((step, index) => {
            const status = getStepStatus(step.id);
            const Icon = step.icon;
            const isLast = index === stepConfig.slice(0, totalSteps).length - 1;

            return (
              <div key={step.id} className="relative flex flex-col items-center">
                {/* Step Circle */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: status === 'active' ? 1.1 : 1, 
                    opacity: 1 
                  }}
                  transition={{ 
                    duration: 0.3, 
                    delay: index * 0.1 
                  }}
                  className={`
                    relative z-10 flex items-center justify-center
                    rounded-full border-2 font-semibold
                    transition-all duration-300
                    ${currentSize.step}
                    ${getStepStyles(status)}
                  `}
                >
                  {status === 'completed' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </motion.div>

                {/* Step Labels */}
                {showLabels && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                    className="absolute top-full mt-3 text-center"
                  >
                    <div className={`
                      font-semibold mb-1
                      ${status === 'active' 
                        ? 'text-indigo-600 dark:text-indigo-400' 
                        : status === 'completed'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-gray-500 dark:text-gray-400'
                      }
                      ${currentSize.label}
                    `}>
                      {step.name}
                    </div>
                    <div className={`
                      max-w-24 text-center
                      ${status === 'active' 
                        ? 'text-gray-700 dark:text-gray-300' 
                        : 'text-gray-400 dark:text-gray-500'
                      }
                      ${currentSize.description}
                    `}>
                      {step.description}
                    </div>
                  </motion.div>
                )}

                {/* Pulse effect for active step */}
                {status === 'active' && (
                  <motion.div
                    className={`absolute inset-0 rounded-full bg-indigo-500 opacity-20`}
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0, 0.3]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      width: size === 'sm' ? '32px' : size === 'md' ? '40px' : '48px',
                      height: size === 'sm' ? '32px' : size === 'md' ? '40px' : '48px'
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Summary (Mobile) */}
      <div className="md:hidden bg-gray-50 dark:bg-slate-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              Step {currentStep} of {totalSteps}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {stepConfig[currentStep - 1]?.name}
            </div>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`
                  w-2 h-2 rounded-full transition-colors
                  ${index < currentStep 
                    ? 'bg-indigo-600' 
                    : 'bg-gray-300 dark:bg-gray-600'
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
