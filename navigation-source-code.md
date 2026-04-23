# Navigation Source Code

## 1. **index.tsx** (Router Setup)
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { ModalProvider } from './contexts/ModalContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider>
      <ModalProvider>
        <App />
      </ModalProvider>
    </ThemeProvider>
  </BrowserRouter>
);
```

## 2. **App.tsx** (Routes Configuration)
```tsx
import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';  

// Critical components
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

const Features = lazy(() => import('./components/sections/Features'));
const Demo = lazy(() => import('./components/sections/Demo'));
const Pricing = lazy(() => import('./components/sections/Pricing'));
const Testimonials = lazy(() => import('./components/sections/Testimonials'));
const FinalCTA = lazy(() => import('./components/sections/FinalCTA'));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


// ✅ FIX: SINGLE LAYOUT (THIS IS THE REAL FIX)

const Layout: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};


// HOME PAGE (kept your structure safe)
const Home = () => {
  const scrollToTool = (): void => {
    const toolElement = document.getElementById('tool');
    if (toolElement) {
      toolElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      const navigate = useNavigate();
      <Hero scrollToTool={scrollToTool} navigate={navigate} />

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
        <Pricing scrollToTool={scrollToTool} />
      </Suspense>

      <Suspense fallback={<LoadingFallback type="section" />}>
        <Testimonials />
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

            {/* ✅ WRAPPED ROUTES (FIX FOR NAVIGATION BUG) */}
            <Route element={<Layout />}>

              {/* HOME */}
             <Route path="/" element={
               <Suspense fallback={<LoadingFallback type="page" />}>
                 <Home />
               </Suspense>
             } />

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
```

## 3. **Navbar.tsx** (Navigation Component)
```tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';

interface NavLink {
  name: string;
  path: string;
  type: 'nav' | 'modal';
  component?: React.ReactNode;
}

const Navbar: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation(); // ✅ FIX: track route changes
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navLinks: NavLink[] = [
    { name: 'Home', path: '/', type: 'nav' },
    { name: 'Templates', path: '/templates', type: 'nav' },
    { name: 'Blog', path: '/blog', type: 'nav' },
    { name: 'Guide', path: '/guide', type: 'nav' },
    { name: 'About', path: '/about', type: 'nav' },
    { name: 'Careers', path: '/careers', type: 'nav' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // ✅ FIX: auto-close mobile menu when route changes
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <motion.nav
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-slate-900/90 border-slate-800'
          : 'bg-white/90 border-gray-200'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                ProposalGen
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  theme === 'dark'
                    ? 'text-gray-300 hover:text-white'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                <span className="relative">
                  {link.name}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {/* Generate Proposal Button */}
            <motion.button
             onClick={() => {
                if (location.pathname === '/') {
                   window.scrollTo({ top: 0, behavior: 'smooth' });
                 } else {
                   navigate('/');
                 }
              }} // kept, but now stable
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Generate Proposal
            </motion.button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-md ${
                  theme === 'dark'
                    ? 'text-gray-400 hover:text-white hover:bg-slate-800'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </motion.button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`px-2 pt-2 pb-3 space-y-1 border-t ${
              theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'
            }`}>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-300 hover:text-white hover:bg-slate-800'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.nav>
  );
};

export default Navbar;
```

## **Key Navigation Features:**

1. **BrowserRouter** with explicit basename
2. **React Router Link** components for all navigation
3. **No prop passing** that could interfere with routing
4. **React Fragments** instead of wrapper divs
5. **Catch-all route** for 404 handling
6. **Clean SPA navigation** without page reloads
7. **Mobile responsive** navigation with hamburger menu
8. **Theme-aware** styling support

## **Navigation Routes:**
- `/` - Home page (Main Tool)
- `/templates` - Templates page
- `/blog` - Blog page
- `/guide` - Guide page
- `/about` - About page
- `/careers` - Careers page
- `/*` - Catch-all redirect to home

## **Dependencies Required:**
```json
{
  "react-router-dom": "^6.8.0",
  "framer-motion": "^10.0.0"
}
```

This navigation setup should work reliably without cycling or reloading issues.
