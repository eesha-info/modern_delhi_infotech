// Seed data for Online Tests (MCQ question bank + tests) and Certificates.

// Weekly day patterns a batch can run on. Two batches may share the same
// time slot and room when their day patterns do not overlap (e.g. MWF + TTS).
export const DAY_PATTERNS = {
  Daily: { label: 'Daily (Mon–Sat)', days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
  MWF: { label: 'MWF (Mon, Wed, Fri)', days: ['Mon', 'Wed', 'Fri'] },
  TTS: { label: 'TTS (Tue, Thu, Sat)', days: ['Tue', 'Thu', 'Sat'] },
};

export const initialQuestions = [
  { id: 'q-001', courseCode: 'ADIT', topic: 'Fundamentals', question: 'What is the full form of CPU?', options: ['Central Processing Unit', 'Computer Personal Unit', 'Central Program Utility', 'Control Processing Unit'], answer: 0 },
  { id: 'q-002', courseCode: 'ADIT', topic: 'Fundamentals', question: 'Which of these is an input device?', options: ['Monitor', 'Printer', 'Keyboard', 'Speaker'], answer: 2 },
  { id: 'q-003', courseCode: 'ADIT', topic: 'MS Excel', question: 'Which function adds a range of cells in Excel?', options: ['ADD()', 'SUM()', 'TOTAL()', 'PLUS()'], answer: 1 },
  { id: 'q-004', courseCode: 'ADIT', topic: 'Web Design', question: 'HTML stands for:', options: ['Hyper Text Markup Language', 'High Text Machine Language', 'Hyperlink Text Mark Language', 'Home Tool Markup Language'], answer: 0 },
  { id: 'q-005', courseCode: 'ADCA', topic: 'MS Word', question: 'Shortcut key to make text bold in MS Word:', options: ['Ctrl + I', 'Ctrl + U', 'Ctrl + B', 'Ctrl + D'], answer: 2 },
  { id: 'q-006', courseCode: 'ADCA', topic: 'Internet', question: 'Which protocol is used to send email?', options: ['FTP', 'SMTP', 'HTTP', 'TCP'], answer: 1 },
  { id: 'q-007', courseCode: 'DCA', topic: 'Fundamentals', question: '1 KB is equal to:', options: ['1000 Bytes', '1024 Bytes', '1024 Bits', '100 Bytes'], answer: 1 },
  { id: 'q-008', courseCode: 'DCA', topic: 'Windows', question: 'Shortcut to copy selected item:', options: ['Ctrl + V', 'Ctrl + X', 'Ctrl + C', 'Ctrl + Z'], answer: 2 },
  { id: 'q-009', courseCode: 'TALLY', topic: 'GST', question: 'In an intra-state sale, GST is split into:', options: ['IGST only', 'CGST + SGST', 'CGST + IGST', 'SGST only'], answer: 1 },
  { id: 'q-010', courseCode: 'TALLY', topic: 'Vouchers', question: 'Shortcut for Sales voucher in Tally Prime:', options: ['F8', 'F9', 'F5', 'F4'], answer: 0 },
  { id: 'q-011', courseCode: 'TYPING', topic: 'Hindi Typing', question: 'KrutiDev 010 is a font used for:', options: ['English typing', 'Hindi typing', 'Urdu typing', 'Coding'], answer: 1 },
  { id: 'q-012', courseCode: 'TYPING', topic: 'Touch Typing', question: 'Home row keys for the left hand are:', options: ['Q W E R', 'A S D F', 'Z X C V', 'J K L ;'], answer: 1 },
];

export const initialTests = [
  {
    id: 'test-001',
    title: 'ADIT Monthly Test – Fundamentals & Excel',
    courseCode: 'ADIT',
    batchId: 'ALL',
    durationMinutes: 15,
    passMarks: 50,
    questionIds: ['q-001', 'q-002', 'q-003', 'q-004'],
    status: 'Published',
    createdOn: '01 Nov 2026',
  },
];

export const initialTestResults = [];

export const initialCertificates = [];

export const GRADE_SCALE = [
  { min: 85, grade: 'A+', remark: 'Distinction' },
  { min: 75, grade: 'A', remark: 'Excellent' },
  { min: 60, grade: 'B', remark: 'Very Good' },
  { min: 50, grade: 'C', remark: 'Good' },
  { min: 0, grade: 'D', remark: 'Pass' },
];

export const gradeFor = (percent) => GRADE_SCALE.find((g) => percent >= g.min) || GRADE_SCALE[GRADE_SCALE.length - 1];
