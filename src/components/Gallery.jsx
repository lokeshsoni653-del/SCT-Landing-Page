import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Sparkles, Eye, Award, Users, BookOpen } from 'lucide-react';

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Tech Bootcamp Mithi',
    category: 'Workshops',
    desc: 'Students coding web apps in our 2026 summer bootcamp.',
    icon: BookOpen,
    color: '#60a5fa',
  },
  {
    id: 2,
    title: 'Youth Debate Championship',
    category: 'Events',
    desc: 'Empowering young voices through public speaking & debate.',
    icon: Award,
    color: '#f5c518',
  },
  {
    id: 3,
    title: 'Rural Literacy Campaign',
    category: 'Activities',
    desc: 'Volunteers distributing books and stationery to village schools.',
    icon: Users,
    color: '#34d399',
  },
  {
    id: 4,
    title: 'Leadership Academy Cohort',
    category: 'Workshops',
    desc: 'Developing critical skills for local community leaders.',
    icon: Sparkles,
    color: '#c084fc',
  },
  {
    id: 5,
    title: 'Clean Tharparkar Drive',
    category: 'Activities',
    desc: 'Environmental awareness and cleanup drive in Mithi city.',
    icon: Users,
    color: '#f87171',
  },
  {
    id: 6,
    title: 'Annual SCT Meetup 2026',
    category: 'Events',
    desc: 'SCT family reunion celebrating a year of student success.',
    icon: Image,
    color: '#fb923c',
  },
];

const CATEGORIES = ['All', 'Events', 'Workshops', 'Activities'];

export default function Gallery() {
  const [filter, setFilter] = useState('All');

  const filteredItems = filter === 'All' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === filter);

  return (
    <section 
      id="gallery" 
      aria-labelledby="gallery-heading"
      className="section-padding bg-navy-950 relative overflow-hidden"
    >
      <div aria-hidden="true" className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-badge">
            <Image size={13} aria-hidden="true" />
            Photo Gallery
          </span>
          <h2 id="gallery-heading" className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mt-2 mb-4">
            Our{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #f5c518, #d4a017)' }}>
              Moments
            </span>
          </h2>
          <p className="text-white/50 text-base lg:text-lg">
            A visual showcase of our bootcamps, workshops, leadership academies, and student initiatives in action.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-10" role="tablist" aria-label="Gallery categories">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={filter === cat}
              aria-controls="gallery-grid"
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                filter === cat
                  ? 'bg-sct-gold text-navy-900 shadow-gold'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          id="gallery-grid"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <motion.article
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={item.id}
                  className="glass-card rounded-2xl p-6 flex flex-col justify-between card-hover cursor-default relative overflow-hidden group min-h-[220px]"
                >
                  {/* Decorative corner glow */}
                  <div 
                    className="absolute -top-10 -right-10 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" 
                    style={{ background: item.color }}
                    aria-hidden="true"
                  />

                  <div>
                    <span 
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-4 border"
                      style={{ background: `${item.color}15`, color: item.color, borderColor: `${item.color}30` }}
                    >
                      {item.category}
                    </span>
                    <h3 className="font-display font-bold text-white text-lg mb-2 group-hover:text-sct-gold transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-white/50 text-xs sm:text-sm leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${item.color}15` }}
                      >
                        <Icon size={16} style={{ color: item.color }} aria-hidden="true" />
                      </div>
                      <span className="text-xs text-white/40 font-medium">SCT Summer 2026</span>
                    </div>
                    <span className="text-xs font-semibold text-white/40 group-hover:text-sct-gold transition-colors flex items-center gap-1">
                      <Eye size={12} aria-hidden="true" />
                      View Project
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
