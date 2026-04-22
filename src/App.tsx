import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Critical components (loaded immediately)
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/ui/ErrorBoundary';
import NotificationProvider from './components/ui/NotificationContext';
import LoadingFallback from './components/ui/LoadingFallback';
import AnalyticsConsent from './components/ui/AnalyticsConsent';
import { analytics } from './utils/analytics';
import { useGlobalModal } from './components/ui/GlobalModal';
import { EnhancedGlobalModal } from './components/ui/GlobalModal';

// Lazy-loaded components
const MainTool = lazy(() => import('./components/common/MainTool'));

// Lazy-loaded pages
const Templates = lazy(() => import('./pages/Templates'));
const Blog = lazy(() => import('./pages/Blog'));
const Guide = lazy(() => import('./pages/Guide'));
const About = lazy(() => import('./pages/About'));
const Careers = lazy(() => import('./pages/Careers'));

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

              {/* Templates Page */}
              <Route 
                path="/templates" 
                element={
                  <motion.div
                    key="templates"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <Suspense fallback={<LoadingFallback type="page" />}>
                      <Navbar scrollToTool={() => navigate('/')} navigate={navigate} />
                      <Templates />
                    </Suspense>
                  </motion.div>
                } 
              />

              {/* Blog Page */}
              <Route 
                path="/blog" 
                element={
                  <motion.div
                    key="blog"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <Suspense fallback={<LoadingFallback type="page" />}>
                      <Navbar scrollToTool={() => navigate('/')} navigate={navigate} />
                      <Blog />
                    </Suspense>
                  </motion.div>
                } 
              />

              {/* Guide Page */}
              <Route 
                path="/guide" 
                element={
                  <motion.div
                    key="guide"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <Suspense fallback={<LoadingFallback type="page" />}>
                      <Navbar scrollToTool={() => navigate('/')} navigate={navigate} />
                      <Guide />
                    </Suspense>
                  </motion.div>
                } 
              />

              {/* About Page */}
              <Route 
                path="/about" 
                element={
                  <motion.div
                    key="about"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <Suspense fallback={<LoadingFallback type="page" />}>
                      <Navbar scrollToTool={() => navigate('/')} navigate={navigate} />
                      <About />
                    </Suspense>
                  </motion.div>
                } 
              />

              {/* Careers Page */}
              <Route 
                path="/careers" 
                element={
                  <motion.div
                    key="careers"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <Suspense fallback={<LoadingFallback type="page" />}>
                      <Navbar scrollToTool={() => navigate('/')} navigate={navigate} />
                      <Careers />
                    </Suspense>
                  </motion.div>
                } 
              />
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
