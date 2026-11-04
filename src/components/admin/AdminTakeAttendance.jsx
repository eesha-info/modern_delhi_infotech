import React, { useState, useEffect } from 'react';
import {
  CheckSquare, Calendar, Users, Check, X, Clock, AlertCircle,
  Search, Save, Sparkles, Filter, ChevronRight
} from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminTakeAttendance = () => {
  const { batches, students, attendanceData, markBatchAttendance } = useData();

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
      
      {/* Top Controls Card: Batch Picker & Date Selector */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-200/80">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Daily Attendance Register
            </span>
            <h2 className="text-xl font-display font-bold text-slate-900 mt-0.5">
              Batchwise Student Attendance
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select an active batch to record physical presence in the lab.
            </p>
          </div>

          {/* Date Picker Input */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
              <Calendar className="w-4 h-4 text-slate-500 flex-shrink-0" />
              <label htmlFor="attendance-date" className="text-xs font-bold text-slate-700 whitespace-nowrap">
                Date:
              </label>
              <input
                id="attendance-date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent text-xs font-semibold text-slate-800 focus:outline-none cursor-pointer"
              />
            </div>

            <button
              onClick={() => setSelectedDate(new Date().toISOString().split('T')[0])}
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors"
            >
              Today
            </button>
          </div>
        </div>

        {/* Batch Selection Pills (Clean, minimal, not overly colorful) */}
        <div className="mt-5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
            Select Training Batch:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {batches.map((batch) => {
              const isSelected = selectedBatchId === batch.id;
              const batchNum = batch.id.replace('B', '');
              const countInBatch = students.filter(s => s.batchNo === `Batch-${batchNum}` || s.batchNo?.includes(batch.id)).length;

              return (
                <button
                  key={batch.id}
                  onClick={() => setSelectedBatchId(batch.id)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'bg-[#5e72e4] border-[#5e72e4] text-white shadow-xs'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {batch.id}
                    </span>
                    <span className={`text-[10px] ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                      {countInBatch} Students
                    </span>
                  </div>
                  <h4 className="font-bold text-xs mt-2 truncate">
                    {batch.name.split('(')[0]}
                  </h4>
                  <p className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                    {batch.timing}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Clean, Subtle Batch Meta Info Bar */}
        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <strong className="text-slate-900">{activeBatch.name}</strong>
            <span className="text-slate-300">·</span>
            <span>Timing: {activeBatch.timing}</span>
            <span className="text-slate-300">·</span>
            <span>Room: {activeBatch.room}</span>
            <span className="text-slate-300">·</span>
            <span>Instructor: <strong className="text-slate-800">{activeBatch.instructor}</strong></span>
          </div>

          <div className="text-[11px] text-slate-500">
            Capacity: <strong className="text-slate-800">{activeBatch.enrolled} / {activeBatch.maxCapacity} Seats</strong>
          </div>
        </div>
      </div>

      {/* Clean, Neutral Attendance Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
        
        {/* Total in batch */}
        <div className="bg-white rounded-xl p-4 shadow-xs border border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total in Batch</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-display">
            {totalCount}
          </div>
          <span className="text-[10px] text-slate-500">Registered Students</span>
        </div>

        {/* Present (Color used only on the status pill) */}
        <div className="bg-white rounded-xl p-4 shadow-xs border border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Present</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-display">
            {presentCount}
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
            In Lab Today
          </span>
        </div>

        {/* Absent */}
        <div className="bg-white rounded-xl p-4 shadow-xs border border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Absent</span>
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-display">
            {absentCount}
          </div>
          <span className="text-[10px] text-rose-700 font-semibold bg-rose-50 px-1.5 py-0.5 rounded">
            Not In Institute
          </span>
        </div>

        {/* Late */}
        <div className="bg-white rounded-xl p-4 shadow-xs border border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Late</span>
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-display">
            {lateCount}
          </div>
          <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.5 rounded">
            Permitted Late
          </span>
        </div>

        {/* Attendance Rate */}
        <div className="bg-white rounded-xl p-4 shadow-xs border border-slate-200/80 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Attendance</span>
            <span className="text-xs font-bold text-slate-700">{attendanceRate}%</span>
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1 font-display">
            {attendanceRate}%
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-[#5e72e4] h-full rounded-full transition-all duration-300"
              style={{ width: `${attendanceRate}%` }}
            ></div>
          </div>
        </div>

      </div>

      {/* Save Notification */}
      {saveSuccessMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center justify-between text-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span className="font-semibold">{saveSuccessMessage}</span>
          </div>
          <button onClick={() => setSaveSuccessMessage('')} className="p-1 hover:text-emerald-950">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Students Attendance Register Card */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
        
        {/* Table Action Bar */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search student or Roll No..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#5e72e4] focus:bg-white"
              />
            </div>
            <span className="text-xs text-slate-500">
              Showing {displayedStudents.length} of {batchStudents.length} students
            </span>
          </div>

          {/* Clean, Non-loud Quick Bulk Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase hidden lg:inline">Quick Bulk:</span>
            
            <button
              onClick={() => handleMarkAll('Present')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-colors"
            >
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Mark All Present</span>
            </button>

            <button
              onClick={() => handleMarkAll('Absent')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-colors"
            >
              <X className="w-3.5 h-3.5 text-rose-600" />
              <span>Mark All Absent</span>
            </button>

            <button
              onClick={() => handleMarkAll('Late')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-colors"
            >
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Mark All Late</span>
            </button>
          </div>
        </div>

        {/* Student Attendance List Table */}
        <div className="overflow-x-auto">
          {displayedStudents.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <Users className="w-12 h-12 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-bold text-slate-600">No students found in this batch</p>
              <p className="text-xs text-slate-400 mt-0.5">Try selecting another batch or adjust your search.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Student Details</th>
                  <th className="py-3 px-4">Course</th>
                  <th className="py-3 px-4">Assigned PC</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {displayedStudents.map((st, idx) => {
                  const studentStatus = currentAttendance[st.id]?.status || 'Present';
                  const studentRemark = currentAttendance[st.id]?.remark || '';

                  return (
                    <tr key={st.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Index */}
                      <td className="py-3.5 px-4 text-center text-slate-400 font-semibold">
                        {idx + 1}
                      </td>

                      {/* Student Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={st.avatar}
                            alt={st.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200 flex-shrink-0"
                            onError={(e) => {
                              e.currentTarget.src = "/logo-icon.svg";
                            }}
                          />
                          <div>
                            <div className="font-bold text-slate-900">
                              {st.name}
                            </div>
                            <div className="text-[11px] text-slate-500">
                              S/O: {st.fatherName}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="font-mono text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded">
                                {st.regNo}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                Roll: {st.rollNo}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Course */}
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-xs">
                          {st.courseCode}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[130px]">
                          {st.courseName}
                        </div>
                      </td>

                      {/* PC Station */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-slate-700 bg-slate-50 px-2.5 py-1 rounded text-[11px] border border-slate-200">
                          {st.pcNumber || `PC-${String(idx + 1).padStart(2, '0')}`}
                        </span>
                      </td>

                      {/* Attendance Toggle Buttons (Where color is functionally needed) */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Present */}
                          <button
                            type="button"
                            onClick={() => handleSetStatus(st.id, 'Present')}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                              studentStatus === 'Present'
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Present</span>
                          </button>

                          {/* Absent */}
                          <button
                            type="button"
                            onClick={() => handleSetStatus(st.id, 'Absent')}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                              studentStatus === 'Absent'
                                ? 'bg-rose-600 text-white shadow-xs'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Absent</span>
                          </button>

                          {/* Late */}
                          <button
                            type="button"
                            onClick={() => handleSetStatus(st.id, 'Late')}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                              studentStatus === 'Late'
                                ? 'bg-amber-500 text-white shadow-xs'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
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
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:bg-white focus:border-[#5e72e4]"
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
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Ready to record: <strong className="text-slate-800">{presentCount} Present</strong>, <strong className="text-slate-800">{absentCount} Absent</strong> for <strong className="text-slate-800">{activeBatch.name}</strong>.
          </div>

          <button
            onClick={handleSaveAttendance}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#5e72e4] hover:bg-[#4b5ec9] text-white font-bold rounded-xl text-xs shadow-xs transition-all disabled:opacity-50"
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
