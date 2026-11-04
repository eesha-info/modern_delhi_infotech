import React from 'react';
import { X, Clock, Award, Briefcase, CheckCircle, BookOpen, ArrowRight, ShieldCheck, Calendar } from 'lucide-react';

const CourseDetailModal = ({ course, onClose, onEnroll }) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-brand-navyDark text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 bg-amber-500 text-slate-950 font-extrabold text-xs rounded-full">
              {course.code}
            </span>
            <span className="px-3 py-1 bg-white/15 text-white font-medium text-xs rounded-full">
              {course.category}
            </span>
            {course.badge && (
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 text-xs font-semibold rounded-full">
                {course.badge}
              </span>
            )}
          </div>

          <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            {course.name}
          </h3>
          <p className="text-amber-300 font-semibold text-sm mt-1">
            {course.hindiName}
          </p>

          <div className="mt-4 flex flex-wrap gap-3 text-xs font-semibold text-slate-200">
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Duration: {course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>Govt. Recognized Certification</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-xl">
              <Calendar className="w-4 h-4 text-blue-300" />
              <span>Session: 2026-27</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-700 text-sm">
          
          {/* Overview */}
          <div>
            <h4 className="font-bold text-slate-900 text-base mb-2">Program Overview</h4>
            <p className="text-slate-600 leading-relaxed">{course.description}</p>
          </div>

          {/* Eligibility & Careers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Minimum Eligibility
              </h5>
              <p className="text-slate-700 font-medium">{course.eligibility}</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                Employment Opportunities
              </h5>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {course.careers.map((job) => (
                  <span key={job} className="text-xs bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-700 font-medium">
                    {job}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Module by Module Curriculum */}
          <div>
            <h4 className="font-bold text-slate-900 text-base mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Detailed Module Syllabus
            </h4>
            <div className="space-y-3">
              {course.syllabus?.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                      {item.module}
                    </span>
                    <span className="text-sm font-bold text-slate-900">{item.title}</span>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600 mt-2">
                    {item.topics.map((t, tidx) => (
                      <li key={tidx} className="flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer (No public prices exposed) */}
        <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            <span className="font-bold text-slate-900 block">Modern Delhi Infotech · Madhepura</span>
            <span>Batch Timings: Morning &amp; Evening Batches Available</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEnroll(course);
              }}
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <span>Enquire for {course.code}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CourseDetailModal;
