import React from 'react';
import { Search, Bell, LogOut, Menu, ExternalLink, ShieldCheck, GraduationCap, Home } from 'lucide-react';

const ArgonNavbar = ({
  activeTabTitle = 'Dashboard',
  user,
  role = 'admin',
  onLogout,
  onViewWebsite,
  onOpenMobileSidebar
}) => {
  return (
    <nav className="h-18 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-white relative z-20">
      
      {/* Left: Breadcrumbs & Page Title */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          {/* Breadcrumb line */}
          <div className="flex items-center gap-1.5 text-xs text-blue-200">
            <Home className="w-3.5 h-3.5" />
            <span>/</span>
            <span>Pages</span>
            <span>/</span>
            <span className="text-white font-semibold capitalize">{activeTabTitle}</span>
          </div>
          {/* Page Heading */}
          <h1 className="text-lg sm:text-xl font-display font-extrabold text-white capitalize leading-tight mt-0.5">
            {activeTabTitle}
          </h1>
        </div>
      </div>

      {/* Right: Search, Notifications, Profile, Sign Out */}
      <div className="flex items-center gap-3">
        
        {/* Search Input (Argon signature pill) */}
        <div className="relative hidden md:block w-48 lg:w-60">
          <Search className="w-4 h-4 text-blue-200 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Type here..."
            className="w-full bg-white/10 border border-white/20 rounded-full pl-9 pr-4 py-1.5 text-xs text-white placeholder-blue-200 focus:outline-none focus:bg-white/20 focus:border-white/40 transition-all"
          />
        </div>

        {/* View Website Button */}
        <button
          onClick={onViewWebsite}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Website</span>
        </button>

        {/* User Profile Capsule */}
        <div className="flex items-center gap-2 pl-2 border-l border-white/20">
          <div className="w-9 h-9 rounded-full bg-white p-0.5 overflow-hidden shadow-sm flex-shrink-0">
            <img
              src={user?.avatar || (role === 'admin' ? '/mdi-real-logo-cropped.png' : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80')}
              alt={user?.name || 'User'}
              className="w-full h-full object-cover rounded-full"
              onError={(e) => {
                e.currentTarget.src = "/logo-icon.svg";
              }}
            />
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-bold text-white leading-tight">
              {user?.name || (role === 'admin' ? 'Sonu Kumar (Sonu Sir)' : 'Rajeev Kumar')}
            </span>
            <span className="text-[10px] text-blue-200 uppercase font-semibold">
              {role === 'admin' ? 'Director / Admin' : `Student (${user?.regNo || 'MDI-B2-456'})`}
            </span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          title="Sign Out"
          className="p-2 text-rose-300 hover:text-white bg-rose-500/20 hover:bg-rose-500/40 rounded-xl border border-rose-500/30 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>

      </div>

    </nav>
  );
};

export default ArgonNavbar;
