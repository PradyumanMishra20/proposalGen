import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Lightbulb, Target, CheckCircle, ArrowRight } from 'lucide-react';

interface GuideSection {
  title: string;
  icon: React.ReactNode;
  steps: string[];
}

interface Tip {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const Guide: React.FC = () => {
  const sections: GuideSection[] = [
    {
      title: 'Getting Started',
      icon: <BookOpen className="w-8 h-8 text-blue-400" />,
      steps: [
        'Create your account and set up your profile',
        'Choose your role and experience level',
        'Select a template or generate custom proposals',
        'Customize with client information and project details'
      ]
    },
    {
      title: 'Writing Tips',
      icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
      steps: [
        'Focus on client needs, not just your skills',
        'Use specific examples and measurable outcomes',
        'Keep proposals concise (4-6 lines maximum)',
        'Include clear call-to-action and next steps'
      ]
    },
    {
      title: 'Best Practices',
      icon: <Target className="w-8 h-8 text-green-400" />,
      steps: [
        'Research your client and their industry',
        'Personalize each proposal for the specific project',
        'Highlight your unique value proposition',
        'Proofread carefully for grammar and spelling'
      ]
    }
  ];

  const tips: Tip[] = [
    {
      title: 'Be Specific',
      description: 'Instead of saying "experienced developer", say "5+ years building scalable web applications for Fortune 500 companies"',
      icon: <CheckCircle className="w-6 h-6 text-green-400" />
    },
    {
      title: 'Focus on Benefits',
      description: 'Explain how your skills will solve their problems and deliver value to their business',
      icon: <CheckCircle className="w-6 h-6 text-green-400" />
    },
    {
      title: 'Use Social Proof',
      description: 'Mention relevant past work, client testimonials, or certifications that build credibility',
      icon: <CheckCircle className="w-6 h-6 text-green-400" />
    },
    {
      title: 'Clear Pricing',
      description: 'Be transparent about your rates and what\'s included to avoid misunderstandings',
      icon: <CheckCircle className="w-6 h-6 text-green-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Proposal Writing Guide
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Master the art of writing compelling proposals that win clients and grow your business.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Guide Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 hover:border-indigo-500 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center mb-4">
                {section.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {section.title}
              </h3>
              <div className="space-y-3">
                {section.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs text-white font-bold">{stepIndex + 1}</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Pro Tips for Winning Proposals
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            These insider tips will help you stand out from the competition and win more projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.title}
              className="flex gap-4 p-6 bg-slate-800/30 rounded-xl border border-slate-700 hover:border-indigo-500 transition-all duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <div className="flex-shrink-0">
                {tip.icon}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {tip.title}
                </h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Template Examples */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Proposal Examples
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            See real examples of successful proposals across different industries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: 'Web Development Proposal',
              industry: 'Technology',
              preview: 'I\'m a full-stack developer with 5+ years of experience building scalable web applications for startups and enterprises. For your e-commerce platform, I\'ll implement a modern tech stack using React and Node.js...',
              success: '92% acceptance rate'
            },
            {
              title: 'Marketing Campaign Proposal',
              industry: 'Marketing',
              preview: 'As a digital marketing specialist, I\'ve helped 50+ businesses increase their online presence by an average of 300%. For your brand launch, I\'ll create a comprehensive 3-month campaign...',
              success: '88% acceptance rate'
            }
          ].map((example, index) => (
            <motion.div
              key={example.title}
              className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 hover:border-indigo-500 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  {example.title}
                </h3>
                <span className="px-3 py-1 bg-green-600/20 text-green-400 text-xs font-medium rounded-full">
                  {example.success}
                </span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-slate-700 text-gray-300 text-xs font-medium rounded">
                  {example.industry}
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                {example.preview}
              </p>
              <motion.button
                onClick={() => console.log(`Viewing example: ${example.title}`)}
                className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Full Example
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Write Your First Proposal?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Use our AI-powered proposal generator to create compelling proposals in minutes, not hours.
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Writing Proposals
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Guide;
