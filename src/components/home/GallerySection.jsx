import React, { useState } from 'react';
import { X, ArrowRight, Camera } from 'lucide-react';
import { galleryImages } from '../../data/mdiData';

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

          <div className="rounded-3xl bg-brand-navyDark text-white p-8 flex flex-col justify-between aspect-[4/5] sm:col-span-2 lg:col-span-1">
            <Camera className="w-10 h-10 text-amber-400" />
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
