import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import { Users, Target, Shield, Zap } from 'lucide-react';
import defaultAvatar from '../../assets/images/blaogAi.jpg';

// About component props
interface AboutProps {
  className?: string;
}

const About: React.FC<AboutProps> = ({ className = '' }) => {
  const { theme } = useTheme();

  const values = [
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Client Success',
      description: 'We\'re obsessed with helping freelancers win more clients and grow their business.'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Speed & Efficiency',
      description: 'Save hours on every proposal while maintaining professional quality and attention to detail.'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Trust & Security',
      description: 'Your data and proposals are secure with enterprise-grade encryption and privacy protection.'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Driven',
      description: 'Built by freelancers, for freelancers. We understand your challenges because we live them too.'
    }
  ];

  const team = [
    {
      name: 'Sushant Kapoor',
      role: 'Founder & Developer',
      description: 'I built ProposalGen to help freelancers save time and write better proposals without stress. Focused on creating simple, powerful tools that solve real problems.',
      avatar: defaultAvatar
    }
  ];

  return (
    <section className={`py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            About ProposalGen
          </h2>
          <p className={`text-lg sm:text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            We're on a mission to help freelancers win more clients with AI-powered proposals
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`mb-20 p-8 sm:p-12 rounded-3xl border backdrop-blur-sm ${
            theme === 'dark' 
              ? 'bg-slate-800/60 border-slate-700/40' 
              : 'bg-white/90 border-gray-200/60'
          }`}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className={`text-2xl sm:text-3xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Our Mission
            </h3>
            <p className={`text-lg leading-relaxed ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
            }`}>
              We believe every freelancer deserves to win their dream projects. That's why we built ProposalGen - 
              to level the playing field and give independent professionals the tools they need to compete 
              with larger agencies. Our AI-powered proposal generator helps you create compelling, 
              professional proposals in minutes, not hours.
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`text-2xl sm:text-3xl font-bold text-center mb-12 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            Our Values
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${
                  theme === 'dark' 
                    ? 'bg-slate-800/60 border-slate-700/40 hover:bg-slate-800/80' 
                    : 'bg-white/90 border-gray-200/60 hover:bg-white/95'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white`}>
                  {value.icon}
                </div>
                <h4 className={`text-lg font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {value.title}
                </h4>
                <p className={`text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className={`text-2xl sm:text-3xl font-bold text-center mb-12 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Meet the Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`text-center p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 hover:shadow-xl ${
                  theme === 'dark' 
                    ? 'bg-slate-800/60 border-slate-700/40 hover:bg-slate-800/80' 
                    : 'bg-white/90 border-gray-200/60 hover:bg-white/95'
                }`}
              >
                <img
                    src={member.avatar}
                    alt={`${member.name} - ${member.role} profile picture`}
                    className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white/20 shadow-lg"
                    loading="lazy"
                  />
                <h4 className={`text-lg font-bold mb-1 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {member.name}
                </h4>
                <p className={`text-sm font-medium mb-3 ${
                  theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
                }`}>
                  {member.role}
                </p>
                <p className={`text-sm leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <div className={`inline-flex flex-col sm:flex-row items-center gap-4 p-6 sm:p-8 rounded-2xl border backdrop-blur-sm ${
            theme === 'dark' 
              ? 'bg-slate-800/60 border-slate-700/40' 
              : 'bg-white/90 border-gray-200/60'
          }`}>
            <div className="text-left">
              <h4 className={`text-lg font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Ready to transform your proposal process?
              </h4>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Join thousands of freelancers winning more clients
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              Get Started Free
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
