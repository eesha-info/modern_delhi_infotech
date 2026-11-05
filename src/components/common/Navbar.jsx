import React, { useEffect, useRef, useState } from 'react';
import {
  Menu, X, User, ShieldCheck, GraduationCap, LogOut, ArrowRight, ChevronDown, Phone, Mail, BadgeCheck,
} from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { instituteInfo } from '../../data/mdiData';

/*
  Two-tier institute header:
  1. White brand row (logo, contact, portal buttons)
  2. Solid blue menu bar with dropdowns – sticks to the top while scrolling (desktop)
*/
const Navbar = ({ onOpenLogin, onOpenAdmission, onOpenVerify }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // desktop dropdown id
  const [mobileSection, setMobileSection] = useState(null); // mobile accordion id
  const navRef = useRef(null);
  const { user, activeView, setActiveView, logout, isAdmin } = useAuth();
  const { courses } = useData();

  const phone = instituteInfo.contact.primaryPhone;
  const email = instituteInfo.contact.email;

  const goTo = (hash) => {
    setOpenMenu(null);
    setMobileOpen(false);
    const scroll = () => {
      if (hash === '#top') return window.scrollTo({ top: 0, behavior: 'smooth' });
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    };
    if (activeView !== 'landing') {
      setActiveView('landing');
      setTimeout(scroll, 100);
    } else {
      scroll();
    }
  };

  const run = (fn) => () => {
    setOpenMenu(null);
    setMobileOpen(false);
    fn();
  };

  // Menu definition: an item has either `href` (scroll target), `action` (callback), or `children`.
  const menu = [
    { id: 'home', label: 'Home', href: '#top' },
    {
      id: 'about', label: 'About Us', children: [
        { label: 'About the Institute', href: '#why-us' },
        { label: "Director's Desk", href: '#director' },
        { label: 'Student Reviews', href: '#testimonials' },
        { label: 'Our Campuses', href: '#branches' },
      ],
    },
    {
      id: 'courses', label: 'Courses', wide: true, children: [
        ...courses.map((c) => ({ label: `${c.code} – ${c.name}`, href: '#courses' })),
        { label: 'View all courses →', href: '#courses', strong: true },
      ],
    },
    {
      id: 'student', label: 'Student Zone', children: [
        { label: 'Apply for Admission', action: onOpenAdmission },
        { label: 'Verify Roll / Certificate', action: onOpenVerify },
      ],
    },
    { id: 'download', label: 'Download', href: '#downloads' },
    {
      id: 'gallery', label: 'Gallery', children: [
        { label: 'Photo Gallery', href: '#gallery' },
        { label: 'Campus & Labs', href: '#branches' },
      ],
    },
    { id: 'contact', label: 'Contact Us', href: '#contact' },
  ];

  const activate = (item) => (item.action ? run(item.action)() : goTo(item.href));

  // Close dropdown on outside click / Escape
  useEffect(() => {
    const onDown = (e) => { if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null); };
    const onKey = (e) => { if (e.key === 'Escape') { setOpenMenu(null); setMobileOpen(false); } };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, []);

  const verifyButton = (
    <button
      onClick={run(onOpenVerify)}
      className="whitespace-nowrap flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200"
    >
      <BadgeCheck className="w-4 h-4" />
      Verify Roll
    </button>
  );

  const portalButtons = user ? (
    <div className="flex items-center gap-2">
      {verifyButton}
      <button
        onClick={() => setActiveView(isAdmin ? 'admin' : 'student')}
        className={`whitespace-nowrap flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold text-white shadow-sm ${isAdmin ? 'bg-blue-900 hover:bg-blue-800' : 'bg-emerald-700 hover:bg-emerald-800'}`}
      >
        {isAdmin ? <ShieldCheck className="w-4 h-4 text-amber-400" /> : <GraduationCap className="w-4 h-4 text-emerald-300" />}
        {isAdmin ? 'Admin Dashboard' : 'Student Portal'}
      </button>
      <button onClick={logout} title="Logout" className="p-2.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg">
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-2.5">
      {verifyButton}
      <button
        onClick={onOpenLogin}
        className="whitespace-nowrap flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold text-slate-700 hover:text-blue-800 border border-slate-200 hover:bg-slate-50"
      >
        <User className="w-3.5 h-3.5 text-blue-700" />
        Portal Login
      </button>
      <button
        onClick={onOpenAdmission}
        className="whitespace-nowrap flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2.5 rounded-lg text-xs font-bold shadow-sm"
      >
        Admission Enquiry
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );

  return (
    <>
      {/* ───────── Row 1: brand bar (sticky on mobile only) ───────── */}
      <div className="sticky top-0 lg:static z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-24 flex items-center justify-between gap-4">
          <button onClick={() => goTo('#top')} className="min-w-0 text-left hover:opacity-90" aria-label="Modern Delhi Infotech home">
            <Logo size="md" />
          </button>

          <div className="hidden lg:flex items-center gap-6">
            <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hidden xl:flex items-center gap-2.5 group">
              <span className="w-9 h-9 rounded-full bg-blue-50 text-blue-800 flex items-center justify-center"><Phone className="w-4 h-4" /></span>
              <span className="leading-tight">
                <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Call Sonu Sir</span>
                <span className="block text-sm font-bold text-slate-900 group-hover:text-blue-800">{phone}</span>
              </span>
            </a>
            <a href={`mailto:${email}`} className="hidden 2xl:flex items-center gap-2.5 group">
              <span className="w-9 h-9 rounded-full bg-blue-50 text-blue-800 flex items-center justify-center"><Mail className="w-4 h-4" /></span>
              <span className="leading-tight">
                <span className="block text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Email Us</span>
                <span className="block text-sm font-bold text-slate-900 group-hover:text-blue-800">{email}</span>
              </span>
            </a>
            {portalButtons}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-800 hover:bg-slate-100 flex-shrink-0"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white max-h-[calc(100vh-5rem)] overflow-y-auto shadow-xl">
            <nav className="px-4 py-2">
              {menu.map((item) =>
                item.children ? (
                  <div key={item.id} className="border-b border-slate-100">
                    <button
                      onClick={() => setMobileSection(mobileSection === item.id ? null : item.id)}
                      className="w-full flex items-center justify-between py-3 text-sm font-bold uppercase tracking-wide text-slate-800"
                      aria-expanded={mobileSection === item.id}
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileSection === item.id ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileSection === item.id && (
                      <div className="pb-2 pl-3 border-l-2 border-amber-400 ml-1 space-y-0.5">
                        {item.children.map((c) => (
                          <button key={c.label} onClick={() => activate(c)} className={`block w-full text-left py-2 text-sm ${c.strong ? 'font-bold text-blue-800' : 'text-slate-600'}`}>
                            {c.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button key={item.id} onClick={() => activate(item)} className="w-full text-left py-3 text-sm font-bold uppercase tracking-wide text-slate-800 border-b border-slate-100">
                    {item.label}
                  </button>
                )
              )}
            </nav>
            <div className="px-4 py-4 space-y-2 bg-slate-50">
              <button onClick={run(onOpenVerify)} className="w-full py-3 text-sm font-bold bg-blue-50 border border-blue-200 text-blue-800 rounded-lg flex items-center justify-center gap-2">
                <BadgeCheck className="w-4 h-4" /> Verify Roll / Certificate
              </button>
              {!user ? (
                <>
                  <button onClick={run(onOpenAdmission)} className="w-full py-3 text-sm font-bold bg-amber-400 text-slate-950 rounded-lg">Admission Enquiry</button>
                  <button onClick={run(onOpenLogin)} className="w-full py-3 text-sm font-bold bg-white border border-slate-200 text-slate-800 rounded-lg">Portal Login</button>
                </>
              ) : (
                <button onClick={run(() => setActiveView(isAdmin ? 'admin' : 'student'))} className="w-full py-3 text-sm font-bold bg-blue-900 text-white rounded-lg">
                  {isAdmin ? 'Admin Dashboard' : 'Student Portal'}
                </button>
              )}
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="flex items-center justify-center gap-2 py-2 text-sm font-semibold text-slate-700">
                <Phone className="w-4 h-4 text-emerald-600" /> {phone}
              </a>
            </div>
          </div>
        )}
      </div>

      {/* ───────── Row 2: blue menu bar (desktop, sticky) ───────── */}
      <nav ref={navRef} className="hidden lg:block sticky top-0 z-30 bg-[#232f86] shadow-md" aria-label="Main">
        <ul className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          {menu.map((item) => {
            const isOpen = openMenu === item.id;
            return (
              <li
                key={item.id}
                className="relative"
                onMouseEnter={() => item.children && setOpenMenu(item.id)}
                onMouseLeave={() => item.children && setOpenMenu(null)}
              >
                <button
                  onClick={() => (item.children ? setOpenMenu(isOpen ? null : item.id) : activate(item))}
                  aria-haspopup={item.children ? 'true' : undefined}
                  aria-expanded={item.children ? isOpen : undefined}
                  className={`relative flex items-center gap-1.5 px-4 xl:px-6 h-14 text-[13px] xl:text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors whitespace-nowrap ${
                    isOpen ? 'bg-white/10' : 'hover:bg-white/10'
                  } after:absolute after:left-4 after:right-4 after:bottom-0 after:h-[3px] after:rounded-t after:bg-amber-400 after:transition-transform after:origin-left ${
                    isOpen ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100'
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} strokeWidth={3} />}
                </button>

                {item.children && isOpen && (
                  <div className={`absolute top-full ${item.id === 'gallery' ? 'right-0' : 'left-0'} pt-0 z-40`}>
                    <ul className={`bg-white rounded-b-lg shadow-2xl border-t-[3px] border-amber-400 py-2 ${item.wide ? 'w-[26rem] grid grid-cols-1' : 'w-64'}`}>
                      {item.children.map((c) => (
                        <li key={c.label}>
                          <button
                            onClick={() => activate(c)}
                            className={`w-full text-left px-5 py-2.5 text-sm transition-colors hover:bg-blue-50 hover:text-blue-900 hover:pl-6 ${
                              c.strong ? 'font-bold text-blue-800 border-t border-slate-100 mt-1' : 'text-slate-700'
                            }`}
                          >
                            {c.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
