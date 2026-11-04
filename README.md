# Modern Delhi Infotech (मॉडर्न दिल्ली इन्फोटेक)
### Computer Education & Training Centre, Madhepura, Bihar
**Regd. Govt. of India (भारत सरकार से मान्यता प्राप्त) · Estd. 2017**  
**Director & Lead Mentor: Sonu Kumar (Sonu Sir - BCA, MCA)**  
**Branch Code: 2 & 1**

🌐 **Live site:** https://eesha-info.github.io/modern_delhi_infotech/

---

## 🚀 Overview

A modern, attractive, fully responsive web application and educational portal built with **React.js**, **Tailwind CSS**, and **Lucide Icons** for **Modern Delhi Infotech**.

The application features:
1. **Public Institute Landing Page**: High-converting, trustworthy design highlighting Director Sonu Kumar, official accreditation, course offerings, 1:1 computer lab guarantee, fee breakdown, interactive typing lab, and branch locations.
2. **Online Admission Enquiry System**: Interactive form with real-time feedback that pushes leads directly to the admin inbox.
3. **Transparent Fee & GST Invoice Calculator**: Real-time CGST (9%) + SGST (9%) calculation matching the institute's genuine tax invoice format with 3-installment scheduling.
4. **Authentic Fee Invoice Viewer & Print Engine**: 1:1 replica of the genuine Modern Delhi Infotech Tax Invoice with printable formatting, terms & conditions, and receipt status.
5. **Interactive Typing Speed Test Widget**: Simulation for Bihar Beltron, BSSC, Civil Court & SSC tests (Hindi KrutiDev / Mangal and English touch typing).
6. **Student Roll / Registration Verification Portal**: Online search tool to verify diplomas and student credentials (e.g., `MDI-B2-456`).
7. **Role-Based Authentication**:
   - **Admin / Director Portal**: Manage students, issue GST tax invoices, review website leads, inspect batches, and track fee collection.
   - **Student Learning Portal**: Digital Student ID Card, ADIT 12-Month syllabus progress tracker, official fee invoice viewer, study notes library, and digital certificate preview.

---

## 🔑 Demo Login Credentials

For convenience, the Login modal features **1-Click Quick Demo** buttons for instant testing without typing passwords:

| Role | Identifier / Email | Password | Quick 1-Click Button |
|---|---|---|---|
| **Director / Admin** | `admin@moderndelhiinfotech.com` | `admin123` | **1-Click Demo: Login as Sonu Sir (Admin)** |
| **Enrolled Student** | `MDI-B2-456` (Rajeev Kumar) | `123456` | **1-Click Demo: Login as Rajeev Kumar (ADIT)** |

---

## 🏛️ Campuses & Branches (Madhepura, Bihar)

- **Branch 2 (Main Training Centre - Branch Code 2):**  
  Near Janseva Nursing Home, Adarsh Nagar, Madhepura, Bihar – 852113  
  ☎ **+91 70500 12501**
- **Main Branch (Branch 1):**  
  SBI Road, in front of Pradhi Yadav Hospital, Madhepura, Bihar – 852113  
  ☎ **+91 75469 95935 / +91 80515 16000**

---

## 💻 Tech Stack & Architecture

```
MDI/
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── public/
│   └── logo-icon.svg             # Vector emblem of Modern Delhi Infotech
└── src/
    ├── main.jsx
    ├── App.jsx                   # Central controller & view router
    ├── index.css                 # Custom scrollbars, glass effects, print styles
    ├── data/
    │   └── mdiData.js            # Structured mock data (courses, batches, students, invoices)
    ├── context/
    │   ├── AuthContext.jsx       # Role-based state (admin, student, guest) with localStorage
    │   └── DataContext.jsx       # Dynamic CRUD state (students, invoices, leads, notices)
    └── components/
        ├── common/               # Logo, TopNoticeBar, Navbar, Footer
        ├── home/                 # HeroSection, StatsBanner, CourseCatalog, DirectorMessage,
        │                         # WhyChooseMdi, FeeCalculator, TypingTestWidget,
        │                         # VerificationSection, BranchLocations, Testimonials, AdmissionModal
        ├── invoice/              # InvoiceViewerModal (1:1 printable MDI Tax Invoice)
        ├── auth/                 # LoginModal (Student & Admin tabs with 1-click demos)
        ├── admin/                # AdminDashboard (Metrics, Student Roster, Billing, Enquiries)
        └── student/              # StudentDashboard (ID Card, Progress, Invoices, Downloads)
```

---

## 🛠️ Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build
```



---

## 🚢 Deployment (GitHub Pages)

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the app with
`VITE_BASE=/modern_delhi_infotech/` and publishes `dist/` to GitHub Pages.

One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
To redeploy without a code change: **Actions → Deploy to GitHub Pages → Run workflow**.
