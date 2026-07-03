import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, ShieldCheck, Award, Globe2 } from 'lucide-react';

const PARTNERS = [
  { name: 'Thar Education Alliance', icon: Handshake },
  { name: 'Sindh Youth Commission', icon: Award },
  { name: 'Mithi Tech Hub', icon: ShieldCheck },
  { name: 'Tharparkar Development Society', icon: Globe2 },
];

export default function Partners() {
  return (
    <section 
      id="partners" 
      aria-labelledby="partners-heading"
      className="py-12 bg-navy-950 relative overflow-hidden border-b border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8">
          <h2 id="partners-heading" className="text-white/40 text-xs sm:text-sm uppercase font-semibold tracking-widest">
            Our Supporting Partners &amp; Sponsors
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-items-center opacity-70">
          {PARTNERS.map((partner) => {
            const Icon = partner.icon;
            return (
              <motion.div
                key={partner.name}
                whileHover={{ scale: 1.05, opacity: 1 }}
                className="flex items-center gap-2.5 px-6 py-4 rounded-xl bg-white/5 border border-white/10 w-full max-w-[220px] justify-center transition-all duration-300"
              >
                <Icon size={18} className="text-sct-gold" aria-hidden="true" />
                <span className="text-white/80 font-display font-medium text-xs sm:text-sm text-center">
                  {partner.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
