import React from 'react';
import { X, Printer, Download, CheckCircle2, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useData } from '../../context/DataContext';

const InvoiceViewerModal = () => {
  const { activeInvoice, setActiveInvoice } = useData();

  if (!activeInvoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const inv = activeInvoice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full my-auto shadow-2xl border border-slate-300 overflow-hidden flex flex-col">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="no-print bg-slate-800 text-white px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">Tax Invoice Viewer</span>
            <span className="text-xs bg-blue-600 px-2 py-0.5 rounded text-white font-mono">
              {inv.invoiceNo}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={() => setActiveInvoice(null)}
              className="p-1.5 hover:bg-white/20 rounded-lg text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container */}
        <div id="printable-invoice" className="p-6 sm:p-10 bg-white text-slate-900 font-sans text-xs sm:text-sm">
          
          {/* Header */}
          <div className="text-center relative pb-4 border-b border-slate-300">
            {/* Logo Emblem on Top Left */}
            <div className="sm:absolute sm:top-0 sm:left-0 flex items-center justify-center mb-3 sm:mb-0">
              <img
                src="/logo-icon.svg"
                alt="MDI Logo"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
              />
            </div>

            {/* Institute Name & Subtitle */}
            <h1 className="font-serif font-black text-2xl sm:text-3xl text-brand-navy tracking-wide">
              MODERN DELHI INFOTECH
            </h1>
            <p className="text-[11px] sm:text-xs font-bold text-red-600 tracking-widest uppercase mt-0.5">
              C O M P U T E R &nbsp; E D U C A T I O N &nbsp; &amp; &nbsp; T R A I N I N G &nbsp; C E N T R E
            </p>

            {/* Branch Code Badge */}
            <div className="inline-flex items-center gap-2 my-1.5">
              <span className="bg-blue-900 text-white font-bold text-[11px] px-2.5 py-0.5 rounded">
                BRANCH CODE
              </span>
              <span className="bg-amber-500 text-slate-950 font-black text-xs px-2 py-0.5 rounded">
                {inv.branchCode || "2"}
              </span>
            </div>

            <p className="text-[11px] sm:text-xs text-slate-600 font-medium">
              Near Janseva Nursing Home, Adarsh Nagar, Madhepura, Bihar – 852113 · ☎ +91 70500 12501
            </p>
          </div>

          {/* Invoice Document Bar */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between pb-3 border-b-2 border-blue-900 gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-blue-950 tracking-wide">
                FEE INVOICE
              </h2>
              <span className="text-[10px] sm:text-[11px] font-bold text-blue-800 tracking-wider">
                TAX INVOICE · GST @ 18% INCLUDED
              </span>
            </div>

            <div className="flex border border-slate-300 rounded text-center divide-x divide-slate-300 text-xs">
              <div className="px-3 py-1.5 bg-slate-50">
                <span className="text-[10px] text-slate-500 block">INVOICE NO.</span>
                <span className="font-mono font-bold text-slate-900">{inv.invoiceNo}</span>
              </div>
              <div className="px-3 py-1.5 bg-slate-50">
                <span className="text-[10px] text-slate-500 block">DATE</span>
                <span className="font-bold text-slate-900">{inv.date}</span>
              </div>
              <div className="px-3 py-1.5 bg-slate-50">
                <span className="text-[10px] text-slate-500 block">SESSION</span>
                <span className="font-bold text-slate-900">{inv.session || "2026-27"}</span>
              </div>
            </div>
          </div>

          {/* Student Details & Course Enrolled Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            
            {/* Student Details Card */}
            <div className="border border-slate-300 rounded-lg p-3 bg-slate-50/50">
              <div className="bg-blue-900 text-white font-bold text-[11px] px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">
                STUDENT DETAILS
              </div>
              <table className="w-full text-xs">
                <tbody>
                  <tr>
                    <td className="text-slate-500 py-0.5 w-24">Name</td>
                    <td className="font-bold text-slate-900">{inv.student.name}</td>
                  </tr>
                  <tr>
                    <td className="text-slate-500 py-0.5">S/o, D/o</td>
                    <td className="font-medium text-slate-800">{inv.student.fatherName}</td>
                  </tr>
                  <tr>
                    <td className="text-slate-500 py-0.5">Mobile</td>
                    <td className="font-mono font-medium text-slate-800">{inv.student.mobile}</td>
                  </tr>
                  <tr>
                    <td className="text-slate-500 py-0.5">Address</td>
                    <td className="text-slate-700 leading-snug">{inv.student.address}</td>
                  </tr>
                  <tr>
                    <td className="text-slate-500 py-0.5">Reg. No.</td>
                    <td className="font-mono font-bold text-blue-900">{inv.student.regNo}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Course Enrolled Card */}
            <div className="border border-slate-300 rounded-lg p-3 bg-slate-50/50">
              <div className="bg-blue-900 text-white font-bold text-[11px] px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">
                COURSE ENROLLED
              </div>
              
              <div className="flex items-start gap-3 mb-2">
                <div className="bg-blue-900 text-white font-bold text-sm px-2.5 py-1 rounded">
                  {inv.course.code}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-tight">
                    {inv.course.name}
                  </h4>
                </div>
              </div>

              <table className="w-full text-xs">
                <tbody>
                  <tr>
                    <td className="text-slate-500 py-0.5 w-24">Duration</td>
                    <td className="font-semibold text-slate-800">{inv.course.duration}</td>
                  </tr>
                  <tr>
                    <td className="text-slate-500 py-0.5">Batch No.</td>
                    <td className="font-semibold text-slate-800">{inv.course.batchNo}</td>
                  </tr>
                  <tr>
                    <td className="text-slate-500 py-0.5">Batch Time</td>
                    <td className="font-semibold text-slate-800">{inv.course.batchTime}</td>
                  </tr>
                  <tr>
                    <td className="text-slate-500 py-0.5">Admission</td>
                    <td className="font-semibold text-slate-800">{inv.course.admission}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          {/* Fee Particulars Table */}
          <div className="mt-4">
            <div className="bg-blue-900 text-white font-bold text-[11px] px-2.5 py-1 rounded-t uppercase tracking-wider flex justify-between">
              <span>FEE PARTICULARS</span>
              <span>AMOUNT (₹)</span>
            </div>
            
            <table className="w-full text-xs border border-t-0 border-slate-300">
              <tbody>
                <tr className="border-b border-slate-200">
                  <td className="p-2 w-8 text-center font-bold">1</td>
                  <td className="p-2">
                    <span className="font-bold text-slate-900">Course Fee — {inv.course.code}</span>
                    <p className="text-[11px] text-slate-500">{inv.course.name} · {inv.course.duration}</p>
                  </td>
                  <td className="p-2 text-right font-mono font-bold text-slate-900">
                    {inv.feeParticulars.courseFee.toFixed(2)}
                  </td>
                </tr>
                
                {/* GST Calculations */}
                <tr className="text-slate-600">
                  <td></td>
                  <td className="p-1.5 text-right font-medium">Amount (incl. GST)</td>
                  <td className="p-1.5 text-right font-mono">{inv.feeParticulars.amountInclGst.toFixed(2)}</td>
                </tr>
                <tr className="text-slate-600">
                  <td></td>
                  <td className="p-1 text-right">Less: CGST @ 9% (included)</td>
                  <td className="p-1 text-right font-mono text-rose-600">− {inv.feeParticulars.cgst9Percent.toFixed(2)}</td>
                </tr>
                <tr className="text-slate-600">
                  <td></td>
                  <td className="p-1 text-right">Less: SGST @ 9% (included)</td>
                  <td className="p-1 text-right font-mono text-rose-600">− {inv.feeParticulars.sgst9Percent.toFixed(2)}</td>
                </tr>
                <tr className="text-slate-800 font-medium">
                  <td></td>
                  <td className="p-1.5 text-right">Actual price (excl. GST)</td>
                  <td className="p-1.5 text-right font-mono">{inv.feeParticulars.actualPriceExclGst.toFixed(2)}</td>
                </tr>

                {/* Total Row */}
                <tr className="bg-amber-100/70 font-bold text-slate-900 border-t border-slate-300">
                  <td></td>
                  <td className="p-2 text-right text-xs sm:text-sm">Total Course Fee Payable (incl. GST)</td>
                  <td className="p-2 text-right font-mono text-xs sm:text-sm font-black">
                    ₹ {inv.feeParticulars.totalCourseFeePayable.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Installment & Payment Record */}
          <div className="mt-4">
            <div className="bg-blue-900 text-white font-bold text-[11px] px-2.5 py-1 rounded-t uppercase tracking-wider">
              INSTALLMENT &amp; PAYMENT RECORD
            </div>

            <table className="w-full text-xs border border-t-0 border-slate-300 text-left">
              <thead className="bg-slate-100 font-bold border-b border-slate-300 text-slate-700">
                <tr>
                  <th className="p-2 w-8">#</th>
                  <th className="p-2">INSTALLMENT</th>
                  <th className="p-2">DATE</th>
                  <th className="p-2">MODE / REF.</th>
                  <th className="p-2 text-center">STATUS</th>
                  <th className="p-2 text-right">AMOUNT (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {inv.installments.map((inst) => (
                  <tr key={inst.no}>
                    <td className="p-2 font-bold text-slate-700">{inst.no}</td>
                    <td className="p-2 font-medium">{inst.title}</td>
                    <td className="p-2 font-mono text-slate-600">{inst.date}</td>
                    <td className="p-2 text-slate-600">
                      {inst.mode}
                      {inst.ref && <span className="block text-[10px] text-slate-400 italic">{inst.ref}</span>}
                    </td>
                    <td className="p-2 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {inst.status}
                      </span>
                    </td>
                    <td className="p-2 text-right font-mono font-bold">{inst.amount.toFixed(2)}</td>
                  </tr>
                ))}
                
                {/* Total Paid Row */}
                <tr className="bg-slate-50 font-bold">
                  <td colSpan={5} className="p-2 text-right">Total paid</td>
                  <td className="p-2 text-right font-mono font-black">{inv.totalPaid.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Bottom Summary & Terms */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4">
            
            {/* Left Terms & Conditions */}
            <div className="sm:col-span-7 text-xs">
              <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                AMOUNT RECEIVED (IN WORDS)
              </p>
              <p className="font-bold text-slate-900 mt-0.5 bg-slate-50 p-2 rounded border border-slate-200">
                {inv.amountReceivedInWords}
              </p>

              <div className="mt-3">
                <span className="font-bold text-red-600 text-[10px] uppercase tracking-wider">
                  TERMS &amp; CONDITIONS
                </span>
                <ul className="text-[11px] text-slate-600 space-y-0.5 mt-1 list-disc pl-4 leading-snug">
                  <li>Fees once paid are non-refundable and non-transferable under any circumstances.</li>
                  <li>Please pay each installment on or before its due date.</li>
                  <li>Keep this invoice safe — it is required for exam forms and certificate collection.</li>
                </ul>
              </div>
            </div>

            {/* Right Balances and Dues Badge */}
            <div className="sm:col-span-5 bg-slate-50 rounded-xl p-3 border border-slate-300 flex flex-col justify-between">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Total course fee</span>
                  <span className="font-mono font-bold text-slate-900">₹ {inv.totalCourseFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Total paid</span>
                  <span className="font-mono font-bold text-slate-900">₹ {inv.totalPaid.toFixed(2)}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="my-2 text-center">
                <span className={`inline-block px-4 py-1 rounded font-bold text-xs ${
                  inv.balanceDues === 0
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-100 text-amber-800 border border-amber-300'
                }`}>
                  {inv.balanceDues === 0 ? 'FULLY PAID' : 'PARTIALLY PAID'}
                </span>
              </div>

              {/* Balance Dues Box */}
              <div className={`p-2.5 rounded text-white flex justify-between items-center ${
                inv.balanceDues === 0 ? 'bg-emerald-900' : 'bg-rose-900'
              }`}>
                <span className="font-bold text-xs uppercase tracking-wider">BALANCE DUES</span>
                <span className="font-mono font-black text-sm">₹ {inv.balanceDues.toFixed(2)}</span>
              </div>
            </div>

          </div>

          {/* Signatory */}
          <div className="mt-8 flex justify-end">
            <div className="text-center w-56">
              <div className="h-10 border-b border-slate-400 mb-1"></div>
              <p className="font-bold text-xs text-slate-900">Authorised Signatory</p>
              <p className="text-[11px] text-slate-500">For Modern Delhi Infotech</p>
            </div>
          </div>

          {/* Footer note matching original invoice */}
          <div className="mt-6 pt-3 border-t border-slate-300 text-center text-[10px] text-slate-500 space-y-0.5">
            <p className="font-medium text-slate-700">
              Main Branch: SBI Road, in front of Pradhi Yadav Hospital, Madhepura, Bihar – 852113 · +91 75469 95935 / +91 80515 16000
            </p>
            <p className="italic">
              This is a computer-generated invoice. Thank you for learning with us!
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default InvoiceViewerModal;

