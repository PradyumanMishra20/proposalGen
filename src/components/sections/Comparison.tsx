import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Check, X, Zap } from 'lucide-react';

// Comparison component props
interface ComparisonProps {
  className?: string;
}

const Comparison: React.FC<ComparisonProps> = ({ className = '' }) => {
  const { theme } = useTheme();

  const features = [
    {
      feature: 'AI-Powered Generation',
      proposalGen: true,
      chatgpt: true,
      manual: false,
      description: 'Smart content generation based on your needs'
    },
    {
      feature: 'Professional Templates',
      proposalGen: true,
      chatgpt: false,
      manual: true,
      description: 'Industry-tested templates for different project types'
    },
    {
      feature: 'Instant Results',
      proposalGen: true,
      chatgpt: true,
      manual: false,
      description: 'Generate complete proposals in seconds, not hours'
    },
    {
      feature: 'Custom Branding',
      proposalGen: true,
      chatgpt: false,
      manual: true,
      description: 'Add your logo, colors, and personal touch'
    },
    {
      feature: 'Client-Specific Content',
      proposalGen: true,
      chatgpt: true,
      manual: true,
      description: 'Tailored content for each specific client'
    },
    {
      feature: 'Export to PDF/Word',
      proposalGen: true,
      chatgpt: false,
      manual: true,
      description: 'Professional export formats for sharing'
    },
    {
      feature: 'Time Required',
      proposalGen: '2 minutes',
      chatgpt: '15 minutes',
      manual: '2+ hours',
      description: 'Average time to create a complete proposal'
    },
    {
      feature: 'Success Rate',
      proposalGen: '80%',
      chatgpt: '60%',
      manual: '45%',
      description: 'Average proposal acceptance rate'
    }
  ];

  return (
    <section className={`py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Why Choose ProposalGen?
          </h2>
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            See how we compare to other proposal creation methods
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`overflow-hidden rounded-2xl border backdrop-blur-sm ${
            theme === 'dark' 
              ? 'bg-slate-800/60 border-slate-700/40' 
              : 'bg-white/90 border-gray-200/60'
          }`}
        >
          {/* Table Header */}
          <div className={`grid grid-cols-4 p-6 border-b ${
            theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
          }`}>
            <div className={`text-sm font-semibold ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Feature
            </div>
            <div className="text-center">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-bold`}>
                <Zap className="w-4 h-4" />
                ProposalGen
              </div>
            </div>
            <div className="text-center">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${
                theme === 'dark' ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-gray-700'
              } text-sm font-semibold`}>
                ChatGPT
              </div>
            </div>
            <div className="text-center">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${
                theme === 'dark' ? 'bg-slate-700 text-gray-300' : 'bg-gray-100 text-gray-700'
              } text-sm font-semibold`}>
                Manual
              </div>
            </div>
          </div>

          {/* Table Rows */}
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.05 }}
              className={`grid grid-cols-4 p-6 border-b last:border-b-0 ${
                theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
              } hover:${theme === 'dark' ? 'bg-slate-700/30' : 'bg-gray-50/50'} transition-colors duration-200`}
            >
              {/* Feature Name */}
              <div>
                <div className={`font-semibold mb-1 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.feature}
                </div>
                <div className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {feature.description}
                </div>
              </div>

              {/* ProposalGen Column */}
              <div className="flex items-center justify-center">
                {typeof feature.proposalGen === 'boolean' ? (
                  feature.proposalGen ? (
                    <div className="flex items-center gap-1 text-green-400">
                      <Check className="w-5 h-5" />
                      <span className="text-sm font-medium">Yes</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-red-400">
                      <X className="w-5 h-5" />
                      <span className="text-sm font-medium">No</span>
                    </div>
                  )
                ) : (
                  <div className={`text-sm font-bold ${
                    theme === 'dark' ? 'text-green-400' : 'text-green-600'
                  }`}>
                    {feature.proposalGen}
                  </div>
                )}
              </div>

              {/* ChatGPT Column */}
              <div className="flex items-center justify-center">
                {typeof feature.chatgpt === 'boolean' ? (
                  feature.chatgpt ? (
                    <div className="flex items-center gap-1 text-green-400">
                      <Check className="w-5 h-5" />
                      <span className="text-sm font-medium">Yes</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-red-400">
                      <X className="w-5 h-5" />
                      <span className="text-sm font-medium">No</span>
                    </div>
                  )
                ) : (
                  <div className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-yellow-400' : 'text-yellow-600'
                  }`}>
                    {feature.chatgpt}
                  </div>
                )}
              </div>

              {/* Manual Column */}
              <div className="flex items-center justify-center">
                {typeof feature.manual === 'boolean' ? (
                  feature.manual ? (
                    <div className="flex items-center gap-1 text-green-400">
                      <Check className="w-5 h-5" />
                      <span className="text-sm font-medium">Yes</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-red-400">
                      <X className="w-5 h-5" />
                      <span className="text-sm font-medium">No</span>
                    </div>
                  )
                ) : (
                  <div className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-red-400' : 'text-red-600'
                  }`}>
                    {feature.manual}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <div className={`inline-flex items-center gap-4 p-6 rounded-2xl border backdrop-blur-sm ${
            theme === 'dark' 
              ? 'bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-indigo-500/30' 
              : 'bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200'
          }`}>
            <div className="text-left">
              <h4 className={`text-lg font-bold mb-1 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Save 2+ hours per proposal
              </h4>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Start generating professional proposals in minutes
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              Try It Free
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Comparison;
