import React from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Globe, ExternalLink } from 'lucide-react';

const TEAM = [
  {
    name: 'Kashif Junejo',
    role: 'President & Founder',
    avatar: 'KJ',
    color: '#f5c518',
    social: {
      email: 'kashif@sctharparkar.org',
      link: 'https://www.facebook.com/profile.php?id=61560333105325',
    }
  },
  {
    name: 'Suhana Sodho',
    role: 'General Secretary',
    avatar: 'SS',
    color: '#60a5fa',
    social: {
      email: 'suhana@sctharparkar.org',
      link: 'https://www.linkedin.com/company/studentsclubtharparkar/',
    }
  },
  {
    name: 'Lokesh Kumar',
    role: 'Lead Developer & tech director',
    avatar: 'LK',
    color: '#34d399',
    social: {
      email: 'lokesh@sctharparkar.org',
      link: 'https://github.com/lokeshsoni653-del',
    }
  },
  {
    name: 'Ali Ahmed Thari',
    role: 'Program Coordinator',
    avatar: 'AT',
    color: '#c084fc',
    social: {
      email: 'ali@sctharparkar.org',
      link: 'https://www.instagram.com/thar_students_club/',
    }
  },
];

export default function Team() {
  return (
    <section 
      id="team" 
      aria-labelledby="team-heading"
      className="section-padding bg-navy-900 relative overflow-hidden"
    >
      <div aria-hidden="true" className="absolute bottom-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-badge">
            <Users size={13} aria-hidden="true" />
            Leadership Team
          </span>
          <h2 id="team-heading" className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mt-2 mb-4">
            Meet Our{' '}
            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #f5c518, #d4a017)' }}>
              Team
            </span>
          </h2>
          <p className="text-white/50 text-base lg:text-lg">
            The dedicated student leaders driving educational change and empowering youth in Tharparkar.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list" aria-label="SCT team list">
          {TEAM.map((member, i) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6 text-center card-hover cursor-default relative group"
              role="listitem"
            >
              {/* Avatar circle */}
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center font-display font-black text-2xl text-white border-2 border-white/10 group-hover:border-white/30 transition-colors"
                style={{ background: `linear-gradient(135deg, ${member.color}30, ${member.color}80)` }}
                aria-hidden="true"
              >
                {member.avatar}
              </div>

              <h3 className="font-display font-bold text-white text-lg group-hover:text-sct-gold transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-white/40 text-xs sm:text-sm mb-5 font-medium">{member.role}</p>

              {/* Social actions */}
              <div className="flex items-center justify-center gap-3 pt-3 border-t border-white/5">
                <a 
                  href={`mailto:${member.social.email}`} 
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                  aria-label={`Send email to ${member.name}`}
                >
                  <Mail size={14} aria-hidden="true" />
                </a>
                <a 
                  href={member.social.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                  aria-label={`Visit ${member.name}'s profile`}
                >
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
