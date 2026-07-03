import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2, Mic, BookMarked, Users, Trophy,
  Lightbulb, Heart, ArrowRight, X, Play
} from 'lucide-react';


const PROGRAMS = [
  {
    id: 'tech-bootcamp',
    icon: Code2,
    color: '#60a5fa',
    bgFrom: '#1a237e',
    bgTo:   '#283593',
    tag: 'Technology',
    title: 'Tech Bootcamps',
    shortDesc: 'Intensive coding & digital skills workshops for the next generation of developers.',
    fullDesc: 'Our Tech Bootcamps are immersive 2-4 week programs covering web development, mobile apps, Python, and more. Industry mentors guide students through real-world projects, culminating in live demos and portfolio building.',
    duration: '4 Weeks',
    level: 'Beginner–Advanced',
    seats: '30 seats',
    date: 'July 15, 2026',
    time: '09:00 AM - 01:00 PM',
    location: 'SCT IT Lab, Mithi',
  },
  {
    id: 'leadership',
    icon: Trophy,
    color: '#f5c518',
    bgFrom: '#1a237e',
    bgTo:   '#283593',
    tag: 'Leadership',
    title: 'Leadership Academy',
    shortDesc: 'Forging tomorrow\'s leaders through workshops, mentorship, and community projects.',
    fullDesc: 'The SCT Leadership Academy is a 3-month cohort program that develops critical thinking, public speaking, project management, and social entrepreneurship skills through hands-on community initiatives.',
    duration: '3 Months',
    level: 'Intermediate',
    seats: '20 seats',
    date: 'July 20, 2026',
    time: '11:00 AM - 02:00 PM',
    location: 'SCT Mithi Center',
  },
  {
    id: 'public-speaking',
    icon: Mic,
    color: '#34d399',
    bgFrom: '#1a237e',
    bgTo:   '#283593',
    tag: 'Communication',
    title: 'Public Speaking',
    shortDesc: 'Building confident voices through debate clubs, speech competitions & media training.',
    fullDesc: 'From complete beginner to confident presenter — our Public Speaking program combines Toastmasters-style structured speeches, debate tournaments, and media training. Students perform at regional and national levels.',
    duration: '6 Weeks',
    level: 'All Levels',
    seats: '25 seats',
    date: 'July 25, 2026',
    time: '03:00 PM - 05:00 PM',
    location: 'Mithi Press Club',
  },
  {
    id: 'career-prep',
    icon: BookMarked,
    color: '#c084fc',
    bgFrom: '#1a237e',
    bgTo:   '#283593',
    tag: 'Career',
    title: 'Career Development',
    shortDesc: 'CV building, interview prep, LinkedIn optimization, and industry networking sessions.',
    fullDesc: 'Comprehensive career readiness program including resume workshops, mock interview sessions, LinkedIn profile optimization, and direct access to our industry mentor network spanning tech, education, government, and NGO sectors.',
    duration: '2 Months',
    level: 'All Levels',
    seats: '40 seats',
    date: 'August 01, 2026',
    time: '10:00 AM - 12:00 PM',
    location: 'SCT Mithi Center / Zoom',
  },
  {
    id: 'community-service',
    icon: Heart,
    color: '#f87171',
    bgFrom: '#1a237e',
    bgTo:   '#283593',
    tag: 'Social Impact',
    title: 'Community Service',
    shortDesc: 'Driving real change in Tharparkar through clean drives, literacy campaigns & health awareness.',
    fullDesc: 'SCT Community Service connects students with meaningful volunteer opportunities across Tharparkar — from literacy programs in rural villages to environmental clean-up drives and health awareness campaigns.',
    duration: 'Ongoing',
    level: 'All Levels',
    seats: 'Unlimited',
    date: 'August 05, 2026',
    time: '08:00 AM - 12:00 PM',
    location: 'Various Villages, Thar',
  },
  {
    id: 'innovation',
    icon: Lightbulb,
    color: '#fb923c',
    bgFrom: '#1a237e',
    bgTo:   '#283593',
    tag: 'Innovation',
    title: 'Idea Hackathons',
    shortDesc: '48-hour hackathons challenging students to solve local problems with creative thinking.',
    fullDesc: 'Themed around real Tharparkar challenges — water scarcity, education access, digital inclusion — our hackathons bring together diverse teams to prototype, test, and pitch solutions. Winners receive mentorship and seed support.',
    duration: '48 Hours',
    level: 'All Levels',
    seats: '60 seats',
    date: 'August 12, 2026',
    time: '48 Hours Challenge',
    location: 'SCT Mithi Auditorium',
  },
];

/* ─── Program Card ─── */
function ProgramCard({ program, onClick, index }) {
  const Icon = program.icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
      className="group relative rounded-3xl overflow-hidden cursor-pointer"
      style={{ background: `linear-gradient(145deg, ${program.bgFrom}, ${program.bgTo})` }}
      onClick={() => onClick(program)}
      onKeyDown={(e) => e.key === 'Enter' && onClick(program)}
      tabIndex={0}
      role="button"
      aria-label={`Learn more about ${program.title}`}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl blur-xl"
        aria-hidden="true"
        style={{ background: program.color }}
      />

      {/* Border animation */}
      <div
        className="absolute inset-0 rounded-3xl border opacity-20 group-hover:opacity-60 transition-opacity duration-300"
        aria-hidden="true"
        style={{ borderColor: program.color }}
      />

      <div className="relative z-10 p-6 lg:p-7">
        {/* Tag */}
        <span
          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-4"
          style={{ background: `${program.color}20`, color: program.color, border: `1px solid ${program.color}30` }}
        >
          {program.tag}
        </span>

        {/* Icon */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: `${program.color}20` }}
        >
          <Icon size={22} style={{ color: program.color }} aria-hidden="true" />
        </div>

        <h3 className="font-display font-bold text-white text-xl mb-2 group-hover:text-sct-gold transition-colors duration-300">
          {program.title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-5">{program.shortDesc}</p>

        {/* Date, Time, Location details */}
        <div className="space-y-1.5 text-xs text-white/70 mb-5 border-t border-white/5 pt-4">
          <div className="flex items-center gap-1.5">
            <span className="text-sct-gold">📅</span>
            <span>{program.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sct-gold">🕒</span>
            <span>{program.time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-sct-gold">📍</span>
            <span className="truncate">{program.location}</span>
          </div>
        </div>

        {/* CTA Actions */}
        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-white/50 group-hover:text-white transition-colors">
            <Play size={12} aria-hidden="true" />
            Details
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick(program);
            }}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-sct-gold text-navy-900 shadow-gold hover:scale-105 active:scale-95 transition-all"
            aria-label={`Register for ${program.title}`}
          >
            Register Now
          </button>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Program Modal ─── */
function ProgramModal({ program, onClose }) {
  const Icon = program.icon;
  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{   opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true" />

        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1,   opacity: 1, y: 0  }}
          exit={{   scale: 0.9, opacity: 0, y: 20  }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="relative max-w-lg w-full rounded-3xl overflow-hidden shadow-2xl"
          style={{ background: `linear-gradient(145deg, ${program.bgFrom}, ${program.bgTo})` }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close program details"
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X size={18} aria-hidden="true" />
          </button>

          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: `${program.color}25` }}
              >
                <Icon size={28} style={{ color: program.color }} aria-hidden="true" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: program.color }}>
                  {program.tag}
                </span>
                <h2 id="modal-title" className="font-display font-bold text-white text-2xl">{program.title}</h2>
              </div>
            </div>

            <p className="text-white/70 leading-relaxed mb-6">{program.fullDesc}</p>

            {/* Date, Time, Location */}
            <div className="space-y-2.5 text-xs sm:text-sm text-white/80 mb-6 bg-white/5 border border-white/10 rounded-2xl p-4">
              <div className="flex items-center gap-2">
                <span>📅</span>
                <strong>Date:</strong>
                <span>{program.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🕒</span>
                <strong>Time:</strong>
                <span>{program.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📍</span>
                <strong>Location:</strong>
                <span>{program.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {[['⏱', program.duration, 'Duration'], ['📊', program.level, 'Level'], ['🎯', program.seats, 'Capacity']].map(([emoji, val, lbl]) => (
                <div key={lbl} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                  <div className="text-lg">{emoji}</div>
                  <div className="text-white font-semibold text-sm">{val}</div>
                  <div className="text-white/40 text-xs">{lbl}</div>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              onClick={onClose}
              className="btn-primary w-full justify-center text-center"
              aria-label={`Register for ${program.title}`}
            >
              Register Now
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Upcoming Events & Programs Section ─── */
export default function Programs() {
  const [activeProgram, setActiveProgram] = useState(null);

  // Close modal on Escape
  React.useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setActiveProgram(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <section
        id="programs"
        aria-labelledby="programs-heading"
        className="section-padding bg-navy-900 relative overflow-hidden"
      >
        {/* Background decor */}
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(245,197,24,0.8) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-sct-gold/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="section-badge">
              <Trophy size={13} aria-hidden="true" />
              SCT Events &amp; Programs
            </span>
            <h2 id="programs-heading" className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mt-2 mb-4">
              Upcoming Events &amp;{' '}
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #f5c518, #d4a017)' }}
              >
                Programs
              </span>
            </h2>
            <p className="text-white/50 text-base lg:text-lg">
              Join our latest bootcamps and upcoming cohorts designed to accelerate your skills and foster leadership.
            </p>
          </motion.div>

          {/* Programs Grid */}
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            role="list"
            aria-label="SCT programs list"
          >
            {PROGRAMS.map((program, i) => (
              <div key={program.id} role="listitem">
                <ProgramCard program={program} onClick={setActiveProgram} index={i} />
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-14"
          >
            <p className="text-white/40 text-sm mb-4">All programs are FREE for registered SCT members</p>
            <a
              href="#contact"
              id="programs-join-btn"
              aria-label="Join SCT to access all programs"
              className="btn-primary"
            >
              Join to Access All Programs
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      {activeProgram && (
        <ProgramModal program={activeProgram} onClose={() => setActiveProgram(null)} />
      )}
    </>
  );
}
