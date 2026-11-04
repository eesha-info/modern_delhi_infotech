import React from 'react';

const Logo = ({ size = "md", showText = true, light = false }) => {
  const sizeClasses = {
    sm: "w-9 h-9",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20"
  };

  return (
    <div className="flex items-center gap-3">
      {/* Emblem SVG Image */}
      <div className={`relative flex-shrink-0 ${sizeClasses[size] || sizeClasses.md} drop-shadow-sm`}>
        <img
          src="/logo-icon.svg"
          alt="Modern Delhi Infotech Logo"
          className="w-full h-full object-contain"
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className={`font-display font-extrabold tracking-tight leading-none ${
              light ? 'text-white' : 'text-slate-900'
            } ${size === 'lg' || size === 'xl' ? 'text-2xl' : 'text-lg md:text-xl'}`}>
              MODERN DELHI INFOTECH
            </span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-amber-500 text-slate-950 tracking-wider">
              Branch-2
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className={`text-[10px] md:text-xs font-semibold tracking-wider uppercase ${
              light ? 'text-blue-200' : 'text-blue-800'
            }`}>
              Computer Education & Training Centre
            </span>
            <span className="text-[10px] text-amber-500 font-bold hidden md:inline">
              • Estd. 2017
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logo;
