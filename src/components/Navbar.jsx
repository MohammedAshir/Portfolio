import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  
  const navLinks = [
    { name: 'Home', to: 'home' },
    { name: 'Projects', to: 'projects' },
    { name: 'Resume', to: 'resume' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-gray-100"
    >
      <div className="max-w-6xl mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo/Brand - Left aligned */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            Ashir
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
            className="md:hidden text-gray-700 focus:outline-none relative z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <FiX size={24} className="text-indigo-600" />
            ) : (
              <FiMenu size={24} />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation - Full screen overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="md:hidden fixed inset-0 bg-white z-40 pt-20 px-6"
        >
          <div className="flex flex-col h-full">
            <div className="flex flex-col space-y-6 items-center mt-10">
              {navLinks.map((link) => (
                <motion.div
                  key={link.to}
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={500}
                    className="cursor-pointer text-2xl font-medium text-gray-800 hover:text-indigo-600 transition-colors py-3"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            
            {/* Close button for mobile */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(false)}
              className="mb-8 mx-auto px-6 py-2 bg-indigo-600 text-white rounded-full text-sm font-medium"
            >
              Close Menu
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;