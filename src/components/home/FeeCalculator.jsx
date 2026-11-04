import React, { useState } from 'react';
import { initialCourses, initialInvoices } from '../../data/mdiData';
import { Calculator, FileText, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useData } from '../../context/DataContext';

const FeeCalculator = ({ onOpenAdmission }) => {
  const [selectedCourseId, setSelectedCourseId] = useState('adit');
  const [paymentPlan, setPaymentPlan] = useState('installments'); // 'onetime' | 'installments'
  const { setActiveInvoice } = useData();

  const selectedCourse = initialCourses.find(c => c.id === selectedCourseId) || initialCourses[0];

  const totalFee = selectedCourse.fee;
  const actualPriceExclGst = +(totalFee / 1.18).toFixed(2);
  const totalGst = +(totalFee - actualPriceExclGst).toFixed(2);
  const cgst = +(totalGst / 2).toFixed(2);
  const sgst = +(totalGst / 2).toFixed(2);

  // Installment breakdowns
  const inst1 = Math.round(totalFee * 0.5);
  const inst2 = Math.round(totalFee * 0.3);
  const inst3 = totalFee - inst1 - inst2;

  const handleOpenSampleInvoice = () => {
    // Open Rajeev Kumar's authentic invoice as specimen
    setActiveInvoice(initialInvoices[0]);
  };

  return (
    <section id="fees" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Transparent Pricing & GST Invoicing
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-3 tracking-tight">
            Transparent Course Fee & Tax Invoice Calculator
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            No hidden admission fees or surprise exam fees. Every student receives an official GST-compliant tax invoice.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Course Selection & Options */}
          <div className="lg:col-span-5 bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-700" />
              Select Course to Calculate
            </h3>

            <div className="space-y-3">
              {initialCourses.slice(0, 6).map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedCourseId(c.id)}
                  className={`p-4 rounded-2xl cursor-pointer border transition-all flex items-center justify-between ${
                    selectedCourseId === c.id
                      ? 'bg-blue-700 text-white border-blue-700 shadow-md scale-[1.01]'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-black ${
                        selectedCourseId === c.id ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-800'
                      }`}>
                        {c.code}
                      </span>
                      <span className="font-bold text-sm">{c.name.split('(')[0]}</span>
                    </div>
                    <span className={`text-xs block mt-1 ${
                      selectedCourseId === c.id ? 'text-blue-100' : 'text-slate-500'
                    }`}>
                      Duration: {c.duration}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-display font-extrabold text-base">
                      ₹{c.fee.toLocaleString()}
                    </span>
                    <span className={`text-[10px] block ${
                      selectedCourseId === c.id ? 'text-blue-200' : 'text-slate-400'
                    }`}>
                      incl. GST
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Payment method toggle */}
            <div className="mt-6 pt-5 border-t border-slate-200">
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Choose Payment Mode Preference:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setPaymentPlan('installments')}
                  className={`py-2 px-3 rounded-xl border text-center transition-all ${
                    paymentPlan === 'installments'
                      ? 'bg-blue-100 text-blue-800 border-blue-400 font-bold'
                      : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  3 Installments
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentPlan('onetime')}
                  className={`py-2 px-3 rounded-xl border text-center transition-all ${
                    paymentPlan === 'onetime'
                      ? 'bg-blue-100 text-blue-800 border-blue-400 font-bold'
                      : 'bg-white text-slate-600 border-slate-200'
                  }`}
                >
                  One-Time Settlement
                </button>
              </div>
            </div>

          </div>

          {/* Right: Authentic MDI Invoice Calculation Breakdown */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-xl relative">
            
            {/* Header matching authentic invoice */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-200 gap-3">
              <div>
                <span className="text-[11px] font-bold text-amber-600 uppercase tracking-widest">
                  FEE PARTICULARS BREAKDOWN
                </span>
                <h4 className="text-xl font-display font-black text-slate-900 mt-0.5">
                  Course Fee — {selectedCourse.code}
                </h4>
                <p className="text-xs text-slate-500">
                  {selectedCourse.name} · {selectedCourse.duration}
                </p>
              </div>

              <button
                onClick={handleOpenSampleInvoice}
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-xl text-xs font-bold transition-colors"
              >
                <FileText className="w-4 h-4 text-blue-600" />
                <span>View Authentic MDI Invoice</span>
              </button>
            </div>

            {/* GST Table Breakdown */}
            <div className="mt-6 bg-slate-50 rounded-2xl p-5 border border-slate-200 text-xs sm:text-sm">
              <div className="flex justify-between py-2 border-b border-slate-200 text-slate-700">
                <span className="font-semibold">Course Fee Amount (incl. 18% GST)</span>
                <span className="font-bold text-slate-900">₹{totalFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-200 text-slate-600">
                <span>Less: CGST @ 9% (included)</span>
                <span className="text-rose-600 font-mono">− ₹{cgst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-200 text-slate-600">
                <span>Less: SGST @ 9% (included)</span>
                <span className="text-rose-600 font-mono">− ₹{sgst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-200 text-slate-700">
                <span className="font-medium">Actual Course Price (excl. GST)</span>
                <span className="font-mono text-slate-800">₹{actualPriceExclGst.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-3 text-base sm:text-lg font-display font-black text-slate-900 bg-amber-50/70 -mx-5 -mb-5 px-5 rounded-b-2xl border-t border-amber-200/80">
                <span>Total Course Fee Payable</span>
                <span className="text-blue-900">₹{totalFee.toFixed(2)}</span>
              </div>
            </div>

            {/* Installment Schedule Preview */}
            <div className="mt-8">
              <h5 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                {paymentPlan === 'installments' ? 'Flexible 3-Installment Schedule:' : 'One-Time Payment Schedule:'}
              </h5>

              {paymentPlan === 'installments' ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold text-blue-700 uppercase">Installment 1</span>
                    <p className="text-base font-extrabold text-slate-900 mt-1">₹{inst1.toLocaleString()}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">At time of admission</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold text-blue-700 uppercase">Installment 2</span>
                    <p className="text-base font-extrabold text-slate-900 mt-1">₹{inst2.toLocaleString()}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">After 30 days</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-[10px] font-bold text-blue-700 uppercase">Installment 3</span>
                    <p className="text-base font-extrabold text-slate-900 mt-1">₹{inst3.toLocaleString()}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Before semester exam</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs flex items-center justify-between">
                  <div>
                    <span className="font-bold text-emerald-900 text-sm">Full Payment at Admission</span>
                    <p className="text-emerald-700 mt-0.5">Receive immediate fully-paid invoice and study kit</p>
                  </div>
                  <span className="text-lg font-black text-emerald-950">₹{totalFee.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Terms note */}
            <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 space-y-0.5">
              <p>• Official computer-generated invoice issued immediately with QR verification.</p>
              <p>• Installment payments accepted in Cash, UPI, and Bank Transfer at both branches.</p>
            </div>

            {/* Action */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onOpenAdmission(selectedCourse)}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Enroll in {selectedCourse.code} Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default FeeCalculator;

