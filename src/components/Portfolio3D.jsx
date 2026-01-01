import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  Stars, 
  Environment,
  MeshDistortMaterial,
  MeshTransmissionMaterial,
  Text,
  Html,
  useTexture,
  Preload
} from '@react-three/drei';
import { Suspense, useRef, useState, useMemo, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import resumePDF from '../assets/MohammedAshir_Resume.pdf';
import profilePhoto from '../assets/images/ashir.jpg';

// Floating geometric shapes for background ambiance
function FloatingGeometry({ position, geometry, color, speed = 1, scale = 1 }) {
  const meshRef = useRef();
  const initialY = position[1];
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15 * speed;
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * 0.5 * speed) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
      {geometry === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
      {geometry === 'torus' && <torusGeometry args={[1, 0.4, 16, 32]} />}
      {geometry === 'torusKnot' && <torusKnotGeometry args={[0.8, 0.25, 100, 16]} />}
      <meshStandardMaterial 
        color={color} 
        metalness={0.9} 
        roughness={0.1}
        transparent
        opacity={0.6}
        wireframe
      />
    </mesh>
  );
}

// Animated gradient sphere in center
function CentralOrb({ activeSection }) {
  const meshRef = useRef();
  const glowRef = useRef();
  
  const colors = {
    home: '#6366f1',
    about: '#10b981',
    experience: '#f59e0b',
    projects: '#ec4899',
    contact: '#06b6d4'
  };

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <group>
      {/* Inner orb */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <MeshDistortMaterial
          color={colors[activeSection] || colors.home}
          metalness={0.8}
          roughness={0.2}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Outer glow */}
      <mesh ref={glowRef} scale={1.5}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial 
          color={colors[activeSection] || colors.home}
          transparent 
          opacity={0.1}
        />
      </mesh>

      {/* Wireframe ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshBasicMaterial color={colors[activeSection] || colors.home} transparent opacity={0.5} />
      </mesh>
      
      {/* Second ring */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[3.5, 0.015, 16, 100]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

// Floating particles
function Particles({ count = 200 }) {
  const points = useRef();
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.02;
      points.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#6366f1" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// Camera controller for smooth transitions
function CameraController({ activeSection }) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 12));
  
  const positions = {
    home: [0, 0, 12],
    about: [6, 2, 10],
    experience: [-6, 2, 10],
    projects: [0, -3, 14],
    contact: [0, 4, 10]
  };

  useFrame(() => {
    const pos = positions[activeSection] || positions.home;
    targetPosition.current.set(pos[0], pos[1], pos[2]);
    camera.position.lerp(targetPosition.current, 0.03);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// 3D Scene
function Scene({ activeSection }) {
  const geometries = useMemo(() => [
    { position: [-8, 4, -5], geometry: 'octahedron', color: '#6366f1', speed: 0.8, scale: 0.8 },
    { position: [10, -3, -8], geometry: 'icosahedron', color: '#10b981', speed: 0.6, scale: 1.2 },
    { position: [-12, -5, -10], geometry: 'torus', color: '#f59e0b', speed: 0.7, scale: 0.6 },
    { position: [8, 6, -6], geometry: 'torusKnot', color: '#ec4899', speed: 0.5, scale: 0.5 },
    { position: [-6, -8, -12], geometry: 'octahedron', color: '#06b6d4', speed: 0.9, scale: 1 },
    { position: [14, 2, -15], geometry: 'icosahedron', color: '#8b5cf6', speed: 0.4, scale: 1.5 },
  ], []);

  return (
    <>
      <color attach="background" args={['#030014']} />
      <fog attach="fog" args={['#030014', 10, 50]} />
      
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ec4899" />
      <pointLight position={[0, 10, 0]} intensity={0.5} color="#10b981" />
      
      <Stars radius={100} depth={50} count={3000} factor={4} fade speed={0.5} />
      <Particles count={150} />
      
      <CentralOrb activeSection={activeSection} />
      
      {geometries.map((geo, i) => (
        <FloatingGeometry key={i} {...geo} />
      ))}
      
      <CameraController activeSection={activeSection} />
    </>
  );
}

// Navigation Component
function Navigation({ activeSection, setActiveSection, isMenuOpen, setIsMenuOpen }) {
  const sections = [
    { id: 'home', label: 'Home', color: '#6366f1' },
    { id: 'about', label: 'About', color: '#10b981' },
    { id: 'experience', label: 'Experience', color: '#f59e0b' },
    { id: 'projects', label: 'Projects', color: '#ec4899' },
    { id: 'contact', label: 'Contact', color: '#06b6d4' },
  ];

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 hidden md:block">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => setActiveSection('home')}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white">
                A
              </div>
              <span className="text-white font-semibold text-lg">Ashir</span>
            </motion.div>

            {/* Nav Links */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1 bg-white/5 backdrop-blur-xl rounded-full p-1.5 border border-white/10"
            >
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSection === section.id
                      ? 'bg-white text-gray-900'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </motion.div>

            {/* Resume Button */}
            <motion.a
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              href={resumePDF}
              download="Mohammed_Ashir_Resume.pdf"
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-white font-medium text-sm hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
            >
              Resume
            </motion.a>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="px-4 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
            onClick={() => { setActiveSection('home'); setIsMenuOpen(false); }}
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm">
              A
            </div>
          </motion.div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center"
          >
            <div className="flex flex-col gap-1.5">
              <motion.span 
                animate={{ rotate: isMenuOpen ? 45 : 0, y: isMenuOpen ? 6 : 0 }}
                className="w-5 h-0.5 bg-white block"
              />
              <motion.span 
                animate={{ opacity: isMenuOpen ? 0 : 1 }}
                className="w-5 h-0.5 bg-white block"
              />
              <motion.span 
                animate={{ rotate: isMenuOpen ? -45 : 0, y: isMenuOpen ? -6 : 0 }}
                className="w-5 h-0.5 bg-white block"
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-4 right-4 bg-black/90 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
            >
              <div className="p-4 space-y-2">
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => { setActiveSection(section.id); setIsMenuOpen(false); }}
                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                      activeSection === section.id
                        ? 'bg-white/20 text-white'
                        : 'text-white/70 hover:bg-white/10'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: section.color }}
                      />
                      {section.label}
                    </span>
                  </motion.button>
                ))}
                <motion.a
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  href={resumePDF}
                  download="Mohammed_Ashir_Resume.pdf"
                  className="block w-full text-center px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white font-medium mt-4"
                >
                  Download Resume
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Section Indicator (Desktop) */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className="group flex items-center gap-3"
          >
            <span className={`text-xs font-medium transition-all opacity-0 group-hover:opacity-100 ${
              activeSection === section.id ? 'opacity-100 text-white' : 'text-white/50'
            }`}>
              {section.label}
            </span>
            <div 
              className={`w-2 h-2 rounded-full transition-all ${
                activeSection === section.id 
                  ? 'scale-150' 
                  : 'scale-100 opacity-50 hover:opacity-100'
              }`}
              style={{ backgroundColor: section.color }}
            />
          </button>
        ))}
      </div>
    </>
  );
}

// Home Content Panel
function HomePanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="text-center px-6"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <div className="w-28 h-28 md:w-36 md:h-36 mx-auto rounded-full p-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <img 
            src={profilePhoto} 
            alt="Mohammed Ashir"
            className="w-full h-full rounded-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 items-center justify-center text-3xl font-bold hidden">
            MA
          </div>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent"
      >
        Mohammed Ashir
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl md:text-2xl text-indigo-300 mb-6 font-light"
      >
        Software Engineer
      </motion.p>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-base md:text-lg text-white/60 max-w-xl mx-auto mb-8 leading-relaxed"
      >
        Building scalable enterprise solutions with 4+ years of experience in 
        full-stack development, cloud architecture, and ERP systems.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center gap-4"
      >
        <a 
          href="https://github.com/MohammedAshir" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
        <a 
          href="https://linkedin.com/in/mohammedashir" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
        <a 
          href="mailto:ashashir7@gmail.com"
          className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:scale-110 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
        </a>
      </motion.div>
    </motion.div>
  );
}

// About Content Panel
function AboutPanel() {
  const skills = [
    { category: 'Frontend', items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'] },
    { category: 'Backend', items: ['Node.js', 'Python', 'Java', 'Spring Boot'] },
    { category: 'Cloud', items: ['AWS', 'Docker', 'CI/CD', 'DigitalOcean'] },
    { category: 'Database', items: ['MongoDB', 'PostgreSQL', 'Firebase', 'Redis'] },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto px-6"
    >
      <div className="bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10 p-6 md:p-10 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-emerald-400">About Me</h2>
        
        <p className="text-white/80 text-base md:text-lg leading-relaxed mb-8">
          Results-driven Software Engineer with <span className="text-emerald-400 font-semibold">4+ years</span> of 
          experience building and deploying scalable full-stack applications, cloud-based systems, 
          and enterprise solutions. Passionate about creating efficient, maintainable code that solves real business problems.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 rounded-2xl p-4 border border-white/10"
            >
              <h3 className="text-emerald-400 font-semibold text-sm mb-3">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.items.map((item) => (
                  <span key={item} className="text-xs text-white/70 bg-white/10 px-2 py-1 rounded-lg">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Experience Content Panel
function ExperiencePanel() {
  const experiences = [
    {
      company: 'Ray Fit Out Interior',
      role: 'Software Engineer',
      period: 'May 2025 - Present',
      description: 'Developing full-stack ERP solutions, integrated third-party payment systems, and managing AWS deployments.',
      color: '#f59e0b'
    },
    {
      company: 'NAB Advertising',
      role: 'Full-stack Developer',
      period: 'Feb 2024 - Apr 2025',
      description: 'Built React-based e-commerce platforms and integrated APIs for SEO and analytics tracking.',
      color: '#06b6d4'
    },
    {
      company: 'Accenture-AT&T',
      role: 'Software Engineer',
      period: 'Jan 2022 - Jan 2024',
      description: 'Designed secure systems, developed REST APIs, and containerized applications using Docker.',
      color: '#84cc16'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto px-6"
    >
      <div className="bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10 p-6 md:p-10 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-amber-400">Experience</h2>
        
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative pl-6 border-l-2"
              style={{ borderColor: exp.color }}
            >
              <div 
                className="absolute -left-2 top-0 w-4 h-4 rounded-full"
                style={{ backgroundColor: exp.color }}
              />
              <h3 className="text-lg md:text-xl font-bold text-white">{exp.company}</h3>
              <p className="text-sm font-medium" style={{ color: exp.color }}>{exp.role}</p>
              <p className="text-xs text-white/50 mb-2">{exp.period}</p>
              <p className="text-sm text-white/70">{exp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Projects Content Panel
function ProjectsPanel() {
  const projects = [
    {
      title: 'MakoShark E-commerce',
      description: 'Full-stack MERN platform with JWT auth, admin dashboard & AI chatbot support',
      tags: ['React', 'Node.js', 'MongoDB', 'AI'],
      link: 'https://makoshark.netlify.app',
      color: '#ec4899'
    },
    {
      title: 'Mutual Fund System',
      description: 'Investment tracking with real-time performance analytics',
      tags: ['React', 'Firebase', 'Analytics'],
      color: '#3b82f6'
    },
    {
      title: 'Fodome - Food Waste',
      description: 'Flutter mobile app reducing food waste with real-time notifications',
      tags: ['Flutter', 'Firebase', 'Mobile'],
      color: '#10b981'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto px-6"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-pink-400 text-center">Featured Projects</h2>
      
      <div className="grid md:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 p-6 shadow-2xl hover:border-pink-500/30 transition-all cursor-pointer group"
          >
            <div 
              className="w-10 h-10 rounded-xl mb-4 flex items-center justify-center"
              style={{ backgroundColor: project.color + '30' }}
            >
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: project.color }}
              />
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-white/60 mb-4">{project.description}</p>
            
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="text-xs px-2 py-1 rounded-lg bg-white/10 text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>

            {project.link && (
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 text-sm text-pink-400 hover:text-pink-300 transition-colors"
              >
                View Project 
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Contact Content Panel
function ContactPanel() {
  const contacts = [
    { icon: 'email', label: 'Email', value: 'ashashir7@gmail.com', href: 'mailto:ashashir7@gmail.com' },
    { icon: 'phone', label: 'Phone', value: '+971 569897765', href: 'tel:+971569897765' },
    { icon: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/mohammedashir', href: 'https://linkedin.com/in/mohammedashir' },
    { icon: 'github', label: 'GitHub', value: 'github.com/MohammedAshir', href: 'https://github.com/MohammedAshir' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg mx-auto px-6"
    >
      <div className="bg-black/40 backdrop-blur-2xl rounded-3xl border border-white/10 p-6 md:p-10 shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-cyan-400">Get In Touch</h2>
        <p className="text-white/60 mb-8">Let's discuss your next project</p>
        
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/30 transition-colors">
                {contact.icon === 'email' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                )}
                {contact.icon === 'phone' && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                )}
                {contact.icon === 'linkedin' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                )}
                {contact.icon === 'github' && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                )}
              </div>
              <div>
                <p className="text-xs text-white/50">{contact.label}</p>
                <p className="text-white font-medium">{contact.value}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Main Portfolio Component
export default function Portfolio3D() {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const sections = ['home', 'about', 'experience', 'projects', 'contact'];
    
    const handleKeyDown = (e) => {
      const currentIndex = sections.indexOf(activeSection);
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % sections.length;
        setActiveSection(sections[nextIndex]);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + sections.length) % sections.length;
        setActiveSection(sections[prevIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection]);

  // Handle touch/scroll navigation on mobile
  useEffect(() => {
    let touchStartY = 0;
    const sections = ['home', 'about', 'experience', 'projects', 'contact'];
    
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      const currentIndex = sections.indexOf(activeSection);

      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentIndex < sections.length - 1) {
          setActiveSection(sections[currentIndex + 1]);
        } else if (diff < 0 && currentIndex > 0) {
          setActiveSection(sections[currentIndex - 1]);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSection]);

  // Loading Screen
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#030014] flex items-center justify-center z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              borderRadius: ["25%", "50%", "25%"]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-4 border-4 border-indigo-500 border-t-transparent"
          />
          <p className="text-white/60 text-sm">Loading Experience...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* 3D Canvas Background */}
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene activeSection={activeSection} />
          <Preload all />
        </Suspense>
      </Canvas>

      {/* Navigation */}
      <Navigation 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Content Panels */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-auto">
          <AnimatePresence mode="wait">
            {activeSection === 'home' && <HomePanel key="home" />}
            {activeSection === 'about' && <AboutPanel key="about" />}
            {activeSection === 'experience' && <ExperiencePanel key="experience" />}
            {activeSection === 'projects' && <ProjectsPanel key="projects" />}
            {activeSection === 'contact' && <ContactPanel key="contact" />}
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll/Swipe Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 text-center z-30"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/40 text-sm"
        >
          <span className="hidden md:inline">Use arrow keys or scroll to navigate</span>
          <span className="md:hidden">Swipe to navigate</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
