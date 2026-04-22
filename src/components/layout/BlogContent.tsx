import React from 'react';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';

const BlogContent: React.FC = () => {
  const blogPosts = [
    {
      title: 'How to Write Proposals That Win Every Time',
      excerpt: 'Learn the psychology behind successful proposals and techniques that increase your win rate by 300%.',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      readTime: '8 min read',
      category: 'Strategy'
    },
    {
      title: 'AI in Proposal Writing: Friend or Foe?',
      excerpt: 'Explore how artificial intelligence is transforming the proposal writing process and what it means for freelancers.',
      author: 'Mike Chen',
      date: '2024-01-10',
      readTime: '6 min read',
      category: 'AI & Technology'
    },
    {
      title: 'Pricing Your Services: The Complete Guide',
      excerpt: 'Master the art of pricing your proposals competitively while maintaining profitability and client satisfaction.',
      author: 'Emily Davis',
      date: '2024-01-05',
      readTime: '10 min read',
      category: 'Business'
    },
    {
      title: 'Case Studies: Proposals That Closed Deals',
      excerpt: 'Real-world examples of successful proposals and the strategies that made them stand out from the competition.',
      author: 'Alex Rivera',
      date: '2024-01-01',
      readTime: '12 min read',
      category: 'Case Studies'
    }
  ];

  const categories = ['Strategy', 'AI & Technology', 'Business', 'Case Studies', 'Tips & Tricks', 'Industry Insights'];

  return (
    <div className="p-6 space-y-6">
      <h3 className="text-2xl font-bold text-white mb-4">ProposalGen Blog</h3>
      
      <div className="space-y-4 text-slate-300">
        <p className="text-lg">
          Expert insights, tips, and strategies to help you create winning proposals and grow your freelance business.
        </p>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-indigo-600/20 text-indigo-300 rounded-full text-sm border border-indigo-500/30"
            >
              {category}
            </span>
          ))}
        </div>
        
        <div className="space-y-4">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600 hover:border-indigo-500/50 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white mb-2 hover:text-indigo-400 transition-colors cursor-pointer">
                    {post.title}
                  </h4>
                  <p className="text-sm text-slate-400 mb-3">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <span className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded text-xs border border-purple-500/30">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-1 transition-colors">
                  Read more
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-lg p-4 border border-purple-500/30">
          <h4 className="text-lg font-semibold text-white mb-3">Subscribe to Our Newsletter</h4>
          <p className="text-sm mb-4">
            Get weekly tips, strategies, and insights delivered straight to your inbox.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 bg-slate-600/50 border border-slate-500 rounded text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors text-sm font-medium">
              Subscribe
            </button>
          </div>
        </div>
        
        <div className="text-center pt-4">
          <p className="text-sm text-slate-400">
            Join 10,000+ freelancers improving their proposal game.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogContent;
