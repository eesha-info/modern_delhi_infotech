import React, { useState } from 'react';
import {
  LayoutGrid, BookOpen, Receipt, Keyboard, Download, Award, Clock,
  Calendar, CheckCircle2, ArrowLeft, LogOut, Printer, ShieldCheck, User,
  FileText, Sparkles, ExternalLink, Check, X, AlertCircle, ChevronRight,
  TrendingUp, QrCode, Phone
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import StudentTests from './StudentTests';
import CertificateCard from '../common/CertificateCard';
import { useAppTheme } from '../../context/ThemeContext';
import Topbar from '../dashboard/Topbar';
import Sidebar from '../dashboard/Sidebar';
import Header from '../dashboard/Header';
import StatBox from '../dashboard/StatBox';
import ProgressCircle from '../dashboard/ProgressCircle';
import TypingTestWidget from '../home/TypingTestWidget';

const StudentDashboard = () => {
  const { user, logout, setActiveView } = useAuth();
  const { invoices, courses, batches, setActiveInvoice, students, certificates } = useData();
  const { colors, mode } = useAppTheme();

  // Tab State: 'dashboard' | 'attendance' | 'syllabus' | 'invoices' | 'typing' | 'materials' | 'certificate'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Prefer the live record so batch changes / payments made by the admin show up immediately
  const student = students.find((s) => s.regNo === user?.regNo) || user;
  const myCertificate = certificates.find((c) => c.regNo === student?.regNo);
  const courseCode = student?.courseCode || 'ADIT';
  const studentCourse = courses.find(c => c.code === courseCode) || courses[0];
  const studentInvoice = invoices.find(i => i.student?.regNo === student?.regNo) || invoices[0];

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
    <div
      style={{
        backgroundColor: colors.primary[500],
        color: colors.gray[100],
      }}
      className="min-h-screen flex font-sans antialiased transition-colors"
    >
      {/* 1. Left Fixed Sidebar */}
      <Sidebar
        role="student"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        user={user}
        onViewWebsite={() => setActiveView('landing')}
      />

      {/* 2. Main Content Wrapper */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'lg:ml-[72px]' : 'lg:ml-64'
        }`}
      >
        
        {/* Topbar with Mode Toggle & Search */}
        <Topbar
          user={user}
          role="student"
          onLogout={logout}
          onViewWebsite={() => setActiveView('landing')}
          onToggleSidebar={() => {
            if (typeof window !== 'undefined' && window.innerWidth < 1024) {
              setMobileSidebarOpen(!mobileSidebarOpen);
            } else {
              setIsCollapsed(!isCollapsed);
            }
          }}
        />

        {/* Main Body */}
        <main className="p-6 flex-1 space-y-6">
          
          {/* ===================== TAB: DASHBOARD (Overview) ===================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <Header
                  title="DASHBOARD"
                  subtitle={`Welcome back, ${student?.name || 'Rajeev Kumar'}`}
                />

                <button
                  onClick={() => setActiveInvoice(studentInvoice)}
                  style={{
                    backgroundColor: colors.blueAccent[700],
                    color: '#ffffff',
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-bold shadow-xs hover:opacity-90 transition-opacity"
                >
                  <Printer className="w-4 h-4" />
                  <span className="uppercase tracking-wider">OFFICIAL INVOICE</span>
                </button>
              </div>

              {/* ROW 1: 4 Stat Boxes (Exact layout & styling from screenshot!) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatBox
                  title={student?.courseCode || 'ADIT'}
                  subtitle={`${student?.duration || '12 Months'} Diploma`}
                  progress={0.65}
                  increase="65% Done"
                  icon={BookOpen}
                />
                <StatBox
                  title={student?.attendance || '94.2%'}
                  subtitle="Attendance Rate"
                  progress={0.94}
                  increase="48 Days"
                  icon={CheckCircle2}
                />
                <StatBox
                  title={`${student?.typingSpeed?.english || 42} WPM`}
                  subtitle={`Hindi: ${student?.typingSpeed?.hindi || 34} WPM`}
                  progress={0.7}
                  increase="Beltron Ready"
                  icon={Keyboard}
                />
                <StatBox
                  title={student?.balanceDues === 0 ? '₹ 0.00' : `₹ ${student?.balanceDues}`}
                  subtitle={student?.paymentStatus || 'FULLY PAID'}
                  progress={1.0}
                  increase="100% Paid"
                  icon={Receipt}
                />
              </div>

              {/* ROW 2: Student Digital ID Card & Modules Progress & Fee Card */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                
                {/* Official Student Digital ID Card */}
                <div
                  style={{ backgroundColor: colors.primary[400] }}
                  className="rounded-lg p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <img
                          src="/mdi-real-logo-cropped.png"
                          alt="MDI"
                          className="w-7 h-7 rounded-full bg-white p-0.5 object-contain"
                          onError={(e) => {
                            e.currentTarget.src = "/logo-icon.svg";
                          }}
                        />
                        <span style={{ color: colors.gray[100] }} className="font-bold text-xs">
                          MODERN DELHI INFOTECH
                        </span>
                      </div>
                      <span
                        style={{
                          backgroundColor: colors.primary[500],
                          color: colors.greenAccent[500]
                        }}
                        className="px-2 py-0.5 rounded text-[10px] font-bold"
                      >
                        Active 2026-27
                      </span>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <img
                        src={student?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"}
                        alt={student?.name}
                        className="w-14 h-14 rounded-full object-cover border border-white/10"
                      />
                      <div>
                        <h3 style={{ color: colors.gray[100] }} className="font-bold text-base">
                          {student?.name || 'Rajeev Kumar'}
                        </h3>
                        <p style={{ color: colors.gray[300] }} className="text-xs mt-0.5">
                          S/O: {student?.fatherName || 'Suresh Prasad Yadav'}
                        </p>
                        <span
                          style={{ color: colors.greenAccent[500] }}
                          className="font-mono text-xs font-bold block mt-1"
                        >
                          {student?.regNo || 'MDI-B2-456'}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <span style={{ color: colors.gray[400] }} className="block text-[10px]">Program:</span>
                        <strong style={{ color: colors.gray[100] }}>{student?.courseCode} (12M)</strong>
                      </div>
                      <div>
                        <span style={{ color: colors.gray[400] }} className="block text-[10px]">Lab PC:</span>
                        <strong style={{ color: colors.greenAccent[500] }} className="font-mono">{student?.pcNumber || 'PC-04'}</strong>
                      </div>
                      <div>
                        <span style={{ color: colors.gray[400] }} className="block text-[10px]">Batch Time:</span>
                        <span style={{ color: colors.gray[300] }}>{student?.batchTime || '08:00 AM – 09:30 AM'}</span>
                      </div>
                      <div>
                        <span style={{ color: colors.gray[400] }} className="block text-[10px]">Branch:</span>
                        <span style={{ color: colors.gray[300] }}>Branch 2 (Adarsh Nagar)</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px]">
                    <span style={{ color: colors.greenAccent[500] }}>Govt. Regd. Student ID</span>
                    <span style={{ color: colors.gray[400] }}>Director: Sonu Sir</span>
                  </div>
                </div>

                {/* Course Syllabus Progress Card */}
                <div
                  style={{ backgroundColor: colors.primary[400] }}
                  className="rounded-lg p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/5">
                      <h4 style={{ color: colors.gray[100] }} className="font-bold text-sm font-display">
                        {studentCourse.name}
                      </h4>
                      <span style={{ color: colors.greenAccent[500] }} className="text-xs font-bold">
                        {student?.progress || 65}% Done
                      </span>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span style={{ color: colors.gray[400] }}>Course Completion</span>
                        <span style={{ color: colors.gray[100] }} className="font-bold">{student?.progress || 65}%</span>
                      </div>
                      <div style={{ backgroundColor: colors.primary[500] }} className="w-full h-2 rounded-full overflow-hidden">
                        <div
                          style={{
                            backgroundColor: colors.greenAccent[500],
                            width: `${student?.progress || 65}%`
                          }}
                          className="h-full rounded-full transition-all"
                        ></div>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2 text-xs">
                      <div
                        style={{ backgroundColor: colors.primary[500] }}
                        className="p-2 rounded flex items-center justify-between"
                      >
                        <span style={{ color: colors.gray[100] }}>Module 1: Fundamentals &amp; Windows 11</span>
                        <span style={{ color: colors.greenAccent[500] }} className="text-[10px] font-bold">Done</span>
                      </div>
                      <div
                        style={{ backgroundColor: colors.primary[500] }}
                        className="p-2 rounded flex items-center justify-between"
                      >
                        <span style={{ color: colors.gray[100] }}>Module 2: MS Office Advanced Suite</span>
                        <span style={{ color: colors.greenAccent[500] }} className="text-[10px] font-bold">Done</span>
                      </div>
                      <div
                        style={{ backgroundColor: colors.primary[500] }}
                        className="p-2 rounded flex items-center justify-between"
                      >
                        <span style={{ color: colors.gray[100] }}>Module 3: Tally Prime 4.0 GST</span>
                        <span style={{ color: colors.blueAccent[400] }} className="text-[10px] font-bold">Active</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5">
                    <button
                      onClick={() => setActiveTab('syllabus')}
                      style={{ color: colors.blueAccent[400] }}
                      className="text-xs font-semibold hover:underline flex items-center justify-between w-full"
                    >
                      <span>Explore Full 12-Month Syllabus</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Fee & Invoices Card */}
                <div
                  style={{ backgroundColor: colors.primary[400] }}
                  className="rounded-lg p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/5">
                      <h4 style={{ color: colors.gray[100] }} className="font-bold text-sm font-display">
                        Fee Invoice &amp; Receipts
                      </h4>
                      <span
                        style={{
                          backgroundColor: colors.primary[500],
                          color: student?.balanceDues === 0 ? colors.greenAccent[500] : colors.redAccent[400]
                        }}
                        className="px-2 py-0.5 rounded text-[10px] font-bold"
                      >
                        {student?.paymentStatus || 'FULLY PAID'}
                      </span>
                    </div>

                    <div
                      style={{ backgroundColor: colors.primary[500] }}
                      className="mt-4 p-4 rounded-md space-y-2 text-xs"
                    >
                      <div style={{ color: colors.gray[400] }} className="text-[10px] uppercase font-bold">
                        Invoice No:
                      </div>
                      <div style={{ color: colors.greenAccent[500] }} className="font-mono font-bold text-sm">
                        {studentInvoice?.invoiceNo || 'MDI/B2/2026-27/0001'}
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span style={{ color: colors.gray[400] }}>Total Course Fee:</span>
                        <strong style={{ color: colors.gray[100] }}>₹{(studentInvoice?.totalCourseFee || 12000).toLocaleString()}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span style={{ color: colors.gray[400] }}>Paid Amount:</span>
                        <strong style={{ color: colors.greenAccent[500] }}>₹{(studentInvoice?.totalPaid || 12000).toLocaleString()}</strong>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-white/5 font-bold">
                        <span style={{ color: colors.gray[300] }}>Balance Dues:</span>
                        <span style={{ color: colors.greenAccent[500] }}>
                          {studentInvoice?.balanceDues === 0 ? '₹ 0.00 (NIL)' : `₹ ${studentInvoice?.balanceDues}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => setActiveInvoice(studentInvoice)}
                      style={{
                        backgroundColor: colors.blueAccent[700],
                        color: '#ffffff'
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md font-bold text-xs hover:opacity-90 transition-opacity"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Official GST Invoice</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* ROW 3: Recent Attendance Log & Typing Test Card */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                
                {/* Recent Attendance Activity Card */}
                <div
                  style={{ backgroundColor: colors.primary[400] }}
                  className="rounded-lg p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/5">
                      <h4 style={{ color: colors.gray[100] }} className="font-bold text-sm font-display">
                        Recent Lab Attendance Log
                      </h4>
                      <span style={{ color: colors.greenAccent[500] }} className="text-xs font-bold">
                        {student?.attendance || '94.2%'} Overall Rate
                      </span>
                    </div>

                    <div className="mt-3 divide-y divide-white/5 text-xs">
                      {attendanceHistory.slice(0, 4).map((att, i) => (
                        <div key={i} className="py-2.5 flex items-center justify-between">
                          <div>
                            <div style={{ color: colors.gray[100] }} className="font-bold">
                              {att.date} ({att.day})
                            </div>
                            <div style={{ color: colors.gray[400] }} className="text-[11px]">
                              {att.remark} · {att.pc}
                            </div>
                          </div>
                          <span
                            style={{
                              backgroundColor: colors.primary[500],
                              color: att.status === 'Present' ? colors.greenAccent[500] : colors.redAccent[400]
                            }}
                            className="px-2 py-0.5 rounded text-[10px] font-bold"
                          >
                            {att.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5">
                    <button
                      onClick={() => setActiveTab('attendance')}
                      style={{ color: colors.blueAccent[400] }}
                      className="text-xs font-semibold hover:underline flex items-center justify-between w-full"
                    >
                      <span>View Full Monthly Calendar &amp; Log</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Beltron Typing Test Practice Box */}
                <div
                  style={{ backgroundColor: colors.primary[400] }}
                  className="rounded-lg p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-white/5">
                      <span style={{ color: colors.gray[400] }} className="text-[10px] font-bold uppercase tracking-wider">
                        Bihar Beltron Standard
                      </span>
                      <span
                        style={{
                          backgroundColor: colors.primary[500],
                          color: colors.greenAccent[500]
                        }}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold"
                      >
                        Hindi + English
                      </span>
                    </div>

                    <h3 style={{ color: colors.gray[100] }} className="text-base font-bold mt-3 font-display">
                      Typing Speed &amp; Accuracy Practice Lab
                    </h3>
                    <p style={{ color: colors.gray[300] }} className="text-xs mt-1">
                      Practice with live timer to meet Bihar Beltron exam standards (30+ WPM Hindi, 40+ WPM English).
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div
                        style={{ backgroundColor: colors.primary[500] }}
                        className="p-3 rounded-md"
                      >
                        <span style={{ color: colors.gray[400] }} className="text-[10px] uppercase font-bold">English Speed</span>
                        <div style={{ color: colors.gray[100] }} className="text-2xl font-black mt-1 font-display">
                          {student?.typingSpeed?.english || 42} <span style={{ color: colors.gray[400] }} className="text-xs font-normal">WPM</span>
                        </div>
                      </div>
                      <div
                        style={{ backgroundColor: colors.primary[500] }}
                        className="p-3 rounded-md"
                      >
                        <span style={{ color: colors.gray[400] }} className="text-[10px] uppercase font-bold">Hindi Speed</span>
                        <div style={{ color: colors.gray[100] }} className="text-2xl font-black mt-1 font-display">
                          {student?.typingSpeed?.hindi || 34} <span style={{ color: colors.gray[400] }} className="text-xs font-normal">WPM</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <button
                      onClick={() => setActiveTab('typing')}
                      style={{
                        backgroundColor: colors.blueAccent[700],
                        color: '#ffffff'
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md font-bold text-xs hover:opacity-90 transition-opacity"
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
              <Header
                title="MY ATTENDANCE"
                subtitle={`Batch ${student?.batchNo || 'Batch-1'} (${student?.batchTime || '08:00 AM – 09:30 AM'})`}
              />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div style={{ backgroundColor: colors.primary[400] }} className="rounded-lg p-4 shadow-xs">
                  <span style={{ color: colors.gray[400] }} className="text-[10px] uppercase font-bold block">Total Days</span>
                  <div style={{ color: colors.gray[100] }} className="text-2xl font-black mt-1">53</div>
                  <span style={{ color: colors.gray[300] }} className="text-[10px]">Session 2026-27</span>
                </div>

                <div style={{ backgroundColor: colors.primary[400] }} className="rounded-lg p-4 shadow-xs">
                  <span style={{ color: colors.greenAccent[500] }} className="text-[10px] uppercase font-bold block">Present</span>
                  <div style={{ color: colors.gray[100] }} className="text-2xl font-black mt-1">48</div>
                  <span style={{ color: colors.greenAccent[500] }} className="text-[10px]">Attended Lab</span>
                </div>

                <div style={{ backgroundColor: colors.primary[400] }} className="rounded-lg p-4 shadow-xs">
                  <span style={{ color: colors.blueAccent[400] }} className="text-[10px] uppercase font-bold block">Late</span>
                  <div style={{ color: colors.gray[100] }} className="text-2xl font-black mt-1">2</div>
                  <span style={{ color: colors.blueAccent[400] }} className="text-[10px]">Permitted</span>
                </div>

                <div style={{ backgroundColor: colors.primary[400] }} className="rounded-lg p-4 shadow-xs">
                  <span style={{ color: colors.redAccent[400] }} className="text-[10px] uppercase font-bold block">Absent</span>
                  <div style={{ color: colors.gray[100] }} className="text-2xl font-black mt-1">3</div>
                  <span style={{ color: colors.redAccent[400] }} className="text-[10px]">Leave</span>
                </div>
              </div>

              {/* Attendance Log Table */}
              <div
                style={{ backgroundColor: colors.primary[400] }}
                className="rounded-lg overflow-hidden shadow-xs"
              >
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                  <h3 style={{ color: colors.gray[100] }} className="text-sm font-bold">
                    Lab Session Log
                  </h3>
                  <span style={{ color: colors.gray[400] }} className="text-xs">Showing last 8 sessions</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr
                        style={{
                          backgroundColor: colors.primary[500],
                          color: colors.gray[300]
                        }}
                        className="text-[11px] font-bold uppercase tracking-wider border-b border-white/5"
                      >
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Day</th>
                        <th className="py-3 px-4">Batch Timing</th>
                        <th className="py-3 px-4">Lab PC</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Mentor Note</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {attendanceHistory.map((att, idx) => (
                        <tr key={idx} className="hover:opacity-90 transition-opacity">
                          <td style={{ color: colors.gray[100] }} className="py-3.5 px-4 font-bold">
                            {att.date}
                          </td>
                          <td style={{ color: colors.gray[300] }} className="py-3.5 px-4">
                            {att.day}
                          </td>
                          <td style={{ color: colors.gray[400] }} className="py-3.5 px-4 font-mono">
                            {att.batch}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              style={{
                                backgroundColor: colors.primary[500],
                                color: colors.gray[100]
                              }}
                              className="font-mono px-2 py-0.5 rounded text-[11px]"
                            >
                              {att.pc}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              style={{
                                color: att.status === 'Present' ? colors.greenAccent[500] : colors.redAccent[400]
                              }}
                              className="font-bold text-[11px]"
                            >
                              {att.status}
                            </span>
                          </td>
                          <td style={{ color: colors.gray[400] }} className="py-3.5 px-4">
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
              <Header
                title="COURSE &amp; SYLLABUS"
                subtitle={`${studentCourse.name} (${studentCourse.code}) · ${studentCourse.duration}`}
              />

              <div className="space-y-4">
                {studentCourse.syllabus?.map((mod, idx) => (
                  <div
                    key={idx}
                    style={{ backgroundColor: colors.primary[400] }}
                    className="p-5 rounded-lg shadow-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          style={{
                            backgroundColor: colors.primary[500],
                            color: colors.greenAccent[500]
                          }}
                          className="w-8 h-8 rounded-md font-bold text-xs flex items-center justify-center flex-shrink-0"
                        >
                          {idx + 1}
                        </div>
                        <div>
                          <span style={{ color: colors.gray[400] }} className="text-[10px] font-bold uppercase tracking-wider">
                            {mod.module}
                          </span>
                          <h3 style={{ color: colors.gray[100] }} className="text-sm font-bold mt-0.5">
                            {mod.title}
                          </h3>
                        </div>
                      </div>

                      <span
                        style={{
                          color: idx < 2 ? colors.greenAccent[500] : idx === 2 ? colors.blueAccent[400] : colors.gray[400]
                        }}
                        className="text-xs font-bold"
                      >
                        {idx < 2 ? 'Completed' : idx === 2 ? 'In Progress' : 'Upcoming'}
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5">
                      <span style={{ color: colors.gray[400] }} className="text-[10px] font-bold uppercase tracking-wider block mb-2">
                        Topics Covered:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {mod.topics.map((t, ti) => (
                          <span
                            key={ti}
                            style={{
                              backgroundColor: colors.primary[500],
                              color: colors.gray[100]
                            }}
                            className="text-xs px-2.5 py-1 rounded-md"
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <Header
                  title="MY FEE INVOICES"
                  subtitle="Official GST Tax Invoices and payment installments"
                />

                <button
                  onClick={() => setActiveInvoice(studentInvoice)}
                  style={{
                    backgroundColor: colors.blueAccent[700],
                    color: '#ffffff'
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md font-bold text-xs hover:opacity-90 transition-opacity"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Authentic Invoice Replica</span>
                </button>
              </div>

              {/* Invoice Detail Box */}
              <div
                style={{ backgroundColor: colors.primary[400] }}
                className="p-6 rounded-lg shadow-xs space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/5">
                  <div>
                    <span style={{ color: colors.gray[400] }} className="text-[10px] uppercase font-bold tracking-wider">
                      Tax Invoice Number
                    </span>
                    <div style={{ color: colors.greenAccent[500] }} className="text-base font-mono font-bold mt-0.5">
                      {studentInvoice?.invoiceNo || 'MDI/B2/2026-27/0001'}
                    </div>
                    <span style={{ color: colors.gray[400] }} className="text-xs">
                      Date: {studentInvoice?.date} · Session 2026-27
                    </span>
                  </div>

                  <div>
                    <span
                      style={{
                        backgroundColor: colors.primary[500],
                        color: colors.greenAccent[500]
                      }}
                      className="px-3 py-1 rounded text-xs font-bold"
                    >
                      {studentInvoice?.status || 'FULLY PAID'}
                    </span>
                  </div>
                </div>

                {/* Particulars Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr
                        style={{
                          backgroundColor: colors.primary[500],
                          color: colors.gray[300]
                        }}
                        className="text-[10px] font-bold uppercase border-b border-white/5"
                      >
                        <th className="py-2.5 px-4">Sr.</th>
                        <th className="py-2.5 px-4">Particulars</th>
                        <th className="py-2.5 px-4 text-right">Amount (₹)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr>
                        <td className="py-3 px-4 font-semibold">1</td>
                        <td className="py-3 px-4">
                          <div style={{ color: colors.gray[100] }} className="font-bold">
                            Course Fee — {studentInvoice?.course?.code || 'ADIT'}
                          </div>
                          <div style={{ color: colors.gray[400] }} className="text-[11px]">
                            {studentInvoice?.course?.name} (12 Months)
                          </div>
                        </td>
                        <td style={{ color: colors.gray[100] }} className="py-3 px-4 text-right font-bold">
                          ₹{(studentInvoice?.totalCourseFee || 12000).toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-white/5">
                        <td colSpan="2" style={{ color: colors.gray[400] }} className="py-2 px-4 text-right">
                          CGST (9%) Included:
                        </td>
                        <td style={{ color: colors.gray[300] }} className="py-2 px-4 text-right font-mono">
                          - ₹{(studentInvoice?.feeParticulars?.cgst9Percent || 915.25).toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2" style={{ color: colors.gray[400] }} className="py-2 px-4 text-right">
                          SGST (9%) Included:
                        </td>
                        <td style={{ color: colors.gray[300] }} className="py-2 px-4 text-right font-mono">
                          - ₹{(studentInvoice?.feeParticulars?.sgst9Percent || 915.25).toFixed(2)}
                        </td>
                      </tr>
                      <tr style={{ backgroundColor: colors.primary[500] }}>
                        <td colSpan="2" style={{ color: colors.gray[100] }} className="py-2.5 px-4 text-right font-bold">
                          Total Course Fee Payable:
                        </td>
                        <td style={{ color: colors.greenAccent[500] }} className="py-2.5 px-4 text-right font-bold text-sm">
                          ₹{(studentInvoice?.totalCourseFee || 12000).toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                {/* Installments Table */}
                <div>
                  <h4 style={{ color: colors.gray[100] }} className="text-xs font-bold uppercase tracking-wider mb-2">
                    Installment &amp; Payment Record
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr
                          style={{
                            backgroundColor: colors.primary[500],
                            color: colors.gray[300]
                          }}
                          className="text-[10px] font-bold uppercase border-b border-white/5"
                        >
                          <th className="py-2.5 px-4">#</th>
                          <th className="py-2.5 px-4">Installment</th>
                          <th className="py-2.5 px-4">Date</th>
                          <th className="py-2.5 px-4">Mode</th>
                          <th className="py-2.5 px-4">Status</th>
                          <th className="py-2.5 px-4 text-right">Amount (₹)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {studentInvoice?.installments?.map((inst) => (
                          <tr key={inst.no}>
                            <td className="py-3 px-4 font-semibold">{inst.no}</td>
                            <td style={{ color: colors.gray[100] }} className="py-3 px-4 font-bold">{inst.title}</td>
                            <td style={{ color: colors.gray[400] }} className="py-3 px-4">{inst.date}</td>
                            <td style={{ color: colors.gray[300] }} className="py-3 px-4 font-mono">{inst.mode}</td>
                            <td className="py-3 px-4">
                              <span style={{ color: colors.greenAccent[500] }} className="font-bold text-[11px]">
                                {inst.status}
                              </span>
                            </td>
                            <td style={{ color: colors.gray[100] }} className="py-3 px-4 text-right font-bold">
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
              <Header
                title="TYPING SPEED LAB"
                subtitle="Bihar Beltron Hindi (KrutiDev) &amp; English practice simulation"
              />

              <TypingTestWidget />
            </div>
          )}

          {/* ===================== TAB: MATERIALS ===================== */}
          {activeTab === 'materials' && (
            <div className="space-y-6">
              <Header
                title="STUDY MATERIALS"
                subtitle="Free downloadable PDF course books and handbooks by Sonu Sir"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {studyMaterials.map((mat, idx) => (
                  <div
                    key={idx}
                    style={{ backgroundColor: colors.primary[400] }}
                    className="p-5 rounded-lg shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span
                          style={{
                            backgroundColor: colors.primary[500],
                            color: colors.greenAccent[500]
                          }}
                          className="text-[10px] font-bold uppercase px-2 py-0.5 rounded"
                        >
                          {mat.format}
                        </span>
                        <span style={{ color: colors.gray[400] }} className="text-[10px]">{mat.size}</span>
                      </div>

                      <h3 style={{ color: colors.gray[100] }} className="font-bold text-sm mt-3 leading-snug">
                        {mat.title}
                      </h3>
                      <span style={{ color: colors.gray[400] }} className="text-[11px] mt-1 block">
                        Category: {mat.category}
                      </span>
                    </div>

                    <div className="mt-5 pt-3 border-t border-white/5">
                      <button
                        onClick={() => alert(`Downloading "${mat.title}" (${mat.size})...`)}
                        style={{
                          backgroundColor: colors.primary[500],
                          color: colors.gray[100]
                        }}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md font-semibold text-xs hover:opacity-80 transition-opacity"
                      >
                        <Download className="w-3.5 h-3.5 text-slate-400" />
                        <span>Download Handbook</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {activeTab === 'tests' && <StudentTests student={student} />}

          {/* ===================== TAB: CERTIFICATE ===================== */}
          {activeTab === 'certificate' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <Header
                  title="DIGITAL CERTIFICATE"
                  subtitle="Govt. of India registered completion certificate preview"
                />

                {myCertificate && (
                  <button
                    onClick={() => window.print()}
                    style={{
                      backgroundColor: colors.blueAccent[700],
                      color: '#ffffff'
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md font-bold text-xs hover:opacity-90 transition-opacity"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Certificate</span>
                  </button>
                )}
              </div>

              {myCertificate ? (
                <CertificateCard cert={myCertificate} />
              ) : (
                <div
                  style={{ backgroundColor: colors.primary[400], color: colors.gray[300] }}
                  className="rounded-lg p-10 text-center max-w-2xl mx-auto"
                >
                  <Award className="w-10 h-10 mx-auto mb-3 text-amber-400" />
                  <p style={{ color: colors.gray[100] }} className="font-bold">Your certificate hasn't been issued yet</p>
                  <p className="text-xs mt-1">
                    It is issued by the Director after your course is complete, fees are fully paid, attendance is 75% or more,
                    and you have passed your online tests.
                  </p>
                </div>
              )}

            </div>
          )}

        </main>
      </div>

    </div>
  );
};

export default StudentDashboard;
