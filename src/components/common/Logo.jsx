import React from 'react';

const Logo = ({ size = "md", light = false, showBadge = true }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-14 h-14",
    xl: "w-20 h-20"
  };

  return (
    <div className="flex items-center gap-3">
      {/* Real Authentic Emblem Logo */}
      <div className={`relative flex-shrink-0 ${sizeClasses[size] || sizeClasses.md} rounded-full overflow-hidden shadow-sm bg-white p-0.5 border border-amber-400/40`}>
        <img
          src="/mdi-real-logo-cropped.png"
          alt="Modern Delhi Infotech"
          className="w-full h-full object-contain"
          onError={(e) => {
            e.currentTarget.src = "/logo-icon.svg";
          }}
        />
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-1.5 flex-nowrap">
          <span className={`font-serif font-black tracking-tight leading-none text-base sm:text-lg whitespace-nowrap ${
            light ? 'text-white' : 'text-slate-900'
          }`}>
            MODERN DELHI INFOTECH
          </span>
          {showBadge && (
            <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase rounded bg-amber-400 text-slate-950 tracking-wider">
              Branch 2
            </span>
          )}
        </div>
        <p className={`text-[10px] sm:text-[11px] font-bold tracking-wider uppercase mt-1 truncate ${
          light ? 'text-blue-200' : 'text-red-700'
        }`}>
          Computer Education &amp; Training Centre
        </p>
      </div>
    </div>
  );
};

export default Logo;
