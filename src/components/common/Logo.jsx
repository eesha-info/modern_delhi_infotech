import React from 'react';
import { asset } from '../../utils/asset';

// Institute name lockup: emblem + two-tone English name + Hindi name and tagline.
const Logo = ({ size = 'md', light = false, showBranch = true }) => {
  const emblem = { sm: 'w-10 h-10', md: 'w-12 h-12 sm:w-16 sm:h-16', lg: 'w-16 h-16 sm:w-20 sm:h-20' }[size] || 'w-12 h-12 sm:w-16 sm:h-16';
  const name = { sm: 'text-base', md: 'text-[17px] sm:text-[26px]', lg: 'text-xl sm:text-3xl' }[size] || 'text-[17px] sm:text-[26px]';

  return (
    <div className="flex items-center gap-3 sm:gap-4 flex-nowrap select-none min-w-0">
      <span className={`relative flex-shrink-0 ${emblem} rounded-full bg-white p-0.5 ring-2 ring-amber-400/70 ring-offset-2 ${light ? 'ring-offset-[#0a1024]' : 'ring-offset-white'} shadow-md`}>
        <img
          src={asset('/mdi-real-logo-cropped.png')}
          alt="Modern Delhi Infotech"
          className="w-full h-full object-contain rounded-full"
          onError={(e) => { e.currentTarget.src = asset('/logo-icon.svg'); }}
        />
      </span>

      <span className="flex flex-col min-w-0">
        <span className="flex items-center gap-2.5 min-w-0">
          <span className={`font-display font-extrabold uppercase leading-none tracking-[-0.01em] whitespace-nowrap ${name}`}>
            <span className={light ? 'text-white' : 'text-[#232f86]'}>Modern Delhi</span>{' '}
            <span className="text-amber-500">Infotech</span>
          </span>
          {showBranch && (
            <span className={`hidden md:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider whitespace-nowrap border ${
              light ? 'border-white/20 text-white/80' : 'border-[#232f86]/20 text-[#232f86] bg-[#232f86]/[0.04]'
            }`}>
              Branch 2
            </span>
          )}
        </span>
        <span className={`mt-1 sm:mt-1.5 flex items-center gap-2 min-w-0 text-[11px] sm:text-[13px] ${light ? 'text-blue-100/80' : 'text-slate-500'}`}>
          <span className={`font-hindi font-semibold whitespace-nowrap ${light ? 'text-amber-300' : 'text-amber-700'}`}>मॉडर्न दिल्ली इन्फोटेक</span>
          <span className="hidden sm:inline w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
          <span className="hidden sm:inline truncate font-medium tracking-wide">Computer Education &amp; Training Centre</span>
        </span>
      </span>
    </div>
  );
};

export default Logo;
