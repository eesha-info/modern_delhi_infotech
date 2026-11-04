import React from 'react';
import { Phone, Award, Bell, MapPin, Sparkles } from 'lucide-react';
import { instituteInfo } from '../../data/mdiData';

const TopNoticeBar = ({ onOpenAdmission }) => {
  return (
    <div className="bg-gradient-to-r from-brand-navyDark via-brand-navy to-brand-blue text-white text-xs py-2 px-4 border-b border-blue-900/40 relative z-40">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left Side: Accreditation badge & Announcement */}
        <div className="flex items-center gap-2 text-center md:text-left">
          <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-medium text-[11px]">
            <Award className="w-3 h-3 text-amber-400" />
            Regd. Govt. of India
          </span>
          <span className="text-slate-300 hidden sm:inline">|</span>
          <span className="text-slate-200 flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-pulse hidden sm:inline" />
            <span>Admissions Open for Session 2026-27</span>
            <span className="hidden lg:inline text-blue-200">• ADIT, ADCA, DCA, Tally & Typing</span>
          </span>
        </div>

        {/* Right Side: Quick Phone & Location */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-200">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Madhepura, Bihar</span>
          </div>

          <a
            href={`tel:${instituteInfo.contact.primaryPhone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 font-semibold text-amber-400 hover:text-amber-300 transition-colors bg-white/10 px-2.5 py-1 rounded-full border border-white/10"
          >
            <Phone className="w-3 h-3 text-emerald-400" />
            <span>Call Sonu Sir: {instituteInfo.contact.primaryPhone}</span>
          </a>

          <button
            onClick={onOpenAdmission}
            className="hidden sm:inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-3 py-1 rounded-full text-[11px] shadow-sm transition-all transform active:scale-95"
          >
            Apply Online
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNoticeBar;
