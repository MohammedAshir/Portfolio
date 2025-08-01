import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import TiltCard from './TiltCard';
import fodomevideo from '../assets/videos/fodomevideo.mp4';
import mutualFundImage1 from '../assets/images/msl-1.png';
import mutualFundImage2 from '../assets/images/msl-2.png';
import mutualFundImage3 from '../assets/images/msl-3.png';
import mutualFundImage4 from '../assets/images/msl-4.png';
import mutualFundImage5 from '../assets/images/msl-5.png';
import mutualFundImage6 from '../assets/images/msl-6.png';
import dueTrackerImage1 from '../assets/images/due-1.png';
import dueTrackerImage2 from '../assets/images/due-2.png';
import dueTrackerImage3 from '../assets/images/due-3.png';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [iframeLoaded, setIframeLoaded] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = useMemo(() => [
    {
      id: 1,
      title: "MakoShark - E-commerce Platform",
      description: "A full-stack MERN e-commerce platform with JWT authentication, admin dashboard, and inventory management system.",
      tags: ["React", "Node.js", "MongoDB", "E-commerce"],
      preview: "https://makoshark.netlify.app",
      type: "client",
      showCode: false,
      featured: true,
      techStack: ["React.js", "Node.js", "MongoDB", "Express.js", "JWT", "Stripe"],
      category: "web"
    },
    {
      id: 2,
      title: "Mutual Fund Investment System",
      description: "Comprehensive investment tracking platform with real-time analytics, portfolio management, and performance insights.",
      tags: ["React", "Firebase", "Finance", "Analytics"],
      images: [mutualFundImage1, mutualFundImage2, mutualFundImage3, mutualFundImage4, mutualFundImage5, mutualFundImage6],
      type: "client",
      showCode: false,
      confidential: true,
      featured: true,
      techStack: ["React.js", "Firebase", "Chart.js", "Material-UI"],
      category: "web"
    },
    {
      id: 3,
      title: "Due Tracker - Restaurant Management",
      description: "Next.js application for tracking customer dues, payments, and generating comprehensive financial reports.",
      tags: ["Next.js", "Business", "Finance"],
      images: [dueTrackerImage1, dueTrackerImage2, dueTrackerImage3],
      type: "client",
      showCode: false,
      confidential: true,
      techStack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB"],
      category: "web"
    },
    {
      id: 4,
      title: "Majma Technologies",
      description: "Corporate website for IT company providing digital solutions across the GCC region with modern UI/UX.",
      tags: ["React", "Corporate", "Responsive"],
      preview: "https://majmatechnologies.com",
      type: "client",
      showCode: false,
      techStack: ["React.js", "Tailwind CSS", "Framer Motion"],
      category: "web"
    },
    {
      id: 5,
      title: "Lassi Hut - Cafe Website",
      description: "Interactive cafe website with menu display, contact forms, and Google Maps integration.",
      tags: ["JavaScript", "HTML/CSS", "Maps API"],
      preview: "https://lassihut.netlify.app",
      type: "personal",
      showCode: true,
      techStack: ["HTML5", "CSS3", "JavaScript", "Google Maps API"],
      category: "web"
    },
    {
      id: 6,
      title: "Fodome - Food Waste Reduction",
      description: "Flutter mobile application for managing and reducing food waste with Firebase backend and real-time notifications.",
      tags: ["Flutter", "Firebase", "Mobile"],
      video: fodomevideo,
      github: "https://github.com/MohammedAshir/fultterfodome",
      type: "personal",
      showCode: true,
      featured: true,
      techStack: ["Flutter", "Firebase", "Google Maps API", "Push Notifications"],
      category: "mobile"
    }
  ], []);

  const filters = [
    { id: 'all', label: 'All Projects', icon: '🚀' },
    { id: 'web', label: 'Web Apps', icon: '🌐' },
    { id: 'mobile', label: 'Mobile', icon: '📱' },
    { id: 'featured', label: 'Featured', icon: '⭐' }
  ];

  const handleIframeLoad = (id) => {
    setIframeLoaded(prev => ({ ...prev, [id]: true }));
  };

  const ImageSlider = ({ images, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (images.length > 1) {
        const interval = setInterval(() => {
          setCurrentIndex(prevIndex =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
          );
        }, 4000);
        return () => clearInterval(interval);
      }
    }, [images.length]);

    return (
      <div className="relative h-64 w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <img
              src={images[currentIndex]}
              alt={`${title} preview ${currentIndex + 1}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>
        
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white w-8' : 'bg-white/50 w-2'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    if (activeFilter === 'featured') return projects.filter(p => p.featured);
    return projects.filter(project => project.category === activeFilter);
  }, [activeFilter, projects]);

  return (
    <section 
      ref={containerRef}
      id="projects" 
      className="relative py-24 px-4 sm:px-8 overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.1) 0%, rgba(244, 244, 245, 0.8) 50%, rgba(244, 244, 245, 1) 100%)`
      }}
    >
      {/* Animated background elements */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        style={{ y }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-block mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 rounded-full text-sm font-medium border border-purple-200">
              ✨ Featured Work
            </span>
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent">
              Selected
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            A collection of projects that showcase my expertise in full-stack development,
            from concept to deployment.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
              }`}
            >
              <span className="text-lg">{filter.icon}</span>
              {filter.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  layout: { duration: 0.4 }
                }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                className={`group relative bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 ${
                  project.featured ? 'lg:col-span-2 xl:col-span-1' : ''
                }`}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-20">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      ⭐ Featured
                    </span>
                  </div>
                )}

                {/* Project Preview */}
                <div className="relative overflow-hidden">
                  {project.video ? (
                    <div className="relative h-64">
                      <video
                        src={project.video}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        controls={hoveredProject === project.id}
                        muted
                        autoPlay={hoveredProject === project.id}
                        loop
                        playsInline
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </div>
                  ) : project.images ? (
                    <ImageSlider images={project.images} title={project.title} />
                  ) : project.preview ? (
                    <div className="relative h-64 overflow-hidden">
                      {!iframeLoaded[project.id] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                          <div className="flex flex-col items-center gap-3">
                            <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
                            <span className="text-gray-500 font-medium">Loading preview...</span>
                          </div>
                        </div>
                      )}
                      <iframe
                        src={project.preview}
                        title={`Preview of ${project.title}`}
                        className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${
                          iframeLoaded[project.id] ? 'opacity-100' : 'opacity-0'
                        }`}
                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                        referrerPolicy="no-referrer"
                        onLoad={() => handleIframeLoad(project.id)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                    </div>
                  ) : (
                    <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gray-300 rounded-full mb-4 mx-auto flex items-center justify-center">
                          <span className="text-2xl">🚀</span>
                        </div>
                        <span className="text-gray-500 font-medium">Preview Coming Soon</span>
                      </div>
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-t from-purple-900/50 via-transparent to-transparent flex items-end p-6 pointer-events-none"
                  >
                    <div className="text-white">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-sm opacity-90">{project.description}</p>
                    </div>
                  </motion.div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                          project.type === 'client'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {project.type === 'client' ? '👤 Client Project' : '🚀 Personal Project'}
                        </span>
                        {project.confidential && (
                          <span className="text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-medium">
                            🔒 Confidential
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    {project.preview && (
                      <motion.a
                        href={project.preview}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                      </motion.a>
                    )}
                    {project.github && project.showCode && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg font-medium text-sm hover:bg-gray-800 transition-all duration-300"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Code
                      </motion.a>
                    )}
                    {project.confidential && !project.preview && (
                      <div className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-500 px-4 py-2.5 rounded-lg font-medium text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Private Project
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-block p-8 bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm rounded-2xl border border-gray-200 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Ready to start your project?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Let's collaborate and bring your ideas to life with cutting-edge technology.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300"
            >
              Let's Talk
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;