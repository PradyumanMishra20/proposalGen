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
    title: 'AI-Powered Generation',
    description: 'Advanced AI algorithms create professional, customized proposals in seconds.',
    icon: <BrainIcon />,
    color: 'from-indigo-500 to-purple-600',
    bgColor: 'bg-indigo-500/10 dark:bg-indigo-500/20',
    borderColor: 'border-indigo-500/20 dark:border-indigo-500/30'
  },
  {
    title: 'Professional Templates',
    description: 'Industry-tested templates for various project types and industries.',
    icon: <DocumentIcon />,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-500/10 dark:bg-blue-500/20',
    borderColor: 'border-blue-500/20 dark:border-blue-500/30'
  },
  {
    title: 'Customizable Content',
    description: 'Tailor every aspect of your proposal to match your unique style.',
    icon: <PaletteIcon />,
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-500/10 dark:bg-purple-500/20',
    borderColor: 'border-purple-500/20 dark:border-purple-500/30'
  },
  {
    title: 'Export & Share',
    description: 'Multiple export formats and easy sharing options for seamless collaboration.',
    icon: <ShareIcon />,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    borderColor: 'border-emerald-500/20 dark:border-emerald-500/30'
  }
];

const Features: React.FC<FeaturesProps> = ({ className = '' }) => {
  const { theme } = useTheme();

  return (
    <section className={`py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Powerful Features
          </h2>
          <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Everything you need to create winning proposals
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group relative p-8 rounded-3xl border backdrop-blur-sm transition-all duration-500 hover:shadow-2xl ${
                theme === 'dark' 
                  ? 'bg-slate-800/60 border-slate-700/40 hover:bg-slate-800/80' 
                  : 'bg-white/90 border-gray-200/60 hover:bg-white/95'
              }`}
            >
              {/* Branded background overlay */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Icon Container with enhanced styling */}
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-r ${feature.color} mb-8 shadow-xl group-hover:shadow-2xl transition-all duration-500 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors duration-500" />
                <div className="relative text-white">
                  {feature.icon}
                </div>
              </div>
              
              {/* Content with improved typography */}
              <h3 className={`text-xl font-bold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {feature.title}
              </h3>
              <p className={`text-sm leading-relaxed ${
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className={`inline-flex items-center gap-6 px-8 py-4 rounded-2xl border ${
            theme === 'dark'
              ? 'bg-slate-800/50 border-slate-700/50 text-gray-300'
              : 'bg-white/80 border-gray-200/50 text-gray-700'
          } backdrop-blur-sm`}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">All features included</span>
            </div>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">No credit card required</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
