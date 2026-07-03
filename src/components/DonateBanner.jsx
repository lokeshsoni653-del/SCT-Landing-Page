import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, DollarSign, Gift, ArrowRight } from 'lucide-react';

export default function DonateBanner() {
  const [copied, setCopied] = useState(false);

  const handleCopyDetails = () => {
    navigator.clipboard.writeText("HBL Mithi Branch - Account Number: 1234-5678-9012-3456");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section 
      id="donate" 
      aria-label="Support Our Mission"
      className="py-12 bg-gradient-to-r from-navy-900 to-navy-800 text-white relative overflow-hidden border-y border-white/5"
    >
      <div aria-hidden="true" className="absolute top-0 right-0 w-80 h-80 bg-sct-gold/5 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
      <div aria-hidden="true" className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          
          {/* Text Content */}
          <div className="md:col-span-2 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-sct-gold/20 text-sct-gold border border-sct-gold/30 uppercase tracking-wider">
              <Heart size={12} className="fill-sct-gold" aria-hidden="true" />
              Make an Impact
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white leading-tight">
              Empower Tharparkar's Youth — Support SCT Today
            </h2>
            <p className="text-white/70 text-sm sm:text-base max-w-2xl">
              Your donations directly fund student bootcamps, leadership academies, and educational resources in rural villages. Help us build the leaders of tomorrow.
            </p>
            
            {/* Quick Metrics */}
            <div className="flex flex-wrap gap-4 pt-2 text-xs sm:text-sm text-white/80">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-sct-gold" />
                <span>100% Direct Student Funding</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Tax Deductible Non-Profit</span>
              </div>
            </div>
          </div>

          {/* Donation Actions */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-between h-full space-y-4">
            <div>
              <p className="text-xs text-white/50 uppercase font-semibold tracking-wider mb-1">Active Campaign</p>
              <h3 className="text-lg font-bold text-white mb-2">Summer Tech Education Fund</h3>
              
              {/* Progress bar */}
              <div className="w-full bg-white/10 rounded-full h-2 mb-2" aria-hidden="true">
                <div className="bg-sct-gold h-2 rounded-full" style={{ width: '65%' }} />
              </div>
              <div className="flex justify-between text-xs text-white/60">
                <span>Raised: <strong>Rs. 130,000</strong></span>
                <span>Goal: <strong>Rs. 200,000</strong></span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleCopyDetails}
                className="btn-primary text-xs justify-center flex-1 py-3"
                aria-label="View bank account details"
              >
                <Gift size={14} aria-hidden="true" />
                {copied ? "Details Copied!" : "Get Bank Details"}
              </button>
              <a
                href="#contact"
                className="btn-outline text-xs justify-center flex-1 py-3 hover:bg-white/5"
              >
                Contact to Donate
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
