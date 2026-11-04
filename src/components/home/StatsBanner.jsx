import React from 'react';
import { Users, Monitor, Award, Building, CheckCircle2, BookOpen } from 'lucide-react';
import { instituteInfo } from '../../data/mdiData';

const StatsBanner = () => {
  const stats = [
    {
      icon: Users,
      value: instituteInfo.stats.studentsTrained,
      label: "Students Trained",
      subtext: "Since 2017 in Madhepura"
    },
    {
      icon: Monitor,
      value: "80+ PCs",
      label: "Modern Computer Labs",
      subtext: "1-Student-1-PC Guarantee"
    },
    {
      icon: Award,
      value: "100% Govt.",
      label: "Recognized Certification",
      subtext: "Valid across India"
    },
    {
      icon: Building,
      value: "2 Branches",
      label: "In Madhepura City",
      subtext: "Adarsh Nagar & SBI Road"
    },
    {
      icon: BookOpen,
      value: "10+ Courses",
      label: "Diploma & Certification",
      subtext: "Basic to Advanced IT"
    }
  ];

  return (
    <section className="relative z-20 -mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-6 md:p-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          {stats.map((s, index) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`flex flex-col items-center text-center ${
                  index > 0 ? 'pt-4 md:pt-0 md:pl-4' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 tracking-tight">
                  {s.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-slate-700 mt-0.5">
                  {s.label}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {s.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsBanner;
