import { motion } from 'framer-motion';
import { FaArrowDown } from 'react-icons/fa';
import { Link } from 'react-scroll'; // Make sure to install: npm install react-scroll

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-indigo-900 to-purple-800 text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4">
          Hi, I'm <span className="text-yellow-300">Mohammed Ashir</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          A passionate developer creating amazing digital experiences
        </p>
        
        {/* Scroll Down Button */}
        <Link 
          to="projects" // This should match the ID of your projects section
          smooth={true}
          duration={500}
          offset={-70} // Adjust this if you have a fixed navbar
          className="cursor-pointer inline-block"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            whileHover={{ scale: 1.1 }}
            className="mt-8"
          >
            <FaArrowDown 
              className="text-3xl mx-auto" 
              aria-label="Scroll to projects"
            />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
};

export default Hero;