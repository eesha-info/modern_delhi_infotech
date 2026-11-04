import React from 'react';
import { ArrowRight, Phone, MapPin } from 'lucide-react';
import { instituteInfo } from '../../data/mdiData';

const FinalCta = ({ onOpenAdmission }) => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] bg-brand-navyDark text-white px-6 py-12 sm:px-12 sm:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.45),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.2),transparent_50%)] pointer-events-none" />
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight leading-tight">
              Your computer career starts with one visit.
            </h2>
            <p className="mt-3 text-slate-300 text-base max-w-xl mx-auto lg:mx-0">
              Come for a free demo class, see the lab, and get course guidance from Sonu Sir — no obligation.
            </p>
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-slate-400">
              <MapPin className="w-4 h-4 text-amber-400" />
              Adarsh Nagar (Branch 2) &amp; SBI Road (Branch 1), Madhepura
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:items-end xl:justify-end">
            <button
              onClick={onOpenAdmission}
              className="px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-display font-bold rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 whitespace-nowrap"
            >
              Book a Free Demo
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`tel:${instituteInfo.contact.primaryPhone.replace(/\s+/g, '')}`}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              {instituteInfo.contact.primaryPhone}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FinalCta;
