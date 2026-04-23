import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import heroBackgroundImage from '../../assets/images/heroBackground.jpg';

const HeroImage: React.FC = () => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      {/* Browser Frame */}
      <div className="relative bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Browser Header */}
        <div className="bg-slate-800/50 px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500/80 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500/80 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500/80 rounded-full"></div>
            <div className="ml-4 text-xs text-slate-400">proposalgen.ai</div>
          </div>
        </div>
        
        {/* MainTool Screenshot Container */}
        <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 p-8">
          {/* Subtle workspace background */}
          <div className="absolute inset-0 opacity-10">
            <img
              src={heroBackgroundImage}
              alt="Professional workspace environment for proposal generation"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          
          {/* Your MainTool Component */}
          <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-6 max-w-md mx-auto">
            <div className="space-y-4">
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="h-3 bg-slate-200 rounded w-1/2"></div>
              <div className="h-8 bg-indigo-100 rounded-lg"></div>
              <div className="h-8 bg-slate-100 rounded-lg"></div>
              <div className="h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur-xl -z-10"></div>
    </motion.div>
  );
};

export default HeroImage;
