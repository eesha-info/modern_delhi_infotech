import React, { useState } from 'react';
import {
  Users, Receipt, FileText, Calendar, Bell, PlusCircle, Search, Filter,
  Phone, Mail, CheckCircle2, AlertCircle, TrendingUp, DollarSign, ArrowLeft,
  LogOut, Shield, Download, Printer, UserPlus, Eye, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Logo from '../common/Logo';

const AdminDashboard = () => {
  const { user, logout, setActiveView } = useAuth();
  const {
    students,
    invoices,
    enquiries,
    batches,
    notices,
    courses,
    setActiveInvoice,
    addStudent,
    updateEnquiryStatus,
    addNotice
  } = useData();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'students' | 'invoices' | 'enquiries' | 'batches' | 'notices'
  const [studentSearch, setStudentSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('All');
  const [isAddStudentOpen, setIsAddStudentOpen] = useState(false);

  // New Student Form State
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

  // Calculate high level metrics
  const totalStudents = students.length;
  const totalRevenue = invoices.reduce((acc, inv) => acc + (inv.totalPaid || 0), 0);
  const totalDues = invoices.reduce((acc, inv) => acc + (inv.balanceDues || 0), 0);
  const totalEnquiries = enquiries.length;
  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
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
    // Reset form
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
    <div className="min-h-screen bg-slate-100 flex flex-col">
      
      {/* Admin Top Bar */}
      <header className="bg-brand-navyDark text-white border-b border-blue-900/60 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between">
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
                <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500 text-slate-950">
                  Admin Portal
                </span>
              </div>
              <p className="text-[11px] text-blue-200">
                Logged in as Sonu Kumar (Director &amp; Chief Mentor)
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
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 py-2 border-t border-white/10 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'overview' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'students' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Students Directory ({students.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'invoices' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>Tax Invoices &amp; Billing ({invoices.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'enquiries' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Leads &amp; Enquiries</span>
            {newEnquiriesCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center">
                {newEnquiriesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('batches')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'batches' ? 'bg-amber-500 text-slate-950 font-black' : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Batches &amp; Timings ({batches.length})</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Enrolled</span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-display">
                    {totalStudents}
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600 mt-0.5 block">
                    Active in Branch 1 &amp; 2
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fees Collected</span>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 font-display">
                    ₹{totalRevenue.toLocaleString()}
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-600 mt-0.5 block">
                    Total Realized Revenue
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Dues</span>
                  <div className="text-2xl sm:text-3xl font-black text-amber-600 mt-1 font-display">
                    ₹{totalDues.toLocaleString()}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500 mt-0.5 block">
                    Upcoming Installments
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Receipt className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">New Enquiries</span>
                  <div className="text-2xl sm:text-3xl font-black text-indigo-700 mt-1 font-display">
                    {totalEnquiries}
                  </div>
                  <span className="text-[11px] font-semibold text-rose-600 mt-0.5 block">
                    {newEnquiriesCount} Require Callback
                  </span>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                  <Mail className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Quick Action Banner */}
            <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-brand-navyDark rounded-3xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
              <div>
                <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider">
                  Admin Action
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Admit New Student &amp; Issue GST Fee Invoice
                </h3>
                <p className="text-xs text-blue-200 mt-0.5">
                  Generate Registration ID, assign batch time, and produce official MDI invoice receipt in one step.
                </p>
              </div>

              <button
                onClick={() => setIsAddStudentOpen(true)}
                className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ Register New Student</span>
              </button>
            </div>

            {/* Two Column Grid: Recent Invoices & Recent Leads */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Recent Invoices Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-blue-700" />
                    <span>Recent Tax Invoices</span>
                  </h4>
                  <button
                    onClick={() => setActiveTab('invoices')}
                    className="text-xs font-bold text-blue-700 hover:underline"
                  >
                    View All ({invoices.length})
                  </button>
                </div>

                <div className="divide-y divide-slate-100 mt-2">
                  {invoices.slice(0, 3).map((inv) => (
                    <div key={inv.invoiceNo} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-900">{inv.student.name}</p>
                        <p className="text-[11px] text-slate-500 font-mono">
                          {inv.invoiceNo} · {inv.course.code}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="font-bold text-slate-900">₹{inv.totalPaid.toLocaleString()}</span>
                          <span className={`block text-[10px] font-bold ${
                            inv.balanceDues === 0 ? 'text-emerald-600' : 'text-amber-600'
                          }`}>
                            {inv.status}
                          </span>
                        </div>
                        <button
                          onClick={() => setActiveInvoice(inv)}
                          className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg transition-colors"
                          title="View Invoice"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Admission Enquiries */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-700" />
                    <span>Website Admission Leads</span>
                  </h4>
                  <button
                    onClick={() => setActiveTab('enquiries')}
                    className="text-xs font-bold text-indigo-700 hover:underline"
                  >
                    View All ({enquiries.length})
                  </button>
                </div>

                <div className="divide-y divide-slate-100 mt-2">
                  {enquiries.slice(0, 3).map((enq) => (
                    <div key={enq.id} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-900">{enq.name}</p>
                        <p className="text-[11px] text-slate-500">{enq.course} · {enq.branch}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${enq.mobile}`}
                          className="px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[11px] font-bold flex items-center gap-1"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Call</span>
                        </a>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          enq.status === 'New' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {enq.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: STUDENTS DIRECTORY */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            
            {/* Table Header Filter & Actions */}
            <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Enrolled Students Roster</h3>
                <p className="text-xs text-slate-500">Manage student profiles, fee dues, and batch allocations</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                {/* Search */}
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    placeholder="Search by name, Reg No..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Filter Course */}
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="py-2 px-3 text-xs rounded-xl border border-slate-300 bg-white font-medium"
                >
                  <option value="All">All Courses</option>
                  <option value="ADIT">ADIT</option>
                  <option value="ADCA">ADCA</option>
                  <option value="DCA">DCA</option>
                  <option value="TALLY">TALLY</option>
                  <option value="TYPING">TYPING</option>
                </select>

                <button
                  onClick={() => setIsAddStudentOpen(true)}
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Student</span>
                </button>
              </div>
            </div>

            {/* Students Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Reg No / Roll</th>
                    <th className="p-4">Student Details</th>
                    <th className="p-4">Course Enrolled</th>
                    <th className="p-4">Batch &amp; Branch</th>
                    <th className="p-4">Fee Status</th>
                    <th className="p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-mono font-bold text-blue-900">
                        {s.regNo}
                        <span className="block text-[10px] text-slate-400 font-sans">Roll: {s.rollNo}</span>
                      </td>

                      <td className="p-4">
                        <p className="font-bold text-slate-900 text-sm">{s.name}</p>
                        <p className="text-[11px] text-slate-500">S/o: {s.fatherName}</p>
                        <p className="text-[11px] text-slate-500">{s.mobile}</p>
                      </td>

                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-[10px]">
                          {s.courseCode}
                        </span>
                        <p className="text-[11px] text-slate-700 font-medium mt-0.5">{s.courseName}</p>
                        <span className="text-[10px] text-slate-400">{s.duration}</span>
                      </td>

                      <td className="p-4">
                        <p className="font-semibold text-slate-800">{s.batchTime}</p>
                        <span className="text-[10px] text-slate-500">{s.branchName}</span>
                      </td>

                      <td className="p-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          s.balanceDues === 0
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {s.paymentStatus}
                        </span>
                        <p className="font-mono text-slate-800 font-bold mt-0.5">
                          Paid: ₹{s.paidFee.toLocaleString()}
                        </p>
                        {s.balanceDues > 0 && (
                          <span className="text-[10px] text-rose-600 block">
                            Due: ₹{s.balanceDues.toLocaleString()}
                          </span>
                        )}
                      </td>

                      <td className="p-4 text-center">
                        <button
                          onClick={() => {
                            const inv = invoices.find(i => i.student.regNo === s.regNo);
                            if (inv) setActiveInvoice(inv);
                          }}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-blue-50 text-blue-700 font-bold rounded-lg border border-slate-200 text-xs flex items-center justify-center gap-1 mx-auto transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Invoice</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* TAB 3: INVOICES & BILLING */}
        {activeTab === 'invoices' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-slate-900 text-base">GST Tax Invoices Register</h3>
                <p className="text-xs text-slate-500">Official Computer-Generated Invoices (GST @ 18% included)</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-600">Total Invoices: {invoices.length}</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Invoice No</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Student &amp; Reg No</th>
                    <th className="p-4">Course</th>
                    <th className="p-4">Course Fee</th>
                    <th className="p-4">Total Paid</th>
                    <th className="p-4">Dues</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-center">View / Print</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {invoices.map((inv) => (
                    <tr key={inv.invoiceNo} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-mono font-bold text-blue-900">{inv.invoiceNo}</td>
                      <td className="p-4 text-slate-600 font-medium">{inv.date}</td>
                      <td className="p-4">
                        <p className="font-bold text-slate-900">{inv.student.name}</p>
                        <p className="text-[10px] text-slate-400 font-mono">{inv.student.regNo}</p>
                      </td>
                      <td className="p-4 font-semibold text-slate-800">{inv.course.code}</td>
                      <td className="p-4 font-mono font-bold">₹{inv.totalCourseFee.toFixed(2)}</td>
                      <td className="p-4 font-mono font-bold text-emerald-700">₹{inv.totalPaid.toFixed(2)}</td>
                      <td className="p-4 font-mono font-bold text-rose-600">₹{inv.balanceDues.toFixed(2)}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          inv.balanceDues === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button
                          onClick={() => setActiveInvoice(inv)}
                          className="px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg font-bold border border-blue-200 flex items-center gap-1 mx-auto transition-colors"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Print</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: LEADS & ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-base">Admission Leads &amp; Queries</h3>
              <p className="text-xs text-slate-500">Leads submitted via the Modern Delhi Infotech landing page form</p>
            </div>

            <div className="divide-y divide-slate-200">
              {enquiries.map((enq) => (
                <div key={enq.id} className="p-4 sm:p-6 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{enq.name}</h4>
                      <span className="text-[10px] font-mono text-slate-400">• {enq.date}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        enq.status === 'New' ? 'bg-rose-100 text-rose-800' :
                        enq.status === 'Enrolled' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {enq.status}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-blue-900">
                      Interested Course: {enq.course} · {enq.branch}
                    </p>

                    {enq.message && (
                      <p className="text-xs text-slate-600 italic bg-slate-50 p-2 rounded border border-slate-200">
                        "{enq.message}"
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${enq.mobile}`}
                      className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>{enq.mobile}</span>
                    </a>

                    <select
                      value={enq.status}
                      onChange={(e) => updateEnquiryStatus(enq.id, e.target.value)}
                      className="p-2 text-xs border border-slate-300 rounded-xl bg-white font-medium"
                    >
                      <option value="New">Mark New</option>
                      <option value="Followed Up">Followed Up</option>
                      <option value="Enrolled">Enrolled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: BATCHES */}
        {activeTab === 'batches' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {batches.map((b) => (
              <div key={b.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold text-xs">
                      {b.id}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{b.branch}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base">{b.name}</h4>
                  <p className="text-xs font-mono font-bold text-blue-700 mt-1">{b.timing}</p>
                  
                  <div className="mt-4 space-y-1.5 text-xs text-slate-600">
                    <p>Instructor: <strong className="text-slate-800">{b.instructor}</strong></p>
                    <p>Classroom: <strong className="text-slate-800">{b.room}</strong></p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex justify-between text-xs text-slate-500 mb-1">
                    <span>Lab Capacity</span>
                    <span className="font-bold text-slate-900">{b.enrolled} / {b.maxCapacity} Seats</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(b.enrolled / b.maxCapacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* Add Student Modal */}
      {isAddStudentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
            <div className="bg-brand-navyDark text-white p-6 relative">
              <button
                onClick={() => setIsAddStudentOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold">Register New Student</h3>
              <p className="text-xs text-slate-300 mt-0.5">Issues automatic GST Tax Invoice</p>
            </div>

            <form onSubmit={handleCreateStudent} className="p-6 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Father's Name *</label>
                  <input
                    type="text"
                    required
                    value={newStudent.fatherName}
                    onChange={(e) => setNewStudent({ ...newStudent, fatherName: e.target.value })}
                    placeholder="Father's name"
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={newStudent.mobile}
                    onChange={(e) => setNewStudent({ ...newStudent, mobile: e.target.value })}
                    placeholder="+91..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Course Enrolled *</label>
                  <select
                    value={newStudent.courseCode}
                    onChange={(e) => {
                      const c = courses.find(item => item.code === e.target.value);
                      if (c) {
                        setNewStudent({
                          ...newStudent,
                          courseCode: c.code,
                          courseName: c.name,
                          duration: c.duration,
                          totalFee: c.fee,
                          paidFee: Math.round(c.fee / 2)
                        });
                      }
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium"
                  >
                    {courses.map(c => (
                      <option key={c.id} value={c.code}>{c.code} (₹{c.fee})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Branch *</label>
                  <select
                    value={newStudent.branchCode}
                    onChange={(e) => setNewStudent({ ...newStudent, branchCode: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white font-medium"
                  >
                    <option value="2">Branch 2 (Adarsh Nagar)</option>
                    <option value="1">Branch 1 (SBI Road)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total Course Fee (₹)</label>
                  <input
                    type="number"
                    value={newStudent.totalFee}
                    onChange={(e) => setNewStudent({ ...newStudent, totalFee: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Amount Paid Now (₹)</label>
                  <input
                    type="number"
                    value={newStudent.paidFee}
                    onChange={(e) => setNewStudent({ ...newStudent, paidFee: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddStudentOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-blue-700 text-white font-bold shadow-md hover:bg-blue-800"
                >
                  Save &amp; Generate Invoice
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
