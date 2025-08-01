import { motion } from 'framer-motion';
import { FaArrowDown, FaGithub, FaLinkedin, FaFileDownload, FaCode, FaLaptopCode, FaServer, FaCogs, FaDatabase, FaCloud } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineSparkles } from 'react-icons/hi';
import { Link } from 'react-scroll';
import resumePDF from '../assets/MohammedAshir_Resume.pdf';
import { useState, useEffect } from 'react';
import profilePhoto from '../assets/images/ashir.jpg';
import TypingCode from './TypingCode';

const Hero = () => {
  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/MohammedAshir', name: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/mohammedashir/', name: 'LinkedIn' },
    { icon: <HiOutlineMail />, url: 'mailto:ashashir7@gmail.com', name: 'Email' }
  ];
  const [imageError, setImageError] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const skills = [
    { 
      icon: <FaCode />, 
      name: 'Frontend', 
      desc: 'React, TypeScript, Next.js',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: <FaServer />, 
      name: 'Backend', 
      desc: 'Python, Node.js, Java Spring',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      icon: <FaCogs />, 
      name: 'ERP & Systems', 
      desc: 'Odoo, Docker, AWS',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      icon: <FaDatabase />, 
      name: 'Databases', 
      desc: 'PostgreSQL, MySQL, MongoDB',
      color: 'from-orange-500 to-red-500'
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden pt-20 md:pt-24">
      {/* Dynamic gradient background that follows mouse */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`
        }}
      />
      
      {/* Animated mesh gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/90 via-purple-900/90 to-slate-900/90" />
      
      {/* Advanced floating elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 overflow-hidden"
      >
        {[...Array(30)].map((_, i) => (
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
              duration: 20 + Math.random() * 30,
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
            {['</>', '{ }', '=>', ';', '()', '[]', 'fn', 'const', 'API', 'DB'][i % 10]}
          </motion.div>
        ))}
      </motion.div>

      <div className="relative z-10 w-full px-6 sm:px-8">
        {/* Profile section with advanced animations */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.div 
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="inline-block mb-6 relative"
          >
            <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 p-1 shadow-2xl shadow-purple-500/25">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 relative">
                {/* Animated ring around profile */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-transparent border-t-purple-400 border-r-indigo-400 rounded-full"
                />
                {imageError ? (
                  <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white">
                    MA
                  </div>
                ) : (
                  <img 
                    src={profilePhoto}
                    alt="Mohammed Ashir"
                    className="w-full h-full object-cover object-center rounded-full"
                    onError={() => setImageError(true)}
                    style={{ maxWidth: '100%', maxHeight: '100%' }}
                  />
                )}
              </div>
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2 shadow-lg"
            >
              <HiOutlineSparkles className="text-white text-lg" />
            </motion.div>
          </motion.div>

          {/* Enhanced typography */}
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="text-white">Hi, I'm </span>
            <br className="sm:hidden" />
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
              Mohammed Ashir
            </motion.span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-8"
          >
            <p className="text-xl md:text-2xl lg:text-3xl font-light text-slate-300 mb-4 max-w-4xl mx-auto">
              Software Engineer
            </p>
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Specializing in ERP systems, full-stack development, and cloud solutions.
              4+ years of professional experience building enterprise applications.
            </p>
          </motion.div>

          {/* Skills showcase */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 group overflow-hidden"
              >
                {/* Gradient overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />
                
                {/* Icon with gradient */}
                <motion.div 
                  className={`text-2xl mb-3 bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {skill.icon}
                </motion.div>
                
                <h3 className="text-white font-semibold mb-2 text-base">{skill.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{skill.desc}</p>
                
                {/* Subtle glow effect */}
                <motion.div
                  className={`absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br ${skill.color} rounded-full opacity-20 blur-sm group-hover:opacity-40 transition-opacity`}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced action buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.a
            href={resumePDF}
            download="Mohammed_Ashir_Resume.pdf"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-semibold text-white shadow-xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              <FaFileDownload className="group-hover:rotate-12 transition-transform" />
              Download Resume
            </span>
            <motion.div
              whileHover={{ scale: 1.5, rotate: 90 }}
              className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-20 transition-opacity"
            />
          </motion.a>
          
          <Link 
            to="contact" 
            smooth={true}
            duration={500}
            offset={-70}
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-transparent border-2 border-purple-400 text-purple-400 rounded-xl font-semibold hover:bg-purple-400/10 transition-all duration-300 backdrop-blur-sm"
            >
              <span className="flex items-center gap-3">
                <HiOutlineMail className="group-hover:scale-110 transition-transform" />
                Let's Connect
              </span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Enhanced social links */}
        <motion.div 
          className="flex justify-center gap-8 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                y: -8, 
                scale: 1.3,
                boxShadow: "0 10px 30px rgba(168, 85, 247, 0.3)"
              }}
              whileTap={{ scale: 0.9 }}
              className="relative p-4 text-2xl text-slate-400 hover:text-purple-400 transition-all duration-300 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-400/50"
              aria-label={link.name}
            >
              {link.icon}
              <motion.div
                whileHover={{ scale: 1.2, opacity: 1 }}
                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 transition-all"
              >
                {link.name}
              </motion.div>
            </motion.a>
          ))}
        </motion.div>

        {/* Enhanced scroll indicator */}
        <Link 
          to="projects"
          smooth={true}
          duration={500}
          offset={-70}
          className="cursor-pointer inline-block"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            whileHover={{ scale: 1.2 }}
            className="group"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="w-1 h-3 bg-purple-400 rounded-full mt-2"
                />
              </div>
              <motion.p
                className="text-sm text-purple-400 font-medium group-hover:text-purple-300 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                Explore My Work
              </motion.p>
            </div>
          </motion.div>
        </Link>
        
        {/* Floating Code Animation */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="fixed bottom-8 right-8 z-20 hidden lg:block"
        >
          <TypingCode 
            lines={[
              "const developer = {",
              "  name: 'Mohammed Ashir',", 
              "  role: 'Software Engineer',",
              "  skills: ['Python', 'Odoo', 'React'],",
              "  location: 'Dubai, UAE',",
              "  passion: 'Building ERP solutions'",
              "};"
            ]}
            speed={80}
            className="w-80"
          />
        </motion.div>
      </div>

      {/* Advanced decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-4 w-16 h-16 bg-pink-500/10 rounded-full blur-lg" />
    </section>
  );
};
export default Hero;