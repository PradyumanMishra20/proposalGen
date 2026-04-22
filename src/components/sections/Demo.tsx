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
    <section className={`py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className={`text-3xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            See It In Action
          </h2>
          <p className={`text-xl mb-12 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Experience the power of AI-generated proposals
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`p-8 rounded-2xl ${
            theme === 'dark' 
              ? 'bg-slate-800 border-slate-700' 
              : 'bg-white border-gray-200'
          } border shadow-xl`}
        >
          <div className="text-center">
            <div className="text-6xl mb-6">🎯</div>
            <h3 className={`text-2xl font-semibold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Interactive Demo
            </h3>
            <p className={`mb-6 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Try our proposal generator with a live demo. See how AI transforms your requirements into professional proposals.
            </p>
            <button 
              className={`px-8 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                theme === 'dark'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Start Demo
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Demo;
