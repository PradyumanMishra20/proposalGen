import React from 'react';
import { BookOpen, Target, Zap, Award, Users, TrendingUp } from 'lucide-react';

const GuideContent: React.FC = () => {
  const guideSections = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Getting Started',
      description: 'Learn the basics of ProposalGen and create your first proposal in minutes.',
      topics: ['Account setup', 'Template selection', 'Basic editing', 'Export options']
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Advanced Techniques',
      description: 'Master advanced features to create compelling, high-converting proposals.',
      topics: ['Custom templates', 'AI optimization', 'Personalization', 'Analytics tracking']
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Best Practices',
      description: 'Industry-proven strategies and techniques for proposal success.',
      topics: ['Writing tips', 'Client psychology', 'Pricing strategies', 'Follow-up tactics']
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Case Studies',
      description: 'Real-world examples and success stories from ProposalGen users.',
      topics: ['Success stories', 'Before/after examples', 'ROI analysis', 'Client testimonials']
    }
  ];

  const quickTips = [
    'Always research your client before writing',
    'Focus on benefits, not just features',
    'Include social proof and testimonials',
    'Use clear, concise language',
    'Add a clear call-to-action',
    'Proofread carefully before sending'
  ];

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-2xl font-bold text-white mb-4">ProposalGen Guide</h3>
      
      <div className="space-y-4 text-slate-300">
        <p className="text-lg">
          Master the art of proposal writing with our comprehensive guides, tutorials, and best practices.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          {guideSections.map((section, index) => (
            <div key={index} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 hover:border-indigo-500/50 transition-colors">
              <div className="flex items-start gap-3 mb-3">
                <div className="text-indigo-400 flex-shrink-0">
                  {section.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">{section.title}</h4>
                  <p className="text-sm text-slate-400">{section.description}</p>
                </div>
              </div>
              <ul className="space-y-1">
                {section.topics.map((topic, idx) => (
                  <li key={idx} className="text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                    {topic}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-lg p-4 border border-green-500/30">
          <h4 className="text-lg font-semibold text-white mb-3">Quick Tips for Success</h4>
          <div className="grid md:grid-cols-2 gap-2">
            {quickTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">{'>'}</span>
                <span className="text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-white">Popular Resources</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600">
              <h5 className="font-medium text-white mb-2">Video Tutorials</h5>
              <p className="text-sm text-slate-400">Step-by-step video guides for all features</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600">
              <h5 className="font-medium text-white mb-2">Template Library</h5>
              <p className="text-sm text-slate-400">Extensive collection of proposal templates</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600">
              <h5 className="font-medium text-white mb-2">Community Forum</h5>
              <p className="text-sm text-slate-400">Connect with other ProposalGen users</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-lg p-4 border border-indigo-500/30">
          <h4 className="text-lg font-semibold text-white mb-3">Need Personal Help?</h4>
          <p className="text-sm mb-4">
            Our team of proposal experts is here to help you succeed. Book a 1-on-1 consultation.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Expert consultants</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span>Proven results</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Fast response</span>
            </div>
          </div>
        </div>
        
        <div className="text-center pt-4">
          <p className="text-sm text-slate-400">
            Start creating winning proposals today with our expert guidance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuideContent;
