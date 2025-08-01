import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

const TiltCard = ({ children, className = '', intensity = 15, ...props }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const card = ref.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateXValue = ((e.clientY - centerY) / (rect.height / 2)) * intensity;
    const rotateYValue = ((e.clientX - centerX) / (rect.width / 2)) * intensity;
    
    setRotateX(-rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        scale: isHovering ? 1.05 : 1
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30
      }}
      {...props}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl"
        animate={{
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1.1 : 0.8
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-xl"
        animate={{
          opacity: isHovering ? 1 : 0
        }}
        style={{
          background: `linear-gradient(
            ${45 + rotateY}deg,
            rgba(255,255,255,0.1) 0%,
            transparent 50%,
            transparent 100%
          )`
        }}
        transition={{ duration: 0.2 }}
      />
      
      {/* Content */}
      <div
        style={{
          transform: isHovering ? 'translateZ(20px)' : 'translateZ(0px)',
          transformStyle: 'preserve-3d'
        }}
        className="relative z-10 transition-transform duration-300"
      >
        {children}
      </div>
    </motion.div>
  );
};

export default TiltCard;