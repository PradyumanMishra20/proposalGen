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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-2xl opacity-5 animate-bounce"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent mb-4 sm:mb-6 leading-tight"
            >
              Create client-winning proposals in seconds
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-none sm:max-w-2xl"
            >
              Stop wasting hours writing proposals. Let AI generate clean, professional proposals tailored to your project.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={scrollToTool}
                className="relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-2xl hover:shadow-3xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 overflow-hidden group min-h-[3rem] sm:min-h-[3.5rem]"
              >
                <span className="relative z-10 text-sm sm:text-base">Generate Proposal</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/40 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={openExampleModal}
                className="relative px-5 sm:px-6 py-3 sm:py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-xl shadow-lg hover:shadow-xl hover:bg-white/20 transition-all duration-300 overflow-hidden group min-h-[3rem] sm:min-h-[3.5rem]"
              >
                <span className="relative z-10 text-sm sm:text-base">See Demo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-white/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
            </motion.div>
            
            {/* Social Proof */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 justify-center lg:justify-start"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-slate-900" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-teal-500 border-2 border-slate-900" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 border-2 border-slate-900" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 border-2 border-slate-900" />
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 border-2 border-slate-900 flex items-center justify-center">
                    <span className="text-xs font-bold text-white">+</span>
                  </div>
                </div>
                <div>
                  <div className="text-white font-semibold text-sm sm:text-base">100+ proposals created</div>
                  <div className="text-gray-400 text-xs sm:text-sm">by freelancers worldwide</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-gray-400 text-xs sm:text-sm">
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>80% success rate</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>4.5/5 rating</span>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Right: Premium Product Showcase */}
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
                  <div className="flex gap-2">
                    <div className="w-4 h-4 bg-gray-600/50 rounded"></div>
                    <div className="w-4 h-4 bg-gray-600/50 rounded"></div>
                  </div>
                </div>
              </div>
              
              {/* Product screenshot area */}
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 p-8">
                {/* Branded background with subtle pattern */}
                <div className="absolute inset-0 opacity-20">
                  <img
                    src={heroPageImage}
                    alt="ProposalGen interface showing AI-powered proposal generation workspace"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-slate-900/40"></div>
                </div>
                
                {/* MainTool mockup with premium styling */}
                <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-lg mx-auto border border-white/20">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                      <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/25"></div>
                      <div>
                        <div className="h-5 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg w-36"></div>
                        <div className="h-4 bg-gray-400 rounded w-28 mt-2"></div>
                      </div>
                    </div>
                    
                    {/* Form fields */}
                    <div className="space-y-4">
                      <div className="h-3 bg-gray-100 rounded-lg w-full border border-gray-200"></div>
                      <div className="h-3 bg-gray-100 rounded-lg w-4/5 border border-gray-200"></div>
                      <div className="h-20 bg-gray-50 rounded-lg border border-gray-200"></div>
                    </div>
                    
                    {/* CTA button with premium styling */}
                    <div className="pt-6">
                      <div className="h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg shadow-indigo-500/25"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Premium glow effect */}
            <div className="absolute -inset-6 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl -z-10"></div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-20 blur-xl"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20 blur-xl"
            />
          </motion.div>
        </div>
      </div>

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
    </section>
  );
};

export default Hero;
