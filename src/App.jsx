import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

// Common Components
import TopNoticeBar from './components/common/TopNoticeBar';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Home Landing Page Sections
import HeroSection from './components/home/HeroSection';
import StatsBanner from './components/home/StatsBanner';
import CourseCatalog from './components/home/CourseCatalog';
import DirectorMessage from './components/home/DirectorMessage';
import WhyChooseMdi from './components/home/WhyChooseMdi';
import FeeCalculator from './components/home/FeeCalculator';
import TypingTestWidget from './components/home/TypingTestWidget';
import VerificationSection from './components/home/VerificationSection';
import BranchLocations from './components/home/BranchLocations';
import Testimonials from './components/home/Testimonials';
import AdmissionModal from './components/home/AdmissionModal';

// Modals & Dashboards
import LoginModal from './components/auth/LoginModal';
import InvoiceViewerModal from './components/invoice/InvoiceViewerModal';
import AdminDashboard from './components/admin/AdminDashboard';
import StudentDashboard from './components/student/StudentDashboard';

import { Phone, ShieldCheck, GraduationCap, ArrowUp } from 'lucide-react';
import { instituteInfo } from './data/mdiData';

const MainAppContent = () => {
  const { activeView, setActiveView, user, isAdmin, isStudent } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [selectedCourseForAdmission, setSelectedCourseForAdmission] = useState(null);

  const handleOpenAdmission = (course = null) => {
    setSelectedCourseForAdmission(course);
    setIsAdmissionOpen(true);
  };

  const handleOpenVerify = () => {
    if (activeView !== 'landing') {
      setActiveView('landing');
      setTimeout(() => {
        document.getElementById('verification')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('verification')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // If currently in Admin Dashboard view
  if (activeView === 'admin' && user?.role === 'admin') {
    return (
      <>
        <AdminDashboard />
        <InvoiceViewerModal />
      </>
    );
  }

  // If currently in Student Dashboard view
  if (activeView === 'student' && user?.role === 'student') {
    return (
      <>
        <StudentDashboard />
        <InvoiceViewerModal />
      </>
    );
  }

  // Default: Public Responsive Landing Page
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative selection:bg-blue-700 selection:text-white">
      
      {/* Top Notice Bar with Announcement & Call Ticker */}
      <TopNoticeBar onOpenAdmission={() => handleOpenAdmission(null)} />

      {/* Main Sticky Navbar */}
      <Navbar
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenAdmission={() => handleOpenAdmission(null)}
        onOpenVerify={handleOpenVerify}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* 1. Hero Section */}
        <HeroSection
          onOpenAdmission={() => handleOpenAdmission(null)}
          onOpenLogin={() => setIsLoginOpen(true)}
          onOpenVerify={handleOpenVerify}
        />

        {/* 2. Key Stats Trust Banner */}
        <StatsBanner />

        {/* 3. Course Catalog with Filters & Syllabus Modal */}
        <CourseCatalog onOpenAdmission={handleOpenAdmission} />

        {/* 4. Director's Desk: Sonu Kumar (Sonu Sir, BCA, MCA) */}
        <DirectorMessage onOpenAdmission={() => handleOpenAdmission(null)} />

        {/* 5. Why Choose Modern Delhi Infotech */}
        <WhyChooseMdi />

        {/* 6. Transparent Fee & GST Invoice Calculator */}
        <FeeCalculator onOpenAdmission={handleOpenAdmission} />

        {/* 7. Interactive Typing Speed Lab (Hindi & English) */}
        <TypingTestWidget onOpenAdmission={handleOpenAdmission} />

        {/* 8. Online Student Roll / Certificate Verification */}
        <VerificationSection />

        {/* 9. Two Campuses in Madhepura (Branch 2 & Branch 1) */}
        <BranchLocations onOpenAdmission={handleOpenAdmission} />

        {/* 10. Student Testimonials & Success Stories */}
        <Testimonials />

      </main>

      {/* Footer */}
      <Footer
        onOpenAdmission={() => handleOpenAdmission(null)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenVerify={handleOpenVerify}
      />

      {/* Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      {isAdmissionOpen && (
        <AdmissionModal
          initialCourse={selectedCourseForAdmission}
          onClose={() => {
            setIsAdmissionOpen(false);
            setSelectedCourseForAdmission(null);
          }}
        />
      )}

      {/* Global Invoice Viewer Modal */}
      <InvoiceViewerModal />

      {/* Floating Action Quick Access (Mobile & Desktop) */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-2 items-end">
        {/* If logged in, quick dashboard toggle */}
        {user && (
          <button
            onClick={() => setActiveView(isAdmin ? 'admin' : 'student')}
            className={`px-4 py-2.5 rounded-full text-white font-bold text-xs shadow-2xl flex items-center gap-2 border border-white/20 transition-all transform hover:scale-105 ${
              isAdmin ? 'bg-blue-900' : 'bg-emerald-700'
            }`}
          >
            {isAdmin ? <ShieldCheck className="w-4 h-4 text-amber-400" /> : <GraduationCap className="w-4 h-4 text-emerald-300" />}
            <span>{isAdmin ? 'Back to Admin Portal' : 'Back to Student Portal'}</span>
          </button>
        )}

        {/* Quick Phone Call Sonu Sir Floating Button */}
        <a
          href={`tel:${instituteInfo.contact.primaryPhone.replace(/\s+/g, '')}`}
          className="bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-2xl flex items-center gap-2 border-2 border-white transition-all transform hover:scale-110 active:scale-95"
          title="Call Sonu Sir Directly"
        >
          <Phone className="w-5 h-5 text-white" />
          <span className="hidden sm:inline text-xs font-bold pr-1">
            Call Sonu Sir (+91 70500 12501)
          </span>
        </a>
      </div>

    </div>
  );
};

function App() {
  return (
    <DataProvider>
      <AuthProvider>
        <MainAppContent />
      </AuthProvider>
    </DataProvider>
  );
}

export default App;
