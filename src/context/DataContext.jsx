import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  instituteInfo,
  initialCourses,
  initialBatches,
  initialStudents,
  initialInvoices,
  initialNotices,
  initialEnquiries,
  studentTestimonials
} from '../data/mdiData';

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

  const [batches, setBatches] = useState(() => {
    const saved = localStorage.getItem('mdi_batches');
    return saved ? JSON.parse(saved) : initialBatches;
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
    const actualPriceExclGst = +(newStudent.totalFee / 1.18).toFixed(2);
    const totalGst = +(newStudent.totalFee - actualPriceExclGst).toFixed(2);
    const cgst = +(totalGst / 2).toFixed(2);
    const sgst = +(totalGst / 2).toFixed(2);

    const newInvoice = {
      invoiceNo: `MDI/B${branchCode}/2026-27/${String(invoices.length + 1).padStart(4, '0')}`,
      date: newStudent.admissionDate,
      session: "2026-27",
      branchCode: branchCode,
      branchName: branchCode === "1" ? "Main Branch (SBI Road)" : "Branch 2 (Adarsh Nagar)",
      student: {
        name: newStudent.name,
        fatherName: newStudent.fatherName,
        mobile: newStudent.mobile,
        address: newStudent.address,
        regNo: newStudent.regNo
      },
      course: {
        code: newStudent.courseCode,
        name: newStudent.courseName,
        duration: newStudent.duration || "12 Months",
        batchNo: newStudent.batchNo || "Batch-1",
        batchTime: newStudent.batchTime || "08:00 AM – 09:30 AM",
        admission: newStudent.admissionDate
      },
      feeParticulars: {
        courseFee: Number(newStudent.totalFee),
        amountInclGst: Number(newStudent.totalFee),
        cgst9Percent: cgst,
        sgst9Percent: sgst,
        actualPriceExclGst: actualPriceExclGst,
        totalCourseFeePayable: Number(newStudent.totalFee)
      },
      installments: [
        {
          no: 1,
          title: "Installment 1",
          date: newStudent.admissionDate,
          mode: studentData.paymentMode || "Cash",
          ref: "Initial admission payment",
          status: "PAID",
          amount: Number(newStudent.paidFee)
        }
      ],
      amountReceivedInWords: `Rupees ${numberToWords(Number(newStudent.paidFee))} Only`,
      totalCourseFee: Number(newStudent.totalFee),
      totalPaid: Number(newStudent.paidFee),
      balanceDues: newStudent.balanceDues,
      status: newStudent.paymentStatus
    };

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
        addEnquiry,
        updateEnquiryStatus,
        addStudent,
        addNotice
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

// Helper for currency words
function numberToWords(num) {
  if (num === 12000) return "Twelve Thousand";
  if (num === 10500) return "Ten Thousand Five Hundred";
  if (num === 8000) return "Eight Thousand";
  if (num === 6000) return "Six Thousand";
  if (num === 5500) return "Five Thousand Five Hundred";
  if (num === 4500) return "Four Thousand Five Hundred";
  if (num === 2500) return "Two Thousand Five Hundred";
  if (num === 4000) return "Four Thousand";
  if (num === 15000) return "Fifteen Thousand";
  return `${num}`;
}
