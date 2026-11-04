import React, { useState } from 'react';
import {
  Tv, BookOpen, Receipt, Keyboard, Download, Award, Clock,
  Calendar, CheckCircle2, ArrowLeft, LogOut, Printer, ShieldCheck, User,
  FileText, Sparkles, ExternalLink, Check, X, AlertCircle, ChevronRight,
  TrendingUp, Laptop, QrCode, Phone, MapPin
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import ArgonSidebar from '../dashboard/ArgonSidebar';
import ArgonNavbar from '../dashboard/ArgonNavbar';
import ArgonHeaderCards from '../dashboard/ArgonHeaderCards';
import TypingTestWidget from '../home/TypingTestWidget';

const StudentDashboard = () => {
  const { user, logout, setActiveView } = useAuth();
  const { invoices, courses, batches, setActiveInvoice, attendanceData } = useData();

  // Tab State: 'dashboard' | 'attendance' | 'syllabus' | 'invoices' | 'typing' | 'materials' | 'certificate'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const student = user;
  const courseCode = student?.courseCode || 'ADIT';
  const studentCourse = courses.find(c => c.code === courseCode) || courses[0];
  const studentInvoice = invoices.find(i => i.student?.regNo === student?.regNo) || invoices[0];
  const studentBatch = batches.find(b => b.name.includes(student?.batchNo || 'Batch-1')) || batches[0];

  const getTabTitle = (tab) => {
    switch (tab) {
      case 'dashboard': return 'Student Overview';
      case 'attendance': return 'My Attendance Record';
      case 'syllabus': return 'Course Syllabus & Progress';
      case 'invoices': return 'My Fee Invoices & Receipts';
      case 'typing': return 'Typing Speed Practice Lab';
      case 'materials': return 'Study Notes & Downloads';
      case 'certificate': return 'Digital Course Certificate';
      default: return 'Student Portal';
    }
  };

  const studyMaterials = [
    { title: "MS Office 2024 Advanced Complete Handbook", size: "4.2 MB", format: "PDF", category: "Office Suite" },
    { title: "Tally Prime 4.0 GST & E-Way Billing Guide", size: "6.8 MB", format: "PDF", category: "Accounting" },
    { title: "Bihar Beltron KrutiDev 010 Hindi Typing Font", size: "1.1 MB", format: "TTF", category: "Typing" },
    { title: "C & C++ Programming Practical Solutions", size: "3.5 MB", format: "PDF", category: "Coding" },
    { title: "Excel 100+ Formulas, VLOOKUP & Pivot Cheat Sheet", size: "2.8 MB", format: "PDF", category: "Productivity" },
    { title: "Computer Fundamentals & Windows 11 Shortcuts", size: "1.9 MB", format: "PDF", category: "Basics" }
  ];

  // Personal attendance history mock data for this student
  const attendanceHistory = [
    { date: "04 Nov 2026", day: "Wednesday", batch: student?.batchTime || "08:00 AM - 09:30 AM", pc: student?.pcNumber || "PC-04", status: "Present", remark: "On time" },
    { date: "03 Nov 2026", day: "Tuesday", batch: student?.batchTime || "08:00 AM - 09:30 AM", pc: student?.pcNumber || "PC-04", status: "Present", remark: "Tally Lab Practice" },
    { date: "02 Nov 2026", day: "Monday", batch: student?.batchTime || "08:00 AM - 09:30 AM", pc: student?.pcNumber || "PC-04", status: "Present", remark: "Typing Speed Test 42 WPM" },
    { date: "31 Oct 2026", day: "Saturday", batch: student?.batchTime || "08:00 AM - 09:30 AM", pc: student?.pcNumber || "PC-04", status: "Present", remark: "Theory & Lab" },
    { date: "30 Oct 2026", day: "Friday", batch: student?.batchTime || "08:00 AM - 09:30 AM", pc: student?.pcNumber || "PC-04", status: "Late", remark: "Permitted by Sonu Sir" },
    { date: "29 Oct 2026", day: "Thursday", batch: student?.batchTime || "08:00 AM - 09:30 AM", pc: student?.pcNumber || "PC-04", status: "Present", remark: "Excel Formulas" },
    { date: "28 Oct 2026", day: "Wednesday", batch: student?.batchTime || "08:00 AM - 09:30 AM", pc: student?.pcNumber || "PC-04", status: "Present", remark: "MS PowerPoint presentation" },
    { date: "27 Oct 2026", day: "Tuesday", batch: student?.batchTime || "08:00 AM - 09:30 AM", pc: student?.pcNumber || "PC-04", status: "Absent", remark: "Medical leave" }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans antialiased">
      
      {/* 1. Argon Left Fixed Sidebar */}
      <ArgonSidebar
        role="student"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        onViewWebsite={() => setActiveView('landing')}
      />

      {/* 2. Right Main Layout Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        
        {/* Argon Top Blue/Indigo Header with Metric Cards */}
        <header className="bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-900 pb-28 pt-4 shadow-sm relative">
          
          {/* Argon Navbar */}
          <ArgonNavbar
            activeTabTitle={getTabTitle(activeTab)}
            user={user}
            role="student"
            onLogout={logout}
            onViewWebsite={() => setActiveView('landing')}
            onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          />

          {/* Argon 4 Header Metric Cards */}
          <div className="px-4 sm:px-6 lg:px-8 mt-5">
            <ArgonHeaderCards
              role="student"
              user={user}
            />
          </div>
        </header>

        {/* 3. Main Body Content (Floats over header with negative margin -mt-16) */}
        <main className="-mt-16 relative z-10 px-4 sm:px-6 lg:px-8 space-y-6 pb-12 flex-1">
          
          {/* ===================== TAB: DASHBOARD (Overview) ===================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Top Banner: Student Identity Card & Active Batch */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Official Student Digital ID Card */}
                <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 rounded-2xl p-6 text-white shadow-xl border border-blue-800/40 relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-blue-500/10 blur-2xl pointer-events-none"></div>

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2.5">
                        <img
                          src="/mdi-real-logo-cropped.png"
                          alt="MDI"
                          className="w-8 h-8 rounded-full bg-white p-0.5 object-contain"
                          onError={(e) => {
                            e.currentTarget.src = "/logo-icon.svg";
                          }}
                        />
                        <div>
                          <h4 className="text-xs font-black tracking-tight leading-tight">MODERN DELHI INFOTECH</h4>
                          <span className="text-[9px] text-blue-300 uppercase tracking-widest font-bold">Madhepura, Bihar</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[9px] font-black uppercase bg-amber-400 text-slate-950">
                        Active 2026-27
                      </span>
                    </div>

                    {/* Student Info */}
                    <div className="mt-4 flex items-center gap-4">
                      <img
                        src={student?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                        alt={student?.name}
                        className="w-16 h-16 rounded-xl object-cover border-2 border-white/30 shadow-md flex-shrink-0"
                      />
                      <div>
                        <h3 className="text-base font-extrabold text-white leading-tight">
                          {student?.name || 'Rajeev Kumar'}
                        </h3>
                        <p className="text-xs text-blue-200 mt-0.5 font-medium">
                          S/O: {student?.fatherName || 'Suresh Prasad Yadav'}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 font-mono text-[10px] font-bold border border-blue-400/30">
                            {student?.regNo || 'MDI-B2-456'}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Roll: {student?.rollNo || '456'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Course & Batch Details */}
                    <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Course:</span>
                        <strong className="text-white font-bold">{student?.courseCode || 'ADIT'} ({student?.duration || '12M'})</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Assigned Lab PC:</span>
                        <strong className="text-amber-400 font-mono font-bold">{student?.pcNumber || 'PC-04'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Batch Time:</span>
                        <span className="text-blue-200">{student?.batchTime || '08:00 AM – 09:30 AM'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Institute Branch:</span>
                        <span className="text-blue-200">{student?.branchName || 'Branch 2 (Adarsh Nagar)'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px]">
                    <div className="flex items-center gap-1.5 text-emerald-300">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Govt. Regd. Student ID</span>
                    </div>
                    <span className="text-slate-400">Mentor: Sonu Sir (BCA, MCA)</span>
                  </div>
                </div>

                {/* Course Progress & Modules Completion */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                          Academic Status
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                          {studentCourse.name}
                        </h3>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-blue-50 text-blue-800">
                        {student?.progress || 65}% Completed
                      </span>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1.5">
                        <span>Course Completion Bar</span>
                        <span className="font-bold text-slate-900">{student?.progress || 65}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-indigo-600 h-full rounded-full transition-all duration-500"
                          style={{ width: `${student?.progress || 65}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Quick Module Highlights */}
                    <div className="mt-5 space-y-2">
                      <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-emerald-50 text-emerald-800 font-medium">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Module 1: Fundamentals &amp; Windows 11</span>
                        </div>
                        <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded shadow-xs">Done</span>
                      </div>

                      <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-emerald-50 text-emerald-800 font-medium">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Module 2: MS Office Advanced Suite</span>
                        </div>
                        <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded shadow-xs">Done</span>
                      </div>

                      <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-blue-50 text-blue-900 font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                          <span>Module 3: Tally Prime 4.0 GST &amp; Invoicing</span>
                        </div>
                        <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded">Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => setActiveTab('syllabus')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center justify-between w-full"
                    >
                      <span>Explore Full 12-Month Syllabus</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Quick Fee & Invoice Summary Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">
                          Official Billing
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                          MDI Tax Invoice &amp; Fees
                        </h3>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        student?.balanceDues === 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {student?.paymentStatus || 'FULLY PAID'}
                      </span>
                    </div>

                    <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">
                        Invoice No:
                      </div>
                      <div className="text-sm font-mono font-extrabold text-blue-900">
                        {studentInvoice?.invoiceNo || 'MDI/B2/2026-27/0001'}
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Total Course Fee:</span>
                        <strong className="text-slate-900">₹{(studentInvoice?.totalCourseFee || 12000).toLocaleString()}</strong>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Amount Paid:</span>
                        <strong className="text-emerald-700">₹{(studentInvoice?.totalPaid || 12000).toLocaleString()}</strong>
                      </div>
                      <div className="mt-1.5 pt-1.5 border-t border-slate-200 flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-700">Balance Dues:</span>
                        <span className="text-emerald-700">
                          {studentInvoice?.balanceDues === 0 ? '₹ 0.00 (NIL)' : `₹ ${studentInvoice?.balanceDues}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <button
                      onClick={() => setActiveInvoice(studentInvoice)}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all active:scale-95"
                    >
                      <Printer className="w-4 h-4" />
                      <span>View &amp; Print Official GST Invoice</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Attendance Quick Snapshot & Typing Speed Widget row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Recent Attendance Activity Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
                          Daily Attendance
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                          Recent Lab Attendance Log
                        </h3>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                        {student?.attendance || '94.2%'} Overall Rate
                      </span>
                    </div>

                    <div className="mt-4 divide-y divide-slate-100 text-xs">
                      {attendanceHistory.slice(0, 4).map((att, i) => (
                        <div key={i} className="py-2.5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              att.status === 'Present' ? 'bg-emerald-100 text-emerald-700' :
                              att.status === 'Late' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                            }`}>
                              {att.status === 'Present' ? <Check className="w-4 h-4" /> :
                               att.status === 'Late' ? <Clock className="w-4 h-4" /> : <X className="w-4 h-4" />}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900">{att.date} ({att.day})</div>
                              <div className="text-[11px] text-slate-500">{att.remark} · {att.pc}</div>
                            </div>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            att.status === 'Present' ? 'bg-emerald-50 text-emerald-700' :
                            att.status === 'Late' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                          }`}>
                            {att.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => setActiveTab('attendance')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center justify-between w-full"
                    >
                      <span>View Full Monthly Calendar &amp; Log</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Typing Practice Quick Banner */}
                <div className="bg-gradient-to-br from-teal-600 via-teal-700 to-emerald-800 rounded-2xl p-6 text-white shadow-md flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-[10px] font-black uppercase tracking-wider text-teal-200">
                        Bihar Beltron Standard
                      </span>
                      <span className="px-2 py-0.5 rounded bg-white/20 text-white text-[10px] font-bold">
                        Hindi + English
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mt-3 font-display">
                      Typing Speed &amp; Accuracy Practice Lab
                    </h3>
                    <p className="text-xs text-teal-100 mt-1">
                      Target 30+ WPM Hindi (KrutiDev 010 / Mangal) and 40+ WPM English to qualify in Bihar Beltron and SSC exams.
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/15">
                        <span className="text-[10px] text-teal-200 uppercase font-semibold">Your English Speed</span>
                        <div className="text-2xl font-black text-white mt-1">
                          {student?.typingSpeed?.english || 42} <span className="text-xs font-normal">WPM</span>
                        </div>
                      </div>
                      <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/15">
                        <span className="text-[10px] text-teal-200 uppercase font-semibold">Your Hindi Speed</span>
                        <div className="text-2xl font-black text-white mt-1">
                          {student?.typingSpeed?.hindi || 34} <span className="text-xs font-normal">WPM</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => setActiveTab('typing')}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-teal-950 font-bold text-xs hover:bg-teal-50 transition-colors shadow"
                    >
                      <Keyboard className="w-4 h-4 text-teal-700" />
                      <span>Start Typing Test Now</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ===================== TAB: ATTENDANCE ===================== */}
          {activeTab === 'attendance' && (
            <div className="space-y-6">
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
                    Biometric &amp; Lab Register
                  </span>
                  <h2 className="text-xl font-display font-extrabold text-slate-900 mt-0.5">
                    My Attendance Record
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Track your daily attendance in Batch {student?.batchNo || 'Batch-1'} ({student?.batchTime || '08:00 AM – 09:30 AM'}).
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-center">
                    <span className="text-[10px] font-bold uppercase block text-emerald-700">Attendance Rate</span>
                    <strong className="text-lg font-black text-emerald-800">{student?.attendance || '94.2%'}</strong>
                  </div>
                </div>
              </div>

              {/* Attendance Breakdown Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Working Days</span>
                  <div className="text-2xl font-black text-slate-900 mt-1">53</div>
                  <span className="text-[10px] text-slate-500">Session 2026-27</span>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                  <span className="text-[10px] font-bold uppercase text-emerald-600 block">Days Present</span>
                  <div className="text-2xl font-black text-emerald-600 mt-1">48</div>
                  <span className="text-[10px] text-emerald-700">Lab Practice &amp; Theory</span>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                  <span className="text-[10px] font-bold uppercase text-amber-500 block">Days Late</span>
                  <div className="text-2xl font-black text-amber-600 mt-1">2</div>
                  <span className="text-[10px] text-amber-700">Entry permitted</span>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                  <span className="text-[10px] font-bold uppercase text-rose-500 block">Days Absent</span>
                  <div className="text-2xl font-black text-rose-600 mt-1">3</div>
                  <span className="text-[10px] text-rose-700">With Prior Leave</span>
                </div>
              </div>

              {/* Full Detailed Log Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    Day-by-Day Lab Log
                  </h3>
                  <span className="text-xs text-slate-500">Showing last 8 sessions</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-black uppercase text-slate-500 tracking-wider">
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Day</th>
                        <th className="py-3 px-4">Batch Timing</th>
                        <th className="py-3 px-4">Lab PC Station</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Mentor Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {attendanceHistory.map((att, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            {att.date}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            {att.day}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                            {att.batch}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-mono font-bold bg-slate-100 px-2 py-0.5 rounded text-[11px] border border-slate-200">
                              {att.pc}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              att.status === 'Present'
                                ? 'bg-emerald-50 text-emerald-700'
                                : att.status === 'Late'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-rose-50 text-rose-700'
                            }`}>
                              {att.status === 'Present' ? <Check className="w-3 h-3" /> :
                               att.status === 'Late' ? <Clock className="w-3 h-3" /> : <X className="w-3 h-3" />}
                              <span>{att.status}</span>
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-500">
                            {att.remark}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ===================== TAB: SYLLABUS ===================== */}
          {activeTab === 'syllabus' && (
            <div className="space-y-6">
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block">
                    Curriculum Roadmap
                  </span>
                  <h2 className="text-xl font-display font-extrabold text-slate-900 mt-0.5">
                    {studentCourse.name} ({studentCourse.code})
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {studentCourse.duration} Diploma Program · Guided by Sonu Sir (BCA, MCA)
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-xl border border-blue-200">
                    Govt. Exam &amp; Beltron Ready
                  </span>
                </div>
              </div>

              {/* Modules Accordion / Cards */}
              <div className="space-y-4">
                {studentCourse.syllabus?.map((mod, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:border-blue-200 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-black text-xs flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600">
                            {mod.module}
                          </span>
                          <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                            {mod.title}
                          </h3>
                        </div>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        idx < 2 ? 'bg-emerald-50 text-emerald-700' :
                        idx === 2 ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {idx < 2 ? 'Completed' : idx === 2 ? 'In Progress' : 'Upcoming'}
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Topics Covered:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {mod.topics.map((t, ti) => (
                          <span
                            key={ti}
                            className="text-xs bg-slate-50 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-lg"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ===================== TAB: INVOICES ===================== */}
          {activeTab === 'invoices' && (
            <div className="space-y-6">
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">
                    Tax Invoice &amp; Payment Ledger
                  </span>
                  <h2 className="text-xl font-display font-extrabold text-slate-900 mt-0.5">
                    Official Fee Receipts
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Official tax invoice with GST breakdown and watermark verification.
                  </p>
                </div>

                <button
                  onClick={() => setActiveInvoice(studentInvoice)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all active:scale-95"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Authentic Invoice Replica</span>
                </button>
              </div>

              {/* Invoice Detailed Preview Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 space-y-6">
                
                {/* Invoice Metadata Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">TAX INVOICE NUMBER</span>
                    <div className="text-lg font-mono font-black text-blue-950 mt-0.5">
                      {studentInvoice?.invoiceNo || 'MDI/B2/2026-27/0001'}
                    </div>
                    <span className="text-xs text-slate-500">
                      Date: {studentInvoice?.date || '31-Oct-2026'} · Session 2026-27
                    </span>
                  </div>

                  <div className="text-right sm:text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">STATUS</span>
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 mt-0.5">
                        {studentInvoice?.status || 'FULLY PAID'}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 mt-0.5 block">
                      Balance Dues: <strong className="text-emerald-700">₹0.00</strong>
                    </span>
                  </div>
                </div>

                {/* Particulars Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-500">
                        <th className="py-2.5 px-4">Sr.</th>
                        <th className="py-2.5 px-4">Particulars</th>
                        <th className="py-2.5 px-4 text-right">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-3 px-4 font-bold">1</td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-slate-900">
                            Course Fee — {studentInvoice?.course?.code || 'ADIT'}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {studentInvoice?.course?.name || 'Advanced Diploma in Information Technology'} (12 Months)
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-slate-900">
                          ₹{(studentInvoice?.totalCourseFee || 12000).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-slate-200 bg-slate-50/50">
                        <td colSpan="2" className="py-2.5 px-4 text-right text-slate-600 font-semibold">
                          CGST (9%) Included:
                        </td>
                        <td className="py-2.5 px-4 text-right font-mono text-slate-700">
                          - ₹{(studentInvoice?.feeParticulars?.cgst9Percent || 915.25).toFixed(2)}
                        </td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td colSpan="2" className="py-2.5 px-4 text-right text-slate-600 font-semibold">
                          SGST (9%) Included:
                        </td>
                        <td className="py-2.5 px-4 text-right font-mono text-slate-700">
                          - ₹{(studentInvoice?.feeParticulars?.sgst9Percent || 915.25).toFixed(2)}
                        </td>
                      </tr>
                      <tr className="bg-blue-50/50 font-bold border-t border-blue-100">
                        <td colSpan="2" className="py-3 px-4 text-right text-blue-900">
                          Total Course Fee Payable:
                        </td>
                        <td className="py-3 px-4 text-right text-blue-950 font-black text-sm">
                          ₹{(studentInvoice?.totalCourseFee || 12000).toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Installments Breakdown */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Installment &amp; Payment Record
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-500">
                          <th className="py-2.5 px-4">#</th>
                          <th className="py-2.5 px-4">Installment</th>
                          <th className="py-2.5 px-4">Date</th>
                          <th className="py-2.5 px-4">Mode / Ref</th>
                          <th className="py-2.5 px-4">Status</th>
                          <th className="py-2.5 px-4 text-right">Amount (₹)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {studentInvoice?.installments?.map((inst) => (
                          <tr key={inst.no}>
                            <td className="py-3 px-4 font-bold">{inst.no}</td>
                            <td className="py-3 px-4 font-bold text-slate-800">{inst.title}</td>
                            <td className="py-3 px-4 text-slate-600">{inst.date}</td>
                            <td className="py-3 px-4 font-mono text-[11px] text-slate-600">
                              <div>{inst.mode}</div>
                              {inst.ref && <div className="text-[10px] text-slate-400">{inst.ref}</div>}
                            </td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">
                                {inst.status}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right font-bold text-slate-900">
                              ₹{(inst.amount || 0).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ===================== TAB: TYPING ===================== */}
          {activeTab === 'typing' && (
            <div className="space-y-6">
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 block">
                    Govt. Exam Preparation
                  </span>
                  <h2 className="text-xl font-display font-extrabold text-slate-900 mt-0.5">
                    Typing Speed &amp; Accuracy Lab
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Interactive simulation for Bihar Beltron, SSC CHSL, High Court &amp; Civil Court stenographer exams.
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold">
                  <span className="px-3 py-1 bg-teal-50 text-teal-800 rounded-xl border border-teal-200">
                    Hindi (KrutiDev) &amp; English
                  </span>
                </div>
              </div>

              {/* Full Interactive Typing Widget */}
              <TypingTestWidget />

            </div>
          )}

          {/* ===================== TAB: MATERIALS ===================== */}
          {activeTab === 'materials' && (
            <div className="space-y-6">
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">
                    Digital Library
                  </span>
                  <h2 className="text-xl font-display font-extrabold text-slate-900 mt-0.5">
                    Course Handbooks &amp; Notes
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Free downloadable PDFs prepared by Sonu Sir for practical and theory revision.
                  </p>
                </div>

                <span className="text-xs text-slate-500 font-semibold">
                  {studyMaterials.length} Documents Available
                </span>
              </div>

              {/* Materials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {studyMaterials.map((mat, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded bg-rose-50 text-rose-700">
                          {mat.format}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold">{mat.size}</span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-sm mt-3 leading-snug">
                        {mat.title}
                      </h3>
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Category: {mat.category}
                      </span>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100">
                      <button
                        onClick={() => alert(`Downloading "${mat.title}" (${mat.size})...`)}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold text-xs rounded-xl border border-slate-200 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Handbook</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ===================== TAB: CERTIFICATE ===================== */}
          {activeTab === 'certificate' && (
            <div className="space-y-6">
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">
                    Credential Verification
                  </span>
                  <h2 className="text-xl font-display font-extrabold text-slate-900 mt-0.5">
                    Govt. Regd. Course Certificate
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Regd. Govt. of India · ISO 9001 Standard · Valid for Government &amp; Private Jobs.
                  </p>
                </div>

                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Certificate</span>
                </button>
              </div>

              {/* Certificate Frame Preview */}
              <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-md border-4 border-amber-600/30 max-w-3xl mx-auto text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-blue-900 via-amber-500 to-blue-900"></div>

                <div className="w-16 h-16 mx-auto mb-3">
                  <img
                    src="/mdi-real-logo-cropped.png"
                    alt="MDI"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.currentTarget.src = "/logo-icon.svg";
                    }}
                  />
                </div>

                <h2 className="text-xl sm:text-2xl font-black font-serif text-slate-900 tracking-tight">
                  MODERN DELHI INFOTECH
                </h2>
                <p className="text-xs text-slate-600 font-semibold uppercase tracking-widest mt-0.5">
                  Computer Education &amp; Training Centre · Madhepura (Bihar)
                </p>
                <p className="text-[10px] text-amber-800 font-bold uppercase tracking-wider mt-1">
                  Regd. Govt. of India (भारत सरकार से मान्यता प्राप्त)
                </p>

                <div className="my-6">
                  <span className="text-xs italic text-slate-500 font-serif block">
                    This is to proudly certify that
                  </span>
                  <h3 className="text-2xl font-black text-blue-950 font-serif mt-1 border-b-2 border-amber-400 inline-block pb-1 px-4">
                    {student?.name || 'Rajeev Kumar'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2">
                    Son of <strong>{student?.fatherName || 'Suresh Prasad Yadav'}</strong>, having Registration No.{' '}
                    <strong className="font-mono">{student?.regNo || 'MDI-B2-456'}</strong>
                  </p>
                  <p className="text-xs text-slate-600 mt-1 max-w-lg mx-auto">
                    has successfully completed the 1-Year Diploma in{' '}
                    <strong className="text-slate-900">{studentCourse.name} ({studentCourse.code})</strong> with Grade{' '}
                    <strong className="text-emerald-700">A+ (Distinction)</strong> and demonstrated professional speed in Typing &amp; Office Automation.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 px-6">
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 block uppercase">Issue Date</span>
                    <strong className="text-slate-900">31-Oct-2026</strong>
                  </div>

                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-slate-100 p-1 border border-slate-200 rounded flex items-center justify-center">
                      <QrCode className="w-12 h-12 text-slate-700" />
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono block mt-1">Scan to Verify</span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-serif italic text-blue-900 block font-bold">Sonu Kumar</span>
                    <span className="text-[10px] text-slate-500 block">Director (BCA, MCA)</span>
                    <span className="text-[9px] text-amber-700 font-bold uppercase">Modern Delhi Infotech</span>
                  </div>
                </div>

              </div>

            </div>
          )}

        </main>
      </div>

    </div>
  );
};

export default StudentDashboard;
