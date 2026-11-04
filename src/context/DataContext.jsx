import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  instituteInfo,
  initialCourses,
  initialBatches,
  initialStudents,
  initialInvoices,
  initialNotices,
  initialEnquiries,
  initialAttendance,
  studentTestimonials
} from '../data/mdiData';
import {
  DAY_PATTERNS,
  initialQuestions,
  initialTests,
  initialTestResults,
  initialCertificates
} from '../data/academicData';

const load = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
};

const todayLabel = () =>
  new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

const daysOverlap = (a = 'Daily', b = 'Daily') => {
  const da = DAY_PATTERNS[a]?.days || DAY_PATTERNS.Daily.days;
  const db = DAY_PATTERNS[b]?.days || DAY_PATTERNS.Daily.days;
  return da.some((d) => db.includes(d));
};

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('mdi_courses');
    return saved ? JSON.parse(saved) : initialCourses;
  });

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('mdi_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('mdi_invoices');
    return saved ? JSON.parse(saved) : initialInvoices;
  });

  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem('mdi_notices');
    return saved ? JSON.parse(saved) : initialNotices;
  });

  const [enquiries, setEnquiries] = useState(() => {
    const saved = localStorage.getItem('mdi_enquiries');
    return saved ? JSON.parse(saved) : initialEnquiries;
  });

  const [batches, setBatches] = useState(() =>
    load('mdi_batches', initialBatches).map((b) => ({ days: 'Daily', ...b }))
  );

  const [questions, setQuestions] = useState(() => load('mdi_questions', initialQuestions));
  const [tests, setTests] = useState(() => load('mdi_tests', initialTests));
  const [testResults, setTestResults] = useState(() => load('mdi_test_results', initialTestResults));
  const [certificates, setCertificates] = useState(() => load('mdi_certificates', initialCertificates));

  const [attendanceData, setAttendanceData] = useState(() => {
    const saved = localStorage.getItem('mdi_attendance');
    return saved ? JSON.parse(saved) : initialAttendance;
  });

  // Selected invoice for the full modal viewer
  const [activeInvoice, setActiveInvoice] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('mdi_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('mdi_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('mdi_invoices', JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem('mdi_enquiries', JSON.stringify(enquiries));
  }, [enquiries]);

  useEffect(() => {
    localStorage.setItem('mdi_notices', JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem('mdi_attendance', JSON.stringify(attendanceData));
  }, [attendanceData]);

  useEffect(() => { localStorage.setItem('mdi_batches', JSON.stringify(batches)); }, [batches]);
  useEffect(() => { localStorage.setItem('mdi_questions', JSON.stringify(questions)); }, [questions]);
  useEffect(() => { localStorage.setItem('mdi_tests', JSON.stringify(tests)); }, [tests]);
  useEffect(() => { localStorage.setItem('mdi_test_results', JSON.stringify(testResults)); }, [testResults]);
  useEffect(() => { localStorage.setItem('mdi_certificates', JSON.stringify(certificates)); }, [certificates]);

  /* ---------------- Course Management ---------------- */
  const saveCourse = (course) => {
    const code = course.code.trim().toUpperCase();
    const normalized = {
      category: 'Diploma',
      level: 'Beginner',
      highlights: [],
      syllabus: [],
      careers: [],
      hindiName: '',
      description: '',
      eligibility: 'Open to All',
      ...course,
      code,
      id: course.id || code.toLowerCase(),
      fee: Number(course.fee || 0),
      durationMonths: Number(course.durationMonths || 0),
      duration: course.durationMonths ? `${course.durationMonths} Months` : course.duration,
    };
    setCourses((prev) =>
      prev.some((c) => c.id === normalized.id)
        ? prev.map((c) => (c.id === normalized.id ? normalized : c))
        : [...prev, normalized]
    );
    return normalized;
  };

  const deleteCourse = (id) => setCourses((prev) => prev.filter((c) => c.id !== id));

  /* ---------------- Batch Management ---------------- */
  // Students are linked to a batch via batchNo "Batch-<n>" where batch id is "B<n>".
  const batchNoFor = (batchId) => `Batch-${batchId.replace(/^B/, '')}`;
  const studentsInBatch = (batchId) =>
    students.filter((s) => s.batchNo === batchNoFor(batchId) || s.batchNo?.includes(batchId));

  // Returns the batch that clashes (same branch + room + time, overlapping days), or null.
  const findBatchClash = (candidate) =>
    batches.find(
      (b) =>
        b.id !== candidate.id &&
        b.branch === candidate.branch &&
        b.room.trim().toLowerCase() === candidate.room.trim().toLowerCase() &&
        b.timing === candidate.timing &&
        daysOverlap(b.days, candidate.days)
    ) || null;

  const saveBatch = (batch) => {
    if (batch.id) {
      setBatches((prev) => prev.map((b) => (b.id === batch.id ? { ...b, ...batch } : b)));
      // keep students' displayed batch timing in sync
      setStudents((prev) =>
        prev.map((s) => (s.batchNo === batchNoFor(batch.id) ? { ...s, batchTime: batch.timing } : s))
      );
      return batch;
    }
    const nextNum = batches.reduce((m, b) => Math.max(m, Number(b.id.replace(/\D/g, '')) || 0), 0) + 1;
    const created = { ...batch, id: `B${nextNum}`, maxCapacity: Number(batch.maxCapacity || 20), enrolled: 0 };
    setBatches((prev) => [...prev, created]);
    return created;
  };

  const deleteBatch = (id) => {
    setBatches((prev) => prev.filter((b) => b.id !== id));
    setStudents((prev) =>
      prev.map((s) => (s.batchNo === batchNoFor(id) ? { ...s, batchNo: 'Unassigned', batchTime: '' } : s))
    );
  };

  const assignStudentToBatch = (studentId, batchId) => {
    const batch = batches.find((b) => b.id === batchId);
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? batch
            ? { ...s, batchNo: batchNoFor(batchId), batchTime: batch.timing, batchDays: batch.days }
            : { ...s, batchNo: 'Unassigned', batchTime: '', batchDays: '' }
          : s
      )
    );
  };

  /* ---------------- Fee Management ---------------- */
  const recordPayment = (regNo, { amount, mode = 'Cash', ref = '' }) => {
    const amt = Number(amount);
    if (!amt || amt <= 0) return false;
    const date = todayLabel();

    const st = students.find((x) => x.regNo === regNo);
    setInvoices((prev) => {
      const list = prev.some((inv) => inv.student?.regNo === regNo) || !st
        ? prev
        : [buildInvoice(st, prev.length + 1), ...prev];
      return list.map((inv) => {
        if (inv.student?.regNo !== regNo) return inv;
        const totalPaid = (inv.totalPaid || 0) + amt;
        const balanceDues = Math.max(0, (inv.totalCourseFee || 0) - totalPaid);
        const installments = [
          ...(inv.installments || []),
          {
            no: (inv.installments?.length || 0) + 1,
            title: `Installment ${(inv.installments?.length || 0) + 1}`,
            date,
            mode,
            ref: ref || 'Fee collected at counter',
            status: 'PAID',
            amount: amt,
          },
        ];
        return {
          ...inv,
          installments,
          totalPaid,
          balanceDues,
          status: balanceDues === 0 ? 'FULLY PAID' : 'PARTIAL',
          amountReceivedInWords: `Rupees ${numberToWords(amt)} Only`,
        };
      });
    });

    setStudents((prev) =>
      prev.map((s) => {
        if (s.regNo !== regNo) return s;
        const paidFee = Number(s.paidFee || 0) + amt;
        const balanceDues = Math.max(0, Number(s.totalFee || 0) - paidFee);
        return { ...s, paidFee, balanceDues, paymentStatus: balanceDues === 0 ? 'FULLY PAID' : 'PARTIAL' };
      })
    );
    return true;
  };

  /* ---------------- Question Bank & Online Tests ---------------- */
  const saveQuestion = (q) => {
    const item = { ...q, answer: Number(q.answer), id: q.id || `q-${Date.now().toString(36)}` };
    setQuestions((prev) =>
      prev.some((x) => x.id === item.id) ? prev.map((x) => (x.id === item.id ? item : x)) : [item, ...prev]
    );
    return item;
  };

  const deleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    setTests((prev) => prev.map((t) => ({ ...t, questionIds: t.questionIds.filter((qid) => qid !== id) })));
  };

  const saveTest = (t) => {
    const item = {
      status: 'Published',
      createdOn: todayLabel(),
      ...t,
      durationMinutes: Number(t.durationMinutes || 10),
      passMarks: Number(t.passMarks || 40),
      id: t.id || `test-${Date.now().toString(36)}`,
    };
    setTests((prev) =>
      prev.some((x) => x.id === item.id) ? prev.map((x) => (x.id === item.id ? item : x)) : [item, ...prev]
    );
    return item;
  };

  const deleteTest = (id) => setTests((prev) => prev.filter((t) => t.id !== id));

  // answers: { [questionId]: optionIndex }
  const submitTestAttempt = (testId, student, answers) => {
    const test = tests.find((t) => t.id === testId);
    if (!test) return null;
    const qs = test.questionIds.map((id) => questions.find((q) => q.id === id)).filter(Boolean);
    const correct = qs.filter((q) => answers[q.id] === q.answer).length;
    const percent = qs.length ? Math.round((correct / qs.length) * 100) : 0;
    const result = {
      id: `res-${Date.now().toString(36)}`,
      testId,
      testTitle: test.title,
      studentId: student.id,
      regNo: student.regNo,
      studentName: student.name,
      correct,
      total: qs.length,
      percent,
      passed: percent >= test.passMarks,
      answers,
      submittedOn: todayLabel(),
    };
    setTestResults((prev) => [result, ...prev.filter((r) => !(r.testId === testId && r.regNo === student.regNo))]);
    return result;
  };

  /* ---------------- Certification ---------------- */
  const issueCertificate = ({ regNo, grade, remark, percent, issueDate }) => {
    const st = students.find((s) => s.regNo === regNo);
    if (!st) return null;
    const existing = certificates.find((c) => c.regNo === regNo && c.courseCode === st.courseCode);
    const seq = String(certificates.length + 1).padStart(4, '0');
    const cert = {
      id: existing?.id || `cert-${Date.now().toString(36)}`,
      certificateNo: existing?.certificateNo || `MDI/B${st.branchCode || '2'}/CERT/2026/${seq}`,
      regNo,
      studentName: st.name,
      fatherName: st.fatherName,
      courseCode: st.courseCode,
      courseName: st.courseName,
      duration: st.duration,
      grade,
      remark,
      percent: Number(percent),
      issueDate: issueDate || todayLabel(),
      status: 'Issued',
    };
    setCertificates((prev) => [cert, ...prev.filter((c) => c.id !== cert.id)]);
    return cert;
  };

  const revokeCertificate = (id) => setCertificates((prev) => prev.filter((c) => c.id !== id));

  const markBatchAttendance = (batchId, date, attendanceMap) => {
    setAttendanceData(prev => ({
      ...prev,
      [batchId]: {
        ...(prev[batchId] || {}),
        [date]: attendanceMap
      }
    }));
    return true;
  };

  // Actions
  const addEnquiry = (enquiryData) => {
    const newEnquiry = {
      id: `enq-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'New',
      ...enquiryData
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
    return newEnquiry;
  };

  const updateEnquiryStatus = (id, newStatus) => {
    setEnquiries(prev =>
      prev.map(item => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  const addStudent = (studentData) => {
    const regSeq = (students.length + 457).toString();
    const branchCode = studentData.branchCode || "2";
    const regNo = `MDI-B${branchCode}-${regSeq}`;
    
    const newStudent = {
      id: `std-${Date.now().toString().slice(-4)}`,
      regNo,
      rollNo: regSeq,
      admissionDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      session: "2026-27",
      status: "Active",
      attendance: "100%",
      progress: 0,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
      role: "student",
      balanceDues: Number(studentData.totalFee || 0) - Number(studentData.paidFee || 0),
      paymentStatus: Number(studentData.paidFee || 0) >= Number(studentData.totalFee || 0) ? "FULLY PAID" : "PARTIAL",
      ...studentData
    };

    setStudents(prev => [newStudent, ...prev]);

    // Automatically generate invoice for the new student
    const newInvoice = buildInvoice(newStudent, invoices.length + 1, studentData.paymentMode || 'Cash');

    setInvoices(prev => [newInvoice, ...prev]);
    return newStudent;
  };

  const addNotice = (noticeData) => {
    const newNotice = {
      id: `not-${Date.now().toString().slice(-4)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      ...noticeData
    };
    setNotices(prev => [newNotice, ...prev]);
  };

  return (
    <DataContext.Provider
      value={{
        instituteInfo,
        courses,
        batches,
        students,
        invoices,
        notices,
        enquiries,
        testimonials: studentTestimonials,
        activeInvoice,
        setActiveInvoice,
        attendanceData,
        markBatchAttendance,
        addEnquiry,
        updateEnquiryStatus,
        addStudent,
        addNotice,
        // Course management
        saveCourse,
        deleteCourse,
        // Batch management
        saveBatch,
        deleteBatch,
        assignStudentToBatch,
        studentsInBatch,
        findBatchClash,
        // Fees
        recordPayment,
        // Online tests
        questions,
        tests,
        testResults,
        saveQuestion,
        deleteQuestion,
        saveTest,
        deleteTest,
        submitTestAttempt,
        // Certification
        certificates,
        issueCertificate,
        revokeCertificate
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};


// Builds a GST invoice record for a student. The amount already paid becomes Installment 1.
function buildInvoice(st, seq, mode = 'Cash') {
  const branchCode = st.branchCode || '2';
  const total = Number(st.totalFee || 0);
  const paid = Number(st.paidFee || 0);
  const actualPriceExclGst = +(total / 1.18).toFixed(2);
  const totalGst = +(total - actualPriceExclGst).toFixed(2);
  const half = +(totalGst / 2).toFixed(2);
  const balanceDues = Math.max(0, total - paid);
  return {
    invoiceNo: `MDI/B${branchCode}/2026-27/${String(seq).padStart(4, '0')}`,
    date: st.admissionDate,
    session: st.session || '2026-27',
    branchCode,
    branchName: branchCode === '1' ? 'Main Branch (SBI Road)' : 'Branch 2 (Adarsh Nagar)',
    student: { name: st.name, fatherName: st.fatherName, mobile: st.mobile, address: st.address, regNo: st.regNo },
    course: {
      code: st.courseCode,
      name: st.courseName,
      duration: st.duration || '12 Months',
      batchNo: st.batchNo || 'Batch-1',
      batchTime: st.batchTime || '08:00 AM – 09:30 AM',
      admission: st.admissionDate
    },
    feeParticulars: {
      courseFee: total,
      amountInclGst: total,
      cgst9Percent: half,
      sgst9Percent: half,
      actualPriceExclGst,
      totalCourseFeePayable: total
    },
    installments: paid > 0
      ? [{ no: 1, title: 'Installment 1', date: st.admissionDate, mode, ref: 'Initial admission payment', status: 'PAID', amount: paid }]
      : [],
    amountReceivedInWords: `Rupees ${numberToWords(paid)} Only`,
    totalCourseFee: total,
    totalPaid: paid,
    balanceDues,
    status: balanceDues === 0 ? 'FULLY PAID' : 'PARTIAL'
  };
}

// Helper for currency words (Indian numbering: thousand, lakh, crore)
function numberToWords(num) {
  num = Math.floor(Number(num) || 0);
  if (num === 0) return 'Zero';
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
    'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const two = (n) => (n < 20 ? ones[n] : `${tens[Math.floor(n / 10)]}${n % 10 ? ' ' + ones[n % 10] : ''}`);
  const three = (n) => {
    const h = Math.floor(n / 100);
    const r = n % 100;
    return [h ? `${ones[h]} Hundred` : '', r ? two(r) : ''].filter(Boolean).join(' ');
  };
  const parts = [];
  const crore = Math.floor(num / 10000000); num %= 10000000;
  const lakh = Math.floor(num / 100000); num %= 100000;
  const thousand = Math.floor(num / 1000); num %= 1000;
  if (crore) parts.push(`${two(crore)} Crore`);
  if (lakh) parts.push(`${two(lakh)} Lakh`);
  if (thousand) parts.push(`${two(thousand)} Thousand`);
  if (num) parts.push(three(num));
  return parts.join(' ');
}
