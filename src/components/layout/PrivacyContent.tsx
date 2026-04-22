import React from 'react';

const PrivacyContent: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h3 className="text-2xl font-bold text-white mb-4">Privacy Policy</h3>
      
      <div className="space-y-4 text-slate-300">
        <p className="text-sm text-slate-400">Last updated: January 1, 2024</p>
        
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <h4 className="text-lg font-semibold text-white mb-3">Our Commitment</h4>
          <p>
            At ProposalGen, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This policy outlines how we collect, use, and protect your data.
          </p>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Information We Collect</h4>
            <div className="space-y-3 ml-4">
              <div>
                <h5 className="font-medium text-indigo-400 mb-2">Personal Information</h5>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Name and email address</li>
                  <li>Company information (when provided)</li>
                  <li>Contact details</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-indigo-400 mb-2">Usage Data</h5>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Proposal content and templates used</li>
                  <li>Feature usage patterns</li>
                  <li>Performance and analytics data</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-indigo-400 mb-2">Technical Information</h5>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>IP address and location data</li>
                  <li>Browser and device information</li>
                  <li>Cookies and similar technologies</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">How We Use Your Information</h4>
            <div className="space-y-3 ml-4">
              <div className="flex items-start">
                <span className="text-purple-400 mr-2">Service Delivery:</span>
                <span className="text-sm">To generate personalized proposals and provide our core services</span>
              </div>
              <div className="flex items-start">
                <span className="text-purple-400 mr-2">Account Management:</span>
                <span className="text-sm">To create and manage your account and preferences</span>
              </div>
              <div className="flex items-start">
                <span className="text-purple-400 mr-2">Communication:</span>
                <span className="text-sm">To respond to your inquiries and send important updates</span>
              </div>
              <div className="flex items-start">
                <span className="text-purple-400 mr-2">Improvement:</span>
                <span className="text-sm">To analyze usage patterns and improve our services</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Data Protection</h4>
            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600">
              <p className="mb-3">We implement industry-standard security measures including:</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>End-to-end encryption for all data transmissions</li>
                <li>Secure servers with regular security audits</li>
                <li>Access controls and authentication systems</li>
                <li>Regular data backups and disaster recovery procedures</li>
                <li>Compliance with GDPR, CCPA, and other privacy regulations</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Your Rights</h4>
            <div className="space-y-3 ml-4">
              <div className="flex items-start">
                <span className="text-green-400 mr-2">Access:</span>
                <span className="text-sm">Request a copy of your personal data</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-400 mr-2">Correction:</span>
                <span className="text-sm">Update or correct inaccurate information</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-400 mr-2">Deletion:</span>
                <span className="text-sm">Request deletion of your personal data</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-400 mr-2">Portability:</span>
                <span className="text-sm">Transfer your data to another service</span>
              </div>
              <div className="flex items-start">
                <span className="text-green-400 mr-2">Opt-out:</span>
                <span className="text-sm">Control marketing communications</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Data Retention</h4>
            <p className="text-sm">
              We retain your personal information only as long as necessary to provide our services 
              and comply with legal obligations. You can request deletion of your account and associated 
              data at any time through your account settings or by contacting us directly.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Third-Party Services</h4>
            <p className="text-sm">
              We may share data with trusted third-party service providers for essential operations 
              like payment processing, analytics, and customer support. All third parties are contractually 
              obligated to protect your data and comply with applicable privacy laws.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-lg p-4 border border-blue-500/30">
            <h4 className="text-lg font-semibold text-white mb-3">Contact Us</h4>
            <p className="text-sm mb-3">
              If you have questions about this Privacy Policy or how we handle your data, please contact us:
            </p>
            <div className="space-y-1 text-sm">
              <p>Email: privacy@proposalgen.com</p>
              <p>Address: 123 Tech Street, Silicon Valley, CA 94025</p>
              <p>Phone: 1-800-PROPOSAL</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyContent;
