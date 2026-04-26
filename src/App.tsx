import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate, Outlet } from 'react-router-dom';
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
const TrustSection = lazy(() => import('./components/sections/TrustSection'));
const Testimonials = lazy(() => import('./components/sections/Testimonials'));
const FinalCTA = lazy(() => import('./components/sections/FinalCTA'));

const ScrollToTop = (): React.JSX.Element | null => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

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

const Layout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      {/* page content renders here */}
      <Outlet />

      <Footer />
    </>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const scrollToTool = (): void => {
    const toolElement = document.getElementById('tool');
    if (toolElement) {
      toolElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section - Clean, focused */}
      <Hero scrollToTool={scrollToTool} navigate={navigate} />

      {/* Trust Section - Social Proof Near CTA */}
      <Suspense fallback={<LoadingFallback type="section" />}>
        <TrustSection />
      </Suspense>

      {/* Main Tool Section - Primary Focus */}
      <section id="tool" className="py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<LoadingFallback type="section" />}>
            <MainTool />
          </Suspense>
        </div>
      </section>

      {/* Additional Sections */}
      <Suspense fallback={<LoadingFallback type="section" />}>
        <Features />
      </Suspense>

      <Suspense fallback={<LoadingFallback type="section" />}>
        <Pricing scrollToTool={scrollToTool} navigate={navigate} />
      </Suspense>

      <Suspense fallback={<LoadingFallback type="section" />}>
        <FinalCTA scrollToTool={scrollToTool} />
      </Suspense>
    </>
  );
};

const App: React.FC = () => {
  const { isOpen: isGlobalModalOpen, closeModal: closeGlobalModal } = useGlobalModal();

  useEffect(() => {
    if (analytics.hasConsent()) {
      analytics.init();
    }
  }, []);

  const scrollToTool = (): void => {
    const toolElement = document.getElementById('tool');
    if (toolElement) {
      toolElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ErrorBoundary>
      <NotificationProvider>
        <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white font-inter transition-colors duration-300">

          <AnalyticsConsent />

          <Routes>

            {/* WRAPPED ROUTES (FIX FOR NAVIGATION BUG) */}
            <Route element={<Layout />}>

              {/* HOME */}
              <Route path="/" element={<Home />} />

              {/* PAGES */}
              <Route path="/templates" element={
                <Suspense fallback={<LoadingFallback type="page" />}>
                  <Templates />
                </Suspense>
              } />

              <Route path="/blog" element={
                <Suspense fallback={<LoadingFallback type="page" />}>
                  <Blog />
                </Suspense>
              } />

              <Route path="/guide" element={
                <Suspense fallback={<LoadingFallback type="page" />}>
                  <Guide />
                </Suspense>
              } />

              <Route path="/about" element={
                <Suspense fallback={<LoadingFallback type="page" />}>
                  <About />
                </Suspense>
              } />

              <Route path="/careers" element={
                <Suspense fallback={<LoadingFallback type="page" />}>
                  <Careers />
                </Suspense>
              } />

            </Route>

            {/* Catch-all */}
            <Route path="*" element={<div className="p-10 text-center">404 - Page Not Found</div>} />

          </Routes>

          {/* Global Modal */}
          <EnhancedGlobalModal
            isOpen={isGlobalModalOpen}
            onClose={closeGlobalModal}
            title="Global Modal System"
          >
            <div className="p-6 text-slate-300">
              Navigation fixed — no more routing loops or random page switching.
            </div>
          </EnhancedGlobalModal>

        </div>
      </NotificationProvider>
    </ErrorBoundary>
  );
};

export default App;
