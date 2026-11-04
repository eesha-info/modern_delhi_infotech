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
  const { invoices, courses, batches, setActiveInvoice } = useData();

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
    <div className="min-h-screen bg-[#f8f9fe] flex font-sans antialiased text-slate-800">
      
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
        
        {/* Argon Signature Primary Blue Header */}
        <header className="bg-[#5e72e4] pb-28 pt-4 shadow-xs relative">
          
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
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Official Student Digital ID Card (Clean navy #172b4d) */}
                <div className="bg-[#172b4d] rounded-2xl p-6 text-white shadow-md border border-slate-700/50 flex flex-col justify-between">
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
                          <h4 className="text-xs font-bold tracking-tight leading-tight">MODERN DELHI INFOTECH</h4>
                          <span className="text-[9px] text-slate-300 uppercase tracking-widest font-semibold">Madhepura, Bihar</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-white/20 text-white">
                        2026-27
                      </span>
                    </div>

                    {/* Student Info */}
                    <div className="mt-4 flex items-center gap-4">
                      <img
                        src={student?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                        alt={student?.name}
                        className="w-14 h-14 rounded-xl object-cover border border-white/20 flex-shrink-0"
                      />
                      <div>
                        <h3 className="text-base font-bold text-white leading-tight">
                          {student?.name || 'Rajeev Kumar'}
                        </h3>
                        <p className="text-xs text-slate-300 mt-0.5">
                          S/O: {student?.fatherName || 'Suresh Prasad Yadav'}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[10px] font-semibold">
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
                        <strong className="text-white">{student?.courseCode || 'ADIT'} ({student?.duration || '12M'})</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Assigned Lab PC:</span>
                        <strong className="text-white font-mono">{student?.pcNumber || 'PC-04'}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Batch Time:</span>
                        <span className="text-slate-300">{student?.batchTime || '08:00 AM – 09:30 AM'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Branch:</span>
                        <span className="text-slate-300">{student?.branchName || 'Branch 2 (Adarsh Nagar)'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Govt. Regd. Student ID</span>
                    </div>
                    <span>Mentor: Sonu Sir</span>
                  </div>
                </div>

                {/* Course Progress & Modules Completion */}
                <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Academic Status
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                          {studentCourse.name}
                        </h3>
                      </div>
                      <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-800">
                        {student?.progress || 65}% Done
                      </span>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                        <span>Course Completion</span>
                        <span className="font-bold text-slate-800">{student?.progress || 65}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#5e72e4] h-full rounded-full transition-all duration-300"
                          style={{ width: `${student?.progress || 65}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Quick Module Highlights */}
                    <div className="mt-5 space-y-2">
                      <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 text-slate-700">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Module 1: Fundamentals &amp; Windows 11</span>
                        </div>
                        <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">Completed</span>
                      </div>

                      <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 text-slate-700">
                        <div className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Module 2: MS Office Advanced Suite</span>
                        </div>
                        <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">Completed</span>
                      </div>

                      <div className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-50 text-slate-700">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#5e72e4]"></span>
                          <span>Module 3: Tally Prime 4.0 GST &amp; Invoicing</span>
                        </div>
                        <span className="text-[10px] text-[#5e72e4] font-semibold bg-blue-50 px-1.5 py-0.5 rounded">Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => setActiveTab('syllabus')}
                      className="text-xs font-semibold text-[#5e72e4] hover:underline flex items-center justify-between w-full"
                    >
                      <span>Explore Full 12-Month Syllabus</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Quick Fee & Invoice Summary Card */}
                <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Official Billing
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                          Fee Invoices &amp; Receipts
                        </h3>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        student?.balanceDues === 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {student?.paymentStatus || 'FULLY PAID'}
                      </span>
                    </div>

                    <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                      <div className="text-[10px] text-slate-400 uppercase font-bold">
                        Invoice No:
                      </div>
                      <div className="text-sm font-mono font-bold text-slate-900">
                        {studentInvoice?.invoiceNo || 'MDI/B2/2026-27/0001'}
                      </div>
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Total Course Fee:</span>
                        <strong className="text-slate-900">₹{(studentInvoice?.totalCourseFee || 12000).toLocaleString()}</strong>
                      </div>
                      <div className="mt-1 flex items-center justify-between text-xs">
                        <span className="text-slate-500">Amount Paid:</span>
                        <strong className="text-slate-900">₹{(studentInvoice?.totalPaid || 12000).toLocaleString()}</strong>
                      </div>
                      <div className="mt-1.5 pt-1.5 border-t border-slate-200 flex items-center justify-between text-xs font-bold">
                        <span className="text-slate-600">Balance Dues:</span>
                        <span className="text-emerald-700">
                          {studentInvoice?.balanceDues === 0 ? '₹ 0.00 (NIL)' : `₹ ${studentInvoice?.balanceDues}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => setActiveInvoice(studentInvoice)}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-xs border border-slate-200 shadow-xs transition-colors"
                    >
                      <Printer className="w-4 h-4 text-slate-500" />
                      <span>View &amp; Print Official GST Invoice</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Attendance Quick Snapshot & Typing Speed Widget */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Recent Attendance Activity Card */}
                <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                          Daily Attendance
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                          Recent Lab Attendance Log
                        </h3>
                      </div>
                      <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {student?.attendance || '94.2%'} Overall Rate
                      </span>
                    </div>

                    <div className="mt-4 divide-y divide-slate-100 text-xs">
                      {attendanceHistory.slice(0, 4).map((att, i) => (
                        <div key={i} className="py-2.5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                            <div>
                              <div className="font-bold text-slate-900">{att.date} ({att.day})</div>
                              <div className="text-[11px] text-slate-500">{att.remark} · {att.pc}</div>
                            </div>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
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
                      className="text-xs font-semibold text-[#5e72e4] hover:underline flex items-center justify-between w-full"
                    >
                      <span>View Full Monthly Calendar &amp; Log</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Typing Practice Quick Card (Clean & focused) */}
                <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Bihar Beltron Standard
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                        Hindi + English
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mt-3 font-display">
                      Typing Speed &amp; Accuracy Practice Lab
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Practice with live timer to meet Bihar Beltron exam standards (30+ WPM Hindi, 40+ WPM English).
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">English Speed</span>
                        <div className="text-2xl font-black text-slate-900 mt-1">
                          {student?.typingSpeed?.english || 42} <span className="text-xs font-normal text-slate-500">WPM</span>
                        </div>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="text-[10px] text-slate-400 uppercase font-bold">Hindi Speed</span>
                        <div className="text-2xl font-black text-slate-900 mt-1">
                          {student?.typingSpeed?.hindi || 34} <span className="text-xs font-normal text-slate-500">WPM</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <button
                      onClick={() => setActiveTab('typing')}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#5e72e4] hover:bg-[#4b5ec9] text-white font-bold text-xs transition-colors shadow-xs"
                    >
                      <Keyboard className="w-4 h-4" />
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
              
              <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Biometric &amp; Lab Register
                  </span>
                  <h2 className="text-xl font-display font-bold text-slate-900 mt-0.5">
                    My Attendance Record
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Track your daily attendance in Batch {student?.batchNo || 'Batch-1'} ({student?.batchTime || '08:00 AM – 09:30 AM'}).
                  </p>
                </div>

                <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-[10px] font-bold uppercase block text-slate-400">Attendance Rate</span>
                  <strong className="text-lg font-black text-slate-900">{student?.attendance || '94.2%'}</strong>
                </div>
              </div>

              {/* Attendance Breakdown Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 shadow-xs border border-slate-200/80">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Working Days</span>
                  <div className="text-2xl font-black text-slate-900 mt-1">53</div>
                  <span className="text-[10px] text-slate-500">Session 2026-27</span>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-xs border border-slate-200/80">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Days Present</span>
                  <div className="text-2xl font-black text-slate-900 mt-1">48</div>
                  <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">Present</span>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-xs border border-slate-200/80">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Days Late</span>
                  <div className="text-2xl font-black text-slate-900 mt-1">2</div>
                  <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.5 rounded">Late</span>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-xs border border-slate-200/80">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Days Absent</span>
                  <div className="text-2xl font-black text-slate-900 mt-1">3</div>
                  <span className="text-[10px] text-rose-700 font-semibold bg-rose-50 px-1.5 py-0.5 rounded">Absent</span>
                </div>
              </div>

              {/* Full Detailed Log Table */}
              <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    Day-by-Day Lab Log
                  </h3>
                  <span className="text-xs text-slate-400">Showing last 8 sessions</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold uppercase text-slate-500 tracking-wider">
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
                        <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
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
                            <span className="font-mono text-slate-700 bg-slate-50 px-2 py-0.5 rounded text-[11px] border border-slate-200">
                              {att.pc}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                              att.status === 'Present'
                                ? 'bg-emerald-50 text-emerald-700'
                                : att.status === 'Late'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-rose-50 text-rose-700'
                            }`}>
                              {att.status}
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
              
              <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Curriculum Roadmap
                  </span>
                  <h2 className="text-xl font-display font-bold text-slate-900 mt-0.5">
                    {studentCourse.name} ({studentCourse.code})
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    {studentCourse.duration} Diploma Program · Guided by Sonu Sir (BCA, MCA)
                  </p>
                </div>

                <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200">
                  Govt. Exam &amp; Beltron Ready
                </span>
              </div>

              {/* Modules Accordion / Cards */}
              <div className="space-y-4">
                {studentCourse.syllabus?.map((mod, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center flex-shrink-0">
                          {idx + 1}
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            {mod.module}
                          </span>
                          <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                            {mod.title}
                          </h3>
                        </div>
                      </div>

                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        idx < 2 ? 'bg-emerald-50 text-emerald-700 font-bold' :
                        idx === 2 ? 'bg-blue-50 text-blue-700 font-bold' : 'bg-slate-100 text-slate-500'
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
              
              <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Tax Invoice &amp; Payment Ledger
                  </span>
                  <h2 className="text-xl font-display font-bold text-slate-900 mt-0.5">
                    Official Fee Receipts
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Official tax invoice with GST breakdown and watermark verification.
                  </p>
                </div>

                <button
                  onClick={() => setActiveInvoice(studentInvoice)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-200 shadow-xs transition-colors"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  <span>Print Authentic Invoice Replica</span>
                </button>
              </div>

              {/* Invoice Detailed Preview Card */}
              <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 space-y-6">
                
                {/* Invoice Metadata Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">TAX INVOICE NUMBER</span>
                    <div className="text-base font-mono font-bold text-slate-900 mt-0.5">
                      {studentInvoice?.invoiceNo || 'MDI/B2/2026-27/0001'}
                    </div>
                    <span className="text-xs text-slate-500">
                      Date: {studentInvoice?.date || '31-Oct-2026'} · Session 2026-27
                    </span>
                  </div>

                  <div className="text-left sm:text-right">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">STATUS</span>
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-50 text-emerald-700 mt-0.5">
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
                      <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
                        <th className="py-2.5 px-4">Sr.</th>
                        <th className="py-2.5 px-4">Particulars</th>
                        <th className="py-2.5 px-4 text-right">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-3 px-4 font-semibold">1</td>
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
                        <td colSpan="2" className="py-2 px-4 text-right text-slate-500 font-medium">
                          CGST (9%) Included:
                        </td>
                        <td className="py-2 px-4 text-right font-mono text-slate-600">
                          - ₹{(studentInvoice?.feeParticulars?.cgst9Percent || 915.25).toFixed(2)}
                        </td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td colSpan="2" className="py-2 px-4 text-right text-slate-500 font-medium">
                          SGST (9%) Included:
                        </td>
                        <td className="py-2 px-4 text-right font-mono text-slate-600">
                          - ₹{(studentInvoice?.feeParticulars?.sgst9Percent || 915.25).toFixed(2)}
                        </td>
                      </tr>
                      <tr className="bg-slate-50 font-bold border-t border-slate-200">
                        <td colSpan="2" className="py-2.5 px-4 text-right text-slate-800">
                          Total Course Fee Payable:
                        </td>
                        <td className="py-2.5 px-4 text-right text-slate-900 font-bold text-sm">
                          ₹{(studentInvoice?.totalCourseFee || 12000).toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Installments Breakdown */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Installment &amp; Payment Record
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-500">
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
                            <td className="py-3 px-4 font-semibold">{inst.no}</td>
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
              
              <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Govt. Exam Preparation
                  </span>
                  <h2 className="text-xl font-display font-bold text-slate-900 mt-0.5">
                    Typing Speed &amp; Accuracy Lab
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Interactive simulation for Bihar Beltron, SSC CHSL, High Court &amp; Civil Court typing exams.
                  </p>
                </div>

                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200">
                  Hindi (KrutiDev) &amp; English
                </span>
              </div>

              {/* Full Interactive Typing Widget */}
              <TypingTestWidget />

            </div>
          )}

          {/* ===================== TAB: MATERIALS ===================== */}
          {activeTab === 'materials' && (
            <div className="space-y-6">
              
              <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Digital Library
                  </span>
                  <h2 className="text-xl font-display font-bold text-slate-900 mt-0.5">
                    Course Handbooks &amp; Notes
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Free downloadable PDFs prepared by Sonu Sir for practical and theory revision.
                  </p>
                </div>

                <span className="text-xs text-slate-500">
                  {studyMaterials.length} Documents Available
                </span>
              </div>

              {/* Materials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {studyMaterials.map((mat, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-5 shadow-xs border border-slate-200/80 hover:shadow-sm transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                          {mat.format}
                        </span>
                        <span className="text-[10px] text-slate-400">{mat.size}</span>
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
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition-colors"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-500" />
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
              
              <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Credential Verification
                  </span>
                  <h2 className="text-xl font-display font-bold text-slate-900 mt-0.5">
                    Govt. Regd. Course Certificate
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Regd. Govt. of India · ISO 9001 Standard · Valid for Government &amp; Private Jobs.
                  </p>
                </div>

                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl border border-slate-200 shadow-xs transition-colors"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  <span>Print Certificate</span>
                </button>
              </div>

              {/* Certificate Frame Preview */}
              <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-sm border-2 border-slate-200 max-w-3xl mx-auto text-center relative overflow-hidden">
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
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-1">
                  Regd. Govt. of India (भारत सरकार से मान्यता प्राप्त)
                </p>

                <div className="my-6">
                  <span className="text-xs italic text-slate-500 font-serif block">
                    This is to proudly certify that
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 font-serif mt-1 border-b-2 border-slate-300 inline-block pb-1 px-4">
                    {student?.name || 'Rajeev Kumar'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2">
                    Son of <strong>{student?.fatherName || 'Suresh Prasad Yadav'}</strong>, having Registration No.{' '}
                    <strong className="font-mono text-slate-800">{student?.regNo || 'MDI-B2-456'}</strong>
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
                    <div className="w-14 h-14 mx-auto bg-slate-50 p-1 border border-slate-200 rounded flex items-center justify-center">
                      <QrCode className="w-10 h-10 text-slate-700" />
                    </div>
                    <span className="text-[9px] text-slate-400 font-mono block mt-1">Scan to Verify</span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-serif italic text-slate-900 block font-bold">Sonu Kumar</span>
                    <span className="text-[10px] text-slate-500 block">Director (BCA, MCA)</span>
                    <span className="text-[9px] text-slate-400 font-semibold uppercase">Modern Delhi Infotech</span>
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
