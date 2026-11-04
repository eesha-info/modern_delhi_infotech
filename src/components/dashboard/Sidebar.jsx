import React from 'react';
import {
  LayoutGrid, Users, CheckSquare, Receipt, Mail, Clock,
  BookOpen, Keyboard, FileText, Award, Calendar, ExternalLink,
  Menu, X, User, HelpCircle, BarChart2, PieChart, TrendingUp,
  Map, Activity
} from 'lucide-react';
import { useAppTheme } from '../../context/ThemeContext';

const Sidebar = ({
  role = 'admin',
  activeTab,
  setActiveTab,
  isCollapsed = false,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen,
  user,
  onViewWebsite
}) => {
  const { colors, mode } = useAppTheme();
  const isDark = mode === 'dark';

  // Admin Navigation Groups matching reference Argon Dashboard
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
        { id: 'students', label: 'Manage Team', icon: Users },
        { id: 'enquiries', label: 'Contacts Information', icon: Mail },
        { id: 'invoices', label: 'Invoices Balances', icon: Receipt },
      ]
    },
    {
      title: 'Pages',
      items: [
        { id: 'batches', label: 'Batches & Timings', icon: Clock },
        { id: 'profile', label: 'Profile Form', icon: User },
        { id: 'calendar', label: 'Calendar', icon: Calendar },
        { id: 'faq', label: 'FAQ Page', icon: HelpCircle },
      ]
    },
    {
      title: 'Charts',
      items: [
        { id: 'bar', label: 'Bar Chart', icon: BarChart2 },
        { id: 'pie', label: 'Pie Chart', icon: PieChart },
        { id: 'line', label: 'Line Chart', icon: TrendingUp },
        { id: 'geography', label: 'Geography Chart', icon: Map },
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
        { id: 'faq', label: 'FAQ Page', icon: HelpCircle },
      ]
    },
    {
      title: 'Charts',
      items: [
        { id: 'line', label: 'Performance Chart', icon: TrendingUp },
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

      {/* Main Sidebar Shell */}
      <aside
        style={{
          backgroundColor: colors.primary[400],
        }}
        className={`fixed inset-y-0 left-0 z-50 flex flex-col justify-between transition-all duration-300 ease-in-out shadow-xl overflow-x-hidden select-none ${
          isCollapsed ? 'w-[72px]' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full overflow-y-auto overflow-x-hidden p-3">
          
          {/* Top Brand & Hamburger Collapse Header */}
          <div
            className={`flex items-center min-h-[52px] pb-2 border-b border-white/5 ${
              isCollapsed ? 'justify-center' : 'justify-between px-2'
            }`}
          >
            {/* Real Logo and Delhi Infotech Brand Name */}
            {!isCollapsed && (
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-white p-0.5 border border-slate-300/40 flex-shrink-0 shadow-xs">
                  <img
                    src="/mdi-real-logo-cropped.png"
                    alt="Delhi Infotech"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "/logo-icon.svg";
                    }}
                  />
                </div>
                <div className="min-w-0">
                  <h2
                    style={{ color: colors.greenAccent[500] }}
                    className="font-display font-extrabold text-base tracking-tight leading-none truncate"
                  >
                    Delhi Infotech
                  </h2>
                  <span style={{ color: colors.gray[400] }} className="text-[10px] font-semibold block mt-0.5 truncate">
                    Modern Institute
                  </span>
                </div>
              </div>
            )}

            {/* Collapse / Expand Hamburger Button */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              style={{ color: colors.gray[100] }}
              className="p-2 rounded-md hover:opacity-80 transition-opacity flex items-center justify-center focus:outline-none"
              title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              aria-label="Toggle sidebar collapse"
            >
              <Menu className="w-5 h-5 cursor-pointer" />
            </button>
          </div>

          {/* User Profile Header (Real photo of Sonu Kumar & Just name "Sonu Kumar") */}
          {!isCollapsed && (
            <div className="flex flex-col items-center text-center py-5 border-b border-white/5">
              <div className="w-24 h-24 rounded-full overflow-hidden p-1 border-2 border-[#4cceac]/40 shadow-lg mb-2.5 bg-black/10">
                <img
                  src={
                    role === 'admin'
                      ? '/sonu-kumar.jpg'
                      : (user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80')
                  }
                  alt={role === 'admin' ? 'Sonu Kumar' : (user?.name || 'Student')}
                  className="w-full h-full object-cover object-top rounded-full"
                  onError={(e) => {
                    e.currentTarget.src = "/mdi-real-logo-cropped.png";
                  }}
                />
              </div>

              <h3
                style={{ color: colors.gray[100] }}
                className="font-display font-bold text-lg leading-tight"
              >
                {role === 'admin' ? 'Sonu Kumar' : (user?.name || 'Rajeev Kumar')}
              </h3>

              <p
                style={{ color: colors.greenAccent[500] }}
                className="text-xs font-semibold mt-1"
              >
                {role === 'admin' ? 'Director' : `Student · ${user?.regNo || 'MDI-B2-456'}`}
              </p>
            </div>
          )}

          {/* Navigation Section List */}
          <nav className={`mt-3 space-y-4 ${isCollapsed ? 'px-0' : 'px-1'}`}>
            {sections.map((sec, secIdx) => (
              <div key={secIdx}>
                {/* Section Header (Only visible when expanded) */}
                {!isCollapsed && sec.title && (
                  <div
                    style={{ color: colors.gray[400] }}
                    className="text-[11px] font-bold uppercase tracking-wider px-3 mb-1.5"
                  >
                    {sec.title}
                  </div>
                )}

                <div className="space-y-1">
                  {sec.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => handleSelectTab(item.id)}
                        style={{
                          color: isActive ? colors.blueAccent[500] : colors.gray[100],
                          border: isActive
                            ? `2px solid ${colors.blueAccent[500]}`
                            : '2px solid transparent',
                          borderRadius: '6px',
                          backgroundColor: 'transparent',
                        }}
                        className={`w-full flex items-center transition-all ${
                          isCollapsed
                            ? 'justify-center py-2.5 px-0 h-11'
                            : 'justify-start gap-3.5 px-3.5 py-2.5 text-xs font-semibold h-11'
                        } ${
                          isActive
                            ? 'font-bold'
                            : 'hover:opacity-80'
                        }`}
                        title={isCollapsed ? item.label : undefined}
                      >
                        <Icon
                          className="w-5 h-5 flex-shrink-0"
                          style={{
                            color: isActive ? colors.blueAccent[500] : colors.gray[100]
                          }}
                        />
                        {!isCollapsed && (
                          <span className="truncate">{item.label}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

        </div>

        {/* Bottom Back to Website Link */}
        <div className="p-3 border-t border-white/5">
          <button
            onClick={onViewWebsite}
            style={{ color: colors.gray[300] }}
            className={`w-full flex items-center py-2 text-xs font-semibold hover:opacity-80 transition-opacity ${
              isCollapsed ? 'justify-center px-0' : 'justify-start gap-3 px-3'
            }`}
            title="Back to Public Website"
          >
            <ExternalLink className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span>Back to Website</span>}
          </button>
        </div>

      </aside>
    </>
  );
};

export default Sidebar;
