import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects';
import Upcoming from './components/Upcoming';
import Resume from './components/Resume';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <AnimatePresence mode="wait">
      <Router>
        <div className="bg-white text-gray-900">
          <Navbar />
          <main>
            <Hero />
            <Projects />
            <Upcoming />
            <Resume />
            <Contact />
          </main>
          <Footer />
        </div>
      </Router>
    </AnimatePresence>
  );
}

export default App;