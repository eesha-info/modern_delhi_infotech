import React, { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';
import { galleryImages } from '../../data/mdiData';

// Flat illustration of a computer lab: 3 rows of PCs, one highlighted as "your PC".
const LabIllustration = () => {
  const rows = [
    { y: 34, scale: 0.78, count: 5 },
    { y: 86, scale: 0.9, count: 4 },
    { y: 146, scale: 1, count: 4 },
  ];
  return (
    <svg viewBox="0 0 320 220" className="w-full h-auto" role="img" aria-label="Illustration of a computer lab with one PC per student">
      {/* back wall + whiteboard */}
      <rect x="0" y="0" width="320" height="220" rx="18" fill="#101a3c" />
      <rect x="96" y="10" width="128" height="16" rx="3" fill="#1c2a5c" />
      <rect x="104" y="16" width="56" height="3" rx="1.5" fill="#f5c542" opacity="0.8" />
      <rect x="166" y="16" width="34" height="3" rx="1.5" fill="#6b7ad6" />
      {rows.map((r, ri) => {
        const w = 52 * r.scale;
        const gap = (300 - r.count * w) / (r.count + 1);
        return (
          <g key={ri}>
            {/* desk */}
            <rect x="10" y={r.y + 30 * r.scale} width="300" height={6 * r.scale} rx="2" fill="#24346e" />
            {Array.from({ length: r.count }).map((_, i) => {
              const x = 10 + gap + i * (w + gap);
              const yours = ri === 2 && i === 1;
              return (
                <g key={i}>
                  {/* monitor */}
                  <rect x={x} y={r.y} width={w} height={26 * r.scale} rx={3} fill={yours ? '#f5c542' : '#2f418a'} />
                  <rect x={x + 3} y={r.y + 3} width={w - 6} height={20 * r.scale - 2} rx={2} fill={yours ? '#fff4cf' : '#3d54b0'} />
                  <rect x={x + 6} y={r.y + 7} width={(w - 12) * 0.6} height={2.5 * r.scale} rx="1" fill={yours ? '#c98f00' : '#7f93ec'} />
                  <rect x={x + 6} y={r.y + 12 * r.scale + 2} width={(w - 12) * 0.85} height={2.5 * r.scale} rx="1" fill={yours ? '#e0b02a' : '#5c71cf'} opacity="0.9" />
                  {/* stand + keyboard */}
                  <rect x={x + w / 2 - 3} y={r.y + 26 * r.scale} width="6" height={4 * r.scale} fill={yours ? '#f5c542' : '#2f418a'} />
                  <rect x={x + w * 0.15} y={r.y + 37 * r.scale} width={w * 0.7} height={4 * r.scale} rx="1.5" fill="#33447f" />
                  {/* student head */}
                  <circle cx={x + w / 2} cy={r.y + 52 * r.scale} r={7 * r.scale} fill={yours ? '#f5c542' : '#3a4a86'} />
                </g>
              );
            })}
          </g>
        );
      })}
      {/* "Your PC" tag */}
      <g>
        <rect x="104" y="196" width="62" height="16" rx="8" fill="#f5c542" />
        <text x="135" y="207.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#141a3d" fontFamily="Inter, sans-serif">YOUR PC</text>
      </g>
    </svg>
  );
};

// Photo gallery. To add photos: put files in /public/gallery and list them in `galleryImages` (mdiData.js).
const GallerySection = ({ onOpenAdmission }) => {
  const [open, setOpen] = useState(null);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="section-eyebrow">Photo Gallery</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-3 tracking-tight">
            Life at Modern Delhi Infotech
          </h2>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Our labs, our team and our students in Madhepura.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((img) => (
            <button
              key={img.src}
              onClick={() => setOpen(img)}
              className="group relative rounded-3xl overflow-hidden bg-white border border-slate-200 aspect-[4/5] text-left"
            >
              <img src={img.src} alt={img.caption} loading="lazy" className={`w-full h-full ${img.fit || 'object-cover'} group-hover:scale-105 transition-transform duration-500`} />
              <span className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-950/80 to-transparent text-white text-sm font-semibold">
                {img.caption}
              </span>
            </button>
          ))}

          <div className="rounded-3xl bg-brand-navyDark text-white p-6 sm:p-7 flex flex-col justify-between gap-6 aspect-auto lg:aspect-[4/5] sm:col-span-2 lg:col-span-1">
            <div>
              <LabIllustration />
              <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold">
                <span className="rounded-full bg-white/10 px-2.5 py-1">80+ computers</span>
                <span className="rounded-full bg-white/10 px-2.5 py-1">1 PC per student</span>
                <span className="rounded-full bg-white/10 px-2.5 py-1">Power backup</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-display font-extrabold leading-tight">See the lab in person</h3>
              <p className="mt-2 text-sm text-slate-300">
                Visit Branch 2 (Adarsh Nagar) or Branch 1 (SBI Road) and try a free demo class on your own PC.
              </p>
              <button onClick={onOpenAdmission} className="mt-6 inline-flex items-center gap-2 px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-sm">
                Book a Free Demo <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[70] bg-slate-950/90 flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <button className="absolute top-5 right-5 p-2 text-white/80 hover:text-white" aria-label="Close photo">
            <X className="w-7 h-7" />
          </button>
          <figure onClick={(e) => e.stopPropagation()} className="max-w-3xl w-full">
            <img src={open.src} alt={open.caption} className="max-h-[80vh] w-auto mx-auto rounded-xl" />
            <figcaption className="text-center text-white/90 text-sm mt-3">{open.caption}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
