import React from 'react';
import { Award, CheckCircle, ArrowRight, Phone, Sparkles, Monitor, Users, ShieldCheck, Star } from 'lucide-react';
import { instituteInfo } from '../../data/mdiData';

const HeroSection = ({ onOpenAdmission, onOpenLogin, onOpenVerify }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-brand-navyDark text-white pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Decorative Blobs & Grids */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading, Badges, CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/15 px-4 py-1.5 rounded-full text-xs font-semibold text-amber-300 shadow-inner">
              <Award className="w-4 h-4 text-amber-400" />
              <span>भारत सरकार से मान्यता प्राप्त • Estd. 2017</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span className="text-blue-200">Branch 2 & 1</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-display font-extrabold tracking-tight leading-tight sm:leading-tight">
              Empowering Youth with <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Practical Computer Education
              </span>
              <br />& Job-Ready IT Skills
            </h1>

            {/* Hindi subtitle & Director highlight */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 text-sm font-medium text-slate-300">
              <span className="text-amber-300 font-bold text-base">मॉडर्न दिल्ली इन्फोटेक</span>
              <span>•</span>
              <span>कम्प्यूटर प्रशिक्षण केन्द्र, मधेपुरा</span>
              <span>•</span>
              <span className="text-emerald-300 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                By : Sonu Sir (BCA, MCA)
              </span>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Transform your career with Madhepura's most trusted computer institute. Guaranteed 1-Student-1-PC allocation, modern AC labs, official government-recognized certificates, and dedicated preparation for Bihar Beltron, SSC, and private sector jobs.
            </p>

            {/* Key feature checkmarks */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-semibold text-slate-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>100% Practical Labs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Govt. Valid Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Hindi + English Typing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Tally Prime + GST Filing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Flexible Morning/Evening Batches</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Free Study Material & Notes</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onOpenAdmission}
                className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-display font-extrabold rounded-2xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-95 text-base"
              >
                <span>Apply for Admission</span>
                <ArrowRight className="w-5 h-5 text-slate-950" />
              </button>

              <a
                href="#courses"
                className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-2xl border border-white/20 transition-all text-center flex items-center justify-center gap-2 text-base backdrop-blur-sm"
              >
                <span>View All Courses</span>
              </a>

              <a
                href={`tel:${instituteInfo.contact.primaryPhone.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto px-4 py-3.5 text-slate-300 hover:text-white font-medium text-sm flex items-center justify-center gap-2 hover:bg-white/5 rounded-2xl transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>+91 70500 12501</span>
              </a>
            </div>

            {/* Quick popular course badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="text-xs text-slate-400 font-medium">Top Enrolled Courses:</span>
              {['ADIT', 'ADCA', 'DCA', 'TALLY PRIME', 'TYPING SPECIAL'].map((badge) => (
                <a
                  key={badge}
                  href="#courses"
                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-900/60 border border-blue-700/50 text-blue-200 hover:bg-blue-800 transition-colors"
                >
                  {badge}
                </a>
              ))}
            </div>

          </div>

          {/* Right Column: Hero Visual Card (Banner replica + Mentor Highlight) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Floating Glowing Border Frame */}
              <div className="relative bg-gradient-to-b from-blue-900/80 to-slate-900/90 rounded-3xl p-6 border-2 border-amber-500/40 shadow-2xl backdrop-blur-xl">
                
                {/* Header of Card */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <img
                      src="/logo-icon.svg"
                      alt="MDI Emblem"
                      className="w-12 h-12 object-contain"
                    />
                    <div>
                      <h4 className="font-extrabold text-white text-base leading-tight">
                        MODERN DELHI INFOTECH
                      </h4>
                      <p className="text-[11px] text-amber-400 font-bold uppercase tracking-wider">
                        Branch Code: 2 · Madhepura
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-1 text-[11px] font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Active Session
                  </span>
                </div>

                {/* Director & Training Spotlight Banner (Inspired by actual banner) */}
                <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-blue-950 via-indigo-950 to-blue-900 border border-blue-500/30 relative overflow-hidden">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                        DIRECTOR & LEAD MENTOR
                      </span>
                      <h3 className="text-xl font-extrabold text-white mt-0.5">
                        Sonu Kumar <span className="text-sm font-semibold text-blue-200">(Sonu Sir)</span>
                      </h3>
                      <p className="text-xs text-amber-300 font-bold mt-0.5">
                        BCA, MCA · 10+ Years Experience
                      </p>
                      <p className="text-xs text-slate-300 mt-2 italic leading-relaxed">
                        "Learn with confidence, practice on real computers, and build a career you're proud of."
                      </p>
                    </div>

                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 flex-shrink-0 shadow-lg">
                      <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center text-amber-400 font-bold text-xl">
                        SK
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <span className="text-slate-300 flex items-center gap-1">
                      <Monitor className="w-3.5 h-3.5 text-blue-400" />
                      50+ High-End PCs Lab
                    </span>
                    <a
                      href={`tel:${instituteInfo.contact.primaryPhone.replace(/\s+/g, '')}`}
                      className="text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3 text-emerald-400" />
                      {instituteInfo.contact.primaryPhone}
                    </a>
                  </div>
                </div>

                {/* Quick Info Grid inside card */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-slate-400">Branch 2 Location</p>
                    <p className="text-white font-semibold mt-0.5 leading-snug">
                      Near Janseva Nursing Home, Adarsh Nagar
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <p className="text-slate-400">Main Branch</p>
                    <p className="text-white font-semibold mt-0.5 leading-snug">
                      SBI Road, in front of Pradhi Yadav Hospital
                    </p>
                  </div>
                </div>

                {/* Quick Interactive Actions */}
                <div className="mt-5 flex gap-2">
                  <button
                    onClick={onOpenVerify}
                    className="flex-1 py-2.5 px-3 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl border border-white/20 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Verify Roll / Reg No</span>
                  </button>
                  <button
                    onClick={onOpenLogin}
                    className="py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    Login Portal
                  </button>
                </div>

              </div>
              
              {/* Decorative rating pill */}
              <div className="absolute -bottom-5 -left-5 bg-white text-slate-900 rounded-2xl p-3 shadow-xl border border-slate-200 hidden sm:flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-sm font-extrabold">
                    <span>4.9 / 5.0</span>
                    <span className="text-xs text-slate-500 font-normal">(1,200+ Reviews)</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">Top Rated in Madhepura</p>
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
