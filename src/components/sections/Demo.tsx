import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

// Demo component props
interface DemoProps {
  className?: string;
}

const Demo: React.FC<DemoProps> = ({ className = '' }) => {
  const { theme } = useTheme();

  return (
    <section className={`py-16 md:py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            See It In Action
          </h2>
          <p className={`text-lg sm:text-xl md:text-2xl leading-relaxed font-medium ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Experience the power of AI-generated proposals
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl ${
            theme === 'dark' 
              ? 'bg-slate-800 border-slate-700' 
              : 'bg-white border-gray-200'
          } border shadow-xl`}
        >
          <div className="text-center">
            <div className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6">🎯</div>
            <h3 className={`text-2xl sm:text-3xl font-black mb-4 sm:mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Interactive Demo
            </h3>
            <p className={`text-lg sm:text-xl mb-6 sm:mb-8 font-medium ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}>
              Try our proposal generator with a live demo. See how AI transforms your requirements into professional proposals.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="relative w-full sm:w-auto px-10 py-5 sm:px-20 sm:py-7 bg-gradient-to-r from-primary-500 via-primary-600 to-secondary-600 text-white font-black text-xl sm:text-2xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden group font-primary ring-4 ring-primary-400/20 ring-offset-0"
            >
              <span className="relative z-10 drop-shadow-lg">Start Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400/20 to-secondary-400/20 rounded-2xl animate-pulse"></div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Demo;
