import React from 'react';
import { Award, ArrowRight, Phone, Star, Monitor, ShieldCheck, Keyboard } from 'lucide-react';
import { instituteInfo } from '../../data/mdiData';
import { asset } from '../../utils/asset';

const popularPrograms = ['ADIT', 'ADCA', 'DCA', 'Tally Prime + GST', 'Hindi & English Typing'];

const HeroSection = ({ onOpenAdmission }) => {
  const phoneHref = `tel:${instituteInfo.contact.primaryPhone.replace(/\s+/g, '')}`;

  return (
    <section className="relative overflow-hidden bg-brand-navyDark text-white">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.35),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.15),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-28 lg:pt-20 lg:pb-36">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">

          {/* Left: message + actions */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/[0.08] border border-white/15 pl-2 pr-3.5 py-1.5 rounded-full text-xs font-semibold">
              <span className="inline-flex items-center gap-1 bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide">
                <Award className="w-3 h-3" />
                Govt. Regd.
              </span>
              <span className="text-slate-200">Admissions open · Session 2026-27</span>
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[3.5rem] font-display font-extrabold tracking-tight leading-[1.1]">
              Learn computers the{' '}
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                practical way
              </span>
              , right here in Madhepura.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Government-recognised diplomas, your own PC in every class, and personal guidance from
              Sonu Sir (BCA, MCA) — from your first lesson to your Beltron, SSC or job interview.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onOpenAdmission}
                className="w-full sm:w-auto px-7 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-display font-bold rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:scale-95"
              >
                Apply for Admission
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#courses"
                className="w-full sm:w-auto px-7 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/20 transition-colors text-center"
              >
                Explore Courses
              </a>
            </div>

            <a
              href={phoneHref}
              className="mt-4 inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              Or call Sonu Sir: <span className="font-bold text-white">{instituteInfo.contact.primaryPhone}</span>
            </a>

            {/* Social proof */}
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center">
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                </span>
                <div className="text-left">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="ml-1.5 text-sm font-bold">4.9</span>
                  </div>
                  <p className="text-xs text-slate-400">{instituteInfo.stats.studentsTrained} students trained</p>
                </div>
              </div>
              <div className="hidden sm:block w-px h-10 bg-white/10" />
              <div className="text-left">
                <p className="text-sm font-bold">Estd. 2017</p>
                <p className="text-xs text-slate-400">2 branches in Madhepura</p>
              </div>
            </div>
          </div>

          {/* Right: real institute poster with floating highlights */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm lg:max-w-md">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/40 to-amber-400/30 rounded-[2rem] blur-2xl" />
              <div className="relative rounded-3xl bg-white p-2 shadow-2xl rotate-[1.5deg] hover:rotate-0 transition-transform duration-500">
                <img
                  src={asset('/mdi-banner.png')}
                  alt="Modern Delhi Infotech Branch 2 — ADIT, ADCA, DCA, Tally and Hindi + English Typing courses by Sonu Sir"
                  className="w-full h-auto rounded-2xl"
                  loading="eager"
                />
              </div>

              <div className="absolute -left-4 sm:-left-10 top-10 bg-white text-slate-900 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Monitor className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-sm font-extrabold leading-tight">1 Student = 1 PC</p>
                  <p className="text-[11px] text-slate-500">{instituteInfo.stats.pcsInLab} computers in lab</p>
                </div>
              </div>

              <div className="absolute -right-3 sm:-right-8 bottom-24 bg-white text-slate-900 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Keyboard className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-sm font-extrabold leading-tight">Beltron Typing Prep</p>
                  <p className="text-[11px] text-slate-500">KrutiDev &amp; Mangal</p>
                </div>
              </div>

              <div className="absolute left-6 -bottom-5 bg-slate-950 text-white rounded-2xl px-4 py-2.5 shadow-xl border border-white/10 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold">Certificates verifiable online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Popular programs */}
        <div className="mt-16 flex flex-wrap items-center justify-center lg:justify-start gap-2">
          <span className="text-xs text-slate-400 font-medium mr-1">Popular programs:</span>
          {popularPrograms.map((c) => (
            <a
              key={c}
              href="#courses"
              className="px-3 py-1 text-xs font-semibold rounded-full bg-white/5 border border-white/15 text-slate-200 hover:bg-white/15 hover:text-white transition-colors"
            >
              {c}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
