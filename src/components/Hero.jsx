import { motion } from 'framer-motion';
import { FaArrowDown, FaGithub, FaLinkedin, FaFileDownload } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { Link } from 'react-scroll';
import resumePDF from '../assets/MohammedAshir_Resume.pdf'; // Adjust path as needed
import { useState } from 'react';
import profilePhoto from '../assets/images/ashir.jpg';

const Hero = () => {
  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/MohammedAshir', name: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/mohammedashir/', name: 'LinkedIn' },
    { icon: <HiOutlineMail />, url: 'mailto:ashashir7@gmail.com', name: 'Email' }
  ];
  const [imageError, setImageError] = useState(false);


  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-indigo-900 to-purple-800 text-white p-8 overflow-hidden">
      {/* Animated background elements */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 overflow-hidden"
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              rotate: Math.random() * 360
            }}
            animate={{
              x: [null, Math.random() * 100 - 50],
              y: [null, Math.random() * 100 - 50],
              rotate: [null, Math.random() * 360],
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute text-4xl opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            {['</>', '{ }', '=>', ';', '()', '[]'][i % 6]}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full"
      >
        <motion.div whileHover={{ scale: 1.02 }} className="inline-block mb-6">
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-indigo-700 border-4 border-yellow-300 overflow-hidden mx-auto shadow-xl">
        {imageError ? (
          <div className="w-full h-full flex items-center justify-center text-4xl text-white">
            MA
          </div>
        ) : (
          <img 
            src={profilePhoto}
            alt="Mohammed Ashir"
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        )}
      </div>
    </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
          Hi, I'm <span className="text-yellow-300 bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">Mohammed Ashir</span>
        </h1>
        
        <motion.p 
          className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-indigo-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Full Stack Developer | Problem Solver | Tech Enthusiast
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12 w-full max-w-md mx-auto">
  <motion.a
    href={resumePDF}
    download="Mohammed_Ashir_Resume.pdf"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 text-indigo-900 rounded-lg font-semibold shadow-lg hover:shadow-yellow-300/30 transition-all w-full sm:w-auto"
  >
    <FaFileDownload /> Download Resume
  </motion.a>
  
  <Link 
    to="contact" 
    smooth={true}
    duration={500}
    offset={-70}
    className="w-full sm:w-auto"
  >
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-yellow-300 text-yellow-300 rounded-lg font-semibold shadow-lg hover:bg-yellow-300/10 transition-all w-full"
    >
      Contact Me
    </motion.button>
  </Link>
</div>

        {/* Social Links */}
        <motion.div 
          className="flex justify-center gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="text-2xl text-white hover:text-yellow-300 transition-colors"
              aria-label={link.name}
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Down Button */}
        <Link 
          to="projects"
          smooth={true}
          duration={500}
          offset={-70}
          className="cursor-pointer inline-block"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            whileHover={{ scale: 1.2 }}
            className="mt-4"
          >
            <FaArrowDown 
              className="text-3xl mx-auto text-yellow-300" 
              aria-label="Scroll to projects"
            />
            <motion.p
              className="text-sm mt-2 text-yellow-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              View My Work
            </motion.p>
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;