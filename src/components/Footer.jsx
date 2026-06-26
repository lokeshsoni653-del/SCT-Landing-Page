import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap, Facebook, Linkedin, Instagram,
  Youtube, ArrowRight, Heart, MapPin, Mail
} from 'lucide-react';

const NAV_SECTIONS = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home',       href: '#hero' },
      { label: 'About SCT',  href: '#about' },
      { label: 'Programs',   href: '#programs' },
      { label: 'Why Join',   href: '#why-join' },
      { label: 'Contact',    href: '#contact' },
    ],
  },
  {
    title: 'Programs',
    links: [
      { label: 'Tech Bootcamps',      href: '#programs' },
      { label: 'Leadership Academy',  href: '#programs' },
      { label: 'Public Speaking',     href: '#programs' },
      { label: 'Career Development',  href: '#programs' },
      { label: 'Idea Hackathons',     href: '#programs' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Membership',         href: '#contact' },
      { label: 'Volunteer',          href: '#contact' },
      { label: 'Partnerships',       href: '#contact' },
      { label: 'Events Calendar',    href: '#contact' },
      { label: 'Newsletter',         href: '#contact' },
    ],
  },
];

const SOCIALS = [
  {
    icon: Facebook,
    label: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61560333105325',
    color: '#1877f2',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    url: 'https://www.instagram.com/thar_students_club/',
    color: '#e1306c',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/company/studentsclubtharparkar/',
    color: '#0a66c2',
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      aria-label="Site footer"
      className="bg-navy-950 border-t border-white/5"
    >
      {/* ─── Main Footer ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-2">
            {/* Logo */}
            <a
              href="#hero"
              aria-label="Students Club Tharparkar — back to top"
              className="inline-flex items-center gap-3 mb-5 group"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sct-gold to-sct-goldDark shadow-gold flex items-center justify-center">
                <GraduationCap size={20} className="text-navy-900" strokeWidth={2.5} aria-hidden="true" />
              </div>
              <div>
                <p className="font-display font-bold text-white text-lg leading-tight">Students Club</p>
                <p className="text-sct-gold text-xs font-medium tracking-wider uppercase">Tharparkar</p>
              </div>
            </a>

            {/* Tagline */}
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              Empowering Students, Building Future Leaders. Based in Mithi, Tharparkar, Pakistan.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mb-6" role="list" aria-label="SCT social media links">
              {SOCIALS.map((social) => (
                <li key={social.label} role="listitem" className="list-none">
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`SCT on ${social.label} — opens in new tab`}
                    className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/25 text-white/50 hover:text-white transition-all duration-200 group"
                    style={{ '--hover-color': social.color }}
                  >
                    <social.icon size={16} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </div>

            {/* Quick contact */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <MapPin size={13} aria-hidden="true" className="flex-shrink-0" />
                <span>Mithi, Tharparkar, Sindh, Pakistan</span>
              </div>
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <Mail size={13} aria-hidden="true" className="flex-shrink-0" />
                <a href="mailto:info@sctharparkar.org" className="hover:text-sct-gold transition-colors">
                  info@sctharparkar.org
                </a>
              </div>
            </div>
          </div>

          {/* Nav columns */}
          {NAV_SECTIONS.map((section) => (
            <nav
              key={section.title}
              aria-label={`${section.title} navigation`}
              className="flex flex-col"
            >
              <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5" role="list">
                {section.links.map((link) => (
                  <li key={link.label} role="listitem">
                    <a
                      href={link.href}
                      className="text-white/40 text-sm hover:text-sct-gold transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <ArrowRight
                        size={12}
                        className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 flex-shrink-0"
                        aria-hidden="true"
                      />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs text-center sm:text-left">
            © {year} Students Club Tharparkar (SCT). All rights reserved.
          </p>
          <p className="text-white/20 text-xs flex items-center gap-1.5">
            Made with{' '}
            <Heart size={11} className="text-red-400 fill-red-400" aria-label="love" />{' '}
            for the students of Tharparkar
          </p>
          <p className="text-white/20 text-xs text-center sm:text-right">
            Mithi, Tharparkar, Pakistan 🇵🇰
          </p>
        </div>
      </div>
    </footer>
  );
}
