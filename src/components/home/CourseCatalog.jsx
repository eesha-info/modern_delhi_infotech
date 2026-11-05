import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Clock, Award, CheckCircle2, ChevronRight, Sparkles, Info, Users, BookOpen } from 'lucide-react';
import CourseDetailModal from './CourseDetailModal';

const CourseCatalog = ({ onOpenAdmission }) => {
  const { courses: initialCourses } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState(null);

  const categories = ['All', 'Diploma', 'Accounting', 'Skill Certification', 'Programming', 'Design'];

  const filteredCourses = selectedCategory === 'All'
    ? initialCourses
    : initialCourses.filter(c => c.category === selectedCategory);

  return (
    <section id="courses" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="section-eyebrow">Job-Oriented Training Programs</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
            Courses Offered at Modern Delhi Infotech
          </h2>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Each program combines 100% practical computer lab training, expert guidance by Sonu Sir, and government-recognized diplomas valid across India.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
                  selectedCategory === cat
                    ? 'bg-blue-700 text-white shadow-blue-500/25 scale-105'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Top Banner */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-blue-900 to-indigo-900 text-white font-extrabold text-sm rounded-xl tracking-wider shadow-sm">
                    {course.code}
                  </span>
                  {course.badge && (
                    <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-amber-50 text-amber-700 border border-amber-300/60">
                      {course.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug line-clamp-2 min-h-[3.1rem]">
                  {course.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5 line-clamp-1">
                  {course.hindiName}
                </p>

                {/* Duration & Level pill */}
                <div className="flex items-center gap-3 mt-3 text-xs text-slate-600 font-semibold">
                  <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>Duration: {course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{course.level}</span>
                  </div>
                </div>

                {/* Description snippet */}
                <p className="text-xs text-slate-600 mt-4 line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                {/* Highlights */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                    Key Topics Covered:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {course.highlights.slice(0, 4).map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                        <span className="line-clamp-1">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Bottom: Batch info & Actions (NO COURSE PRICE EXPOSED) */}
              <div className="p-6 pt-4 bg-slate-50/70 border-t border-slate-100 mt-2">
                <div className="flex items-center justify-between mb-4 text-xs">
                  <span className="font-semibold text-slate-600 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span>Eligibility: {course.eligibility.split('(')[0]}</span>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    1:1 PC Guaranteed
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedCourseForDetail(course)}
                    className="py-2.5 px-3 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5 text-slate-500" />
                    <span>View Syllabus</span>
                  </button>
                  <button
                    onClick={() => onOpenAdmission(course)}
                    className="py-2.5 px-3 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1"
                  >
                    <span>Enquire / Enroll</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Course Detail Modal */}
      {selectedCourseForDetail && (
        <CourseDetailModal
          course={selectedCourseForDetail}
          onClose={() => setSelectedCourseForDetail(null)}
          onEnroll={(c) => {
            setSelectedCourseForDetail(null);
            onOpenAdmission(c);
          }}
        />
      )}
    </section>
  );
};

export default CourseCatalog;
