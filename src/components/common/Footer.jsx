import React from 'react';
import { Phone, Mail, MapPin, Clock, Award, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { instituteInfo, initialCourses } from '../../data/mdiData';

const Footer = ({ onOpenAdmission, onOpenLogin, onOpenVerify }) => {
  return (
    <footer className="bg-brand-navyDark text-slate-300 border-t border-slate-800 text-sm">
      {/* Top Banner inside Footer */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 border-b border-blue-900/60 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <span className="text-amber-400 font-bold uppercase tracking-wider text-xs">
              Admissions Open for Session 2026-27
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-white mt-1">
              Start Your Digital Career with Madhepura's No. 1 Institute
            </h3>
            <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-2xl">
              100% Practical Training, Individual Computer Allocation, and Government Recognized Certification by Sonu Sir (BCA, MCA).
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onOpenAdmission}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold rounded-xl shadow-lg transition-all"
            >
              Get Free Career Counseling
            </button>
            <a
              href={`tel:${instituteInfo.contact.primaryPhone.replace(/\s+/g, '')}`}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call Sonu Sir</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Institute Identity & Director */}
          <div className="space-y-4">
            <Logo size="md" showText={true} light={true} />
            <p className="text-xs text-slate-400 leading-relaxed">
              Established in 2017, Modern Delhi Infotech (मॉडर्न दिल्ली इन्फोटेक) is an ISO standard, Govt. of India registered computer education institute in Madhepura dedicated to excellence in software, accounting, and typing skills.
            </p>
            
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs">
              <p className="font-bold text-amber-400">Chief Mentor & Director:</p>
              <p className="text-white font-bold text-sm">Sonu Kumar (Sonu Sir)</p>
              <p className="text-slate-400 text-[11px]">BCA, MCA · 10+ Yrs Practical Teaching</p>
              <p className="text-emerald-400 font-semibold mt-1">Direct Call: {instituteInfo.contact.primaryPhone}</p>
            </div>
          </div>

          {/* Column 2: Popular Programs */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Popular Courses
            </h4>
            <ul className="space-y-2.5 text-xs">
              {initialCourses.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <a
                    href="#courses"
                    className="hover:text-amber-400 transition-colors flex items-center justify-between text-slate-300"
                  >
                    <span>{c.code} - {c.name.split('(')[0]}</span>
                    <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-slate-300">
                      {c.duration}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Branch 2 (Main Centre) */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Branch 2 (Main Training Centre)
            </h4>
            <div className="text-xs space-y-2 text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <p>Near Janseva Nursing Home, Adarsh Nagar, Madhepura, Bihar – 852113</p>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a href="tel:+917050012501" className="hover:text-white">+91 70500 12501</a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Mon – Sat: 7:00 AM – 7:00 PM</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10">
              <h5 className="text-xs font-bold text-white mb-1">Main Branch (Branch 1):</h5>
              <p className="text-xs text-slate-400">
                SBI Road, in front of Pradhi Yadav Hospital, Madhepura – 852113
              </p>
              <p className="text-xs text-slate-400 mt-1">
                ☎ +91 75469 95935 / +91 80515 16000
              </p>
            </div>
          </div>

          {/* Column 4: Quick Portals & Verification */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Student & Admin Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenLogin}
                  className="w-full text-left p-2.5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 flex items-center justify-between text-slate-200 transition-colors"
                >
                  <span>Student & Faculty Login</span>
                  <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenVerify}
                  className="w-full text-left p-2.5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 flex items-center justify-between text-slate-200 transition-colors"
                >
                  <span>Verify Certificate & Marksheet</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAdmission}
                  className="w-full text-left p-2.5 bg-amber-500/10 hover:bg-amber-500/20 rounded-lg border border-amber-500/30 flex items-center justify-between text-amber-300 transition-colors"
                >
                  <span>Online Admission Enquiry</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </li>
            </ul>

            <div className="p-3 bg-blue-950/40 rounded-xl border border-blue-900/60 text-[11px] text-blue-200">
              <span className="font-bold flex items-center gap-1 text-white">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                Authorized Certification
              </span>
              All diplomas and certificates issued by Modern Delhi Infotech are valid for Government & Corporate employment registrations.
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800/80 py-4 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Modern Delhi Infotech (MDI), Madhepura. All Rights Reserved. Regd. Govt. of India.</p>
          <p className="flex items-center gap-2">
            <span>Branch Code: 2 & 1</span>
            <span>•</span>
            <span>Directed by Sonu Kumar (BCA, MCA)</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

