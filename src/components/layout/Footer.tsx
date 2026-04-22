import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Code } from 'lucide-react';
import ComingSoonModal from '../ui/ComingSoonModal';
import ComingSoonBadge from '../ui/ComingSoonBadge';
import SmartLink from '../ui/SmartLink';

interface FooterLink {
  name: string;
  action: () => void;
  type: 'nav' | 'scroll' | 'modal';
  component?: React.ReactNode;
}

interface FooterProps {
  scrollToTool?: () => void;
}

const Footer: React.FC<FooterProps> = ({ scrollToTool }) => {
  const navigate = useNavigate();
  const [comingSoonModal, setComingSoonModal] = React.useState<{
    isOpen: boolean;
    featureName: string;
  }>({
    isOpen: false,
    featureName: ''
  });

  const footerLinks: Record<string, FooterLink[]> = {
    Product: [
      { name: 'Features', action: () => scrollToTool && scrollToTool(), type: 'scroll' },
      { name: 'Pricing', action: () => scrollToTool && scrollToTool(), type: 'scroll' },
      { name: 'Templates', action: () => navigate('/templates'), type: 'nav' },
      { name: 'API Docs', action: () => setComingSoonModal({ isOpen: true, featureName: 'API Documentation' }), type: 'modal' }
    ],
    Company: [
      { name: 'About Us', action: () => navigate('/about'), type: 'nav' },
      { name: 'Contact', action: () => setComingSoonModal({ isOpen: true, featureName: 'Contact Us' }), type: 'modal', component: (
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold text-white mb-4">Contact Us</h3>
          <div className="space-y-4 text-slate-300">
            <p className="text-lg">We'd love to hear from you!</p>
            <div className="space-y-3">
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <h4 className="font-semibold text-white mb-2">Support</h4>
                <p className="text-slate-400">noteaseofficial@gmail.com</p>
                <p className="text-slate-400 text-sm">Response within 24 hours</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <h4 className="font-semibold text-white mb-2">Business</h4>
                <p className="text-slate-400">hello@yourdomain.com</p>
                <p className="text-slate-400 text-sm">Response within 24 hours</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <h4 className="font-semibold text-white mb-2">Location</h4>
                <p className="text-slate-400">Mumbai, India</p>
                <p className="text-slate-400 text-sm">Mon-Sat 10AM-6PM</p>
              </div>
            </div>
          </div>
        </div>
      ) },
      { name: 'Privacy', action: () => setComingSoonModal({ isOpen: true, featureName: 'Privacy Policy' }), type: 'modal', component: (
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold text-white mb-4">Privacy Policy</h3>
          <div className="space-y-4 text-slate-300">
            <p className="text-lg">Your privacy is our priority.</p>
            <div className="space-y-3">
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <h4 className="font-semibold text-white mb-2">Data Protection</h4>
                <p className="text-slate-400">256-bit SSL encryption for all data</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <h4 className="font-semibold text-white mb-2">GDPR Compliant</h4>
                <p className="text-slate-400">Full compliance with privacy laws</p>
              </div>
            </div>
          </div>
        </div>
      ) },
      { name: 'Terms', action: () => setComingSoonModal({ isOpen: true, featureName: 'Terms of Service' }), type: 'modal', component: (
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold text-white mb-4">Terms of Service</h3>
          <div className="space-y-4 text-slate-300">
            <p className="text-lg">Fair terms for everyone.</p>
            <div className="space-y-3">
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <h4 className="font-semibold text-white mb-2">Service Terms</h4>
                <p className="text-slate-400">Clear, fair terms for all users</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <h4 className="font-semibold text-white mb-2">Refund Policy</h4>
                <p className="text-slate-400">14-day money-back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      ) }
    ],
    Resources: [
      { name: 'Blog', action: () => navigate('/blog'), type: 'nav' },
      { name: 'Guide', action: () => navigate('/guide'), type: 'nav' },
      { name: 'Support', action: () => setComingSoonModal({ isOpen: true, featureName: 'Support Center' }), type: 'modal', component: (
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold text-white mb-4">Support</h3>
          <div className="space-y-4 text-slate-300">
            <p className="text-lg">Need help? We're here for you!</p>
            <div className="space-y-3">
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <h4 className="font-semibold text-white mb-2">Technical Support</h4>
                <p className="text-slate-400">Email: support@proposalgen.com</p>
                <p className="text-slate-400">Response time: 24-48 hours</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <h4 className="font-semibold text-white mb-2">Documentation</h4>
                <p className="text-slate-400">Visit our help center for guides and tutorials</p>
              </div>
            </div>
          </div>
        </div>
      )}
    ],
    Legal: [
      { name: 'Privacy', action: () => setComingSoonModal({ isOpen: true, featureName: 'Privacy Policy' }), type: 'modal', component: (
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold text-white mb-4">Privacy Policy</h3>
          <div className="space-y-4 text-slate-300">
            <p className="text-lg">Your privacy is our priority.</p>
            <div className="space-y-3">
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <h4 className="font-semibold text-white mb-2">Data Protection</h4>
                <p className="text-slate-400">256-bit SSL encryption for all data</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <h4 className="font-semibold text-white mb-2">GDPR Compliant</h4>
                <p className="text-slate-400">Full compliance with privacy laws</p>
              </div>
            </div>
          </div>
        </div>
      ) },
      { name: 'Terms', action: () => setComingSoonModal({ isOpen: true, featureName: 'Terms of Service' }), type: 'modal', component: (
        <div className="p-6 space-y-4">
          <h3 className="text-2xl font-bold text-white mb-4">Terms of Service</h3>
          <div className="space-y-4 text-slate-300">
            <p className="text-lg">Fair terms for everyone.</p>
            <div className="space-y-3">
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <h4 className="font-semibold text-white mb-2">Service Terms</h4>
                <p className="text-slate-400">Clear, fair terms for all users</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                <h4 className="font-semibold text-white mb-2">Refund Policy</h4>
                <p className="text-slate-400">14-day money-back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      )}
    ]
  };

  const handleLinkClick = (link: FooterLink) => {
    link.action();
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-xl font-bold text-white">ProposalGen</span>
            </div>
            <p className="text-gray-400 mb-4">
              AI-powered proposal generator helping freelancers win more clients.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 border border-green-500/30 rounded-lg">
                <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs text-green-400">SSL Secured</span>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-xs text-blue-400">GDPR Compliant</span>
              </div>
            </div>
            <div className="flex space-x-3 sm:space-x-4">
              {[
                { 
                  name: 'LinkedIn', 
                  icon: Users, 
                  color: 'hover:text-blue-600',
                  url: 'https://linkedin.com/in/pradyuman-mishra-918902402',
                  comingSoon: false
                },
                { 
                  name: 'GitHub', 
                  icon: Code, 
                  color: 'hover:text-gray-400',
                  url: 'https://github.com/PradyumanMishra20',
                  comingSoon: false
                }
              ].map((social) => (
                <div key={social.name} className="relative">
                  {social.comingSoon ? (
                    <>
                      <motion.button
                        onClick={() => {
                          setComingSoonModal({
                            isOpen: true,
                            featureName: `${social.name} Profile`
                          });
                        }}
                        className={`text-gray-400 ${social.color} transition-colors p-2 rounded-lg hover:bg-slate-800/50`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.button>
                      <ComingSoonBadge size="sm" variant="tooltip" className="absolute -top-2 -right-2" />
                    </>
                  ) : (
                    <motion.a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-400 ${social.color} transition-colors p-2 rounded-lg hover:bg-slate-800/50`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-3 sm:mb-4">{category}</h3>
              <ul className="space-y-1 sm:space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    {link.type === 'modal' && link.component ? (
                      <SmartLink
                        component={link.component}
                        modalOptions={{ size: 'lg', showCloseButton: true }}
                        className="text-gray-400 hover:text-white transition-colors text-left w-full py-2 px-3 rounded-lg hover:bg-slate-800/50 text-sm sm:text-base"
                      >
                        {link.name}
                      </SmartLink>
                    ) : (
                      <button
                        onClick={() => handleLinkClick(link)}
                        className="text-gray-400 hover:text-white transition-colors text-left w-full py-2 px-3 rounded-lg hover:bg-slate-800/50 text-sm sm:text-base"
                      >
                        {link.name}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2024 ProposalGen. All rights reserved.
            </p>
            
            <div className="flex items-center justify-center md:justify-end">
              <button
                onClick={() => scrollToTool && scrollToTool()}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 text-sm sm:text-base font-medium min-h-[2.75rem] sm:min-h-[3rem]"
              >
                Generate Proposal
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Coming Soon Modal */}
      <ComingSoonModal
        isOpen={comingSoonModal.isOpen}
        onClose={() => setComingSoonModal({ isOpen: false, featureName: '' })}
        featureName={comingSoonModal.featureName}
        description="Follow us on social media for updates, tips, and community discussions!"
      />
    </footer>
  );
};

export default Footer;
