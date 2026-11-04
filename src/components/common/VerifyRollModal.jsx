import React, { useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import StudentVerifier from './StudentVerifier';

// Quick "Verify Roll" pop-up opened from the header. Uses the same lookup as the Verify section.
const VerifyRollModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    // z-40 keeps the invoice viewer (z-50) on top when "View Official Fee Invoice" is clicked inside
    <div
      className="fixed inset-0 z-40 flex items-start sm:items-center justify-center p-3 sm:p-6 bg-slate-900/75 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="verify-roll-title"
    >
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-2xl bg-slate-50 rounded-3xl shadow-2xl overflow-hidden my-auto">
        <div className="flex items-start justify-between gap-4 px-6 py-5 bg-[#232f86] text-white">
          <div className="flex items-start gap-3">
            <span className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-300" />
            </span>
            <div>
              <h2 id="verify-roll-title" className="font-display font-bold text-lg leading-tight">Verify Student Roll / Certificate</h2>
              <p className="text-xs text-blue-100 mt-0.5">Enter a Registration No., Roll No. or registered mobile number.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/15" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5 sm:p-6">
          <StudentVerifier autoFocus />
        </div>
      </div>
    </div>
  );
};

export default VerifyRollModal;
