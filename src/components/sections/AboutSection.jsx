import { motion } from 'framer-motion';

const AboutSection = () => {
  const expertise = [
    { 
      area: 'Enterprise Systems', 
      detail: 'ERP Development & Integration',
      icon: '🏢'
    },
    { 
      area: 'Full-Stack Development', 
      detail: 'React, Python, Node.js',
      icon: '⚡'
    },
    { 
      area: 'Cloud Infrastructure', 
      detail: 'AWS, Docker, DevOps',
      icon: '☁️'
    },
    { 
      area: 'Business Solutions', 
      detail: '4+ Years Professional Experience',
      icon: '📈'
    }
  ];

  const skills = [
    'React', 'Node.js', 'Python', 'TypeScript', 'JavaScript',
    'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'REST APIs',
    'GraphQL', 'Git', 'CI/CD', 'Microservices', 'Agile'
  ];

  return (
    <section className="w-full min-h-screen flex items-center justify-center relative bg-white">
      <div className="container mx-auto px-8 max-w-6xl py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
            About Me
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl">
            I'm a software engineer with 4+ years of experience building enterprise-grade applications.
            Passionate about creating scalable solutions that solve real business problems.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {expertise.map((item, index) => (
            <motion.div
              key={item.area}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-gradient-to-br from-slate-50 to-slate-100 p-6 rounded-2xl border border-slate-200 hover:shadow-xl transition-all"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl" role="img" aria-label={item.area}>
                  {item.icon}
                </span>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{item.area}</h3>
                  <p className="text-gray-600">{item.detail}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-slate-900 mb-6">Tech Stack</h3>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-purple-600 transition-colors cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
