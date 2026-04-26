import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

// FinalCTA component props
interface FinalCTAProps {
  scrollToTool: () => void;
  className?: string;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ scrollToTool, className = '' }) => {
  const { theme } = useTheme();

  return (
    <section className={`py-20 lg:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-black mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Your Next Client is Waiting
          </h2>
          <p className={`text-xl sm:text-2xl md:text-3xl leading-relaxed font-medium ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Start winning more projects today. Your first proposal could be your next biggest client.
          </p>
          
          <div className="flex justify-center">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
