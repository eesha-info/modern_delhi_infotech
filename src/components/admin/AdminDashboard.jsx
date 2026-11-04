import React, { useState } from 'react';
import {
  Users, Receipt, Mail, Clock, Download,
  Printer, UserPlus, CheckSquare, PlusCircle, Search, Phone,
  Check, X, FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useAppTheme } from '../../context/ThemeContext';
import Topbar from '../dashboard/Topbar';
import Sidebar from '../dashboard/Sidebar';
import Header from '../dashboard/Header';
import StatBox from '../dashboard/StatBox';
import ProgressCircle from '../dashboard/ProgressCircle';
import RevenueChart from '../dashboard/RevenueChart';
import AdminTakeAttendance from './AdminTakeAttendance';

const AdminDashboard = () => {
  const { user, logout, setActiveView } = useAuth();
  const {
    students,
    invoices,
    enquiries,
    batches,
    courses,
    setActiveInvoice,
    addStudent,
    updateEnquiryStatus
  } = useData();
  const { colors, mode } = useAppTheme();

  // Tab State: 'dashboard' | 'attendance' | 'students' | 'invoices' | 'enquiries' | 'batches'
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Student Search & Filter
  const [studentSearch, setStudentSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  // New Student Modal Form State
  const [newStudent, setNewStudent] = useState({
    name: '',
    fatherName: '',
    mobile: '',
    address: 'Adarsh Nagar, Madhepura',
    courseCode: 'ADIT',
    courseName: 'Advanced Diploma in Information Technology',
    duration: '12 Months',
    branchCode: '2',
    batchNo: 'Batch-1',
    batchTime: '08:00 AM – 09:30 AM',
    totalFee: 12000,
    paidFee: 6000,
    paymentMode: 'Cash'
  });

  // Calculate Key Stats
  const totalStudents = students.length;
  const totalRevenue = invoices.reduce((acc, inv) => acc + (inv.totalPaid || 0), 0);
  const totalDues = invoices.reduce((acc, inv) => acc + (inv.balanceDues || 0), 0);
  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;

  // Filtered Students
  const filteredStudents = students.filter(s => {
    const matchesSearch =
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.regNo.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.mobile.includes(studentSearch);
    const matchesCourse = courseFilter === 'All' || s.courseCode === courseFilter;
    return matchesSearch && matchesCourse;
  });

  const handleCreateStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.mobile) return;

    addStudent(newStudent);
    setIsAddStudentOpen(false);
    setNewStudent({
      name: '',
      fatherName: '',
      mobile: '',
      address: 'Adarsh Nagar, Madhepura',
      courseCode: 'ADIT',
      courseName: 'Advanced Diploma in Information Technology',
      duration: '12 Months',
      branchCode: '2',
      batchNo: 'Batch-1',
      batchTime: '08:00 AM – 09:30 AM',
      totalFee: 12000,
      paidFee: 6000,
      paymentMode: 'Cash'
    });
    setActiveTab('students');
  };

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
        role="admin"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        mobileOpen={mobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
        user={user}
        onViewWebsite={() => setActiveView('landing')}
      />

      {/* 2. Main Content Wrapper (Smoothly shifts when sidebar collapses) */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'lg:ml-[72px]' : 'lg:ml-64'
        }`}
      >
        
        {/* Topbar with Mode Toggle & Search */}
        <Topbar
          user={user}
          role="admin"
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
          
          {/* ===================== TAB: DASHBOARD ===================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Header Title + Download Reports Action Button (Exact layout in screenshot!) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <Header
                  title="DASHBOARD"
                  subtitle="Welcome to your dashboard"
                />

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab('attendance')}
                    style={{
                      backgroundColor: colors.blueAccent[700],
                      color: '#ffffff',
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-bold shadow-xs hover:opacity-90 transition-opacity"
                  >
                    <Download className="w-4 h-4" />
                    <span className="uppercase tracking-wider">DOWNLOAD REPORTS</span>
                  </button>
                </div>
              </div>

              {/* ROW 1: 4 Stat Boxes (Exact layout & styling from screenshot!) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <StatBox
                  title="11,361"
                  subtitle="Email Sent"
                  progress={0.75}
                  increase="+14%"
                  icon={Mail}
                />
                <StatBox
                  title="431,225"
                  subtitle="Sales Obtained"
                  progress={0.5}
                  increase="+21%"
                  icon={Receipt}
                />
                <StatBox
                  title="32,441"
                  subtitle="New Clients"
                  progress={0.3}
                  increase="+5%"
                  icon={Users}
                />
                <StatBox
                  title="1,325,134"
                  subtitle="Traffic Received"
                  progress={0.8}
                  increase="+43%"
                  icon={Clock}
                />
              </div>

              {/* ROW 2: Revenue Generated Multi-Line Chart (8 cols) & Recent Transactions (4 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* 8 Cols: Revenue Generated Multi-curve SVG Chart */}
                <div className="lg:col-span-8">
                  <RevenueChart totalRevenue={totalRevenue} />
                </div>

                {/* 4 Cols: Recent Transactions Box */}
                <div
                  style={{ backgroundColor: colors.primary[400] }}
                  className="lg:col-span-4 rounded-lg p-5 shadow-xs flex flex-col justify-between"
                >
                  <div className="pb-3 border-b border-white/5 flex items-center justify-between">
                    <h4
                      style={{ color: colors.gray[100] }}
                      className="font-bold text-sm font-display uppercase tracking-wider"
                    >
                      Recent Transactions
                    </h4>
                    <span style={{ color: colors.greenAccent[500] }} className="text-xs font-semibold">
                      {invoices.length} Invoiced
                    </span>
                  </div>

                  {/* Transactions List */}
                  <div className="divide-y divide-white/5 overflow-y-auto max-h-80 text-xs">
                    {invoices.slice(0, 6).map((inv, idx) => (
                      <div key={idx} className="py-3 flex items-center justify-between gap-2">
                        <div>
                          <div
                            style={{ color: colors.greenAccent[500] }}
                            className="font-mono font-bold text-xs"
                          >
                            {inv.invoiceNo}
                          </div>
                          <div style={{ color: colors.gray[100] }} className="font-semibold text-xs mt-0.5">
                            {inv.student?.name}
                          </div>
                          <div style={{ color: colors.gray[400] }} className="text-[10px]">
                            {inv.date}
                          </div>
                        </div>

                        {/* Amount Pill (Exact green pill in screenshot!) */}
                        <div className="flex flex-col items-end gap-1">
                          <span
                            style={{
                              backgroundColor: colors.greenAccent[500],
                              color: '#ffffff',
                            }}
                            className="px-2.5 py-1 rounded text-xs font-bold font-mono"
                          >
                            ₹{(inv.totalPaid || 0).toLocaleString()}
                          </span>
                          <button
                            onClick={() => setActiveInvoice(inv)}
                            style={{ color: colors.blueAccent[400] }}
                            className="text-[10px] hover:underline"
                          >
                            View PDF
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* ROW 3: Campaign (4 cols), Sales Quantity (4 cols), Geography / Batches (4 cols) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                
                {/* Campaign Card with Center Progress Circle */}
                <div
                  style={{ backgroundColor: colors.primary[400] }}
                  className="rounded-lg p-5 shadow-xs flex flex-col justify-between"
                >
                  <h4 style={{ color: colors.gray[100] }} className="font-bold text-sm font-display">
                    Campaign
                  </h4>

                  <div className="flex flex-col items-center justify-center my-4">
                    <ProgressCircle progress={0.74} size={115} />
                    <div style={{ color: colors.greenAccent[500] }} className="text-lg font-bold mt-3">
                      ₹{totalRevenue.toLocaleString()} Revenue
                    </div>
                    <p style={{ color: colors.gray[300] }} className="text-xs text-center mt-1">
                      74% of Session 2026-27 admission target achieved
                    </p>
                  </div>
                </div>

                {/* Sales Quantity / Course Admissions Bar Box */}
                <div
                  style={{ backgroundColor: colors.primary[400] }}
                  className="rounded-lg p-5 shadow-xs flex flex-col justify-between"
                >
                  <h4 style={{ color: colors.gray[100] }} className="font-bold text-sm font-display">
                    Course Admissions
                  </h4>

                  <div className="space-y-3 my-4 text-xs">
                    {courses.slice(0, 4).map((c, i) => {
                      const count = students.filter(s => s.courseCode === c.code).length;
                      const percent = Math.min(100, Math.round((count / 10) * 100));
                      return (
                        <div key={i}>
                          <div className="flex items-center justify-between mb-1">
                            <span style={{ color: colors.gray[100] }} className="font-semibold">{c.code}</span>
                            <span style={{ color: colors.gray[300] }}>{count} Enrolled</span>
                          </div>
                          <div style={{ backgroundColor: colors.primary[500] }} className="w-full h-2 rounded-full overflow-hidden">
                            <div
                              style={{
                                backgroundColor: i % 2 === 0 ? colors.greenAccent[500] : colors.blueAccent[500],
                                width: `${percent}%`
                              }}
                              className="h-full rounded-full"
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Batches Occupancy Box */}
                <div
                  style={{ backgroundColor: colors.primary[400] }}
                  className="rounded-lg p-5 shadow-xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <h4 style={{ color: colors.gray[100] }} className="font-bold text-sm font-display">
                      Lab Batches &amp; Timings
                    </h4>
                    <button
                      onClick={() => setActiveTab('attendance')}
                      style={{ color: colors.greenAccent[500] }}
                      className="text-xs hover:underline"
                    >
                      Mark Attendance
                    </button>
                  </div>

                  <div className="space-y-2.5 my-3 text-xs">
                    {batches.slice(0, 4).map((b) => (
                      <div
                        key={b.id}
                        style={{ backgroundColor: colors.primary[500] }}
                        className="p-2.5 rounded-md flex items-center justify-between"
                      >
                        <div>
                          <div style={{ color: colors.gray[100] }} className="font-bold">
                            {b.id} · {b.name.split('(')[0]}
                          </div>
                          <div style={{ color: colors.gray[400] }} className="text-[10px]">
                            {b.timing} · {b.room}
                          </div>
                        </div>
                        <span
                          style={{
                            backgroundColor: colors.primary[400],
                            color: colors.greenAccent[500]
                          }}
                          className="px-2 py-0.5 rounded text-[11px] font-bold"
                        >
                          {b.enrolled}/{b.maxCapacity} PCs
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ===================== TAB: ATTENDANCE (Batchwise) ===================== */}
          {activeTab === 'attendance' && (
            <AdminTakeAttendance />
          )}

          {/* ===================== TAB: STUDENTS ===================== */}
          {activeTab === 'students' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <Header
                  title="STUDENTS ROSTER"
                  subtitle="Managing all registered students and lab allocations"
                />

                <button
                  onClick={() => setIsAddStudentOpen(true)}
                  style={{
                    backgroundColor: colors.blueAccent[700],
                    color: '#ffffff',
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md text-xs font-bold hover:opacity-90 transition-opacity"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>REGISTER NEW STUDENT</span>
                </button>
              </div>

              {/* Filters */}
              <div
                style={{ backgroundColor: colors.primary[400] }}
                className="p-4 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div
                    style={{ backgroundColor: colors.primary[500] }}
                    className="flex items-center rounded-md px-3 py-1.5 w-72"
                  >
                    <input
                      type="text"
                      placeholder="Search by name, roll no, mobile..."
                      value={studentSearch}
                      onChange={(e) => setStudentSearch(e.target.value)}
                      style={{ color: colors.gray[100] }}
                      className="bg-transparent border-none outline-none text-xs flex-1 placeholder:text-slate-400"
                    />
                    <Search className="w-4 h-4 text-slate-400" />
                  </div>

                  <select
                    value={courseFilter}
                    onChange={(e) => setCourseFilter(e.target.value)}
                    style={{
                      backgroundColor: colors.primary[500],
                      color: colors.gray[100],
                    }}
                    className="rounded-md px-3 py-1.5 text-xs font-semibold outline-none cursor-pointer"
                  >
                    <option value="All">All Courses</option>
                    <option value="ADIT">ADIT (12M)</option>
                    <option value="ADCA">ADCA (12M)</option>
                    <option value="DCA">DCA (6M)</option>
                    <option value="TALLY">Tally Prime (3M)</option>
                    <option value="TYPING">Beltron Typing (3M)</option>
                  </select>
                </div>

                <span style={{ color: colors.gray[300] }} className="text-xs">
                  Showing {filteredStudents.length} of {students.length} students
                </span>
              </div>

              {/* Students Data Grid Table */}
              <div
                style={{ backgroundColor: colors.primary[400] }}
                className="rounded-lg overflow-hidden shadow-xs"
              >
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
                        <th className="py-3 px-4">Student</th>
                        <th className="py-3 px-4">Father Name &amp; Contact</th>
                        <th className="py-3 px-4">Course &amp; Batch</th>
                        <th className="py-3 px-4">PC Station</th>
                        <th className="py-3 px-4">Fee Dues</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredStudents.map((st) => (
                        <tr key={st.id} className="hover:opacity-90 transition-opacity">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={st.avatar}
                                alt={st.name}
                                className="w-9 h-9 rounded-full object-cover border border-white/10"
                                onError={(e) => {
                                  e.currentTarget.src = "/logo-icon.svg";
                                }}
                              />
                              <div>
                                <div style={{ color: colors.gray[100] }} className="font-bold text-sm">
                                  {st.name}
                                </div>
                                <div style={{ color: colors.greenAccent[500] }} className="font-mono text-[10px]">
                                  {st.regNo} (Roll: {st.rollNo})
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div style={{ color: colors.gray[100] }}>{st.fatherName}</div>
                            <div style={{ color: colors.gray[400] }} className="text-[11px] mt-0.5">
                              {st.mobile}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div style={{ color: colors.gray[100] }} className="font-bold">
                              {st.courseCode}
                            </div>
                            <div style={{ color: colors.gray[400] }} className="text-[11px]">
                              {st.batchNo} ({st.batchTime})
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span
                              style={{
                                backgroundColor: colors.primary[500],
                                color: colors.gray[100]
                              }}
                              className="font-mono px-2 py-0.5 rounded text-[11px]"
                            >
                              {st.pcNumber || 'PC-01'}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <div style={{ color: colors.gray[100] }} className="font-bold">
                              ₹{(st.totalFee || 0).toLocaleString()}
                            </div>
                            <span
                              style={{
                                color: st.balanceDues === 0 ? colors.greenAccent[500] : colors.redAccent[400]
                              }}
                              className="text-[10px] font-bold block"
                            >
                              {st.balanceDues === 0 ? 'FULLY PAID' : `Due: ₹${st.balanceDues}`}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => {
                                const matching = invoices.find(inv => inv.student?.regNo === st.regNo) || invoices[0];
                                setActiveInvoice(matching);
                              }}
                              style={{
                                backgroundColor: colors.primary[500],
                                color: colors.gray[100]
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold hover:opacity-80 transition-opacity"
                            >
                              <Printer className="w-3.5 h-3.5 text-slate-400" />
                              <span>Invoice</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ===================== TAB: INVOICES ===================== */}
          {activeTab === 'invoices' && (
            <div className="space-y-6">
              <Header
                title="INVOICES BALANCES"
                subtitle="Official GST Tax Invoices and student fee installment tracking"
              />

              <div
                style={{ backgroundColor: colors.primary[400] }}
                className="rounded-lg overflow-hidden shadow-xs"
              >
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
                        <th className="py-3 px-4">Invoice #</th>
                        <th className="py-3 px-4">Student</th>
                        <th className="py-3 px-4">Course</th>
                        <th className="py-3 px-4">Total</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Print PDF</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {invoices.map((inv, idx) => (
                        <tr key={idx} className="hover:opacity-90 transition-opacity">
                          <td className="py-3.5 px-4">
                            <span style={{ color: colors.greenAccent[500] }} className="font-mono font-bold block">
                              {inv.invoiceNo}
                            </span>
                            <span style={{ color: colors.gray[400] }} className="text-[10px]">{inv.date}</span>
                          </td>

                          <td className="py-3.5 px-4">
                            <div style={{ color: colors.gray[100] }} className="font-bold">{inv.student?.name}</div>
                            <div style={{ color: colors.gray[400] }} className="text-[10px]">{inv.student?.regNo}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div style={{ color: colors.gray[100] }}>{inv.course?.code}</div>
                            <div style={{ color: colors.gray[400] }} className="text-[10px]">{inv.course?.name}</div>
                          </td>

                          <td className="py-3.5 px-4">
                            <div style={{ color: colors.gray[100] }} className="font-bold">
                              ₹{(inv.totalCourseFee || 0).toLocaleString()}
                            </div>
                            <div style={{ color: colors.gray[400] }} className="text-[10px]">
                              Paid: ₹{(inv.totalPaid || 0).toLocaleString()}
                            </div>
                          </td>

                          <td className="py-3.5 px-4">
                            <span
                              style={{
                                color: inv.status === 'FULLY PAID' ? colors.greenAccent[500] : colors.redAccent[400]
                              }}
                              className="text-[10px] font-bold block"
                            >
                              {inv.status}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => setActiveInvoice(inv)}
                              style={{
                                backgroundColor: colors.blueAccent[700],
                                color: '#ffffff'
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold hover:opacity-90 transition-opacity"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>View PDF</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ===================== TAB: ENQUIRIES ===================== */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <Header
                title="WEBSITE LEADS"
                subtitle="Inquiries submitted via the Modern Delhi Infotech public portal"
              />

              <div
                style={{ backgroundColor: colors.primary[400] }}
                className="rounded-lg overflow-hidden shadow-xs"
              >
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
                        <th className="py-3 px-4">Applicant</th>
                        <th className="py-3 px-4">Phone</th>
                        <th className="py-3 px-4">Course</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {enquiries.map((enq) => (
                        <tr key={enq.id} className="hover:opacity-90 transition-opacity">
                          <td style={{ color: colors.gray[400] }} className="py-3.5 px-4">
                            {enq.date}
                          </td>
                          <td style={{ color: colors.gray[100] }} className="py-3.5 px-4 font-bold">
                            {enq.name}
                          </td>
                          <td style={{ color: colors.gray[100] }} className="py-3.5 px-4 font-mono">
                            {enq.phone}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              style={{
                                backgroundColor: colors.primary[500],
                                color: colors.greenAccent[500]
                              }}
                              className="px-2 py-0.5 rounded text-[11px] font-semibold"
                            >
                              {enq.course || 'ADIT'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={enq.status}
                              onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                              style={{
                                backgroundColor: colors.primary[500],
                                color: colors.gray[100]
                              }}
                              className="text-[11px] font-semibold rounded-md px-2 py-1 outline-none cursor-pointer"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Enrolled">Enrolled</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <a
                              href={`tel:${enq.phone}`}
                              style={{
                                backgroundColor: colors.greenAccent[600],
                                color: '#ffffff'
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold hover:opacity-90 transition-opacity"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>Call</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ===================== TAB: BATCHES ===================== */}
          {activeTab === 'batches' && (
            <div className="space-y-6">
              <Header
                title="BATCHES &amp; TIMINGS"
                subtitle="Institute classroom slots across Branch 1 and Branch 2"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {batches.map((batch) => (
                  <div
                    key={batch.id}
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
                          className="text-xs font-bold px-2 py-0.5 rounded"
                        >
                          {batch.id}
                        </span>
                        <span style={{ color: colors.gray[400] }} className="text-xs">
                          {batch.branch}
                        </span>
                      </div>

                      <h3 style={{ color: colors.gray[100] }} className="font-bold text-sm mt-3">
                        {batch.name}
                      </h3>

                      <div style={{ color: colors.gray[300] }} className="mt-2 space-y-1 text-xs">
                        <div>Timing: <strong style={{ color: colors.gray[100] }}>{batch.timing}</strong></div>
                        <div>Room: <strong style={{ color: colors.gray[100] }}>{batch.room}</strong></div>
                        <div>Mentor: <strong style={{ color: colors.gray[100] }}>{batch.instructor}</strong></div>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
                      <span style={{ color: colors.gray[400] }} className="text-xs">
                        Capacity: {batch.enrolled}/{batch.maxCapacity} PCs
                      </span>
                      <button
                        onClick={() => setActiveTab('attendance')}
                        style={{ color: colors.greenAccent[500] }}
                        className="text-xs font-semibold hover:underline"
                      >
                        Take Attendance
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ===================== TAB: PROFILE FORM ===================== */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <Header title="PROFILE FORM" subtitle="Create and edit mentor & institute administrator details" />
              <div style={{ backgroundColor: colors.primary[400] }} className="p-6 rounded-lg shadow-xs max-w-3xl">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Profile details saved successfully!"); }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label style={{ color: colors.gray[300] }} className="text-xs block mb-1">Full Name</label>
                      <input defaultValue="Sonu Kumar" style={{ backgroundColor: colors.primary[500], color: colors.gray[100] }} className="w-full px-3 py-2 text-xs rounded border border-white/10 outline-none" />
                    </div>
                    <div>
                      <label style={{ color: colors.gray[300] }} className="text-xs block mb-1">Designation</label>
                      <input defaultValue="Director" style={{ backgroundColor: colors.primary[500], color: colors.gray[100] }} className="w-full px-3 py-2 text-xs rounded border border-white/10 outline-none" />
                    </div>
                    <div>
                      <label style={{ color: colors.gray[300] }} className="text-xs block mb-1">Direct Contact</label>
                      <input defaultValue="+91 70500 12501" style={{ backgroundColor: colors.primary[500], color: colors.gray[100] }} className="w-full px-3 py-2 text-xs rounded border border-white/10 outline-none" />
                    </div>
                    <div>
                      <label style={{ color: colors.gray[300] }} className="text-xs block mb-1">Qualifications</label>
                      <input defaultValue="BCA, MCA · 10+ Years Experience" style={{ backgroundColor: colors.primary[500], color: colors.gray[100] }} className="w-full px-3 py-2 text-xs rounded border border-white/10 outline-none" />
                    </div>
                  </div>
                  <div>
                    <label style={{ color: colors.gray[300] }} className="text-xs block mb-1">Branch Address</label>
                    <input defaultValue="Near Janseva Nursing Home, Adarsh Nagar, Madhepura, Bihar - 852113" style={{ backgroundColor: colors.primary[500], color: colors.gray[100] }} className="w-full px-3 py-2 text-xs rounded border border-white/10 outline-none" />
                  </div>
                  <div className="pt-2">
                    <button type="submit" style={{ backgroundColor: colors.blueAccent[700], color: '#fff' }} className="px-5 py-2 rounded text-xs font-bold uppercase tracking-wider hover:opacity-90">
                      Save Profile
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ===================== TAB: CALENDAR ===================== */}
          {activeTab === 'calendar' && (
            <div className="space-y-6">
              <Header title="CALENDAR" subtitle="Institute daily lab batches and academic calendar" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div style={{ backgroundColor: colors.primary[400] }} className="p-5 rounded-lg col-span-1 space-y-4">
                  <h4 style={{ color: colors.gray[100] }} className="font-bold text-sm">Upcoming Events &amp; Exams</h4>
                  <div className="space-y-2 text-xs">
                    <div style={{ backgroundColor: colors.primary[500] }} className="p-3 rounded border-l-4 border-[#4cceac]">
                      <div className="font-bold">ADIT 1st Term Practical Exam</div>
                      <div style={{ color: colors.gray[400] }}>Nov 15, 2026 · Lab A</div>
                    </div>
                    <div style={{ backgroundColor: colors.primary[500] }} className="p-3 rounded border-l-4 border-[#6870fa]">
                      <div className="font-bold">Beltron Typing Speed Evaluation</div>
                      <div style={{ color: colors.gray[400] }}>Nov 20, 2026 · Lab B</div>
                    </div>
                    <div style={{ backgroundColor: colors.primary[500] }} className="p-3 rounded border-l-4 border-amber-400">
                      <div className="font-bold">Tally Prime GST Practical Test</div>
                      <div style={{ color: colors.gray[400] }}>Nov 25, 2026 · Lab A</div>
                    </div>
                  </div>
                </div>
                <div style={{ backgroundColor: colors.primary[400] }} className="p-5 rounded-lg col-span-2">
                  <h4 style={{ color: colors.gray[100] }} className="font-bold text-sm mb-4">Weekly Batch Timetable</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr style={{ color: colors.gray[300], borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                          <th className="py-2">Batch</th>
                          <th className="py-2">Time</th>
                          <th className="py-2">Course</th>
                          <th className="py-2">Lab Room</th>
                          <th className="py-2">Mentor</th>
                        </tr>
                      </thead>
                      <tbody style={{ color: colors.gray[200] }} className="divide-y divide-white/5">
                        <tr><td className="py-2.5 font-bold text-[#4cceac]">Batch 1</td><td>08:00 AM – 09:30 AM</td><td>ADIT</td><td>Lab A (Branch 2)</td><td>Sonu Kumar</td></tr>
                        <tr><td className="py-2.5 font-bold text-[#4cceac]">Batch 2</td><td>09:30 AM – 11:00 AM</td><td>ADCA</td><td>Lab A (Branch 2)</td><td>Sonu Kumar</td></tr>
                        <tr><td className="py-2.5 font-bold text-[#4cceac]">Batch 3</td><td>11:00 AM – 12:30 PM</td><td>Tally Prime</td><td>Lab B (Branch 2)</td><td>Sonu Kumar</td></tr>
                        <tr><td className="py-2.5 font-bold text-[#4cceac]">Batch 4</td><td>02:00 PM – 03:30 PM</td><td>Hindi Typing</td><td>Typing Lab</td><td>Faculty Lead</td></tr>
                        <tr><td className="py-2.5 font-bold text-[#4cceac]">Batch 5</td><td>03:30 PM – 05:00 PM</td><td>DCA &amp; Fundamentals</td><td>Lab A (Branch 2)</td><td>Sonu Kumar</td></tr>
                        <tr><td className="py-2.5 font-bold text-[#4cceac]">Batch 6</td><td>05:00 PM – 06:30 PM</td><td>ADIT Advanced</td><td>Lab A (Branch 2)</td><td>Sonu Kumar</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================== TAB: FAQ ===================== */}
          {activeTab === 'faq' && (
            <div className="space-y-6">
              <Header title="FAQ PAGE" subtitle="Frequently Asked Questions by Students &amp; Parents" />
              <div className="space-y-3 max-w-4xl">
                {[
                  { q: "Is Modern Delhi Infotech registered with the Government?", a: "Yes, Modern Delhi Infotech is registered under the Govt. of India and ISO certified (Estd. 2017). Certificates issued are recognized for state and central government employment registrations." },
                  { q: "What is the qualification and background of Director Sonu Sir?", a: "Sonu Sir holds BCA and MCA degrees and has over 10+ years of professional teaching experience in software, computer applications, and accounting." },
                  { q: "Can students pay course fees in installments?", a: "Yes, students can pay their fees in convenient 2 to 3 monthly installments. Official computerized invoices with GST calculations and dues tracking are issued upon each payment." },
                  { q: "Does MDI provide Hindi and English typing for Bihar Beltron / High Court exams?", a: "Yes, our dedicated Typing Lab runs KrutiDev 010 and Mangal Remington Gail keyboard layouts with timer-based evaluation matching official exam patterns." }
                ].map((item, idx) => (
                  <div key={idx} style={{ backgroundColor: colors.primary[400] }} className="p-4 rounded-lg shadow-xs">
                    <h4 style={{ color: colors.greenAccent[500] }} className="font-bold text-sm mb-1">{item.q}</h4>
                    <p style={{ color: colors.gray[300] }} className="text-xs leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===================== TAB: BAR / PIE / LINE / GEOGRAPHY CHARTS ===================== */}
          {(activeTab === 'bar' || activeTab === 'pie' || activeTab === 'line' || activeTab === 'geography') && (
            <div className="space-y-6">
              <Header
                title={activeTab.toUpperCase() + " CHART"}
                subtitle={`Interactive ${activeTab} data visualization of institute performance metrics`}
              />
              <div style={{ backgroundColor: colors.primary[400] }} className="p-6 rounded-lg shadow-xs min-h-[350px] flex flex-col justify-center items-center">
                {activeTab === 'bar' && (
                  <div className="w-full max-w-2xl space-y-4">
                    <div className="text-xs font-bold mb-2" style={{ color: colors.gray[100] }}>Student Enrollment by Course</div>
                    {[
                      { name: 'ADIT (12 Months)', count: 48, pct: '85%', color: '#4cceac' },
                      { name: 'ADCA (12 Months)', count: 36, pct: '65%', color: '#6870fa' },
                      { name: 'DCA (6 Months)', count: 24, pct: '45%', color: '#e2726e' },
                      { name: 'Tally Prime (3 Months)', count: 20, pct: '38%', color: '#f59e0b' },
                      { name: 'Typing English/Hindi', count: 30, pct: '55%', color: '#38bdf8' },
                    ].map((bar, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs" style={{ color: colors.gray[200] }}>
                          <span>{bar.name}</span>
                          <span className="font-bold">{bar.count} students</span>
                        </div>
                        <div className="w-full bg-black/20 rounded-full h-3 overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: bar.pct, backgroundColor: bar.color }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === 'pie' && (
                  <div className="w-full max-w-md flex flex-col items-center space-y-6">
                    <div className="w-48 h-48 rounded-full flex items-center justify-center relative" style={{ background: 'conic-gradient(#4cceac 0% 55%, #6870fa 55% 80%, #f59e0b 80% 100%)' }}>
                      <div className="w-32 h-32 rounded-full flex flex-col items-center justify-center" style={{ backgroundColor: colors.primary[400] }}>
                        <span className="text-xl font-bold" style={{ color: colors.gray[100] }}>100%</span>
                        <span className="text-[10px]" style={{ color: colors.gray[400] }}>Fee Inflow</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-xs text-center w-full">
                      <div className="p-2 rounded" style={{ backgroundColor: colors.primary[500] }}>
                        <span className="block font-bold text-[#4cceac]">55%</span>
                        <span style={{ color: colors.gray[300] }}>Online UPI</span>
                      </div>
                      <div className="p-2 rounded" style={{ backgroundColor: colors.primary[500] }}>
                        <span className="block font-bold text-[#6870fa]">25%</span>
                        <span style={{ color: colors.gray[300] }}>Cash Counter</span>
                      </div>
                      <div className="p-2 rounded" style={{ backgroundColor: colors.primary[500] }}>
                        <span className="block font-bold text-amber-400">20%</span>
                        <span style={{ color: colors.gray[300] }}>Balance Dues</span>
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 'line' && (
                  <div className="w-full">
                    <RevenueChart totalRevenue={totalRevenue} />
                  </div>
                )}
                {activeTab === 'geography' && (
                  <div className="w-full max-w-xl text-center space-y-4">
                    <Map className="w-16 h-16 mx-auto text-[#4cceac]" />
                    <h4 style={{ color: colors.gray[100] }} className="font-bold text-base">Regional Outreach in Kosi Division</h4>
                    <p style={{ color: colors.gray[300] }} className="text-xs max-w-md mx-auto">
                      Enrolling students from Madhepura Town, Singheshwar, Murliganj, Kumarkhand, Bihariganj, Shankarpur, and adjoining Saharsa &amp; Supaul areas.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 pt-2">
                      {['Madhepura City (62%)', 'Singheshwar (14%)', 'Murliganj (10%)', 'Shankarpur (8%)', 'Saharsa (6%)'].map((loc, i) => (
                        <span key={i} className="px-3 py-1 text-xs rounded-full" style={{ backgroundColor: colors.primary[500], color: colors.greenAccent[500] }}>
                          {loc}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ===================== MODAL: REGISTER NEW STUDENT ===================== */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
          <div
            style={{
              backgroundColor: colors.primary[400],
              color: colors.gray[100]
            }}
            className="rounded-lg max-w-xl w-full p-6 shadow-xl border border-white/10 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <h3 style={{ color: colors.gray[100] }} className="text-base font-bold">
                Register New Student &amp; Issue Invoice
              </h3>
              <button
                onClick={() => setIsAddStudentOpen(false)}
                style={{ color: colors.gray[300] }}
                className="p-1 hover:opacity-75"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="mt-4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label style={{ color: colors.gray[300] }} className="text-xs block mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    style={{
                      backgroundColor: colors.primary[500],
                      color: colors.gray[100]
                    }}
                    className="w-full rounded-md px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-teal-400"
                  />
                </div>

                <div>
                  <label style={{ color: colors.gray[300] }} className="text-xs block mb-1">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suresh Prasad"
                    value={newStudent.fatherName}
                    onChange={(e) => setNewStudent({ ...newStudent, fatherName: e.target.value })}
                    style={{
                      backgroundColor: colors.primary[500],
                      color: colors.gray[100]
                    }}
                    className="w-full rounded-md px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-teal-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label style={{ color: colors.gray[300] }} className="text-xs block mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 94312 00000"
                    value={newStudent.mobile}
                    onChange={(e) => setNewStudent({ ...newStudent, mobile: e.target.value })}
                    style={{
                      backgroundColor: colors.primary[500],
                      color: colors.gray[100]
                    }}
                    className="w-full rounded-md px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-teal-400"
                  />
                </div>

                <div>
                  <label style={{ color: colors.gray[300] }} className="text-xs block mb-1">
                    Branch Allocation
                  </label>
                  <select
                    value={newStudent.branchCode}
                    onChange={(e) => setNewStudent({ ...newStudent, branchCode: e.target.value })}
                    style={{
                      backgroundColor: colors.primary[500],
                      color: colors.gray[100]
                    }}
                    className="w-full rounded-md px-3 py-2 text-xs outline-none cursor-pointer"
                  >
                    <option value="2">Branch 2 (Near Janseva Nursing Home)</option>
                    <option value="1">Branch 1 (SBI Road)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label style={{ color: colors.gray[300] }} className="text-xs block mb-1">
                    Select Course Program
                  </label>
                  <select
                    value={newStudent.courseCode}
                    onChange={(e) => {
                      const selected = courses.find(c => c.code === e.target.value);
                      setNewStudent({
                        ...newStudent,
                        courseCode: e.target.value,
                        courseName: selected?.name || 'Computer Course',
                        totalFee: selected?.fee || 12000,
                        paidFee: (selected?.fee || 12000) / 2
                      });
                    }}
                    style={{
                      backgroundColor: colors.primary[500],
                      color: colors.gray[100]
                    }}
                    className="w-full rounded-md px-3 py-2 text-xs outline-none cursor-pointer"
                  >
                    {courses.map(c => (
                      <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ color: colors.gray[300] }} className="text-xs block mb-1">
                    Select Batch Timing
                  </label>
                  <select
                    value={newStudent.batchNo}
                    onChange={(e) => {
                      const batchObj = batches.find(b => `Batch-${b.id.replace('B', '')}` === e.target.value);
                      setNewStudent({
                        ...newStudent,
                        batchNo: e.target.value,
                        batchTime: batchObj?.timing || '08:00 AM – 09:30 AM'
                      });
                    }}
                    style={{
                      backgroundColor: colors.primary[500],
                      color: colors.gray[100]
                    }}
                    className="w-full rounded-md px-3 py-2 text-xs outline-none cursor-pointer"
                  >
                    {batches.map(b => (
                      <option key={b.id} value={`Batch-${b.id.replace('B', '')}`}>
                        {b.name} ({b.timing})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Fee particulars */}
              <div
                style={{ backgroundColor: colors.primary[500] }}
                className="p-4 rounded-md space-y-3"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={{ color: colors.gray[300] }} className="text-[11px] block mb-1">
                      Total Course Fee (₹)
                    </label>
                    <input
                      type="number"
                      value={newStudent.totalFee}
                      onChange={(e) => setNewStudent({ ...newStudent, totalFee: Number(e.target.value) })}
                      style={{
                        backgroundColor: colors.primary[400],
                        color: colors.gray[100]
                      }}
                      className="w-full rounded-md px-3 py-1.5 text-xs font-bold outline-none"
                    />
                  </div>

                  <div>
                    <label style={{ color: colors.gray[300] }} className="text-[11px] block mb-1">
                      Initial Paid Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={newStudent.paidFee}
                      onChange={(e) => setNewStudent({ ...newStudent, paidFee: Number(e.target.value) })}
                      style={{
                        backgroundColor: colors.primary[400],
                        color: colors.greenAccent[500]
                      }}
                      className="w-full rounded-md px-3 py-1.5 text-xs font-bold outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                  <span style={{ color: colors.gray[300] }}>Balance Dues:</span>
                  <span style={{ color: colors.redAccent[400] }} className="font-bold">
                    ₹{Number(newStudent.totalFee) - Number(newStudent.paidFee)}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(false)}
                  style={{ color: colors.gray[300] }}
                  className="px-4 py-2 text-xs font-semibold hover:opacity-75"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    backgroundColor: colors.blueAccent[700],
                    color: '#ffffff'
                  }}
                  className="px-5 py-2.5 rounded-md font-bold text-xs hover:opacity-90 transition-opacity"
                >
                  Complete Registration &amp; Issue Invoice
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
