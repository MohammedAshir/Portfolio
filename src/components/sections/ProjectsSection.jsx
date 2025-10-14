import { motion } from 'framer-motion';
import { useState } from 'react';
import fodomevideo from '../../assets/videos/fodomevideo.mp4';
import mutualFundImage1 from '../../assets/images/msl-1.png';

const ProjectsSection = () => {
  const [hoveredProject, setHoveredProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "MakoShark E-commerce",
      description: "Full-stack MERN platform with authentication & inventory management",
      tags: ["React", "Node.js", "MongoDB"],
      preview: "https://makoshark.netlify.app",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      id: 2,
      title: "Mutual Fund System",
      description: "Investment tracking with real-time analytics & portfolio insights",
      tags: ["React", "Firebase", "Analytics"],
      image: mutualFundImage1,
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      id: 3,
      title: "Fodome - Food Waste",
      description: "Flutter mobile app reducing food waste with real-time notifications",
      tags: ["Flutter", "Firebase"],
      video: fodomevideo,
      gradient: "from-green-600 to-teal-600"
    }
  ];

  return (
    <section className="w-full min-h-screen flex items-center justify-center relative bg-slate-50">
      <div className="container mx-auto px-8 max-w-7xl py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-slate-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600">
            Building scalable solutions that solve real problems
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ 
                y: -10,
                rotateY: 5,
                transition: { duration: 0.3 }
              }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="relative group cursor-pointer"
              style={{ perspective: "1000px" }}
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl transform-gpu transition-all duration-500">
                {project.video ? (
                  <video
                    src={project.video}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay={hoveredProject === project.id}
                    muted
                    loop
                    playsInline
                  />
                ) : project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                ) : project.preview ? (
                  <iframe
                    src={project.preview}
                    title={project.title}
                    className="absolute inset-0 w-full h-full"
                    sandbox="allow-same-origin allow-scripts"
                  />
                ) : null}

                <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-60 mix-blend-multiply`} />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ 
                      y: hoveredProject === project.id ? 0 : 20,
                      opacity: hoveredProject === project.id ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="mb-4"
                  >
                    <div className="flex gap-2 flex-wrap">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  <h3 className="text-3xl font-bold text-white mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-200 text-sm mb-4">
                    {project.description}
                  </p>

                  {project.preview && (
                    <motion.a
                      href={project.preview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-white font-semibold hover:gap-4 transition-all"
                      whileHover={{ x: 5 }}
                    >
                      View Project →
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
