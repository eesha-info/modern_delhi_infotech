import React, { useState } from 'react';
import { X, Send, CheckCircle2, Phone, Sparkles } from 'lucide-react';
import { initialCourses, instituteInfo } from '../../data/mdiData';
import { useData } from '../../context/DataContext';
import confetti from 'canvas-confetti';
import { asset } from '../../utils/asset';

const AdmissionModal = ({ initialCourse = null, onClose }) => {
  const { addEnquiry } = useData();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    course: initialCourse ? `${initialCourse.code} (${initialCourse.duration})` : 'ADIT (12 Months)',
    branch: 'Branch 2 (Adarsh Nagar)',
    preferredTiming: '08:00 AM – 09:30 AM (Batch 1)',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) return;

    addEnquiry(formData);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-brand-navyDark text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <img
              src={asset('/mdi-real-logo-cropped.png')}
              alt="Logo"
              className="w-12 h-12 object-contain rounded-full bg-white p-0.5 shadow-md flex-shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-[10px] tracking-wider uppercase">
                  Online Admission
                </span>
                <span className="text-xs text-blue-200">Session 2026-27</span>
              </div>
              <h3 className="text-lg sm:text-xl font-display font-extrabold text-white mt-0.5">
                Modern Delhi Infotech
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            Modern Delhi Infotech · Direct Mentorship by Sonu Sir (BCA, MCA)
          </p>
        </div>

        {/* Modal Content */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            
            <h4 className="text-xl font-bold text-slate-900">
              Enquiry Submitted Successfully!
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-slate-900">{formData.name}</strong>. Your enquiry for <strong className="text-blue-700">{formData.course}</strong> at {formData.branch} has been received. Our admission counselor or Sonu Sir will call you shortly on <strong>{formData.mobile}</strong>.
            </p>

            <div className="p-4 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-blue-900">
              <p className="font-semibold">Need instant admission guidance?</p>
              <a
                href={`tel:${instituteInfo.contact.primaryPhone.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-1.5 font-bold text-blue-700 mt-1 hover:underline"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                Call Sonu Sir Directly: {instituteInfo.contact.primaryPhone}
              </a>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Done & Return to Website
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Full Name of Student *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Rajeev Kumar"
                className="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none text-slate-900 font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="e.g. 9431258394"
                  className="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none text-slate-900 font-medium"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@gmail.com"
                  className="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none text-slate-900 font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Select Course *
                </label>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none text-slate-900 font-medium bg-white"
                >
                  {initialCourses.map((c) => (
                    <option key={c.id} value={`${c.code} (${c.duration})`}>
                      {c.code} — {c.name.split('(')[0]} ({c.duration})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Preferred Branch *
                </label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none text-slate-900 font-medium bg-white"
                >
                  <option value="Branch 2 (Adarsh Nagar)">Branch 2 (Adarsh Nagar - Main Lab)</option>
                  <option value="Branch 1 (SBI Road)">Main Branch (SBI Road)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Preferred Batch Timing
              </label>
              <select
                value={formData.preferredTiming}
                onChange={(e) => setFormData({ ...formData, preferredTiming: e.target.value })}
                className="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none text-slate-900 font-medium bg-white"
              >
                <option value="08:00 AM – 09:30 AM (Batch 1)">08:00 AM – 09:30 AM (Morning Batch 1)</option>
                <option value="09:30 AM – 11:00 AM (Batch 2)">09:30 AM – 11:00 AM (Morning Batch 2)</option>
                <option value="11:00 AM – 12:30 PM (Batch 3)">11:00 AM – 12:30 PM (Noon)</option>
                <option value="02:00 PM – 03:30 PM (Batch 4)">02:00 PM – 03:30 PM (Afternoon)</option>
                <option value="03:30 PM – 05:00 PM (Batch 5)">03:30 PM – 05:00 PM (Evening)</option>
                <option value="05:00 PM – 06:30 PM (Batch 6)">05:00 PM – 06:30 PM (Typing Special)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Any Query or Message (Optional)
              </label>
              <textarea
                rows={2}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Ask about fee discount, batch start date, or syllabus..."
                className="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none text-slate-900 font-medium resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Submit Admission Enquiry</span>
              </button>
            </div>

            <p className="text-[11px] text-slate-400 text-center">
              * Your details are secure with Modern Delhi Infotech. We never spam.
            </p>
          </form>
        )}

      </div>
    </div>
  );
};

export default AdmissionModal;

