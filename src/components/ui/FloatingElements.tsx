import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Zap, Star, Heart } from 'lucide-react';

// FloatingElements component for stunning visual effects
interface FloatingElementsProps {
  className?: string;
}

const FloatingElements: React.FC<FloatingElementsProps> = ({ className = '' }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none z-50 ${className}`}>
      {/* Floating sparkles */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0, 1, 0],
            scale: [0, 1, 0, 1, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-20 left-10"
        >
          <Sparkles className="w-6 h-6 text-purple-400" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0, 1, 0],
            scale: [0, 1, 0, 1, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-40 right-20"
        >
          <Zap className="w-6 h-6 text-yellow-400" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0, 1, 0],
            scale: [0, 1, 0, 1, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-32 left-32"
        >
          <Star className="w-6 h-6 text-pink-400" />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0, 1, 0],
            scale: [0, 1, 0, 1, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-20 right-32"
        >
          <Heart className="w-6 h-6 text-red-400" />
        </motion.div>
        
        {/* Mouse follower */}
        <motion.div
          className="fixed w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-sm opacity-60 pointer-events-none"
          animate={{
            x: mousePosition.x - 8,
            y: mousePosition.y - 8
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28
          }}
        />
      </AnimatePresence>
    </div>
  );
};

export default FloatingElements;
