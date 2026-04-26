import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProposalStore } from '../../store/proposalStore';
import { useTheme } from '../../contexts/ThemeContext';
import { generateAIProposal, GeneratedProposal } from '../../services/aiProposalService';
import StepIndicator from '../ui/StepIndicator';
import LoadingSpinner from '../ui/LoadingSpinner';

// Lazy load heavy components
const ProposalDisplay = lazy(() => import('../ui/ProposalDisplay'));

// Types
const VALIDATABLE_FIELDS = [
  'description',
  'yourRole', 
  'clientName',
  'clientType',
  'experienceLevel',
  'deadlineSensitivity'
] as const;

type ValidatableField = typeof VALIDATABLE_FIELDS[number];

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  allowedValues?: readonly string[];
  messages: {
    required?: string;
    minLength?: string;
    maxLength?: string;
    pattern?: string;
    allowedValues?: string;
  };
}

type ValidationRules = Record<ValidatableField, ValidationRule>;

type FormErrors = Partial<Record<ValidatableField, string>> & { submit?: string };
type FormTouched = Partial<Record<ValidatableField, boolean>>;

interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

interface SelectOption {
  value: string;
  label: string;
}

type Theme = 'light' | 'dark';

// Utility functions
const getFieldClasses = (
  hasError: boolean,
  isFocused: boolean,
  theme: Theme,
  disabled: any
): string => {
  const baseClasses = 'premium-input w-full px-4 sm:px-6 py-3 sm:py-4 border-2 placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-300 shadow-sm relative text-base sm:text-lg';
  const themeClasses = theme === 'dark'
    ? 'bg-slate-800/60 text-white placeholder-slate-400 backdrop-blur-sm'
    : 'bg-white/90 text-gray-900 placeholder-gray-400 backdrop-blur-sm';
  
  let stateClasses = '';
  if (hasError) {
    stateClasses = theme === 'dark' 
      ? 'border-red-500/50 bg-red-500/10 text-red-400 placeholder-red-400 focus:ring-red-500/30' 
      : 'border-red-500/50 bg-red-500/10 text-red-700 placeholder-red-400 focus:ring-red-500/30';
  } else if (isFocused) {
    stateClasses = theme === 'dark' 
      ? 'border-primary-500/50 bg-primary-500/10 focus:ring-primary-500/30' 
      : 'border-primary-500/50 bg-primary-500/10 focus:ring-primary-500/30';
  } else {
    stateClasses = theme === 'dark' 
      ? 'border-slate-600/50 bg-slate-800/60 focus:ring-slate-600/30' 
      : 'border-gray-300/50 bg-white/90 focus:ring-gray-400/30';
  }
  
  return `${baseClasses} ${themeClasses} ${stateClasses}`;
};


const getErrorMessage = (error: string): JSX.Element => (
  <motion.div
    className="flex items-center gap-2"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  >
    <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
    <span className="text-sm text-red-400">{error}</span>
  </motion.div>
);

// Validation rules - moved outside component to prevent re-creation
const validationRules: ValidationRules = {
  description: {
    required: true,
    minLength: 20,
    maxLength: 2000,
    pattern: /^[a-zA-Z0-9\s.,!?;:'"-]+$/,
    messages: {
      required: 'Project description is required',
      minLength: 'Project description must be at least 20 characters',
      maxLength: 'Project description must be less than 2000 characters',
      pattern: 'Project description contains invalid characters'
    }
  },
  yourRole: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s]+$/,
    messages: {
      required: 'Your role is required',
      minLength: 'Role must be at least 2 characters',
      maxLength: 'Role must be less than 100 characters',
      pattern: 'Role can only contain letters and spaces'
    }
  },
  clientName: {
    required: false,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z0-9\s.-]+$/,
    messages: {
      minLength: 'Client name must be at least 2 characters',
      maxLength: 'Client name must be less than 100 characters',
      pattern: 'Client name contains invalid characters'
    }
  },
  clientType: {
    required: false,
    allowedValues: ['startup', 'business', 'enterprise', 'individual'],
    messages: {
      allowedValues: 'Please select a valid client type'
    }
  },
  experienceLevel: {
    required: false,
    allowedValues: ['junior', 'intermediate', 'senior', 'expert'],
    messages: {
      allowedValues: 'Please select a valid experience level'
    }
  },
  deadlineSensitivity: {
    required: false,
    allowedValues: ['low', 'normal', 'high', 'urgent'],
    messages: {
      allowedValues: 'Please select a valid deadline sensitivity'
    }
  }
};

const MainTool: React.FC = () => {
  // Store hooks
  const {
    selectedTemplate,
    proposalData,
    isLoading,
    setSelectedTemplate,
    updateProposalData
  } = useProposalStore();

  const { theme } = useTheme();

  // Local state
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<ValidatableField | null>(null);
  const [generatedProposal, setGeneratedProposal] = useState<GeneratedProposal | null>(null);
  const [isGeneratingProposal, setIsGeneratingProposal] = useState(false);

  // Calculate current step based on component state
  const getCurrentStep = useCallback((): number => {
    if (generatedProposal) return 3; // Review & Download step
    if (isGeneratingProposal) return 2; // Generate Proposal step
    return 1; // Enter Details step
  }, [generatedProposal, isGeneratingProposal]);

  const currentStep = getCurrentStep();

  // Validate single field
  const validateField = useCallback((fieldName: ValidatableField, value: string | number | boolean | undefined): string => {
    const rules = validationRules[fieldName as ValidatableField];
    if (!rules) return '';

    if (rules.required && (!value || value.toString().trim() === '')) {
      return rules.messages.required || '';
    }

    if (!value || value.toString().trim() === '') {
      return '';
    }

    const trimmedValue = value.toString().trim();

    if (rules.minLength && trimmedValue.length < rules.minLength) {
      return rules.messages.minLength || '';
    }

    if (rules.maxLength && trimmedValue.length > rules.maxLength) {
      return rules.messages.maxLength || '';
    }

    if (rules.pattern && !rules.pattern.test(trimmedValue)) {
      return rules.messages.pattern || '';
    }

    if (rules.allowedValues && !rules.allowedValues.includes(trimmedValue)) {
      return rules.messages.allowedValues || '';
    }

    return '';
  }, []);

  // Validate entire form
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    VALIDATABLE_FIELDS.forEach(fieldName => {
      const error = validateField(fieldName, proposalData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [proposalData, validateField]);

  // Check if form is valid
  const isFormValid = useCallback((): boolean => {
    const hasErrors = Object.keys(errors).some(key => errors[key as ValidatableField]);
    if (hasErrors) return false;

    const requiredFields = VALIDATABLE_FIELDS.filter(
      fieldName => validationRules[fieldName].required
    );

    const allRequiredFilled = requiredFields.every(
      fieldName => {
        const value = proposalData[fieldName];
        return value && value.toString().trim() !== '';
      }
    );

    return allRequiredFilled;
  }, [errors, proposalData]);

  // Handle field change with validation
  const handleFieldChange = useCallback((fieldName: ValidatableField, value: string) => {
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
    updateProposalData(fieldName, value);
  }, [errors, updateProposalData]);

  // Handle field blur
  const handleFieldBlur = useCallback((fieldName: ValidatableField) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    const error = validateField(fieldName, proposalData[fieldName] || '');
    if (error) {
      setErrors(prev => ({ ...prev, [fieldName]: error }));
    }
  }, [proposalData, validateField]);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isSubmitting || isLoading) return;

    setIsSubmitting(true);
    setIsGeneratingProposal(true);

    try {
      const isValid = validateForm();
      
      if (!isValid) {
        const firstErrorField = Object.keys(errors)[0] as ValidatableField;
        const errorElement = document.getElementById(firstErrorField);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          errorElement.focus();
        }
        return;
      }

      // Generate AI proposal
      const proposal = await generateAIProposal(selectedTemplate, proposalData);
      setGeneratedProposal(proposal);
      
      setErrors(prev => ({ 
        ...prev, 
        submit: undefined 
      }));
    } catch (error) {
      console.error('AI generation error:', error);
      
      // User-friendly error messages
      let errorMessage = "Oops! Something went wrong. Let's try that again.";
      
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          errorMessage = "AI assistant is taking a quick break. Give it a moment and try again!";
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = "Looks like we're having connection trouble. Check your internet and give it another go.";
        } else if (error.message.includes('timeout')) {
          errorMessage = "The AI is thinking harder than usual. Let's try again in a moment.";
        } else if (error.message.includes('rate limit')) {
          errorMessage = "Whoa there! You're moving fast. Take a quick breather and try again.";
        } else {
          errorMessage = error.message || "Something unexpected happened. Let's give it another shot!";
        }
      }
      
      setErrors(prev => ({ 
        ...prev, 
        submit: errorMessage 
      }));
    } finally {
      setIsSubmitting(false);
      setIsGeneratingProposal(false);
    }
  }, [isSubmitting, isLoading, validateForm, errors, selectedTemplate, proposalData]);

  // Auto-validate on data change
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      validateForm();
    }
  }, [proposalData, touched, validateForm]);

// Templates - moved outside component to prevent re-creation
const templates: Template[] = [
  {
    id: 'web-design',
    name: 'Web Design',
    description: 'Perfect for digital projects and modern UI experiences',
    icon: 'ART',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'development',
    name: 'Development',
    description: 'Full-stack solutions with scalable architecture',
    icon: 'CODE',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Strategic campaigns and growth-focused initiatives',
    icon: 'GROWTH',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'consulting',
    name: 'Consulting',
    description: 'Expert advice and strategic guidance',
    icon: 'ADVICE',
    color: 'from-purple-500 to-indigo-500'
  }
];

  const renderField = useCallback((
    fieldName: ValidatableField, 
    label: string, 
    type: 'text' | 'textarea' | 'select' = 'text', 
    placeholder: string = '', 
    options: SelectOption[] = []
  ): JSX.Element => {
    const hasError = touched[fieldName] && errors[fieldName];
    const isFocused = focusedField === fieldName;
    const fieldId = `field-${fieldName}`;
    
    return (
      <motion.div
        className="space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <label 
          htmlFor={fieldId}
          className={`block text-base font-semibold mb-2 ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-800'
          } transition-colors duration-200`}
        >
          {label} {validationRules[fieldName]?.required && (
            <motion.span 
              className="text-red-400 ml-1 inline-block"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              *
            </motion.span>
          )}
        </label>
        
        {type === 'textarea' ? (
          <div className="relative">
            <textarea
              id={fieldId}
              placeholder={placeholder}
              value={(proposalData[fieldName] as string) || ''}
              onChange={(e) => handleFieldChange(fieldName, e.target.value)}
              onFocus={() => setFocusedField(fieldName)}
              onBlur={() => {
                setFocusedField(null);
                handleFieldBlur(fieldName);
              }}
              // @ts-ignore
              className={getFieldClasses(hasError, isFocused, theme, isLoading as any)}
              rows={5}
              disabled={isLoading}
            />
            <AnimatePresence>
              {isFocused && (
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-indigo-500/60 pointer-events-none"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1.02 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, type: "spring" }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-indigo-400/40"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : type === 'select' ? (
          <div className="relative">
            <select
              id={fieldId}
              value={(proposalData[fieldName] as string) || ''}
              onChange={(e) => handleFieldChange(fieldName, e.target.value)}
              onFocus={() => setFocusedField(fieldName)}
              onBlur={() => {
                setFocusedField(null);
                handleFieldBlur(fieldName);
              }}
              // @ts-ignore
              className={getFieldClasses(hasError, isFocused, theme, isLoading as any)}
              disabled={isLoading}
            >
              <option value="">{placeholder || 'Select an option'}</option>
              {options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <AnimatePresence>
              {isFocused && (
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-indigo-500/60 pointer-events-none"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1.02 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, type: "spring" }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-indigo-400/40"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="relative">
            <input
              id={fieldId}
              type="text"
              placeholder={placeholder}
              value={(proposalData[fieldName] as string) || ''}
              onChange={(e) => handleFieldChange(fieldName, e.target.value)}
              onFocus={() => setFocusedField(fieldName)}
              onBlur={() => {
                setFocusedField(null);
                handleFieldBlur(fieldName);
              }}
              // @ts-ignore
              className={getFieldClasses(hasError, isFocused, theme, isLoading as any)}
              disabled={isLoading}
            />
            <AnimatePresence>
              {isFocused && (
                <motion.div
                  className="absolute inset-0 rounded-xl border-2 border-indigo-500/60 pointer-events-none"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1.02 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, type: "spring" }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-indigo-400/40"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        
        <AnimatePresence>
          {hasError && errors[fieldName] && getErrorMessage(errors[fieldName])}
        </AnimatePresence>
      </motion.div>
    );
  }, [touched, errors, focusedField, theme, handleFieldChange, handleFieldBlur, isLoading, proposalData]);

  return (
    <>
      {/* Show proposal display when generated */}
      {isGeneratingProposal ? (
        <Suspense fallback={
          <div className={`flex items-center justify-center p-8 min-h-[50vh] ${
            theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'
          }`}>
            <div className="text-center">
              <LoadingSpinner size="xl" message="Generating your professional proposal..." variant="spinner" />
              <p className={`mt-4 text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                This usually takes 10-15 seconds
              </p>
            </div>
          </div>
        }>
          <ProposalDisplay 
            proposal={null} 
            isLoading={true}
          />
        </Suspense>
      ) : generatedProposal ? (
        <Suspense fallback={
          <div className={`flex items-center justify-center p-8 min-h-[50vh] ${
            theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'
          }`}>
            <div className="text-center">
              <LoadingSpinner size="lg" message="Loading your proposal..." variant="dots" />
            </div>
          </div>
        }>
          <ProposalDisplay 
            proposal={generatedProposal}
            onClose={() => setGeneratedProposal(null)}
          />
        </Suspense>
      ) : (
        <div className={`backdrop-blur-3xl rounded-3xl border shadow-2xl transition-all duration-700 max-w-7xl mx-auto relative ${
          theme === 'dark'
            ? 'bg-slate-900/60 border-slate-700/30 shadow-slate-900/40 ring-1 ring-slate-700/20'
            : 'bg-white/95 border-gray-200/60 shadow-gray-900/10 ring-1 ring-gray-200/30'
        }`} id="tool">
          {/* Loading overlay for form */}
          <AnimatePresence>
            {isSubmitting && (
              <motion.div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-3xl z-50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center space-y-4">
                  <LoadingSpinner 
                    size="lg" 
                    message="Generating your professional proposal..." 
                    variant="spinner"
                    showProgress={false}
                  />
                  <p className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                  }`}>
                    Please wait while we create your proposal
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
      {/* Header Section */}
      <motion.div
        className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 md:pt-12 pb-8 sm:pb-12 md:pb-16 mb-4 sm:mb-6 border-b border-opacity-10 transition-colors duration-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Step Indicator */}
        <div className="mb-8">
          <StepIndicator 
            currentStep={currentStep}
            size="md"
            showLabels={true}
            className="max-w-3xl mx-auto"
          />
        </div>

        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-6 sm:gap-8 md:gap-12">
            <div className="flex items-center gap-4 sm:gap-6">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg shadow-indigo-500/30" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                  AI-Powered
                </span>
                <span className={`text-xs font-medium tracking-wide ${
                  theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                }`}>
                  Proposal Generator
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-display mb-6 sm:mb-8 tracking-tight leading-tight ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Create Your Perfect Proposal
          </h1>
          <p className={`text-base sm:text-lg md:text-xl lg:text-headline leading-relaxed font-normal ${
            theme === 'dark' ? 'text-slate-300' : 'text-gray-600'
          } max-w-none sm:max-w-3xl md:max-w-5xl`}>
            Generate professional, AI-powered proposals in seconds. Our intelligent system adapts to your needs and creates compelling content that wins clients.
          </p>
        </motion.div>
      </motion.div>

      <form onSubmit={handleSubmit} className="px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-16 space-y-8 sm:space-y-12 md:space-y-16">
          {/* Template Selection */}
          <motion.div
            className="w-full max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className={`backdrop-blur-xl rounded-xl sm:rounded-2xl border p-3 sm:p-4 md:p-6 lg:p-8 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] w-full ${
              theme === 'dark'
                ? 'bg-slate-800/40 border-slate-700/30 hover:bg-slate-800/50 hover:border-slate-600/40 shadow-slate-900/30'
                : 'bg-white/70 border-gray-200/50 hover:bg-white/85 hover:border-gray-300/60 shadow-gray-900/20'
            }`}>
              <h3 className={`text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 md:mb-8 font-black ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Choose Template
              </h3>
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                {templates.map((template) => (
                  <motion.button
                    key={template.id}
                    type="button"
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`btn btn-ghost w-full text-left p-3 sm:p-4 md:p-6 premium-card relative overflow-hidden transition-all duration-300 ${
                      selectedTemplate === template.id
                        ? theme === 'dark'
                          ? 'border-indigo-500 bg-indigo-500/20 shadow-xl shadow-indigo-500/25'
                          : 'border-indigo-500 bg-indigo-50 shadow-xl shadow-indigo-500/20'
                        : ''
                    }`}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: templates.indexOf(template) * 0.1 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-r ${template.color} shadow-lg shadow-gray-900/20 flex-shrink-0`}>
                        <span className="text-white font-bold text-sm">{template.icon[0]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`font-semibold text-base ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {template.name}
                        </div>
                        <div className={`text-sm leading-relaxed font-normal ${
                          theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                        }`}>
                          {template.description}
                        </div>
                      </div>
                    </div>
                    {/* Premium hover overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div
            className="w-full max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <div className={`backdrop-blur-xl rounded-xl sm:rounded-2xl border p-4 sm:p-6 md:p-8 lg:p-12 transition-all duration-300 hover:shadow-xl hover:scale-[1.01] w-full ${
              theme === 'dark'
                ? 'bg-slate-800/40 border-slate-700/30 hover:bg-slate-800/50 hover:border-slate-600/40 shadow-slate-900/30'
                : 'bg-white/85 border-gray-200/50 hover:bg-white/95 hover:border-gray-300/60 shadow-gray-900/20'
            }`}>
              <h3 className={`text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6 md:mb-8 lg:mb-10 font-black ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Project Details
              </h3>
              <div className="space-y-6">
                {renderField(
                  'description',
                  'What do you need help with?',
                  'textarea',
                  "Describe your project in a few sentences..."
                )}

                {renderField(
                  'yourRole',
                  'Your expertise',
                  'text',
                  "e.g., Web Developer, UI Designer, Marketing Consultant"
                )}
              </div>
            </div>
          </motion.div>

        {/* Submit Button */}
        <motion.div
          className="flex justify-center pt-8 sm:pt-12 md:pt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
        >
          <motion.div
            whileHover={{ scale: isSubmitting || isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting || isLoading ? 1 : 0.98 }}
          >
            <button
              type="submit"
              disabled={!isFormValid() || isSubmitting || isLoading}
              className="relative w-full px-8 py-5 sm:px-12 sm:py-6 bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-600 text-white font-black text-lg sm:text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden group font-primary ring-4 ring-primary-400/20 ring-offset-0 disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:scale-100 min-h-[3.5rem] sm:min-h-[4rem]"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                {isSubmitting || isLoading ? (
                  <>
                    <LoadingSpinner 
                      size="sm" 
                      variant="spinner" 
                      className="opacity-100"
                    />
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Creating your masterpiece...
                    </motion.span>
                  </>
                ) : (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                    className="drop-shadow-lg"
                  >
                    Generate My Proposal
                  </motion.span>
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-2xl animate-pulse"></div>
            </button>
            <AnimatePresence>
              {(isSubmitting || isLoading) && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 backdrop-blur-sm rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Form Error */}
        <AnimatePresence>
          {errors.submit && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              <motion.div 
                className="inline-flex items-center gap-3 px-6 py-3 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm shadow-lg shadow-red-500/10"
                animate={{ 
                  boxShadow: ["0 10px 15px -3px rgba(239, 68, 68, 0.1)", "0 10px 15px -3px rgba(239, 68, 68, 0.2)", "0 10px 15px -3px rgba(239, 68, 68, 0.1)"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div 
                  className="w-5 h-5 bg-red-500/20 rounded-full flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  <svg className="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </motion.div>
                <motion.span 
                  className="text-sm font-medium text-red-400"
                  animate={{ opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {errors.submit}
                </motion.span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
        </div>
      )}
    </>
  );
};

export default MainTool;
