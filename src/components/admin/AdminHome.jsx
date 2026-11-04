import React, { useMemo } from 'react';
import {
  Users, IndianRupee, AlertCircle, CheckSquare, Download, UserPlus, Phone, ArrowRight,
  CalendarClock, Award, ClipboardList, BookOpen,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAppTheme } from '../../context/ThemeContext';
import { Panel, Btn, Badge, Muted } from './ui';
import ProgressCircle from '../dashboard/ProgressCircle';

const inr = (n) => `₹${Math.round(Number(n || 0)).toLocaleString('en-IN')}`;
const WEEKDAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DAYS_OF = { MWF: ['Mon', 'Wed', 'Fri'], TTS: ['Tue', 'Thu', 'Sat'], Daily: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] };
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Accepts "31-Oct-2026", "04 Nov 2026", "15-Aug-2026" …
const parseDate = (str) => {
  const d = new Date(String(str || '').replace(/-/g, ' '));
  return Number.isNaN(d.getTime()) ? null : d;
};
const toMin = (t) => {
  const m = String(t || '').match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return 9999;
  let h = Number(m[1]) % 12;
  if (m[3].toUpperCase() === 'PM') h += 12;
  return h * 60 + Number(m[2]);
};
const isoDate = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const Kpi = ({ icon: Icon, label, value, sub, progress, tone, onClick }) => {
  const { colors } = useAppTheme();
  const c = { green: colors.greenAccent[500], red: colors.redAccent[400], blue: colors.blueAccent[400] }[tone] || colors.gray[100];
  return (
    <button onClick={onClick} style={{ backgroundColor: colors.primary[400] }} className="rounded-lg p-5 text-left shadow-xs hover:opacity-90 transition-opacity">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <Icon className="w-6 h-6 mb-2" style={{ color: colors.greenAccent[600] }} />
          <div style={{ color: c }} className="text-2xl font-bold font-display tracking-tight truncate">{value}</div>
        </div>
        {progress !== undefined && <ProgressCircle progress={Math.max(0, Math.min(1, progress))} size={42} />}
      </div>
      <div className="mt-3 pt-2">
        <div style={{ color: colors.greenAccent[500] }} className="text-xs font-semibold">{label}</div>
        <Muted className="text-[11px]">{sub}</Muted>
      </div>
    </button>
  );
};

// Today + previous class day, each split into Theory and Lab (present / students)
const AttendanceCard = ({ today, last, onClick }) => {
  const { colors } = useAppTheme();
  const pctColor = (p) => (p === null ? colors.gray[100] : p >= 75 ? colors.greenAccent[500] : colors.redAccent[400]);
  const cell = (t) => {
    if (!t.expected) return <Muted>No class</Muted>;
    if (!t.marked) return <span className="text-amber-400 font-semibold">Not marked</span>;
    const p = Math.round((t.present / t.marked) * 100);
    return (
      <span>
        <span style={{ color: colors.gray[100] }} className="font-bold">{t.present}/{t.marked} present</span>
        <span style={{ color: pctColor(p) }} className="ml-1 font-semibold">{p}%</span>
        {t.marked < t.expected && <Muted className="block text-[10px]">{t.expected - t.marked} of {t.expected} not marked</Muted>}
      </span>
    );
  };
  const dayLabel = (a) => a.date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  const rows = [
    { title: 'Today', sub: today ? dayLabel(today) : 'Sunday', a: today },
    { title: 'Last class day', sub: dayLabel(last), a: last },
  ];
  return (
    <button onClick={onClick} style={{ backgroundColor: colors.primary[400] }} className="rounded-lg p-5 text-left shadow-xs hover:opacity-90 transition-opacity">
      <div className="flex items-center justify-between mb-3">
        <span className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5" style={{ color: colors.greenAccent[600] }} />
          <span style={{ color: colors.greenAccent[500] }} className="text-xs font-semibold">Attendance</span>
        </span>
        <span className="flex gap-1.5"><Badge tone="blue">Theory</Badge><Badge tone="amber">Lab</Badge></span>
      </div>
      <div className="space-y-2.5">
        {rows.map(({ title, sub, a }) => (
          <div key={title} style={{ backgroundColor: colors.primary[500] }} className="rounded-md px-3 py-2">
            <div className="flex items-baseline justify-between gap-2">
              <span style={{ color: colors.gray[100] }} className="text-xs font-bold">{title}</span>
              <span className="text-right">
                <Muted className="text-[10px] mr-1.5">{sub}</Muted>
                {a && a.pct !== null && <strong style={{ color: pctColor(a.pct) }} className="text-sm">{a.pct}%</strong>}
              </span>
            </div>
            {a ? (
              <div className="grid grid-cols-2 gap-2 mt-1 text-[11px]">
                <div><Muted className="block text-[10px]">Theory</Muted>{cell(a.Theory)}</div>
                <div><Muted className="block text-[10px]">Lab</Muted>{cell(a.Lab)}</div>
              </div>
            ) : (
              <Muted className="block text-[11px] mt-1">No classes on Sunday</Muted>
            )}
          </div>
        ))}
      </div>
    </button>
  );
};

const SectionTitle = ({ children, action }) => {
  const { colors } = useAppTheme();
  return (
    <div className="flex items-center justify-between mb-4">
      <h3 style={{ color: colors.gray[100] }} className="text-sm font-bold uppercase tracking-wider">{children}</h3>
      {action}
    </div>
  );
};

const LinkBtn = ({ onClick, children }) => {
  const { colors } = useAppTheme();
  return (
    <button onClick={onClick} style={{ color: colors.greenAccent[500] }} className="text-xs font-semibold inline-flex items-center gap-1 hover:underline">
      {children} <ArrowRight className="w-3 h-3" />
    </button>
  );
};

const Meter = ({ used, total, unit }) => {
  const { colors } = useAppTheme();
  const pct = total ? Math.min(100, Math.round((used / total) * 100)) : 0;
  const barColor = pct >= 90 ? colors.redAccent[400] : pct >= 70 ? '#f59e0b' : colors.greenAccent[500];
  return (
    <div>
      <div className="flex justify-between text-[11px] mb-1">
        <Muted>{used}/{total} {unit}</Muted>
        <strong style={{ color: colors.gray[100] }}>{pct}%</strong>
      </div>
      <div style={{ backgroundColor: colors.primary[500] }} className="h-2 rounded-full overflow-hidden">
        <div style={{ width: `${pct}%`, backgroundColor: barColor }} className="h-full rounded-full" />
      </div>
    </div>
  );
};

const AdminHome = ({ user, onNavigate, onRegisterStudent }) => {
  const { colors } = useAppTheme();
  const {
    students, invoices, batches, courses, enquiries, attendanceData, studentsInBatch,
    tests, testResults, certificates,
  } = useData();

  const now = new Date();
  const todayKey = WEEKDAY[now.getDay()];
  const todayIso = isoDate(now);
  const pattern = DAYS_OF.MWF.includes(todayKey) ? 'MWF' : DAYS_OF.TTS.includes(todayKey) ? 'TTS' : null;

  /* ---------- students & fees ---------- */
  const active = students.filter((s) => (s.status || 'Active') === 'Active');
  const thisMonth = students.filter((s) => {
    const d = parseDate(s.admissionDate);
    return d && d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const fee = useMemo(() => {
    const rows = students.map((s) => {
      const inv = invoices.find((i) => i.student?.regNo === s.regNo);
      const total = inv?.totalCourseFee ?? Number(s.totalFee || 0);
      const paid = inv?.totalPaid ?? Number(s.paidFee || 0);
      return { s, total, paid, due: Math.max(0, total - paid) };
    });
    return {
      rows,
      total: rows.reduce((a, r) => a + r.total, 0),
      paid: rows.reduce((a, r) => a + r.paid, 0),
      due: rows.reduce((a, r) => a + r.due, 0),
      dueRows: rows.filter((r) => r.due > 0).sort((a, b) => b.due - a.due),
    };
  }, [students, invoices]);

  /* ---------- monthly collection (last 6 months, from real installments) ---------- */
  const monthly = useMemo(() => {
    const buckets = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1);
      return { key: `${d.getFullYear()}-${d.getMonth()}`, label: MONTHS[d.getMonth()], amount: 0 };
    });
    invoices.forEach((inv) =>
      (inv.installments || []).forEach((p) => {
        const d = parseDate(p.date);
        const b = d && buckets.find((x) => x.key === `${d.getFullYear()}-${d.getMonth()}`);
        if (b) b.amount += Number(p.amount || 0);
      })
    );
    return buckets;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoices]);
  const maxMonth = Math.max(1, ...monthly.map((m) => m.amount));

  /* ---------- today's classes & attendance ---------- */
  const todaysBatches = pattern
    ? batches
        .filter((b) => (DAYS_OF[b.days] || []).includes(todayKey))
        .sort((a, b) => toMin(a.timing) - toMin(b.timing) || Number(a.type === 'Lab') - Number(b.type === 'Lab'))
    : [];
  // Attendance summary for one date, split by Theory / Lab
  const attendanceFor = (date) => {
    const day = WEEKDAY[date.getDay()];
    const iso = isoDate(date);
    const out = { Theory: { expected: 0, marked: 0, present: 0 }, Lab: { expected: 0, marked: 0, present: 0 } };
    batches
      .filter((b) => (DAYS_OF[b.days] || []).includes(day))
      .forEach((b) => {
        const t = out[(b.type || 'Theory') === 'Lab' ? 'Lab' : 'Theory'];
        t.expected += studentsInBatch(b.id).length;
        Object.values(attendanceData[b.id]?.[iso] || {}).forEach((r) => {
          t.marked += 1;
          if (r.status === 'Present' || r.status === 'Late') t.present += 1;
        });
      });
    const marked = out.Theory.marked + out.Lab.marked;
    const present = out.Theory.present + out.Lab.present;
    return { ...out, day, date, marked, present, expected: out.Theory.expected + out.Lab.expected, pct: marked ? Math.round((present / marked) * 100) : null };
  };
  // previous class day (Mon–Sat), skipping Sunday
  const lastClassDate = (() => {
    const d = new Date(now);
    do d.setDate(d.getDate() - 1); while (d.getDay() === 0);
    return d;
  })();
  const todayAtt = pattern ? attendanceFor(now) : null;
  const lastAtt = attendanceFor(lastClassDate);

  /* ---------- capacity ---------- */
  const cap = (type) => {
    const list = batches.filter((b) => (b.type || 'Theory') === type);
    return { used: list.reduce((a, b) => a + studentsInBatch(b.id).length, 0), total: list.reduce((a, b) => a + Number(b.maxCapacity || 0), 0), count: list.length };
  };
  const theoryCap = cap('Theory');
  const labCap = cap('Lab');
  const unassigned = students.filter((s) => !s.batchNo || s.batchNo === 'Unassigned' || !s.labBatchNo || s.labBatchNo === 'Unassigned');

  /* ---------- enquiries, academics ---------- */
  const newEnquiries = enquiries.filter((e) => e.status === 'New');
  const published = tests.filter((t) => t.status === 'Published').length;
  const passRate = testResults.length ? Math.round((testResults.filter((r) => r.passed).length / testResults.length) * 100) : null;
  const byCourse = courses
    .map((c) => ({ code: c.code, count: students.filter((s) => s.courseCode === c.code).length }))
    .filter((c) => c.count > 0)
    .sort((a, b) => b.count - a.count);
  const maxCourse = Math.max(1, ...byCourse.map((c) => c.count));

  /* ---------- CSV report ---------- */
  const downloadReport = () => {
    const header = ['Reg No', 'Name', 'Mobile', 'Course', 'Theory Batch', 'Lab Batch', 'Total Fee', 'Paid', 'Due', 'Attendance', 'Status'];
    const lines = fee.rows.map(({ s, total, paid, due }) =>
      [s.regNo, s.name, s.mobile, s.courseCode, `${s.batchNo || ''} ${s.batchDays || ''} ${s.batchTime || ''}`.trim(), `${s.labBatchNo || ''} ${s.labBatchDays || ''} ${s.labBatchTime || ''}`.trim(), total, paid, due, s.attendance || '', s.status || 'Active']
        .map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`)
        .join(',')
    );
    const blob = new Blob([[header.join(','), ...lines].join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MDI-students-fees-${todayIso}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 17 ? 'Good afternoon' : 'Good evening';
  const dateLabel = now.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 style={{ color: colors.gray[100] }} className="text-2xl sm:text-3xl font-extrabold font-display uppercase tracking-tight">Dashboard</h2>
          <p style={{ color: colors.greenAccent[400] }} className="text-xs sm:text-sm font-semibold mt-0.5">
            {greeting}, {user?.name?.split(' ')[0] || 'Sonu'} Sir · {dateLabel}{pattern ? ` · ${pattern} day` : ' · No classes today'}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Btn variant="ghost" onClick={downloadReport}><Download className="w-4 h-4" />DOWNLOAD REPORT</Btn>
          <Btn onClick={onRegisterStudent}><UserPlus className="w-4 h-4" />REGISTER STUDENT</Btn>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <Kpi icon={Users} label="Active students" value={active.length} sub={`${thisMonth} new admission${thisMonth === 1 ? '' : 's'} this month`} progress={students.length ? active.length / students.length : 0} onClick={() => onNavigate('students')} />
        <Kpi icon={IndianRupee} label="Fees collected" value={inr(fee.paid)} tone="green" sub={`of ${inr(fee.total)} billed`} progress={fee.total ? fee.paid / fee.total : 0} onClick={() => onNavigate('fees')} />
        <Kpi icon={AlertCircle} label="Fees due" value={inr(fee.due)} tone="red" sub={`${fee.dueRows.length} student${fee.dueRows.length === 1 ? '' : 's'} pending`} progress={fee.total ? fee.due / fee.total : 0} onClick={() => onNavigate('fees')} />
        <AttendanceCard today={todayAtt} last={lastAtt} onClick={() => onNavigate('attendance')} />
      </div>

      {/* Today's classes + monthly collection */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-5">
        <Panel className="p-5 xl:col-span-3">
          <SectionTitle action={<LinkBtn onClick={() => onNavigate('batches')}>All batches</LinkBtn>}>
            <span className="inline-flex items-center gap-2"><CalendarClock className="w-4 h-4" /> Today's classes {pattern && <Badge tone="amber">{pattern}</Badge>}</span>
          </SectionTitle>
          {todaysBatches.length === 0 ? (
            <Muted className="text-xs">{pattern ? 'No batches scheduled today.' : 'Sunday – no classes scheduled.'}</Muted>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {todaysBatches.map((b) => {
                const n = studentsInBatch(b.id).length;
                const done = !!attendanceData[b.id]?.[todayIso];
                return (
                  <div key={b.id} style={{ backgroundColor: colors.primary[500] }} className="rounded-md px-3 py-2.5 flex items-center gap-3 text-xs">
                    <span style={{ color: colors.gray[100] }} className="font-bold w-16 flex-shrink-0">{b.timing.split(' – ')[0]}</span>
                    <span className="min-w-0 flex-1">
                      <span style={{ color: colors.greenAccent[500] }} className="font-bold">{b.id}</span>{' '}
                      <span style={{ color: colors.gray[100] }}>{b.courseCode}</span>{' '}
                      <Badge tone={(b.type || 'Theory') === 'Lab' ? 'amber' : 'blue'}>{b.type || 'Theory'}</Badge>
                      <Muted className="block text-[10px] truncate">{b.room} · {b.branch} · {b.instructor}</Muted>
                    </span>
                    <Muted className="whitespace-nowrap">{n}/{b.maxCapacity}</Muted>
                    {done ? <Badge tone="green">Marked</Badge> : (
                      <button onClick={() => onNavigate('attendance', b.id)} style={{ color: colors.greenAccent[500] }} className="font-semibold whitespace-nowrap hover:underline">Take</button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Panel>

        <Panel className="p-5 xl:col-span-2">
          <SectionTitle action={<LinkBtn onClick={() => onNavigate('fees')}>Fee details</LinkBtn>}>Fee collection</SectionTitle>
          <div style={{ color: colors.greenAccent[500] }} className="text-2xl font-extrabold">{inr(monthly[5].amount)}</div>
          <Muted className="text-[11px]">collected in {monthly[5].label} · last 6 months shown</Muted>
          <div className="mt-5 h-40 flex items-end gap-3">
            {monthly.map((m, i) => (
              <div key={m.key} className="flex-1 flex flex-col items-center justify-end h-full gap-1.5" title={`${m.label}: ${inr(m.amount)}`}>
                <Muted className="text-[10px] whitespace-nowrap">{m.amount ? `${Math.round(m.amount / 1000)}k` : ''}</Muted>
                <div
                  style={{ height: `${Math.max(2, (m.amount / maxMonth) * 100)}%`, backgroundColor: i === 5 ? colors.greenAccent[500] : colors.blueAccent[500] }}
                  className="w-full rounded-t-md"
                />
                <Muted className="text-[10px]">{m.label}</Muted>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Capacity, dues, enquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Panel className="p-5">
          <SectionTitle action={<LinkBtn onClick={() => onNavigate('batches')}>Manage</LinkBtn>}>Batch capacity</SectionTitle>
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5"><Badge tone="blue">Theory</Badge><Muted className="text-[11px]">{theoryCap.count} batches</Muted></div>
              <Meter used={theoryCap.used} total={theoryCap.total} unit="seats" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5"><Badge tone="amber">Lab</Badge><Muted className="text-[11px]">{labCap.count} batches</Muted></div>
              <Meter used={labCap.used} total={labCap.total} unit="PCs" />
            </div>
            {unassigned.length > 0 && (
              <button onClick={() => onNavigate('batches')} className="w-full text-left rounded-md px-3 py-2 text-xs bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold">
                {unassigned.length} student{unassigned.length === 1 ? '' : 's'} missing a Theory or Lab batch
              </button>
            )}
          </div>
        </Panel>

        <Panel className="p-5">
          <SectionTitle action={<LinkBtn onClick={() => onNavigate('fees')}>Collect</LinkBtn>}>Pending dues</SectionTitle>
          {fee.dueRows.length === 0 ? <Muted className="text-xs">All fees are paid. 🎉</Muted> : (
            <div className="space-y-2">
              {fee.dueRows.slice(0, 5).map(({ s, due }) => (
                <div key={s.id} className="flex items-center justify-between text-xs">
                  <span className="min-w-0">
                    <span style={{ color: colors.gray[100] }} className="font-semibold block truncate">{s.name}</span>
                    <Muted className="text-[10px]">{s.regNo} · {s.courseCode}</Muted>
                  </span>
                  <strong style={{ color: colors.redAccent[400] }}>{inr(due)}</strong>
                </div>
              ))}
            </div>
          )}
        </Panel>

        <Panel className="p-5">
          <SectionTitle action={<LinkBtn onClick={() => onNavigate('enquiries')}>All enquiries</LinkBtn>}>
            New enquiries {newEnquiries.length > 0 && <Badge tone="red">{newEnquiries.length}</Badge>}
          </SectionTitle>
          {newEnquiries.length === 0 ? <Muted className="text-xs">No new enquiries.</Muted> : (
            <div className="space-y-2">
              {newEnquiries.slice(0, 5).map((e) => {
                const ph = e.phone || e.mobile || '';
                return (
                  <div key={e.id} className="flex items-center justify-between gap-2 text-xs">
                    <span className="min-w-0">
                      <span style={{ color: colors.gray[100] }} className="font-semibold block truncate">{e.name}</span>
                      <Muted className="text-[10px]">{e.course || '—'} · {e.date}</Muted>
                    </span>
                    {ph && (
                      <a href={`tel:${ph.replace(/\s+/g, '')}`} style={{ backgroundColor: colors.greenAccent[600] }} className="p-1.5 rounded-md text-white flex-shrink-0" aria-label={`Call ${e.name}`}>
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Panel>
      </div>

      {/* Courses & academics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Panel className="p-5 lg:col-span-2">
          <SectionTitle action={<LinkBtn onClick={() => onNavigate('courses')}>Courses</LinkBtn>}>
            <span className="inline-flex items-center gap-2"><BookOpen className="w-4 h-4" /> Students per course</span>
          </SectionTitle>
          <div className="space-y-2.5">
            {byCourse.map((c) => (
              <div key={c.code} className="flex items-center gap-3 text-xs">
                <span style={{ color: colors.gray[100] }} className="w-16 font-bold">{c.code}</span>
                <div style={{ backgroundColor: colors.primary[500] }} className="flex-1 h-2.5 rounded-full overflow-hidden">
                  <div style={{ width: `${(c.count / maxCourse) * 100}%`, backgroundColor: colors.blueAccent[500] }} className="h-full rounded-full" />
                </div>
                <Muted className="w-6 text-right">{c.count}</Muted>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="p-5">
          <SectionTitle>Academics</SectionTitle>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => onNavigate('tests')} style={{ backgroundColor: colors.primary[500] }} className="rounded-md p-3 text-left">
              <ClipboardList className="w-4 h-4 mb-1" style={{ color: colors.blueAccent[400] }} />
              <div style={{ color: colors.gray[100] }} className="text-xl font-bold">{published}</div>
              <Muted className="text-[10px]">Tests published</Muted>
            </button>
            <button onClick={() => onNavigate('tests')} style={{ backgroundColor: colors.primary[500] }} className="rounded-md p-3 text-left">
              <CheckSquare className="w-4 h-4 mb-1" style={{ color: colors.greenAccent[500] }} />
              <div style={{ color: colors.gray[100] }} className="text-xl font-bold">{passRate === null ? '—' : `${passRate}%`}</div>
              <Muted className="text-[10px]">Pass rate ({testResults.length} attempts)</Muted>
            </button>
            <button onClick={() => onNavigate('certificates')} style={{ backgroundColor: colors.primary[500] }} className="rounded-md p-3 text-left col-span-2">
              <Award className="w-4 h-4 mb-1 text-amber-400" />
              <div style={{ color: colors.gray[100] }} className="text-xl font-bold">{certificates.length}</div>
              <Muted className="text-[10px]">Certificates issued</Muted>
            </button>
          </div>
        </Panel>
      </div>
    </div>
  );
};

export default AdminHome;
