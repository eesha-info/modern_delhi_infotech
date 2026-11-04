import React from 'react';
import {
  Search, Sun, Moon, Bell, Settings, LogOut,
  ExternalLink, Menu
} from 'lucide-react';
import { useAppTheme } from '../../context/ThemeContext';

const Topbar = ({
  user,
  role = 'admin',
  onLogout,
  onViewWebsite,
  onToggleSidebar
}) => {
  const { mode, toggleColorMode, colors } = useAppTheme();
  const isDark = mode === 'dark';

  return (
    <div
      style={{
        backgroundColor: colors.primary[500],
        borderColor: isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0',
      }}
      className="h-16 px-4 sm:px-6 flex items-center justify-between border-b transition-colors"
    >
      {/* Left: Mobile Toggle & Search Input Box */}
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          onClick={onToggleSidebar}
          style={{ color: colors.gray[100] }}
          className="lg:hidden p-2 rounded-md hover:opacity-80 transition-opacity focus:outline-none"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Input Box (Matching reference Argon Topbar) */}
        <div
          style={{
            backgroundColor: colors.primary[400],
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0',
          }}
          className="flex items-center rounded-md px-3 py-1.5 w-48 sm:w-64 border shadow-xs"
        >
          <input
            type="text"
            placeholder="Search..."
            style={{
              color: isDark ? colors.gray[100] : '#0f172a',
            }}
            className="bg-transparent border-none outline-none text-xs flex-1 placeholder:text-slate-400"
          />
          <button style={{ color: colors.gray[300] }} type="button" className="p-0.5 focus:outline-none">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right: Actions (Theme Toggle, Notifications, Settings, Profile/Logout) */}
      <div className="flex items-center gap-1.5 sm:gap-3">
        {/* Dark Mode / Light Mode Toggle Button */}
        <button
          onClick={toggleColorMode}
          style={{ color: colors.gray[100] }}
          className="p-2 rounded-md hover:opacity-80 transition-opacity focus:outline-none"
          title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {mode === 'dark' ? (
            <Sun className="w-5 h-5 text-amber-300" />
          ) : (
            <Moon className="w-5 h-5 text-slate-700" />
          )}
        </button>

        {/* Notifications Icon */}
        <button
          style={{ color: colors.gray[100] }}
          className="p-2 rounded-md hover:opacity-80 transition-opacity relative focus:outline-none"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="w-2 h-2 rounded-full bg-[#4cceac] absolute top-1.5 right-1.5"></span>
        </button>

        {/* Settings Icon */}
        <button
          style={{ color: colors.gray[100] }}
          className="p-2 rounded-md hover:opacity-80 transition-opacity focus:outline-none"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>

        {/* Public Website Button */}
        <button
          onClick={onViewWebsite}
          style={{ color: colors.gray[100] }}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md hover:opacity-80 transition-opacity focus:outline-none"
          title="Back to Public Website"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="hidden md:inline">Website</span>
        </button>

        {/* Sonu Kumar User Badge & Logout */}
        <div className="flex items-center gap-2 pl-2 border-l border-white/10">
          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#4cceac]/60 shadow-xs flex-shrink-0 bg-black/10">
            <img
              src={role === 'admin' ? '/sonu-kumar.jpg' : (user?.avatar || '/mdi-real-logo-cropped.png')}
              alt={role === 'admin' ? 'Sonu Kumar' : 'User'}
              className="w-full h-full object-cover object-top rounded-full"
              onError={(e) => {
                e.currentTarget.src = "/mdi-real-logo-cropped.png";
              }}
            />
          </div>
          <div className="hidden lg:block text-left">
            <div style={{ color: isDark ? colors.gray[100] : '#0f172a' }} className="text-xs font-bold leading-tight">
              {role === 'admin' ? 'Sonu Kumar' : (user?.name || 'Student')}
            </div>
            <div style={{ color: colors.greenAccent[500] }} className="text-[10px] font-semibold leading-tight">
              {role === 'admin' ? 'Director' : 'Student'}
            </div>
          </div>
          <button
            onClick={onLogout}
            style={{ color: colors.redAccent[400] }}
            className="p-1.5 rounded-md hover:opacity-80 transition-opacity focus:outline-none ml-1"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
