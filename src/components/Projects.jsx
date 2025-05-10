import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import fodomevideo from '../assets/videos/fodomevideo.mp4';
import mutualFundImage1 from '../assets/images/msl-1.png'; // Add your actual image imports
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

  // Memoized projects data to prevent unnecessary recalculations
  const projects = useMemo(() => [
    {
      id: 1,
      title: "Belt & Wallet E-commerce Website",
      description: "An online store for belts and wallets with e-commerce features using MERN stack.",
      tags: ["web", "ecommerce", "MERN"],
      preview: "https://makoshark.netlify.app",
      type: "client",
      showCode: false
    },
    {
      id: 2,
      title: "Mutual Fund Investment System",
      description: "A comprehensive system for tracking mutual fund investments with analytics dashboard.",
      tags: ["web", "finance", "React"],
      images: [mutualFundImage1, mutualFundImage2, mutualFundImage3, mutualFundImage4, mutualFundImage5, mutualFundImage6],
      type: "client",
      showCode: false,
      confidential: true
    },
    {
      id: 3,
      title: "Cafe/Restaurant Due Tracker",
      description: "A system for tracking customer dues and payments with reporting features.",
      tags: ["web", "business", "React"],
      images: [dueTrackerImage1, dueTrackerImage2, dueTrackerImage3],
      type: "client",
      showCode: false,
      confidential: true
    },
    {
      id: 4,
      title: "Majma Technologies Website",
      description: "A IT company providing digital solutions across the GCC region",
      tags: ["web", "technology", "React"],
      preview: "https://majmatechnologies.com",
      type: "client",
      showCode: false
    },
    {
      id: 5,
      title: "Lassi Hut Website",
      description: "A Menu and Contact page built for a local cafe using JavaScript.",
      tags: ["web", "javascript"],
      preview: "https://lassihut.netlify.app",
      type: "client",
      showCode: true
    },
    {
      id: 6,
      title: "Fodome - Food Waste App",
      description: "A Flutter app for managing and reducing food waste with Firebase backend.",
      tags: ["mobile", "flutter", "firebase"],
      video: fodomevideo,
      github: "https://github.com/MohammedAshir/fultterfodome",
      type: "personal",
      showCode: true
    }
  ], []);

  const handleIframeLoad = (id) => {
    setIframeLoaded(prev => ({ ...prev, [id]: true }));
  };

  const ImageSlider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      if (images.length > 1) {
        const interval = setInterval(() => {
          setCurrentIndex(prevIndex =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
          );
        }, 3000);
        return () => clearInterval(interval);
      }
    }, [images.length]);

    return (
      <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              zIndex: index === currentIndex ? 10 : 0
            }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={image}
              alt={`Project preview ${index}`}
              className="h-full w-full object-cover"
            />
          </motion.div>
        ))}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-20">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${index === currentIndex ? 'bg-white w-4' : 'bg-white/50'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const filteredProjects = useMemo(() =>
    activeFilter === 'all'
      ? projects
      : projects.filter(project => project.tags.includes(activeFilter)),
    [activeFilter, projects]
  );

  return (
    <section id="projects" className="py-20 px-4 sm:px-8 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">
          My <span className="text-indigo-600">Projects</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          {['all', 'web', 'mobile', 'ecommerce', 'finance', 'business'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 sm:px-6 py-1 sm:py-2 rounded-full capitalize text-sm sm:text-base transition-all ${activeFilter === filter
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-800 hover:bg-gray-200'
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Preview section */}
                {project.video ? (
                  <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                    <video
                      src={project.video}
                      className="w-full h-full object-cover"
                      controls
                      muted
                      autoPlay
                      loop
                      playsInline
                    />
                  </div>
                ) : project.images ? (
                  <ImageSlider images={project.images} />
                ) : project.preview ? (
                  <div className="relative h-48 overflow-hidden">
                    {!iframeLoaded[project.id] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="animate-pulse text-gray-500">Loading preview...</div>
                      </div>
                    )}
                    <iframe
                      src={project.preview}
                      title={`Preview of ${project.title}`}
                      className={`w-full h-full ${iframeLoaded[project.id] ? 'block' : 'hidden'}`}
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                      referrerPolicy="no-referrer"
                      onLoad={() => handleIframeLoad(project.id)}
                    />
                    <a
                      href={project.preview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20"
                    >
                      <div className="bg-white/90 text-indigo-600 px-4 py-2 rounded-full font-medium flex items-center gap-2">
                        Open in New Tab
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </a>
                  </div>
                ) : (
                  <div className="h-48 bg-gray-100 flex items-center justify-center rounded-t-xl">
                    <span className="text-gray-400">Preview not available</span>
                  </div>
                )}

                <div className="p-5 sm:p-6">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg sm:text-xl font-bold">{project.title}</h3>
                    <div className="flex gap-2">
                      {project.confidential && (
                        <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800">
                          Confidential
                        </span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded-full ${project.type === 'client'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-green-100 text-green-800'
                        }`}>
                        {project.type}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4">{project.description}</p>

                  {/* Action buttons */}
                  <div className="flex gap-3 mb-3">
                    {project.preview && (
                      <a
                        href={project.preview}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                    {project.github && project.showCode && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm bg-gray-800 hover:bg-gray-900 text-white px-3 py-1 rounded transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        Code
                      </a>
                    )}
                    {project.confidential && (
                      <span className="flex items-center gap-1 text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Private
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 sm:px-3 py-1 bg-gray-100 rounded-full text-xs sm:text-sm capitalize"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;