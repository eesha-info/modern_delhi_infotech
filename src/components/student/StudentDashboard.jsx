import React, { useState } from 'react';
import {
  GraduationCap, BookOpen, Receipt, Keyboard, Download, Award, Clock,
  Calendar, CheckCircle2, ArrowLeft, LogOut, Printer, ShieldCheck, User,
  FileText, Sparkles, ExternalLink
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Logo from '../common/Logo';
import TypingTestWidget from '../home/TypingTestWidget';

const StudentDashboard = () => {
  const { user, logout, setActiveView } = useAuth();
  const { invoices, courses, setActiveInvoice } = useData();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'syllabus' | 'invoice' | 'typing' | 'materials' | 'certificate'

  // Find student's course and invoice
  const student = user;
  const courseCode = student?.courseCode || 'ADIT';
  const studentCourse = courses.find(c => c.code === courseCode) || courses[0];
  const studentInvoice = invoices.find(i => i.student?.regNo === student?.regNo) || invoices[0];

  const handleOpenInvoice = () => {
    setActiveInvoice(studentInvoice);
  };

  const studyMaterials = [
    { title: "MS Office 2024 Advanced Handbook", size: "4.2 MB", format: "PDF", category: "Office Automation" },
    { title: "Tally Prime 4.0 GST & Invoicing Guide", size: "6.8 MB", format: "PDF", category: "Accounting" },
    { title: "Bihar Beltron Hindi Typing Font (KrutiDev 010)", size: "1.1 MB", format: "TTF", category: "Typing" },
    { title: "C & C++ Programming Practical Solutions", size: "3.5 MB", format: "PDF", category: "Programming" },
    { title: "Excel 100+ Formulas & VLOOKUP Cheat Sheet", size: "2.8 MB", format: "PDF", category: "Productivity" }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      
      {/* Student Portal Top Bar */}
      <header className="bg-brand-navyDark text-white border-b border-blue-900/60 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('landing')}
              className="p-2 hover:bg-white/10 rounded-xl text-slate-300 hover:text-white transition-colors"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Logo size="sm" showText={false} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-base tracking-tight">
                  Modern Delhi Infotech
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-emerald-500 text-slate-950">
                  Student Portal
                </span>
              </div>
              <p className="text-[11px] text-emerald-200">
                Welcome, {student?.name || 'Rajeev Kumar'} (Reg: {student?.regNo || 'MDI-B2-456'})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveView('landing')}
              className="hidden sm:inline-flex text-xs font-semibold px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-slate-200 transition-colors"
            >
              View Public Website
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-1.5 text-xs font-bold text-rose-300 hover:text-white bg-rose-500/20 hover:bg-rose-500/40 px-3 py-1.5 rounded-lg border border-rose-500/40 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 py-2 border-t border-white/10 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'overview' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <User className="w-4 h-4" />
            <span>My Profile &amp; ID Card</span>
          </button>

          <button
            onClick={() => setActiveTab('syllabus')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'syllabus' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Course &amp; Syllabus Progress</span>
          </button>

          <button
            onClick={() => setActiveTab('invoice')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'invoice' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>Fee Invoice &amp; Installments</span>
          </button>

          <button
            onClick={() => setActiveTab('typing')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'typing' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Keyboard className="w-4 h-4" />
            <span>Typing Speed Lab</span>
          </button>

          <button
            onClick={() => setActiveTab('materials')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'materials' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Study Materials ({studyMaterials.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('certificate')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'certificate' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Certificate Preview</span>
          </button>
        </div>
      </header>

      {/* Main Student Portal Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* TAB 1: OVERVIEW & DIGITAL ID CARD */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Student Welcome Banner */}
            <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-brand-navyDark rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 p-1 flex-shrink-0 shadow-lg">
                    <div className="w-full h-full rounded-[14px] bg-slate-900 flex items-center justify-center text-white font-extrabold text-2xl font-display">
                      {student?.name?.slice(0, 2).toUpperCase() || 'RK'}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-2xl font-display font-extrabold text-white">
                        {student?.name || 'Rajeev Kumar'}
                      </h2>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                        {student?.paymentStatus || 'FULLY PAID'}
                      </span>
                    </div>
                    <p className="text-xs text-amber-300 font-semibold mt-0.5">
                      Enrolled: {student?.courseName || 'Advanced Diploma in Information Technology'} ({student?.courseCode || 'ADIT'})
                    </p>
                    <p className="text-xs text-slate-300 mt-1">
                      Reg No: <strong className="font-mono text-white">{student?.regNo || 'MDI-B2-456'}</strong> • Batch: {student?.batchTime || '08:00 AM – 09:30 AM'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleOpenInvoice}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
                  >
                    <Receipt className="w-4 h-4" />
                    <span>View Official Fee Invoice</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('typing')}
                    className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
                  >
                    <Keyboard className="w-4 h-4" />
                    <span>Open Typing Lab</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Grid: Digital Student ID Card & Course Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Digital Student Identity Card (Specimen replica) */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg relative overflow-hidden">
                <div className="bg-gradient-to-r from-blue-900 to-brand-navyDark text-white -mx-6 -mt-6 p-4 text-center border-b-2 border-amber-500">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 block">
                    MODERN DELHI INFOTECH · MADHEPURA
                  </span>
                  <h4 className="font-bold text-sm text-white">STUDENT IDENTITY CARD</h4>
                  <p className="text-[10px] text-blue-200">Estd. 2017 · Regd. Govt. of India</p>
                </div>

                <div className="mt-5 flex gap-4 items-start">
                  <div className="w-24 h-28 bg-slate-100 rounded-xl border border-slate-300 flex flex-col items-center justify-center text-slate-400 text-center p-2 flex-shrink-0">
                    <User className="w-10 h-10 text-slate-500 mb-1" />
                    <span className="text-[9px] font-bold text-slate-600">PHOTO</span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Student Name</span>
                      <strong className="text-slate-900 text-sm">{student?.name || 'Rajeev Kumar'}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Father's Name</span>
                      <span className="text-slate-700 font-medium">{student?.fatherName || 'Suresh Prasad Yadav'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Course Enrolled</span>
                      <span className="font-bold text-blue-800">{student?.courseCode || 'ADIT'} ({student?.duration || '12 Months'})</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Registration No</span>
                      <span className="font-mono font-black text-rose-700">{student?.regNo || 'MDI-B2-456'}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-slate-600 space-y-1">
                  <p><strong>Batch:</strong> {student?.batchTime || '08:00 AM – 09:30 AM'} (Batch-1)</p>
                  <p><strong>Branch:</strong> Branch 2 (Adarsh Nagar, Madhepura)</p>
                  <p><strong>Emergency Contact:</strong> {student?.mobile || '+919431258394'}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-200 flex items-center justify-between">
                  <div className="text-[9px] text-slate-400">
                    <span>Valid: 2026-27</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-slate-800 block">Sonu Kumar</span>
                    <span className="text-[9px] text-slate-400">Director Signature</span>
                  </div>
                </div>
              </div>

              {/* Progress & Quick Metrics */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Course Completion Progress Card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">Course Syllabus Progress</h4>
                      <p className="text-xs text-slate-500">ADIT Curriculum Completion Status</p>
                    </div>
                    <span className="text-2xl font-black text-emerald-600 font-display">88%</span>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-600 h-3 rounded-full w-[88%]"></div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-4 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-400 text-[10px]">Attendance</span>
                      <p className="font-bold text-slate-800 text-sm">94%</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-400 text-[10px]">Typing Speed</span>
                      <p className="font-bold text-slate-800 text-sm">42 WPM</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="text-slate-400 text-[10px]">Next Lab Exam</span>
                      <p className="font-bold text-blue-700 text-sm">15-Nov</p>
                    </div>
                  </div>
                </div>

                {/* Fee Status Summary Card */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fee Account Status</span>
                    <h4 className="text-lg font-bold text-slate-900 mt-0.5">
                      Total Course Fee: ₹{student?.totalFee?.toLocaleString() || '12,000'}
                    </h4>
                    <p className="text-xs text-emerald-600 font-semibold mt-0.5">
                      ✓ Paid: ₹{student?.paidFee?.toLocaleString() || '12,000'} · Balance Dues: ₹0.00
                    </p>
                  </div>

                  <button
                    onClick={handleOpenInvoice}
                    className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <FileText className="w-4 h-4" />
                    <span>View Invoice</span>
                  </button>
                </div>

                {/* Direct mentor contact */}
                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center">
                      SK
                    </div>
                    <div>
                      <p className="font-bold text-amber-950">Have a practical doubt?</p>
                      <p className="text-amber-800 text-[11px]">Meet Sonu Sir during 07:00 AM – 09:30 AM or call</p>
                    </div>
                  </div>
                  <a
                    href="tel:+917050012501"
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg"
                  >
                    Call Sir
                  </a>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 2: SYLLABUS & MODULES */}
        {activeTab === 'syllabus' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Course Modules</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                {studentCourse.name} ({studentCourse.code})
              </h3>
              <p className="text-xs text-slate-500">12 Months Full Diploma Curriculum Breakdown</p>
            </div>

            <div className="space-y-4">
              {studentCourse.syllabus?.map((mod, i) => (
                <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-xs font-mono">
                        {mod.module}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">{mod.title}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-600 mt-2">
                      {mod.topics.map((t, tidx) => (
                        <span key={tidx} className="bg-white px-2.5 py-1 rounded-md border border-slate-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          <span>{t}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap self-start md:self-auto ${
                    i < 4 ? 'bg-emerald-100 text-emerald-800' :
                    i === 4 ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {i < 4 ? 'Completed' : i === 4 ? 'In Progress' : 'Upcoming'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: INVOICE & INSTALLMENTS */}
        {activeTab === 'invoice' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Fee Account</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Official Tax Invoice &amp; Payment Ledger</h3>
                <p className="text-xs text-slate-500">Invoice No: {studentInvoice.invoiceNo} · Date: {studentInvoice.date}</p>
              </div>

              <button
                onClick={handleOpenInvoice}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-2 self-start"
              >
                <Printer className="w-4 h-4" />
                <span>Open Printable Official Invoice</span>
              </button>
            </div>

            {/* Installments Breakdown Card */}
            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Payment Installments Record:</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {studentInvoice.installments.map((inst) => (
                  <div key={inst.no} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-blue-900">{inst.title}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        {inst.status}
                      </span>
                    </div>
                    <p className="text-xl font-black text-slate-900 font-mono">₹{inst.amount.toFixed(2)}</p>
                    <p className="text-slate-500 mt-1">Date: {inst.date}</p>
                    <p className="text-slate-500">Mode: {inst.mode} ({inst.ref})</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500">Net Fee Status:</span>
                <p className="text-lg font-bold text-slate-900">
                  Total ₹{studentInvoice.totalCourseFee.toFixed(2)} Paid in Full
                </p>
                <p className="text-xs text-emerald-600 font-semibold">Zero Balance Remaining (₹0.00)</p>
              </div>

              <button
                onClick={handleOpenInvoice}
                className="px-4 py-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-700"
              >
                View Full Breakdown with GST
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: TYPING LAB */}
        {activeTab === 'typing' && (
          <div>
            <TypingTestWidget onOpenAdmission={() => {}} />
          </div>
        )}

        {/* TAB 5: STUDY MATERIALS */}
        {activeTab === 'materials' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Free Student Library</span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">Download Study Notes &amp; Practice Materials</h3>
              <p className="text-xs text-slate-500">Authored and curated by Sonu Sir for Modern Delhi Infotech students</p>
            </div>

            <div className="divide-y divide-slate-200">
              {studyMaterials.map((mat, idx) => (
                <div key={idx} className="py-4 flex items-center justify-between text-xs hover:bg-slate-50 px-2 rounded-xl transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold font-mono">
                      {mat.format}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{mat.title}</h4>
                      <p className="text-[11px] text-slate-500">{mat.category} · {mat.size}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Downloading "${mat.title}"...`)}
                    className="px-3.5 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl border border-blue-200 flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: DIGITAL CERTIFICATE */}
        {activeTab === 'certificate' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Accreditation</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Certificate of Completion Preview</h3>
                <p className="text-xs text-slate-500">Regd. Govt. of India · Valid for Govt &amp; Corporate Jobs</p>
              </div>

              <button
                onClick={() => alert("Digital Certificate with QR verification code is ready for printing.")}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download E-Certificate</span>
              </button>
            </div>

            {/* Certificate Visual Replica */}
            <div className="max-w-2xl mx-auto p-8 rounded-3xl border-4 border-double border-amber-500/80 bg-gradient-to-b from-amber-50/20 via-white to-amber-50/20 text-center relative shadow-xl">
              <img
                src="/logo-icon.svg"
                alt="Emblem"
                className="w-16 h-16 mx-auto mb-2"
              />
              <h2 className="font-serif font-black text-2xl text-blue-950 tracking-wider">
                MODERN DELHI INFOTECH
              </h2>
              <p className="text-[10px] font-bold text-red-600 uppercase tracking-widest">
                COMPUTER EDUCATION &amp; TRAINING CENTRE · ESTD. 2017
              </p>
              <p className="text-[10px] text-slate-600">Regd. Govt. of India · Branch Code: 2 · Madhepura, Bihar</p>

              <div className="my-6">
                <span className="text-xs font-serif italic text-slate-500">This is to certify that</span>
                <h3 className="text-2xl font-serif font-extrabold text-slate-900 border-b border-slate-300 pb-1 max-w-sm mx-auto mt-1">
                  {student?.name || 'Rajeev Kumar'}
                </h3>
                <p className="text-xs text-slate-600 mt-2">
                  Son of <strong>{student?.fatherName || 'Suresh Prasad Yadav'}</strong>, having Registration No. <strong>{student?.regNo || 'MDI-B2-456'}</strong>, has successfully completed the program:
                </p>
                <div className="my-3 py-2 px-4 rounded-xl bg-blue-50 border border-blue-200 inline-block font-extrabold text-blue-950 text-sm">
                  {studentCourse.name} ({studentCourse.code})
                </div>
                <p className="text-xs text-slate-500">
                  Duration: {studentCourse.duration} · Session: 2026-27 · Grade: A+
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between text-xs">
                <div className="text-left text-[10px] text-slate-500">
                  <span>Issue Date: 31-Oct-2026</span>
                  <span className="block font-mono">Verify: moderndelhiinfotech.com</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-slate-900 text-xs">Sonu Kumar (Sonu Sir)</p>
                  <p className="text-[10px] text-slate-500">Director &amp; Chief Mentor (BCA, MCA)</p>
                </div>
              </div>
            </div>

          </div>
        )}

      </main>

    </div>
  );
};

export default StudentDashboard;

