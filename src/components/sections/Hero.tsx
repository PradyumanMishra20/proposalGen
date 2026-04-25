import React from 'react';
import { motion } from 'framer-motion';
import { useGlobalModal, EnhancedGlobalModal } from '../ui/GlobalModal';
import heroPageImage from '../../assets/images/heropage.avif';

// Hero component props
interface HeroProps {
  scrollToTool: () => void;
  navigate: (path: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToTool, navigate }) => {
  const { isOpen: isGlobalModalOpen, closeModal: closeGlobalModal } = useGlobalModal();

  const openExampleModal = () => {
    // Navigate to templates page for examples
    navigate('/templates');
  };

  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      </div>
      
      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <section className="space-y-8 text-center lg:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-primary text-white leading-tight tracking-tight"
            >
              Stop Writing Proposals.
              <br />
              <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                Start Winning Clients.
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl font-primary text-neutral-300 max-w-2xl leading-relaxed"
            >
              Transform client requirements into persuasive proposals in under 60 seconds. 
              <span className="font-semibold text-white"> No more wasted hours.</span>
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToTool}
                className="relative px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold text-lg rounded-2xl shadow-primary hover:shadow-lg transition-all duration-250 overflow-hidden group font-primary"
              >
                <span className="relative z-10">Generate Proposal</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-250"></div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={openExampleModal}
                className="relative px-6 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/20 transition-all duration-250 font-semibold font-primary"
              >
                Peek Inside ✨
              </motion.button>
            </motion.div>
            
            {/* Trust Indicators */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-3 border-slate-900" />
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-teal-500 border-3 border-slate-900" />
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 border-3 border-slate-900" />
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 border-3 border-slate-900" />
                </div>
                <div>
                  <div className="text-white font-bold">500+ happy clients</div>
                  <div className="text-gray-400 text-sm">served by amazing freelancers</div>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-gray-400">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-white">85% win rate</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold text-white">4.8/5 rating</span>
                </div>
              </div>
            </motion.div>
          </section>
          
          {/* Right: Product Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Main product container */}
            <div className="relative bg-slate-900/50 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
              {/* Browser frame */}
              <div className="bg-slate-800/50 px-4 py-3 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500/80 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500/80 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500/80 rounded-full"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-xs text-gray-400 font-medium">proposalgen.ai</span>
                  </div>
                </div>
              </div>
              
              {/* Product screenshot area */}
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-8">
                {/* Branded background */}
                <div className="absolute inset-0 opacity-20">
                  <img
                    src={heroPageImage}
                    alt="ProposalGen AI interface generating professional business proposal"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-slate-900/40"></div>
                </div>
                
                {/* MainTool mockup */}
                <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 max-w-md mx-auto border border-white/20">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                      <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-lg"></div>
                      <div>
                        <div className="h-4 bg-gray-800 rounded w-32"></div>
                        <div className="h-3 bg-gray-400 rounded w-24 mt-1"></div>
                      </div>
                    </div>
                    
                    {/* Form fields */}
                    <div className="space-y-3">
                      <div className="h-2 bg-gray-100 rounded w-full border border-gray-200"></div>
                      <div className="h-2 bg-gray-100 rounded w-4/5 border border-gray-200"></div>
                      <div className="h-16 bg-gray-50 rounded border border-gray-200"></div>
                    </div>
                    
                    {/* CTA button */}
                    <div className="pt-4">
                      <div className="h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl -z-10"></div>
          </motion.div>
        </div>
      </main>

      {/* Global Modal */}
      <EnhancedGlobalModal
        isOpen={isGlobalModalOpen}
        onClose={closeGlobalModal}
        size="lg"
        title="AI Proposal Generator Demo"
        description="Experience the power of AI-driven proposal creation"
      >
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Features Implemented:
          </h3>
          <ul className="space-y-2 mb-6 text-gray-600 dark:text-gray-300">
            <li>AI-powered content generation</li>
            <li>Professional proposal templates</li>
            <li>Customizable branding</li>
            <li>Real-time preview</li>
            <li>Export to multiple formats</li>
          </ul>
          <div className="flex justify-end">
            <button
              onClick={closeGlobalModal}
              className="px-4 py-2 bg-gray-200 dark:bg-slate-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-slate-500 transition-colors"
            >
              Close Modal
            </button>
          </div>
        </div>
      </EnhancedGlobalModal>
    </header>
  );
};

export default Hero;
