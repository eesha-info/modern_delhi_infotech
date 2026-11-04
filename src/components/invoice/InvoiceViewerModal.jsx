import React from 'react';
import { X, Printer, Download, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { asset } from '../../utils/asset';

const InvoiceViewerModal = () => {
  const { activeInvoice, setActiveInvoice } = useData();

  if (!activeInvoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const inv = activeInvoice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full my-auto shadow-2xl border border-slate-300 overflow-hidden flex flex-col">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="no-print bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-sm">Official Fee Invoice</span>
            <span className="text-xs bg-blue-600 px-2 py-0.5 rounded font-mono font-bold text-white">
              {inv.invoiceNo}
            </span>
            <span className="text-xs text-emerald-400 font-semibold hidden sm:inline">
              • {inv.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={() => setActiveInvoice(null)}
              className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Container (1:1 Exact layout matching MDI Fee Invoice PDF) */}
        <div id="printable-invoice" className="bg-white text-slate-900 font-sans p-6 sm:p-10 relative overflow-hidden text-xs sm:text-sm">
          
          {/* Top Decorative Blue & Orange Accent Stripe */}
          <div className="flex w-full h-1.5 mb-5 rounded-full overflow-hidden">
            <div className="w-2/3 bg-blue-900"></div>
            <div className="w-1/3 bg-amber-500"></div>
          </div>

          {/* Real Official Logo Watermark in Center Background */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
            <img
              src={asset('/mdi-real-logo-cropped.png')}
              alt="Watermark"
              className="w-72 h-72 sm:w-[440px] sm:h-[440px] object-contain opacity-[0.08] filter contrast-125"
              onError={(e) => {
                e.currentTarget.src = asset('/logo-icon.svg');
              }}
            />
          </div>

          {/* Header Section */}
          <div className="relative z-10 pb-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
              
              {/* Official Real Logo Emblem on Left */}
              <div className="flex-shrink-0">
                <img
                  src={asset('/mdi-real-logo-cropped.png')}
                  alt="Modern Delhi Infotech Official Logo"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                  onError={(e) => {
                    e.currentTarget.src = asset('/logo-icon.svg');
                  }}
                />
              </div>

              {/* Center Institute Identity */}
              <div className="text-center flex-1">
                <h1 className="font-serif font-black text-2xl sm:text-3xl text-brand-navy tracking-wide">
                  MODERN DELHI INFOTECH
                </h1>
                
                {/* Subtitle with accent lines */}
                <div className="flex items-center justify-center gap-3 my-1">
                  <span className="h-0.5 w-8 bg-amber-500 hidden sm:inline-block"></span>
                  <span className="text-[10px] sm:text-xs font-extrabold text-red-600 tracking-widest uppercase">
                    C O M P U T E R &nbsp; E D U C A T I O N &nbsp; &amp; &nbsp; T R A I N I N G &nbsp; C E N T R E
                  </span>
                  <span className="h-0.5 w-8 bg-amber-500 hidden sm:inline-block"></span>
                </div>

                {/* Branch Code Pill */}
                <div className="inline-flex items-center gap-2 my-1">
                  <span className="bg-brand-navy text-white font-bold text-[10px] px-2.5 py-0.5 rounded tracking-wider uppercase">
                    BRANCH CODE
                  </span>
                  <span className="bg-amber-500 text-slate-950 font-black text-xs px-2 py-0.5 rounded">
                    {inv.branchCode || "2"}
                  </span>
                </div>

                {/* Address */}
                <p className="text-[10px] sm:text-[11px] text-slate-600 font-medium mt-0.5">
                  Near Janseva Nursing Home, Adarsh Nagar, Madhepura, Bihar – 852113 · ☎ +91 70500 12501
                </p>
              </div>

              {/* Right Spacer for balance on desktop */}
              <div className="hidden sm:block w-20"></div>

            </div>
          </div>

          {/* Fee Invoice Title Bar & Meta Table */}
          <div className="relative z-10 mt-4 pt-3 border-t-2 border-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-serif font-black text-xl sm:text-2xl text-brand-navy tracking-wide">
                FEE INVOICE
              </h2>
              <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                TAX INVOICE · GST @ 18% INCLUDED
              </p>
            </div>

            {/* 3-Box Metadata Table */}
            <div className="flex border border-slate-300 rounded overflow-hidden divide-x divide-slate-300 text-xs">
              <div className="px-3.5 py-1.5 bg-slate-50 text-center">
                <span className="text-[9px] font-bold text-slate-500 block uppercase tracking-wider">INVOICE NO.</span>
                <span className="font-mono font-bold text-slate-900">{inv.invoiceNo}</span>
              </div>
              <div className="px-3.5 py-1.5 bg-slate-50 text-center">
                <span className="text-[9px] font-bold text-slate-500 block uppercase tracking-wider">DATE</span>
                <span className="font-bold text-slate-900">{inv.date}</span>
              </div>
              <div className="px-3.5 py-1.5 bg-slate-50 text-center">
                <span className="text-[9px] font-bold text-slate-500 block uppercase tracking-wider">SESSION</span>
                <span className="font-bold text-slate-900">{inv.session || "2026-27"}</span>
              </div>
            </div>
          </div>

          {/* Student Details & Course Enrolled Cards */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            
            {/* Student Details Card */}
            <div className="border border-slate-300 rounded-lg overflow-hidden bg-white">
              <div className="bg-brand-navy text-white font-bold text-[10px] px-3 py-1 uppercase tracking-wider">
                STUDENT DETAILS
              </div>
              <table className="w-full text-xs p-3 m-2">
                <tbody>
                  <tr>
                    <td className="text-slate-500 py-0.5 w-20">Name</td>
                    <td className="font-bold text-slate-900">{inv.student.name}</td>
                  </tr>
                  <tr>
                    <td className="text-slate-500 py-0.5">S/o, D/o</td>
                    <td className="text-slate-800">{inv.student.fatherName}</td>
                  </tr>
                  <tr>
                    <td className="text-slate-500 py-0.5">Mobile</td>
                    <td className="font-mono text-slate-800">{inv.student.mobile}</td>
                  </tr>
                  <tr>
                    <td className="text-slate-500 py-0.5">Address</td>
                    <td className="text-slate-800 leading-snug">{inv.student.address}</td>
                  </tr>
                  <tr>
                    <td className="text-slate-500 py-0.5">Reg. No.</td>
                    <td className="font-mono font-bold text-blue-900">{inv.student.regNo}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Course Enrolled Card */}
            <div className="border border-slate-300 rounded-lg overflow-hidden bg-white">
              <div className="bg-brand-navy text-white font-bold text-[10px] px-3 py-1 uppercase tracking-wider">
                COURSE ENROLLED
              </div>
              <div className="p-3">
                <div className="flex items-start gap-3 mb-2 pb-2 border-b border-slate-100">
                  <div className="bg-brand-navy text-white font-black text-sm px-2.5 py-1 rounded">
                    {inv.course.code}
                  </div>
                  <div className="font-bold text-slate-900 text-xs sm:text-sm leading-tight">
                    {inv.course.name}
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

          </div>

          {/* Fee Particulars Section */}
          <div className="relative z-10 mt-4">
            <h3 className="font-bold text-[10px] text-red-600 uppercase tracking-widest mb-1">
              FEE PARTICULARS
            </h3>

            <div className="border border-slate-300 rounded overflow-hidden">
              <table className="w-full text-xs">
                <thead className="bg-brand-navy text-white font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-2 w-10 text-center">SR.</th>
                    <th className="p-2 text-left">PARTICULARS</th>
                    <th className="p-2 text-right">AMOUNT (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2.5 text-center font-bold text-slate-700">1</td>
                    <td className="p-2.5">
                      <span className="font-bold text-slate-900">Course Fee — {inv.course.code}</span>
                      <p className="text-[11px] text-slate-500">{inv.course.name} · {inv.course.duration}</p>
                    </td>
                    <td className="p-2.5 text-right font-mono font-bold text-slate-900">
                      {inv.feeParticulars.courseFee.toFixed(2)}
                    </td>
                  </tr>

                  {/* GST Calculation Rows */}
                  <tr className="text-slate-600 text-[11px]">
                    <td></td>
                    <td className="p-1 text-right font-medium">Amount (incl. GST)</td>
                    <td className="p-1 text-right font-mono">{inv.feeParticulars.amountInclGst.toFixed(2)}</td>
                  </tr>
                  <tr className="text-slate-600 text-[11px]">
                    <td></td>
                    <td className="p-1 text-right">Less: CGST @ 9% (included)</td>
                    <td className="p-1 text-right font-mono text-rose-600">− {inv.feeParticulars.cgst9Percent.toFixed(2)}</td>
                  </tr>
                  <tr className="text-slate-600 text-[11px]">
                    <td></td>
                    <td className="p-1 text-right">Less: SGST @ 9% (included)</td>
                    <td className="p-1 text-right font-mono text-rose-600">− {inv.feeParticulars.sgst9Percent.toFixed(2)}</td>
                  </tr>
                  <tr className="text-slate-800 text-[11px] font-semibold">
                    <td></td>
                    <td className="p-1.5 text-right">Actual price (excl. GST)</td>
                    <td className="p-1.5 text-right font-mono">{inv.feeParticulars.actualPriceExclGst.toFixed(2)}</td>
                  </tr>

                  {/* Total Course Fee Row */}
                  <tr className="bg-amber-100/70 font-bold text-slate-900 border-t-2 border-slate-300">
                    <td></td>
                    <td className="p-2.5 text-right text-xs sm:text-sm font-black">
                      Total Course Fee Payable (incl. GST)
                    </td>
                    <td className="p-2.5 text-right font-mono text-xs sm:text-sm font-black">
                      ₹ {inv.feeParticulars.totalCourseFeePayable.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Installment & Payment Record Section */}
          <div className="relative z-10 mt-4">
            <h3 className="font-bold text-[10px] text-red-600 uppercase tracking-widest mb-1">
              INSTALLMENT &amp; PAYMENT RECORD
            </h3>

            <div className="border border-slate-300 rounded overflow-hidden">
              <table className="w-full text-xs text-left">
                <thead className="bg-brand-navy text-white font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-2 w-8 text-center">#</th>
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
                      <td className="p-2 text-center font-bold text-slate-700">{inst.no}</td>
                      <td className="p-2 font-medium">{inst.title}</td>
                      <td className="p-2 font-mono text-slate-600">{inst.date}</td>
                      <td className="p-2 text-slate-700">
                        {inst.mode}
                        {inst.ref && <span className="block text-[10px] text-slate-500 italic">{inst.ref}</span>}
                      </td>
                      <td className="p-2 text-center">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {inst.status}
                        </span>
                      </td>
                      <td className="p-2 text-right font-mono font-bold text-slate-900">
                        {inst.amount.toFixed(2)}
                      </td>
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
          </div>

          {/* Bottom Section: Words, Terms, Balances */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-4 mt-4">
            
            {/* Left: Words & Terms */}
            <div className="sm:col-span-7 text-xs space-y-3">
              <div>
                <span className="font-bold text-[10px] text-red-600 uppercase tracking-widest block">
                  AMOUNT RECEIVED (IN WORDS)
                </span>
                <p className="font-bold text-slate-900 mt-0.5 text-xs">
                  {inv.amountReceivedInWords}
                </p>
              </div>

              <div>
                <span className="font-bold text-[10px] text-red-600 uppercase tracking-widest block">
                  TERMS &amp; CONDITIONS
                </span>
                <ul className="text-[11px] text-slate-600 space-y-0.5 mt-1 list-disc pl-4 leading-snug">
                  <li>Fees once paid are non-refundable and non-transferable under any circumstances.</li>
                  <li>Please pay each installment on or before its due date.</li>
                  <li>Keep this invoice safe — it is required for exam forms and certificate collection.</li>
                </ul>
              </div>
            </div>

            {/* Right: Balances Summary Box */}
            <div className="sm:col-span-5 bg-white border border-slate-300 rounded-lg p-3 flex flex-col justify-between space-y-2">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Total course fee</span>
                  <span className="font-mono font-bold text-slate-900">₹ {inv.totalCourseFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Total paid</span>
                  <span className="font-mono font-bold text-slate-900">₹ {inv.totalPaid.toFixed(2)}</span>
                </div>
              </div>

              {/* Status Pill */}
              <div className="text-center py-1">
                <span className="inline-block px-3 py-0.5 rounded font-bold text-[11px] bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {inv.status}
                </span>
              </div>

              {/* Balance Dues Box */}
              <div className="bg-emerald-900 text-white p-2.5 rounded flex items-center justify-between">
                <span className="font-bold text-xs uppercase tracking-wider">BALANCE DUES</span>
                <span className="font-mono font-black text-sm">₹ {inv.balanceDues.toFixed(2)}</span>
              </div>
            </div>

          </div>

          {/* Authorised Signatory */}
          <div className="relative z-10 mt-8 flex justify-end">
            <div className="text-center w-56">
              <div className="h-10 border-b border-slate-400 mb-1"></div>
              <p className="font-bold text-xs text-slate-900">Authorised Signatory</p>
              <p className="text-[10px] text-slate-500">For Modern Delhi Infotech</p>
            </div>
          </div>

          {/* Bottom Footer Accent & Branches */}
          <div className="relative z-10 mt-6 pt-3 border-t border-slate-300 text-center text-[10px] text-slate-500 space-y-0.5">
            <p className="font-medium text-slate-700">
              Main Branch: SBI Road, in front of Pradhi Yadav Hospital, Madhepura, Bihar – 852113 · +91 75469 95935 / +91 80515 16000
            </p>
            <p className="italic text-slate-400">
              This is a computer-generated invoice. Thank you for learning with us!
            </p>

            {/* Bottom Accent Line */}
            <div className="flex w-full h-1 mt-2 rounded-full overflow-hidden">
              <div className="w-1/3 bg-amber-500"></div>
              <div className="w-2/3 bg-blue-900"></div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default InvoiceViewerModal;
