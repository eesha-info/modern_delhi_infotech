import React, { useState } from 'react';
import { MapPin, Phone, Clock, Monitor, ExternalLink, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { instituteInfo } from '../../data/mdiData';

const BranchLocations = ({ onOpenAdmission }) => {
  const [activeBranchId, setActiveBranchId] = useState('branch-2');

  return (
    <section id="branches" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
            Visit Our Centres
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-3 tracking-tight">
            Two Modern Training Campuses in Madhepura
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Both branches are equipped with high-speed computers, backup generators, and certified instructors.
          </p>

          {/* Branch Switch Tabs */}
          <div className="flex justify-center gap-3 mt-8">
            {instituteInfo.branches.map((b) => (
              <button
                key={b.id}
                onClick={() => setActiveBranchId(b.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-extrabold transition-all shadow-sm flex items-center gap-2 ${
                  activeBranchId === b.id
                    ? 'bg-blue-700 text-white shadow-blue-500/25 scale-105'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 text-[10px]">
                  Branch {b.code}
                </span>
                <span>{b.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Branch Cards Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {instituteInfo.branches.map((b) => (
            <div
              key={b.id}
              className={`rounded-3xl p-6 sm:p-8 border-2 transition-all flex flex-col justify-between ${
                activeBranchId === b.id
                  ? 'border-blue-600 bg-gradient-to-br from-blue-50/50 to-white shadow-xl ring-2 ring-blue-500/20'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 bg-blue-900 text-white font-mono font-bold text-xs rounded-lg">
                      CODE: {b.code}
                    </span>
                    <h3 className="font-display font-extrabold text-slate-900 text-lg">
                      {b.name}
                    </h3>
                  </div>
                  {b.isPrimary && (
                    <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[11px] font-bold rounded-full">
                      Primary Campus
                    </span>
                  )}
                </div>

                <div className="space-y-3.5 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-900">{b.address}</p>
                      <p className="text-slate-500">{b.city}, {b.state} – {b.pincode}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <div>
                      <span className="text-slate-500 text-xs">Direct Admission Desk:</span>
                      <p className="font-bold text-slate-900">
                        <a href={`tel:${b.phone.split('/')[0].replace(/\s+/g, '')}`} className="hover:text-blue-700">
                          {b.phone}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <span className="text-slate-500 text-xs">Lab & Class Timings:</span>
                      <p className="font-semibold text-slate-800">{b.timing}</p>
                    </div>
                  </div>
                </div>

                {/* Facilities List */}
                <div className="mt-6 pt-5 border-t border-slate-100">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Campus Facilities:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {b.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-1.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-3">
                <a
                  href={b.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>

                <button
                  onClick={() => onOpenAdmission({ branch: b.name })}
                  className="py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                >
                  Book Visit
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BranchLocations;

