import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

// GradientCard component props
interface GradientCardProps {
  children: React.ReactNode;
  className?: string;
  gradient?: string;
  hover?: boolean;
}

const GradientCard: React.FC<GradientCardProps> = ({ 
  children, 
  className = '', 
  gradient = 'from-purple-600 via-pink-500 to-orange-400',
  hover = true 
}) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { 
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(147, 51, 234, 0.1)'
      } : {}}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl ${gradient} p-1 ${className}`}
    >
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/40 opacity-0"></div>
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Animated border effects */}
      <div className="absolute inset-0 rounded-2xl border-2 border-white/20 pointer-events-none">
        <div className="absolute -top-px -left-px w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-pulse"></div>
        <div className="absolute -top-px -right-px w-full h-full bg-gradient-to-b from-transparent via-white to-transparent animate-pulse delay-75"></div>
        <div className="absolute -bottom-px -left-px w-full h-full bg-gradient-to-l from-transparent via-white to-transparent animate-pulse delay-150"></div>
        <div className="absolute -bottom-px -right-px w-full h-full bg-gradient-to-t from-transparent via-white to-transparent animate-pulse delay-225"></div>
        <div className="absolute -left-px -top-px w-full h-full bg-gradient-to-r from-transparent via-white to-transparent animate-pulse delay-300"></div>
        <div className="absolute -right-px -top-px w-full h-full bg-gradient-to-l from-transparent via-white to-transparent animate-pulse delay-375"></div>
      </div>
    </motion.div>
  );
};

export default GradientCard;
