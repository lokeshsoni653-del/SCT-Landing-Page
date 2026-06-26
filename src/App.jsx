import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Programs from './components/Programs.jsx';
import WhyJoin from './components/WhyJoin.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

/* ─── Back to Top Button ─── */
function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{   opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{  scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll back to top of page"
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-gold-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #f5c518, #d4a017)' }}
        >
          <ArrowUp size={20} className="text-navy-900" strokeWidth={2.5} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─── Progress Bar ─── */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px]"
      style={{ background: 'transparent' }}
    >
      <div
        className="h-full transition-[width] duration-150"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #f5c518, #d4a017, #f5c518)',
        }}
        aria-hidden="true"
      />
    </div>
  );
}

/* ─── Root App ─── */
export default function App() {
  return (
    <>
      <ScrollProgress />
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[70] focus:top-4 focus:left-4 focus:bg-sct-gold focus:text-navy-900 focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Programs />
        <WhyJoin />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </>
  );
}
