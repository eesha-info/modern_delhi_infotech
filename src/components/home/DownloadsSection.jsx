import React from 'react';
import { FileText, BookOpen, Award, Receipt, ArrowRight } from 'lucide-react';

// Student downloads hub. Each card leads to where that document is produced in the app.
const DownloadsSection = ({ onOpenAdmission, onOpenLogin, onOpenVerify }) => {
  const items = [
    {
      icon: FileText,
      title: 'Admission Form',
      text: 'Fill the admission form online. Our counsellor will call you back to confirm your seat.',
      cta: 'Open Admission Form',
      onClick: onOpenAdmission,
      tone: 'bg-blue-50 text-blue-800',
    },
    {
      icon: BookOpen,
      title: 'Course Syllabus',
      text: 'View the complete module-wise syllabus for ADIT, ADCA, DCA, Tally, Typing and more.',
      cta: 'View Syllabus',
      onClick: () => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' }),
      tone: 'bg-emerald-50 text-emerald-800',
    },
    {
      icon: Award,
      title: 'Certificate',
      text: 'Students can print their issued certificate from the Student Portal. Employers can verify it online.',
      cta: 'Verify Certificate',
      onClick: onOpenVerify,
      tone: 'bg-amber-50 text-amber-800',
    },
    {
      icon: Receipt,
      title: 'Fee Receipt',
      text: 'Download your GST fee invoice and installment receipts any time from your Student Portal.',
      cta: 'Student Login',
      onClick: onOpenLogin,
      tone: 'bg-violet-50 text-violet-800',
    },
  ];

  return (
    <section id="downloads" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="section-eyebrow">Student Downloads</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-3 tracking-tight">
            Forms, Syllabus &amp; Certificates
          </h2>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Everything you need before and after admission, in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div key={it.title} className="rounded-3xl border border-slate-200 bg-white p-6 flex flex-col hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all">
                <span className={`w-12 h-12 rounded-2xl flex items-center justify-center ${it.tone}`}>
                  <Icon className="w-6 h-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{it.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed flex-1">{it.text}</p>
                <button onClick={it.onClick} className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-blue-800 hover:gap-2.5 transition-all">
                  {it.cta}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DownloadsSection;
