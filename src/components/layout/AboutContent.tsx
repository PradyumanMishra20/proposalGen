import React from 'react';

const AboutContent: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h3 className="text-2xl font-bold text-white mb-4">About ProposalGen</h3>
      
      <div className="space-y-4 text-slate-300">
        <p className="text-lg leading-relaxed">
          ProposalGen is revolutionizing how freelancers and agencies create professional proposals. 
          Our AI-powered platform helps you win more clients with compelling, customized proposals 
          in minutes, not hours.
        </p>
        
        <div className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
          <h4 className="text-lg font-semibold text-white mb-3">Our Mission</h4>
          <p>
            To empower freelancers and agencies with AI tools that streamline proposal creation, 
            allowing them to focus on what matters most - delivering exceptional work and growing their business.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">What We Do</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-indigo-400 mr-2">AI-powered proposal generation</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-2">Customizable templates</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-2">Client management tools</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-2">Analytics and insights</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">Why Choose Us</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">Save hours of work</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">Increase win rates</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">Professional templates</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2">24/7 availability</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg p-4 border border-indigo-500/30">
          <h4 className="text-lg font-semibold text-white mb-3">Our Story</h4>
          <p>
            Founded in 2024, ProposalGen was born from the frustration of spending countless hours 
            crafting proposals that didn't convert. Our team of developers, designers, and freelancers 
            came together to create a solution that leverages AI to generate proposals that actually work.
          </p>
        </div>
        
        <div className="text-center pt-4">
          <p className="text-sm text-slate-400">
            Join thousands of freelancers and agencies who are already using ProposalGen 
            to grow their business and win more clients.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;
