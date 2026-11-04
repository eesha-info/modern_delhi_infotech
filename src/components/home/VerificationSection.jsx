import React from 'react';
import StudentVerifier from '../common/StudentVerifier';

const VerificationSection = () => (
  <section id="verification" className="py-20 bg-white relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <span className="section-eyebrow">Online Student Verification Portal</span>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-3 tracking-tight">
          Verify Student Registration &amp; Certificate
        </h2>
        <p className="text-slate-600 text-base mt-3 leading-relaxed">
          Employers, government verification cells, and students can authenticate diplomas by entering the Registration Number.
        </p>
      </div>
      <StudentVerifier />
    </div>
  </section>
);

export default VerificationSection;
