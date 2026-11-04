import React from 'react';
import { Phone, Award, Sparkles, MapPin } from 'lucide-react';
import { instituteInfo } from '../../data/mdiData';

const TopNoticeBar = ({ onOpenAdmission }) => {
  return (
    <div className="bg-slate-950 text-white text-[11px] sm:text-xs py-2 px-4 border-b border-blue-950 relative z-40">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Accreditation & Admission notice */}
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-semibold text-[10px] sm:text-[11px]">
            <Award className="w-3 h-3 text-amber-400" />
            Regd. Govt. of India
          </span>
          <span className="text-slate-500 hidden sm:inline">|</span>
          <div className="flex items-center gap-1.5 text-slate-200 font-medium">
            <Sparkles className="w-3 h-3 text-yellow-400 animate-pulse hidden sm:inline" />
            <span>Admissions Open (Session 2026-27)</span>
            <span className="text-blue-300 hidden md:inline">• ADIT, ADCA, DCA, Tally &amp; Typing</span>
          </div>
        </div>

        {/* Right: Phone & Location */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1 text-slate-400 text-[11px]">
            <MapPin className="w-3 h-3 text-amber-400" />
            <span>Adarsh Nagar &amp; SBI Road, Madhepura</span>
          </div>

          <a
            href={`tel:${instituteInfo.contact.primaryPhone.replace(/\s+/g, '')}`}
            className="inline-flex items-center gap-1 font-bold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>Call Sonu Sir: {instituteInfo.contact.primaryPhone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopNoticeBar;
