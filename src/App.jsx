import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaExternalLinkAlt, FaDownload, FaCode, FaServer, FaCloud, FaDatabase } from 'react-icons/fa';
import { HiMenuAlt3, HiX, HiArrowRight, HiChevronDown } from 'react-icons/hi';
import { SiReact, SiNodedotjs, SiPython, SiJavascript, SiTypescript, SiMongodb, SiPostgresql, SiDocker, SiAmazon, SiTailwindcss, SiNextdotjs, SiSpringboot, SiFlutter, SiFirebase, SiRedis, SiGraphql, SiGit } from 'react-icons/si';
import profileImg from './assets/images/ashir.jpg';
import resumePdf from './assets/MohammedAshir_Resume.pdf';
import './App.css';

// Project images
import msl1 from './assets/images/msl-1.png';
import msl2 from './assets/images/msl-2.png';
import msl3 from './assets/images/msl-3.png';
import due1 from './assets/images/due-1.png';
import due2 from './assets/images/due-2.png';
import due3 from './assets/images/due-3.png';

// Data
const personalInfo = {
  name: "Mohammed Ashir",
  title: "Software Engineer @ RAGIX Tech",
  location: "Dubai, UAE",
  email: "ashashir7@gmail.com",
  phone: "+971 569897765",
  github: "https://github.com/MohammedAshir",
  linkedin: "https://www.linkedin.com/in/mohammedashir",
  ragix: "https://ragix.tech",
  bio: "Full-stack engineer with 4+ years building scalable applications. Currently at RAGIX Tech, crafting custom software solutions for businesses across UAE. Specialized in MERN stack, cloud infrastructure, and e-commerce platforms."
};

const experiences = [
  {
    company: "RAGIX Tech",
    role: "Software Engineer",
    period: "Oct 2025 - Present",
    location: "Dubai, UAE",
    highlights: [
      "Building custom software solutions and web applications for businesses across UAE",
      "Developing scalable e-commerce platforms and mobile applications",
      "Leading full-stack development with modern tech stack (React, Node.js, Next.js)",
      "Managing cloud infrastructure and CI/CD pipelines on AWS"
    ],
    tech: ["React", "Next.js", "Node.js", "AWS", "MongoDB"]
  },
  {
    company: "Ray Fit Out Interior",
    role: "Software Engineer",
    period: "May 2025 - Sep 2025",
    location: "Dubai, UAE",
    highlights: [
      "Architected custom Odoo ERP modules for interior design operations",
      "Managed AWS infrastructure and deployment pipelines",
      "Built real-time inventory tracking systems"
    ],
    tech: ["Odoo", "Python", "AWS", "PostgreSQL"]
  },
  {
    company: "NAB Advertising",
    role: "Full-Stack Developer",
    period: "Feb 2024 - Apr 2025",
    location: "Dubai, UAE",
    highlights: [
      "Built multiple e-commerce platforms handling 10k+ daily transactions",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
      "Led migration of legacy systems to MERN stack"
    ],
    tech: ["React", "Node.js", "MongoDB", "Docker"]
  },
  {
    company: "Accenture (AT&T)",
    role: "Software Engineer",
    period: "Jan 2022 - Jan 2024",
    location: "India",
    highlights: [
      "Developed microservices handling 1M+ API calls daily",
      "Built React dashboards for real-time network monitoring",
      "Reduced system latency by 40% through optimization"
    ],
    tech: ["Java", "Spring Boot", "React", "Kubernetes"]
  }
];

const projects = [
  {
    title: "RAGIX Tech",
    description: "Software development company website. Custom software, web applications, and mobile apps for businesses in Dubai and across the UAE. No templates. No shortcuts.",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Node.js"],
    live: "https://ragix.tech",
    github: null,
    images: [],
    featured: true,
    highlight: true
  },
  {
    title: "RAGIX Store",
    description: "Full-featured e-commerce platform with product catalog, cart system, secure checkout, and order management. Accessories, home decor, digital goods & custom prints delivered across UAE.",
    tech: ["Next.js", "React", "Stripe", "Tailwind CSS", "MongoDB"],
    live: "https://ragixtech.store",
    github: null,
    images: [],
    featured: true,
    highlight: true
  },
  {
    title: "MakoShark E-commerce",
    description: "Full-stack e-commerce platform with AI-powered chatbot, real-time inventory, and comprehensive admin dashboard.",
    tech: ["React", "Node.js", "MongoDB", "JWT", "AI Integration"],
    live: "https://makoshark.netlify.app",
    github: "https://github.com/MohammedAshir",
    images: [msl1, msl2, msl3],
    featured: true
  },
  {
    title: "Mutual Fund Investment System",
    description: "Real-time investment tracking platform with analytics dashboard and portfolio management for financial advisors.",
    tech: ["React", "Firebase", "Chart.js", "Real-time DB"],
    live: null,
    github: null,
    images: [],
    featured: true,
    confidential: true
  },
  {
    title: "Due Tracker",
    description: "Restaurant management app for tracking customer dues, payments, and generating financial reports.",
    tech: ["Next.js", "PostgreSQL", "Tailwind", "PWA"],
    live: null,
    github: null,
    images: [due1, due2, due3],
    featured: true,
    confidential: true
  },
  {
    title: "Majma Technologies",
    description: "Corporate website for a tech solutions company with modern design and optimized performance.",
    tech: ["React", "Tailwind", "Framer Motion"],
    live: "https://majmatechnologies.com",
    github: null,
    images: [],
    featured: false
  },
  {
    title: "Lassi Hut",
    description: "Responsive cafe website with menu showcase and online ordering capabilities.",
    tech: ["React", "CSS3", "Responsive Design"],
    live: "https://lassihut.netlify.app",
    github: null,
    images: [],
    featured: false
  },
  {
    title: "Fodome",
    description: "Flutter mobile app connecting restaurants with surplus food to reduce waste.",
    tech: ["Flutter", "Dart", "Firebase", "Google Maps"],
    live: null,
    github: "https://github.com/MohammedAshir/fultterfodome",
    images: [],
    featured: false
  }
];

const skills = {
  frontend: {
    title: "Frontend",
    icon: FaCode,
    items: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "JavaScript", icon: SiJavascript }
    ]
  },
  backend: {
    title: "Backend",
    icon: FaServer,
    items: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Python", icon: SiPython },
      { name: "Spring Boot", icon: SiSpringboot },
      { name: "GraphQL", icon: SiGraphql }
    ]
  },
  cloud: {
    title: "Cloud & DevOps",
    icon: FaCloud,
    items: [
      { name: "AWS", icon: SiAmazon },
      { name: "Docker", icon: SiDocker },
      { name: "Git", icon: SiGit }
    ]
  },
  database: {
    title: "Database",
    icon: FaDatabase,
    items: [
      { name: "MongoDB", icon: SiMongodb },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Firebase", icon: SiFirebase },
      { name: "Redis", icon: SiRedis }
    ]
  },
  mobile: {
    title: "Mobile",
    icon: FaCode,
    items: [
      { name: "Flutter", icon: SiFlutter },
      { name: "React Native", icon: SiReact }
    ]
  }
};

// Navigation Component
function Navbar({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sections = ['home', 'about', 'experience', 'projects', 'contact'];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-dark/80 backdrop-blur-xl border-b border-white/5' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.button
            onClick={() => scrollTo('home')}
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="font-mono text-lg md:text-xl font-bold">
              <span className="text-accent">&lt;</span>
              <span className="text-white">MA</span>
              <span className="text-accent">/&gt;</span>
            </span>
          </motion.button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => scrollTo(section)}
                className={`px-4 py-2 text-sm font-medium capitalize transition-all duration-200 rounded-lg ${
                  activeSection === section
                    ? 'text-accent bg-accent/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {section}
              </button>
            ))}
            <a
              href={resumePdf}
              download="MohammedAshir_Resume.pdf"
              className="ml-4 px-4 py-2 bg-accent/10 border border-accent/30 text-accent rounded-lg text-sm font-medium hover:bg-accent/20 transition-all flex items-center gap-2"
            >
              <FaDownload className="text-xs" />
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-4 py-4 space-y-2">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => scrollTo(section)}
                  className={`block w-full text-left px-4 py-3 rounded-lg capitalize transition-all ${
                    activeSection === section
                      ? 'text-accent bg-accent/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {section}
                </button>
              ))}
              <a
                href={resumePdf}
                download="MohammedAshir_Resume.pdf"
                className="flex items-center gap-2 px-4 py-3 text-accent"
              >
                <FaDownload className="text-sm" />
                Download Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// Hero Section
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px] animate-pulse-slow delay-1000" />
      
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            {/* Terminal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-mono">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                Available for opportunities
              </div>
            </div>

            {/* Name & Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span className="text-gray-400 font-mono text-lg block mb-2">Hello, I'm</span>
              <span className="text-white">{personalInfo.name}</span>
            </h1>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-accent to-transparent" />
              <span className="text-xl sm:text-2xl text-gray-300 font-light">
                Software Engineer @ <a href="https://ragix.tech" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">RAGIX Tech</a>
              </span>
            </div>

            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-xl">
              {personalInfo.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <motion.button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group px-6 py-3 bg-accent text-dark font-semibold rounded-lg flex items-center gap-2 hover:shadow-lg hover:shadow-accent/25 transition-all"
              >
                View Projects
                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 border border-white/20 text-white font-medium rounded-lg hover:bg-white/5 transition-all"
              >
                Get In Touch
              </motion.button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-10">
              <span className="text-gray-500 text-sm">Find me on</span>
              <div className="h-px w-8 bg-gray-700" />
              <div className="flex gap-3">
                {[
                  { icon: FaGithub, href: personalInfo.github, label: "GitHub" },
                  { icon: FaLinkedin, href: personalInfo.linkedin, label: "LinkedIn" },
                  { icon: FaEnvelope, href: `mailto:${personalInfo.email}`, label: "Email" }
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-accent hover:border-accent/30 transition-all"
                    aria-label={social.label}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Content - Profile */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative">
              {/* Code Block Background */}
              <div className="absolute -inset-4 bg-gradient-to-br from-accent/20 via-transparent to-emerald-500/20 rounded-3xl blur-2xl" />
              
              {/* Profile Card */}
              <div className="relative bg-dark-100/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 max-w-sm">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs text-gray-500 font-mono ml-2">developer.tsx</span>
                </div>

                {/* Profile Image */}
                <div className="relative mb-6">
                  <div className="aspect-square rounded-xl overflow-hidden border-2 border-accent/30">
                    <img
                      src={profileImg}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Status Badge */}
                  <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-xs text-emerald-400 font-medium">Online</span>
                  </div>
                </div>

                {/* Code-style Info */}
                <div className="font-mono text-sm space-y-2">
                  <div>
                    <span className="text-purple-400">const</span>{' '}
                    <span className="text-blue-400">developer</span>{' '}
                    <span className="text-white">=</span>{' '}
                    <span className="text-yellow-400">{'{'}</span>
                  </div>
                  <div className="pl-4">
                    <span className="text-gray-400">name:</span>{' '}
                    <span className="text-emerald-400">"{personalInfo.name}"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-gray-400">role:</span>{' '}
                    <span className="text-emerald-400">"Software Engineer"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-gray-400">company:</span>{' '}
                    <span className="text-accent">"RAGIX Tech"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-gray-400">location:</span>{' '}
                    <span className="text-emerald-400">"{personalInfo.location}"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-gray-400">experience:</span>{' '}
                    <span className="text-orange-400">4</span>
                    <span className="text-gray-500">+ years</span>,
                  </div>
                  <div>
                    <span className="text-yellow-400">{'}'}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-accent"
          >
            <HiChevronDown size={24} />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// About Section with Skills
function AboutSection() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-accent">01.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">About Me</h2>
            <div className="h-px flex-1 max-w-[200px] bg-gradient-to-r from-white/20 to-transparent" />
          </div>
          <p className="text-gray-400 max-w-2xl">
            A quick overview of my technical toolkit and the technologies I work with daily.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([key, category], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-dark-100/50 backdrop-blur-sm border border-white/5 rounded-xl p-6 hover:border-accent/30 transition-all duration-300"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 bg-accent/10 rounded-lg text-accent">
                  <category.icon size={20} />
                </div>
                <h3 className="text-white font-semibold">{category.title}</h3>
              </div>

              {/* Skills List */}
              <div className="flex flex-wrap gap-2">
                {category.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg text-sm text-gray-300 hover:bg-accent/10 hover:text-accent transition-all cursor-default"
                  >
                    <skill.icon className="text-base" />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-3 gap-6"
        >
          {[
            { label: "Years Experience", value: "4+" },
            { label: "Projects Delivered", value: "15+" },
            { label: "Companies", value: "4" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white/[0.02] border border-white/5 rounded-xl">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Experience Section
function ExperienceSection() {
  const [activeExp, setActiveExp] = useState(0);

  return (
    <section id="experience" className="relative py-24 lg:py-32 bg-dark-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-accent">02.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Experience</h2>
            <div className="h-px flex-1 max-w-[200px] bg-gradient-to-r from-white/20 to-transparent" />
          </div>
          <p className="text-gray-400 max-w-2xl">
            My professional journey building software across startups and enterprises.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="grid lg:grid-cols-[250px,1fr] gap-8">
          {/* Company Tabs */}
          <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
            {experiences.map((exp, index) => (
              <button
                key={index}
                onClick={() => setActiveExp(index)}
                className={`flex-shrink-0 text-left px-4 py-3 rounded-lg border transition-all duration-200 ${
                  activeExp === index
                    ? 'bg-accent/10 border-accent/30 text-accent'
                    : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="font-medium whitespace-nowrap">{exp.company}</div>
                <div className="text-xs opacity-60 mt-0.5">{exp.period}</div>
              </button>
            ))}
          </div>

          {/* Experience Details */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeExp}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-dark-100/50 border border-white/5 rounded-xl p-6 md:p-8"
            >
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                  {experiences[activeExp].role}{' '}
                  <span className="text-accent">@ {experiences[activeExp].company}</span>
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <span className="font-mono">{experiences[activeExp].period}</span>
                  <span className="flex items-center gap-1">
                    <FaMapMarkerAlt className="text-xs" />
                    {experiences[activeExp].location}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-6">
                {experiences[activeExp].highlights.map((highlight, i) => (
                  <li key={i} className="flex gap-3 text-gray-300">
                    <span className="text-accent mt-1.5">
                      <HiArrowRight size={14} />
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {experiences[activeExp].tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs font-mono bg-accent/10 text-accent rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// Projects Section
function ProjectsSection() {
  const [filter, setFilter] = useState('featured');
  const filteredProjects = filter === 'featured'
    ? projects.filter(p => p.featured)
    : projects;

  // Separate highlighted projects (RAGIX)
  const highlightedProjects = filteredProjects.filter(p => p.highlight);
  const regularProjects = filteredProjects.filter(p => !p.highlight);

  return (
    <section id="projects" className="relative py-24 lg:py-32">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-accent">03.</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Projects</h2>
            <div className="h-px flex-1 max-w-[200px] bg-gradient-to-r from-white/20 to-transparent" />
          </div>
          <p className="text-gray-400 max-w-2xl">
            A selection of projects I've built, from software companies to e-commerce platforms.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex gap-4 mb-10">
          {['featured', 'all'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm font-medium capitalize rounded-lg transition-all ${
                filter === f
                  ? 'bg-accent text-dark'
                  : 'text-gray-400 hover:text-white bg-white/5 hover:bg-white/10'
              }`}
            >
              {f === 'featured' ? 'Featured' : 'All Projects'}
            </button>
          ))}
        </div>

        {/* Highlighted Projects (RAGIX) - Large Cards */}
        {highlightedProjects.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <AnimatePresence mode="popLayout">
              {highlightedProjects.map((project, index) => (
                <motion.a
                  key={project.title}
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group relative bg-gradient-to-br from-dark-100 to-dark-200 border border-accent/20 rounded-2xl overflow-hidden hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10"
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content */}
                  <div className="relative p-8">
                    {/* Badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-semibold rounded-full border border-accent/30">
                        FLAGSHIP PROJECT
                      </span>
                      <span className="flex items-center gap-1 text-emerald-400 text-xs">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                        Live
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 text-xs font-mono bg-white/5 text-gray-300 rounded-lg border border-white/10"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Link */}
                    <div className="flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all">
                      <span>Visit Website</span>
                      <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/20 to-transparent rounded-bl-full" />
                </motion.a>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Regular Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {regularProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="group relative bg-dark-100/50 border border-white/5 rounded-xl overflow-hidden hover:border-accent/30 transition-all duration-300"
              >
                {/* Project Image */}
                <div className="aspect-video bg-dark-200 relative overflow-hidden">
                  {project.images && project.images.length > 0 ? (
                    <img
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/10 to-emerald-500/10">
                      <FaCode className="text-4xl text-accent/30" />
                    </div>
                  )}
                  
                  {/* Overlay Links */}
                  <div className="absolute inset-0 bg-dark/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-accent text-dark rounded-full hover:scale-110 transition-transform"
                        aria-label="View Live"
                      >
                        <FaExternalLinkAlt size={16} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/10 text-white rounded-full hover:scale-110 transition-transform"
                        aria-label="View Code"
                      >
                        <FaGithub size={16} />
                      </a>
                    )}
                    {project.confidential && (
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                        Confidential
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs font-mono bg-white/5 text-gray-400 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="px-2 py-1 text-xs font-mono text-gray-500">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate sending
    setTimeout(() => {
      setStatus('sent');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 bg-dark-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="font-mono text-accent text-sm">04. What's Next?</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">Get In Touch</h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            I'm currently open to new opportunities. Whether you have a question or just want to say hi, my inbox is always open.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-dark-100/50 border border-white/5 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                {[
                  { icon: FaEnvelope, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
                  { icon: FaPhone, label: "Phone", value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
                  { icon: FaMapMarkerAlt, label: "Location", value: personalInfo.location },
                  { icon: FaGithub, label: "GitHub", value: "MohammedAshir", href: personalInfo.github },
                  { icon: FaLinkedin, label: "LinkedIn", value: "mohammedashir", href: personalInfo.linkedin }
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="p-3 bg-accent/10 rounded-lg text-accent">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">{item.label}</div>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="text-gray-300 hover:text-accent transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-gray-300">{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="bg-dark-100/50 border border-white/5 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">Send a Message</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-400 mb-2">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-400 mb-2">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm text-gray-400 mb-2">Message</label>
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    status === 'sent'
                      ? 'bg-emerald-500 text-white'
                      : 'bg-accent text-dark hover:shadow-lg hover:shadow-accent/25'
                  }`}
                >
                  {status === 'sending' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : status === 'sent' ? (
                    'Message Sent!'
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-mono text-sm text-gray-500">
            <span className="text-accent">&lt;</span>
            Built with React & Tailwind
            <span className="text-accent">/&gt;</span>
          </div>
          <div className="text-sm text-gray-500">
            {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </div>
          <div className="flex gap-4">
            {[
              { icon: FaGithub, href: personalInfo.github },
              { icon: FaLinkedin, href: personalInfo.linkedin }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-accent transition-colors"
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Main App
function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading Screen
  if (loading) {
    return (
      <div className="fixed inset-0 bg-dark flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative mb-6">
            <div className="w-16 h-16 border-4 border-accent/20 rounded-full" />
            <div className="absolute inset-0 w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
          <div className="font-mono text-accent">
            <span className="text-gray-400">&lt;</span>
            Loading
            <span className="text-gray-400">/&gt;</span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-dark min-h-screen text-white overflow-x-hidden">
      <Navbar activeSection={activeSection} />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
