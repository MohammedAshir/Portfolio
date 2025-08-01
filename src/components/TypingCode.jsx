import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypingCode = ({ 
  lines = [
    "const developer = {",
    "  name: 'Mohammed Ashir',",
    "  role: 'Software Engineer',",
    "  skills: ['Python', 'React', 'Odoo'],",
    "  passion: 'Building amazing things'",
    "};"
  ],
  speed = 100,
  className = ""
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentLineIndex >= lines.length) {
      setIsComplete(true);
      return;
    }

    const currentLine = lines[currentLineIndex];
    
    if (currentCharIndex <= currentLine.length) {
      const timeout = setTimeout(() => {
        const char = currentLine[currentCharIndex];
        if (char) {
          setDisplayedText(prev => prev + char);
        }
        setCurrentCharIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      // Move to next line
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + '\n');
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, speed * 3); // Pause between lines

      return () => clearTimeout(timeout);
    }
  }, [currentCharIndex, currentLineIndex, lines, speed]);

  // Reset animation after completion
  useEffect(() => {
    if (isComplete) {
      const timeout = setTimeout(() => {
        setDisplayedText('');
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
        setIsComplete(false);
      }, 3000); // Wait 3 seconds before restarting

      return () => clearTimeout(timeout);
    }
  }, [isComplete]);

  return (
    <div className={`font-mono text-sm ${className}`}>
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-700 shadow-2xl">
        {/* Terminal header */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-700">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-400 text-xs ml-2">portfolio.js</span>
        </div>
        
        {/* Code content */}
        <div className="text-green-400 relative min-h-[120px]">
          <pre className="whitespace-pre-wrap">
            {displayedText.split('\n').map((line, index) => (
              <div key={index} className="flex">
                <span className="text-gray-500 mr-3 select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-green-400">{line}</span>
              </div>
            ))}
          </pre>
          
          {/* Cursor */}
          {!isComplete && (
            <motion.span
              className="inline-block w-2 h-5 bg-green-400 ml-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default TypingCode;