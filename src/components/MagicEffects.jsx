import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const MagicEffects = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  
  const words = ['Innovative', 'Creative', 'Professional', 'Elegant', 'Modern', 'Unique'];
  const codeSnippets = [
    'const magic = () => portfolio;',
    'function createArt() { return code; }',
    'let innovation = creativity + code;',
    'const future = await build();',
    'return excellence.map(skill);'
  ];

  // Magnetic cursor effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Word morphing effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Particle system
  const ParticleSystem = () => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 1,
      symbol: codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
    }));

    return (
      <div className="fixed inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ 
              x: particle.x, 
              y: particle.y,
              opacity: 0,
              scale: 0
            }}
            animate={{
              x: [particle.x, particle.x + Math.random() * 200 - 100],
              y: [particle.y, particle.y + Math.random() * 200 - 100],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
            className="absolute text-purple-400/30 font-mono text-xs whitespace-nowrap"
            style={{
              fontSize: `${particle.size * 3}px`,
              filter: 'blur(0.5px)'
            }}
          >
            {particle.symbol}
          </motion.div>
        ))}
      </div>
    );
  };

  // Magnetic Button Component
  const MagneticButton = ({ children, className, ...props }) => {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.3;
      const deltaY = (e.clientY - centerY) * 0.3;
      
      ref.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    const handleMouseLeave = () => {
      if (!ref.current) return;
      ref.current.style.transform = 'translate(0px, 0px)';
      setIsHovered(false);
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        className={`transition-transform duration-300 ease-out ${className}`}
        whileHover={{ scale: 1.05 }}
        {...props}
      >
        {children}
        {isHovered && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-lg -z-10"
          />
        )}
      </motion.div>
    );
  };

  // Morphing Text Component
  const MorphingText = () => {
    return (
      <div className="relative h-12 flex items-center justify-center">
        {words.map((word, index) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, y: 20, rotateX: -90 }}
            animate={{
              opacity: currentWord === index ? 1 : 0,
              y: currentWord === index ? 0 : -20,
              rotateX: currentWord === index ? 0 : 90
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut"
            }}
            className="absolute text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden'
            }}
          >
            {word}
          </motion.span>
        ))}
      </div>
    );
  };

  // Custom Cursor
  const CustomCursor = () => {
    return (
      <>
        <motion.div
          className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
          style={{ x, y }}
        >
          <motion.div
            className="w-full h-full rounded-full border-2 border-white"
            animate={{
              scale: isHovering ? 2 : 1,
              borderColor: isHovering ? '#8b5cf6' : '#ffffff'
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
        
        {/* Trailing effect */}
        <motion.div
          className="fixed top-0 left-0 w-2 h-2 bg-purple-400 rounded-full pointer-events-none z-40"
          animate={{
            x: cursorPosition.x - 4,
            y: cursorPosition.y - 4
          }}
          transition={{ 
            type: "spring", 
            damping: 30, 
            stiffness: 200,
            delay: 0.05
          }}
        />
      </>
    );
  };

  // Liquid Loading Animation
  const LiquidLoader = () => {
    return (
      <motion.div
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity }}
        className="absolute inset-0"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="absolute inset-0 opacity-20"
        >
          <motion.path
            d="M20,50 Q50,20 80,50 Q50,80 20,50"
            fill="none"
            stroke="url(#liquidGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <defs>
            <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    );
  };

  return (
    <>
      <CustomCursor />
      <ParticleSystem />
      
      {/* Magic Section */}
      <div className="fixed bottom-20 right-8 z-30 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="relative"
        >
          <MagneticButton
            className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-2xl p-6 relative overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <LiquidLoader />
            <div className="relative z-10">
              <MorphingText />
              <p className="text-white/80 text-sm mt-2 text-center">Portfolio</p>
            </div>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Floating Action Bubble */}
      <motion.div
        className="fixed top-1/2 left-8 transform -translate-y-1/2 z-30 hidden xl:block"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
      >
        <motion.div
          className="relative"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <MagneticButton className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden">
            <motion.div
              className="text-white text-2xl"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              ✨
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Breathing Glow Effect */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        animate={{
          background: [
            'radial-gradient(600px circle at 20% 80%, rgba(139, 92, 246, 0.05), transparent 50%)',
            'radial-gradient(600px circle at 80% 20%, rgba(236, 72, 153, 0.05), transparent 50%)',
            'radial-gradient(600px circle at 40% 40%, rgba(99, 102, 241, 0.05), transparent 50%)',
            'radial-gradient(600px circle at 20% 80%, rgba(139, 92, 246, 0.05), transparent 50%)'
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </>
  );
};

export default MagicEffects;