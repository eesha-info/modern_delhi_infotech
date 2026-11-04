import React from 'react';
import {
  LayoutGrid, Users, CheckSquare, Receipt, Mail, Clock,
  BookOpen, Keyboard, FileText, Award, Calendar, ExternalLink,
  Phone, X, LogOut, ChevronLeft
} from 'lucide-react';
import { useAppTheme } from '../../context/ThemeContext';
import { instituteInfo } from '../../data/mdiData';

const Sidebar = ({
  role = 'admin',
  activeTab,
  setActiveTab,
  mobileOpen,
  setMobileOpen,
  user,
  onViewWebsite
}) => {
  const { colors, mode } = useAppTheme();

  // Admin Navigation Groups
  const adminSections = [
    {
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid }
      ]
    },
    {
      title: 'Data',
      items: [
        { id: 'attendance', label: 'Take Attendance', icon: CheckSquare },
        { id: 'students', label: 'Students Roster', icon: Users },
        { id: 'invoices', label: 'Invoices Balances', icon: Receipt },
      ]
    },
    {
      title: 'Pages',
      items: [
        { id: 'batches', label: 'Batches & Timings', icon: Clock },
        { id: 'enquiries', label: 'Website Leads', icon: Mail },
      ]
    }
  ];

  // Student Navigation Groups
  const studentSections = [
    {
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid }
      ]
    },
    {
      title: 'Data',
      items: [
        { id: 'attendance', label: 'My Attendance', icon: Calendar },
        { id: 'syllabus', label: 'Course & Syllabus', icon: BookOpen },
        { id: 'invoices', label: 'Invoices Balances', icon: Receipt },
      ]
    },
    {
      title: 'Pages',
      items: [
        { id: 'typing', label: 'Typing Speed Lab', icon: Keyboard },
        { id: 'materials', label: 'Study Materials', icon: FileText },
        { id: 'certificate', label: 'Digital Certificate', icon: Award },
      ]
    }
  ];

  const sections = role === 'admin' ? adminSections : studentSections;

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
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      {/* Main Sidebar */}
      <aside
        style={{
          backgroundColor: colors.primary[400],
        }}
        className={`fixed inset-y-0 left-0 w-64 z-50 flex flex-col justify-between overflow-y-auto transition-transform duration-300 ease-in-out shadow-lg lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5">
          {/* Mobile close button */}
          <div className="flex justify-end lg:hidden">
            <button
              onClick={() => setMobileOpen(false)}
              style={{ color: colors.gray[100] }}
              className="p-1 hover:opacity-75"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Header (Exact match to screenshot avatar & typography!) */}
          <div className="flex flex-col items-center text-center mt-2 pb-6 border-b border-white/5">
            <div className="w-24 h-24 rounded-full overflow-hidden p-1 border-2 border-slate-500/40 shadow-md mb-3">
              <img
                src={
                  user?.avatar ||
                  (role === 'admin'
                    ? '/mdi-real-logo-cropped.png'
                    : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80')
                }
                alt={user?.name || 'User'}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  e.currentTarget.src = "/logo-icon.svg";
                }}
              />
            </div>

            <h3
              style={{ color: colors.gray[100] }}
              className="font-display font-bold text-lg leading-tight"
            >
              {user?.name || (role === 'admin' ? 'Sonu Kumar' : 'Rajeev Kumar')}
            </h3>

            <p
              style={{ color: colors.greenAccent[500] }}
              className="text-xs font-semibold mt-1"
            >
              {role === 'admin' ? 'Director & Chief Mentor' : `Student · ${user?.regNo || 'MDI-B2-456'}`}
            </p>
          </div>

          {/* Navigation Section List */}
          <nav className="mt-4 space-y-4">
            {sections.map((sec, secIdx) => (
              <div key={secIdx}>
                {sec.title && (
                  <div
                    style={{ color: colors.gray[300] }}
                    className="text-[11px] font-bold uppercase tracking-wider px-3 mb-1"
                  >
                    {sec.title}
                  </div>
                )}

                <div className="space-y-0.5">
                  {sec.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    const itemColor = isActive
                      ? colors.blueAccent[500]
                      : colors.gray[100];

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectTab(item.id)}
                        style={{ color: itemColor }}
                        className={`w-full flex items-center gap-4 px-3.5 py-2.5 rounded-md text-xs font-semibold text-left transition-colors ${
                          isActive
                            ? 'font-bold'
                            : 'hover:opacity-80'
                        }`}
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" style={{ color: itemColor }} />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Back to Website Link */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={onViewWebsite}
            style={{ color: colors.gray[300] }}
            className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold hover:opacity-80 transition-opacity"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Back to Public Website</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
