import { motion } from 'framer-motion';
import resumePDF from '../assets/MohammedAshir_Resume.pdf';

const Resume = () => {
  const timeline = [
    {
      type: 'education',
      title: 'Bachelor of Engineering (B.E), Computer Science',
      institution: 'Visvesvaraya Technological University (VTU)',
      duration: '2017 – 2021',
      description: 'Completed a comprehensive curriculum covering core computer science subjects, laying a strong foundation for software development.',
    },
    {
      type: 'courses',
      title: 'Relevant Courses & Certifications',
      institution: '',
      duration: '',
      description: `- MERN Stack Development
- Java with Spring Boot
- Python Programming`,
    },
    {
      type: 'experience',
      title: 'Software Engineer',
      institution: 'Accenture – AT&T Project',
      duration: 'Jan 2022 – Oct 2023',
      description: `Developed Java-based RESTful services using Spring Boot in a microservices architecture.
- Integrated backend with SQL databases (MySQL/PostgreSQL) and maintained data integrity.
- Wrote and maintained unit and integration tests using JUnit; used SonarQube for code quality.
- Built frontend components using React.js with Redux for state management and seamless UI flows.
- Participated in agile development, peer code reviews, and cross-functional team collaboration.
- **Projects:**
  - *Lease Management System*: A web app for managing lease agreements and rental payments in telecom.`,
    },
    {
      type: 'experience',
      title: 'Full Stack Developer (MERN Stack)',
      institution: 'NAB Advertising',
      duration: 'Nov 2023 – Jan 2025',
      description: `Developed and maintained responsive web applications using MongoDB, Express.js, React.js, and Node.js.
- Built scalable REST APIs and implemented authentication, payment integration, and role-based access.
- Designed interactive and modern UIs with TypeScript and Tailwind CSS, ensuring cross-device compatibility.
- Deployed projects to AWS, Vercel, and Netlify; implemented CI/CD workflows for production updates.
- Provided technical support for internal IT systems and e-commerce platform management.
- **Projects:**
  - *MakoShark Apparel E-commerce*: Full-stack app with JWT auth integration; admin dashboard for inventory & order control.
  - *Cafe/Restaurant Due Tracker*: Next.js application to track customer dues and generate financial reports.`,
    },
    {
      type: 'project',
      title: 'Fodome – Food Waste Reduction App',
      institution: 'Personal Project',
      duration: '2023',
      description: `Built an Angular-based app connecting food donors with the needy.
- Integrated Google Maps API for location-based donation visibility.
- Enabled real-time updates, social sharing, Google Sign-In, and Firebase CRUD.`,
    },
    {
      type: 'project',
      title: 'Lassi Hut – Cafe Ordering System',
      institution: 'Personal Project',
      duration: '2022',
      description: `Developed an interactive menu with cart functionality and responsive design using HTML, CSS, and JavaScript.
- Integrated Google Maps and implemented form validation for enhanced user experience.`,
    },
    {
      type: 'project',
      title: 'Mutual Fund Investment System',
      institution: 'Personal Project',
      duration: '2021',
      description: `Created a React application to track mutual fund investments with performance analytics.
- Implemented real-time data and dashboard using Firebase backend.`,
    },
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
          {/* Timeline line */}
          <div className="absolute left-6 sm:left-1/2 w-1 h-full bg-indigo-200 rounded -z-10"></div>

          {timeline.map((item, index) => (
            <div key={index} className={`mb-16 flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              {/* Mobile dot */}
              <div className="sm:hidden absolute left-6 -translate-x-1/2 w-6 h-6 bg-indigo-600 border-4 border-white rounded-full shadow-md"></div>

              {/* Content card */}
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`w-full sm:w-5/12 bg-gray-50 p-6 rounded-lg border-l-4 border-indigo-500 shadow hover:shadow-md transition-shadow ${index % 2 === 0 ? 'sm:mr-auto' : 'sm:ml-auto'}`}
              >
                <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                {item.institution && <p className="text-indigo-600 font-medium">{item.institution}</p>}
                {item.duration && <p className="text-sm text-gray-500 mb-3">{item.duration}</p>}
                <p className="text-gray-700 whitespace-pre-line">{item.description}</p>
              </motion.div>

              {/* Desktop dot */}
              <div className={`hidden sm:flex items-center ${index % 2 === 0 ? 'order-1 ml-4' : 'order-0 mr-4'}`}>
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
