import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { analytics } from '../../utils/analytics';
import { X, Shield } from 'lucide-react';

interface AnalyticsConsentProps {
  className?: string;
}

const AnalyticsConsent: React.FC<AnalyticsConsentProps> = ({ className = '' }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [hasDecided, setHasDecided] = useState(false);

  useEffect(() => {
    // Check if user has already made a decision
    const decided = localStorage.getItem('analytics-consent-decided');
    
    if (!decided) {
      setIsVisible(true);
    } else {
      setHasDecided(true);
    }
  }, []);

  const handleAccept = (): void => {
    analytics.grantConsent();
    setIsVisible(false);
    setHasDecided(true);
    localStorage.setItem('analytics-consent-decided', 'true');
    localStorage.setItem('analytics-consent', 'granted');
    
    // Track consent acceptance
    analytics.trackUserInteraction('analytics_consent_accepted', 'consent', {
      source: 'analytics_banner'
    });
  };

  const handleDecline = (): void => {
    analytics.revokeConsent();
    setIsVisible(false);
    setHasDecided(true);
    localStorage.setItem('analytics-consent-decided', 'true');
    localStorage.setItem('analytics-consent', 'false');
    
    // Track consent denial
    analytics.trackUserInteraction('analytics_consent_declined', 'consent', {
      source: 'analytics_banner'
    });
  };

  const handleDismiss = (): void => {
    setIsVisible(false);
    // Don't mark as decided, show again later
  };

  if (hasDecided || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`
          bg-slate-800 border rounded-lg shadow-xl backdrop-blur-sm
          ${theme === 'dark' ? 'border-slate-700' : 'border-gray-200'}
        `}>
          <div className="p-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-600/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Analytics & Cookies
                  </h3>
                  <p className="text-xs text-gray-400">
                    Help us improve ProposalGen
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleDismiss}
                className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="mb-4">
              <p className="text-sm text-gray-300 leading-relaxed">
                We use analytics to understand how you use ProposalGen and improve your experience. 
                No personal data is collected, and you can change your mind anytime.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleAccept}
                className="flex-1 px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
              >
                Accept
              </button>
              
              <button
                onClick={handleDecline}
                className="px-3 py-2 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-colors text-sm font-medium"
              >
                Decline
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-3 pt-3 border-t border-slate-700">
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-400">
                  We respect your privacy
                </p>
                <button
                  onClick={() => {
                    // Navigate to privacy policy or open modal
                    window.open('/privacy', '_blank');
                  }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AnalyticsConsent;
