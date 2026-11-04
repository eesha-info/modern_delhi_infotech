import React, { useState } from 'react';
import { X, ShieldCheck, GraduationCap, Lock, Mail, User, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const LoginModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('student'); // 'student' | 'admin'
  const [studentIdentifier, setStudentIdentifier] = useState('MDI-B2-456');
  const [studentPassword, setStudentPassword] = useState('123456');
  
  const [adminEmail, setAdminEmail] = useState('admin@moderndelhiinfotech.com');
  const [adminPassword, setAdminPassword] = useState('admin123');

  const [error, setError] = useState('');
  const { loginAsAdmin, loginAsStudent } = useAuth();
  const { students } = useData();

  if (!isOpen) return null;

  const handleStudentSubmit = (e) => {
    e.preventDefault();
    setError('');

    const query = studentIdentifier.trim().toLowerCase();
    const found = students.find(
      s => s.regNo.toLowerCase() === query ||
           s.rollNo.toLowerCase() === query ||
           s.mobile.includes(query) ||
           (s.email && s.email.toLowerCase() === query)
    );

    if (found) {
      loginAsStudent(found);
      onClose();
    } else {
      setError(`No student found with Registration/Mobile: "${studentIdentifier}". Try demo ID: MDI-B2-456`);
    }
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (adminEmail && adminPassword) {
      loginAsAdmin(adminEmail);
      onClose();
    } else {
      setError('Please provide admin credentials');
    }
  };

  // 1-Click Fast Demo Logins
  const handleDemoAdmin = () => {
    loginAsAdmin('admin@moderndelhiinfotech.com');
    onClose();
  };

  const handleDemoStudent = () => {
    // Log in as Rajeev Kumar (featured in real invoice MDI-B2-456)
    const rajeev = students.find(s => s.regNo === 'MDI-B2-456') || students[0];
    loginAsStudent(rajeev);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-brand-navyDark text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            <img
              src="/mdi-real-logo-cropped.png"
              alt="Logo"
              className="w-12 h-12 object-contain rounded-full bg-white p-0.5 shadow-md flex-shrink-0"
            />
            <div>
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
                MODERN DELHI INFOTECH
              </span>
              <span className="text-xs text-blue-200">Official Student &amp; Staff Portal</span>
            </div>
          </div>

          <h3 className="text-2xl font-display font-extrabold text-white">
            Sign In to Your Account
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Access your personalized student portal or administrative dashboard.
          </p>

          {/* Role Toggle Tabs */}
          <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-white/10 rounded-2xl backdrop-blur-md">
            <button
              type="button"
              onClick={() => { setActiveTab('student'); setError(''); }}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'student'
                  ? 'bg-white text-blue-950 shadow-md font-extrabold'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>Student Portal</span>
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('admin'); setError(''); }}
              className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'admin'
                  ? 'bg-white text-blue-950 shadow-md font-extrabold'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Admin / Director</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6">
          
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
              {error}
            </div>
          )}

          {activeTab === 'student' ? (
            /* Student Login Form */
            <form onSubmit={handleStudentSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Registration Number / Roll No / Mobile
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={studentIdentifier}
                    onChange={(e) => setStudentIdentifier(e.target.value)}
                    placeholder="e.g. MDI-B2-456"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none font-medium text-slate-900"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Find on your ID card or Tax Invoice (e.g. MDI-B2-456)
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Password / PIN
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={studentPassword}
                    onChange={(e) => setStudentPassword(e.target.value)}
                    placeholder="••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none font-medium text-slate-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Login as Student</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Instant 1-Click Demo for Student */}
              <div className="pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleDemoStudent}
                  className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold rounded-xl border border-emerald-300 flex items-center justify-center gap-2 transition-colors text-xs"
                >
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>1-Click Demo: Login as Rajeev Kumar (ADIT)</span>
                </button>
              </div>
            </form>
          ) : (
            /* Admin Login Form */
            <form onSubmit={handleAdminSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Director / Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                    placeholder="admin@moderndelhiinfotech.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none font-medium text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Admin Master Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none font-medium text-slate-900"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Login as Director / Admin</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Instant 1-Click Demo for Admin */}
              <div className="pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleDemoAdmin}
                  className="w-full py-2.5 px-3 bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold rounded-xl border border-blue-300 flex items-center justify-center gap-2 transition-colors text-xs"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>1-Click Demo: Login as Sonu Sir (Admin)</span>
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};

export default LoginModal;

