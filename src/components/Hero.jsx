import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Users, BookOpen, Globe, Heart,
  ArrowRight, ChevronDown, Sparkles
} from 'lucide-react';

/* ─── Animated Particles ─── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size:   Math.random() * 4 + 2,
  x:      Math.random() * 100,
  y:      Math.random() * 100,
  delay:  Math.random() * 6,
  duration: Math.random() * 4 + 4,
}));

function Particle({ size, x, y, delay, duration }) {
  return (
    <div
      aria-hidden="true"
      className="particle"
      style={{
        width:     `${size}px`,
        height:    `${size}px`,
        left:      `${x}%`,
        top:       `${y}%`,
        animationDelay:    `${delay}s`,
        animationDuration: `${duration}s`,
        opacity: 0.4,
      }}
    />
  );
}

/* ─── Custom CountUp Component (React 19 Safe) ─── */
function CountUp({ end, duration = 2.5, suffix = '', separator = ',' }) {
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

/* ─── Stats Data ─── */
const STATS = [
  { icon: Users,    value: 500,  suffix: '+', label: 'Active Members',  color: '#f5c518' },
  { icon: BookOpen, value: 30,   suffix: '+', label: 'Programs',        color: '#60a5fa' },
  { icon: Globe,    value: 10,   suffix: '+', label: 'Communities',     color: '#34d399' },
  { icon: Heart,    value: 1000, suffix: '+', label: 'Beneficiaries',   color: '#f87171' },
];

function StatCard({ icon: Icon, value, suffix, label, color, inView }) {
  return (
    <div className="stat-card min-w-[130px] xs:min-w-0">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
        style={{ background: `${color}20`, border: `1px solid ${color}40` }}
      >
        <Icon size={18} style={{ color }} aria-hidden="true" />
      </div>
      <div
        className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-none mb-1"
        aria-label={`${value}${suffix} ${label}`}
      >
        {inView ? (
          <CountUp end={value} duration={2.5} suffix={suffix} separator="," />
        ) : (
          `0${suffix}`
        )}
      </div>
      <p className="text-white/50 text-xs sm:text-sm font-medium">{label}</p>
    </div>
  );
}

/* ─── Floating Orb ─── */
function FloatingOrb({ className, delay = 0 }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute rounded-full opacity-15 blur-3xl animate-float ${className}`}
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

export default function Hero() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });

  return (
    <section
      id="hero"
      aria-label="Welcome to Students Club Tharparkar"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-hero-gradient"
    >
      {/* ── Background: Mesh gradient blobs ── */}
      <FloatingOrb className="w-[500px] h-[500px] bg-sct-gold top-[-100px] left-[-150px]" delay={0} />
      <FloatingOrb className="w-[600px] h-[600px] bg-blue-600 bottom-[-200px] right-[-200px]" delay={3} />
      <FloatingOrb className="w-[300px] h-[300px] bg-purple-600 top-[40%] left-[30%]" delay={1.5} />

      {/* ── Particles ── */}
      <div className="particles-container" aria-hidden="true">
        {PARTICLES.map((p) => <Particle key={p.id} {...p} />)}
      </div>

      {/* ── Grid overlay pattern ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ── Main Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-28 w-full">
        <div className="text-center max-w-4xl mx-auto">

          {/* Badge */}
          <div className="animate-hero-1">
            <span className="section-badge cursor-default" role="text">
              <Sparkles size={14} aria-hidden="true" />
              Tharparkar's Premier Student Organization
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-hero-2 font-display font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-[1.05] mt-4 mb-6">
            Empowering{' '}
            <span className="relative inline-block">
              <span className="text-gold-shimmer">Students,</span>
            </span>
            <br />
            Building{' '}
            <span className="relative">
              <span className="text-gold-shimmer">Future Leaders</span>
              {/* Underline decoration */}
              <svg
                aria-hidden="true"
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 8"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 4 Q75 0 150 4 Q225 8 300 4"
                  stroke="url(#underline-gradient)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="underline-gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop stopColor="#f5c518" />
                    <stop offset="1" stopColor="#d4a017" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          {/* Subtext */}
          <p className="animate-hero-3 text-white/60 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mx-auto mb-10">
            Join Students Club Tharparkar — where ambition meets opportunity. We ignite potential,
            forge connections, and transform students into the change-makers of tomorrow.
          </p>

          {/* CTA Buttons */}
          <div className="animate-hero-4 flex flex-col xs:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#contact"
              id="hero-join-btn"
              aria-label="Get involved with SCT — navigate to contact section"
              className="btn-primary text-base w-full xs:w-auto"
            >
              Get Involved
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a
              href="#about"
              id="hero-learn-btn"
              aria-label="Learn more about SCT — navigate to about section"
              className="btn-outline text-base w-full xs:w-auto"
            >
              Explore SCT
              <ChevronDown size={18} aria-hidden="true" />
            </a>
          </div>

          {/* Stats Bar */}
          <div className="animate-hero-5" ref={statsRef}>
            <div
              className="glass-card rounded-2xl lg:rounded-3xl p-6 lg:p-8"
              role="region"
              aria-label="SCT statistics"
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                {STATS.map((stat) => (
                  <StatCard key={stat.label} {...stat} inView={statsInView} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce-slow"
      >
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-sct-gold/60 rounded-full" />
        <ChevronDown size={16} className="text-sct-gold/60" />
      </div>
    </section>
  );
}
