import React from 'react';
import {
  Search, Sun, Moon, Bell, Settings, User, LogOut,
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

  return (
    <div
      style={{
        backgroundColor: colors.primary[500],
      }}
      className="h-16 px-6 flex items-center justify-between border-b border-transparent transition-colors"
    >
      {/* Left: Mobile Menu Toggle & Search Bar */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          style={{ color: colors.gray[100] }}
          className="lg:hidden p-2 rounded-md hover:opacity-80 transition-opacity"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Input Box */}
        <div
          style={{
            backgroundColor: colors.primary[400],
          }}
          className="flex items-center rounded-md px-3 py-1.5 w-60 sm:w-72 shadow-xs"
        >
          <input
            type="text"
            placeholder="Search"
            style={{
              color: colors.gray[100],
            }}
            className="bg-transparent border-none outline-none text-xs flex-1 placeholder:text-slate-400"
          />
          <button style={{ color: colors.gray[100] }} type="button" className="p-0.5">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        {/* Dark Mode / Light Mode Toggle Button */}
        <button
          onClick={toggleColorMode}
          style={{ color: colors.gray[100] }}
          className="p-2 rounded-md hover:opacity-80 transition-opacity"
          title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {mode === 'dark' ? (
            <Sun className="w-5 h-5 text-amber-300" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        {/* Notifications Icon */}
        <button
          style={{ color: colors.gray[100] }}
          className="p-2 rounded-md hover:opacity-80 transition-opacity relative"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="w-2 h-2 rounded-full bg-[#4cceac] absolute top-1.5 right-1.5"></span>
        </button>

        {/* Public Website Button */}
        <button
          onClick={onViewWebsite}
          style={{ color: colors.gray[100] }}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-md hover:opacity-80 transition-opacity"
          title="Back to Public Website"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="hidden md:inline">Website</span>
        </button>

        {/* Sign Out Button */}
        <button
          onClick={onLogout}
          style={{ color: colors.redAccent[400] }}
          className="p-2 rounded-md hover:opacity-80 transition-opacity"
          title="Sign Out"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
