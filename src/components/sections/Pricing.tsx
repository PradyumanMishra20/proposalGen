import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

// Pricing component props
interface PricingProps {
  className?: string;
  scrollToTool: () => void;
  navigate: (path: string) => void;
}

const Pricing: React.FC<PricingProps> = ({ className = '', scrollToTool, navigate }) => {
  const { theme } = useTheme();

  const plans = [
    {
      name: 'Starter',
      price: '$0',
      description: 'Test your way to higher earnings',
      features: [
        '5 AI-powered proposals per month',
        'Win your first 2-3 clients',
        'See the 85% win rate in action',
        'Professional PDF exports',
        'Email support when you need help'
      ],
      highlighted: false,
      cta: 'Start Earning More'
    },
    {
      name: 'Professional',
      price: '$19',
      description: 'Earn $1,000+ more per month',
      features: [
        'Unlimited proposals = unlimited earnings',
        'Premium templates that justify higher rates',
        'Stand out with custom branding',
        'Get help when you need it most',
        'Track your proposal success rate',
        'Professional Word & PDF exports'
      ],
      highlighted: true,
      cta: 'Maximize Your Income'
    },
    {
      name: 'Agency',
      price: '$49',
      description: 'Scale your client acquisition',
      features: [
        'Everything in Professional',
        'Collaborate with your team seamlessly',
        'Impress clients with a professional portal',
        'Build your brand with white-label options',
        'Integrate with your existing tools',
        'Priority support for your growing business'
      ],
      highlighted: false,
      cta: 'Scale Your Agency'
    }
  ];

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
            Invest in Your Success
          </h2>
          <p className={`text-xl sm:text-2xl md:text-3xl leading-relaxed font-medium ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Start free and see how much more you can earn with better proposals
          </p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 text-green-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2 text-blue-400">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 .68-.056 1.349-.166 2.002A11.954 11.954 0 0110 18.056a11.954 11.954 0 01-7.834-4.053A11.931 11.931 0 012 7c0-.68.056-1.349.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">14-day free trial</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`p-8 rounded-2xl border transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl ${
                plan.highlighted
                  ? theme === 'dark'
                    ? 'bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border-indigo-500/50 shadow-2xl shadow-indigo-500/20 hover:border-indigo-400/60'
                    : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-500 shadow-xl shadow-indigo-500/20 hover:border-indigo-400 hover:shadow-2xl'
                  : theme === 'dark'
                    ? 'bg-slate-800/60 border-slate-700/40 hover:bg-slate-800/80 hover:border-slate-600/50'
                    : 'bg-white border-gray-200/60 hover:bg-gray-50/80 hover:border-gray-300/80'
              }`}>
              <div className="text-center">
                <h3 className={`text-2xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {plan.name}
                </h3>
                <div className={`text-4xl font-bold mb-4 ${
                  plan.highlighted
                    ? 'text-blue-400'
                    : theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {plan.price}
                  <span className={`text-lg font-normal ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    /month
                  </span>
                </div>
                <p className={`mb-6 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={`flex items-center ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button 
                  className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg'
                      : theme === 'dark'
                        ? 'bg-slate-700 hover:bg-slate-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (plan.name === 'Free') {
                      // Navigate to the tool for free plan
                      scrollToTool();
                    } else if (plan.name === 'Agency') {
                      // Contact sales for agency
                      window.location.href = 'mailto:sales@proposalgen.com?subject=Agency Plan Inquiry';
                    } else {
                      // Get started for professional
                      scrollToTool();
                    }
                  }}
                >
                  {plan.cta}
                </motion.button>
              </div>
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

export default Pricing;
