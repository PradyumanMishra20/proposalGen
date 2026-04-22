import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { GeneratedProposal } from '../../services/aiProposalService';
import { Download, Share2, Copy, Check, X } from 'lucide-react';

interface ProposalDisplayProps {
  proposal: GeneratedProposal;
  onClose?: () => void;
  isLoading?: boolean;
}

const ProposalDisplay: React.FC<ProposalDisplayProps> = ({ 
  proposal, 
  onClose, 
  isLoading = false 
}) => {
  const { theme } = useTheme();
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>(proposal.sections[0]?.id || '');

  // Memoize expensive operations
  const fullProposalText = useMemo(() => 
    proposal.sections
      .map(section => `${section.title}\n\n${section.content}`)
      .join('\n\n---\n\n'),
    [proposal.sections]
  );

  const downloadFileName = useMemo(() => 
    `${proposal.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.txt`,
    [proposal.title]
  );

  const handleCopySection = useCallback(async (sectionId: string, content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedSection(sectionId);
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (error) {
      console.error('Failed to copy section:', error);
    }
  }, []);

  const handleCopyAll = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(fullProposalText);
      setCopiedSection('all');
      setTimeout(() => setCopiedSection(null), 2000);
    } catch (error) {
      console.error('Failed to copy proposal:', error);
    }
  }, [fullProposalText]);

  const handleDownload = useCallback(() => {
    const blob = new Blob([fullProposalText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = downloadFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [fullProposalText, downloadFileName]);

  if (isLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-8 ${
        theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'
      }`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`max-w-2xl w-full p-8 rounded-3xl border backdrop-blur-sm ${
            theme === 'dark' 
              ? 'bg-slate-800/60 border-slate-700/40' 
              : 'bg-white/90 border-gray-200/60'
          }`}
        >
          <div className="text-center space-y-6">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
              <motion.div
                className="w-8 h-8 bg-white rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
            <div>
              <h3 className={`text-2xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Generating Your Proposal
              </h3>
              <p className={`${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Our AI is crafting a professional proposal tailored to your needs...
              </p>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 8, ease: "easeInOut" }}
                />
              </div>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                This usually takes 10-15 seconds
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${
      theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`sticky top-0 z-10 backdrop-blur-xl border-b ${
        theme === 'dark' 
          ? 'bg-slate-900/90 border-slate-800' 
          : 'bg-white/90 border-gray-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className={`text-lg sm:text-xl md:text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {proposal.title}
              </h1>
              <div className={`flex flex-wrap items-center gap-2 sm:gap-4 mt-1 text-xs sm:text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                <span>Generated {proposal.generatedAt.toLocaleDateString()}</span>
                <span className="hidden sm:inline">·</span>
                <span>{proposal.metadata.wordCount} words</span>
                <span className="hidden sm:inline">·</span>
                <span>{proposal.metadata.estimatedReadTime} min read</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyAll}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'hover:bg-slate-800 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                title="Copy entire proposal"
              >
                {copiedSection === 'all' ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <Copy className="w-5 h-5" />
                )}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'hover:bg-slate-800 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                title="Download proposal"
              >
                <Download className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.open(`mailto:?subject=${encodeURIComponent(proposal.title)}&body=${encodeURIComponent(`Check out this proposal: ${window.location.href}`)}`)}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'hover:bg-slate-800 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                title="Share proposal"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
              
              {onClose && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark' 
                      ? 'hover:bg-slate-800 text-gray-300' 
                      : 'hover:bg-gray-100 text-gray-600'
                  }`}
                  title="Close proposal"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className={`sticky top-16 sm:top-20 z-10 backdrop-blur-xl border-b ${
        theme === 'dark' 
          ? 'bg-slate-900/90 border-slate-800' 
          : 'bg-white/90 border-gray-200'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
          <div className="flex gap-2 overflow-x-auto">
            {proposal.sections.map((section) => (
              <motion.button
                key={section.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSection(section.id)}
                className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap min-h-[2.5rem] sm:min-h-[2.75rem] ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                    : theme === 'dark'
                    ? 'bg-slate-800 text-gray-300 hover:bg-slate-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {section.title}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {proposal.sections
            .filter(section => section.id === activeSection)
            .map((section) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`p-6 sm:p-8 rounded-2xl sm:rounded-3xl border backdrop-blur-sm ${
                  theme === 'dark' 
                    ? 'bg-slate-800/60 border-slate-700/40' 
                    : 'bg-white/90 border-gray-200/60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                  <h2 className={`text-2xl sm:text-3xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {section.title}
                  </h2>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCopySection(section.id, `${section.title}\n\n${section.content}`)}
                    className={`p-2 rounded-lg transition-colors ${
                      theme === 'dark' 
                        ? 'hover:bg-slate-700 text-gray-300' 
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                    title="Copy section"
                  >
                    {copiedSection === section.id ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </motion.button>
                </div>
                
                <div className={`prose prose-base sm:prose-lg max-w-none ${
                  theme === 'dark' ? 'prose-invert' : ''
                }`}>
                  {section.content.split('\n').map((paragraph, index) => (
                    <p key={index} className={`mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base ${
                      theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                    }`}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProposalDisplay;
