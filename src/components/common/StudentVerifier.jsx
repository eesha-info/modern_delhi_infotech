import React, { useState } from 'react';
import { Search, CheckCircle2, XCircle, Award, ShieldCheck, Download, Calendar, User, BookOpen } from 'lucide-react';
import { useData } from '../../context/DataContext';

const StudentVerifier = ({ autoFocus = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const { students, setActiveInvoice, invoices, certificates } = useData();
  const foundCert = searchResult && certificates.find((c) => c.regNo === searchResult.regNo);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setHasSearched(true);
    const q = searchQuery.trim().toLowerCase();

    const found = students.find(
      s => s.regNo.toLowerCase() === q ||
           s.rollNo.toLowerCase() === q ||
           s.mobile.includes(q)
    );

    setSearchResult(found || null);
  };

  const handleViewInvoice = (studentRegNo) => {
    const inv = invoices.find(i => i.student.regNo === studentRegNo);
    if (inv) setActiveInvoice(inv);
  };

  return (
    <div>
        {/* Search Box */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleVerify} className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={autoFocus}
              aria-label="Registration number, roll number or mobile"
              placeholder="Enter Reg. No (e.g. MDI-B2-456 or Roll 456)"
              className="w-full pl-5 pr-32 py-4 rounded-2xl bg-white border-2 border-slate-300 focus:border-blue-600 focus:outline-none text-slate-800 font-medium shadow-md transition-all text-sm sm:text-base"
            />
            <button
              type="submit"
              className="absolute right-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition-all flex items-center gap-1.5"
            >
              <Search className="w-4 h-4" />
              <span>Verify</span>
            </button>
          </form>

          {/* Quick Demo Hint */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 mt-3 text-xs text-slate-500">
            <span>Try specimen Reg No:</span>
            <button
              type="button"
              onClick={() => { setSearchQuery('MDI-B2-456'); }}
              className="text-blue-700 font-bold underline hover:text-blue-900"
            >
              MDI-B2-456 (Rajeev Kumar)
            </button>
            <span>or</span>
            <button
              type="button"
              onClick={() => { setSearchQuery('MDI-B2-457'); }}
              className="text-blue-700 font-bold underline hover:text-blue-900"
            >
              MDI-B2-457 (Priya Kumari)
            </button>
          </div>
        </div>

        {/* Verification Result Card */}
        {hasSearched && (
          <div className="max-w-2xl mx-auto mt-8 animate-fadeIn">
            {searchResult ? (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-400 shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <img
                      src="/mdi-real-logo-cropped.png"
                      alt="Logo"
                      className="w-12 h-12 object-contain rounded-full bg-white p-0.5 border border-amber-300 shadow-sm"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-base">
                        Verified Student Record
                      </h4>
                      <p className="text-xs text-slate-500">Modern Delhi Infotech Official Records</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-300 font-bold text-xs rounded-full">
                    {searchResult.status} Student
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6 text-xs">
                  <div>
                    <span className="text-slate-400 block">Student Name</span>
                    <span className="font-bold text-slate-900 text-sm">{searchResult.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Father's Name</span>
                    <span className="font-semibold text-slate-800">{searchResult.fatherName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Registration No</span>
                    <span className="font-mono font-bold text-blue-700">{searchResult.regNo}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Course Enrolled</span>
                    <span className="font-bold text-slate-900">{searchResult.courseCode} ({searchResult.duration})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Batch Timing</span>
                    <span className="font-semibold text-slate-800">{searchResult.batchTime}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Session</span>
                    <span className="font-semibold text-slate-800">{searchResult.session}</span>
                  </div>
                </div>

                {/* Certificate status */}
                <div className={`mt-5 rounded-xl px-4 py-3 text-xs border ${foundCert ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
                  {foundCert ? (
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <strong>Certificate issued</strong>
                      <span className="font-mono">{foundCert.certificateNo}</span>
                      <span>· Grade {foundCert.grade} ({foundCert.percent}%) · {foundCert.issueDate}</span>
                    </span>
                  ) : (
                    <span>Course certificate: not issued yet (course in progress).</span>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Authorized by Sonu Kumar (Director)</span>
                  </div>

                  <button
                    onClick={() => handleViewInvoice(searchResult.regNo)}
                    className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-xl font-bold transition-colors"
                  >
                    View Official Fee Invoice
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-rose-50 rounded-2xl p-6 border border-rose-200 text-center">
                <XCircle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                <h4 className="font-bold text-rose-900 text-base">No Matching Record Found</h4>
                <p className="text-xs text-rose-700 mt-1 max-w-md mx-auto">
                  We could not find any student record matching "{searchQuery}". Please verify the registration number from the physical ID card or invoice.
                </p>
              </div>
            )}
          </div>
        )}

    </div>
  );
};

export default StudentVerifier;
