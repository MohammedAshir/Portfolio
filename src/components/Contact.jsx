import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowUpRightIcon,
} from '@heroicons/react/24/outline';
import {
  FaLinkedin,
  FaGithub,
  FaFileAlt,
  FaXTwitter,
} from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const Contact = () => {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const form = useRef();

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mohammedashir/',
      icon: <FaLinkedin className="w-5 h-5" />,
      color: 'text-[#0A66C2]',
      bg: 'bg-[#0A66C2]/10',
    },
    {
      name: 'GitHub',
      url: 'https://github.com/MohammedAshir',
      icon: <FaGithub className="w-5 h-5" />,
      color: 'text-gray-800',
      bg: 'bg-gray-800/10',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setShowModal(false);
        form.current.reset();
      }, 2000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-28 px-6 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-indigo-400 filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-indigo-600 filter blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-3"
          >
            <span className="text-sm font-medium py-1 px-3 rounded-full bg-indigo-100 text-indigo-600">
              Contact
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
          >
            Let's Connect
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Whether you have a project in mind or just want to chat, I'd love to hear from you.
          </motion.p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all lg:col-span-2"
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Contact Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <EnvelopeIcon className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                  <a
                    href="mailto:ashashir7@gmail.com"
                    className="text-gray-800 hover:text-indigo-600 transition-colors flex items-center gap-1"
                  >
                    ashashir7@gmail.com
                    <ArrowUpRightIcon className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <PhoneIcon className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Phone</p>
                  <div className="space-y-1">
                    <a href="tel:+971569897765" className="text-gray-800 hover:text-indigo-600 transition-colors block">
                      +971 56989 7765 (UAE)
                    </a>
                    <a href="tel:+918138831013" className="text-gray-800 hover:text-indigo-600 transition-colors block">
                      +91 81388 31013 (India)
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-indigo-50 transition-colors">
                <div className="p-3 bg-indigo-100 rounded-lg">
                  <MapPinIcon className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Location</p>
                  <p className="text-gray-800">Dubai, United Arab Emirates</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-10 pt-6 border-t border-gray-100">
              <h4 className="text-sm font-medium text-gray-500 mb-4">Connect With Me</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-lg transition-all flex items-center gap-2 ${social.bg} hover:shadow-sm`}
                  >
                    <span className={social.color}>{social.icon}</span>
                    <span className="text-sm font-medium text-gray-700">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all"
          >
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 focus:outline-none transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 focus:outline-none transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 focus:outline-none transition-all"
                  placeholder="Regarding..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 focus:outline-none transition-all"
                  placeholder="Hello, I'd like to discuss..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-6 py-3 text-white rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                  isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowUpRightIcon className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Success Modal */}
      {submitSuccess && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Message Sent!</h3>
            <p className="text-gray-600 mb-6">Thank you for reaching out. I'll get back to you soon.</p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Contact;