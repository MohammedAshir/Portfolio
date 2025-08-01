import { motion } from 'framer-motion';
import { FaFileDownload, FaGraduationCap, FaBriefcase, FaProjectDiagram, FaCertificate } from 'react-icons/fa';
import { HiOutlineSparkles } from 'react-icons/hi';
import resumePDF from '../assets/MohammedAshir_Resume.pdf';
import TiltCard from './TiltCard';

const Resume = () => {
  const timeline = [
    {
      type: 'education',
      title: 'Bachelor of Engineering (B.E), Computer Science',
      institution: 'Visvesvaraya Technological University (VTU)',
      duration: '2017 – 2021',
      description: 'Completed a comprehensive curriculum covering core computer science subjects, laying a strong foundation for software development.',
      icon: <FaGraduationCap className="text-purple-400 text-xl" />,
      color: 'from-purple-500 to-indigo-500'
    },
    {
      type: 'courses',
      title: 'Relevant Courses & Certifications',
      institution: 'IELTS (C1 Level) – English Proficiency (2024)',
      duration: '',
      description: `- MERN Stack Development
- Java with Spring Boot
- Python Programming
- IELTS (C1 Level) – English Proficiency (2024)`,
      icon: <FaCertificate className="text-blue-400 text-xl" />,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      type: 'experience',
      title: 'Software Engineer',
      institution: 'Ray Fit Out Interior, Dubai LLC',
      duration: 'June 2025 – Present',
      description: `Develop and customize Odoo ERP modules using Python to meet specific business requirements.
- Manage containerized ERP deployments using Docker, hosted on cloud platforms including AWS and DigitalOcean.
- Engineer and integrate a Traccar tracking system API for real-time asset and fleet management within Odoo.
- Develop a custom QuickBooks integration API to automate financial data synchronization and streamline invoicing.`,
      icon: <FaBriefcase className="text-emerald-400 text-xl" />,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      type: 'experience',
      title: 'Full-Stack Developer',
      institution: 'NAB Advertising',
      duration: 'Feb 2024 – May 2025',
      description: `Developed and maintained full-stack MERN applications, building scalable REST APIs and responsive UIs with TypeScript and Tailwind CSS.
- Implemented key features including user authentication, payment gateway integration, and role-based access control.
- Managed CI/CD pipelines for automated deployments to cloud services including AWS, Vercel, and Netlify.`,
      icon: <FaBriefcase className="text-pink-400 text-xl" />,
      color: 'from-pink-500 to-rose-500'
    },
    {
      type: 'experience',
      title: 'Software Engineer',
      institution: 'Accenture – AT&T Project',
      duration: 'Jan 2022 – Jan 2024',
      description: `Developed Java-based RESTful services using Spring Boot in a microservices architecture.
- Built and maintained frontend components using React.js with Redux for state management.
- Wrote and maintained unit and integration tests using JUnit and ensured code quality with SonarQube.`,
      icon: <FaBriefcase className="text-green-400 text-xl" />,
      color: 'from-green-500 to-emerald-500'
    },
    {
      type: 'project',
      title: 'MakoShark – Apparel E-commerce',
      institution: 'MERN Stack',
      duration: '2024',
      description: `Full-stack app with JWT auth integration and admin dashboard for inventory & order control.
- Built with MongoDB, Express.js, React.js, and Node.js
- Features include user authentication, payment processing, and inventory management`,
      icon: <FaProjectDiagram className="text-orange-400 text-xl" />,
      color: 'from-orange-500 to-amber-500'
    },
    {
      type: 'project',
      title: 'Fodome – Food Waste Reduction App',
      institution: 'Flutter + Firebase',
      duration: '2023',
      description: `Personal app to track and reduce food waste with expiry reminders.
- Firebase used for auth, cloud storage, and real-time database
- Cross-platform mobile application built with Flutter`,
      icon: <FaProjectDiagram className="text-teal-400 text-xl" />,
      color: 'from-teal-500 to-cyan-500'
    },
    {
      type: 'project',
      title: 'Mutual Fund Investment System',
      institution: 'React + Firebase',
      duration: '2021',
      description: `Tracks mutual fund investments with performance analytics.
- Real-time data and dashboard using Firebase backend
- Built with React.js for responsive user interface`,
      icon: <FaProjectDiagram className="text-indigo-400 text-xl" />,
      color: 'from-indigo-500 to-purple-500'
    },
  ];

  return (
    <section id="resume" className="relative min-h-screen py-20 px-6 sm:px-10 overflow-hidden">
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
        {[...Array(15)].map((_, i) => (
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
            {['📚', '💼', '🚀', '⭐', '🎯', '💡', '🔧', '📊', '💻', '🎓'][i % 10]}
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
            <HiOutlineSparkles className="text-yellow-400 text-2xl" />
            <span className="text-purple-400 font-medium">Professional Journey</span>
            <HiOutlineSparkles className="text-yellow-400 text-2xl" />
          </motion.div>
          
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black mb-8 leading-tight">
            <span className="text-white">My </span>
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
              Journey
            </motion.span>
          </h2>

          <motion.a
            href={resumePDF}
            download="Mohammed_Ashir_Resume_New.pdf"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl font-semibold text-white shadow-xl hover:shadow-purple-500/25 transition-all duration-300 overflow-hidden"
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
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 sm:left-1/2 w-1 h-full bg-gradient-to-b from-purple-500 via-pink-500 to-indigo-500 rounded-full transform sm:-translate-x-1/2 opacity-60"></div>

          {timeline.map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`mb-16 flex ${index % 2 === 0 ? 'sm:justify-start' : 'sm:justify-end'} justify-start`}
            >
              {/* Timeline dot - Desktop */}
              <div className={`hidden sm:flex items-center ${index % 2 === 0 ? 'order-1 ml-8' : 'order-0 mr-8'}`}>
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center shadow-lg border-4 border-white/20`}
                >
                  {item.icon}
                </motion.div>
              </div>

              {/* Timeline dot - Mobile */}
              <div className="sm:hidden absolute left-8 -translate-x-1/2">
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center shadow-lg border-4 border-white/20`}
                >
                  {item.icon}
                </motion.div>
              </div>

              {/* Content card */}
              <TiltCard
                className={`w-full sm:w-5/12 ml-16 sm:ml-0`}
                intensity={8}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="sm:hidden">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                      {item.institution && (
                        <p className="text-purple-300 font-semibold mb-1">{item.institution}</p>
                      )}
                      {item.duration && (
                        <motion.span 
                          whileHover={{ scale: 1.05 }}
                          className="inline-block px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-purple-200 text-sm border border-purple-400/30 mb-3"
                        >
                          {item.duration}
                        </motion.span>
                      )}
                    </div>
                  </div>
                  <p className="text-slate-300 whitespace-pre-line leading-relaxed">{item.description}</p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl" />
      <div className="absolute bottom-32 right-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
      <div className="absolute top-1/2 left-4 w-16 h-16 bg-pink-500/10 rounded-full blur-lg" />
    </section>
  );
};

export default Resume;