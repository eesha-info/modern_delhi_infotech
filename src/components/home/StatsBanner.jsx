import React from 'react';
import { Users, Monitor, Award, Building, BookOpen } from 'lucide-react';
import { instituteInfo } from '../../data/mdiData';

const StatsBanner = () => {
  const stats = [
    { icon: Users, value: instituteInfo.stats.studentsTrained, label: 'Students trained', subtext: 'Since 2017' },
    { icon: Monitor, value: instituteInfo.stats.pcsInLab, label: 'Lab computers', subtext: 'One PC per student' },
    { icon: Award, value: '100%', label: 'Govt. recognised', subtext: 'Valid across India' },
    { icon: Building, value: '2', label: 'Branches', subtext: 'Adarsh Nagar & SBI Road' },
    { icon: BookOpen, value: '10+', label: 'Courses', subtext: 'Basic to advanced IT' },
  ];

  return (
    <section className="relative z-20 -mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-xl shadow-slate-900/[0.08] border border-slate-200/80 px-6 py-8 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className={`flex flex-col sm:flex-row items-center text-center sm:text-left gap-2 sm:gap-3 md:justify-center ${i === stats.length - 1 ? 'col-span-2 md:col-span-1 sm:justify-center' : ''}`}
              >
                <span className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </span>
                <div className="min-w-0">
                  <div className="text-2xl font-display font-extrabold text-slate-900 leading-none tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-xs font-bold text-slate-700 mt-1">{s.label}</div>
                  <div className="text-[11px] text-slate-500 sm:truncate">{s.subtext}</div>
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
