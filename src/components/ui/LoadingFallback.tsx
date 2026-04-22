import React from 'react';
import { motion } from 'framer-motion';
import Skeleton from './Skeleton';

type LoadingFallbackType = 'default' | 'page' | 'section' | 'component' | 'button' | 'text';

interface LoadingFallbackProps {
  type?: LoadingFallbackType;
  className?: string;
  children?: React.ReactNode;
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({ 
  type = 'default', 
  className = '',
  children 
}) => {
  const renderLoader = (): React.ReactNode => {
    switch (type) {
      case 'page':
        return (
          <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <motion.div
              className="text-center max-w-md w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-8">
                <Skeleton variant="circle" width={80} height={80} className="mx-auto" />
              </div>
              <Skeleton variant="text" lines={2} className="mb-4" />
              <div className="flex justify-center space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-indigo-600 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.2, duration: 0.3 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        );

      case 'section':
        return (
          <div className="p-8 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Skeleton variant="circle" width={48} height={48} />
                <div className="flex-1">
                  <Skeleton variant="text" lines={1} className="mb-2" />
                  <Skeleton variant="text" lines={1} width="60%" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Skeleton variant="text" lines={1} className="mb-4" />
                  <Skeleton variant="text" lines={3} />
                </div>
                <div>
                  <Skeleton variant="text" lines={1} className="mb-4" />
                  <Skeleton variant="text" lines={3} />
                </div>
              </div>
              
              <div className="flex justify-center">
                <Skeleton variant="button" width={200} height={48} className="rounded-lg" />
              </div>
            </div>
          </div>
        );

      case 'component':
        return (
          <div className="p-6 bg-slate-800 rounded-xl border border-slate-700">
            <div className="space-y-4">
              <Skeleton variant="text" lines={1} />
              <Skeleton variant="text" lines={2} />
              <Skeleton variant="card" height={100} className="rounded-lg" />
            </div>
          </div>
        );

      case 'button':
        return (
          <Skeleton variant="button" height={48} className="rounded-lg w-full" />
        );

      case 'text':
        return (
          <div className="space-y-2">
            <Skeleton variant="text" lines={1} />
            <Skeleton variant="text" lines={1} width="80%" />
            <Skeleton variant="text" lines={1} width="60%" />
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center p-8">
            <div className="flex space-x-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-indigo-600 rounded-full"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: i * 0.1,
                    duration: 0.3,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    repeatDelay: 0.5
                  }}
                />
              ))}
            </div>
          </div>
        );
    }
  };

  if (children) {
    return (
      <div className={`loading-fallback-wrapper ${className}`}>
        {children}
        <div className="loading-overlay absolute inset-0 bg-slate-900/80 flex items-center justify-center rounded-inherit">
          {renderLoader()}
        </div>
      </div>
    );
  }

  return (
    <div className={`loading-fallback ${className}`}>
      {renderLoader()}
    </div>
  );
};

export default LoadingFallback;
