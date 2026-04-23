import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FileText, Zap, Star, Users, TrendingUp } from 'lucide-react';

interface Template {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  gradient: string;
  popular?: boolean;
}

const Templates: React.FC = () => {
  const navigate = useNavigate();
  const templates: Template[] = [
    {
      title: 'Professional Services',
      description: 'Perfect for corporate clients and established businesses',
      features: ['Clean Design', 'Professional Tone', 'Data-Driven'],
      icon: <FileText className="w-8 h-8 text-blue-400" />,
      gradient: 'from-blue-600 to-purple-600'
    },
    {
      title: 'Startup Pitch',
      description: 'Ideal for early-stage startups and innovation projects',
      features: ['Growth Focused', 'Modern Style', 'Conversion Optimized'],
      icon: <Zap className="w-8 h-8 text-green-400" />,
      gradient: 'from-green-600 to-teal-600',
      popular: true
    },
    {
      title: 'Freelancer Special',
      description: 'Designed for independent professionals and consultants',
      features: ['Personal Touch', 'Flexible', 'Quick Turnaround'],
      icon: <Users className="w-8 h-8 text-purple-400" />,
      gradient: 'from-purple-600 to-pink-600'
    },
    {
      title: 'Technical Solution',
      description: 'For complex projects requiring technical expertise',
      features: ['Technical Details', 'Implementation Plan', 'Risk Assessment'],
      icon: <TrendingUp className="w-8 h-8 text-orange-400" />,
      gradient: 'from-orange-600 to-red-600'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Professional Proposal Templates
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-none sm:max-w-3xl mx-auto">
              Choose from our carefully crafted templates designed for different industries and use cases. Each template is optimized for conversion and professionalism.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={template.title}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Popular Badge */}
              {template.popular && (
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                    <Star className="w-3 h-3 text-white fill-white" />
                    <span className="text-xs font-medium text-white">Popular</span>
                  </div>
                </div>
              )}

              <div className={`
                relative p-6 sm:p-8 rounded-2xl border-2 transition-all duration-300
                ${template.popular 
                  ? 'border-indigo-500 bg-gradient-to-br from-indigo-600/10 to-purple-600/10' 
                  : 'border-slate-700 bg-slate-800/50'
                }
                hover:border-indigo-400 hover:shadow-2xl hover:shadow-indigo-500/20
              `}>
                {/* Icon */}
                <div className={`
                  w-16 h-16 rounded-xl flex items-center justify-center mb-6
                  bg-gradient-to-r ${template.gradient}
                `}>
                  {template.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3">
                  {template.title}
                </h3>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {template.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {template.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                      <span className="text-sm text-gray-400">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <motion.button
                  onClick={() => {
                    // Navigate to the proposal generator with this template
                    navigate('/?template=' + encodeURIComponent(template.title.toLowerCase().replace(/\s+/g, '-')));
                  }}
                  className={`
                    w-full py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base min-h-[2.75rem] sm:min-h-[3rem]
                    ${template.popular
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600 hover:text-white'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Use This Template
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            Why Choose Our Templates?
          </h2>
          <p className="text-gray-300 max-w-none sm:max-w-2xl mx-auto text-sm sm:text-base">
            Our templates are designed by industry experts and optimized for maximum conversion rates.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: 'Conversion Optimized',
              description: 'Each template is tested and optimized to maximize your chances of winning the project.',
              icon: <TrendingUp className="w-6 h-6" />
            },
            {
              title: 'Industry Specific',
              description: 'Tailored content and structure for different industries and project types.',
              icon: <FileText className="w-6 h-6" />
            },
            {
              title: 'Easy to Customize',
              description: 'Flexible templates that can be easily customized to match your brand and style.',
              icon: <Zap className="w-6 h-6" />
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="text-indigo-400">{feature.icon}</div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Create Your Proposal?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Start with our templates and let AI help you create the perfect proposal in minutes.
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Templates;
