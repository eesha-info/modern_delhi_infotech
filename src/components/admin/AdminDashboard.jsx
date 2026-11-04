import React, { useState } from 'react';
import {
  Users, Receipt, FileText, Calendar, Bell, PlusCircle, Search, Filter,
  Phone, Mail, CheckCircle2, AlertCircle, TrendingUp, DollarSign, ArrowLeft,
  LogOut, Shield, Download, Printer, UserPlus, Eye, X, CheckSquare, Clock,
  ChevronRight, ExternalLink, Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import ArgonSidebar from '../dashboard/ArgonSidebar';
import ArgonNavbar from '../dashboard/ArgonNavbar';
import ArgonHeaderCards from '../dashboard/ArgonHeaderCards';
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

  // Tab State: 'dashboard' | 'attendance' | 'students' | 'invoices' | 'enquiries' | 'batches'
  const [activeTab, setActiveTab] = useState('dashboard');
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

  // Create Student Handler
  const handleCreateStudent = (e) => {
    e.preventDefault();
    if (!newStudent.name || !newStudent.mobile) return;

    addStudent(newStudent);
    setIsAddStudentOpen(false);
    // Reset Form
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

  const getTabTitle = (tab) => {
    switch (tab) {
      case 'dashboard': return 'Institute Overview';
      case 'attendance': return 'Batchwise Attendance';
      case 'students': return 'Students Directory';
      case 'invoices': return 'Fee Invoices & GST';
      case 'enquiries': return 'Website Admission Leads';
      case 'batches': return 'Lab Batches & Timings';
      default: return 'Admin Dashboard';
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex font-sans antialiased">
      
      {/* 1. Argon Left Fixed Sidebar */}
      <ArgonSidebar
        role="admin"
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
            role="admin"
            onLogout={logout}
            onViewWebsite={() => setActiveView('landing')}
            onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
          />

          {/* Argon 4 Header Metric Cards */}
          <div className="px-4 sm:px-6 lg:px-8 mt-5">
            <ArgonHeaderCards
              role="admin"
              stats={{
                totalStudents,
                totalRevenue,
                totalBatches: batches.length
              }}
              user={user}
            />
          </div>
        </header>

        {/* 3. Main Body Content (Floats over header with negative margin -mt-16) */}
        <main className="-mt-16 relative z-10 px-4 sm:px-6 lg:px-8 space-y-6 pb-12 flex-1">
          
          {/* ===================== TAB: DASHBOARD ===================== */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Quick Action Attendance Banner */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center flex-shrink-0">
                    <CheckSquare className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-200">
                      Attendance Hub
                    </span>
                    <h3 className="text-lg font-bold text-white mt-0.5 font-display">
                      Take Daily Batch Attendance
                    </h3>
                    <p className="text-xs text-emerald-100 max-w-xl">
                      Mark presence, absence, and late check-ins for Batch 1 to Batch 6 in real time with individual PC allocation.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab('attendance')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-emerald-950 font-black text-xs hover:bg-emerald-50 shadow transition-all active:scale-95"
                  >
                    <CheckSquare className="w-4 h-4 text-emerald-700" />
                    <span>Launch Attendance Register</span>
                  </button>
                  <button
                    onClick={() => setIsAddStudentOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-800/80 hover:bg-emerald-800 border border-emerald-400/30 text-white font-bold text-xs transition-colors"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>New Student</span>
                  </button>
                </div>
              </div>

              {/* Grid: Recent Students Roster & Recent GST Invoices */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Recent Students Table Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                          Admissions
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                          Recent Enrolled Students
                        </h3>
                      </div>
                      <button
                        onClick={() => setActiveTab('students')}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <span>View All ({students.length})</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                            <th className="py-2.5 px-4">Student</th>
                            <th className="py-2.5 px-4">Course</th>
                            <th className="py-2.5 px-4">Batch</th>
                            <th className="py-2.5 px-4">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs">
                          {students.slice(0, 5).map((st) => (
                            <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-2.5">
                                  <img
                                    src={st.avatar}
                                    alt={st.name}
                                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                                    onError={(e) => {
                                      e.currentTarget.src = "/logo-icon.svg";
                                    }}
                                  />
                                  <div>
                                    <div className="font-bold text-slate-900 truncate max-w-[130px]">
                                      {st.name}
                                    </div>
                                    <div className="text-[10px] font-mono text-blue-600">
                                      {st.regNo}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className="font-bold text-slate-800">{st.courseCode}</span>
                              </td>
                              <td className="py-3 px-4 text-[11px] text-slate-600">
                                {st.batchNo}
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                  st.paymentStatus === 'FULLY PAID'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'bg-amber-50 text-amber-700'
                                }`}>
                                  {st.paymentStatus}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                    <button
                      onClick={() => setIsAddStudentOpen(true)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1.5"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Register Another Student</span>
                    </button>
                  </div>
                </div>

                {/* Recent GST Invoices Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">
                          Accounting & Tax
                        </span>
                        <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                          Recent GST Tax Invoices
                        </h3>
                      </div>
                      <button
                        onClick={() => setActiveTab('invoices')}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <span>All Invoices ({invoices.length})</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                            <th className="py-2.5 px-4">Invoice #</th>
                            <th className="py-2.5 px-4">Student</th>
                            <th className="py-2.5 px-4">Total</th>
                            <th className="py-2.5 px-4 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-xs">
                          {invoices.slice(0, 5).map((inv, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                              <td className="py-3 px-4">
                                <span className="font-mono font-bold text-slate-900 text-[11px] block">
                                  {inv.invoiceNo}
                                </span>
                                <span className="text-[10px] text-slate-400">{inv.date}</span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="font-bold text-slate-800">{inv.student?.name}</div>
                                <div className="text-[10px] text-slate-500">{inv.course?.code}</div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="font-bold text-slate-900">
                                  ₹{(inv.totalCourseFee || 0).toLocaleString()}
                                </div>
                                <div className="text-[10px] text-emerald-600 font-semibold">
                                  Paid: ₹{(inv.totalPaid || 0).toLocaleString()}
                                </div>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <button
                                  onClick={() => setActiveInvoice(inv)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
                                  title="View Authentic PDF Replica"
                                >
                                  <Printer className="w-3 h-3" />
                                  <span>Print / View</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs px-4">
                    <span className="text-slate-500">
                      Total Collected: <strong className="text-slate-900">₹{totalRevenue.toLocaleString()}</strong>
                    </span>
                    <span className="text-slate-500">
                      Pending Dues: <strong className="text-rose-600">₹{totalDues.toLocaleString()}</strong>
                    </span>
                  </div>
                </div>

              </div>

              {/* Batches Quick Status Grid */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Live Institute Schedule
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-0.5">
                      Classroom Batches & Lab Utilization
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('batches')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    View Batches Schedule →
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {batches.map((b) => {
                    const percentage = Math.round((b.enrolled / b.maxCapacity) * 100);
                    return (
                      <div
                        key={b.id}
                        className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                            {b.id}
                          </span>
                          <span className="text-[10px] text-slate-500 font-bold">
                            {b.branch} · {b.room}
                          </span>
                        </div>
                        <h4 className="font-bold text-xs text-slate-900 mt-2 truncate">
                          {b.name}
                        </h4>
                        <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>{b.timing}</span>
                        </div>

                        {/* Capacity meter */}
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 mb-1">
                            <span>Occupancy</span>
                            <span className="text-slate-900 font-bold">{b.enrolled} / {b.maxCapacity} Seats ({percentage}%)</span>
                          </div>
                          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                percentage >= 90 ? 'bg-rose-500' : percentage >= 75 ? 'bg-amber-500' : 'bg-emerald-500'
                              }`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-slate-200 flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">Instructor:</span>
                          <span className="font-bold text-slate-800">{b.instructor}</span>
                        </div>
                      </div>
                    );
                  })}
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
              
              {/* Header card with Search and Add Student */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block">
                    Student Administration
                  </span>
                  <h2 className="text-xl font-display font-extrabold text-slate-900 mt-0.5">
                    Registered Students Roster
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage enrollment records, batch shifts, dues, and student identities.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsAddStudentOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all active:scale-95"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>+ Register New Student</span>
                  </button>
                </div>
              </div>

              {/* Filters & Search Bar */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <div className="relative w-full md:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by name, roll no, mobile..."
                      value={studentSearch}
                      onChange={(e) => setStudentSearch(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500"
                    />
                  </div>

                  <select
                    value={courseFilter}
                    onChange={(e) => setCourseFilter(e.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer"
                  >
                    <option value="All">All Courses</option>
                    <option value="ADIT">ADIT (12M)</option>
                    <option value="ADCA">ADCA (12M)</option>
                    <option value="DCA">DCA (6M)</option>
                    <option value="TALLY">Tally Prime (3M)</option>
                    <option value="TYPING">Beltron Typing (3M)</option>
                  </select>
                </div>

                <span className="text-xs text-slate-500 font-semibold self-start md:self-auto">
                  Showing {filteredStudents.length} of {students.length} students
                </span>
              </div>

              {/* Students Data Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-black uppercase text-slate-500 tracking-wider">
                        <th className="py-3 px-4">Student</th>
                        <th className="py-3 px-4">Father's Name & Contact</th>
                        <th className="py-3 px-4">Course & Batch</th>
                        <th className="py-3 px-4">PC Station</th>
                        <th className="py-3 px-4">Fee Dues</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredStudents.map((st) => (
                        <tr key={st.id} className="hover:bg-slate-50 transition-colors">
                          {/* Student */}
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img
                                src={st.avatar}
                                alt={st.name}
                                className="w-10 h-10 rounded-full object-cover border border-slate-200 flex-shrink-0"
                                onError={(e) => {
                                  e.currentTarget.src = "/logo-icon.svg";
                                }}
                              />
                              <div>
                                <div className="font-extrabold text-slate-900 text-sm">
                                  {st.name}
                                </div>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span className="font-mono text-[10px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded">
                                    {st.regNo}
                                  </span>
                                  <span className="text-[10px] text-slate-400">
                                    Roll: {st.rollNo}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Contact */}
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-slate-700">{st.fatherName}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
                              <Phone className="w-3 h-3 text-slate-400" />
                              <a href={`tel:${st.mobile}`} className="hover:text-blue-600">
                                {st.mobile}
                              </a>
                            </div>
                          </td>

                          {/* Course & Batch */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{st.courseCode}</div>
                            <div className="text-[11px] text-slate-500">{st.batchNo} ({st.batchTime})</div>
                          </td>

                          {/* PC Station */}
                          <td className="py-3.5 px-4">
                            <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                              {st.pcNumber || 'PC-01'}
                            </span>
                          </td>

                          {/* Fee Dues */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">
                              ₹{(st.totalFee || 0).toLocaleString()}
                            </div>
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold mt-0.5 ${
                              st.balanceDues === 0
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-amber-50 text-amber-700'
                            }`}>
                              {st.balanceDues === 0 ? 'FULLY PAID' : `Due: ₹${st.balanceDues}`}
                            </span>
                          </td>

                          {/* Action */}
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => {
                                const matchingInvoice = invoices.find(inv => inv.student?.regNo === st.regNo) || invoices[0];
                                setActiveInvoice(matchingInvoice);
                              }}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 transition-colors"
                            >
                              <Printer className="w-3.5 h-3.5" />
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
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">
                    Fee Management & Taxation
                  </span>
                  <h2 className="text-xl font-display font-extrabold text-slate-900 mt-0.5">
                    GST Tax Invoices & Billing
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Official tax invoices compliant with Government of India and Bihar GST regulations.
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold">
                  <div className="px-3.5 py-2 bg-slate-50 rounded-xl border border-slate-200">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Invoiced</span>
                    <strong className="text-slate-900 text-sm">
                      ₹{invoices.reduce((acc, i) => acc + (i.totalCourseFee || 0), 0).toLocaleString()}
                    </strong>
                  </div>
                  <div className="px-3.5 py-2 bg-emerald-50 rounded-xl border border-emerald-200">
                    <span className="text-emerald-700 block text-[10px] uppercase font-bold">Collected</span>
                    <strong className="text-emerald-800 text-sm">
                      ₹{totalRevenue.toLocaleString()}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Invoices List */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-black uppercase text-slate-500 tracking-wider">
                        <th className="py-3 px-4">Tax Invoice #</th>
                        <th className="py-3 px-4">Student Name</th>
                        <th className="py-3 px-4">Course Program</th>
                        <th className="py-3 px-4">Amount & GST</th>
                        <th className="py-3 px-4">Paid Status</th>
                        <th className="py-3 px-4 text-right">Authentic PDF</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {invoices.map((inv, idx) => (
                        <tr key={idx} className="hover:bg-slate-50 transition-colors">
                          {/* Invoice No */}
                          <td className="py-3.5 px-4">
                            <span className="font-mono font-extrabold text-blue-900 text-xs block">
                              {inv.invoiceNo}
                            </span>
                            <span className="text-[10px] text-slate-400 mt-0.5 block">
                              Date: {inv.date} · {inv.session}
                            </span>
                          </td>

                          {/* Student */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{inv.student?.name}</div>
                            <div className="text-[10px] text-slate-500">{inv.student?.regNo}</div>
                          </td>

                          {/* Course */}
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-800">{inv.course?.code}</div>
                            <div className="text-[10px] text-slate-500">{inv.course?.name}</div>
                          </td>

                          {/* Total */}
                          <td className="py-3.5 px-4">
                            <div className="font-extrabold text-slate-900">
                              ₹{(inv.totalCourseFee || 0).toLocaleString()}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              Excl GST: ₹{(inv.feeParticulars?.actualPriceExclGst || 0).toLocaleString()}
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-3.5 px-4">
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                              inv.status === 'FULLY PAID'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {inv.status}
                            </span>
                            {inv.balanceDues > 0 && (
                              <div className="text-[10px] text-rose-600 font-bold mt-0.5">
                                Due: ₹{inv.balanceDues}
                              </div>
                            )}
                          </td>

                          {/* Action */}
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => setActiveInvoice(inv)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>View / Print PDF</span>
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
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">
                    Public Website Inquiries
                  </span>
                  <h2 className="text-xl font-display font-extrabold text-slate-900 mt-0.5">
                    Admission Leads & Inquiries
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Potential students who submitted admission inquiries through the public landing page.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-rose-50 text-rose-700 text-xs font-bold rounded-xl border border-rose-200">
                    {newEnquiriesCount} New Leads
                  </span>
                </div>
              </div>

              {/* Enquiries Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-black uppercase text-slate-500 tracking-wider">
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Applicant</th>
                        <th className="py-3 px-4">Phone Number</th>
                        <th className="py-3 px-4">Interested Course</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Quick Call</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {enquiries.map((enq) => (
                        <tr key={enq.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3.5 px-4 text-slate-500 font-medium">
                            {enq.date}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-900">
                            {enq.name}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-700">
                            {enq.phone}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-800 font-bold text-[11px]">
                              {enq.course || 'ADIT'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={enq.status}
                              onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                              className={`text-[11px] font-bold rounded-lg px-2.5 py-1 border focus:outline-none cursor-pointer ${
                                enq.status === 'New'
                                  ? 'bg-rose-50 border-rose-200 text-rose-700'
                                  : enq.status === 'Contacted'
                                  ? 'bg-amber-50 border-amber-200 text-amber-700'
                                  : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Enrolled">Enrolled</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <a
                              href={`tel:${enq.phone}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold border border-emerald-200 transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5" />
                              <span>Call Now</span>
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
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-600 block">
                    Institute Schedule
                  </span>
                  <h2 className="text-xl font-display font-extrabold text-slate-900 mt-0.5">
                    Batches, Timings & Lab Rooms
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage 6 institute time slots across Branch 1 and Branch 2 with dedicated mentor assignments.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab('attendance')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all active:scale-95"
                >
                  <CheckSquare className="w-4 h-4" />
                  <span>Take Attendance for a Batch</span>
                </button>
              </div>

              {/* Batches Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {batches.map((batch) => {
                  const percentage = Math.round((batch.enrolled / batch.maxCapacity) * 100);
                  const enrolledList = students.filter(
                    s => s.batchNo === `Batch-${batch.id.replace('B', '')}` || s.batchNo?.includes(batch.id)
                  );

                  return (
                    <div
                      key={batch.id}
                      className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
                            {batch.id}
                          </span>
                          <span className="text-xs font-bold text-slate-500">
                            {batch.branch}
                          </span>
                        </div>

                        <h3 className="font-extrabold text-base text-slate-900 mt-3">
                          {batch.name}
                        </h3>

                        <div className="mt-2 space-y-1.5 text-xs text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-blue-600" />
                            <span>{batch.timing}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5 text-purple-600" />
                            <span>Instructor: <strong>{batch.instructor}</strong></span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Room: <strong>{batch.room}</strong></span>
                          </div>
                        </div>

                        {/* Occupancy bar */}
                        <div className="mt-4 pt-4 border-t border-slate-100">
                          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                            <span className="text-slate-500">Lab Capacity</span>
                            <span className="text-slate-900 font-bold">{batch.enrolled} / {batch.maxCapacity} PCs</span>
                          </div>
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className="bg-blue-600 h-full rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500 font-medium">
                          {enrolledList.length} Roster Students
                        </span>
                        <button
                          onClick={() => {
                            setActiveTab('attendance');
                          }}
                          className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <span>Mark Attendance</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

        </main>
      </div>

      {/* ===================== MODAL: REGISTER NEW STUDENT ===================== */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                  New Admission
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Register New Student & Issue Invoice
                </h3>
              </div>
              <button
                onClick={() => setIsAddStudentOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="mt-4 space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suresh Prasad"
                    value={newStudent.fatherName}
                    onChange={(e) => setNewStudent({ ...newStudent, fatherName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 94312 00000"
                    value={newStudent.mobile}
                    onChange={(e) => setNewStudent({ ...newStudent, mobile: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Branch Allocation
                  </label>
                  <select
                    value={newStudent.branchCode}
                    onChange={(e) => setNewStudent({ ...newStudent, branchCode: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer"
                  >
                    <option value="2">Branch 2 (Near Janseva Nursing Home)</option>
                    <option value="1">Branch 1 (SBI Road)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer"
                  >
                    {courses.map(c => (
                      <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:bg-white focus:border-blue-500 cursor-pointer"
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
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                  Fee & Initial Installment
                </span>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Total Course Fee (₹)
                    </label>
                    <input
                      type="number"
                      value={newStudent.totalFee}
                      onChange={(e) => setNewStudent({ ...newStudent, totalFee: Number(e.target.value) })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Initial Paid Amount (₹)
                    </label>
                    <input
                      type="number"
                      value={newStudent.paidFee}
                      onChange={(e) => setNewStudent({ ...newStudent, paidFee: Number(e.target.value) })}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-emerald-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-200">
                  <span>Balance Dues:</span>
                  <span className="font-bold text-rose-600">
                    ₹{Number(newStudent.totalFee) - Number(newStudent.paidFee)}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-95"
                >
                  Complete Registration & Issue Invoice
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
