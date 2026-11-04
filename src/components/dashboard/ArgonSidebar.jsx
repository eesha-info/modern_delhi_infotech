import React from 'react';
import {
  Tv, CheckSquare, Users, Receipt, Mail, Clock, BookOpen,
  Keyboard, FileText, Award, ExternalLink, Phone, ShieldCheck,
  GraduationCap, X, Calendar
} from 'lucide-react';
import { instituteInfo } from '../../data/mdiData';

const ArgonSidebar = ({
  role = 'admin',
  activeTab,
  setActiveTab,
  mobileOpen,
  setMobileOpen,
  onViewWebsite
}) => {
  // Navigation items for Admin
  const adminNav = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Tv,
      color: 'bg-gradient-to-tr from-blue-600 to-indigo-600',
      badge: null
    },
    {
      id: 'attendance',
      label: 'Take Attendance',
      icon: CheckSquare,
      color: 'bg-gradient-to-tr from-emerald-500 to-teal-600',
      badge: 'Batchwise'
    },
    {
      id: 'students',
      label: 'Students Roster',
      icon: Users,
      color: 'bg-gradient-to-tr from-purple-600 to-indigo-600',
      badge: null
    },
    {
      id: 'invoices',
      label: 'Billing & Invoices',
      icon: Receipt,
      color: 'bg-gradient-to-tr from-amber-500 to-yellow-600',
      badge: 'GST'
    },
    {
      id: 'enquiries',
      label: 'Website Leads',
      icon: Mail,
      color: 'bg-gradient-to-tr from-rose-500 to-pink-600',
      badge: 'New'
    },
    {
      id: 'batches',
      label: 'Batches & Timings',
      icon: Clock,
      color: 'bg-gradient-to-tr from-cyan-500 to-blue-600',
      badge: null
    }
  ];

  // Navigation items for Student
  const studentNav = [
    {
      id: 'dashboard',
      label: 'My Overview',
      icon: Tv,
      color: 'bg-gradient-to-tr from-blue-600 to-indigo-600',
      badge: null
    },
    {
      id: 'attendance',
      label: 'My Attendance',
      icon: Calendar,
      color: 'bg-gradient-to-tr from-emerald-500 to-teal-600',
      badge: '94%'
    },
    {
      id: 'syllabus',
      label: 'Course & Syllabus',
      icon: BookOpen,
      color: 'bg-gradient-to-tr from-purple-600 to-indigo-600',
      badge: 'ADIT'
    },
    {
      id: 'invoices',
      label: 'My Fee Invoices',
      icon: Receipt,
      color: 'bg-gradient-to-tr from-amber-500 to-yellow-600',
      badge: 'Paid'
    },
    {
      id: 'typing',
      label: 'Typing Speed Lab',
      icon: Keyboard,
      color: 'bg-gradient-to-tr from-teal-500 to-emerald-600',
      badge: 'Beltron'
    },
    {
      id: 'materials',
      label: 'Study Materials',
      icon: FileText,
      color: 'bg-gradient-to-tr from-rose-500 to-pink-600',
      badge: 'PDFs'
    },
    {
      id: 'certificate',
      label: 'Digital Certificate',
      icon: Award,
      color: 'bg-gradient-to-tr from-yellow-500 to-amber-600',
      badge: null
    }
  ];

  const currentNav = role === 'admin' ? adminNav : studentNav;

  const handleSelectTab = (id) => {
    setActiveTab(id);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Main Sidebar Shell */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Top Brand Header */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 border border-slate-200 shadow-sm flex-shrink-0">
                <img
                  src="/mdi-real-logo-cropped.png"
                  alt="MDI Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/logo-icon.svg";
                  }}
                />
              </div>
              <div className="min-w-0">
                <h2 className="font-display font-extrabold text-slate-900 text-sm tracking-tight leading-snug truncate">
                  MODERN DELHI INFOTECH
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
                  {role === 'admin' ? 'Argon Admin Panel' : 'Argon Student Portal'}
                </span>
              </div>
            </div>

            {/* Close button for mobile */}
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Section Title */}
          <div className="px-6 pt-5 pb-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {role === 'admin' ? 'Institute Administration' : 'Learning Portal'}
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1">
            {currentNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                    isActive
                      ? 'bg-blue-50 text-blue-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Argon Colored Icon Container */}
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-sm flex-shrink-0 ${
                        item.color
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                        isActive
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Divider */}
          <div className="px-6 my-4">
            <hr className="border-slate-100" />
          </div>

          {/* Secondary Actions */}
          <div className="px-3 space-y-1">
            <button
              onClick={onViewWebsite}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center flex-shrink-0">
                <ExternalLink className="w-4 h-4" />
              </div>
              <span>Back to Public Website</span>
            </button>
          </div>
        </div>

        {/* Bottom Support Card in Sidebar */}
        <div className="p-4 m-3 rounded-2xl bg-gradient-to-br from-blue-900 to-indigo-950 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
              Director Support
            </span>
            <h4 className="text-xs font-bold text-white mt-0.5">Sonu Kumar (Sonu Sir)</h4>
            <p className="text-[10px] text-blue-200 mt-0.5">BCA, MCA · Madhepura</p>
            <a
              href={`tel:${instituteInfo.contact.primaryPhone.replace(/\s+/g, '')}`}
              className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-[10px] transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{instituteInfo.contact.primaryPhone}</span>
            </a>
          </div>
        </div>

      </aside>
    </>
  );
};

export default ArgonSidebar;
