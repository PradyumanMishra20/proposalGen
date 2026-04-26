import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Users, Star, TrendingUp, FileText, CheckCircle, ArrowRight } from 'lucide-react';

// Static dummy testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Freelance Designer",
    company: "Design Studio",
    content: "ProposalGen has completely transformed how I approach client work. What used to take hours now takes minutes, and the quality is consistently professional.",
    rating: 5,
    avatar: null as string | null
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Marketing Consultant",
    company: "Growth Partners",
    content: "I've tried many proposal tools, but ProposalGen's AI-powered suggestions are unmatched. My win rate has increased by 40% since using it.",
    rating: 5,
    avatar: null as string | null
  },
  {
    id: 3,
    name: "Emily Thompson",
    role: "Web Developer",
    company: "Tech Solutions",
    content: "The time savings alone make this worth every penny. I can focus on delivering great work instead of spending hours writing proposals.",
    rating: 5,
    avatar: null as string | null
  }
];

// Sample proposal preview data
const sampleProposal = {
  title: "E-commerce Website Development Proposal",
  client: "Fashion Brand Inc.",
  sections: [
    "Executive Summary",
    "Project Scope & Deliverables", 
    "Timeline & Milestones",
    "Investment & Pricing"
  ],
  preview: "We propose a comprehensive e-commerce solution that will transform your online presence and drive significant revenue growth..."
};

const TrustSection: React.FC = () => {
  const { theme } = useTheme();

  const containerClasses = `
    py-20 lg:py-24
    ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'}
  `;

  const cardClasses = `
    p-6 sm:p-8 rounded-2xl border backdrop-blur-sm
    ${theme === 'dark' 
      ? 'bg-slate-800/60 border-slate-700/40 hover:bg-slate-800/80' 
      : 'bg-white border-gray-200/60 hover:bg-gray-50/80'
    }
    transition-all duration-300
  `;

  const headingClasses = `
    text-3xl sm:text-4xl lg:text-5xl font-bold font-primary text-center mb-4
    ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
  `;

  const subheadingClasses = `
    text-lg sm:text-xl text-center max-w-3xl mx-auto mb-16
    ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
  `;

  return (
    <section className={containerClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Avatars Row */}
          <div className="flex justify-center items-center gap-3 mb-8">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-3 border-white dark:border-slate-900 shadow-lg" />
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 border-3 border-white dark:border-slate-900 shadow-lg" />
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 border-3 border-white dark:border-slate-900 shadow-lg" />
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 border-3 border-white dark:border-slate-900 shadow-lg" />
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 border-3 border-white dark:border-slate-900 shadow-lg" />
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 border-3 border-white dark:border-slate-900 shadow-lg" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-green-500">Active now</span>
            </div>
          </div>
          
          <h2 className={`text-4xl sm:text-5xl md:text-6xl font-black mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">10,000+</span> Happy Users
          </h2>
          <p className={`text-xl sm:text-2xl font-medium mb-6 ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}>
            Trusted by freelancers, agencies, and professionals worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>85% Win Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>2,500+ Reviews</span>
            </div>
          </div>
        </motion.div>

        
        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className={`text-3xl sm:text-4xl md:text-5xl font-black text-center mb-4 font-primary ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Loved by Thousands
          </h3>
          <p className={`text-lg sm:text-xl text-center mb-12 max-w-3xl mx-auto font-medium ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
          }`}>
            See what professionals are saying about ProposalGen
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className={`p-6 sm:p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 ${
                  theme === 'dark' 
                    ? 'bg-slate-800/60 border-slate-700/40 hover:bg-slate-800/80 hover:border-slate-600/50' 
                    : 'bg-white border-gray-200/60 hover:bg-gray-50/80 hover:border-gray-300/80'
                }`}
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 fill-current ${
                        theme === 'dark' ? 'text-warning-400' : 'text-warning-500'
                      }`}
                    />
                  ))}
                </div>

                {/* Content */}
                <p className={`mb-6 leading-relaxed ${
                  theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                }`}>
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    theme === 'dark' ? 'bg-primary-900/30 text-primary-400' : 'bg-primary-100 text-primary-600'
                  }`}>
                    <span className="text-lg font-semibold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {testimonial.name}
                    </h4>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Sample Proposal Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className={`text-center mb-12`}>
            <h3 className={`text-2xl sm:text-3xl font-bold font-primary mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              See What You Can Create
            </h3>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              Professional proposals in seconds, not hours
            </p>
          </div>

          <div className={`max-w-4xl mx-auto ${cardClasses}`}>
            {/* Proposal Header */}
            <div className={`border-b pb-6 mb-6 ${
              theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <h4 className={`text-xl font-bold font-primary mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {sampleProposal.title}
                  </h4>
                  <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Client: {sampleProposal.client}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  theme === 'dark' ? 'bg-primary-900/30 text-primary-300' : 'bg-primary-100 text-primary-700'
                }`}>
                  Sample Proposal
                </div>
              </div>
            </div>

            {/* Proposal Sections */}
            <div className="space-y-4 mb-6">
              {sampleProposal.sections.map((section, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className={`w-5 h-5 ${
                    theme === 'dark' ? 'text-success-400' : 'text-success-600'
                  }`} />
                  <span className={`font-medium ${
                    theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
                  }`}>
                    {section}
                  </span>
                </div>
              ))}
            </div>

            {/* Preview Text */}
            <div className={`p-4 rounded-lg ${
              theme === 'dark' ? 'bg-slate-700/30' : 'bg-gray-50'
            }`}>
              <p className={`text-sm leading-relaxed ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {sampleProposal.preview}
              </p>
            </div>

            {/* CTA */}
            <div className="flex justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                  theme === 'dark'
                    ? 'bg-primary-600 hover:bg-primary-700 text-white'
                    : 'bg-primary-600 hover:bg-primary-700 text-white'
                }`}
              >
                Generate Your Proposal
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TrustSection;
