import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

// Icon components - memoized to prevent re-creation
const BrainIcon = React.memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
));

const DocumentIcon = React.memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
));

const PaletteIcon = React.memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
  </svg>
));

const ShareIcon = React.memo(() => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
));

// Features component props
interface FeaturesProps {
  className?: string;
}

// Features data - moved outside component to prevent re-creation
const features = [
  {
    title: 'Win 85% More Projects',
    description: 'AI-generated proposals that consistently win clients and increase your revenue.',
    icon: <BrainIcon />,
    color: 'from-indigo-500 to-purple-600',
    bgColor: 'bg-indigo-500/10 dark:bg-indigo-500/20',
    borderColor: 'border-indigo-500/20 dark:border-indigo-500/30'
  },
  {
    title: 'Save 10 Hours Per Week',
    description: 'Create professional proposals in 60 seconds instead of spending hours writing them manually.',
    icon: <DocumentIcon />,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-500/10 dark:bg-blue-500/20',
    borderColor: 'border-blue-500/20 dark:border-blue-500/30'
  },
  {
    title: 'Look Like a Pro',
    description: 'Industry-tested templates that make you stand out from competitors and justify higher rates.',
    icon: <PaletteIcon />,
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-500/10 dark:bg-purple-500/20',
    borderColor: 'border-purple-500/20 dark:border-purple-500/30'
  },
  {
    title: 'Close Deals Faster',
    description: 'Impress clients instantly and get project approvals 3x faster with compelling proposals.',
    icon: <ShareIcon />,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    borderColor: 'border-emerald-500/20 dark:border-emerald-500/30'
  }
];

const Features: React.FC<FeaturesProps> = ({ className = '' }) => {
  const { theme } = useTheme();

  return (
    <section className={`py-20 lg:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Transform Your Freelance Business
          </h2>
          <p className={`text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-medium ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Stop wasting time on proposals. Start winning more clients and growing your income.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl border backdrop-blur-sm transition-all duration-500 hover:shadow-2xl hover:scale-105 hover:-translate-y-1 ${
                theme === 'dark' 
                  ? 'bg-slate-800/60 border-slate-700/40 hover:bg-slate-800/80 hover:border-slate-600/50' 
                  : 'bg-white/90 border-gray-200/60 hover:bg-white/95 hover:border-gray-300/80'
                }`}
            >
              {/* Branded background overlay */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Icon Container with enhanced styling */}
              <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-r ${feature.color} mb-4 sm:mb-6 lg:mb-8 shadow-xl group-hover:shadow-2xl transition-all duration-500 relative overflow-hidden group-hover:scale-110`}>
                <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-all duration-500" />
                <div className="relative text-white transition-transform duration-500 group-hover:scale-110">
                  {feature.icon}
                </div>
              </div>
              
              {/* Content with improved typography */}
              <h3 className={`text-xl sm:text-2xl font-black mb-3 sm:mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {feature.title}
              </h3>
              <p className={`text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {feature.description}
              </p>
              
              {/* Premium hover effects */}
              <div className={`absolute inset-0 rounded-3xl ${feature.bgColor} ${feature.borderColor} border opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-8 blur-2xl transition-opacity duration-500 -z-20`} />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
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
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
