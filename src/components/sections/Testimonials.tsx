import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

// Star rating component
const StarRating = () => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

// Testimonials component props
interface TestimonialsProps {
  className?: string;
}

const Testimonials: React.FC<TestimonialsProps> = ({ className = '' }) => {
  const { theme } = useTheme();

  const testimonials = [
    {
      name: 'Anonymous',
      role: 'Freelance Developer',
      content: 'ProposalGen has saved me hours of work. The AI-generated proposals are professional and help me win more clients.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 5
    },
    {
      name: 'Anonymous',
      role: 'Marketing Consultant',
      content: 'The quality of proposals is impressive. My clients love the professional format and clear messaging.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 5
    },
    {
      name: 'Anonymous',
      role: 'UI/UX Designer',
      content: 'Simple to use and delivers great results. I can now focus on my work instead of writing proposals.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      rating: 5
    }
  ];

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
            What Our Users Say
          </h2>
          <p className={`text-xl md:text-2xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join thousands of satisfied freelancers
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
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
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
              
              {/* Rating with enhanced styling */}
              <div className="mb-8">
                <StarRating />
              </div>
              
              {/* Content with improved typography */}
              <blockquote className={`text-lg leading-relaxed mb-8 font-medium ${
                theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
              }`}>
                "{testimonial.content}"
              </blockquote>
              
              {/* Profile with enhanced styling */}
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-3 border-white/20 shadow-lg shadow-indigo-500/20"
                  />
                  {/* Professional status indicator */}
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-3 border-white dark:border-slate-800 shadow-lg shadow-green-500/25"></div>
                  {/* Subtle glow effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-md -z-10"></div>
                </div>
                <div className="ml-5">
                  <h4 className={`font-bold text-lg mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {testimonial.name}
                  </h4>
                  <p className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                  }`}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
              
              {/* Premium hover effects */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/8 via-purple-500/8 to-pink-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-5 blur-2xl transition-opacity duration-500 -z-20" />
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 text-center`}>
            <div className={`p-6 rounded-2xl ${
              theme === 'dark'
                ? 'bg-slate-800/50 border-slate-700/50'
                : 'bg-white/80 border-gray-200/50'
            } border backdrop-blur-sm`}>
              <div className={`text-3xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                200+
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Active Users
              </div>
            </div>
            <div className={`p-6 rounded-2xl ${
              theme === 'dark'
                ? 'bg-slate-800/50 border-slate-700/50'
                : 'bg-white/80 border-gray-200/50'
            } border backdrop-blur-sm`}>
              <div className={`text-3xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                80%
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Success Rate
              </div>
            </div>
            <div className={`p-6 rounded-2xl ${
              theme === 'dark'
                ? 'bg-slate-800/50 border-slate-700/50'
                : 'bg-white/80 border-gray-200/50'
            } border backdrop-blur-sm`}>
              <div className={`text-3xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                100+
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Proposals Created
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
