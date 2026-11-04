import React, { useState } from 'react';
import { PlusCircle, Pencil, Trash2, UserPlus, UserMinus, AlertTriangle, CalendarDays, Search } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAppTheme } from '../../context/ThemeContext';
import { DAY_PATTERNS } from '../../data/academicData';
import { Panel, Btn, Field, Modal, Badge, Muted, PageHead } from './ui';

const TIME_SLOTS = [
  '07:00 AM – 08:00 AM', '08:00 AM – 09:30 AM', '09:30 AM – 11:00 AM', '11:00 AM – 12:30 PM',
  '12:30 PM – 02:00 PM', '02:00 PM – 03:30 PM', '03:30 PM – 05:00 PM', '05:00 PM – 06:30 PM', '06:30 PM – 08:00 PM',
];
const WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const emptyBatch = {
  name: '', courseCode: 'ADIT', days: 'MWF', timing: TIME_SLOTS[1], room: 'Lab A',
  instructor: 'Sonu Kumar', maxCapacity: 20, branch: 'Branch 2',
};

const AdminBatches = ({ onTakeAttendance }) => {
  const { colors } = useAppTheme();
  const { batches, courses, students, saveBatch, deleteBatch, assignStudentToBatch, studentsInBatch, findBatchClash } = useData();
  const [editing, setEditing] = useState(null);
  const [assigning, setAssigning] = useState(null);
  const [search, setSearch] = useState('');
  const [view, setView] = useState('cards');

  const clash = editing ? findBatchClash(editing) : null;
  const set = (k) => (e) => setEditing((p) => ({ ...p, [k]: e.target.value }));

  const handleSave = () => {
    if (!editing.name.trim() || clash) return;
    saveBatch({ ...editing, maxCapacity: Number(editing.maxCapacity) });
    setEditing(null);
  };

  const handleDelete = (b) => {
    const n = studentsInBatch(b.id).length;
    if (window.confirm(`Delete ${b.name}?${n ? ` Its ${n} student(s) will become unassigned.` : ''}`)) deleteBatch(b.id);
  };

  const assigningBatch = assigning && batches.find((b) => b.id === assigning);
  const inBatch = assigningBatch ? studentsInBatch(assigningBatch.id) : [];
  const candidates = assigningBatch
    ? students.filter(
        (s) =>
          !inBatch.some((x) => x.id === s.id) &&
          (s.name.toLowerCase().includes(search.toLowerCase()) || s.regNo.toLowerCase().includes(search.toLowerCase()))
      )
    : [];
  const isFull = assigningBatch && inBatch.length >= assigningBatch.maxCapacity;

  // Weekly timetable: slot rows x day columns
  const usedSlots = TIME_SLOTS.filter((t) => batches.some((b) => b.timing === t));

  return (
    <div className="space-y-6">
      <PageHead
        title="BATCH MANAGEMENT"
        subtitle="Create batches, assign students, and run MWF / TTS batches in the same time slot"
        action={
          <>
            <Btn variant="ghost" onClick={() => setView(view === 'cards' ? 'timetable' : 'cards')}>
              <CalendarDays className="w-4 h-4" />{view === 'cards' ? 'WEEKLY TIMETABLE' : 'BATCH CARDS'}
            </Btn>
            <Btn onClick={() => setEditing({ ...emptyBatch })}><PlusCircle className="w-4 h-4" />CREATE BATCH</Btn>
          </>
        }
      />

      {view === 'timetable' ? (
        <Panel className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[720px]">
            <thead>
              <tr style={{ backgroundColor: colors.primary[500], color: colors.gray[300] }} className="text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3 text-left">Time</th>
                {WEEK.map((d) => <th key={d} className="py-3 px-3 text-left">{d}</th>)}
              </tr>
            </thead>
            <tbody style={{ color: colors.gray[100] }} className="divide-y divide-white/5">
              {usedSlots.map((slot) => (
                <tr key={slot}>
                  <td className="py-3 px-3 font-bold whitespace-nowrap">{slot}</td>
                  {WEEK.map((d) => (
                    <td key={d} className="py-2 px-2 align-top">
                      <div className="space-y-1">
                        {batches
                          .filter((b) => b.timing === slot && (DAY_PATTERNS[b.days] || DAY_PATTERNS.Daily).days.includes(d))
                          .map((b) => (
                            <div key={b.id} style={{ backgroundColor: colors.primary[500] }} className="rounded px-2 py-1">
                              <span style={{ color: colors.greenAccent[500] }} className="font-bold">{b.id}</span>{' '}
                              <span>{b.courseCode}</span>
                              <Muted className="block text-[10px]">{b.room} · {b.branch}</Muted>
                            </div>
                          ))}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {batches.map((b) => {
            const count = studentsInBatch(b.id).length;
            const pct = Math.min(100, Math.round((count / (b.maxCapacity || 1)) * 100));
            return (
              <Panel key={b.id} className="p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span style={{ backgroundColor: colors.primary[500], color: colors.greenAccent[500] }} className="text-xs font-bold px-2 py-0.5 rounded">
                      {b.id}
                    </span>
                    <div className="flex gap-1.5">
                      <Badge tone={b.days === 'Daily' ? 'gray' : 'amber'}>{b.days}</Badge>
                      <Badge tone="blue">{b.courseCode || 'Mixed'}</Badge>
                    </div>
                  </div>
                  <h3 style={{ color: colors.gray[100] }} className="font-bold text-sm mt-3">{b.name}</h3>
                  <div style={{ color: colors.gray[300] }} className="mt-2 space-y-1 text-xs">
                    <div>Timing: <strong style={{ color: colors.gray[100] }}>{b.timing}</strong></div>
                    <div>Days: <strong style={{ color: colors.gray[100] }}>{(DAY_PATTERNS[b.days] || DAY_PATTERNS.Daily).label}</strong></div>
                    <div>Room: <strong style={{ color: colors.gray[100] }}>{b.room} · {b.branch}</strong></div>
                    <div>Mentor: <strong style={{ color: colors.gray[100] }}>{b.instructor}</strong></div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-[11px] mb-1">
                      <Muted>Students assigned</Muted>
                      <strong style={{ color: pct >= 100 ? colors.redAccent[400] : colors.gray[100] }}>{count}/{b.maxCapacity}</strong>
                    </div>
                    <div style={{ backgroundColor: colors.primary[500] }} className="h-1.5 rounded-full overflow-hidden">
                      <div style={{ width: `${pct}%`, backgroundColor: pct >= 100 ? colors.redAccent[400] : colors.greenAccent[500] }} className="h-full" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center gap-2">
                  <Btn variant="success" onClick={() => { setSearch(''); setAssigning(b.id); }}><UserPlus className="w-3.5 h-3.5" />Assign</Btn>
                  <Btn variant="ghost" onClick={() => setEditing({ ...b })}><Pencil className="w-3.5 h-3.5" />Edit</Btn>
                  <Btn variant="ghost" onClick={() => onTakeAttendance?.(b.id)}>Attendance</Btn>
                  <Btn variant="ghost" onClick={() => handleDelete(b)} className="ml-auto" aria-label={`Delete ${b.id}`}><Trash2 className="w-3.5 h-3.5 text-rose-400" /></Btn>
                </div>
              </Panel>
            );
          })}
        </div>
      )}

      {/* Create / Edit batch */}
      {editing && (
        <Modal
          title={editing.id ? `Edit ${editing.id}` : 'Create New Batch'}
          onClose={() => setEditing(null)}
          footer={<><Btn variant="ghost" onClick={() => setEditing(null)}>Cancel</Btn><Btn onClick={handleSave} disabled={!editing.name.trim() || !!clash}>Save Batch</Btn></>}
        >
          <Field label="Batch name" value={editing.name} onChange={set('name')} placeholder="e.g. Batch-9 (ADCA Morning)" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Course" as="select" value={editing.courseCode} onChange={set('courseCode')}>
              {courses.map((c) => <option key={c.code} value={c.code}>{c.code}</option>)}
              <option value="Mixed">Mixed</option>
            </Field>
            <Field label="Days" as="select" value={editing.days} onChange={set('days')}>
              {Object.entries(DAY_PATTERNS).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
            </Field>
            <Field label="Time slot" as="select" value={editing.timing} onChange={set('timing')} className="col-span-2">
              {[...new Set([editing.timing, ...TIME_SLOTS])].map((t) => <option key={t}>{t}</option>)}
            </Field>
            <Field label="Branch" as="select" value={editing.branch} onChange={set('branch')}>
              <option>Branch 2</option>
              <option>Branch 1</option>
            </Field>
            <Field label="Room / Lab" value={editing.room} onChange={set('room')} />
            <Field label="Instructor" value={editing.instructor} onChange={set('instructor')} />
            <Field label="Capacity (PCs)" type="number" min="1" value={editing.maxCapacity} onChange={set('maxCapacity')} />
          </div>
          {clash ? (
            <p className="flex items-start gap-2 text-xs font-semibold text-rose-400">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              Clash with {clash.id} ({clash.name}) — same room, time and days. Pick MWF/TTS on alternate days, another room, or another slot.
            </p>
          ) : (
            <Muted className="block text-[11px]">
              Tip: two batches can share the same room and time if one is MWF and the other is TTS.
            </Muted>
          )}
        </Modal>
      )}

      {/* Assign students */}
      {assigningBatch && (
        <Modal title={`Assign students · ${assigningBatch.name}`} onClose={() => setAssigning(null)} wide>
          <div className="flex items-center justify-between text-xs">
            <Muted>{assigningBatch.timing} · {assigningBatch.days} · {assigningBatch.room}</Muted>
            <Badge tone={isFull ? 'red' : 'green'}>{inBatch.length}/{assigningBatch.maxCapacity} seats</Badge>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-2">In this batch</h4>
            {inBatch.length === 0 && <Muted className="text-xs">No students yet.</Muted>}
            <div className="space-y-1.5">
              {inBatch.map((s) => (
                <div key={s.id} style={{ backgroundColor: colors.primary[500] }} className="flex items-center justify-between rounded-md px-3 py-2 text-xs">
                  <span><strong>{s.name}</strong> <Muted>· {s.regNo} · {s.courseCode}</Muted></span>
                  <Btn variant="ghost" onClick={() => assignStudentToBatch(s.id, null)}><UserMinus className="w-3.5 h-3.5 text-rose-400" />Remove</Btn>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-2">Add students</h4>
            <div style={{ backgroundColor: colors.primary[500] }} className="flex items-center rounded-md px-3 py-2 mb-2">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or reg. no..."
                style={{ color: colors.gray[100] }}
                className="bg-transparent outline-none text-xs flex-1"
              />
            </div>
            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              {candidates.map((s) => (
                <div key={s.id} className="flex items-center justify-between rounded-md px-3 py-2 text-xs border border-white/5">
                  <span>
                    <strong>{s.name}</strong> <Muted>· {s.regNo} · {s.courseCode}</Muted>
                    <Muted className="block text-[10px]">Currently: {s.batchNo || 'Unassigned'}</Muted>
                  </span>
                  <Btn variant="success" disabled={isFull} onClick={() => assignStudentToBatch(s.id, assigningBatch.id)}>
                    <UserPlus className="w-3.5 h-3.5" />{s.batchNo && s.batchNo !== 'Unassigned' ? 'Move here' : 'Assign'}
                  </Btn>
                </div>
              ))}
              {candidates.length === 0 && <Muted className="text-xs">No matching students.</Muted>}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminBatches;
