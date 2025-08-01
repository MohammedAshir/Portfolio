import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaCode, FaShoppingCart, FaCog, FaRocket } from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi';
import TiltCard from './TiltCard';

const UpcomingProjects = () => {
  const upcoming = [
    {
      id: 1,
      title: "RK Plywood, Glass and Hardware E-commerce",
      description: "A comprehensive e-commerce platform for plywood, glass, and hardware products with advanced inventory management.",
      status: "In Production",
      progress: 75,
      type: "client",
      tags: ["web", "ecommerce", "React", "Java Spring"],
      previewUrl: "https://rkply.netlify.app",
      icon: <FaShoppingCart className="text-purple-400 text-2xl" />,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Production':
        return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white';
      case 'Completed':
        return 'bg-gradient-to-r from-green-400 to-emerald-500 text-white';
      case 'Planning':
        return 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white';
      default:
        return 'bg-gradient-to-r from-gray-400 to-gray-500 text-white';
    }
  };

  return (
    <section id="upcoming" className="relative min-h-screen py-20 px-6 sm:px-10 overflow-hidden">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      
      {/* Animated mesh gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/90 to-slate-900/90" />
      
      {/* Floating elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 overflow-hidden"
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: Math.random() * 360,
              scale: 0.5 + Math.random() * 0.5
            }}
            animate={{
              x: [null, Math.random() * window.innerWidth],
              y: [null, Math.random() * window.innerHeight],
              rotate: [null, Math.random() * 360],
              scale: [null, 0.3 + Math.random() * 0.7]
            }}
            transition={{
              duration: 15 + Math.random() * 25,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
            className="absolute opacity-20 text-indigo-300/30"
            style={{
              fontSize: `${1 + Math.random() * 2}rem`,
              filter: 'blur(1px)'
            }}
          >
            {['🚀', '⚡', '💡', '🔧', '⭐', '🎯', '💻', '📱', '🌟', '🔥'][i % 10]}
          </motion.div>
        ))}
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <FaRocket className="text-orange-400 text-2xl" />
            <span className="text-purple-400 font-medium">What's Next</span>
            <FaRocket className="text-orange-400 text-2xl" />
          </motion.div>
          
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-8 leading-tight">
            <motion.span 
              className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "linear" 
              }}
              style={{ backgroundSize: '200% auto' }}
            >
              Coming
            </motion.span>
            <span className="text-white"> Soon</span>
          </h2>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Exciting projects in development that will push the boundaries of web development and user experience.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {upcoming.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <TiltCard
                className="group relative"
                intensity={10}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
                  {/* Card Header */}
                  <div className="relative p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      className={`w-16 h-16 bg-gradient-to-r ${project.color} rounded-2xl flex items-center justify-center shadow-lg`}
                    >
                      {project.icon}
                    </motion.div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                      <motion.span 
                        whileHover={{ scale: 1.05 }}
                        className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(project.status)} shadow-lg`}
                      >
                        {project.status}
                      </motion.span>
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-300 text-lg mb-6 leading-relaxed">{project.description}</p>
                
                {/* Progress Section */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-purple-300 font-semibold">Development Progress</span>
                    <motion.span 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      className="text-white font-bold text-lg"
                    >
                      {project.progress}%
                    </motion.span>
                  </div>
                  <div className="relative w-full bg-white/10 rounded-full h-3 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${project.progress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${project.color} rounded-full relative`}
                    >
                      <motion.div
                        animate={{ x: [-20, 20, -20] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-white/30 rounded-full"
                        style={{ filter: 'blur(4px)' }}
                      />
                    </motion.div>
                  </div>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {project.tags.map((tag, tagIndex) => (
                    <motion.span 
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: tagIndex * 0.1 }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl text-sm font-medium text-purple-200 border border-white/20 hover:border-purple-400/50 transition-all duration-300"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                
                {/* Preview Button */}
                {project.previewUrl && (
                  <motion.a
                    href={project.previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-semibold text-white shadow-xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      <FaExternalLinkAlt className="group-hover:rotate-12 transition-transform" />
                      Visit Preview
                    </span>
                    <motion.div
                      whileHover={{ scale: 1.5, rotate: 90 }}
                      className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity"
                    />
                  </motion.a>
                )}
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl" />
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-pink-500/10 rounded-full blur-lg" />
              </div>
            </TiltCard>
          </motion.div>          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-slate-300 text-lg mb-6">
            Have an exciting project in mind? Let's collaborate and build something amazing together!
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="group px-8 py-4 bg-transparent border-2 border-purple-400 text-purple-400 rounded-xl font-semibold hover:bg-purple-400/10 transition-all duration-300 backdrop-blur-sm"
          >
            <span className="flex items-center gap-3">
              <HiOutlineSparkles className="group-hover:scale-110 transition-transform" />
              Let's Discuss Your Project
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
      <div className="absolute top-1/2 right-4 w-16 h-16 bg-pink-500/10 rounded-full blur-lg" />
    </section>
  );
};

export default UpcomingProjects;