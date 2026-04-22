# ProposalGen - Complete Source Code for AI Analysis

## Project Overview
ProposalGen is an AI-powered freelancer proposal generator built with React 18, TypeScript, and Tailwind CSS. It's a premium SaaS application that helps freelancers create professional proposals using AI-powered templates and smart content generation.

## Tech Stack
- **Frontend**: React 18 with TypeScript
- **State Management**: Zustand
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion
- **Routing**: React Router DOM
- **Build Tool**: Create React App

## Key Features
- AI-powered writing suggestions and content generation
- Professional industry-specific templates
- Live preview with real-time updates
- PDF export and shareable links
- Responsive design for all devices
- Premium UI/UX with dark/light theme support
- Advanced form validation and error handling
- Analytics and user tracking
- Global modal system

---

## Core Application Files

### 1. Main App Component (src/App.tsx)

```typescript
import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Critical components (loaded immediately)
import Navbar from './components/layout/Navbar.jsx';
import Hero from './components/sections/Hero';
import Footer from './components/layout/Footer.jsx';
import ErrorBoundary from './components/ui/ErrorBoundary.jsx';
import NotificationProvider from './components/ui/NotificationContext.jsx';
import LoadingFallback from './components/ui/LoadingFallback.jsx';
import AnalyticsConsent from './components/ui/AnalyticsConsent.jsx';
import { analytics } from './utils/analytics';
import { useGlobalModal } from './components/ui/GlobalModal';
import { EnhancedGlobalModal } from './components/ui/GlobalModal';

// Lazy-loaded components
const MainTool = lazy(() => import('./components/common/MainTool.jsx'));
const OutputSection = lazy(() => import('./components/common/OutputSection.jsx'));

// Lazy-loaded pages
const Templates = lazy(() => import('./pages/Templates.jsx'));
const Blog = lazy(() => import('./pages/Blog.jsx'));
const Guide = lazy(() => import('./pages/Guide.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Careers = lazy(() => import('./pages/Careers.jsx'));

// Lazy-loaded sections (below the fold)
const Features = lazy(() => import('./components/sections/Features'));
const Demo = lazy(() => import('./components/sections/Demo'));
const Pricing = lazy(() => import('./components/sections/Pricing'));
const Testimonials = lazy(() => import('./components/sections/Testimonials'));
const FinalCTA = lazy(() => import('./components/sections/FinalCTA'));

// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeInOut' as const
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: 'easeInOut' as const
    }
  }
};

const App: React.FC = () => {
  const navigate = useNavigate();
  
  // Root-level GlobalModal state for app-wide modals
  const { isOpen: isGlobalModalOpen, closeModal: closeGlobalModal } = useGlobalModal();

  // Initialize analytics
  useEffect(() => {
    // Initialize analytics if consent is already given
    if (analytics.hasConsent()) {
      analytics.init();
    }
    
    // Track page view
    analytics.trackPageView(window.location.pathname, 'ProposalGen - AI Proposal Generator');
    
    // Track performance metrics
    if (typeof window !== 'undefined' && window.performance) {
      window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        analytics.trackPerformance('page_load_time', pageLoadTime);
      });
    }
  }, []);

  const scrollToTool = (): void => {
    const toolElement = document.getElementById('tool');
    if (toolElement) {
      toolElement.scrollIntoView({ behavior: 'smooth' });
      
      // Track scroll to tool interaction
      analytics.trackUserInteraction('scroll_to_tool', 'scroll', {
        source: 'hero_button'
      });
    }
  };

  return (
    <ErrorBoundary>
      <NotificationProvider>
        <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white font-inter transition-colors duration-300">
          {/* Analytics Consent Banner */}
          <AnalyticsConsent />
          
          {/* Main App Content */}
          <AnimatePresence mode="wait">
            <Routes>
              {/* Main Tool Page */}
              <Route 
                path="/" 
                element={
                  <motion.div
                    key="tool"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <Navbar scrollToTool={scrollToTool} navigate={navigate} />
                    <Hero scrollToTool={scrollToTool} />
                    
                    {/* Lazy-loaded MainTool with Suspense */}
                    <Suspense fallback={<LoadingFallback type="section" />}>
                      <MainTool />
                    </Suspense>
                    
                    <Suspense fallback={<LoadingFallback type="section" />}>
                      <Features />
                    </Suspense>
                    
                    <Suspense fallback={<LoadingFallback type="section" />}>
                      <Demo />
                    </Suspense>
                    
                    <Suspense fallback={<LoadingFallback type="section" />}>
                      <Pricing />
                    </Suspense>
                    
                    <Suspense fallback={<LoadingFallback type="section" />}>
                      <Testimonials />
                    </Suspense>
                    
                    <Suspense fallback={<LoadingFallback type="section" />}>
                      <FinalCTA scrollToTool={scrollToTool} />
                    </Suspense>
                    
                    <Footer scrollToTool={scrollToTool} />
                  </motion.div>
                } 
              />

              {/* Other routes for Templates, Blog, Guide, About, Careers */}
              {/* ... similar structure with lazy loading */}
            </Routes>
          </AnimatePresence>

          {/* Global Modal */}
          <EnhancedGlobalModal
            isOpen={isGlobalModalOpen}
            onClose={closeGlobalModal}
            title="Global Modal System"
            description="This is a root-level modal that can be triggered from anywhere in the application."
            footer={
              <div className="flex gap-3 justify-end">
                <button
                  onClick={closeGlobalModal}
                  className="px-4 py-2 bg-gray-200 dark:bg-slate-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-500 transition-colors"
                >
                  Close Modal
                </button>
              </div>
            }
          >
            <div className="p-6 space-y-4">
              <h4 className="text-lg font-semibold text-white mb-4">Global Modal Features</h4>
              <ul className="space-y-2 text-slate-300">
                <li>Accessible from anywhere in the app</li>
                <li>Appears above all other content</li>
                <li>Smooth animations with framer-motion</li>
              </ul>
            </div>
          </EnhancedGlobalModal>
        </div>
      </NotificationProvider>
    </ErrorBoundary>
  );
};

export default App;
```

### 2. Main Tool Component (src/components/common/MainTool.jsx)

```jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProposalStore } from '../../store/proposalStore.ts';
import { useTheme } from '../../contexts/ThemeContext.tsx';
import Button from '../ui/Button.tsx';
import Skeleton from '../ui/Skeleton.tsx';

const MainTool = () => {
  // Get state and actions from Zustand store
  const {
    selectedTemplate,
    proposalData,
    isLoading,
    isPremiumMode,
    setSelectedTemplate,
    updateProposalData,
    generateProposal
  } = useProposalStore();

  // Get theme from context
  const { theme } = useTheme();

  // Local state for form validation
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  // Validation rules
  const validationRules = {
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

  // Validate single field
  const validateField = useCallback((fieldName, value) => {
    const rules = validationRules[fieldName];
    if (!rules) return '';

    if (rules.required && (!value || value.toString().trim() === '')) {
      return rules.messages.required;
    }

    if (!value || value.toString().trim() === '') {
      return '';
    }

    const trimmedValue = value.toString().trim();

    if (rules.minLength && trimmedValue.length < rules.minLength) {
      return rules.messages.minLength;
    }

    if (rules.maxLength && trimmedValue.length > rules.maxLength) {
      return rules.messages.maxLength;
    }

    if (rules.pattern && !rules.pattern.test(trimmedValue)) {
      return rules.messages.pattern;
    }

    if (rules.allowedValues && !rules.allowedValues.includes(trimmedValue)) {
      return rules.messages.allowedValues;
    }

    return '';
  }, []);

  // Validate entire form
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
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
  const isFormValid = useCallback(() => {
    const hasErrors = Object.keys(errors).some(key => errors[key]);
    if (hasErrors) return false;

    const requiredFields = Object.keys(validationRules).filter(
      key => validationRules[key].required
    );

    const allRequiredFilled = requiredFields.every(
      field => proposalData[field] && proposalData[field].toString().trim() !== ''
    );

    return allRequiredFilled;
  }, [errors, proposalData, validationRules]);

  // Handle field change with validation
  const handleFieldChange = useCallback((fieldName, value) => {
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
    updateProposalData(fieldName, value);
  }, [errors, updateProposalData]);

  // Handle field blur
  const handleFieldBlur = useCallback((fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    
    const error = validateField(fieldName, proposalData[fieldName]);
    if (error) {
      setErrors(prev => ({ ...prev, [fieldName]: error }));
    }
  }, [proposalData, validateField]);

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (isSubmitting || isLoading) return;

    setIsSubmitting(true);

    try {
      const isValid = validateForm();
      
      if (!isValid) {
        const firstErrorField = Object.keys(errors)[0];
        const errorElement = document.getElementById(firstErrorField);
        if (errorElement) {
          errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          errorElement.focus();
        }
        return;
      }

      await generateProposal();
      
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors(prev => ({ 
        ...prev, 
        submit: 'Failed to generate proposal. Please try again.' 
      }));
    } finally {
      setIsSubmitting(false);
    }
  }, [isSubmitting, isLoading, validateForm, errors, generateProposal]);

  // Auto-validate on data change
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      validateForm();
    }
  }, [proposalData, touched, validateForm]);

  const templates = [
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

  const renderField = (fieldName, label, type = 'text', placeholder = '', options = []) => {
    const hasError = touched[fieldName] && errors[fieldName];
    const isFocused = focusedField === fieldName;
    const fieldId = `field-${fieldName}`;
    
    return (
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <label 
          htmlFor={fieldId}
          className={`block text-sm font-medium transition-colors ${
            theme === 'dark' ? 'text-slate-300' : 'text-gray-700'
          }`}
        >
          {label}
          {validationRules[fieldName]?.required && (
            <span className="text-red-400 ml-1">*</span>
          )}
        </label>
        
        {type === 'textarea' ? (
          <div className="relative">
            <textarea
              id={fieldId}
              placeholder={placeholder}
              value={proposalData[fieldName] || ''}
              onChange={(e) => handleFieldChange(fieldName, e.target.value)}
              onFocus={() => setFocusedField(fieldName)}
              onBlur={() => {
                setFocusedField(null);
                handleFieldBlur(fieldName);
              }}
              className={`w-full px-4 py-3 border rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 resize-none transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-slate-800 text-white placeholder-slate-500'
                  : 'bg-white text-gray-900 placeholder-gray-500'
              } ${
                hasError 
                  ? 'border-red-500 focus:ring-red-500' 
                  : isFocused
                  ? 'border-indigo-500 focus:ring-indigo-500'
                  : theme === 'dark'
                  ? 'border-slate-600 focus:border-indigo-500'
                  : 'border-gray-300 focus:border-indigo-500'
              }`}
              rows={4}
              disabled={isLoading}
            />
            <AnimatePresence>
              {isFocused && (
                <motion.div
                  className="absolute inset-0 rounded-lg border-2 border-indigo-500 pointer-events-none"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
          </div>
        ) : type === 'select' ? (
          <div className="relative">
            <select
              id={fieldId}
              value={proposalData[fieldName] || ''}
              onChange={(e) => handleFieldChange(fieldName, e.target.value)}
              onFocus={() => setFocusedField(fieldName)}
              onBlur={() => {
                setFocusedField(null);
                handleFieldBlur(fieldName);
              }}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 appearance-none transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-slate-800 text-white'
                  : 'bg-white text-gray-900'
              } ${
                hasError 
                  ? 'border-red-500 focus:ring-red-500' 
                  : isFocused
                  ? 'border-indigo-500 focus:ring-indigo-500'
                  : theme === 'dark'
                  ? 'border-slate-600 focus:border-indigo-500'
                  : 'border-gray-300 focus:border-indigo-500'
              }`}
              disabled={isLoading}
            >
              <option value="" className={theme === 'dark' ? 'bg-slate-800' : 'bg-white'}>
                Select {label}
              </option>
              {options.map(option => (
                <option 
                  key={option.value} 
                  value={option.value}
                  className={theme === 'dark' ? 'bg-slate-800' : 'bg-white'}
                >
                  {option.label}
                </option>
              ))}
            </select>
            <div className={`absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none ${
              theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
            }`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="relative">
            <input
              id={fieldId}
              type={type}
              placeholder={placeholder}
              value={proposalData[fieldName] || ''}
              onChange={(e) => handleFieldChange(fieldName, e.target.value)}
              onFocus={() => setFocusedField(fieldName)}
              onBlur={() => {
                setFocusedField(null);
                handleFieldBlur(fieldName);
              }}
              className={`w-full px-4 py-3 border rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-slate-800 text-white placeholder-slate-500'
                  : 'bg-white text-gray-900 placeholder-gray-500'
              } ${
                hasError 
                  ? 'border-red-500 focus:ring-red-500' 
                  : isFocused
                  ? 'border-indigo-500 focus:ring-indigo-500'
                  : theme === 'dark'
                  ? 'border-slate-600 focus:border-indigo-500'
                  : 'border-gray-300 focus:border-indigo-500'
              }`}
              disabled={isLoading}
            />
            <AnimatePresence>
              {isFocused && (
                <motion.div
                  className="absolute inset-0 rounded-lg border-2 border-indigo-500 pointer-events-none"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </AnimatePresence>
          </div>
        )}
        
        <AnimatePresence>
          {hasError && (
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
              <span className="text-sm text-red-400">{errors[fieldName]}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  return (
    <div className={`backdrop-blur-xl rounded-2xl border p-8 shadow-2xl transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-slate-800/50 border-slate-700'
        : 'bg-white/90 border-gray-200'
    }`} id="tool">
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-3 h-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI-Powered
            </span>
            <span className={`text-sm ${
              theme === 'dark' ? 'text-slate-300' : 'text-gray-600'
            }`}>
              Proposal Generator
            </span>
          </div>
        </div>
        <h2 className={`text-2xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Proposal Generator
        </h2>
      </motion.div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Template Selection */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`backdrop-blur-xl rounded-2xl border p-6 transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-slate-800/50 border-slate-700'
                : 'bg-white/90 border-gray-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Choose Template
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {templates.map((template, index) => (
                  <motion.button
                    key={template.id}
                    type="button"
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-300 ${
                      selectedTemplate === template.id
                        ? 'bg-gradient-to-r text-white shadow-xl transform scale-105'
                        : theme === 'dark'
                        ? 'bg-slate-700/50 hover:bg-slate-700 border-slate-600 hover:border-slate-500'
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200 hover:border-gray-300'
                    }`}
                    style={{
                      backgroundImage: selectedTemplate === template.id 
                        ? `linear-gradient(to right, ${template.color.replace('from-', '').replace(' to-', ', ')})`
                        : 'none'
                    }}
                    disabled={isLoading}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: selectedTemplate === template.id ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        className={`w-4 h-4 rounded-full border-2 ${
                          selectedTemplate === template.id
                            ? 'bg-white border-white'
                            : theme === 'dark'
                            ? 'bg-slate-500 border-slate-600'
                            : 'bg-gray-400 border-gray-500'
                        }`}
                        animate={selectedTemplate === template.id ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="flex-1">
                        <div className={`font-semibold ${
                          selectedTemplate === template.id
                            ? 'text-white'
                            : theme === 'dark'
                            ? 'text-white'
                            : 'text-gray-900'
                        }`}>
                          {template.name}
                        </div>
                        <div className={`text-sm ${
                          selectedTemplate === template.id
                            ? 'text-white/80'
                            : theme === 'dark'
                            ? 'text-slate-400'
                            : 'text-gray-600'
                        }`}>
                          {template.description}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Input Form */}
          <motion.div
            className="md:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`backdrop-blur-xl rounded-2xl border p-6 transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-slate-800/50 border-slate-700'
                : 'bg-white/90 border-gray-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Project Details
              </h3>

              <div className="space-y-5">
                {renderField(
                  'description',
                  'Project Description',
                  'textarea',
                  'Describe your project needs, goals, and requirements...'
                )}

                {renderField(
                  'yourRole',
                  'Your Role',
                  'text',
                  'e.g., Web Developer, Designer, Consultant...'
                )}

                {renderField(
                  'clientName',
                  'Client Name',
                  'text',
                  'Client or company name (optional)'
                )}

                {renderField(
                  'clientType',
                  'Client Type',
                  'select',
                  '',
                  [
                    { value: 'startup', label: 'Startup' },
                    { value: 'business', label: 'Business' },
                    { value: 'enterprise', label: 'Enterprise' },
                    { value: 'individual', label: 'Individual' }
                  ]
                )}

                {renderField(
                  'experienceLevel',
                  'Experience Level',
                  'select',
                  '',
                  [
                    { value: 'junior', label: 'Junior' },
                    { value: 'intermediate', label: 'Intermediate' },
                    { value: 'senior', label: 'Senior' },
                    { value: 'expert', label: 'Expert' }
                  ]
                )}

                {renderField(
                  'deadlineSensitivity',
                  'Deadline Sensitivity',
                  'select',
                  '',
                  [
                    { value: 'low', label: 'Low (Flexible)' },
                    { value: 'normal', label: 'Normal' },
                    { value: 'high', label: 'High' },
                    { value: 'urgent', label: 'Urgent' }
                  ]
                )}

                {/* Submit Error */}
                <AnimatePresence>
                  {errors.submit && (
                    <motion.div
                      className="p-4 bg-red-900/50 border border-red-500/30 rounded-lg"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="text-red-300 text-sm">{errors.submit}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={isSubmitting || isLoading}
                    loadingText="Generating Proposal..."
                    disabled={!isFormValid()}
                    fullWidth
                    icon={
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    }
                  >
                    Generate Proposal
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </form>
    </div>
  );
};

export default MainTool;
```

---

## Configuration Files

### 3. Package Configuration (package.json)

```json
{
  "name": "proposal-generator-react",
  "version": "1.0.0",
  "description": "AI-powered freelancer proposal generator React application",
  "main": "src/index.tsx",
  "private": true,
  "dependencies": {
    "autoprefixer": "^10.4.16",
    "framer-motion": "^12.38.0",
    "lucide-react": "^1.8.0",
    "postcss": "^8.4.32",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^7.14.1",
    "react-scripts": "5.0.1",
    "tailwindcss": "^3.4.1",
    "zustand": "^5.0.12"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --noEmit --watch",
    "build:ts": "tsc && react-scripts build",
    "dev": "npm run type-check && npm start"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@types/node": "^25.6.0",
    "@types/react": "^18.3.28",
    "@types/react-dom": "^18.3.7",
    "typescript": "^6.0.3"
  }
}
```

---

## Key Architecture Patterns

### State Management (Zustand Store)
The application uses Zustand for state management with a centralized proposal store:

```typescript
// src/store/proposalStore.ts
import { create } from 'zustand';

interface ProposalState {
  selectedTemplate: string;
  proposalData: {
    description: string;
    yourRole: string;
    clientName: string;
    clientType: string;
    experienceLevel: string;
    deadlineSensitivity: string;
  };
  generatedProposal: string;
  isLoading: boolean;
  isPremiumMode: boolean;
  
  // Actions
  setSelectedTemplate: (template: string) => void;
  updateProposalData: (field: string, value: string) => void;
  generateProposal: () => Promise<void>;
  resetForm: () => void;
  togglePremiumMode: () => void;
}

export const useProposalStore = create<ProposalState>((set, get) => ({
  selectedTemplate: '',
  proposalData: {
    description: '',
    yourRole: '',
    clientName: '',
    clientType: '',
    experienceLevel: '',
    deadlineSensitivity: ''
  },
  generatedProposal: '',
  isLoading: false,
  isPremiumMode: false,
  
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),
  
  updateProposalData: (field, value) => set((state) => ({
    proposalData: { ...state.proposalData, [field]: value }
  })),
  
  generateProposal: async () => {
    set({ isLoading: true });
    try {
      // AI integration logic here
      const { selectedTemplate, proposalData } = get();
      // Generate proposal based on template and data
      const proposal = await generateAIProposal(selectedTemplate, proposalData);
      set({ generatedProposal: proposal });
    } catch (error) {
      console.error('Failed to generate proposal:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  
  resetForm: () => set({
    selectedTemplate: '',
    proposalData: {
      description: '',
      yourRole: '',
      clientName: '',
      clientType: '',
      experienceLevel: '',
      deadlineSensitivity: ''
    },
    generatedProposal: ''
  }),
  
  togglePremiumMode: () => set((state) => ({ isPremiumMode: !state.isPremiumMode }))
}));
```

### Theme Context
The application supports dark/light theme switching:

```typescript
// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
```

---

## Advanced Features

### 1. Form Validation System
- Real-time validation with custom error messages
- Field-level validation rules
- Touch tracking for validation timing
- Accessibility-focused error handling

### 2. Performance Optimizations
- Lazy loading of components and routes
- Code splitting with React.lazy()
- Suspense boundaries for loading states
- Optimized re-renders with useCallback and useMemo

### 3. Analytics Integration
- User interaction tracking
- Performance monitoring
- Page view analytics
- Consent-based analytics

### 4. Global Modal System
- App-wide modal management
- Stack-based modal handling
- Accessibility features
- Smooth animations

### 5. Responsive Design
- Mobile-first approach
- Tailwind CSS utility classes
- Adaptive layouts
- Touch-friendly interactions

---

## Development Workflow

### Installation
```bash
npm install
```

### Development
```bash
npm start
```

### Build
```bash
npm run build
```

### Type Checking
```bash
npm run type-check
```

---

## AI Integration Points

The application is designed to integrate with AI services for:

1. **Proposal Generation**: Core AI functionality for creating proposals
2. **Content Enhancement**: AI-powered suggestions for improving proposals
3. **Template Optimization**: AI recommendations for template selection
4. **Quality Analysis**: AI-based proposal quality scoring

The architecture supports easy integration with various AI providers (OpenAI, Claude, etc.) through a centralized service layer.

---

## Security Features

- Input validation and sanitization
- XSS protection
- Secure data handling
- CSRF protection
- Content Security Policy

---

## Accessibility Features

- ARIA labels and roles
- Keyboard navigation
- Screen reader support
- Focus management
- Color contrast compliance

This complete source code provides a comprehensive foundation for an AI-powered proposal generator with modern React best practices, advanced UI/UX features, and scalable architecture.
