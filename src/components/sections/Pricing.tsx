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
      name: 'Free',
      price: '$0',
      description: 'Perfect for getting started',
      features: [
        '5 proposals per month',
        'Basic templates',
        'AI-powered generation',
        'Export to PDF',
        'Email support'
      ],
      highlighted: false,
      cta: 'Start Free'
    },
    {
      name: 'Professional',
      price: '$19',
      description: 'Best for serious freelancers',
      features: [
        'Unlimited proposals',
        'Premium templates',
        'Custom branding',
        'Priority support',
        'Advanced analytics',
        'Export to Word & PDF'
      ],
      highlighted: true,
      cta: 'Get Started'
    },
    {
      name: 'Agency',
      price: '$49',
      description: 'For teams and agencies',
      features: [
        'Everything in Professional',
        'Team collaboration',
        'Client management',
        'Custom templates',
        'API access',
        'Dedicated support'
      ],
      highlighted: false,
      cta: 'Contact Sales'
    }
  ];

  return (
    <section className={`py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Simple, Transparent Pricing
          </h2>
          <p className={`text-lg sm:text-xl mb-4 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Start free, no credit card required
          </p>
          <div className="flex items-center justify-center gap-4 mb-12">
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
              className={`p-8 rounded-2xl ${
                plan.highlighted
                  ? theme === 'dark'
                    ? 'bg-blue-900 border-blue-700 ring-2 ring-blue-500'
                    : 'bg-blue-50 border-blue-200 ring-2 ring-blue-500'
                  : theme === 'dark'
                    ? 'bg-slate-800 border-slate-700'
                    : 'bg-white border-gray-200'
              } border`}
            >
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
      </div>
    </section>
  );
};

export default Pricing;
