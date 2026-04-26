import React from 'react';
import { motion } from 'framer-motion';

// Hero component props
interface HeroProps {
  scrollToTool: () => void;
  navigate: (path: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToTool, navigate }) => {
  const openExampleModal = () => {
    // Navigate to templates page for examples
    navigate('/templates');
  };

  return (
    <header className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>
      
      {/* Main content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-16 text-center">
          {/* Hero Content */}
          <section className="space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-primary text-white leading-tight tracking-tight"
            >
              <span className="block text-white/90">AI-Powered</span>
              <span className="bg-gradient-to-r from-primary-400 via-primary-300 to-secondary-400 bg-clip-text text-transparent drop-shadow-lg">
                Proposal Generator
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl font-primary text-neutral-100 max-w-3xl leading-relaxed font-medium text-white/95"
            >
              For freelancers & agencies who want to win more clients. Create professional proposals in 60 seconds, not hours.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex justify-center px-4 sm:px-0"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToTool}
                className="relative w-full sm:w-auto px-10 py-5 sm:px-20 sm:py-7 bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-600 text-white font-black text-xl sm:text-2xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden group font-primary ring-4 ring-primary-400/20 ring-offset-0"
              >
                <span className="relative z-10 drop-shadow-lg">Start Free</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-2xl animate-pulse"></div>
              </motion.button>
            </motion.div>
          </section>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center items-center gap-6 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-white/80 font-medium">10,000+ Users</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white/80 font-medium">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-white/50"></div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-teal-500 border-2 border-white/50"></div>
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-red-500 border-2 border-white/50"></div>
              </div>
              <span className="text-white/80 font-medium">Trusted Worldwide</span>
            </div>
          </motion.div>

          {/* Product Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="relative"
          >
            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl">
              <div className="bg-slate-900/50 rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="ml-4 text-xs text-gray-400 font-mono">proposal-generator.ai</div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                  <div className="h-3 bg-primary-600/30 rounded w-5/6 border-l-4 border-primary-600"></div>
                  <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                </div>
                <div className="mt-4 flex gap-2">
                  <div className="h-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg w-24"></div>
                  <div className="h-8 bg-gray-700 rounded w-20"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </header>
  );
};

export default Hero;
