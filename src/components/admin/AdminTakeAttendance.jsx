import React, { useState, useEffect } from 'react';
import {
  CheckSquare, Calendar, Users, Check, X, Clock,
  Search, Save
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAppTheme } from '../../context/ThemeContext';
import Header from '../dashboard/Header';

const AdminTakeAttendance = () => {
  const { batches, students, attendanceData, markBatchAttendance } = useData();
  const { colors, mode } = useAppTheme();

  // State
  const [selectedBatchId, setSelectedBatchId] = useState('B1');
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // '2026-11-04'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [saveSuccessMessage, setSaveSuccessMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Map of studentId -> { status: 'Present' | 'Absent' | 'Late', remark: '' }
  const [currentAttendance, setCurrentAttendance] = useState({});

  // Active batch object
  const activeBatch = batches.find(b => b.id === selectedBatchId) || batches[0];

  // Students belonging to the selected batch
  const batchStudents = students.filter(s => {
    const batchNum = selectedBatchId.replace('B', '');
    return s.batchNo === `Batch-${batchNum}` || s.batchNo?.includes(selectedBatchId);
  });

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
        style={{ backgroundColor: colors.primary[400] }}
        className="rounded-lg p-6 shadow-xs"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-white/5">
          <div>
            <h3 style={{ color: colors.gray[100] }} className="text-lg font-bold font-display">
              Select Batch &amp; Date
            </h3>
            <p style={{ color: colors.gray[300] }} className="text-xs mt-0.5">
              Choose the batch time slot and session date to record attendance.
            </p>
          </div>

          {/* Date Picker Input */}
          <div className="flex items-center gap-3">
            <div
              style={{ backgroundColor: colors.primary[500] }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-md"
            >
              <Calendar className="w-4 h-4" style={{ color: colors.gray[300] }} />
              <label
                htmlFor="attendance-date"
                style={{ color: colors.gray[100] }}
                className="text-xs font-semibold whitespace-nowrap"
              >
                Date:
              </label>
              <input
                id="attendance-date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ color: colors.gray[100] }}
                className="bg-transparent text-xs font-bold focus:outline-none cursor-pointer"
              />
            </div>

            <button
              onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
              style={{
                backgroundColor: colors.blueAccent[700],
                color: '#ffffff',
              }}
              className="text-xs font-bold px-3 py-2 rounded-md hover:opacity-90 transition-opacity"
            >
              Today
            </button>
          </div>
        </div>

        {/* Batch Selection Pills */}
        <div className="mt-5">
          <label style={{ color: colors.gray[300] }} className="text-[11px] font-bold uppercase tracking-wider block mb-2.5">
            Select Computer Training Batch:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {batches.map((batch) => {
              const isSelected = selectedBatchId === batch.id;
              const batchNum = batch.id.replace('B', '');
              const countInBatch = students.filter(
                s => s.batchNo === `Batch-${batchNum}` || s.batchNo?.includes(batch.id)
              ).length;

              return (
                <button
                  key={batch.id}
                  onClick={() => setSelectedBatchId(batch.id)}
                  style={{
                    backgroundColor: isSelected ? colors.blueAccent[700] : colors.primary[500],
                    color: '#ffffff',
                    border: isSelected ? `1px solid ${colors.blueAccent[400]}` : '1px solid transparent',
                  }}
                  className="p-3 rounded-md text-left transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span
                      style={{
                        backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)',
                        color: colors.gray[100]
                      }}
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded"
                    >
                      {batch.id}
                    </span>
                    <span style={{ color: colors.gray[300] }} className="text-[10px]">
                      {countInBatch} St.
                    </span>
                  </div>
                  <h4 className="font-bold text-xs mt-2 truncate">
                    {batch.name.split('(')[0]}
                  </h4>
                  <p style={{ color: colors.gray[300] }} className="text-[10px] mt-0.5 truncate">
                    {batch.timing}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Meta Info Bar */}
        <div
          style={{ backgroundColor: colors.primary[500] }}
          className="mt-4 p-3 rounded-md flex flex-wrap items-center justify-between gap-3 text-xs"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.greenAccent[500] }}></span>
            <strong style={{ color: colors.gray[100] }}>{activeBatch.name}</strong>
            <span style={{ color: colors.gray[400] }}>·</span>
            <span style={{ color: colors.gray[300] }}>Timing: {activeBatch.timing}</span>
            <span style={{ color: colors.gray[400] }}>·</span>
            <span style={{ color: colors.gray[300] }}>Room: {activeBatch.room}</span>
            <span style={{ color: colors.gray[400] }}>·</span>
            <span style={{ color: colors.gray[300] }}>
              Mentor: <strong style={{ color: colors.gray[100] }}>{activeBatch.instructor}</strong>
            </span>
          </div>

          <div style={{ color: colors.gray[300] }} className="text-[11px]">
            Capacity: <strong style={{ color: colors.gray[100] }}>{activeBatch.enrolled} / {activeBatch.maxCapacity} PCs</strong>
          </div>
        </div>
      </div>

      {/* Real-time Attendance Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        
        {/* Total in batch */}
        <div
          style={{ backgroundColor: colors.primary[400] }}
          className="rounded-lg p-4 shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span style={{ color: colors.gray[300] }} className="text-[10px] font-bold uppercase tracking-wider">
              Total in Batch
            </span>
            <Users className="w-4 h-4" style={{ color: colors.gray[300] }} />
          </div>
          <div style={{ color: colors.gray[100] }} className="text-2xl font-black mt-1 font-display">
            {totalCount}
          </div>
          <span style={{ color: colors.gray[400] }} className="text-[10px]">
            Registered Students
          </span>
        </div>

        {/* Present */}
        <div
          style={{ backgroundColor: colors.primary[400] }}
          className="rounded-lg p-4 shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span style={{ color: colors.greenAccent[500] }} className="text-[10px] font-bold uppercase tracking-wider">
              Present
            </span>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.greenAccent[500] }}></span>
          </div>
          <div style={{ color: colors.gray[100] }} className="text-2xl font-black mt-1 font-display">
            {presentCount}
          </div>
          <span style={{ color: colors.greenAccent[500] }} className="text-[10px] font-semibold">
            In Lab Today
          </span>
        </div>

        {/* Absent */}
        <div
          style={{ backgroundColor: colors.primary[400] }}
          className="rounded-lg p-4 shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span style={{ color: colors.redAccent[500] }} className="text-[10px] font-bold uppercase tracking-wider">
              Absent
            </span>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.redAccent[500] }}></span>
          </div>
          <div style={{ color: colors.gray[100] }} className="text-2xl font-black mt-1 font-display">
            {absentCount}
          </div>
          <span style={{ color: colors.redAccent[500] }} className="text-[10px] font-semibold">
            Not In Institute
          </span>
        </div>

        {/* Late */}
        <div
          style={{ backgroundColor: colors.primary[400] }}
          className="rounded-lg p-4 shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span style={{ color: colors.blueAccent[400] }} className="text-[10px] font-bold uppercase tracking-wider">
              Late
            </span>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.blueAccent[400] }}></span>
          </div>
          <div style={{ color: colors.gray[100] }} className="text-2xl font-black mt-1 font-display">
            {lateCount}
          </div>
          <span style={{ color: colors.blueAccent[400] }} className="text-[10px] font-semibold">
            Permitted Late
          </span>
        </div>

        {/* Attendance Rate */}
        <div
          style={{ backgroundColor: colors.primary[400] }}
          className="rounded-lg p-4 shadow-xs col-span-2 sm:col-span-1"
        >
          <div className="flex items-center justify-between">
            <span style={{ color: colors.gray[300] }} className="text-[10px] font-bold uppercase tracking-wider">
              Attendance
            </span>
            <span style={{ color: colors.greenAccent[500] }} className="text-xs font-bold">{attendanceRate}%</span>
          </div>
          <div style={{ color: colors.gray[100] }} className="text-2xl font-black mt-1 font-display">
            {attendanceRate}%
          </div>
          <div
            style={{ backgroundColor: colors.primary[500] }}
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
        style={{ backgroundColor: colors.primary[400] }}
        className="rounded-lg shadow-xs overflow-hidden"
      >
        {/* Table Action Bar */}
        <div className="p-4 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              style={{ backgroundColor: colors.primary[500] }}
              className="flex items-center rounded-md px-3 py-1.5 w-60"
            >
              <input
                type="text"
                placeholder="Search student or Roll No..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ color: colors.gray[100] }}
                className="bg-transparent border-none outline-none text-xs flex-1 placeholder:text-slate-400"
              />
              <Search className="w-4 h-4 text-slate-400" />
            </div>
            <span style={{ color: colors.gray[300] }} className="text-xs">
              Showing {displayedStudents.length} of {batchStudents.length} students
            </span>
          </div>

          {/* Quick Bulk Buttons */}
          <div className="flex items-center gap-2">
            <span style={{ color: colors.gray[300] }} className="text-[11px] font-bold uppercase hidden lg:inline">
              Quick Bulk:
            </span>
            
            <button
              onClick={() => handleMarkAll('Present')}
              style={{
                backgroundColor: colors.primary[500],
                color: colors.gray[100],
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold hover:opacity-80 transition-opacity"
            >
              <Check className="w-3.5 h-3.5" style={{ color: colors.greenAccent[500] }} />
              <span>Mark All Present</span>
            </button>

            <button
              onClick={() => handleMarkAll('Absent')}
              style={{
                backgroundColor: colors.primary[500],
                color: colors.gray[100],
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold hover:opacity-80 transition-opacity"
            >
              <X className="w-3.5 h-3.5" style={{ color: colors.redAccent[500] }} />
              <span>Mark All Absent</span>
            </button>

            <button
              onClick={() => handleMarkAll('Late')}
              style={{
                backgroundColor: colors.primary[500],
                color: colors.gray[100],
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold hover:opacity-80 transition-opacity"
            >
              <Clock className="w-3.5 h-3.5" style={{ color: colors.blueAccent[400] }} />
              <span>Mark All Late</span>
            </button>
          </div>
        </div>

        {/* Student Attendance List Table */}
        <div className="overflow-x-auto">
          {displayedStudents.length === 0 ? (
            <div className="py-16 text-center">
              <Users className="w-12 h-12 mx-auto mb-2 text-slate-500" />
              <p style={{ color: colors.gray[100] }} className="text-sm font-bold">
                No students found in this batch
              </p>
              <p style={{ color: colors.gray[300] }} className="text-xs mt-0.5">
                Try selecting another batch or adjust your search.
              </p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  style={{
                    backgroundColor: colors.primary[500],
                    color: colors.gray[300]
                  }}
                  className="text-[11px] font-bold uppercase tracking-wider border-b border-white/5"
                >
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Student Details</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4">Assigned PC</th>
                  <th className="py-3 px-4 text-center">Mark Status</th>
                  <th className="py-3 px-4">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {displayedStudents.map((st, idx) => {
                  const studentStatus = currentAttendance[st.id]?.status || 'Present';
                  const studentRemark = currentAttendance[st.id]?.remark || '';

                  return (
                    <tr
                      key={st.id}
                      style={{
                        backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'
                      }}
                      className="hover:opacity-90 transition-opacity"
                    >
                      {/* Index */}
                      <td style={{ color: colors.gray[300] }} className="py-3.5 px-4 text-center font-semibold">
                        {idx + 1}
                      </td>

                      {/* Student Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={st.avatar}
                            alt={st.name}
                            className="w-9 h-9 rounded-full object-cover border border-white/10 flex-shrink-0"
                            onError={(e) => {
                              e.currentTarget.src = "/logo-icon.svg";
                            }}
                          />
                          <div>
                            <div style={{ color: colors.gray[100] }} className="font-bold text-sm">
                              {st.name}
                            </div>
                            <div style={{ color: colors.gray[300] }} className="text-[11px]">
                              S/O: {st.fatherName}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span
                                style={{
                                  backgroundColor: colors.primary[500],
                                  color: colors.greenAccent[500]
                                }}
                                className="font-mono text-[10px] px-1.5 py-0.5 rounded"
                              >
                                {st.regNo}
                              </span>
                              <span style={{ color: colors.gray[400] }} className="text-[10px]">
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
                            backgroundColor: colors.primary[500],
                            color: colors.gray[100]
                          }}
                          className="font-bold px-2 py-0.5 rounded text-xs inline-block"
                        >
                          {st.courseCode}
                        </span>
                        <div style={{ color: colors.gray[400] }} className="text-[10px] mt-0.5 truncate max-w-[130px]">
                          {st.courseName}
                        </div>
                      </td>

                      {/* PC Station */}
                      <td className="py-3.5 px-4">
                        <span
                          style={{
                            backgroundColor: colors.primary[500],
                            color: colors.gray[100]
                          }}
                          className="font-mono px-2 py-1 rounded text-[11px]"
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
                              backgroundColor: studentStatus === 'Present' ? colors.greenAccent[600] : colors.primary[500],
                              color: '#ffffff',
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-opacity"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Present</span>
                          </button>

                          {/* Absent */}
                          <button
                            type="button"
                            onClick={() => handleSetStatus(st.id, 'Absent')}
                            style={{
                              backgroundColor: studentStatus === 'Absent' ? colors.redAccent[500] : colors.primary[500],
                              color: '#ffffff',
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-opacity"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Absent</span>
                          </button>

                          {/* Late */}
                          <button
                            type="button"
                            onClick={() => handleSetStatus(st.id, 'Late')}
                            style={{
                              backgroundColor: studentStatus === 'Late' ? colors.blueAccent[600] : colors.primary[500],
                              color: '#ffffff',
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-opacity"
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
                            backgroundColor: colors.primary[500],
                            color: colors.gray[100]
                          }}
                          className="w-full rounded-md px-2.5 py-1 text-xs outline-none focus:ring-1 focus:ring-teal-400"
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
          style={{ backgroundColor: colors.primary[500] }}
          className="p-4 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <div style={{ color: colors.gray[300] }} className="text-xs">
            Ready to record: <strong style={{ color: colors.gray[100] }}>{presentCount} Present</strong>, <strong style={{ color: colors.gray[100] }}>{absentCount} Absent</strong> for <strong style={{ color: colors.gray[100] }}>{activeBatch.name}</strong>.
          </div>

          <button
            onClick={handleSaveAttendance}
            disabled={isSaving}
            style={{
              backgroundColor: colors.blueAccent[700],
              color: '#ffffff',
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
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
