import React from 'react';
import { Star, Quote, Award, CheckCircle } from 'lucide-react';
import { studentTestimonials } from '../../data/mdiData';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="section-eyebrow">
            Student Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-3 tracking-tight">
            Hear from Students Placed in Jobs & Govt. Exams
          </h2>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Real feedback from graduates who studied at Modern Delhi Infotech under Sonu Sir's direct mentorship.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {studentTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <Quote className="w-8 h-8 text-blue-200 mb-2" />
                <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-3">
                <span className={`w-11 h-11 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-bold text-white ${
                  ['bg-blue-600', 'bg-emerald-600', 'bg-amber-500'][idx % 3]
                }`}>
                  {t.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                  <p className="text-[11px] text-blue-700 font-semibold">{t.course} · Batch {t.batch}</p>
                  <p className="text-[11px] text-emerald-700 font-bold mt-0.5 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    {t.placement}
                  </p>
                </div>
                <span className="self-start text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium whitespace-nowrap">
                  {t.branch.split(',')[0]}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;

