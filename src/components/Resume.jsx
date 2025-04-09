import { motion } from 'framer-motion';
import resumePDF from '../assets/Mohammed_Ashir_Resume_New.pdf';

const Resume = () => {
  const experiences = [
    {
      role: 'Software Engineer',
      company: 'Accenture (AT&T Project)',
      duration: 'Jan 2022 - Oct 2023',
      description: `
        Developed a web app for managing lease agreements and rental payments in telecom.
        - Built RESTful APIs using Java Spring Boot & Spring Framework.
        - Integrated APIs with React for seamless frontend-backend communication.
        - Conducted testing using Postman and JUnit; maintained quality with SonarQube.
        - Improved system performance through SQL optimization and clean code practices.
        - Supported deployments and resolved production issues.
      `,
      tech: 'Java, Spring Boot, React, JavaScript, SQL, JUnit'
    },
    {
      role: 'Full Stack Developer',
      company: 'NAB Advertising (Client Project)',
      duration: 'Nov 2023 - Jan 2025',
      description: `
        Developed an e-commerce web app for order tracking and inventory management.
        - Built reusable React components with responsive UI and smooth UX.
        - Integrated RESTful APIs, managed global state with Redux.
        - Ensured cross-browser compatibility and tested UI using Jest & React Testing Library.
      `,
      tech: 'React, Redux, JavaScript, RESTful APIs, Jest, HTML, CSS'
    },
    {
      role: 'Project: Fodome (Food Wastage Reduction App)',
      company: 'Personal Project',
      duration: '2023',
      description: `
        Built an Angular-based app connecting food donors with the needy.
        - Integrated Google Maps API for location-based donation visibility.
        - Enabled real-time updates, social sharing, Google Sign-In, and Firebase CRUD.
      `,
      tech: 'Angular, Firebase, Google Maps API'
    }
  ];

  return (
    <section id="resume" className="py-20 px-6 sm:px-10 bg-white text-gray-800">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12">
          <h2 className="text-4xl font-bold mb-4 sm:mb-0">My Journey</h2>
          <motion.a
            href={resumePDF}
            download="Mohammed_Ashir_Resume_New.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Download Resume
          </motion.a>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-indigo-200 rounded"></div>

          {experiences.map((exp, index) => (
            <div key={index} className={`mb-16 flex flex-col sm:flex-row ${index % 2 !== 0 ? 'sm:flex-row-reverse' : ''}`}>
              <div className="sm:w-1/2 px-6 sm:px-8 mb-6 sm:mb-0">
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-6 rounded-lg border-l-4 border-indigo-500 shadow hover:shadow-md transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-1">{exp.role}</h3>
                  <p className="text-indigo-600 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-3">{exp.duration}</p>
                  <p className="text-gray-700 whitespace-pre-line">{exp.description}</p>
                  <p className="text-sm text-indigo-500 mt-3 font-medium">Tech: {exp.tech}</p>
                </motion.div>
              </div>
              <div className="sm:w-1/2 flex justify-center items-start pt-2">
                <div className="w-6 h-6 bg-indigo-600 border-4 border-white rounded-full shadow-md"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resume;
