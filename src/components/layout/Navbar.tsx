import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../ui/ThemeToggle';
import SmartLink from '../ui/SmartLink';
import TemplatesContent from './TemplatesContent';
import BlogContent from './BlogContent';
import GuideContent from './GuideContent';
import AboutContent from './AboutContent';

interface NavLink {
  name: string;
  path: string;
  type: 'nav' | 'modal';
  component?: React.ReactNode;
}

interface NavbarProps {
  scrollToTool?: () => void;
  navigate?: (path: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ scrollToTool, navigate }) => {
  const { theme } = useTheme();
  const routerNavigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navLinks: NavLink[] = [
    { name: 'Home', path: '/', type: 'nav' },
    { name: 'Templates', path: '/templates', type: 'modal', component: <TemplatesContent /> },
    { name: 'Blog', path: '/blog', type: 'modal', component: <BlogContent /> },
    { name: 'Guide', path: '/guide', type: 'modal', component: <GuideContent /> },
    { name: 'About', path: '/about', type: 'modal', component: <AboutContent /> },
    { name: 'Careers', path: '/careers', type: 'nav' }
  ];

  const handleNavClick = (link: NavLink) => {
    if (link.type === 'nav') {
      if (navigate) {
        navigate(link.path);
      } else {
        routerNavigate(link.path);
      }
    }
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
            <button
              onClick={() => handleNavClick(navLinks[0])}
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
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              link.type === 'modal' ? (
                <SmartLink
                  key={link.name}
                  component={link.component}
                  modalOptions={{ size: 'lg', showCloseButton: true }}
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
                </SmartLink>
              ) : (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    theme === 'dark'
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </button>
              )
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Generate Proposal Button */}
            <motion.button
              onClick={scrollToTool}
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
                link.type === 'modal' ? (
                  <SmartLink
                    key={link.name}
                    component={link.component}
                    modalOptions={{ size: 'lg', showCloseButton: true }}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:text-white hover:bg-slate-800'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {link.name}
                  </SmartLink>
                ) : (
                  <motion.button
                    key={link.name}
                    onClick={() => handleNavClick(link)}
                    className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      theme === 'dark'
                        ? 'text-gray-300 hover:text-white hover:bg-slate-800'
                        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.name}
                  </motion.button>
                )
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
