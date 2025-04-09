import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>© {new Date().getFullYear()} Mohammed Ashir. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-6">
            <a 
              href="https://github.com/MohammedAshir" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <FaGithub size={24} />
            </a>
            <a 
              href="https://www.linkedin.com/in/mohammedashir/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm">
          <p>Built with React, Tailwind CSS, and ❤️</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;