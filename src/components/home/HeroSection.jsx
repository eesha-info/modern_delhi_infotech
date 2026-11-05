import React from 'react';
import { ArrowRight, Phone, MapPin, Clock } from 'lucide-react';
import { instituteInfo } from '../../data/mdiData';
import { useData } from '../../context/DataContext';

// Sort "07:00 AM – 08:00 AM" style slots by start time
const toMin = (t) => {
  const m = String(t || '').match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return 9999;
  let h = Number(m[1]) % 12;
  if (m[3].toUpperCase() === 'PM') h += 12;
  return h * 60 + Number(m[2]);
};

const HeroSection = ({ onOpenAdmission }) => {
  const { batches, courses, studentsInBatch } = useData();
  const { contact, stats, established } = instituteInfo;
  const phoneHref = `tel:${contact.primaryPhone.replace(/\s+/g, '')}`;

  // Live list of Theory batches with seats left — the "admission desk"
  const openBatches = batches
    .filter((b) => (b.type || 'Theory') === 'Theory')
    .map((b) => {
      const course = courses.find((c) => c.code === b.courseCode);
      const left = Math.max(0, Number(b.maxCapacity || 0) - studentsInBatch(b.id).length);
      return { ...b, course, left };
    })
    .sort((a, b) => toMin(a.timing) - toMin(b.timing) || a.days.localeCompare(b.days))
    .slice(0, 6);

  const facts = [
    { value: stats.studentsTrained, label: `students trained since ${established}` },
    { value: '1 PC', label: 'for every student, every class' },
    { value: '2', label: 'branches in Madhepura' },
  ];

  return (
    <section className="relative bg-[#f6f4ee] border-b border-[#e7e2d6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left: message */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px]">
              <span className="inline-flex items-center gap-2 font-semibold text-[#232f86]">
                <span className="w-6 h-0.5 bg-[#232f86]" />
                Madhepura, Bihar · Estd. {established}
              </span>
              <span className="rounded-full border border-amber-600/40 text-amber-800 bg-amber-50 px-3 py-0.5 font-semibold">
                Regd. Govt. of India
              </span>
            </div>

            <p className="mt-7 font-hindi text-xl sm:text-2xl font-semibold text-amber-700">
              कंप्यूटर सीखें — प्रैक्टिकल तरीके से
            </p>

            <h1 className="mt-2 font-display font-bold text-[#141a3d] text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] tracking-tight">
              Practical computer training that prepares you for{' '}
              <span className="relative inline-block">
                <span className="relative z-10">real jobs.</span>
                <span className="absolute left-0 right-0 bottom-1.5 h-3 sm:h-4 bg-amber-300/70 rounded-sm" aria-hidden="true" />
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              ADIT, ADCA, DCA, Tally with GST and Hindi–English typing — taught on your own computer,
              with 3 days theory and 3 days lab every week, under the personal guidance of Sonu Sir (BCA, MCA).
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={onOpenAdmission}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#232f86] hover:bg-[#1b2570] text-white font-semibold shadow-sm transition-colors"
              >
                Apply for Admission <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-[#141a3d]/20 hover:border-[#141a3d]/40 hover:bg-white text-[#141a3d] font-semibold transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-700" /> Call {contact.primaryPhone}
              </a>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 border-t border-[#e0dacb] pt-6 max-w-xl">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="font-display font-bold text-2xl sm:text-3xl text-[#141a3d]">{f.value}</dd>
                  <dd className="text-xs sm:text-[13px] text-slate-500 leading-snug mt-1">{f.label}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: admission desk with live batches */}
          <aside className="lg:col-span-5 bg-white rounded-2xl border border-[#e7e2d6] shadow-[0_1px_0_#e7e2d6,0_12px_32px_-12px_rgba(20,26,61,0.18)] overflow-hidden">
            <div className="px-6 pt-6 pb-4 border-b border-slate-100">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">Admission desk</p>
                  <h2 className="font-display font-bold text-xl text-[#141a3d] mt-1">Session 2026-27 batches</h2>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1 whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Admissions open
                </span>
              </div>
              <p className="text-[13px] text-slate-500 mt-2">1-hour theory classes · MWF or TTS · lab on the other 3 days</p>
            </div>

            <ul className="divide-y divide-slate-100">
              {openBatches.map((b) => (
                <li key={b.id} className="px-6 py-3.5 flex items-center gap-4">
                  <div className="w-20 flex-shrink-0">
                    <p className="text-sm font-bold text-[#141a3d]">{b.timing.split(' – ')[0]}</p>
                    <p className="text-[11px] font-semibold text-slate-400">{b.days}</p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-800">{b.courseCode}</p>
                    <p className="text-xs text-slate-500 truncate" title={b.course?.name}>{b.course?.duration ? `${b.course.duration} course` : b.name} · {b.branch}</p>
                  </div>
                  <span
                    className={`text-xs font-semibold whitespace-nowrap ${
                      b.left === 0 ? 'text-rose-600' : b.left <= 5 ? 'text-amber-700' : 'text-emerald-700'
                    }`}
                  >
                    {b.left === 0 ? 'Full' : `${b.left} seats left`}
                  </span>
                </li>
              ))}
            </ul>

            <div className="px-6 py-5 bg-[#faf8f3] border-t border-[#efeadf]">
              <div className="space-y-1.5 text-[13px] text-slate-600">
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-rose-500" /> Adarsh Nagar (Branch 2) · SBI Road (Branch 1)</p>
                <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-slate-400" /> Mon – Sat, 7:00 AM – 7:00 PM</p>
              </div>
              <button
                onClick={onOpenAdmission}
                className="mt-4 w-full inline-flex items-center justify-center gap-2 py-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-bold transition-colors"
              >
                Book a seat / free demo class <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
