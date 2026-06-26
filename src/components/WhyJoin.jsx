import React from 'react';
import { motion } from 'framer-motion';
import {
  Zap, Users, BookOpen, Globe, Award,
  Handshake, Lightbulb, TrendingUp, Star,
  Shield, Rocket, Heart
} from 'lucide-react';


const BENEFITS = [
  {
    icon: Zap,
    color: '#f5c518',
    title: 'Skill Acceleration',
    desc: 'Fast-track your professional skills through hands-on workshops and real-world projects led by industry experts.',
  },
  {
    icon: Users,
    color: '#60a5fa',
    title: 'Powerful Network',
    desc: 'Connect with 500+ motivated peers, alumni, and mentors who open doors to opportunities across Pakistan.',
  },
  {
    icon: Award,
    color: '#34d399',
    title: 'Certified Programs',
    desc: 'Earn verifiable certificates from every program to boost your CV and stand out in competitive job markets.',
  },
  {
    icon: Handshake,
    color: '#c084fc',
    title: 'Mentorship Access',
    desc: 'Get paired with experienced professionals who guide your academic and career journey with personalized advice.',
  },
  {
    icon: Globe,
    color: '#fb923c',
    title: 'Real Impact',
    desc: 'Contribute to community initiatives that create meaningful change across Tharparkar — your work truly matters.',
  },
  {
    icon: Rocket,
    color: '#f87171',
    title: 'Career Launchpad',
    desc: 'Access exclusive internship referrals, job boards, and career fairs through our growing employer partnerships.',
  },
  {
    icon: Lightbulb,
    color: '#fde68a',
    title: 'Innovation Culture',
    desc: 'Be part of a creative ecosystem where ideas are celebrated, hackathons are frequent, and entrepreneurship thrives.',
  },
  {
    icon: Shield,
    color: '#86efac',
    title: 'Safe Community',
    desc: 'A welcoming, inclusive, and safe space for students from all walks of life to learn, grow, and belong.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Areeba Soomro',
    role: 'Computer Science Student',
    quote: 'SCT\'s Tech Bootcamp completely changed my trajectory. I landed my first freelance project within a month!',
    avatar: 'A',
    color: '#f5c518',
  },
  {
    name: 'Muhammad Ali Junejo',
    role: 'Business Student',
    quote: 'The Leadership Academy taught me skills my university never could. The mentors are incredible.',
    avatar: 'M',
    color: '#60a5fa',
  },
  {
    name: 'Fatima Bhanbhro',
    role: 'Medical Student',
    quote: 'Through SCT\'s community programs, I found purpose beyond my degree. This club is a family.',
    avatar: 'F',
    color: '#34d399',
  },
];

function BenefitCard({ icon: Icon, color, title, desc, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
      className="group relative bg-white border border-slate-100 rounded-2xl p-6 card-hover shadow-sm overflow-hidden"
      role="article"
    >
      {/* Subtle gradient on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-2xl"
        aria-hidden="true"
        style={{ background: color }}
      />

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        <Icon size={22} style={{ color }} aria-hidden="true" />
      </div>

      <h3 className="font-display font-bold text-navy-900 text-lg mb-2">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-b-2xl"
        aria-hidden="true"
        style={{ background: color }}
      />
    </motion.div>
  );
}

function TestimonialCard({ name, role, quote, avatar, color, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-navy-900/5 border border-navy-900/8 rounded-2xl p-6 relative"
      role="article"
      aria-label={`Testimonial from ${name}`}
    >
      {/* Quote mark */}
      <div aria-hidden="true" className="absolute top-4 right-5 text-6xl font-serif text-navy-900/10 leading-none select-none">"</div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-3" aria-label="5 star rating">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className="fill-sct-gold text-sct-gold" aria-hidden="true" />
        ))}
      </div>

      <blockquote className="text-navy-900/70 text-sm leading-relaxed mb-4 relative z-10">
        "{quote}"
      </blockquote>

      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm text-white"
          style={{ background: color }}
          aria-hidden="true"
        >
          {avatar}
        </div>
        <div>
          <p className="font-semibold text-navy-900 text-sm">{name}</p>
          <p className="text-slate-400 text-xs">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyJoin() {

  return (
    <section
      id="why-join"
      aria-labelledby="why-join-heading"
      className="section-padding bg-sct-offWhite relative overflow-hidden"
    >
      {/* Decorative blobs */}
      <div aria-hidden="true" className="absolute top-0 left-0 w-72 h-72 bg-sct-gold/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div aria-hidden="true" className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="section-badge" role="text">
            <Star size={13} aria-hidden="true" />
            Why Choose SCT
          </span>
          <h2
            id="why-join-heading"
            className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-navy-900 leading-tight mt-2 mb-4"
          >
            8 Reasons to Join{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #f5c518, #d4a017)' }}
            >
              SCT Today
            </span>
          </h2>
          <p className="text-slate-500 text-base lg:text-lg">
            Joining SCT isn't just about attending events — it's about transformation.
            Here's what every member gains:
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20"
          role="list"
          aria-label="SCT membership benefits"
        >
          {BENEFITS.map((benefit, i) => (
            <div key={benefit.title} role="listitem">
              <BenefitCard {...benefit} index={i} />
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="divider-gold mx-auto max-w-xs mb-16" aria-hidden="true" />

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h3 className="font-display font-bold text-navy-900 text-2xl sm:text-3xl">
            What Our Members Say
          </h3>
        </motion.div>

        <div
          className="grid md:grid-cols-3 gap-5 mb-14"
          role="list"
          aria-label="Member testimonials"
        >
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} role="listitem">
              <TestimonialCard {...t} index={i} />
            </div>
          ))}
        </div>

        {/* Final CTA banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden text-white text-center py-14 px-8"
          style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2f5e 60%, #0a1628 100%)' }}
          role="complementary"
          aria-label="Call to action banner"
        >
          <div aria-hidden="true" className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(245,197,24,0.8) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
          <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-sct-gold/15 rounded-full blur-3xl" />

          <div className="relative z-10">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-sct-gold/20 border-2 border-sct-gold/50 flex items-center justify-center">
                <TrendingUp size={28} className="text-sct-gold" aria-hidden="true" />
              </div>
            </div>
            <h3 className="font-display font-extrabold text-2xl sm:text-4xl mb-3">
              Ready to Transform Your Future?
            </h3>
            <p className="text-white/60 text-base mb-8 max-w-xl mx-auto">
              500+ students already made the leap. Your journey starts with a single click.
            </p>
            <a
              href="#contact"
              id="why-join-cta"
              aria-label="Join SCT now — navigate to contact section"
              className="btn-primary text-base"
            >
              Join SCT Now — It's Free
              <Rocket size={16} aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
