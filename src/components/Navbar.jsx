import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, ChevronDown, GraduationCap
} from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home',      href: '#hero' },
  { label: 'About',     href: '#about' },
  { label: 'Programs',  href: '#programs' },
  { label: 'Why Join',  href: '#why-join' },
  { label: 'Contact',   href: '#contact' },
];

export default function Navbar() {
  const [isScrolled,  setIsScrolled]  = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeLink,  setActiveLink]  = useState('#hero');
  const menuRef = useRef(null);

  /* ── Scroll handler ── */
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Highlight active section
      const sections = NAV_LINKS.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveLink(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Close menu on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  /* ── Close menu on escape ── */
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    setActiveLink(href);
  };

  return (
    <motion.header
      role="banner"
      aria-label="Main navigation"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-navy-900/95 backdrop-blur-xl shadow-2xl border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] lg:h-20">

          {/* ─── Brand Logo ─── */}
          <a
            href="#hero"
            aria-label="Students Club Tharparkar — Home"
            onClick={() => handleNavClick('#hero')}
            className="flex items-center gap-3 group flex-shrink-0"
          >
            <div className="relative w-10 h-10 lg:w-12 lg:h-12">
              {/* Logo ring */}
              <div className="absolute inset-0 rounded-full bg-gold-gradient opacity-20 group-hover:opacity-40 transition-opacity animate-spin-slow" />
              <div className="relative flex items-center justify-center w-full h-full rounded-full bg-gradient-to-br from-sct-gold to-sct-goldDark shadow-gold">
                <GraduationCap
                  size={20}
                  className="text-navy-900 lg:w-6 lg:h-6"
                  aria-hidden="true"
                  strokeWidth={2.5}
                />
              </div>
            </div>
            <div className="flex flex-col -space-y-0.5">
              <span className="font-display font-bold text-white text-base lg:text-lg leading-tight">
                SCT
              </span>
              <span className="text-sct-gold text-[10px] lg:text-xs font-medium tracking-wider uppercase leading-tight hidden xs:block">
                Tharparkar
              </span>
            </div>
          </a>

          {/* ─── Desktop Nav ─── */}
          <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`nav-link px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeLink === link.href
                    ? 'text-sct-gold bg-white/5'
                    : 'text-white/75 hover:text-white hover:bg-white/5'
                }`}
                aria-current={activeLink === link.href ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* ─── CTA + Hamburger ─── */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <a
              href="#contact"
              id="nav-join-btn"
              onClick={() => handleNavClick('#contact')}
              className="hidden lg:inline-flex btn-primary text-sm px-6 py-3 min-h-[44px]"
              aria-label="Join SCT — Contact us to get started"
            >
              Join SCT
            </a>

            {/* Hamburger */}
            <button
              ref={menuRef}
              id="mobile-menu-toggle"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
              className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white focus-visible:ring-2 focus-visible:ring-sct-gold"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate: 90,   opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={22} aria-hidden="true" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90,  opacity: 0 }}
                    animate={{ rotate: 0,   opacity: 1 }}
                    exit={{   rotate: -90,  opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={22} aria-hidden="true" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* ─── Mobile Drawer ─── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{   opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden overflow-hidden bg-navy-900/98 backdrop-blur-xl border-t border-white/10"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className={`flex items-center px-4 py-3.5 rounded-xl text-base font-medium min-h-[48px] transition-all ${
                    activeLink === link.href
                      ? 'bg-sct-gold/15 text-sct-gold border border-sct-gold/30'
                      : 'text-white/80 hover:text-white hover:bg-white/8'
                  }`}
                  aria-current={activeLink === link.href ? 'page' : undefined}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => handleNavClick('#contact')}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.06 }}
                className="btn-primary mt-2 justify-center min-h-[52px]"
                aria-label="Join SCT"
              >
                Join SCT Now
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
