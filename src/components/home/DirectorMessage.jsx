import React from 'react';
import { Award, CheckCircle, Phone, Mail, GraduationCap, Quote, Sparkles, ArrowRight } from 'lucide-react';
import { instituteInfo } from '../../data/mdiData';

const DirectorMessage = ({ onOpenAdmission }) => {
  return (
    <section id="director" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="section-eyebrow">
            Leadership &amp; Mentorship
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-3 tracking-tight">
            Director's Desk
          </h2>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Personal mentorship and practical career guidance from our founder, Sonu Kumar (BCA, MCA).
          </p>
        </div>

        {/* Executive Profile Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Director Visual & Credentials */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative">
                {/* Profile Badge */}
                <div className="w-56 h-72 sm:w-64 sm:h-80 rounded-3xl p-1 bg-gradient-to-tr from-blue-700 via-indigo-600 to-amber-500 shadow-xl">
                  <img
                    src="/sonu-kumar.jpg"
                    alt="Sonu Kumar (Sonu Sir), Founder & Director, Modern Delhi Infotech"
                    className="w-full h-full object-cover object-top rounded-[22px]"
                    loading="lazy"
                  />
                </div>

                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 px-3.5 py-1 rounded-full font-bold text-xs tracking-wider uppercase shadow whitespace-nowrap">
                  Founder &amp; Director
                </div>
              </div>

              {/* Bio summary */}
              <div className="mt-7 space-y-1">
                <h4 className="text-lg font-bold text-slate-900">Sonu Kumar (Sonu Sir)</h4>
                <p className="text-blue-700 text-xs font-bold">Chief Technical Mentor · Estd. 2017</p>
                <p className="text-slate-500 text-xs">Modern Delhi Infotech, Madhepura (Branch 2 &amp; 1)</p>
              </div>

              {/* Direct Call Button */}
              <a
                href={`tel:${instituteInfo.director.phone.replace(/\s+/g, '')}`}
                className="mt-4 inline-flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs px-4 py-2.5 rounded-xl border border-emerald-200 transition-colors shadow-sm"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call Sonu Sir: {instituteInfo.director.phone}</span>
              </a>
            </div>

            {/* Right: Vision & Director Message */}
            <div className="lg:col-span-7 space-y-4">
              
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 leading-snug">
                "Practical Computer Education is the Gateway to Youth Employment."
              </h3>

              <div className="relative pl-5 border-l-2 border-amber-500 space-y-3 text-slate-600 text-sm leading-relaxed">
                <p>
                  "When we founded Modern Delhi Infotech in 2017 in Madhepura, students were often taught computer theories on blackboards without real practical hands-on time."
                </p>
                <p>
                  "We changed that completely. At Modern Delhi Infotech, every single student gets their own personal PC in every class. Whether learning MS Excel formulas, preparing for Bihar Beltron typing speed exams, or filing GST tax returns in Tally Prime, you learn by doing."
                </p>
                <p className="text-slate-800 font-semibold">
                  "My personal promise: We guide each student personally from their very first lesson to their final job exam and interview."
                </p>
              </div>

              {/* Key Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Individual 1:1 Attention</span>
                    <span className="text-slate-500">Dedicated machine time and small batch size.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Bilingual Instruction</span>
                    <span className="text-slate-500">Concepts explained clearly in Hindi &amp; English.</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={onOpenAdmission}
                  className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2"
                >
                  <span>Book Free Career Counseling with Sonu Sir</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default DirectorMessage;
