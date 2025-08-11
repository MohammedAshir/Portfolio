import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'Projects', to: 'projects' },
    { name: 'Resume', to: 'resume' },
    { name: 'Contact', to: 'contact' },
  ];

  // Handle navbar visibility on scroll
  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        // Close mobile menu if it's open when hiding navbar
        if (isOpen) {
          setIsOpen(false);
        }
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY, isOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, [isOpen]);

  // Close mobile menu when clicking anywhere on the overlay
  const handleOverlayClick = () => {
    setIsOpen(false);
  };

  // Prevent closing when clicking on menu links (they should close after navigation)
  const handleLinkClick = (to) => {
    // Small delay to allow smooth scroll to start before closing
    setTimeout(() => setIsOpen(false), 100);
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ 
        y: (isVisible || isOpen) ? 0 : -100,
        opacity: (isVisible || isOpen) ? 1 : 0
      }}
      transition={{ 
        duration: 0.3,
        ease: "easeInOut"
      }}
      className="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-[99997] border-b border-gray-100"
      style={{ zIndex: 99997 }}
    >
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer group"
          >
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-75 transition-opacity blur"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Ashir
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Software Engineer</p>
              </div>
            </div>
          </motion.div>
          
          {/* Desktop Navigation - Center aligned */}
          <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1 bg-gray-100/80 p-1 rounded-full">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  duration={500}
                  className={`cursor-pointer px-5 py-2 text-sm font-medium rounded-full transition-all ${
                    hoveredItem === link.to 
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                  onMouseEnter={() => setHoveredItem(link.to)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 focus:outline-none relative z-[99998] p-2 -mr-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
            style={{ zIndex: 99998 }}
          >
            {isOpen ? (
              <FiX size={24} className="text-indigo-600" />
            ) : (
              <FiMenu size={24} />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation - Full screen overlay using Portal */}
      {isOpen && createPortal(
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden mobile-menu-overlay"
          onClick={handleOverlayClick}
        >
          <div className="relative flex flex-col h-full justify-center items-center px-8 menu-content">
            {/* Navigation Links */}
            <div className="space-y-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.1 + index * 0.1,
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                >
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={500}
                    className="block text-center cursor-pointer group"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLinkClick(link.to);
                    }}
                  >
                    <span className="text-5xl md:text-6xl font-light text-gray-800 hover:text-indigo-600 transition-colors duration-300 tracking-tight">
                      {link.name}
                    </span>
                    <div className="w-0 h-0.5 bg-indigo-600 mx-auto mt-2 group-hover:w-16 transition-all duration-300 ease-out" />
                  </Link>
                </motion.div>
              ))}
            </div>
            
            {/* Close instruction */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
            >
              <p className="text-sm text-gray-400 mb-2">Tap anywhere to close</p>
              <div className="w-8 h-0.5 bg-gray-300 mx-auto" />
            </motion.div>
          </div>
        </motion.div>,
        document.body
      )}
    </motion.nav>
  );
};

export default Navbar;