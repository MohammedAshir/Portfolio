import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-scroll';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
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
      className="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-50"
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        {/* Centered Desktop Navigation */}
        <div className="hidden md:flex justify-center items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              smooth={true}
              duration={500}
              className="cursor-pointer px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
        
        {/* Mobile Menu Button - Centered */}
        <div className="md:hidden flex justify-between items-center">
          <div className="w-8"></div> {/* Empty div for balance */}
          <button 
            className="text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden px-6 py-4 border-t bg-white/95"
        >
          <div className="flex flex-col space-y-4 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth={true}
                duration={500}
                className="cursor-pointer px-4 py-2 text-gray-700 hover:text-indigo-600 transition-colors text-lg"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;