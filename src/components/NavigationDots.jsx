import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NavigationDots = () => {
  const [activeSection, setActiveSection] = useState(0);
  
  const sections = [
    { id: 0, label: 'Home', color: 'bg-purple-500' },
    { id: 1, label: 'About', color: 'bg-slate-900' },
    { id: 2, label: 'Projects', color: 'bg-purple-500' },
    { id: 3, label: 'Contact', color: 'bg-purple-500' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      const sectionIndex = Math.floor((scrollPercentage / 100) * sections.length);
      setActiveSection(Math.min(sectionIndex, sections.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections.length]);

  const scrollToSection = (index) => {
    const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = (totalScrollHeight / sections.length) * index;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const [showLabels, setShowLabels] = useState(false);

  return (
    <div 
      className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50"
      onMouseEnter={() => setShowLabels(true)}
      onMouseLeave={() => setShowLabels(false)}
    >
      <div className="flex flex-col gap-4">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            onClick={() => scrollToSection(section.id)}
            className="relative group"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to ${section.label}`}
          >
            <motion.div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section.id 
                  ? `${section.color} scale-125 shadow-lg` 
                  : 'bg-gray-400 hover:bg-gray-600'
              }`}
            />
            
            <AnimatePresence>
              {showLabels && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 whitespace-nowrap"
                >
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    activeSection === section.id 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-white/90 text-gray-700 shadow-md'
                  }`}>
                    {section.label}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-300">
        <div className="w-full bg-gray-200 rounded-full h-1">
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full"
            style={{ 
              width: `${((activeSection + 1) / sections.length) * 100}%` 
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          {activeSection + 1} / {sections.length}
        </p>
      </div>
    </div>
  );
};

export default NavigationDots;
