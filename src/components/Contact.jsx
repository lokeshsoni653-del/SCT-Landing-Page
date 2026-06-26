import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail, Phone, MapPin, Facebook, Linkedin,
  Instagram, Youtube, Send, CheckCircle,
  MessageSquare, Clock, ArrowRight
} from 'lucide-react';
import { useInView } from '../hooks/useInView';

const SOCIAL_LINKS = [
  {
    icon: Facebook,
    label: 'Facebook',
    handle: 'Students Club Tharparkar',
    url: 'https://www.facebook.com/profile.php?id=61560333105325',
    color: '#1877f2',
    bg:    '#1877f215',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    handle: '@thar_students_club',
    url: 'https://www.instagram.com/thar_students_club/',
    color: '#e1306c',
    bg:    '#e1306c15',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    handle: 'studentsclubtharparkar',
    url: 'https://www.linkedin.com/company/studentsclubtharparkar/',
    color: '#0a66c2',
    bg:    '#0a66c215',
  },
];

const INFO_CARDS = [
  {
    icon: Mail,
    label: 'Email Us',
    value: 'info@sctharparkar.org',
    sub: 'We reply within 24 hours',
    color: '#f5c518',
  },
  {
    icon: MapPin,
    label: 'Find Us',
    value: 'Mithi, Tharparkar',
    sub: 'Sindh, Pakistan',
    color: '#34d399',
  },
  {
    icon: Clock,
    label: 'Office Hours',
    value: 'Mon–Fri: 9 AM–6 PM',
    sub: 'Weekends by appointment',
    color: '#c084fc',
  },
];

const SUBJECTS = [
  'Membership Inquiry',
  'Program Information',
  'Partnership / Sponsorship',
  'Volunteering',
  'Media / Press',
  'General Question',
];

function useContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: SUBJECTS[0], message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim())      errs.name = 'Full name is required.';
    if (!form.email.trim())     errs.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email.';
    if (!form.message.trim())   errs.message = 'Message cannot be empty.';
    else if (form.message.trim().length < 10) errs.message = 'Message is too short (min 10 chars).';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStatus('sending');
    // Simulate API call (frontend-only)
    await new Promise((r) => setTimeout(r, 1800));
    setStatus('success');
    setForm({ name: '', email: '', subject: SUBJECTS[0], message: '' });
  };

  return { form, status, errors, handleChange, handleSubmit };
}

export default function Contact() {
  const { form, status, errors, handleChange, handleSubmit } = useContactForm();
  const [ref, inView] = useInView();

  const fadeUp = (delay = 0) => ({
    initial:  { opacity: 0, y: 30 },
    animate:  inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] },
  });

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-padding bg-navy-900 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div aria-hidden="true" className="absolute top-0 left-0 w-96 h-96 bg-sct-gold/8 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div aria-hidden="true" className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(245,197,24,0.6) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          ref={ref}
          {...fadeUp(0)}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <span className="section-badge">
            <MessageSquare size={13} aria-hidden="true" />
            Get In Touch
          </span>
          <h2
            id="contact-heading"
            className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mt-2 mb-4"
          >
            Let's Start Your{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #f5c518, #d4a017)' }}
            >
              Journey
            </span>
          </h2>
          <p className="text-white/50 text-base lg:text-lg">
            Whether you want to join, partner with us, or simply learn more — we'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">

          {/* ─── Left: Contact Info ─── */}
          <div className="lg:col-span-2 space-y-5">

            {/* Info Cards */}
            {INFO_CARDS.map((card, i) => (
              <motion.div
                key={card.label}
                {...fadeUp(0.1 + i * 0.1)}
                className="glass-card rounded-2xl p-5 flex items-start gap-4"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: `${card.color}20`, border: `1px solid ${card.color}30` }}
                >
                  <card.icon size={18} style={{ color: card.color }} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{card.label}</p>
                  <p className="text-white font-semibold text-sm">{card.value}</p>
                  <p className="text-white/40 text-xs">{card.sub}</p>
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div {...fadeUp(0.4)} className="glass-card rounded-2xl p-5">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-4">Follow Us</p>
              <div className="space-y-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow SCT on ${social.label}: ${social.handle}`}
                    className="flex items-center gap-3 rounded-xl p-3 transition-all duration-200 hover:bg-white/5 group"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: social.bg, border: `1px solid ${social.color}30` }}
                    >
                      <social.icon size={16} style={{ color: social.color }} aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-white/80 group-hover:text-white text-sm font-medium transition-colors">{social.label}</p>
                      <p className="text-white/40 text-xs truncate">{social.handle}</p>
                    </div>
                    <ArrowRight size={14} className="text-white/20 group-hover:text-sct-gold ml-auto flex-shrink-0 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ─── Right: Contact Form ─── */}
          <motion.div
            {...fadeUp(0.2)}
            className="lg:col-span-3"
          >
            <div className="glass-card rounded-3xl p-7 lg:p-10">
              {status === 'success' ? (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-10"
                  role="status"
                  aria-live="polite"
                >
                  <div className="w-20 h-20 rounded-full bg-sct-gold/20 border-2 border-sct-gold/40 flex items-center justify-center mb-6">
                    <CheckCircle size={40} className="text-sct-gold" aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-bold text-white text-2xl mb-3">Message Sent! 🎉</h3>
                  <p className="text-white/60 mb-8">
                    Thank you for reaching out! Our team will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {}}
                    className="btn-outline"
                    aria-label="Send another message"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                /* Form */
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Contact form — Send us a message"
                >
                  <h3 className="font-display font-bold text-white text-xl mb-6">Send Us a Message</h3>

                  {/* Name + Email row */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="contact-name" className="block text-white/60 text-sm mb-1.5 font-medium">
                        Full Name <span aria-hidden="true" className="text-sct-gold">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Ali Ahmed"
                        className={`input-dark ${errors.name ? 'border-red-400/60 bg-red-400/5' : ''}`}
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        autoComplete="name"
                      />
                      {errors.name && (
                        <p id="name-error" className="text-red-400 text-xs mt-1" role="alert">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-white/60 text-sm mb-1.5 font-medium">
                        Email Address <span aria-hidden="true" className="text-sct-gold">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`input-dark ${errors.email ? 'border-red-400/60 bg-red-400/5' : ''}`}
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p id="email-error" className="text-red-400 text-xs mt-1" role="alert">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="mb-4">
                    <label htmlFor="contact-subject" className="block text-white/60 text-sm mb-1.5 font-medium">
                      Subject
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="input-dark appearance-none cursor-pointer"
                      style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%23ffffff60\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px', paddingRight: '40px' }}
                    >
                      {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label htmlFor="contact-message" className="block text-white/60 text-sm mb-1.5 font-medium">
                      Message <span aria-hidden="true" className="text-sct-gold">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you, or share your interest in SCT..."
                      className={`input-dark resize-none ${errors.message ? 'border-red-400/60 bg-red-400/5' : ''}`}
                      aria-required="true"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-red-400 text-xs mt-1" role="alert">{errors.message}</p>
                    )}
                    <p className="text-white/30 text-xs mt-1 text-right" aria-live="polite">
                      {form.message.length} chars
                    </p>
                  </div>

                  {/* Submit */}
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={status === 'sending'}
                    aria-label={status === 'sending' ? 'Sending your message…' : 'Send message to SCT'}
                    aria-busy={status === 'sending'}
                    className="btn-primary w-full justify-center text-base disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'sending' ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="60" strokeDashoffset="20" />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send size={16} aria-hidden="true" />
                      </>
                    )}
                  </button>

                  <p className="text-white/30 text-xs text-center mt-3">
                    We never share your information. 100% private.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
