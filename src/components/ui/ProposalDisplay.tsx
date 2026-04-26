import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { GeneratedProposal } from '../../services/aiProposalService';
import { Download, Share2, Copy, Check, X, FileText, Printer, Mail } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Type definitions for markdown components
interface MarkdownComponentProps {
  children?: React.ReactNode;
  inline?: boolean;
}

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

  // Memoize sections to prevent unnecessary re-renders
  const sections = useMemo(() => proposal.sections, [proposal.sections]);

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

  const handleDownloadText = useCallback(() => {
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

  const handleDownloadPDF = useCallback(() => {
    // Use hidden full-content container for complete PDF export
    const printContent = document.getElementById('proposal-print');
    if (printContent) {
      const originalContent = document.body.innerHTML;
      const printStyles = `
        <style>
          body { 
            font-family: 'Inter', system-ui, -apple-system, sans-serif; 
            margin: 0; 
            padding: 20px; 
            background: white !important;
            color: black !important;
          }
          .proposal-document { 
            max-width: none; 
            margin: 0; 
            padding: 0; 
            box-shadow: none !important;
            border: none !important;
            background: white !important;
          }
          .action-bar { display: none !important; }
          .sticky { position: static !important; }
          button { display: none !important; }
          h1, h2, h3, h4 { 
            color: #1a1a1a !important; 
            margin-top: 2em; 
            margin-bottom: 1em; 
            break-after: avoid;
          }
          p { 
            line-height: 1.6; 
            margin-bottom: 1em; 
            orphans: 3;
            widows: 3;
          }
          ul, ol { margin-bottom: 1em; }
          li { margin-bottom: 0.5em; }
          blockquote { 
            border-left: 4px solid #3b82f6; 
            padding-left: 1em; 
            margin: 1em 0; 
            color: #666 !important; 
            background: #f8fafc !important;
          }
          strong { font-weight: 600; }
          em { font-style: italic; }
          pre, code { 
            background: #f8fafc !important; 
            color: #1a1a1a !important;
            border: 1px solid #e2e8f0 !important;
          }
          @media print {
            body { 
              -webkit-print-color-adjust: exact; 
              print-color-adjust: exact;
            }
            * {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
          @page {
            margin: 1in;
            size: letter;
          }
        </style>
      `;
      
      document.body.innerHTML = printStyles + printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  }, [proposal]);

  const handleEmailProposal = useCallback(() => {
    const subject = encodeURIComponent(`Proposal: ${proposal.title}`);
    const body = encodeURIComponent(`I'd like to share this proposal with you:\n\n${fullProposalText}\n\nGenerated on ${proposal.generatedAt.toLocaleDateString()}`);
    window.open(`mailto:?subject=${subject}&body=${body}`);
  }, [fullProposalText, proposal.title, proposal.generatedAt]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center p-8 min-h-[50vh] ${
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
                Creating Your Perfect Proposal ✨
              </h3>
              <p className={`${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Our AI is working its magic, crafting something special just for you...
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`${
      theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      {/* Professional Document Header */}
      <div className={`sticky top-0 z-50 shadow-sm backdrop-blur-xl border-b ${
        theme === 'dark' 
          ? 'bg-slate-900/95 border-slate-800' 
          : 'bg-white/95 border-gray-200'
      }`}>
        <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`p-2 sm:p-2.5 rounded-lg ${
                theme === 'dark' ? 'bg-primary-900/30 text-primary-400' : 'bg-primary-100 text-primary-600'
              }`}>
                <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className={`text-lg sm:text-xl font-bold font-primary truncate ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {proposal.title}
                </h1>
                <div className={`flex flex-wrap items-center gap-2 sm:gap-3 mt-1 text-xs sm:text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  <span>{proposal.generatedAt.toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{proposal.metadata.wordCount} words</span>
                  <span>•</span>
                  <span>{proposal.metadata.estimatedReadTime} min</span>
                </div>
              </div>
            </div>
            
            {/* Action Bar */}
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopyAll}
                className={`p-2 sm:p-2.5 rounded-lg transition-all flex-shrink-0 ${
                  theme === 'dark' 
                    ? 'hover:bg-slate-800 text-gray-300 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
                title="Copy proposal"
              >
                {copiedSection === 'all' ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadPDF}
                className={`p-2 sm:p-2.5 rounded-lg transition flex-shrink-0
                  ${theme === 'dark' 
                    ? 'hover:bg-slate-800 text-gray-300 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
                title="Download as PDF"
              >
                <Printer className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadText}
                className={`p-2 sm:p-2.5 rounded-lg transition flex-shrink-0
                  ${theme === 'dark' 
                    ? 'hover:bg-slate-800 text-gray-300 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
                title="Download as text"
              >
                <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEmailProposal}
                className={`p-2 sm:p-2.5 rounded-lg transition flex-shrink-0
                  ${theme === 'dark' 
                    ? 'hover:bg-slate-800 text-gray-300 hover:text-white' 
                    : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
                title="Email proposal"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
              
              {onClose && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className={`p-2 sm:p-2.5 rounded-lg transition flex-shrink-0
                    ${theme === 'dark' 
                      ? 'hover:bg-slate-800 text-gray-300 hover:text-white' 
                      : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                  }`}
                  title="Close proposal"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Document Container */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <div id="proposal-content" className={`proposal-document bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl border overflow-hidden ${
          theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
        }`}>
          
          {/* Document Header */}
          <div className={`border-b px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 ${
            theme === 'dark' ? 'bg-gray-50 dark:bg-slate-800/50' : 'bg-gray-50'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h4 className={`text-base sm:text-lg lg:text-xl font-bold font-primary truncate ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {proposal.title}
                </h4>
                <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Client: {proposal.title}
                </p>
              </div>
              <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex-shrink-0 ${
                theme === 'dark' ? 'bg-primary-900/30 text-primary-300' : 'bg-primary-100 text-primary-700'
              }`}>
                Professional Proposal
              </div>
            </div>
          </div>

          {/* Content Area */}
            <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8">
              {sections.map((section, index) => (
                <motion.section
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Section Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-gray-200 dark:border-slate-700">
                    <h3 className={`text-base sm:text-lg lg:text-xl font-bold font-primary flex-1 min-w-0 pr-2 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {section.title}
                    </h3>
                    
                    {/* Copy Section Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCopySection(section.id, section.content)}
                      className={`p-1.5 sm:p-2 rounded-lg transition-all flex-shrink-0 ${
                        theme === 'dark' 
                          ? 'hover:bg-slate-800 text-gray-300 hover:text-white' 
                          : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                      }`}
                      title="Copy section"
                    >
                      {copiedSection === section.id ? (
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-green-500" />
                      ) : (
                        <Copy className="w-3 h-3 sm:w-4 sm:h-4" />
                      )}
                    </motion.button>
                  </div>
                  
                  {/* Section Content */}
                  <div className={`prose prose-sm sm:prose-base max-w-none leading-relaxed tracking-normal ${
                    theme === 'dark' 
                      ? 'prose-headings:text-gray-100 prose-p:text-gray-300 prose-strong:text-gray-100 prose-ul:text-gray-300 prose-ol:text-gray-300 prose-li:text-gray-300 prose-blockquote:text-gray-400 prose-code:text-primary-600'
                      : 'prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700 prose-blockquote:text-gray-600 prose-code:text-primary-600'
                  }`}>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({ children }: any) => (
                          <h1 className="text-3xl font-bold mb-4 text-primary-600 dark:text-primary-400 border-b-2 border-primary-200 dark:border-primary-800 pb-2">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }: any) => (
                          <h2 className="text-2xl font-bold mb-2 mt-4 text-primary-700 dark:text-primary-300 border-b border-primary-200 dark:border-primary-800 pb-1">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }: any) => (
                          <h3 className="text-xl font-semibold mb-2 mt-3 text-primary-800 dark:text-primary-200">
                            {children}
                          </h3>
                        ),
                        h4: ({ children }: any) => (
                          <h4 className="text-lg font-semibold mb-2 mt-4 text-gray-900 dark:text-gray-100">
                            {children}
                          </h4>
                        ),
                        p: ({ children }: any) => (
                          <p className="mb-3 leading-relaxed text-base">
                            {children}
                          </p>
                        ),
                        ul: ({ children }: any) => (
                          <ul className="mb-4 space-y-2">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }: any) => (
                          <ol className="mb-4 space-y-2">
                            {children}
                          </ol>
                        ),
                        li: ({ children }: any) => (
                          <li className="mb-2">
                            {children}
                          </li>
                        ),
                        strong: ({ children }: any) => (
                          <strong className="font-semibold">
                            {children}
                          </strong>
                        ),
                        em: ({ children }: any) => (
                          <em className="italic">
                            {children}
                          </em>
                        ),
                        blockquote: ({ children }: any) => (
                          <blockquote className="my-4 border-l-4 border-primary-500 pl-6 py-4 bg-primary-50 dark:bg-primary-900/20 rounded-r-lg italic">
                            {children}
                          </blockquote>
                        ),
                        code: ({ inline, children, ...props }: any) => {
                          return inline ? (
                            <code className="bg-primary-100 dark:bg-primary-900 px-2 py-1 rounded text-primary-600 dark:text-primary-400 text-sm font-mono" {...props}>
                              {children}
                            </code>
                          ) : (
                            <pre className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto">
                              <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                                {children}
                              </code>
                            </pre>
                          );
                        },
                        hr: () => (
                          <hr className="my-6 border-gray-200 dark:border-slate-700" />
                        )
                      }}
                    >
                      {section.content}
                    </ReactMarkdown>
                  </div>
                </motion.section>
              ))}
            </div>
        </div>
      </div>

      {/* Hidden Full Content Container for PDF Export */}
      <div id="proposal-print" className="hidden">
        <div className={`proposal-document bg-white dark:bg-slate-900 rounded-xl shadow-xl border overflow-hidden ${
          theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
        }`}>
          
          {/* Document Header */}
          <div className={`border-b px-6 lg:px-8 py-4 lg:py-6 ${
            theme === 'dark' ? 'bg-gray-50 dark:bg-slate-800/50' : 'bg-gray-50'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
              <div className="flex-1 min-w-0">
                <h4 className={`text-base sm:text-lg lg:text-xl font-bold font-primary truncate ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {proposal.title}
                </h4>
                <p className={`text-xs sm:text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Client: {proposal.title}
                </p>
              </div>
              <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex-shrink-0 ${
                theme === 'dark' ? 'bg-primary-900/30 text-primary-300' : 'bg-primary-100 text-primary-700'
              }`}>
                Professional Proposal
              </div>
            </div>
          </div>

          {/* Full Content - No Scroll Restrictions */}
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8">
            {sections.map((section, index) => (
              <div key={section.id} className="space-y-6">
                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-gray-200 dark:border-slate-700">
                  <h3 className={`text-base sm:text-lg lg:text-xl font-bold font-primary flex-1 min-w-0 pr-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {section.title}
                  </h3>
                </div>
                
                {/* Section Content */}
                <div className={`prose prose-sm sm:prose-base max-w-none leading-relaxed tracking-normal ${
                  theme === 'dark' 
                    ? 'prose-headings:text-gray-100 prose-p:text-gray-300 prose-strong:text-gray-100 prose-ul:text-gray-300 prose-ol:text-gray-300 prose-li:text-gray-300 prose-blockquote:text-gray-400 prose-code:text-primary-600'
                    : 'prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700 prose-blockquote:text-gray-600 prose-code:text-primary-600'
                }`}>
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }: any) => (
                        <h1 className="text-3xl font-bold mb-6 text-primary-600 dark:text-primary-400 border-b-2 border-primary-200 dark:border-primary-800 pb-2">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }: any) => (
                        <h2 className="text-2xl font-bold mb-4 mt-8 text-primary-700 dark:text-primary-300 border-b border-primary-200 dark:border-primary-800 pb-1">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }: any) => (
                        <h3 className="text-xl font-semibold mb-3 mt-6 text-primary-800 dark:text-primary-200">
                          {children}
                        </h3>
                      ),
                      h4: ({ children }: any) => (
                        <h4 className="text-lg font-semibold mb-2 mt-4 text-gray-900 dark:text-gray-100">
                          {children}
                        </h4>
                      ),
                      p: ({ children }: any) => (
                        <p className="mb-4 leading-relaxed text-base">
                          {children}
                        </p>
                      ),
                      ul: ({ children }: any) => (
                        <ul className="mb-4 space-y-2">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }: any) => (
                        <ol className="mb-4 space-y-2">
                          {children}
                        </ol>
                      ),
                      li: ({ children }: any) => (
                        <li className="mb-2">
                          {children}
                        </li>
                      ),
                      strong: ({ children }: any) => (
                        <strong className="font-semibold">
                          {children}
                        </strong>
                      ),
                      em: ({ children }: any) => (
                        <em className="italic">
                          {children}
                        </em>
                      ),
                      blockquote: ({ children }: any) => (
                        <blockquote className="border-l-4 border-primary-500 pl-6 py-4 my-6 bg-primary-50 dark:bg-primary-900/20 rounded-r-lg italic">
                          {children}
                        </blockquote>
                      ),
                      code: ({ inline, children, ...props }: any) => {
                        return inline ? (
                          <code
                            className="bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 px-2 py-1 rounded text-sm font-mono"
                            {...props}
                          >
                            {children}
                          </code>
                        ) : (
                          <pre className="bg-gray-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-slate-700">
                            <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                              {children}
                            </code>
                          </pre>
                        );
                      },
                      hr: () => (
                        <hr className="my-8 border-gray-200 dark:border-slate-700" />
                      )
                    }}
                  >
                    {section.content}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${theme === 'dark' ? '#1e293b' : '#f1f5f9'};
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${theme === 'dark' ? '#475569' : '#cbd5e1'};
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${theme === 'dark' ? '#64748b' : '#94a3b8'};
        }
        @media print {
          body {
            background: white !important;
          }

          .proposal-document {
            box-shadow: none !important;
            border: none !important;
          }

          .sticky {
            position: static !important;
          }

          button {
            display: none !important;
          }

          .custom-scrollbar {
            overflow: visible !important;
            max-height: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProposalDisplay;
