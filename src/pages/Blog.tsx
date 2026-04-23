import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowRight, BookOpen } from 'lucide-react';
import blogBusinessImage from '../assets/images/blogbusiness.jpg';
import blogCommunicationImage from '../assets/images/blogCommunication.jpg';
import blogDealImage from '../assets/images/blogDeal.jpg';
import blogTechnologyImage from '../assets/images/blogTechnology.jpg';
import blogFreelanceImage from '../assets/images/blogfreelance.webp';

interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
}

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const blogPosts: BlogPost[] = [
    {
      title: 'Winning More Freelance Projects',
      excerpt: 'Learn proven strategies to create compelling proposals that win clients and grow your freelance business.',
      author: 'Sarah Johnson',
      date: 'April 15, 2026',
      readTime: '5 min read',
      category: 'Strategy',
      image: blogFreelanceImage,
      featured: true
    },
    {
      title: 'Business Proposal Templates',
      excerpt: 'Professional templates that help you create impressive business proposals in minutes.',
      author: 'Michael Chen',
      date: 'April 12, 2026',
      readTime: '7 min read',
      category: 'Business',
      image: blogBusinessImage
    },
    {
      title: 'Client Communication Tips',
      excerpt: 'Master the art of client communication to build lasting relationships and successful projects.',
      author: 'Emily Davis',
      date: 'April 8, 2026',
      readTime: '4 min read',
      category: 'Communication',
      image: blogCommunicationImage
    },
    {
      title: 'AI Tools for Freelancers',
      excerpt: 'Discover how AI tools are revolutionizing the freelance industry and boosting productivity.',
      author: 'Alex Rivera',
      date: 'April 5, 2026',
      readTime: '6 min read',
      category: 'Technology',
      image: blogTechnologyImage
    },
    {
      title: 'Building Your Portfolio',
      excerpt: 'Create a stunning portfolio that showcases your best work and attracts high-paying clients.',
      author: 'Jessica Martinez',
      date: 'April 1, 2026',
      readTime: '8 min read',
      category: 'Career',
      image: blogDealImage
    },
    {
      title: 'Negotiation Strategies',
      excerpt: 'Learn effective negotiation techniques to secure better rates and terms for your freelance projects.',
      author: 'David Kim',
      date: 'March 28, 2026',
      readTime: '5 min read',
      category: 'Business',
      image: blogBusinessImage
    }
  ];

  const categories = ['All', 'Strategy', 'Business', 'Communication', 'Technology', 'Career'];

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-indigo-400 mr-3" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                ProposalGen Blog
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Insights, tips, and strategies to help you win more clients and grow your freelance business.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Featured Post */}
      {blogPosts.filter(post => post.featured).map((post, index) => (
        <div key={post.title} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded-full">
                    Featured
                  </span>
                  <span className="px-3 py-1 bg-slate-700 text-gray-300 text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  {post.title}
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <motion.button
                  onClick={() => window.open(`/blog?post=${encodeURIComponent(post.title.toLowerCase().replace(/\s+/g, '-'))}`, '_blank')}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
              <div className="relative h-64 lg:h-auto">
                <img
                  src={post.image}
                  alt={`${post.title} - ${post.category} article illustration`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </div>
      ))}

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                category === selectedCategory
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600 hover:text-white'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.filter(post => !post.featured).map((post, index) => (
            <motion.article
              key={post.title}
              className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden hover:border-indigo-500 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <div className="relative h-48">
                <img
                  src={post.image}
                  alt={`${post.title} - ${post.category} article illustration`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-sm text-gray-300 text-xs font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <motion.button
                  onClick={() => window.open(`/blog?post=${encodeURIComponent(post.title.toLowerCase().replace(/\s+/g, '-'))}`, '_blank')}
                  className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Get the latest insights, tips, and strategies delivered straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            <motion.button
              onClick={() => alert('Newsletter subscription feature coming soon!')}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;
