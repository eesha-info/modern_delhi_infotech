import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ThemeProvider } from './context/ThemeContext';

// Common Components
import TopNoticeBar from './components/common/TopNoticeBar';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Home Landing Page Sections
import HeroSection from './components/home/HeroSection';
import CourseCatalog from './components/home/CourseCatalog';
import WhyChooseMdi from './components/home/WhyChooseMdi';
import DirectorMessage from './components/home/DirectorMessage';
import TypingTestWidget from './components/home/TypingTestWidget';
import BranchLocations from './components/home/BranchLocations';
import Testimonials from './components/home/Testimonials';
import VerificationSection from './components/home/VerificationSection';
import AdmissionModal from './components/home/AdmissionModal';
import FinalCta from './components/home/FinalCta';
import DownloadsSection from './components/home/DownloadsSection';
import GallerySection from './components/home/GallerySection';
import VerifyRollModal from './components/common/VerifyRollModal';

// Modals & Dashboards
import LoginModal from './components/auth/LoginModal';
import InvoiceViewerModal from './components/invoice/InvoiceViewerModal';
import AdminDashboard from './components/admin/AdminDashboard';
import StudentDashboard from './components/student/StudentDashboard';

import { Phone } from 'lucide-react';
import { instituteInfo } from './data/mdiData';

const MainAppContent = () => {
  const { activeView, setActiveView, user } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAdmissionOpen, setIsAdmissionOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
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
    <div id="top" className="min-h-screen flex flex-col bg-white relative selection:bg-blue-700 selection:text-white">
      
      {/* 1. Top Notice Bar */}
      <TopNoticeBar onOpenAdmission={() => handleOpenAdmission(null)} />

      {/* 2. Main Sticky Navbar */}
      <Navbar
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenAdmission={() => handleOpenAdmission(null)}
        onOpenVerify={() => setIsVerifyOpen(true)}
      />

      {/* 3. Main Body Sections */}
      <main className="flex-1">
        
        {/* Hero Section */}
        <HeroSection
          onOpenAdmission={() => handleOpenAdmission(null)}
          onOpenLogin={() => setIsLoginOpen(true)}
          onOpenVerify={handleOpenVerify}
        />

        {/* Course Catalog (Clean layout, no public pricing) */}
        <CourseCatalog onOpenAdmission={handleOpenAdmission} />

        {/* Why Choose Modern Delhi Infotech */}
        <WhyChooseMdi />

        {/* Director's Desk: Sonu Kumar (Sonu Sir - BCA, MCA) */}
        <DirectorMessage onOpenAdmission={() => handleOpenAdmission(null)} />

        {/* Interactive Typing Speed Lab */}
        <TypingTestWidget onOpenAdmission={handleOpenAdmission} />

        {/* Campuses in Madhepura (Branch 2 & Branch 1) */}
        <BranchLocations onOpenAdmission={handleOpenAdmission} />

        {/* Photo Gallery */}
        <GallerySection onOpenAdmission={() => handleOpenAdmission(null)} />

        {/* Student Testimonials */}
        <Testimonials />

        {/* Student Roll / Certificate Verification */}
        <VerificationSection />

        {/* Downloads */}
        <DownloadsSection
          onOpenAdmission={() => handleOpenAdmission(null)}
          onOpenLogin={() => setIsLoginOpen(true)}
          onOpenVerify={handleOpenVerify}
        />

        {/* Closing Call-to-Action */}
        <FinalCta onOpenAdmission={() => handleOpenAdmission(null)} />

      </main>

      {/* 4. Polished Footer */}
      <Footer
        onOpenAdmission={() => handleOpenAdmission(null)}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenVerify={() => setIsVerifyOpen(true)}
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

      <VerifyRollModal isOpen={isVerifyOpen} onClose={() => setIsVerifyOpen(false)} />

      {/* Global Invoice Viewer Modal */}
      <InvoiceViewerModal />

      {/* Subtle Floating Phone Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <a
          href={`tel:${instituteInfo.contact.primaryPhone.replace(/\s+/g, '')}`}
          className="bg-emerald-600 hover:bg-emerald-500 text-white p-3.5 rounded-full shadow-xl flex items-center gap-2 border-2 border-white transition-all transform hover:scale-110 active:scale-95 group"
          title="Call Sonu Sir Directly: +91 70500 12501"
        >
          <Phone className="w-5 h-5 text-white" />
          <span className="hidden group-hover:inline text-xs font-bold pr-1">
            Call Sonu Sir
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
        <ThemeProvider>
          <MainAppContent />
        </ThemeProvider>
      </AuthProvider>
    </DataProvider>
  );
}

export default App;
