import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProposalStore } from '../../store/proposalStore';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../ui/Button';
import { 
  Copy, 
  Download, 
  FileText, 
  Share2, 
  X, 
  Check, 
  Loader2,
  AlertCircle
} from 'lucide-react';

interface OutputSectionProps {
  className?: string;
}

const OutputSection: React.FC<OutputSectionProps> = ({ className = '' }) => {
  // Get state and actions from Zustand store
  const {
    showOutput,
    generatedProposal,
    isRegenerating,
    isMakingShorter,
    isMakingStronger,
    clearOutput,
    copyToClipboard,
    regenerateProposal,
    makeProposalShorter,
    makeProposalStronger,
    downloadAsTxt,
    generateShareLink
  } = useProposalStore();

  // Get theme from context
  const { theme } = useTheme();

  // Local state for UI interactions
  const [isCopied, setIsCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // Handle copy to clipboard
  const handleCopy = async (): Promise<void> => {
    if (!generatedProposal) return;
    
    try {
      await copyToClipboard();
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Handle download
  const handleDownload = (): void => {
    if (!generatedProposal) return;
    downloadAsTxt();
  };

  // Handle share
  const handleShare = async (): Promise<void> => {
    if (!generatedProposal) return;
    
    setIsSharing(true);
    try {
      await generateShareLink();
    } catch (error) {
      console.error('Failed to share:', error);
    } finally {
      setIsSharing(false);
    }
  };

  // Handle close
  const handleClose = (): void => {
    clearOutput();
  };

  if (!showOutput || !generatedProposal) {
    return null;
  }

  return (
    <AnimatePresence>
      {showOutput && (
        <motion.div
          className={`fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${
            theme === 'dark' ? 'bg-slate-900/80' : 'bg-gray-900/60'
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className={`relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border ${
              theme === 'dark' ? 'border-slate-700/50 shadow-slate-900/20' : 'border-gray-200/50 shadow-gray-900/10'
            }`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-8 pb-6 border-b border-opacity-20 ${
              theme === 'dark' ? 'border-slate-700/50 bg-slate-900/30' : 'border-gray-200/50 bg-gray-50/50'
            }`}>
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <FileText className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h2 className={`text-2xl font-bold mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Your Proposal is Ready!
                  </h2>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                  }`}>
                    Professional proposal generated with AI assistance
                  </p>
                </div>
              </div>
              <motion.button
                onClick={handleClose}
                className={`p-3 rounded-xl transition-all duration-200 ${
                  theme === 'dark' 
                    ? 'hover:bg-slate-700/50 text-slate-400 hover:text-white'
                    : 'hover:bg-gray-200/50 text-gray-600 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8">
              {isRegenerating || isMakingShorter || isMakingStronger ? (
                <motion.div 
                  className="flex flex-col items-center justify-center py-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="relative">
                    <Loader2 className={`w-10 h-10 animate-spin ${
                      theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                    }`} />
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-indigo-200"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div className="mt-6 text-center">
                    <p className={`text-lg font-medium mb-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {isRegenerating ? 'Regenerating your proposal...' : 
                       isMakingShorter ? 'Making your proposal more concise...' : 
                       'Making your proposal more compelling...'}
                    </p>
                    <p className={`text-sm ${
                      theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                    }`}>
                      This usually takes just a few seconds
                    </p>
                  </div>
                </motion.div>
              ) : generatedProposal ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={`prose prose-lg max-w-none leading-relaxed ${
                    theme === 'dark' 
                      ? 'prose-invert prose-slate'
                      : 'prose-gray'
                  }`}>
                    <div dangerouslySetInnerHTML={{ 
                      __html: generatedProposal.content.replace(/\n/g, '<br />') 
                    }} />
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16">
                  <AlertCircle className={`w-16 h-16 mb-6 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-gray-400'
                  }`} />
                  <p className={`text-lg text-center ${
                    theme === 'dark' ? 'text-slate-300' : 'text-gray-700'
                  }`}>
                    No proposal available
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className={`p-8 pt-6 border-t border-opacity-20 ${
              theme === 'dark' ? 'border-slate-700/50 bg-slate-900/30' : 'border-gray-200/50 bg-gray-50/50'
            }`}>
              {/* Primary Actions */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleCopy}
                    variant={isCopied ? 'success' : 'primary'}
                    size="lg"
                    loading={isCopied}
                    className="flex items-center gap-3 px-6"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-5 h-5" />
                        Copied to Clipboard!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5" />
                        Copy Proposal
                      </>
                    )}
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleDownload}
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-3 px-6"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="lg"
                    loading={isSharing}
                    className="flex items-center gap-3 px-6"
                  >
                    <Share2 className="w-5 h-5" />
                    {isSharing ? 'Sharing...' : 'Share Link'}
                  </Button>
                </motion.div>
              </div>
              
              {/* Secondary Actions */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  theme === 'dark' ? 'bg-slate-700/50 text-slate-300' : 'bg-gray-200/50 text-gray-700'
                }`}>
                  Refine your proposal:
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={makeProposalShorter}
                    variant="ghost"
                    size="sm"
                    loading={isMakingShorter}
                    className="flex items-center gap-2"
                  >
                    Make Shorter
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={makeProposalStronger}
                    variant="ghost"
                    size="sm"
                    loading={isMakingStronger}
                    className="flex items-center gap-2"
                  >
                    Make Stronger
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    onClick={regenerateProposal}
                    variant="ghost"
                    size="sm"
                    loading={isRegenerating}
                    className="flex items-center gap-2"
                  >
                    Regenerate
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OutputSection;
