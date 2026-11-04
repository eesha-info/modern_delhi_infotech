import React from 'react';
import {
  Tv, CheckSquare, Users, Receipt, Mail, Clock, BookOpen,
  Keyboard, FileText, Award, ExternalLink, Phone, ShieldCheck,
  GraduationCap, X, Calendar
} from 'lucide-react';
import { instituteInfo } from '../../data/mdiData';
import { asset } from '../../utils/asset';

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
      badge: null
    },
    {
      id: 'attendance',
      label: 'Take Attendance',
      icon: CheckSquare,
      badge: 'Batchwise'
    },
    {
      id: 'students',
      label: 'Students Roster',
      icon: Users,
      badge: null
    },
    {
      id: 'invoices',
      label: 'Billing & Invoices',
      icon: Receipt,
      badge: 'GST'
    },
    {
      id: 'enquiries',
      label: 'Website Leads',
      icon: Mail,
      badge: null
    },
    {
      id: 'batches',
      label: 'Batches & Timings',
      icon: Clock,
      badge: null
    }
  ];

  // Navigation items for Student
  const studentNav = [
    {
      id: 'dashboard',
      label: 'My Overview',
      icon: Tv,
      badge: null
    },
    {
      id: 'attendance',
      label: 'My Attendance',
      icon: Calendar,
      badge: '94%'
    },
    {
      id: 'syllabus',
      label: 'Course & Syllabus',
      icon: BookOpen,
      badge: 'ADIT'
    },
    {
      id: 'invoices',
      label: 'My Fee Invoices',
      icon: Receipt,
      badge: 'Paid'
    },
    {
      id: 'typing',
      label: 'Typing Speed Lab',
      icon: Keyboard,
      badge: 'Beltron'
    },
    {
      id: 'materials',
      label: 'Study Materials',
      icon: FileText,
      badge: 'PDFs'
    },
    {
      id: 'certificate',
      label: 'Digital Certificate',
      icon: Award,
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
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
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
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white p-0.5 border border-slate-200 shadow-xs flex-shrink-0">
                <img
                  src={asset('/mdi-real-logo-cropped.png')}
                  alt="MDI Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src = asset('/logo-icon.svg');
                  }}
                />
              </div>
              <div className="min-w-0">
                <h2 className="font-display font-extrabold text-slate-900 text-sm tracking-tight leading-snug truncate">
                  MODERN DELHI INFOTECH
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#5e72e4] block">
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
          <div className="px-6 pt-6 pb-2">
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
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-[#5e72e4]/10 text-[#5e72e4] font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Clean Icon with no multi-color background boxes */}
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                        isActive
                          ? 'bg-[#5e72e4] text-white shadow-xs'
                          : 'text-slate-400 group-hover:text-slate-600 bg-slate-50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                        isActive
                          ? 'bg-[#5e72e4] text-white'
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
              <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center flex-shrink-0">
                <ExternalLink className="w-4 h-4" />
              </div>
              <span>Back to Public Website</span>
            </button>
          </div>
        </div>

        {/* Clean, Subtle Director Support Card */}
        <div className="p-4 m-3 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#5e72e4] block">
            Director Desk
          </span>
          <h4 className="text-xs font-bold text-slate-900 mt-0.5">Sonu Kumar (Sonu Sir)</h4>
          <p className="text-[10px] text-slate-500 mt-0.5">BCA, MCA · Madhepura</p>
          <a
            href={`tel:${instituteInfo.contact.primaryPhone.replace(/\s+/g, '')}`}
            className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-lg text-[10px] border border-slate-200 transition-colors w-full justify-center"
          >
            <Phone className="w-3 h-3 text-[#5e72e4]" />
            <span>{instituteInfo.contact.primaryPhone}</span>
          </a>
        </div>

      </aside>
    </>
  );
};

export default ArgonSidebar;
