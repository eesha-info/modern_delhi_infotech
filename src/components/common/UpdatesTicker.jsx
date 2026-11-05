import React, { useEffect, useState } from 'react';
import { Megaphone, X, CalendarDays } from 'lucide-react';
import { useData } from '../../context/DataContext';

const parseDate = (s) => {
  const d = new Date(String(s || '').replace(/-/g, ' '));
  return Number.isNaN(d.getTime()) ? 0 : d.getTime();
};

// Scrolling "Latest Updates" strip under the menu bar. Items come from the
// admin's Latest Updates page; clicking an item opens its full text.
const UpdatesTicker = () => {
  const { notices } = useData();
  const [open, setOpen] = useState(null);

  const items = notices
    .filter((n) => n.visible !== false)
    .sort((a, b) => Number(!!b.important) - Number(!!a.important) || parseDate(b.date) - parseDate(a.date));

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  if (items.length === 0) return null;

  // ~9s per item keeps the reading speed comfortable whatever the count
  const duration = `${Math.max(25, items.length * 9)}s`;

  const Item = ({ n, hidden }) => (
    <button
      type="button"
      onClick={() => setOpen(n)}
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden || undefined}
      className="group inline-flex items-center gap-2.5 px-6 py-2.5 text-sm whitespace-nowrap focus:outline-none focus-visible:underline"
    >
      {n.important && (
        <span className="rounded bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5">New</span>
      )}
      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">{n.category}</span>
      <span className="font-semibold text-slate-800 group-hover:text-[#232f86]">{n.title}</span>
      <span className="text-xs text-slate-400">{n.date}</span>
      <span className="ml-4 w-1.5 h-1.5 rounded-full bg-amber-400" aria-hidden="true" />
    </button>
  );

  return (
    <>
      <div className="relative z-20 bg-amber-50 border-b border-amber-200/80">
        <div className="max-w-7xl mx-auto flex items-stretch">
          <span className="flex-shrink-0 inline-flex items-center gap-2 bg-[#232f86] text-white text-xs font-bold uppercase tracking-wider pl-4 pr-5 sm:pl-6 [clip-path:polygon(0_0,100%_0,calc(100%-10px)_100%,0_100%)]">
            <Megaphone className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Latest Updates</span>
            <span className="sm:hidden">Updates</span>
          </span>
          <div
            className="marquee relative flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)]"
            role="region"
            aria-label="Latest updates"
          >
            <div className="marquee-track flex w-max" style={{ '--marquee-duration': duration }}>
              {items.map((n) => <Item key={n.id} n={n} />)}
              {items.map((n) => <Item key={`dup-${n.id}`} n={n} hidden />)}
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={() => setOpen(null)} role="dialog" aria-modal="true" aria-labelledby="update-title">
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-start justify-between gap-4 px-6 py-5 bg-[#232f86] text-white">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-300">{open.category}</p>
                <h2 id="update-title" className="font-display font-bold text-lg leading-snug mt-1">{open.title}</h2>
              </div>
              <button onClick={() => setOpen(null)} className="p-1.5 rounded-lg hover:bg-white/15" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5">
              <p className="flex items-center gap-2 text-xs text-slate-500"><CalendarDays className="w-4 h-4" /> {open.date}</p>
              <p className="mt-3 text-sm text-slate-700 leading-relaxed whitespace-pre-line">{open.content}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdatesTicker;
