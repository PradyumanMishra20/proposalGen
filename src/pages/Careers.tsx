import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, MapPin, Rocket, Heart } from 'lucide-react';

interface Position {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Careers: React.FC = () => {
  const positions: Position[] = [
    {
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Lead the development of our cutting-edge proposal generation interface and help shape the future of freelance work.'
    },
    {
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Create beautiful, intuitive experiences that make proposal generation effortless and enjoyable for our users.'
    },
    {
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      type: 'Full-time',
      description: 'Drive the vision and strategy for ProposalGen, ensuring we build the right features for our growing user base.'
    },
    {
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      description: 'Help us reach millions of freelancers worldwide and grow our community through innovative marketing strategies.'
    }
  ];

  const benefits: Benefit[] = [
    {
      icon: <Rocket className="w-6 h-6 text-indigo-400" />,
      title: 'Growth Opportunities',
      description: 'Fast-growing company with clear career paths and development opportunities.'
    },
    {
      icon: <Users className="w-6 h-6 text-green-400" />,
      title: 'Amazing Team',
      description: 'Work with talented, passionate people who are building the future of work.'
    },
    {
      icon: <MapPin className="w-6 h-6 text-purple-400" />,
      title: 'Remote First',
      description: 'Work from anywhere in the world with flexible hours and work-life balance.'
    },
    {
      icon: <Heart className="w-6 h-6 text-red-400" />,
      title: 'Great Benefits',
      description: 'Competitive salary, equity, health insurance, and generous time off.'
    }
  ];

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
              <Briefcase className="w-8 h-8 text-indigo-400 mr-3" />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Careers at ProposalGen
              </h1>
            </div>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join us in our mission to empower freelancers and businesses worldwide with AI-powered tools that help them succeed.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.button
                onClick={() => window.open('/careers', '_blank')}
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Open Positions
              </motion.button>
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-6 py-3 bg-slate-700 text-gray-300 rounded-lg font-medium hover:bg-slate-600 hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Why Join Us */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Why Join ProposalGen?
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We're building the future of freelance work, and we're looking for talented people to help us get there.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Open Positions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Open Positions
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            We're always looking for talented people to join our team. Check out our current openings below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {positions.map((position, index) => (
            <motion.div
              key={position.title}
              className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 hover:border-indigo-500 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {position.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3 h-3" />
                      {position.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {position.location}
                    </span>
                    <span className="px-2 py-1 bg-slate-700 rounded text-xs">
                      {position.type}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-gray-300 mb-4 leading-relaxed">
                {position.description}
              </p>
              <motion.button
                onClick={() => window.open(`mailto:careers@proposalgen.com?subject=Application for ${position.title}&body=I'm interested in the ${position.title} position.`, '_blank')}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Apply Now
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Culture Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          className="bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Our Culture
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              We believe in building a diverse, inclusive, and supportive environment where everyone can do their best work. 
              We value curiosity, collaboration, and a commitment to excellence in everything we do.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                'Innovation First',
                'Customer Obsessed', 
                'Team Player'
              ].map((value, index) => (
                <motion.div
                  key={value}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.3 + index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-indigo-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {value}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Don't See What You're Looking For?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            We're always interested in hearing from talented people. Send us your resume and let us know how you can contribute to our mission.
          </p>
          <motion.button
            onClick={() => window.open('mailto:careers@proposalgen.com?subject=Resume Submission&body=I would like to submit my resume for consideration.', '_blank')}
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Send Us Your Resume
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Careers;
