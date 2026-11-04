export const instituteInfo = {
  name: "Modern Delhi Infotech",
  hindiName: "मॉडर्न दिल्ली इन्फोटेक",
  tagline: "Computer Education & Training Centre",
  hindiTagline: "कम्प्यूटर प्रशिक्षण केन्द्र",
  established: "2017",
  affiliation: "Regd. Govt. of India (भारत सरकार से मान्यता प्राप्त)",
  director: {
    name: "Sonu Kumar",
    honorific: "Sonu Sir",
    qualification: "BCA, MCA",
    role: "Director & Chief Technical Mentor",
    experience: "10+ Years of Teaching Excellence",
    message: "At Modern Delhi Infotech, our mission is to empower every young mind in Bihar with cutting-edge computer education, high-speed typing skills, and job-ready practical training. We believe quality technology education should be accessible, modern, and backed by genuine personal mentorship.",
    phone: "+91 70500 12501"
  },
  contact: {
    primaryPhone: "+91 70500 12501",
    alternatePhones: ["+91 75469 95935", "+91 80515 16000"],
    email: "info@moderndelhiinfotech.com",
    supportEmail: "support@moderndelhiinfotech.com",
    workingHours: "Monday – Saturday: 7:00 AM – 7:00 PM (Sunday Open for Practice Labs)"
  },
  branches: [
    {
      id: "branch-2",
      code: "2",
      name: "Branch 2 (Main Centre)",
      isPrimary: true,
      address: "Near Janseva Nursing Home, Adarsh Nagar",
      city: "Madhepura",
      state: "Bihar",
      pincode: "852113",
      phone: "+91 70500 12501",
      timing: "7:00 AM – 7:00 PM",
      features: ["Advanced 50+ PC Lab", "High Speed Fiber Wi-Fi", "Fully AC Classrooms", "Hindi & English Typing Lab"],
      mapUrl: "https://maps.google.com/?q=Madhepura,Bihar"
    },
    {
      id: "branch-1",
      code: "1",
      name: "Main Branch",
      isPrimary: false,
      address: "SBI Road, in front of Pradhi Yadav Hospital",
      city: "Madhepura",
      state: "Bihar",
      pincode: "852113",
      phone: "+91 75469 95935 / +91 80515 16000",
      timing: "8:00 AM – 6:30 PM",
      features: ["Practical Training Lab", "Tally & GST Dedicated Setup", "Career Counseling Desk", "Library & Notes Corner"],
      mapUrl: "https://maps.google.com/?q=SBI+Road+Madhepura,Bihar"
    }
  ],
  stats: {
    studentsTrained: "8,500+",
    placementRate: "94%",
    yearsExcellence: "9+ Years",
    certifiedFaculty: "15+",
    pcsInLab: "80+"
  }
};

export const initialCourses = [
  {
    id: "adit",
    code: "ADIT",
    name: "Advanced Diploma in Information Technology",
    hindiName: "एडवांस्ड डिप्लोमा इन इंफॉर्मेशन टेक्नोलॉजी",
    duration: "12 Months",
    durationMonths: 12,
    fee: 12000,
    category: "Diploma",
    level: "Advanced",
    badge: "Most Popular",
    popular: true,
    highlights: ["Complete IT & Office Suite", "C & C++ Programming", "Web Design (HTML, CSS, JS)", "Database & SQL", "Hardware & Networking", "Live Project"],
    eligibility: "10th / 12th Pass (Any Stream)",
    careers: ["IT Assistant", "Computer Operator", "Web Designer", "Office Executive", "Lab Instructor"],
    description: "Our comprehensive flagship 1-year diploma program designed to transform beginners into fully-qualified computer and IT professionals ready for private and government sector opportunities.",
    syllabus: [
      { module: "Module 1", title: "Fundamentals & OS", topics: ["Computer Architecture", "Windows 10/11", "File Management", "Control Panel & Utilities"] },
      { module: "Module 2", title: "MS Office Professional Suite", topics: ["MS Word Advanced", "MS Excel (VLOOKUP, Pivot, Formulas)", "MS PowerPoint", "MS Access"] },
      { module: "Module 3", title: "Accounting with Tally Prime", topics: ["Basics of Accounting", "Voucher Entry", "Inventory & Stock", "GST Invoicing & Returns"] },
      { module: "Module 4", title: "Web Design & Internet Tech", topics: ["HTML5", "CSS3", "JavaScript Basics", "Domain & Hosting basics", "Cyber Security"] },
      { module: "Module 5", title: "Programming Logic", topics: ["Flowcharts & Algorithms", "C Language Basics", "C++ OOP Concepts", "Problem Solving"] },
      { module: "Module 6", title: "Project & Hindi/English Typing", topics: ["Real-world project", "Govt exam typing speed training", "Interview Preparation"] }
    ]
  },
  {
    id: "adca",
    code: "ADCA",
    name: "Advanced Diploma in Computer Applications",
    hindiName: "एडवांस्ड डिप्लोमा इन कम्प्यूटर एप्लीकेशन्स",
    duration: "12 Months",
    durationMonths: 12,
    fee: 10500,
    category: "Diploma",
    level: "Advanced",
    badge: "Govt Job Preferred",
    popular: true,
    highlights: ["MS Office Suite Full", "Tally Prime with GST", "Photoshop & CorelDraw (DTP)", "Internet & Cyber Ethics", "Bilingual Typing"],
    eligibility: "10th / 12th Pass",
    careers: ["Data Entry Operator", "Accountant Assistant", "DTP Designer", "Govt Office Executive"],
    description: "The ideal course for government and corporate job aspirants in Bihar (Beltron, SSC, BSSC, Courts) covering applications, office productivity, and accounting.",
    syllabus: [
      { module: "Module 1", title: "Computer Basics & Operating System", topics: ["Hardware concepts", "Windows tools", "File and Folder management"] },
      { module: "Module 2", title: "MS Office Master Suite", topics: ["Word Formatting", "Excel Formulas & Reports", "PowerPoint Presentation"] },
      { module: "Module 3", title: "DTP Graphics Suite", topics: ["Adobe Photoshop CS6", "CorelDRAW basics", "PageMaker", "Banner & Card Printing"] },
      { module: "Module 4", title: "Financial Accounting", topics: ["Tally Prime 4.0", "Ledger & Daybook", "GST Reports & Billing"] },
      { module: "Module 5", title: "Typing & Exam Skills", topics: ["Hindi KrutiDev 010 & Mangal", "English 35+ WPM", "Online mock typing tests"] }
    ]
  },
  {
    id: "dca",
    code: "DCA",
    name: "Diploma in Computer Applications",
    hindiName: "डिप्लोमा इन कम्प्यूटर एप्लीकेशन्स",
    duration: "6 Months",
    durationMonths: 6,
    fee: 5500,
    category: "Diploma",
    level: "Intermediate",
    badge: "Quick Foundation",
    popular: true,
    highlights: ["Computer Basics", "MS Office Complete", "Internet & Email", "Basic Hindi/English Typing"],
    eligibility: "Matriculation (10th Pass)",
    careers: ["Office Clerk", "Data Entry Operator", "Cyber Cafe Operator", "Store Assistant"],
    description: "A fast-track 6-month diploma providing essential computer literacy and office tool proficiency required for daily computer operations and clerical exams.",
    syllabus: [
      { module: "Module 1", title: "Computer Concept & Windows", topics: ["Computer Hardware & Software", "Notepad, Wordpad, Paint", "Windows Shortcuts"] },
      { module: "Module 2", title: "MS Word & Document Styling", topics: ["Official Letters", "Tables & Formatting", "Mail Merge", "Resume Making"] },
      { module: "Module 3", title: "MS Excel Spreadsheet", topics: ["Spreadsheet calculations", "Formulas (SUM, IF, COUNT)", "Charts & Printing"] },
      { module: "Module 4", title: "Internet Applications & Utilities", topics: ["Web Browsing", "Emailing", "Govt Portals & Form Filling", "Online Payments"] }
    ]
  },
  {
    id: "tally-gst",
    code: "TALLY",
    name: "Tally Prime with GST & E-Way Bill",
    hindiName: "टैली प्राइम एवं जीएसटी ट्रेनिंग",
    duration: "3 Months",
    durationMonths: 3,
    fee: 4500,
    category: "Accounting",
    level: "Job-Oriented",
    badge: "Job Ready",
    popular: true,
    highlights: ["Tally Prime 4.0", "GST Invoicing (CGST, SGST, IGST)", "Balance Sheet & P&L", "Payroll Management", "Audit & Taxation"],
    eligibility: "12th / B.Com / Any Graduate",
    careers: ["Accountant", "GST Practitioner Assistant", "Billing Clerk", "Store Inventory Manager"],
    description: "Practical accounting training on authentic industry scenarios. Learn debit/credit, ledger creation, GST tax invoice generation, and financial closing.",
    syllabus: [
      { module: "Module 1", title: "Accounting Principles", topics: ["Golden Rules of Accounting", "Journal Entries", "Ledgers & Trial Balance"] },
      { module: "Module 2", title: "Tally Prime Company Setup", topics: ["Company Creation", "Group & Ledger Creation", "Voucher Types"] },
      { module: "Module 3", title: "GST & Taxation", topics: ["GST Rates & HSN Codes", "Tax Invoices", "GSTR-1, GSTR-3B Reports", "TDS Basics"] },
      { module: "Module 4", title: "Inventory & Final Accounts", topics: ["Stock Groups & Units", "Purchase & Sales Orders", "Profit & Loss", "Balance Sheet"] }
    ]
  },
  {
    id: "typing-master",
    code: "TYPING",
    name: "Hindi + English Professional Typing",
    hindiName: "हिन्दी + अंग्रेजी टाइपिंग स्पीड कोर्स",
    duration: "3 Months",
    durationMonths: 3,
    fee: 2500,
    category: "Skill Certification",
    level: "All Levels",
    badge: "Beltron / Govt Exam Special",
    popular: true,
    highlights: ["English Touch Typing (40+ WPM)", "Hindi KrutiDev 010 & Mangal (Remington/Inscript)", "Beltron & SSC Pattern Software", "Accuracy Certification"],
    eligibility: "Open to All",
    careers: ["Beltron DEO", "Court Steno/Typist", "High Court Clerk", "BSSC Typist", "Private Secretary"],
    description: "Specially designed for students preparing for Bihar Beltron, Civil Court, High Court, and central government typing tests with dedicated speed improvement drills.",
    syllabus: [
      { module: "Module 1", title: "Fingering & Home Row", topics: ["Correct sitting posture", "Home row, top row, bottom row keys", "Number keypad"] },
      { module: "Module 2", title: "English Speed Enhancement", topics: ["Word building", "Paragraph typing", "Speed tests with error penalties"] },
      { module: "Module 3", title: "Hindi Typing Mastery", topics: ["KrutiDev 010 font layout", "Mangal Inscript & Remington Gail", "Alt code special characters"] },
      { module: "Module 4", title: "Exam Simulation", topics: ["Beltron exam simulator", "Civil Court timed test", "Certificate speed evaluation"] }
    ]
  },
  {
    id: "dtp",
    code: "DTP",
    name: "Desktop Publishing & Graphic Designing (DTP)",
    hindiName: "डेस्कटॉप पब्लिशिंग (DTP)",
    duration: "3 Months",
    durationMonths: 3,
    fee: 4000,
    category: "Design",
    level: "Creative",
    badge: "Creative Skill",
    popular: false,
    highlights: ["Adobe Photoshop CC", "CorelDraw Vector Art", "Adobe PageMaker", "Flex, Banner & Visiting Card Design"],
    eligibility: "10th Pass",
    careers: ["Graphic Designer", "Printing Press Operator", "Banner Maker", "Freelancer"],
    description: "Learn to design promotional banners, wedding cards, flex boards, social media posters, and magazine layouts for local business and printing presses.",
    syllabus: [
      { module: "Module 1", title: "Adobe Photoshop", topics: ["Photo Retouching", "Layers, Masks, Filters", "Background removal", "Color correction"] },
      { module: "Module 2", title: "CorelDRAW", topics: ["Vector shapes", "Logo creation", "Brochures, Pamphlets", "Print preparation"] },
      { module: "Module 3", title: "PageMaker & Typography", topics: ["Page setup", "Hindi book publishing", "Visiting cards & Bills", "Exporting for print"] }
    ]
  },
  {
    id: "web-dev",
    code: "WEB-DEV",
    name: "Full Stack Web & Frontend Development",
    hindiName: "वेब डेवलपमेंट एवं कोडिंग",
    duration: "6 Months",
    durationMonths: 6,
    fee: 15000,
    category: "Programming",
    level: "Advanced",
    badge: "High Salary Career",
    popular: false,
    highlights: ["HTML5, CSS3, Tailwind CSS", "Modern JavaScript (ES6+)", "React.js Framework", "Node.js & Express API", "GitHub & Deployment"],
    eligibility: "12th / BCA / B.Tech / Enthusiast",
    careers: ["Junior Frontend Developer", "React Developer", "Web Designer", "Tech Freelancer"],
    description: "Learn modern web development from industry fundamentals to building interactive responsive React web applications and REST APIs.",
    syllabus: [
      { module: "Module 1", title: "HTML5 & Modern CSS", topics: ["Semantic tags", "Flexbox & CSS Grid", "Responsive Design", "Tailwind CSS"] },
      { module: "Module 2", title: "JavaScript Programming", topics: ["Variables, Data Types, Functions", "DOM Manipulation", "Async/Await, Fetch API", "ES6 Modules"] },
      { module: "Module 3", title: "React.js Ecosystem", topics: ["Components, Props, State", "Hooks (useState, useEffect)", "Routing & Single Page Apps"] },
      { module: "Module 4", title: "Full Stack & Project", topics: ["Node.js Server", "Connecting Database", "Deploying to Vercel/Netlify", "Portfolio Website"] }
    ]
  },
  {
    id: "python",
    code: "PYTHON",
    name: "Python Programming & Data Basics",
    hindiName: "पायथन प्रोग्रामिंग",
    duration: "3 Months",
    durationMonths: 3,
    fee: 6000,
    category: "Programming",
    level: "Beginner to Intermediate",
    badge: "Trending Tech",
    popular: false,
    highlights: ["Python 3 Core", "Data Structures", "OOP Concepts", "File Handling", "Mini Automation Projects"],
    eligibility: "10th / 12th Pass with basic math",
    careers: ["Python Trainee", "Automation Assistant", "Data Entry Specialist"],
    description: "Learn the world's most versatile and beginner-friendly programming language with practical coding exercises guided by Sonu Sir.",
    syllabus: [
      { module: "Module 1", title: "Python Basics", topics: ["Syntax, Variables, Operations", "Conditionals & Loops", "Functions & Scopes"] },
      { module: "Module 2", title: "Data Structures", topics: ["Lists, Tuples, Dictionaries, Sets", "String Manipulation", "List Comprehension"] },
      { module: "Module 3", title: "OOP & Projects", topics: ["Classes & Objects", "File I/O", "Mini Calculator / Automation Project"] }
    ]
  }
];

// All batches are 1 hour. Each hour can run two batches of the same type on alternate days:
// MWF (Mon/Wed/Fri) and TTS (Tue/Thu/Sat). Students attend 3 days theory + 3 days lab.
// capacity = classroom seats (Theory) or PCs (Lab).
export const initialBatches = [
  { id: "B1", name: "ADIT Theory – Morning MWF", type: "Theory", courseCode: "ADIT", days: "MWF", timing: "07:00 AM – 08:00 AM", room: "Classroom 1", instructor: "Sonu Kumar", maxCapacity: 30, branch: "Branch 2" },
  { id: "B2", name: "ADCA Theory – Morning TTS", type: "Theory", courseCode: "ADCA", days: "TTS", timing: "07:00 AM – 08:00 AM", room: "Classroom 1", instructor: "Sonu Kumar", maxCapacity: 30, branch: "Branch 2" },
  { id: "B3", name: "DCA Theory – MWF", type: "Theory", courseCode: "DCA", days: "MWF", timing: "08:00 AM – 09:00 AM", room: "Classroom 1", instructor: "Vikash Sir", maxCapacity: 30, branch: "Branch 2" },
  { id: "B4", name: "ADCA Theory – TTS", type: "Theory", courseCode: "ADCA", days: "TTS", timing: "08:00 AM – 09:00 AM", room: "Classroom 1", instructor: "Pooja Ma'am", maxCapacity: 30, branch: "Branch 2" },
  { id: "B5", name: "Tally Theory – MWF", type: "Theory", courseCode: "TALLY", days: "MWF", timing: "09:00 AM – 10:00 AM", room: "Classroom 1", instructor: "Sonu Kumar", maxCapacity: 30, branch: "Branch 1" },
  { id: "B6", name: "Typing Theory – TTS", type: "Theory", courseCode: "TYPING", days: "TTS", timing: "09:00 AM – 10:00 AM", room: "Classroom 2", instructor: "Ramesh Sir", maxCapacity: 30, branch: "Branch 2" },
  { id: "B7", name: "ADIT Lab – Morning TTS", type: "Lab", courseCode: "ADIT", days: "TTS", timing: "07:00 AM – 08:00 AM", room: "Lab A", instructor: "Vikash Sir", maxCapacity: 20, branch: "Branch 2" },
  { id: "B8", name: "ADCA Lab – Morning MWF", type: "Lab", courseCode: "ADCA", days: "MWF", timing: "07:00 AM – 08:00 AM", room: "Lab A", instructor: "Pooja Ma'am", maxCapacity: 20, branch: "Branch 2" },
  { id: "B9", name: "DCA Lab – TTS", type: "Lab", courseCode: "DCA", days: "TTS", timing: "08:00 AM – 09:00 AM", room: "Lab A", instructor: "Vikash Sir", maxCapacity: 20, branch: "Branch 2" },
  { id: "B10", name: "Tally Lab – TTS", type: "Lab", courseCode: "TALLY", days: "TTS", timing: "09:00 AM – 10:00 AM", room: "Lab B", instructor: "Sonu Kumar", maxCapacity: 20, branch: "Branch 1" },
  { id: "B11", name: "Typing Lab – MWF", type: "Lab", courseCode: "TYPING", days: "MWF", timing: "09:00 AM – 10:00 AM", room: "Typing Lab", instructor: "Ramesh Sir", maxCapacity: 20, branch: "Branch 2" }
];

// Default capacity used when creating a new batch (editable in Batch Management).
export const defaultBatchSettings = { theoryCapacity: 30, labCapacity: 20 };

export const initialStudents = [
  {
    id: "std-001",
    regNo: "MDI-B2-456",
    rollNo: "456",
    name: "Rajeev Kumar",
    fatherName: "Suresh Prasad Yadav",
    mobile: "+919431258394",
    email: "rajeev.kumar@gmail.com",
    address: "Room 101 First Floor, Mirras Residency Neelima Green",
    city: "Madhepura",
    branchCode: "2",
    branchName: "Branch 2 (Adarsh Nagar)",
    courseCode: "ADIT",
    courseName: "Advanced Diploma in Information Technology",
    duration: "12 Months",
    batchNo: "Batch-1",
    batchTime: "07:00 AM – 08:00 AM",
    labBatchNo: "Batch-7",
    labBatchTime: "07:00 AM – 08:00 AM",
    admissionDate: "31-Oct-2026",
    session: "2026-27",
    totalFee: 12000,
    paidFee: 12000,
    balanceDues: 0,
    paymentStatus: "FULLY PAID",
    status: "Active",
    attendance: "94%",
    progress: 88,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    role: "student",
    pcNumber: "PC-01",
    typingSpeed: { english: 42, hindi: 34 }
  },
  {
    id: "std-002",
    regNo: "MDI-B2-457",
    rollNo: "457",
    name: "Priya Kumari",
    fatherName: "Manoj Sharma",
    mobile: "+919876543210",
    email: "priya.k@gmail.com",
    address: "Ward No. 6, College Chowk, Madhepura",
    city: "Madhepura",
    branchCode: "2",
    branchName: "Branch 2 (Adarsh Nagar)",
    courseCode: "ADCA",
    courseName: "Advanced Diploma in Computer Applications",
    duration: "12 Months",
    batchNo: "Batch-2",
    batchTime: "07:00 AM – 08:00 AM",
    labBatchNo: "Batch-8",
    labBatchTime: "07:00 AM – 08:00 AM",
    admissionDate: "15-Aug-2026",
    session: "2026-27",
    totalFee: 10500,
    paidFee: 8000,
    balanceDues: 2500,
    paymentStatus: "PARTIAL",
    status: "Active",
    attendance: "91%",
    progress: 65,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    role: "student",
    pcNumber: "PC-04",
    typingSpeed: { english: 38, hindi: 28 }
  },
  {
    id: "std-003",
    regNo: "MDI-B1-208",
    rollNo: "208",
    name: "Amit Kumar Verma",
    fatherName: "Dinesh Verma",
    mobile: "+919123456780",
    email: "amit.verma@gmail.com",
    address: "SBI Road, Madhepura",
    city: "Madhepura",
    branchCode: "1",
    branchName: "Main Branch (SBI Road)",
    courseCode: "TALLY",
    courseName: "Tally Prime with GST & E-Way Bill",
    duration: "3 Months",
    batchNo: "Batch-5",
    batchTime: "09:00 AM – 10:00 AM",
    labBatchNo: "Batch-10",
    labBatchTime: "09:00 AM – 10:00 AM",
    admissionDate: "10-Sep-2026",
    session: "2026-27",
    totalFee: 4500,
    paidFee: 4500,
    balanceDues: 0,
    paymentStatus: "FULLY PAID",
    status: "Completed",
    attendance: "98%",
    progress: 100,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    role: "student",
    pcNumber: "PC-12",
    typingSpeed: { english: 32, hindi: 20 }
  },
  {
    id: "std-004",
    regNo: "MDI-B2-490",
    rollNo: "490",
    name: "Anjali Singh",
    fatherName: "Rakesh Kumar Singh",
    mobile: "+919345678912",
    email: "anjali.s@gmail.com",
    address: "B.P Mandal Chowk, Madhepura",
    city: "Madhepura",
    branchCode: "2",
    branchName: "Branch 2 (Adarsh Nagar)",
    courseCode: "TYPING",
    courseName: "Hindi + English Professional Typing",
    duration: "3 Months",
    batchNo: "Batch-6",
    batchTime: "09:00 AM – 10:00 AM",
    labBatchNo: "Batch-11",
    labBatchTime: "09:00 AM – 10:00 AM",
    admissionDate: "01-Oct-2026",
    session: "2026-27",
    totalFee: 2500,
    paidFee: 2500,
    balanceDues: 0,
    paymentStatus: "FULLY PAID",
    status: "Active",
    attendance: "96%",
    progress: 75,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    role: "student",
    pcNumber: "PC-08",
    typingSpeed: { english: 46, hindi: 38 }
  },
  {
    id: "std-005",
    regNo: "MDI-B2-458",
    rollNo: "458",
    name: "Rohan Roy",
    fatherName: "Subhash Roy",
    mobile: "+919456781230",
    email: "rohan.roy@gmail.com",
    address: "Adarsh Nagar, Madhepura",
    city: "Madhepura",
    branchCode: "2",
    branchName: "Branch 2 (Adarsh Nagar)",
    courseCode: "ADIT",
    courseName: "Advanced Diploma in Information Technology",
    duration: "12 Months",
    batchNo: "Batch-1",
    batchTime: "07:00 AM – 08:00 AM",
    labBatchNo: "Batch-7",
    labBatchTime: "07:00 AM – 08:00 AM",
    admissionDate: "01-Nov-2026",
    session: "2026-27",
    totalFee: 12000,
    paidFee: 6000,
    balanceDues: 6000,
    paymentStatus: "PARTIAL",
    status: "Active",
    attendance: "90%",
    progress: 30,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    role: "student",
    pcNumber: "PC-02",
    typingSpeed: { english: 35, hindi: 22 }
  },
  {
    id: "std-006",
    regNo: "MDI-B2-459",
    rollNo: "459",
    name: "Neha Sharma",
    fatherName: "Pawan Sharma",
    mobile: "+919654321098",
    email: "neha.s@gmail.com",
    address: "College Road, Madhepura",
    city: "Madhepura",
    branchCode: "2",
    branchName: "Branch 2 (Adarsh Nagar)",
    courseCode: "ADIT",
    courseName: "Advanced Diploma in Information Technology",
    duration: "12 Months",
    batchNo: "Batch-1",
    batchTime: "07:00 AM – 08:00 AM",
    labBatchNo: "Batch-7",
    labBatchTime: "07:00 AM – 08:00 AM",
    admissionDate: "01-Nov-2026",
    session: "2026-27",
    totalFee: 12000,
    paidFee: 12000,
    balanceDues: 0,
    paymentStatus: "FULLY PAID",
    status: "Active",
    attendance: "100%",
    progress: 45,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    role: "student",
    pcNumber: "PC-03",
    typingSpeed: { english: 40, hindi: 30 }
  },
  {
    id: "std-007",
    regNo: "MDI-B2-460",
    rollNo: "460",
    name: "Alok Nath",
    fatherName: "Ram Chandra Yadav",
    mobile: "+919712345678",
    email: "alok.nath@gmail.com",
    address: "Station Road, Madhepura",
    city: "Madhepura",
    branchCode: "2",
    branchName: "Branch 2 (Adarsh Nagar)",
    courseCode: "ADCA",
    courseName: "Advanced Diploma in Computer Applications",
    duration: "12 Months",
    batchNo: "Batch-2",
    batchTime: "07:00 AM – 08:00 AM",
    labBatchNo: "Batch-8",
    labBatchTime: "07:00 AM – 08:00 AM",
    admissionDate: "18-Aug-2026",
    session: "2026-27",
    totalFee: 10500,
    paidFee: 10500,
    balanceDues: 0,
    paymentStatus: "FULLY PAID",
    status: "Active",
    attendance: "95%",
    progress: 70,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
    role: "student",
    pcNumber: "PC-05",
    typingSpeed: { english: 36, hindi: 25 }
  },
  {
    id: "std-008",
    regNo: "MDI-B2-461",
    rollNo: "461",
    name: "Vikram Kumar Yadav",
    fatherName: "Rajendra Yadav",
    mobile: "+919834567890",
    email: "vikram.y@gmail.com",
    address: "Janseva Lane, Madhepura",
    city: "Madhepura",
    branchCode: "2",
    branchName: "Branch 2 (Adarsh Nagar)",
    courseCode: "DCA",
    courseName: "Diploma in Computer Applications",
    duration: "6 Months",
    batchNo: "Batch-3",
    batchTime: "08:00 AM – 09:00 AM",
    labBatchNo: "Batch-9",
    labBatchTime: "08:00 AM – 09:00 AM",
    admissionDate: "05-Sep-2026",
    session: "2026-27",
    totalFee: 5500,
    paidFee: 5500,
    balanceDues: 0,
    paymentStatus: "FULLY PAID",
    status: "Active",
    attendance: "92%",
    progress: 60,
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
    role: "student",
    pcNumber: "PC-07",
    typingSpeed: { english: 30, hindi: 20 }
  }
];

export const initialAttendance = {
  "B1": {
    "2026-11-04": {
      "std-001": { status: "Present", remark: "On time" },
      "std-005": { status: "Present", remark: "Lab A" },
      "std-006": { status: "Present", remark: "Typing practice" }
    }
  },
  "B2": {
    "2026-11-04": {
      "std-002": { status: "Present", remark: "Excel formula class" },
      "std-007": { status: "Late", remark: "10 mins late" }
    }
  },
  "B3": {
    "2026-11-04": {
      "std-008": { status: "Present", remark: "MS Word test" }
    }
  },
  "B5": {
    "2026-11-04": {
      "std-003": { status: "Present", remark: "GST invoicing" }
    }
  },
  "B6": {
    "2026-11-04": {
      "std-004": { status: "Present", remark: "Hindi KrutiDev speed 38 WPM" }
    }
  }
};

export const initialInvoices = [
  {
    invoiceNo: "MDI/B2/2026-27/0001",
    date: "31-Oct-2026",
    session: "2026-27",
    branchCode: "2",
    branchName: "Branch 2 (Adarsh Nagar)",
    student: {
      name: "Rajeev Kumar",
      fatherName: "Suresh Prasad Yadav",
      mobile: "+919431258394",
      address: "Room 101 First Floor, Mirras Residency Neelima Green",
      regNo: "MDI-B2-456"
    },
    course: {
      code: "ADIT",
      name: "Advanced Diploma in Information Technology",
      duration: "12 Months",
      batchNo: "Batch-1",
      batchTime: "07:00 AM – 08:00 AM",
      admission: "31-Oct-2026"
    },
    feeParticulars: {
      courseFee: 12000.00,
      amountInclGst: 12000.00,
      cgst9Percent: 915.26,
      sgst9Percent: 915.25,
      actualPriceExclGst: 10169.49,
      totalCourseFeePayable: 12000.00
    },
    installments: [
      {
        no: 1,
        title: "Installment 1",
        date: "31-Oct-2026",
        mode: "Cash",
        ref: "Paid by Rajeev ( his brother)",
        status: "PAID",
        amount: 6000.00
      },
      {
        no: 2,
        title: "Installment 2",
        date: "31-Oct-2026",
        mode: "Cash",
        ref: "Received by parents",
        status: "PAID",
        amount: 4000.00
      },
      {
        no: 3,
        title: "Installment 3",
        date: "31-Oct-2026",
        mode: "Cash",
        ref: "Final settlement",
        status: "PAID",
        amount: 2000.00
      }
    ],
    amountReceivedInWords: "Rupees Twelve Thousand Only",
    totalCourseFee: 12000.00,
    totalPaid: 12000.00,
    balanceDues: 0.00,
    status: "FULLY PAID"
  },
  {
    invoiceNo: "MDI/B2/2026-27/0002",
    date: "15-Aug-2026",
    session: "2026-27",
    branchCode: "2",
    branchName: "Branch 2 (Adarsh Nagar)",
    student: {
      name: "Priya Kumari",
      fatherName: "Manoj Sharma",
      mobile: "+919876543210",
      address: "Ward No. 6, College Chowk, Madhepura",
      regNo: "MDI-B2-457"
    },
    course: {
      code: "ADCA",
      name: "Advanced Diploma in Computer Applications",
      duration: "12 Months",
      batchNo: "Batch-2",
      batchTime: "07:00 AM – 08:00 AM",
      admission: "15-Aug-2026"
    },
    feeParticulars: {
      courseFee: 10500.00,
      amountInclGst: 10500.00,
      cgst9Percent: 800.85,
      sgst9Percent: 800.85,
      actualPriceExclGst: 8898.30,
      totalCourseFeePayable: 10500.00
    },
    installments: [
      {
        no: 1,
        title: "Installment 1",
        date: "15-Aug-2026",
        mode: "Online UPI",
        ref: "UPI Ref: 6289410023",
        status: "PAID",
        amount: 5000.00
      },
      {
        no: 2,
        title: "Installment 2",
        date: "15-Sep-2026",
        mode: "Cash",
        ref: "Counter receipt",
        status: "PAID",
        amount: 3000.00
      }
    ],
    amountReceivedInWords: "Rupees Eight Thousand Only",
    totalCourseFee: 10500.00,
    totalPaid: 8000.00,
    balanceDues: 2500.00,
    status: "PARTIAL"
  }
];

export const initialNotices = [
  {
    id: "not-1",
    title: "New Batch for ADIT & ADCA Starting Next Monday",
    date: "04-Nov-2026",
    category: "Admissions",
    important: true,
    content: "Special fresh batches for ADIT and ADCA will commence from next Monday at 8:00 AM (Branch 2). Limited seats per batch to guarantee 1 student per computer."
  },
  {
    id: "not-2",
    title: "Beltron Typing Test Practice Simulation",
    date: "02-Nov-2026",
    category: "Exam & Competition",
    important: false,
    content: "Free Sunday speed mock test for Hindi KrutiDev and Mangal will be held this Sunday at 10:00 AM. Cash awards for speed above 40 WPM!"
  },
  {
    id: "not-3",
    title: "Issue of Government Recognized Certificates (Session 2025-26)",
    date: "28-Oct-2026",
    category: "Certificates",
    important: false,
    content: "Graduated students of ADCA and DCA session 2025-26 may collect their original certificates from Branch 1 & Branch 2 counter."
  }
];

export const initialEnquiries = [
  {
    id: "enq-01",
    name: "Vikram Kumar Yadav",
    mobile: "+91 97812 34567",
    email: "vikram.yadav@gmail.com",
    course: "ADIT (12 Months)",
    branch: "Branch 2 (Adarsh Nagar)",
    message: "Interested in morning 8 AM batch. Want to know syllabus details.",
    date: "04-Nov-2026",
    status: "New"
  },
  {
    id: "enq-02",
    name: "Sunita Kumari",
    mobile: "+91 88765 43210",
    email: "sunita.k@gmail.com",
    course: "Hindi + English Typing",
    branch: "Branch 1 (SBI Road)",
    message: "Preparing for Bihar SSC exam. Need 35 WPM Hindi typing speed in 2 months.",
    date: "03-Nov-2026",
    status: "Followed Up"
  },
  {
    id: "enq-03",
    name: "Mohan Lal",
    mobile: "+91 76543 21980",
    email: "mohan.lal@gmail.com",
    course: "Tally Prime with GST",
    branch: "Branch 2 (Adarsh Nagar)",
    message: "I run a grocery store and want to learn GST billing and tax reports.",
    date: "02-Nov-2026",
    status: "Enrolled"
  }
];

export const studentTestimonials = [
  {
    name: "Prakash Kumar",
    course: "ADIT & Typing",
    batch: "2025-26",
    placement: "Data Entry Operator, Beltron Bihar",
    quote: "Sonu Sir provides personal guidance to every student. The 1:1 computer setup and daily mock typing tests helped me crack the Bihar Beltron typing test on my first attempt!",
    rating: 5,
    branch: "Branch 2, Adarsh Nagar"
  },
  {
    name: "Komal Kumari",
    course: "ADCA (12 Months)",
    batch: "2024-25",
    placement: "Office Executive, SBI CSP Center",
    quote: "The environment at Modern Delhi Infotech is safe and very encouraging for girls. Sonu Sir's explanations of Excel and MS Word are crystal clear.",
    rating: 5,
    branch: "Branch 2, Adarsh Nagar"
  },
  {
    name: "Deepak Sharma",
    course: "Tally Prime + GST",
    batch: "2025-26",
    placement: "Accountant, Private Trading Firm",
    quote: "I learned authentic GST bill generation, CGST/SGST calculations, and daybook entries. Today I handle complete accounts for my firm with confidence.",
    rating: 5,
    branch: "Main Branch, SBI Road"
  }
];

export const typingPracticeTexts = [
  {
    language: "English",
    title: "Digital India & Technology",
    text: "Modern Delhi Infotech is the premier computer training institute in Madhepura Bihar. Practical knowledge of computers and high speed typing skills open great career opportunities in government and corporate sectors. Daily practice improves both speed and accuracy."
  },
  {
    language: "Hindi",
    title: "कम्प्यूटर साक्षरता एवं भविष्य",
    text: "मॉडर्न दिल्ली इन्फोटेक मधेपुरा में कम्प्यूटर शिक्षा और टाइपिंग प्रशिक्षण का उत्कृष्ट केंद्र है। सोनू सर के मार्गदर्शन में विद्यार्थी सरकारी एवं निजी क्षेत्रों में सफलता प्राप्त कर रहे हैं।"
  }
];


// Photo gallery on the landing page. Add more photos to /public/gallery and list them here.
export const galleryImages = [
  { src: "/sonu-kumar.jpg", caption: "Sonu Kumar (Sonu Sir) – Founder & Director" },
  { src: "/mdi-banner.png", caption: "Branch 2 – ADIT, ADCA, DCA, Tally & Typing", fit: "object-contain bg-white" }
];
