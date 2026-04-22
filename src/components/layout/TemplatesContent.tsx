import React from 'react';
import { FileText, Zap, Users, TrendingUp } from 'lucide-react';

const TemplatesContent: React.FC = () => {
  const templates = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Web Design Proposal',
      description: 'Perfect for web designers and agencies',
      features: ['Project scope', 'Timeline', 'Pricing breakdown', 'Portfolio showcase']
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Software Development',
      description: 'Ideal for developers and tech teams',
      features: ['Technical requirements', 'Development phases', 'Milestones', 'Testing plan']
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Marketing Campaign',
      description: 'Great for marketing professionals',
      features: ['Campaign objectives', 'Target audience', 'Budget allocation', 'KPIs']
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Business Consulting',
      description: 'Perfect for consultants and advisors',
      features: ['Business analysis', 'Recommendations', 'ROI projections', 'Implementation plan']
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-2xl font-bold text-white mb-4">Proposal Templates</h3>
      
      <div className="space-y-4 text-slate-300">
        <p className="text-lg">
          Choose from our professionally designed templates, each tailored for specific industries and use cases.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          {templates.map((template, index) => (
            <div key={index} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 hover:border-indigo-500/50 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-indigo-400 flex-shrink-0">
                  {template.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">{template.title}</h4>
                  <p className="text-sm text-slate-400">{template.description}</p>
                </div>
              </div>
              <ul className="space-y-1">
                {template.features.map((feature, idx) => (
                  <li key={idx} className="text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg p-4 border border-indigo-500/30">
          <h4 className="text-lg font-semibold text-white mb-3">Custom Templates</h4>
          <p className="text-sm mb-3">
            Can't find what you need? Our AI can create custom proposals based on your specific requirements.
          </p>
          <ul className="text-sm space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-green-400">Industry-specific content</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">Personalized tone and style</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-400">Brand-aligned formatting</span>
            </li>
          </ul>
        </div>
        
        <div className="text-center pt-4">
          <p className="text-sm text-slate-400">
            All templates are fully customizable and optimized for conversion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TemplatesContent;
