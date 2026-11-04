import React from 'react';
import { Award, CheckCircle, Phone, Mail, GraduationCap, Quote, Sparkles } from 'lucide-react';
import { instituteInfo } from '../../data/mdiData';

const DirectorMessage = ({ onOpenAdmission }) => {
  return (
    <section id="director" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-brand-navyDark rounded-3xl text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl border border-blue-900/50">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Director Visual Profile & Credentials Card */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative">
                {/* Golden frame container */}
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-3xl p-1 bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-600 shadow-2xl">
                  <div className="w-full h-full rounded-[22px] bg-slate-900 flex flex-col items-center justify-center p-6 text-center border-2 border-white/20">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white font-display font-extrabold text-2xl shadow-lg mb-3">
                      SK
                    </div>
                    <span className="text-amber-400 font-extrabold text-lg">Sonu Kumar</span>
                    <span className="text-white text-xs font-semibold">"Sonu Sir"</span>
                    <span className="text-[11px] text-blue-200 mt-1 font-mono bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">
                      BCA, MCA
                    </span>
                  </div>
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 px-4 py-1 rounded-full font-bold text-xs tracking-wider uppercase shadow-lg whitespace-nowrap">
                  Founder & Director
                </div>
              </div>

              {/* Bio summary */}
              <div className="mt-8 space-y-1">
                <h4 className="text-xl font-bold text-white">Sonu Kumar (Sonu Sir)</h4>
                <p className="text-amber-400 text-xs font-semibold">Chief Technical Mentor · Estd. 2017</p>
                <p className="text-slate-400 text-xs">Modern Delhi Infotech, Madhepura (Branch 2 & 1)</p>
              </div>

              {/* Direct Call Button */}
              <a
                href={`tel:${instituteInfo.director.phone.replace(/\s+/g, '')}`}
                className="mt-5 inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-5 py-2.5 rounded-xl border border-white/20 transition-all shadow-sm"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Call Directly: {instituteInfo.director.phone}</span>
              </a>
            </div>

            {/* Right: Vision & Director Message */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="inline-flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                Message from Director's Desk
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white leading-tight">
                "Digital Education is Not Just a Subject, It is the Gateway to Youth Employment."
              </h3>

              <div className="relative pl-6 border-l-2 border-amber-500/80 space-y-3 text-slate-300 text-sm leading-relaxed">
                <p>
                  "When we established Modern Delhi Infotech in 2017 in Madhepura, many young minds lacked access to high-standard, genuine practical computer training. Most institutes taught theory on blackboards without giving students dedicated time on real machines."
                </p>
                <p>
                  "We changed that paradigm. At Modern Delhi Infotech, every single student gets their own personal PC in every class. Whether you are learning MS Excel formulas, preparing for Beltron typing speed tests, or filing GST tax returns in Tally Prime, you learn by doing with your own hands."
                </p>
                <p className="text-amber-200 font-medium">
                  "My personal commitment to every student and parent: We treat every student's career as our own. We will guide you from the first keyboard stroke to your final job placement."
                </p>
              </div>

              {/* Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">One-to-One Attention</span>
                    <span className="text-slate-400">Small batch size so no student is left behind.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10 text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Bilingual Teaching</span>
                    <span className="text-slate-400">Concepts explained clearly in Hindi & English.</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={onOpenAdmission}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg transition-all"
                >
                  Schedule a Free Counseling Session with Sonu Sir
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default DirectorMessage;
