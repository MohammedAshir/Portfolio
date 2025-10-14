import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin, FaFileDownload } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import { Link } from 'react-scroll';
import resumePDF from '../assets/MohammedAshir_Resume.pdf';
import { useState, useRef } from 'react';
import profilePhoto from '../assets/images/ashir.jpg';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const socialLinks = [
    { icon: <FaGithub />, url: 'https://github.com/MohammedAshir', name: 'GitHub' },
    { icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/mohammedashir/', name: 'LinkedIn' },
    { icon: <HiOutlineMail />, url: 'mailto:ashashir7@gmail.com', name: 'Email' }
  ];
  
  const [imageError, setImageError] = useState(false);

  const expertise = [
    { 
      area: 'Enterprise Systems', 
      detail: 'ERP Development & Integration',
      icon: '🏢'
    },
    { 
      area: 'Full-Stack Development', 
      detail: 'React, Python, Node.js',
      icon: '⚡'
    },
    { 
      area: 'Cloud Infrastructure', 
      detail: 'AWS, Docker, DevOps',
      icon: '☁️'
    },
    { 
      area: 'Business Solutions', 
      detail: '4+ Years Professional Experience',
      icon: '📈'
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="section min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <motion.div 
        style={{ y, opacity }}
        className="container mx-auto text-center relative z-10"
      >
        {/* Professional Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-16"
        >
          {/* Profile Image with 3D Effect */}
          <motion.div 
            className="inline-block mb-8 transform-3d"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full mx-auto p-1 bg-gradient-to-r from-gray-200 to-gray-300 shadow-xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-white relative">
                  {imageError ? (
                    <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-800">
                      MA
                    </div>
                  ) : (
                    <img 
                      src={profilePhoto}
                      alt="Mohammed Ashir - Software Engineer"
                      className="w-full h-full object-cover object-center"
                      onError={() => setImageError(true)}
                    />
                  )}
                </div>
              </div>
              
              {/* Status Indicator */}
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"
                title="Available for hire"
              />
            </div>
          </motion.div>

          {/* Typography */}
          <motion.h1 
            className="display-xl mb-6 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Mohammed Ashir
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="heading-xl text-gray-700 mb-4">
              Software Engineer
            </h2>
            <p className="body-lg max-w-2xl mx-auto">
              Building scalable enterprise solutions and full-stack applications. 
              Specialized in ERP systems, cloud infrastructure, and modern web technologies.
            </p>
          </motion.div>
        </motion.div>

        {/* Expertise Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="grid grid-2 max-w-4xl mx-auto mb-12"
        >
          {expertise.map((item, index) => (
            <motion.div
              key={item.area}
              className="executive-card p-6 text-left transform-3d rotate-3d"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl" role="img" aria-label={item.area}>
                  {item.icon}
                </span>
                <div>
                  <h3 className="heading-xl text-gray-900 mb-1">{item.area}</h3>
                  <p className="body-sm text-gray-600">{item.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <motion.a
            href={resumePDF}
            download="Mohammed_Ashir_Resume.pdf"
            className="btn-primary"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaFileDownload />
            Download Resume
          </motion.a>
          
          <Link to="projects" smooth={true} duration={500} offset={-70}>
            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View My Work
            </motion.button>
          </Link>
        </motion.div>

        {/* Social Links */}
        <motion.div 
          className="flex justify-center gap-4 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          {socialLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 hover:text-gray-900 hover:border-gray-300 transition-all duration-300 shadow-md hover:shadow-lg"
              whileHover={{ y: -3, scale: 1.05 }}
              aria-label={link.name}
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll Indicator */}
        <Link to="projects" smooth={true} duration={500} offset={-70}>
          <motion.div
            className="inline-flex flex-col items-center gap-2 cursor-pointer group"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="w-5 h-8 border-2 border-gray-400 rounded-full flex justify-center relative group-hover:border-gray-600 transition-colors">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                className="w-1 h-2 bg-gray-500 rounded-full mt-1.5 group-hover:bg-gray-700 transition-colors"
              />
            </div>
            <span className="body-sm text-gray-500 group-hover:text-gray-700 transition-colors">
              Explore
            </span>
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;