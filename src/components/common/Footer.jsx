import React from 'react';
import { Phone, Mail, MapPin, Clock, Award, ArrowRight, ArrowUp, Navigation, BadgeCheck, GraduationCap } from 'lucide-react';
import { instituteInfo } from '../../data/mdiData';
import { useData } from '../../context/DataContext';
import { asset } from '../../utils/asset';

const tel = (n) => `tel:${String(n).split('/')[0].replace(/\s+/g, '')}`;

const quickLinks = [
  { label: 'Home', href: '#top' },
  { label: 'About the Institute', href: '#why-us' },
  { label: "Director's Desk", href: '#director' },
  { label: 'All Courses', href: '#courses' },
  { label: 'Typing Practice', href: '#typing-lab' },
  { label: 'Photo Gallery', href: '#gallery' },
  { label: 'Student Reviews', href: '#testimonials' },
  { label: 'Downloads', href: '#downloads' },
];

const ColumnTitle = ({ children }) => (
  <h4 className="text-white font-display font-bold text-sm tracking-wide mb-5 flex items-center gap-2.5">
    <span className="w-5 h-0.5 rounded-full bg-amber-400" />
    {children}
  </h4>
);

const Footer = ({ onOpenAdmission, onOpenLogin, onOpenVerify }) => {
  const { courses } = useData();
  const { contact, branches, director, stats } = instituteInfo;
  const year = new Date().getFullYear();

  const scrollTo = (e, href) => {
    e.preventDefault();
    if (href === '#top') return window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const contactCards = [
    { icon: Phone, label: 'Call Sonu Sir', value: contact.primaryPhone, href: tel(contact.primaryPhone), tone: 'bg-emerald-500/15 text-emerald-300' },
    { icon: Mail, label: 'Email us', value: contact.email, href: `mailto:${contact.email}`, tone: 'bg-blue-500/15 text-blue-300' },
    { icon: Clock, label: 'Open', value: 'Mon – Sat · 7:00 AM – 7:00 PM', sub: 'Sunday: practice lab open', tone: 'bg-amber-500/15 text-amber-300' },
  ];

  return (
    <footer id="contact" className="relative z-20 bg-[#0a1024] text-slate-400">
      {/* Accent line */}
      <div className="h-1 bg-gradient-to-r from-[#232f86] via-amber-400 to-[#232f86]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Quick contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-10 border-b border-white/10">
          {contactCards.map(({ icon: Icon, label, value, sub, href, tone }) => {
            const body = (
              <>
                <span className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${tone}`}>
                  <Icon className="w-5 h-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] uppercase tracking-wider font-semibold text-slate-400">{label}</span>
                  <span className="block text-white font-bold text-sm sm:text-base truncate">{value}</span>
                  {sub && <span className="block text-[11px] text-slate-500">{sub}</span>}
                </span>
              </>
            );
            return href ? (
              <a key={label} href={href} className="flex items-center gap-4 rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4 hover:bg-white/[0.08] hover:border-white/20 transition-colors">
                {body}
              </a>
            ) : (
              <div key={label} className="flex items-center gap-4 rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4">
                {body}
              </div>
            );
          })}
        </div>

        {/* Main columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 py-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <span className="w-14 h-14 rounded-full bg-white p-0.5 flex-shrink-0 shadow-lg shadow-black/30">
                <img
                  src={asset('/mdi-real-logo-cropped.png')}
                  alt="Modern Delhi Infotech"
                  className="w-full h-full object-contain"
                  onError={(e) => { e.currentTarget.src = asset('/logo-icon.svg'); }}
                />
              </span>
              <span>
                <span className="block font-display font-extrabold text-white text-lg leading-tight tracking-tight">MODERN DELHI INFOTECH</span>
                <span className="block text-xs text-amber-300/90 font-semibold mt-0.5">{instituteInfo.hindiName} · {instituteInfo.hindiTagline}</span>
              </span>
            </div>

            <p className="text-sm leading-relaxed">
              Practical computer education in Madhepura since {instituteInfo.established}. Govt.-recognised diplomas,
              one PC per student, and personal guidance from Sonu Sir.
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-semibold px-3 py-1">
                <Award className="w-3.5 h-3.5" /> Regd. Govt. of India
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[11px] font-semibold px-3 py-1">
                <GraduationCap className="w-3.5 h-3.5" /> {stats.studentsTrained} students trained
              </span>
            </div>

            <div className="flex items-center gap-3 rounded-2xl bg-white/[0.04] border border-white/10 p-3">
              <img
                src={asset('/sonu-kumar-square.jpg')}
                alt={`${director.name} (${director.honorific})`}
                loading="lazy"
                className="w-14 h-14 rounded-xl object-cover object-top flex-shrink-0"
              />
              <span className="min-w-0">
                <span className="block text-[10px] uppercase tracking-wider font-bold text-amber-400">Founder &amp; Director</span>
                <span className="block text-white font-bold text-sm">{director.name} ({director.honorific})</span>
                <span className="block text-[11px] text-slate-400">{director.qualification} · {director.experience.replace(' of Teaching Excellence', ' teaching')}</span>
              </span>
            </div>
          </div>

          {/* Quick links */}
          <nav className="lg:col-span-2" aria-label="Footer">
            <ColumnTitle>Quick Links</ColumnTitle>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} onClick={(e) => scrollTo(e, l.href)} className="group inline-flex items-center gap-2 hover:text-white transition-colors">
                    <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Courses */}
          <div className="lg:col-span-3">
            <ColumnTitle>Our Courses</ColumnTitle>
            <ul className="space-y-3">
              {courses.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <a href="#courses" onClick={(e) => scrollTo(e, '#courses')} className="group flex items-start gap-3">
                    <span className="mt-0.5 min-w-[4.25rem] whitespace-nowrap text-center rounded-md bg-white/5 border border-white/10 text-white text-[11px] font-bold px-1.5 py-0.5 group-hover:border-amber-400/50 transition-colors">
                      {c.code}
                    </span>
                    <span className="min-w-0 text-sm leading-snug group-hover:text-white transition-colors">
                      {c.name}
                      <span className="block text-[11px] text-slate-500">{c.duration}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Campuses */}
          <div className="sm:col-span-2 lg:col-span-3">
            <ColumnTitle>Our Campuses</ColumnTitle>
            <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {branches.map((b) => (
                <div key={b.id} className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white font-bold text-sm">{b.name}</span>
                    <span className="text-[10px] font-bold rounded-md bg-amber-400 text-slate-950 px-1.5 py-0.5">Branch {b.code}</span>
                  </div>
                  <p className="mt-2 text-[13px] leading-snug flex gap-2">
                    <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                    <span>{b.address}, {b.city} – {b.pincode}</span>
                  </p>
                  <div className="mt-2 space-y-1">
                    {b.phone.split('/').map((p) => (
                      <a key={p} href={tel(p)} className="flex items-center gap-2 text-[13px] text-emerald-300 hover:text-emerald-200 font-semibold">
                        <Phone className="w-3.5 h-3.5" /> {p.trim()}
                      </a>
                    ))}
                  </div>
                  <a href={b.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-blue-300 hover:text-blue-200">
                    <Navigation className="w-3.5 h-3.5" /> Get directions
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 py-6 border-t border-white/10 text-xs text-slate-500">
          <p className="text-center lg:text-left">
            © {year} Modern Delhi Infotech, Madhepura (Bihar). All rights reserved. · Regd. Govt. of India
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-semibold text-slate-400">
            <button onClick={onOpenAdmission} className="hover:text-amber-300">Admission Enquiry</button>
            <button onClick={onOpenVerify} className="inline-flex items-center gap-1 hover:text-white"><BadgeCheck className="w-3.5 h-3.5" />Verify Roll</button>
            <button onClick={onOpenLogin} className="hover:text-white">Student / Admin Login</button>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 hover:text-white hover:border-white/30"
            >
              Back to top <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
