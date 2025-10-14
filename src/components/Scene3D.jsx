import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Stars } from '@react-three/drei';
import { Suspense, useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import resumePDF from '../assets/MohammedAshir_Resume.pdf';

function StarField() {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <color attach="background" args={['#000510']} />
    </>
  );
}

function Asteroid({ position, size, speed }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.01;
      meshRef.current.rotation.y += speed * 0.015;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <dodecahedronGeometry args={[size, 0]} />
      <meshStandardMaterial color="#4a5568" roughness={0.8} metalness={0.2} />
    </mesh>
  );
}

function SpaceBackground() {
  const asteroids = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 20; i++) {
      arr.push({
        position: [
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100
        ],
        size: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.5 + 0.3
      });
    }
    return arr;
  }, []);

  return (
    <>
      {asteroids.map((asteroid, i) => (
        <Asteroid key={i} {...asteroid} />
      ))}
    </>
  );
}

function CentralSphere({ onClick, isActive }) {
  const meshRef = useRef();
  const wireframeRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = -state.clock.elapsedTime * 0.15;
      wireframeRef.current.rotation.x = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhysicalMaterial
          color="#1e3a8a"
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.6}
          emissive="#3b82f6"
          emissiveIntensity={isActive || hovered ? 1.2 : 0.6}
          clearcoat={1}
          clearcoatRoughness={0.1}
          transmission={0.3}
          thickness={0.5}
        />
      </mesh>
      
      <mesh ref={wireframeRef} scale={2.15}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color="#60a5fa"
          wireframe={true}
          transparent
          opacity={isActive || hovered ? 0.6 : 0.3}
        />
      </mesh>

      <mesh scale={1.08}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#3b82f6"
          transparent
          opacity={0.15}
          emissive="#3b82f6"
          emissiveIntensity={0.8}
        />
      </mesh>

      <Html center distanceFactor={10}>
        <div className="text-center pointer-events-none">
          <h1 className="text-4xl font-black mb-2 tracking-tight" style={{ 
            fontFamily: "'Orbitron', sans-serif",
            background: 'linear-gradient(135deg, #60a5fa 0%, #93c5fd 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 30px rgba(59, 130, 246, 0.5)',
            filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.8))'
          }}>
            Mohammed Ashir
          </h1>
          <p className="text-lg font-semibold" style={{ 
            fontFamily: "'Space Grotesk', sans-serif",
            color: '#93c5fd',
            textShadow: '0 0 20px rgba(147, 197, 253, 0.8)'
          }}>
            Software Engineer
          </p>
        </div>
      </Html>
    </group>
  );
}

function OrbitingSphere({ 
  radius, 
  speed, 
  color, 
  emissiveColor, 
  label, 
  onClick, 
  isActive,
  children,
  sphereRef
}) {
  const groupRef = useRef();
  const meshRef = useRef();
  const wireframeRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * speed;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = -state.clock.elapsedTime * 0.8;
      wireframeRef.current.rotation.x = state.clock.elapsedTime * 0.3;
    }
  });

  const labelColor = emissiveColor;

  return (
    <group ref={groupRef}>
      <group position={[radius, 0, 0]} ref={sphereRef}>
        <mesh
          ref={meshRef}
          onClick={onClick}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          castShadow
        >
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.8}
            roughness={0.15}
            transparent
            opacity={0.7}
            emissive={emissiveColor}
            emissiveIntensity={isActive || hovered ? 1.5 : 0.7}
            clearcoat={1}
            clearcoatRoughness={0.1}
            transmission={0.2}
            thickness={0.5}
          />
        </mesh>

        <mesh ref={wireframeRef} scale={1.25}>
          <sphereGeometry args={[0.9, 12, 12]} />
          <meshBasicMaterial
            color={emissiveColor}
            wireframe={true}
            transparent
            opacity={isActive || hovered ? 0.5 : 0.2}
          />
        </mesh>

        <mesh scale={1.12}>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshStandardMaterial
            color={emissiveColor}
            transparent
            opacity={0.2}
            emissive={emissiveColor}
            emissiveIntensity={0.5}
          />
        </mesh>

        <Html center distanceFactor={6}>
          <div className="pointer-events-none whitespace-nowrap">
            <div 
              className="text-lg font-bold tracking-wide px-4 py-2 rounded-lg backdrop-blur-sm"
              style={{ 
                fontFamily: "'Space Grotesk', sans-serif",
                color: labelColor,
                textShadow: `0 0 20px ${labelColor}, 0 0 40px ${labelColor}`,
                background: `radial-gradient(circle, ${labelColor}20 0%, transparent 70%)`,
                border: `1px solid ${labelColor}40`
              }}
            >
              {label}
            </div>
          </div>
        </Html>

        {children}
      </group>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.02, 16, 100]} />
        <meshBasicMaterial color={emissiveColor} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function SubOrbitingSphere({ radius, speed, color, label, index }) {
  const groupRef = useRef();
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * speed + index * 0.5;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.8;
    }
  });

  return (
    <group ref={groupRef}>
      <group position={[radius, 0, 0]}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          castShadow
        >
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.7}
            roughness={0.2}
            emissive={color}
            emissiveIntensity={hovered ? 1.5 : 0.5}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
          />
        </mesh>

        <mesh scale={1.15}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.2}
            emissive={color}
            emissiveIntensity={0.4}
          />
        </mesh>

        {hovered && (
          <Html center distanceFactor={6}>
            <div 
              className="px-4 py-2 rounded-lg backdrop-blur-md pointer-events-none whitespace-nowrap"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.875rem',
                fontWeight: '700',
                color: '#ffffff',
                textShadow: '0 0 15px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.9)',
                background: `linear-gradient(135deg, ${color}90 0%, ${color}60 100%)`,
                border: `2px solid ${color}`,
                boxShadow: `0 0 20px ${color}80`
              }}
            >
              {label}
            </div>
          </Html>
        )}
      </group>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.008, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function ProjectsSystem({ isActive }) {
  const projects = [
    { name: 'MakoShark Apparel', color: '#10b981' },
    { name: 'Mutual Fund System', color: '#3b82f6' },
    { name: 'Fodome App', color: '#ec4899' }
  ];

  return (
    <>
      {isActive && projects.map((project, index) => (
        <SubOrbitingSphere
          key={index}
          radius={2.5 + index * 0.4}
          speed={0.8 - index * 0.1}
          color={project.color}
          label={project.name}
          index={index}
        />
      ))}
    </>
  );
}

function ExperienceSystem({ isActive }) {
  const companies = [
    { name: 'Ray Fit Out Interior', color: '#f59e0b' },
    { name: 'NAB Advertising', color: '#06b6d4' },
    { name: 'Accenture-AT&T', color: '#84cc16' }
  ];

  return (
    <>
      {isActive && companies.map((company, index) => (
        <SubOrbitingSphere
          key={index}
          radius={2.2 + index * 0.5}
          speed={0.7 - index * 0.12}
          color={company.color}
          label={company.name}
          index={index}
        />
      ))}
    </>
  );
}

function CameraController({ focusedSphere, sphereRefs }) {
  const { camera } = useThree();
  
  useFrame(() => {
    if (focusedSphere === 'center') {
      camera.position.lerp(new THREE.Vector3(0, 5, 15), 0.05);
      camera.lookAt(0, 0, 0);
    } else if (focusedSphere && sphereRefs[focusedSphere]?.current) {
      const spherePos = new THREE.Vector3();
      sphereRefs[focusedSphere].current.getWorldPosition(spherePos);
      
      const offset = new THREE.Vector3(0, 2, 5);
      const targetCameraPos = spherePos.clone().add(offset);
      
      camera.position.lerp(targetCameraPos, 0.05);
      camera.lookAt(spherePos);
    }
  });
  
  return null;
}

function Scene3D() {
  const [focusedSphere, setFocusedSphere] = useState('center');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const aboutRef = useRef();
  const projectsRef = useRef();
  const experienceRef = useRef();
  const contactRef = useRef();
  const resumeRef = useRef();

  const sphereRefs = {
    about: aboutRef,
    projects: projectsRef,
    experience: experienceRef,
    contact: contactRef,
    resume: resumeRef
  };

  const handleResumeClick = () => {
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'MohammedAshir_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-screen relative">
      <Canvas 
        shadows 
        dpr={[1, 2]} 
        camera={{ position: [0, 5, 15], fov: 60 }}
        gl={{ antialias: true }}
      >
        <CameraController focusedSphere={focusedSphere} sphereRefs={sphereRefs} />
        
        <Suspense fallback={null}>
          <StarField />
          <SpaceBackground />
          
          <ambientLight intensity={0.2} />
          <pointLight position={[0, 0, 0]} intensity={1.5} color="#ffffff" />
          <pointLight position={[20, 10, 20]} intensity={0.5} color="#3b82f6" />
          <pointLight position={[-20, 10, -20]} intensity={0.5} color="#8b5cf6" />
          
          <CentralSphere 
            onClick={() => setFocusedSphere('center')} 
            isActive={focusedSphere === 'center'}
          />
          
          <OrbitingSphere
            radius={6}
            speed={0.15}
            color="#ffffff"
            emissiveColor="#10b981"
            label="About"
            onClick={() => setFocusedSphere('about')}
            isActive={focusedSphere === 'about'}
            sphereRef={aboutRef}
          />
          
          <OrbitingSphere
            radius={8}
            speed={0.12}
            color="#ffffff"
            emissiveColor="#f59e0b"
            label="Projects"
            onClick={() => setFocusedSphere('projects')}
            isActive={focusedSphere === 'projects'}
            sphereRef={projectsRef}
          >
            <ProjectsSystem isActive={focusedSphere === 'projects'} />
          </OrbitingSphere>
          
          <OrbitingSphere
            radius={10}
            speed={0.1}
            color="#ffffff"
            emissiveColor="#8b5cf6"
            label="Experience"
            onClick={() => setFocusedSphere('experience')}
            isActive={focusedSphere === 'experience'}
            sphereRef={experienceRef}
          >
            <ExperienceSystem isActive={focusedSphere === 'experience'} />
          </OrbitingSphere>
          
          <OrbitingSphere
            radius={12}
            speed={0.08}
            color="#ffffff"
            emissiveColor="#ec4899"
            label="Contact"
            onClick={() => setFocusedSphere('contact')}
            isActive={focusedSphere === 'contact'}
            sphereRef={contactRef}
          />
          
          <OrbitingSphere
            radius={14}
            speed={0.06}
            color="#ffffff"
            emissiveColor="#06b6d4"
            label="Resume"
            onClick={() => {
              setFocusedSphere('resume');
              handleResumeClick();
            }}
            isActive={focusedSphere === 'resume'}
            sphereRef={resumeRef}
          />
          
          <OrbitControls 
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={5}
            maxDistance={40}
            dampingFactor={0.05}
            rotateSpeed={0.5}
            enableDamping
          />
        </Suspense>
      </Canvas>
      


      {focusedSphere === 'about' && (
        <div className="fixed bottom-0 left-0 right-0 md:bottom-auto md:left-8 md:right-auto md:top-1/2 md:transform md:-translate-y-1/2 z-50 max-w-full md:max-w-lg animate-fadeIn">
          <div className="bg-black/90 backdrop-blur-xl p-6 md:p-8 rounded-t-3xl md:rounded-2xl border-t-2 md:border-2 border-emerald-500/50 shadow-2xl max-h-[75vh] md:max-h-[80vh] overflow-y-auto" style={{ boxShadow: '0 0 60px rgba(16, 185, 129, 0.3)' }}>
            <div className="flex items-center justify-between mb-4 md:mb-5">
              <h2 className="text-2xl md:text-3xl font-black text-emerald-400" style={{ fontFamily: "'Orbitron', sans-serif", textShadow: '0 0 20px rgba(16, 185, 129, 0.5)' }}>About Me</h2>
              <button 
                onClick={() => setFocusedSphere('center')}
                className="md:hidden w-8 h-8 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 text-xl hover:bg-emerald-500/30 transition-all"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-100 text-sm md:text-lg leading-relaxed mb-3 md:mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Results-driven Software Engineer with over 4 years of experience building and deploying scalable full-stack applications, cloud-based systems, and enterprise solutions. Proficient in Java, Python, and JavaScript (MERN stack), with expertise in developing containerized applications on AWS and DigitalOcean.
            </p>
            <div className="space-y-2 md:space-y-3 text-sm md:text-base" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <div className="flex items-center gap-2 md:gap-3 text-gray-200">
                <span className="text-emerald-400 text-lg md:text-xl font-bold">▸</span> Full-Stack Development (MERN, Java Spring Boot)
              </div>
              <div className="flex items-center gap-2 md:gap-3 text-gray-200">
                <span className="text-emerald-400 text-lg md:text-xl font-bold">▸</span> Cloud Architecture (AWS, DigitalOcean)
              </div>
              <div className="flex items-center gap-2 md:gap-3 text-gray-200">
                <span className="text-emerald-400 text-lg md:text-xl font-bold">▸</span> Odoo ERP Development & API Integration
              </div>
              <div className="flex items-center gap-2 md:gap-3 text-gray-200">
                <span className="text-emerald-400 text-lg md:text-xl font-bold">▸</span> Docker, CI/CD, Microservices
              </div>
            </div>
          </div>
        </div>
      )}

      {focusedSphere === 'contact' && (
        <div className="fixed bottom-0 left-0 right-0 md:bottom-auto md:left-8 md:right-auto md:top-1/2 md:transform md:-translate-y-1/2 z-50 max-w-full md:max-w-md animate-fadeIn">
          <div className="bg-black/90 backdrop-blur-xl p-6 md:p-8 rounded-t-3xl md:rounded-2xl border-t-2 md:border-2 border-pink-500/50 shadow-2xl max-h-[75vh] md:max-h-[80vh] overflow-y-auto" style={{ boxShadow: '0 0 60px rgba(236, 72, 153, 0.3)' }}>
            <div className="flex items-center justify-between mb-4 md:mb-5">
              <h2 className="text-2xl md:text-3xl font-black text-pink-400" style={{ fontFamily: "'Orbitron', sans-serif", textShadow: '0 0 20px rgba(236, 72, 153, 0.5)' }}>Get In Touch</h2>
              <button 
                onClick={() => setFocusedSphere('center')}
                className="md:hidden w-8 h-8 rounded-full bg-pink-500/20 border-2 border-pink-500 flex items-center justify-center text-pink-400 text-xl hover:bg-pink-500/30 transition-all"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 md:space-y-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <a href="mailto:ashashir7@gmail.com" className="flex items-center gap-3 md:gap-4 text-gray-100 hover:text-pink-400 transition-all text-sm md:text-lg break-all">
                <span className="text-pink-400 text-xl md:text-2xl flex-shrink-0">@</span>
                <span>ashashir7@gmail.com</span>
              </a>
              <a href="tel:+971569897765" className="flex items-center gap-3 md:gap-4 text-gray-100 hover:text-pink-400 transition-all text-sm md:text-lg">
                <span className="text-pink-400 text-xl md:text-2xl flex-shrink-0">📞</span>
                <span>+971 569897765</span>
              </a>
              <a href="https://linkedin.com/in/mohammedashir" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 md:gap-4 text-gray-100 hover:text-pink-400 transition-all text-sm md:text-lg">
                <span className="text-pink-400 text-xl md:text-2xl flex-shrink-0">in</span>
                <span>LinkedIn</span>
              </a>
              <a href="https://mohammedashir.netlify.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 md:gap-4 text-gray-100 hover:text-pink-400 transition-all text-sm md:text-lg">
                <span className="text-pink-400 text-xl md:text-2xl flex-shrink-0">→</span>
                <span>Portfolio Website</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {focusedSphere === 'projects' && (
        <div className="fixed bottom-0 left-0 right-0 md:bottom-auto md:left-8 md:right-auto md:top-1/2 md:transform md:-translate-y-1/2 z-50 max-w-full md:max-w-md animate-fadeIn">
          <div className="bg-black/90 backdrop-blur-xl p-6 md:p-8 rounded-t-3xl md:rounded-2xl border-t-2 md:border-2 border-amber-500/50 shadow-2xl max-h-[75vh] md:max-h-[80vh] overflow-y-auto" style={{ boxShadow: '0 0 60px rgba(245, 158, 11, 0.3)' }}>
            <div className="flex items-center justify-between mb-4 md:mb-5">
              <h2 className="text-2xl md:text-3xl font-black text-amber-400" style={{ fontFamily: "'Orbitron', sans-serif", textShadow: '0 0 20px rgba(245, 158, 11, 0.5)' }}>Featured Projects</h2>
              <button 
                onClick={() => setFocusedSphere('center')}
                className="md:hidden w-8 h-8 rounded-full bg-amber-500/20 border-2 border-amber-500 flex items-center justify-center text-amber-400 text-xl hover:bg-amber-500/30 transition-all"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 md:space-y-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <div>
                <div className="text-amber-300 font-bold text-base md:text-lg">MakoShark Apparel - E-commerce with AI Chatbot</div>
                <div className="text-gray-300 text-sm md:text-base mt-1">MERN Stack • Full-stack app with JWT auth, admin dashboard & AI chatbot support</div>
              </div>
              <div>
                <div className="text-amber-300 font-bold text-base md:text-lg">Mutual Fund Investment System</div>
                <div className="text-gray-300 text-sm md:text-base mt-1">React + Firebase • Tracks investments with real-time performance analytics</div>
              </div>
              <div>
                <div className="text-amber-300 font-bold text-base md:text-lg">Fodome - Food Waste Reduction</div>
                <div className="text-gray-300 text-sm md:text-base mt-1">Flutter + Firebase • Track food waste with expiry reminders</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {focusedSphere === 'experience' && (
        <div className="fixed bottom-0 left-0 right-0 md:bottom-auto md:left-8 md:right-auto md:top-1/2 md:transform md:-translate-y-1/2 z-50 max-w-full md:max-w-lg animate-fadeIn">
          <div className="bg-black/90 backdrop-blur-xl p-6 md:p-8 rounded-t-3xl md:rounded-2xl border-t-2 md:border-2 border-violet-500/50 shadow-2xl max-h-[75vh] md:max-h-[80vh] overflow-y-auto" style={{ boxShadow: '0 0 60px rgba(139, 92, 246, 0.3)' }}>
            <div className="flex items-center justify-between mb-4 md:mb-5">
              <h2 className="text-2xl md:text-3xl font-black text-violet-400" style={{ fontFamily: "'Orbitron', sans-serif", textShadow: '0 0 20px rgba(139, 92, 246, 0.5)' }}>Work Experience</h2>
              <button 
                onClick={() => setFocusedSphere('center')}
                className="md:hidden w-8 h-8 rounded-full bg-violet-500/20 border-2 border-violet-500 flex items-center justify-center text-violet-400 text-xl hover:bg-violet-500/30 transition-all"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4 md:space-y-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-violet-300">Ray Fit Out Interior</h3>
                <p className="text-sm md:text-base text-gray-300 mt-1">Software Engineer • May 2025 - Present</p>
                <p className="text-sm md:text-base text-gray-100 mt-2">Developing full-stack ERP solutions, integrated third-party payment systems, and managing AWS deployments.</p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-violet-300">NAB Advertising</h3>
                <p className="text-sm md:text-base text-gray-300 mt-1">Full-stack Developer • Feb 2024 - Apr 2025</p>
                <p className="text-sm md:text-base text-gray-100 mt-2">Built React-based e-commerce platforms and integrated APIs for SEO and analytics tracking.</p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-violet-300">Accenture-AT&T</h3>
                <p className="text-sm md:text-base text-gray-300 mt-1">Software Engineer • Jan 2022 - Jan 2024</p>
                <p className="text-sm md:text-base text-gray-100 mt-2">Designed secure systems, developed APIs, and containerized applications using Docker.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {focusedSphere !== 'center' && (
        <button
          onClick={() => setFocusedSphere('center')}
          className="fixed top-4 md:top-8 left-4 md:left-8 z-50 group"
        >
          <div 
            className="relative px-3 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl font-bold transition-all duration-300 hover:scale-110"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              background: 'rgba(0, 5, 16, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '2px solid rgba(59, 130, 246, 0.5)',
              boxShadow: '0 0 40px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(59, 130, 246, 0.1)',
            }}
          >
            <div className="flex items-center gap-2 md:gap-3">
              <div 
                className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:rotate-180"
                style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)',
                  boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)'
                }}
              >
                <span className="text-white text-base md:text-lg">⊙</span>
              </div>
              <span 
                className="text-blue-300 text-sm md:text-base transition-colors duration-300 group-hover:text-white"
                style={{ textShadow: '0 0 10px rgba(59, 130, 246, 0.8)' }}
              >
                Return to Home
              </span>
            </div>
          </div>
        </button>
      )}

      <div className="fixed top-4 right-4 md:top-auto md:bottom-8 md:right-8 z-50">
        <button 
          onClick={() => setIsGuideOpen(!isGuideOpen)}
          className="md:hidden w-10 h-10 rounded-full bg-black/85 backdrop-blur-xl border-2 border-blue-500/40 flex items-center justify-center text-blue-300 text-lg hover:bg-blue-500/20 transition-all shadow-2xl"
          style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}
        >
          {isGuideOpen ? '✕' : '☰'}
        </button>

        <div className={`${isGuideOpen ? 'block' : 'hidden'} md:block bg-black/85 backdrop-blur-xl px-3 md:px-6 py-2 md:py-4 rounded-xl md:rounded-2xl border-2 border-blue-500/40 shadow-2xl mt-2 md:mt-0`} style={{ boxShadow: '0 0 40px rgba(59, 130, 246, 0.2)', fontFamily: "'Space Grotesk', sans-serif" }}>
          <h3 className="text-xs md:text-base font-bold text-blue-300 mb-1.5 md:mb-3" style={{ textShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}>Navigation Guide</h3>
          <div className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
            <div className="flex items-center gap-2 md:gap-3 cursor-pointer hover:scale-105 transition-transform" onClick={() => { setFocusedSphere('center'); setIsGuideOpen(false); }}>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-blue-500 shadow-lg flex-shrink-0" style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)' }}></div>
              <span className="text-blue-200 font-semibold"><span className="md:hidden">Center</span><span className="hidden md:inline">Center: Mohammed Ashir</span></span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 cursor-pointer hover:scale-105 transition-transform" onClick={() => { setFocusedSphere('about'); setIsGuideOpen(false); }}>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-500 shadow-lg flex-shrink-0" style={{ boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)' }}></div>
              <span className="text-emerald-200 font-medium">About</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 cursor-pointer hover:scale-105 transition-transform" onClick={() => { setFocusedSphere('projects'); setIsGuideOpen(false); }}>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500 shadow-lg flex-shrink-0" style={{ boxShadow: '0 0 10px rgba(245, 158, 11, 0.8)' }}></div>
              <span className="text-amber-200 font-medium">Projects</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 cursor-pointer hover:scale-105 transition-transform" onClick={() => { setFocusedSphere('experience'); setIsGuideOpen(false); }}>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-violet-500 shadow-lg flex-shrink-0" style={{ boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)' }}></div>
              <span className="text-violet-200 font-medium">Experience</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 cursor-pointer hover:scale-105 transition-transform" onClick={() => { setFocusedSphere('contact'); setIsGuideOpen(false); }}>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-pink-500 shadow-lg flex-shrink-0" style={{ boxShadow: '0 0 10px rgba(236, 72, 153, 0.8)' }}></div>
              <span className="text-pink-200 font-medium">Contact</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 cursor-pointer hover:scale-105 transition-transform" onClick={() => { setFocusedSphere('resume'); handleResumeClick(); setIsGuideOpen(false); }}>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-cyan-500 shadow-lg flex-shrink-0" style={{ boxShadow: '0 0 10px rgba(6, 182, 212, 0.8)' }}></div>
              <span className="text-cyan-200 font-medium">Resume</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Scene3D;
