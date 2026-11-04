import React from 'react';
import { Award, CheckCircle, ArrowRight, Phone, Sparkles, Monitor, Users, ShieldCheck, Star, Keyboard, BookOpen } from 'lucide-react';
import { instituteInfo } from '../../data/mdiData';

const HeroSection = ({ onOpenAdmission, onOpenLogin, onOpenVerify }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-brand-navyDark text-white pt-10 pb-20 lg:pt-14 lg:pb-24">
      {/* Background Subtle Tech Ambient Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute top-10 right-10 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Heading, Badges, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-300 shadow-sm">
              <Award className="w-4 h-4 text-amber-400" />
              <span>भारत सरकार से मान्यता प्राप्त • Regd. Govt. of India</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 hidden sm:inline"></span>
              <span className="text-blue-200 hidden sm:inline">Estd. 2017</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-display font-extrabold tracking-tight leading-tight sm:leading-tight">
              Premier Computer Education &amp;{' '}
              <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Practical IT Training
              </span>
              <br />in Madhepura
            </h1>

            {/* Director honorific highlight */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs sm:text-sm font-medium text-slate-300">
              <span className="text-amber-400 font-bold text-base">मॉडर्न दिल्ली इन्फोटेक</span>
              <span>•</span>
              <span className="text-emerald-300 font-semibold bg-emerald-950/70 border border-emerald-500/40 px-2.5 py-0.5 rounded-md">
                Directed by Sonu Kumar (Sonu Sir - BCA, MCA)
              </span>
            </div>

            {/* Subtitle Description */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Empowering Bihar's students with guaranteed 1-Student-1-PC practical lab sessions, official government-recognized diplomas, and specialized preparation for Beltron, SSC, and private sector IT careers.
            </p>

            {/* Core Value Checkmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs font-semibold text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>100% Practical Labs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>1-Student-1-PC Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Govt. Valid Certificates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Hindi &amp; English Typing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Tally Prime with GST</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>AC Labs &amp; Power Backup</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
              <button
                onClick={onOpenAdmission}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-display font-extrabold rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95 text-sm"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#courses"
                className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/20 transition-all text-center flex items-center justify-center gap-2 text-sm backdrop-blur-sm"
              >
                <span>Explore All Courses</span>
              </a>

              <a
                href={`tel:${instituteInfo.contact.primaryPhone.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto px-4 py-3.5 text-slate-300 hover:text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-white/5 rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+91 70500 12501</span>
              </a>
            </div>

            {/* Featured Course Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="text-xs text-slate-400 font-medium">Popular Programs:</span>
              {['ADIT (12 Months)', 'ADCA (12 Months)', 'DCA (6 Months)', 'Tally Prime + GST', 'Typing Special'].map((c) => (
                <a
                  key={c}
                  href="#courses"
                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-900/60 border border-blue-700/50 text-blue-200 hover:bg-blue-800 transition-colors"
                >
                  {c}
                </a>
              ))}
            </div>

          </div>

          {/* Right Column: Clean Interactive Training Showcase Visual */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Premium Interactive Lab Showcase Card */}
              <div className="bg-slate-800/90 rounded-3xl p-6 sm:p-7 border border-white/15 shadow-2xl backdrop-blur-md relative overflow-hidden">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <img
                      src="/mdi-real-logo-cropped.png"
                      alt="Modern Delhi Infotech Official Logo"
                      className="w-12 h-12 object-contain rounded-full bg-white p-0.5 shadow-md flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-white text-sm">
                        High-Tech Computer Training Centre
                      </h4>
                      <p className="text-[11px] text-emerald-400 font-semibold">
                        Adarsh Nagar (Branch 2) &amp; SBI Road (Branch 1)
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 whitespace-nowrap">
                    50+ PCs
                  </span>
                </div>

                {/* Key Training Highlights */}
                <div className="mt-5 space-y-3">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Monitor className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-xs">Dedicated 1:1 Computer Allocation</h5>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Every student practices on their own PC with Windows 11, MS Office 2024, and Tally Prime.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Keyboard className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-xs">Bihar Beltron Typing Test Setup</h5>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        KrutiDev 010 &amp; Mangal typing software simulating exact Civil Court &amp; Beltron exams.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-bold text-white text-xs">Govt. Recognized Certification</h5>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Valid for all Central &amp; State government employment verification registries.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Direct Action Bar */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    onClick={onOpenAdmission}
                    className="flex-1 py-2.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Book a Free Lab Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href="#branches"
                    className="py-2.5 px-3 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-xl border border-white/15 transition-colors"
                  >
                    Visit Campus
                  </a>
                </div>

              </div>

              {/* Floating review card */}
              <div className="absolute -bottom-5 -left-5 bg-white text-slate-900 rounded-2xl p-3 shadow-xl border border-slate-200 hidden sm:flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-sm font-extrabold">
                    <span>4.9 / 5.0</span>
                    <span className="text-xs text-slate-500 font-normal">(1,200+ Reviews)</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">Trusted in Madhepura</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
