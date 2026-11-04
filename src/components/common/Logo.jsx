import React from 'react';

const Logo = ({ size = "md", light = false }) => {
  const sizeClasses = {
    sm: "w-9 h-9",
    md: "w-11 h-11",
    lg: "w-14 h-14"
  };

  return (
    <div className="flex items-center gap-3 flex-nowrap select-none">
      {/* Real Authentic Emblem Logo */}
      <div className={`relative flex-shrink-0 ${sizeClasses[size] || sizeClasses.md} rounded-full overflow-hidden shadow-sm bg-white p-0.5 border border-slate-200`}>
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
        <div className="flex items-center gap-2">
          <span className={`font-display font-extrabold tracking-tight text-base sm:text-lg leading-tight whitespace-nowrap ${
            light ? 'text-white' : 'text-slate-900'
          }`}>
            MODERN DELHI INFOTECH
          </span>
          <span className="hidden sm:inline-flex px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-slate-100 text-slate-700 border border-slate-200 tracking-wider whitespace-nowrap">
            Branch 2
          </span>
        </div>
        <p className={`text-[10px] sm:text-[11px] font-medium tracking-wide mt-0.5 truncate ${
          light ? 'text-blue-200' : 'text-slate-500'
        }`}>
          Computer Education &amp; Training Centre
        </p>
      </div>
    </div>
  );
};

export default Logo;
