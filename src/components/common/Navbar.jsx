import React, { useState } from 'react';
import { Menu, X, User, ShieldCheck, GraduationCap, ChevronDown, LogOut, PhoneCall, CheckCircle2 } from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ onOpenLogin, onOpenAdmission, onOpenVerify }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, activeView, setActiveView, logout, isAdmin, isStudent } = useAuth();

  const navLinks = [
    { label: "Courses", href: "#courses" },
    { label: "Director's Desk", href: "#director" },
    { label: "Why MDI", href: "#why-us" },
    { label: "Fee Calculator", href: "#fees" },
    { label: "Typing Lab", href: "#typing-lab" },
    { label: "Branches", href: "#branches" },
    { label: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    // If currently inside admin or student dashboard, go back to landing page first
    if (activeView !== 'landing') {
      setActiveView('landing');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Institute Identity */}
          <div 
            onClick={() => setActiveView('landing')} 
            className="cursor-pointer transition-transform hover:opacity-95"
          >
            <Logo size="md" showText={true} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-6 text-sm font-semibold text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-blue-700 transition-colors py-2 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-700 transition-all duration-200 group-hover:w-full" />
              </a>
            ))}

            {/* Quick Certificate Verify CTA */}
            <button
              onClick={onOpenVerify}
              className="text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
              Verify Certificate
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* If Logged In: Show Dashboard Switcher & Logout */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveView(isAdmin ? 'admin' : 'student')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm transition-all ${
                    isAdmin
                      ? 'bg-gradient-to-r from-blue-900 to-indigo-900 text-white hover:from-blue-800 hover:to-indigo-800'
                      : 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:from-emerald-700 hover:to-teal-800'
                  }`}
                >
                  {isAdmin ? (
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                  ) : (
                    <GraduationCap className="w-4 h-4 text-emerald-300" />
                  )}
                  <span>{isAdmin ? 'Admin Dashboard' : 'Student Portal'}</span>
                </button>

                {activeView !== 'landing' && (
                  <button
                    onClick={() => setActiveView('landing')}
                    className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl transition-all"
                  >
                    View Website
                  </button>
                )}

                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* If Guest: Show Login and Online Admission buttons */
              <div className="flex items-center space-x-2">
                <button
                  onClick={onOpenLogin}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 border border-slate-200 transition-all"
                >
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Portal Login</span>
                </button>

                <button
                  onClick={onOpenAdmission}
                  className="flex items-center gap-1.5 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm shadow-blue-500/20 transition-all active:scale-95"
                >
                  <span>Admission Enquiry</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            {!user && (
              <button
                onClick={onOpenLogin}
                className="px-3 py-1.5 text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 rounded-lg"
              >
                Login
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          {user && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 mb-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Logged in as</p>
                <p className="text-sm font-bold text-slate-800">{user.name}</p>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                  {isAdmin ? 'Director / Admin' : `Student (${user.regNo})`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setActiveView(isAdmin ? 'admin' : 'student');
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-1.5 text-xs font-bold bg-blue-700 text-white rounded-lg shadow-sm"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="p-1.5 text-slate-500 hover:text-rose-600"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="p-2.5 rounded-lg hover:bg-slate-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenVerify();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold bg-blue-50 text-blue-700 rounded-xl border border-blue-200"
            >
              <CheckCircle2 className="w-4 h-4" />
              Verify Student Certificate
            </button>

            {!user ? (
              <button
                onClick={() => {
                  onOpenAdmission();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-xs font-bold bg-blue-700 text-white rounded-xl shadow-md text-center"
              >
                Apply for New Admission
              </button>
            ) : (
              <button
                onClick={() => {
                  setActiveView('landing');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-xl"
              >
                Back to Website
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
