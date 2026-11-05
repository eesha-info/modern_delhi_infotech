import React, { useState, useEffect } from 'react';
import {
  CheckSquare, Calendar, Users, Check, X, Clock,
  Search, Save
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAppTheme } from '../../context/ThemeContext';
import Header from '../dashboard/Header';
import { asset } from '../../utils/asset';

const AdminTakeAttendance = ({ initialBatchId = null }) => {
  const { batches, students, attendanceData, markBatchAttendance, studentsInBatch } = useData();
  const { colors, mode } = useAppTheme();
  const isDark = mode === 'dark';

  // State
  // Theory / Lab switch (defaults to Theory, or to the type of the batch we were opened for)
  const typeOf = (b) => ((b?.type || 'Theory') === 'Lab' ? 'Lab' : 'Theory');
  const [classType, setClassType] = useState(() => typeOf(batches.find((b) => b.id === initialBatchId)) || 'Theory');
  const typeBatches = batches.filter((b) => typeOf(b) === classType);
  const localToday = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  // "07:00 AM – 08:00 AM" -> { start: 420, end: 480 } minutes since midnight
  const slotMinutes = (timing) => {
    const toMin = (t) => {
      const m = String(t || '').match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (!m) return null;
      let h = Number(m[1]) % 12;
      if (m[3].toUpperCase() === 'PM') h += 12;
      return h * 60 + Number(m[2]);
    };
    const [a, b] = String(timing || '').split(/–|-/);
    const start = toMin(a);
    const end = toMin(b) ?? (start !== null ? start + 60 : null);
    return { start: start ?? 9999, end: end ?? 9999 };
  };

  // Pick the best batch of a type for a date:
  //   today  -> the class running now, else the next one today, else the last one today
  //   other  -> that day's first class
  //   no class that day (e.g. Sunday) -> first batch of the type
  const bestBatchFor = (t, dateStr = localToday()) => {
    const weekday = new Date(`${dateStr}T00:00:00`).getDay();
    const pattern = [1, 3, 5].includes(weekday) ? 'MWF' : [2, 4, 6].includes(weekday) ? 'TTS' : null;
    const ofType = batches.filter((b) => typeOf(b) === t);
    const meeting = ofType
      .filter((b) => b.days === pattern)
      .sort((x, y) => slotMinutes(x.timing).start - slotMinutes(y.timing).start);
    if (meeting.length === 0) return ofType[0]?.id;
    if (dateStr !== localToday()) return meeting[0].id;
    const now = new Date();
    const mins = now.getHours() * 60 + now.getMinutes();
    const running = meeting.find((b) => { const s = slotMinutes(b.timing); return mins >= s.start && mins < s.end; });
    const next = meeting.find((b) => slotMinutes(b.timing).start > mins);
    return (running || next || meeting[meeting.length - 1]).id;
  };

  const [selectedBatchId, setSelectedBatchId] = useState(
    () => initialBatchId || bestBatchFor('Theory') || batches[0]?.id
  );
  // Opening Theory or Lab always jumps to the class running now (or next)
  const switchType = (t) => {
    setClassType(t);
    const best = bestBatchFor(t, selectedDate);
    if (best) setSelectedBatchId(best);
  };
  const changeDate = (dateStr) => {
    setSelectedDate(dateStr);
    const best = bestBatchFor(classType, dateStr);
    if (best) setSelectedBatchId(best);
  };
  const [selectedDate, setSelectedDate] = useState(localToday);
  // Does a batch meet on the selected date? (MWF / TTS)
  const DAY_SETS = { MWF: [1, 3, 5], TTS: [2, 4, 6] };
  const selectedWeekday = new Date(`${selectedDate}T00:00:00`).getDay();
  const meetsOnDate = (b) => (DAY_SETS[b.days] ? DAY_SETS[b.days].includes(selectedWeekday) : selectedWeekday !== 0);
  const [searchTerm, setSearchTerm] = useState('');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Map of studentId -> { status: 'Present' | 'Absent' | 'Late', remark: '' }
  const [currentAttendance, setCurrentAttendance] = useState({});

  // Active batch object
  const activeBatch = batches.find(b => b.id === selectedBatchId) || batches[0];

  // Students belonging to the selected batch
  // (Theory batches match a student's batchNo, Lab batches their labBatchNo)
  const batchStudents = studentsInBatch(selectedBatchId);

  // Load existing attendance for this batch + date if already recorded
  useEffect(() => {
    const recordedForBatch = attendanceData[selectedBatchId]?.[selectedDate];
    if (recordedForBatch) {
      setCurrentAttendance(recordedForBatch);
    } else {
      const initial = {};
      batchStudents.forEach(st => {
        initial[st.id] = { status: 'Present', remark: 'On time' };
      });
      setCurrentAttendance(initial);
    }
    setSaveSuccessMessage('');
  }, [selectedBatchId, selectedDate]);

  // Handler to toggle status
  const handleSetStatus = (studentId, status) => {
    setCurrentAttendance(prev => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || {}),
        status
      }
    }));
  };

  // Handler for remark change
  const handleSetRemark = (studentId, remark) => {
    setCurrentAttendance(prev => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || { status: 'Present' }),
        remark
      }
    }));
  };

  // Quick Action: Bulk mark
  const handleMarkAll = (status) => {
    const updated = {};
    batchStudents.forEach(st => {
      updated[st.id] = {
        status,
        remark: status === 'Present' ? 'All Present' : status === 'Absent' ? 'Marked Absent' : 'Late'
      };
    });
    setCurrentAttendance(updated);
  };

  // Save Attendance to DataContext & LocalStorage
  const handleSaveAttendance = () => {
    setIsSaving(true);
    setTimeout(() => {
      markBatchAttendance(selectedBatchId, selectedDate, currentAttendance);
      setIsSaving(false);
      setSaveSuccessMessage(`Attendance for ${activeBatch.name} on ${selectedDate} saved successfully.`);
      setTimeout(() => setSaveSuccessMessage(''), 4000);
    }, 300);
  };

  // Calculate live statistics for this batch
  const totalCount = batchStudents.length;
  const presentCount = batchStudents.filter(s => currentAttendance[s.id]?.status === 'Present').length;
  const absentCount = batchStudents.filter(s => currentAttendance[s.id]?.status === 'Absent').length;
  const lateCount = batchStudents.filter(s => currentAttendance[s.id]?.status === 'Late').length;
  const attendanceRate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

  // Filter students by search term
  const displayedStudents = batchStudents.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.regNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.courseCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <Header
        title="TAKE ATTENDANCE"
        subtitle="Manage and mark physical student lab presence batchwise"
      />

      {/* Top Controls Card: Batch Picker & Date Selector */}
      <div
        style={{
          backgroundColor: colors.primary[400],
          borderColor: isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0'
        }}
        className="rounded-lg p-6 shadow-xs border"
      >
        <div
          style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0' }}
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b"
        >
          <div>
            <h3 style={{ color: isDark ? colors.gray[100] : '#0f172a' }} className="text-lg font-bold font-display">
              Select Batch &amp; Date
            </h3>
            <p style={{ color: isDark ? colors.gray[300] : '#64748b' }} className="text-xs mt-0.5">
              Choose the batch time slot and session date to record attendance.
            </p>
          </div>

          {/* Date Picker Input */}
          <div className="flex items-center gap-3">
            <div
              style={{
                backgroundColor: isDark ? colors.primary[500] : '#f8fafc',
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1',
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-md border shadow-xs"
            >
              <Calendar className="w-4 h-4 text-slate-400" />
              <label
                htmlFor="attendance-date"
                style={{ color: isDark ? colors.gray[100] : '#1e293b' }}
                className="text-xs font-semibold whitespace-nowrap"
              >
                Date:
              </label>
              <input
                id="attendance-date"
                type="date"
                value={selectedDate}
                onChange={(e) => changeDate(e.target.value)}
                style={{ color: isDark ? colors.gray[100] : '#0f172a' }}
                className="bg-transparent text-xs font-bold focus:outline-none cursor-pointer"
              />
            </div>

            <button
              onClick={() => changeDate(localToday())}
              style={{
                backgroundColor: colors.blueAccent[700],
                color: '#ffffff',
              }}
              className="text-xs font-bold px-3.5 py-2 rounded-md hover:opacity-90 transition-opacity shadow-xs"
            >
              Today
            </button>
          </div>
        </div>

        {/* Batch Selection Pills */}
        <div className="mt-5">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <label
              style={{ color: isDark ? colors.gray[300] : '#475569' }}
              className="text-[11px] font-bold uppercase tracking-wider block"
            >
              Select {classType} Batch:
            </label>
            {/* Theory / Lab switch */}
            <div
              role="tablist"
              aria-label="Class type"
              style={{ backgroundColor: isDark ? colors.primary[500] : '#f1f5f9', borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0' }}
              className="inline-flex p-1 rounded-lg border"
            >
              {['Theory', 'Lab'].map((t) => {
                const active = classType === t;
                const n = batches.filter((b) => typeOf(b) === t).length;
                return (
                  <button
                    key={t}
                    role="tab"
                    aria-selected={active}
                    onClick={() => switchType(t)}
                    style={{
                      backgroundColor: active ? (t === 'Lab' ? '#d97706' : (isDark ? colors.blueAccent[700] : '#3e4396')) : 'transparent',
                      color: active ? '#ffffff' : (isDark ? colors.gray[300] : '#475569'),
                    }}
                    className="px-4 py-1.5 rounded-md text-xs font-bold transition-colors"
                  >
                    {t} <span className="opacity-75 font-semibold">({n})</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {typeBatches.length === 0 && (
              <p style={{ color: isDark ? colors.gray[400] : '#64748b' }} className="col-span-full text-xs py-4">
                No {classType} batches yet. Create one in Batch Management.
              </p>
            )}
            {typeBatches.map((batch) => {
              const isSelected = selectedBatchId === batch.id;
              const countInBatch = studentsInBatch(batch.id).length;

              return (
                <button
                  key={batch.id}
                  onClick={() => setSelectedBatchId(batch.id)}
                  style={{
                    backgroundColor: isSelected
                      ? (isDark ? colors.blueAccent[700] : '#3e4396')
                      : (isDark ? colors.primary[500] : '#ffffff'),
                    borderColor: isSelected
                      ? (isDark ? colors.blueAccent[400] : '#6870fa')
                      : (isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0'),
                  }}
                  className={`p-3 rounded-lg text-left transition-all border shadow-xs hover:border-indigo-400 group focus:outline-none ${
                    isSelected ? 'ring-2 ring-indigo-400/40' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        backgroundColor: isSelected
                          ? 'rgba(255,255,255,0.2)'
                          : (isDark ? 'rgba(255,255,255,0.08)' : '#f1f5f9'),
                        color: isSelected
                          ? '#ffffff'
                          : (isDark ? colors.gray[100] : '#1e293b'),
                      }}
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide"
                    >
                      {batch.id}
                    </span>
                    <span
                      style={{
                        color: isSelected
                          ? '#e2e8f0'
                          : (isDark ? colors.gray[400] : '#64748b'),
                      }}
                      className="text-[11px] font-medium"
                    >
                      {meetsOnDate(batch) ? `${countInBatch} St.` : 'No class'}
                    </span>
                  </div>

                  <h4
                    style={{
                      color: isSelected
                        ? '#ffffff'
                        : (isDark ? colors.gray[100] : '#0f172a'),
                    }}
                    className="font-bold text-xs mt-2 truncate"
                  >
                    {batch.name.split('(')[0]}
                  </h4>

                  <p
                    style={{
                      color: isSelected
                        ? '#c3c6fd'
                        : (isDark ? colors.gray[400] : '#64748b'),
                    }}
                    className="text-[10px] mt-0.5 truncate font-medium"
                  >
                    {batch.timing.split(' – ')[0]} · {batch.days} · {batch.type || 'Theory'}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Meta Info Bar */}
        <div
          style={{
            backgroundColor: isDark ? colors.primary[500] : '#f8fafc',
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0',
          }}
          className="mt-4 p-3 rounded-lg border flex flex-wrap items-center justify-between gap-3 text-xs"
        >
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#4cceac]"></span>
              <strong style={{ color: isDark ? colors.gray[100] : '#0f172a' }}>{activeBatch.name}</strong>
            </div>
            <span className="text-slate-400 hidden sm:inline">·</span>
            <span
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
                color: isDark ? colors.gray[300] : '#475569',
                borderColor: isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0'
              }}
              className="px-2 py-0.5 rounded border text-[11px] font-medium"
            >
              ⏰ Timing: <strong style={{ color: isDark ? colors.gray[100] : '#1e293b' }}>{activeBatch.timing}</strong>
            </span>
            <span
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
                color: isDark ? colors.gray[300] : '#475569',
                borderColor: isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0'
              }}
              className="px-2 py-0.5 rounded border text-[11px] font-medium"
            >
              🏢 Room: <strong style={{ color: isDark ? colors.gray[100] : '#1e293b' }}>{activeBatch.room}</strong>
            </span>
            <span
              style={{
                backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
                color: isDark ? colors.gray[300] : '#475569',
                borderColor: isDark ? 'rgba(255,255,255,0.05)' : '#e2e8f0'
              }}
              className="px-2 py-0.5 rounded border text-[11px] font-medium"
            >
              👨‍🏫 Mentor: <strong style={{ color: isDark ? colors.gray[100] : '#1e293b' }}>{activeBatch.instructor}</strong>
            </span>
          </div>

          <div
            style={{
              backgroundColor: isDark ? 'rgba(76, 206, 172, 0.1)' : '#ecfdf5',
              borderColor: isDark ? 'rgba(76, 206, 172, 0.3)' : '#a7f3d0',
              color: isDark ? colors.greenAccent[500] : '#047857'
            }}
            className="px-2.5 py-1 rounded-md border text-[11px] font-bold"
          >
            Capacity: {batchStudents.length} / {activeBatch.maxCapacity} {typeOf(activeBatch) === 'Lab' ? 'PCs' : 'seats'}
          </div>
        </div>
      </div>

      {/* Real-time Attendance Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        
        {/* Total in batch */}
        <div
          style={{
            backgroundColor: colors.primary[400],
            borderColor: isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0'
          }}
          className="rounded-lg p-4 shadow-xs border"
        >
          <div className="flex items-center justify-between">
            <span style={{ color: isDark ? colors.gray[300] : '#64748b' }} className="text-[10px] font-bold uppercase tracking-wider">
              Total in Batch
            </span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div style={{ color: isDark ? colors.gray[100] : '#0f172a' }} className="text-2xl font-black mt-1 font-display">
            {totalCount}
          </div>
          <span style={{ color: isDark ? colors.gray[400] : '#64748b' }} className="text-[10px]">
            Registered Students
          </span>
        </div>

        {/* Present */}
        <div
          style={{
            backgroundColor: colors.primary[400],
            borderColor: isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0'
          }}
          className="rounded-lg p-4 shadow-xs border"
        >
          <div className="flex items-center justify-between">
            <span style={{ color: colors.greenAccent[500] }} className="text-[10px] font-bold uppercase tracking-wider">
              Present
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#4cceac]"></span>
          </div>
          <div style={{ color: isDark ? colors.gray[100] : '#0f172a' }} className="text-2xl font-black mt-1 font-display">
            {presentCount}
          </div>
          <span style={{ color: colors.greenAccent[500] }} className="text-[10px] font-semibold">
            In Lab Today
          </span>
        </div>

        {/* Absent */}
        <div
          style={{
            backgroundColor: colors.primary[400],
            borderColor: isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0'
          }}
          className="rounded-lg p-4 shadow-xs border"
        >
          <div className="flex items-center justify-between">
            <span style={{ color: colors.redAccent[500] }} className="text-[10px] font-bold uppercase tracking-wider">
              Absent
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#db4f4a]"></span>
          </div>
          <div style={{ color: isDark ? colors.gray[100] : '#0f172a' }} className="text-2xl font-black mt-1 font-display">
            {absentCount}
          </div>
          <span style={{ color: colors.redAccent[500] }} className="text-[10px] font-semibold">
            Not In Institute
          </span>
        </div>

        {/* Late */}
        <div
          style={{
            backgroundColor: colors.primary[400],
            borderColor: isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0'
          }}
          className="rounded-lg p-4 shadow-xs border"
        >
          <div className="flex items-center justify-between">
            <span style={{ color: '#38bdf8' }} className="text-[10px] font-bold uppercase tracking-wider">
              Late
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]"></span>
          </div>
          <div style={{ color: isDark ? colors.gray[100] : '#0f172a' }} className="text-2xl font-black mt-1 font-display">
            {lateCount}
          </div>
          <span style={{ color: '#38bdf8' }} className="text-[10px] font-semibold">
            Permitted Late
          </span>
        </div>

        {/* Attendance Rate */}
        <div
          style={{
            backgroundColor: colors.primary[400],
            borderColor: isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0'
          }}
          className="rounded-lg p-4 shadow-xs border col-span-2 sm:col-span-1"
        >
          <div className="flex items-center justify-between">
            <span style={{ color: isDark ? colors.gray[300] : '#64748b' }} className="text-[10px] font-bold uppercase tracking-wider">
              Attendance
            </span>
            <span style={{ color: colors.greenAccent[500] }} className="text-xs font-bold">{attendanceRate}%</span>
          </div>
          <div style={{ color: isDark ? colors.gray[100] : '#0f172a' }} className="text-2xl font-black mt-1 font-display">
            {attendanceRate}%
          </div>
          <div
            style={{ backgroundColor: isDark ? colors.primary[500] : '#e2e8f0' }}
            className="w-full h-1.5 rounded-full mt-2 overflow-hidden"
          >
            <div
              style={{
                backgroundColor: colors.greenAccent[500],
                width: `${attendanceRate}%`
              }}
              className="h-full rounded-full transition-all duration-300"
            ></div>
          </div>
        </div>

      </div>

      {/* Save Notification */}
      {saveSuccessMessage && (
        <div
          style={{
            backgroundColor: 'rgba(76, 206, 172, 0.15)',
            border: `1px solid ${colors.greenAccent[500]}`,
            color: colors.greenAccent[500],
          }}
          className="p-3.5 rounded-md flex items-center justify-between text-xs animate-fadeIn"
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 flex-shrink-0" />
            <span className="font-semibold">{saveSuccessMessage}</span>
          </div>
          <button onClick={() => setSaveSuccessMessage('')} className="p-1 hover:opacity-75">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Students Attendance Register Card */}
      <div
        style={{
          backgroundColor: colors.primary[400],
          borderColor: isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0'
        }}
        className="rounded-lg shadow-xs overflow-hidden border"
      >
        {/* Table Action Bar */}
        <div
          style={{ borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0' }}
          className="p-4 border-b flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div
              style={{
                backgroundColor: isDark ? colors.primary[500] : '#f8fafc',
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'
              }}
              className="flex items-center rounded-md px-3 py-1.5 w-60 border shadow-xs"
            >
              <input
                type="text"
                placeholder="Search student or Roll No..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ color: isDark ? colors.gray[100] : '#0f172a' }}
                className="bg-transparent border-none outline-none text-xs flex-1 placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400" />
            </div>
            <span style={{ color: isDark ? colors.gray[300] : '#64748b' }} className="text-xs">
              Showing {displayedStudents.length} of {batchStudents.length} students
            </span>
          </div>

          {/* Quick Bulk Buttons */}
          <div className="flex items-center gap-2">
            <span style={{ color: isDark ? colors.gray[300] : '#64748b' }} className="text-[11px] font-bold uppercase hidden lg:inline">
              Quick Bulk:
            </span>
            
            <button
              onClick={() => handleMarkAll('Present')}
              style={{
                backgroundColor: isDark ? colors.primary[500] : '#f1f5f9',
                color: isDark ? colors.gray[100] : '#0f172a',
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold hover:opacity-80 transition-opacity border shadow-xs"
            >
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span>Mark All Present</span>
            </button>

            <button
              onClick={() => handleMarkAll('Absent')}
              style={{
                backgroundColor: isDark ? colors.primary[500] : '#f1f5f9',
                color: isDark ? colors.gray[100] : '#0f172a',
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold hover:opacity-80 transition-opacity border shadow-xs"
            >
              <X className="w-3.5 h-3.5 text-rose-500" />
              <span>Mark All Absent</span>
            </button>

            <button
              onClick={() => handleMarkAll('Late')}
              style={{
                backgroundColor: isDark ? colors.primary[500] : '#f1f5f9',
                color: isDark ? colors.gray[100] : '#0f172a',
                borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold hover:opacity-80 transition-opacity border shadow-xs"
            >
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Mark All Late</span>
            </button>
          </div>
        </div>

        {/* Student Attendance List Table */}
        <div className="overflow-x-auto">
          {displayedStudents.length === 0 ? (
            <div className="py-16 text-center">
              <Users className="w-12 h-12 mx-auto mb-2 text-slate-500" />
              <p style={{ color: isDark ? colors.gray[100] : '#0f172a' }} className="text-sm font-bold">
                No students found in this batch
              </p>
              <p style={{ color: isDark ? colors.gray[300] : '#64748b' }} className="text-xs mt-0.5">
                Try selecting another batch or adjust your search.
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  style={{
                    backgroundColor: isDark ? colors.primary[500] : '#f8fafc',
                    color: isDark ? colors.gray[300] : '#475569',
                    borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0'
                  }}
                  className="text-[11px] font-bold uppercase tracking-wider border-b"
                >
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Student Details</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4">Assigned PC</th>
                  <th className="py-3 px-4 text-center">Mark Status</th>
                  <th className="py-3 px-4">Remarks</th>
                </tr>
              </thead>
              <tbody
                style={{
                  borderColor: isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0'
                }}
                className="divide-y text-xs"
              >
                {displayedStudents.map((st, idx) => {
                  const studentStatus = currentAttendance[st.id]?.status || 'Present';
                  const studentRemark = currentAttendance[st.id]?.remark || '';

                  return (
                    <tr
                      key={st.id}
                      style={{
                        backgroundColor: idx % 2 === 0
                          ? 'transparent'
                          : (isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)')
                      }}
                      className="hover:opacity-90 transition-opacity"
                    >
                      {/* Index */}
                      <td style={{ color: isDark ? colors.gray[300] : '#64748b' }} className="py-3.5 px-4 text-center font-semibold">
                        {idx + 1}
                      </td>

                      {/* Student Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={st.avatar}
                            alt={st.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-300/40 flex-shrink-0"
                            onError={(e) => {
                              e.currentTarget.src = asset('/logo-icon.svg');
                            }}
                          />
                          <div>
                            <div style={{ color: isDark ? colors.gray[100] : '#0f172a' }} className="font-bold text-sm">
                              {st.name}
                            </div>
                            <div style={{ color: isDark ? colors.gray[300] : '#64748b' }} className="text-[11px]">
                              S/O: {st.fatherName}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span
                                style={{
                                  backgroundColor: isDark ? colors.primary[500] : '#f1f5f9',
                                  color: colors.greenAccent[500]
                                }}
                                className="font-mono text-[10px] px-1.5 py-0.5 rounded font-bold"
                              >
                                {st.regNo}
                              </span>
                              <span style={{ color: isDark ? colors.gray[400] : '#64748b' }} className="text-[10px]">
                                Roll: {st.rollNo}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Course */}
                      <td className="py-3.5 px-4">
                        <span
                          style={{
                            backgroundColor: isDark ? colors.primary[500] : '#f1f5f9',
                            color: isDark ? colors.gray[100] : '#0f172a',
                            borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'
                          }}
                          className="font-bold px-2 py-0.5 rounded text-xs inline-block border"
                        >
                          {st.courseCode}
                        </span>
                        <div style={{ color: isDark ? colors.gray[400] : '#64748b' }} className="text-[10px] mt-0.5 truncate max-w-[130px]">
                          {st.courseName}
                        </div>
                      </td>

                      {/* PC Station */}
                      <td className="py-3.5 px-4">
                        <span
                          style={{
                            backgroundColor: isDark ? colors.primary[500] : '#f1f5f9',
                            color: isDark ? colors.gray[100] : '#0f172a',
                            borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'
                          }}
                          className="font-mono px-2 py-1 rounded text-[11px] font-semibold border"
                        >
                          {st.pcNumber || `PC-${String(idx + 1).padStart(2, '0')}`}
                        </span>
                      </td>

                      {/* Status Toggle Buttons */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Present */}
                          <button
                            type="button"
                            onClick={() => handleSetStatus(st.id, 'Present')}
                            style={{
                              backgroundColor: studentStatus === 'Present'
                                ? '#10b981'
                                : (isDark ? colors.primary[500] : '#f1f5f9'),
                              color: studentStatus === 'Present'
                                ? '#ffffff'
                                : (isDark ? colors.gray[300] : '#475569'),
                              borderColor: studentStatus === 'Present'
                                ? '#059669'
                                : (isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'),
                            }}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                              studentStatus === 'Present' ? 'shadow-xs font-bold' : 'hover:opacity-80'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Present</span>
                          </button>

                          {/* Absent */}
                          <button
                            type="button"
                            onClick={() => handleSetStatus(st.id, 'Absent')}
                            style={{
                              backgroundColor: studentStatus === 'Absent'
                                ? '#ef4444'
                                : (isDark ? colors.primary[500] : '#f1f5f9'),
                              color: studentStatus === 'Absent'
                                ? '#ffffff'
                                : (isDark ? colors.gray[300] : '#475569'),
                              borderColor: studentStatus === 'Absent'
                                ? '#dc2626'
                                : (isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'),
                            }}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                              studentStatus === 'Absent' ? 'shadow-xs font-bold' : 'hover:opacity-80'
                            }`}
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Absent</span>
                          </button>

                          {/* Late */}
                          <button
                            type="button"
                            onClick={() => handleSetStatus(st.id, 'Late')}
                            style={{
                              backgroundColor: studentStatus === 'Late'
                                ? '#f59e0b'
                                : (isDark ? colors.primary[500] : '#f1f5f9'),
                              color: studentStatus === 'Late'
                                ? '#ffffff'
                                : (isDark ? colors.gray[300] : '#475569'),
                              borderColor: studentStatus === 'Late'
                                ? '#d97706'
                                : (isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'),
                            }}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                              studentStatus === 'Late' ? 'shadow-xs font-bold' : 'hover:opacity-80'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5" />
                            <span>Late</span>
                          </button>
                        </div>
                      </td>

                      {/* Remark Input */}
                      <td className="py-3.5 px-4">
                        <input
                          type="text"
                          value={studentRemark}
                          onChange={(e) => handleSetRemark(st.id, e.target.value)}
                          placeholder="Optional note..."
                          style={{
                            backgroundColor: isDark ? colors.primary[500] : '#f8fafc',
                            color: isDark ? colors.gray[100] : '#0f172a',
                            borderColor: isDark ? 'rgba(255,255,255,0.1)' : '#cbd5e1'
                          }}
                          className="w-full rounded-md px-2.5 py-1 text-xs border outline-none focus:ring-1 focus:ring-teal-400"
                        />
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer Save Action Bar */}
        <div
          style={{
            backgroundColor: isDark ? colors.primary[500] : '#f8fafc',
            borderColor: isDark ? 'rgba(255,255,255,0.08)' : '#e2e8f0'
          }}
          className="p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <div style={{ color: isDark ? colors.gray[300] : '#475569' }} className="text-xs">
            Ready to record: <strong style={{ color: isDark ? colors.gray[100] : '#0f172a' }}>{presentCount} Present</strong>, <strong style={{ color: isDark ? colors.gray[100] : '#0f172a' }}>{absentCount} Absent</strong> for <strong style={{ color: isDark ? colors.gray[100] : '#0f172a' }}>{activeBatch.name}</strong>.
          </div>

          <button
            onClick={handleSaveAttendance}
            disabled={isSaving}
            style={{
              backgroundColor: colors.blueAccent[700],
              color: '#ffffff',
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-bold hover:opacity-90 transition-opacity disabled:opacity-50 shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save & Record Attendance'}</span>
          </button>
        </div>

      </div>

    </div>
  );
};

export default AdminTakeAttendance;
