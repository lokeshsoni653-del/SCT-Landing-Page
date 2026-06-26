import React from 'react';
import { motion } from 'framer-motion';
import {
  Target, Eye, Compass, MapPin,
  Users, BookOpen, TrendingUp, Heart
} from 'lucide-react';


const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const PILLARS = [
  { icon: Target,  color: '#f5c518', bg: '#f5c51815', title: 'Mission-Driven', desc: 'Empowering students through structured development programs.' },
  { icon: Eye,     color: '#60a5fa', bg: '#60a5fa15', title: 'Visionary',      desc: 'Building the next generation of leaders for Tharparkar.' },
  { icon: Compass, color: '#34d399', bg: '#34d39915', title: 'Inclusive',      desc: 'Open to every student regardless of background.' },
  { icon: Heart,   color: '#f87171', bg: '#f8717115', title: 'Community',      desc: 'Fostering bonds that last a lifetime.' },
];

const HIGHLIGHTS = [
  { value: '2024',       label: 'Founded' },
  { value: 'Mithi',      label: 'Based in' },
  { value: '1,478+',     label: 'Facebook Followers' },
  { value: '313+',       label: 'Instagram Followers' },
];

export default function About() {

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-padding bg-navy-950 relative overflow-hidden"
    >
      {/* Subtle background decoration */}
      <div aria-hidden="true" className="absolute top-0 right-0 w-96 h-96 bg-sct-gold/8 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div aria-hidden="true" className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* ─── Left: Text Content ─── */}
          <div>
            <motion.div variants={fadeUp}>
              <span className="section-badge" role="text">
                <MapPin size={13} aria-hidden="true" />
                Mithi, Tharparkar, Pakistan
              </span>
            </motion.div>

            <motion.h2
              id="about-heading"
              variants={fadeUp}
              className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-6"
            >
              Who We Are &amp;{' '}
              <span className="relative">
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #f5c518, #d4a017)' }}
                >
                  Why We Exist
                </span>
              </span>
            </motion.h2>

            <motion.p variants={fadeUp} className="text-white/60 text-base lg:text-lg leading-relaxed mb-6">
              <strong className="text-white font-semibold">Students Club Tharparkar (SCT)</strong> is a
              student-led non-profit organization based in Mithi, dedicated to unlocking the full potential
              of students across the Tharparkar region.
            </motion.p>

            <motion.p variants={fadeUp} className="text-white/60 text-base lg:text-lg leading-relaxed mb-8">
              We believe every student — regardless of geography or circumstance — deserves access to
              mentorship, skill-building, and a network that propels them forward. Through our 30+ programs
              and 10+ active communities, we are writing a new story for Tharparkar: one of ambition,
              growth, and shared success.
            </motion.p>

            {/* Highlights grid */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 mb-8">
              {HIGHLIGHTS.map((h) => (
                <div
                  key={h.label}
                  className="glass-card rounded-2xl p-4 text-center"
                >
                  <p className="font-display font-bold text-2xl text-white">{h.value}</p>
                  <p className="text-white/50 text-sm mt-0.5">{h.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUp}>
              <a
                href="#programs"
                id="about-explore-btn"
                aria-label="Explore SCT programs"
                className="inline-flex items-center gap-2 text-white font-semibold hover:text-sct-gold transition-colors group"
              >
                Explore Our Programs
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </a>
            </motion.div>
          </div>

          {/* ─── Right: Pillars Cards ─── */}
          <motion.div
            variants={stagger}
            className="grid grid-cols-2 gap-4"
          >
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                className="glass-card card-hover rounded-2xl p-5 cursor-default"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: pillar.bg, border: `1px solid ${pillar.color}30` }}
                >
                  <pillar.icon size={20} style={{ color: pillar.color }} aria-hidden="true" />
                </div>
                <h3 className="font-display font-bold text-white text-base mb-1.5">{pillar.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}

            {/* Large accent card spanning both columns */}
            <motion.div
              variants={fadeUp}
              className="col-span-2 rounded-2xl p-6 text-white relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2f5e 100%)' }}
            >
              <div aria-hidden="true" className="absolute top-0 right-0 w-32 h-32 bg-sct-gold/10 rounded-full blur-2xl translate-x-8 -translate-y-8" />
              <p className="font-display font-bold text-xl text-white mb-2 relative z-10">
                "Tharparkar Students Club: Learn, Grow, Succeed! 🎉"
              </p>
              <p className="text-white/60 text-sm relative z-10">
                Supporting students' academic, personal &amp; professional growth since 2024.
              </p>
              <div className="flex items-center gap-2 mt-4 relative z-10">
                <div className="w-2 h-2 rounded-full bg-sct-gold animate-pulse" aria-hidden="true" />
                <span className="text-sct-gold text-sm font-medium">Active &amp; Growing</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
