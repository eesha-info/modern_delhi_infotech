import React from 'react';
import { Phone, Mail, MapPin, Clock, Award, Shield, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { instituteInfo, initialCourses } from '../../data/mdiData';

const Footer = ({ onOpenAdmission, onOpenLogin, onOpenVerify }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 relative z-20">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Institute Brand & Director (Col span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border border-slate-700 flex-shrink-0">
                <img
                  src="/mdi-real-logo-cropped.png"
                  alt="Modern Delhi Infotech"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/logo-icon.svg";
                  }}
                />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-white text-base tracking-tight leading-tight">
                  MODERN DELHI INFOTECH
                </h3>
                <p className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider mt-0.5">
                  Computer Education &amp; Training Centre
                </p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed text-xs">
              Established in 2017, Modern Delhi Infotech (मॉडर्न दिल्ली इन्फोटेक) is a premier computer institute in Madhepura, Bihar registered under the Government of India. Dedicated to 100% practical training and job-ready digital skills.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                Founder &amp; Chief Technical Mentor
              </p>
              <p className="text-white font-bold text-sm">Sonu Kumar (Sonu Sir)</p>
              <p className="text-slate-400 text-[11px]">BCA, MCA · 10+ Years Practical Teaching</p>
              <p className="text-emerald-400 font-semibold text-xs pt-0.5">
                Direct Desk: {instituteInfo.contact.primaryPhone}
              </p>
            </div>
          </div>

          {/* Column 2: Popular Programs (Col span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              Popular Courses
            </h4>
            <ul className="space-y-2 text-xs">
              {initialCourses.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <a
                    href="#courses"
                    className="hover:text-amber-400 transition-colors flex items-center justify-between text-slate-300 py-0.5"
                  >
                    <span className="truncate pr-2">{c.code} – {c.name.split('(')[0]}</span>
                    <span className="text-[10px] font-mono text-slate-500 flex-shrink-0">
                      {c.duration}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenAdmission}
                className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
              >
                <span>Request Course Syllabus</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Column 3: Campuses in Madhepura (Col span 3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Campuses &amp; Contact
            </h4>

            {/* Branch 2 */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">Branch 2 (Main Lab):</span>
                <span className="text-[10px] bg-slate-800 text-amber-400 px-1.5 py-0.5 rounded font-bold">
                  Code: 2
                </span>
              </div>
              <p className="text-slate-400 text-[11px] leading-snug">
                Near Janseva Nursing Home, Adarsh Nagar, Madhepura – 852113
              </p>
              <p className="text-emerald-400 font-semibold text-[11px]">
                ☎ +91 70500 12501
              </p>
            </div>

            {/* Branch 1 */}
            <div className="space-y-1 pt-2 border-t border-slate-900">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200">Main Branch (Branch 1):</span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-bold">
                  Code: 1
                </span>
              </div>
              <p className="text-slate-400 text-[11px] leading-snug">
                SBI Road, in front of Pradhi Yadav Hospital, Madhepura – 852113
              </p>
              <p className="text-slate-400 text-[11px]">
                ☎ +91 75469 95935 / +91 80515 16000
              </p>
            </div>

            <p className="text-[11px] text-slate-500 pt-1">
              Hours: Mon – Sat: 7:00 AM – 7:00 PM
            </p>
          </div>

          {/* Column 4: Quick Portals & Verification (Col span 2) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Services
            </h4>

            <div className="flex flex-col gap-2">
              <button
                onClick={onOpenLogin}
                className="w-full text-left p-2.5 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 text-slate-200 transition-colors flex items-center justify-between text-xs"
              >
                <span>Portal Login</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
              </button>

              <button
                onClick={onOpenVerify}
                className="w-full text-left p-2.5 bg-slate-900 hover:bg-slate-800 rounded-xl border border-slate-800 text-slate-200 transition-colors flex items-center justify-between text-xs"
              >
                <span>Verify Roll No</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              </button>

              <button
                onClick={onOpenAdmission}
                className="w-full text-left p-2.5 bg-blue-950/60 hover:bg-blue-900/60 rounded-xl border border-blue-900/80 text-blue-200 transition-colors flex items-center justify-between text-xs font-semibold"
              >
                <span>Admission Form</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
              </button>
            </div>

            <p className="text-[10px] text-slate-500 leading-snug pt-1">
              Diplomas are recognized for Central &amp; State Government jobs.
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Accreditation */}
      <div className="border-t border-slate-900 py-4 px-4 sm:px-6 lg:px-8 text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Modern Delhi Infotech. All Rights Reserved. Regd. Govt. of India.</p>
          <p className="flex items-center gap-2">
            <span>Branch Code: 2 &amp; 1</span>
            <span>•</span>
            <span>Madhepura, Bihar – 852113</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
