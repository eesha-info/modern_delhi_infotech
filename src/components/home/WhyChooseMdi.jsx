import React from 'react';
import { Monitor, Award, Keyboard, Zap, Receipt, ShieldCheck, HeartHandshake, Check } from 'lucide-react';

const WhyChooseMdi = () => {
  const reasons = [
    {
      icon: Monitor,
      title: "1-Student-1-PC Policy",
      description: "No screen sharing or waiting in line. Every enrolled student gets their dedicated personal computer for the full duration of practical lab sessions.",
      color: "from-blue-600 to-indigo-600"
    },
    {
      icon: Award,
      title: "Govt. of India Registered",
      description: "Our institute operates under registered government authorization. Certificates and marksheets carry official verification and QR codes recognized for public and private recruitments.",
      color: "from-amber-500 to-yellow-600"
    },
    {
      icon: Keyboard,
      title: "Special Hindi & English Typing Lab",
      description: "Specially equipped with ergonomic keyboards and exam-simulation software for Bihar Beltron, BSSC, Civil Court, and SSC typing tests (KrutiDev & Mangal fonts).",
      color: "from-emerald-600 to-teal-600"
    },
    {
      icon: Receipt,
      title: "Flexible Installments & GST Invoices",
      description: "Affordable fee structure with official computer-generated GST tax receipts and convenient installment plans. No unexpected or hidden charges.",
      color: "from-purple-600 to-indigo-600"
    },
    {
      icon: Zap,
      title: "Full Generator & Inverter Backup",
      description: "Continuous power backup and high-speed fiber internet in all classrooms so students' practical typing and coding sessions are never interrupted.",
      color: "from-rose-600 to-pink-600"
    },
    {
      icon: HeartHandshake,
      title: "Direct Mentorship by Sonu Sir",
      description: "Benefit directly from the vast experience of Sonu Kumar (BCA, MCA) with doubt-clearing sessions, career guidance, and interview readiness.",
      color: "from-cyan-600 to-blue-600"
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-white border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
            The Modern Delhi Infotech Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-3 tracking-tight">
            Why Students & Parents in Madhepura Trust Us
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            We prioritize real practical skill, individual student attention, and honest education over mere certificate printing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.title}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${r.color} text-white flex items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {r.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-blue-700">
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span>Standard at Both Branches</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseMdi;

