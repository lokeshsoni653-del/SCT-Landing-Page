import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, BookOpen, Globe2, Heart, Trophy, MapPin } from 'lucide-react';

/* ─── Custom CountUp Component ─── */
function CountUp({ end, duration = 2.0, suffix = '', separator = ',' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const startValue = 0;
    const endValue = parseInt(end, 10);
    if (isNaN(endValue)) return;

    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const currentCount = Math.floor(progress * (endValue - startValue) + startValue);
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration]);

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  };

  return <>{formatNumber(count)}{suffix}</>;
}

const STATS = [
  { icon: Users,    value: 500,  suffix: '+', label: 'Active Members',  desc: 'Motivated students from universities & schools across Tharparkar.', color: '#f5c518' },
  { icon: BookOpen, value: 30,   suffix: '+', label: 'Programs Run',    desc: 'Bootcamps, workshops, leadership academies, and training sessions.', color: '#60a5fa' },
  { icon: Globe2,   value: 10,   suffix: '+', label: 'Local Communities', desc: 'Regional community groups spreading education and awareness.', color: '#34d399' },
  { icon: Heart,    value: 1000, suffix: '+', label: 'Beneficiaries',   desc: 'Rural and urban students empowered through resources & books.', color: '#f87171' },
  { icon: Trophy,   value: 50,   suffix: '+', label: 'Success Stories', desc: 'SCT alumni landing internships, jobs, and winning competitions.', color: '#c084fc' },
  { icon: MapPin,   value: 20,   suffix: '+', label: 'Villages Covered', desc: 'Outreach programs conducted in rural areas of Tharparkar.', color: '#fb923c' },
];

export default function ImpactNumbers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section 
      id="impact-numbers" 
      aria-labelledby="impact-heading"
      className="section-padding bg-navy-950 relative overflow-hidden"
    >
      {/* Decorative Orbs */}
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-sct-gold/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-badge">
            <Trophy size={13} aria-hidden="true" />
            SCT Achievements
          </span>
          <h2 id="impact-heading" className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mt-2 mb-4">
            Making a Real{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #f5c518, #d4a017)' }}>
              Difference
            </span>
          </h2>
          <p className="text-white/50 text-base lg:text-lg">
            Our numbers tell the story of dedicated students coming together to build a brighter future for the Tharparkar region.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label="SCT statistics">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card rounded-2xl p-6 text-center card-hover cursor-default relative overflow-hidden group"
                role="listitem"
              >
                <div 
                  className="absolute top-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300 rounded-t-2xl" 
                  style={{ background: stat.color }}
                  aria-hidden="true" 
                />
                
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}
                >
                  <Icon size={20} style={{ color: stat.color }} aria-hidden="true" />
                </div>
                
                <div className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-none mb-2">
                  {inView ? (
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </div>
                
                <h3 className="font-display font-bold text-white text-base mb-1">{stat.label}</h3>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{stat.desc}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
