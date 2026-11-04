import React from 'react';
import { QrCode } from 'lucide-react';

// Printable completion certificate. Always rendered on white paper, independent of dashboard theme.
const CertificateCard = ({ cert }) => (
  <div
    id="printable-certificate"
    style={{ backgroundColor: '#ffffff', color: '#141414' }}
    className="rounded-lg p-8 sm:p-12 shadow-md border-4 border-amber-600/30 max-w-3xl mx-auto text-center relative overflow-hidden"
  >
    <div className="w-16 h-16 mx-auto mb-3">
      <img src="/mdi-real-logo-cropped.png" alt="MDI" className="w-full h-full object-contain" />
    </div>
    <h2 className="text-xl sm:text-2xl font-black font-serif text-slate-900 tracking-tight">MODERN DELHI INFOTECH</h2>
    <p className="text-xs text-slate-600 font-semibold uppercase tracking-widest mt-0.5">
      Computer Education &amp; Training Centre · Madhepura (Bihar)
    </p>
    <p className="text-[10px] text-amber-800 font-bold uppercase tracking-wider mt-1">
      Regd. Govt. of India (भारत सरकार से मान्यता प्राप्त)
    </p>

    <div className="my-6">
      <span className="text-xs italic text-slate-500 font-serif block">This is to proudly certify that</span>
      <h3 className="text-2xl font-black text-blue-950 font-serif mt-1 border-b-2 border-amber-400 inline-block pb-1 px-4">
        {cert.studentName}
      </h3>
      <p className="text-xs text-slate-600 mt-2">
        {cert.fatherName && <>Son/Daughter of <strong>{cert.fatherName}</strong>, </>}having Registration No.{' '}
        <strong className="font-mono">{cert.regNo}</strong>
      </p>
      <p className="text-xs text-slate-600 mt-1 max-w-lg mx-auto">
        has successfully completed the {cert.duration} course{' '}
        <strong className="text-slate-900">{cert.courseName} ({cert.courseCode})</strong> securing{' '}
        <strong className="text-emerald-700">{cert.percent}% · Grade {cert.grade} ({cert.remark})</strong>.
      </p>
    </div>

    <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 px-2 sm:px-6 gap-4">
      <div className="text-left">
        <span className="text-[10px] text-slate-400 block uppercase">Issue Date</span>
        <strong className="text-slate-900">{cert.issueDate}</strong>
        <span className="text-[10px] text-slate-400 block uppercase mt-2">Certificate No.</span>
        <strong className="text-slate-900 font-mono text-[10px]">{cert.certificateNo}</strong>
      </div>
      <div className="text-center">
        <div className="w-14 h-14 mx-auto bg-slate-100 p-1 border border-slate-200 rounded flex items-center justify-center">
          <QrCode className="w-10 h-10 text-slate-700" />
        </div>
        <span className="text-[9px] text-slate-400 font-mono block mt-1">Verify by Reg. No. online</span>
      </div>
      <div className="text-right">
        <span className="text-xs font-serif italic text-blue-900 block font-bold">Sonu Kumar</span>
        <span className="text-[10px] text-slate-500 block">Director (BCA, MCA)</span>
        <span className="text-[9px] text-amber-700 font-bold uppercase">Modern Delhi Infotech</span>
      </div>
    </div>
  </div>
);

export default CertificateCard;
