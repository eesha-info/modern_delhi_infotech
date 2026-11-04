import React, { useMemo, useState } from 'react';
import {
  PlusCircle, Pencil, Trash2, UserPlus, UserMinus, AlertTriangle, CalendarDays, Search, Settings2, X,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAppTheme } from '../../context/ThemeContext';
import { DAY_PATTERNS } from '../../data/academicData';
import { Panel, Btn, Field, Modal, Badge, Muted, PageHead } from './ui';

// 1-hour slots, 7 AM – 8 PM
const fmt = (h) => {
  const ap = h < 12 ? 'AM' : 'PM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${String(h12).padStart(2, '0')}:00 ${ap}`;
};
const TIME_SLOTS = Array.from({ length: 13 }, (_, i) => `${fmt(7 + i)} – ${fmt(8 + i)}`);
const WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const TYPES = ['Theory', 'Lab'];
const DAY_OPTIONS = ['MWF', 'TTS'];
const slotOrder = (t) => {
  const i = TIME_SLOTS.indexOf(t);
  return i === -1 ? 99 : i;
};

const AdminBatches = ({ onTakeAttendance }) => {
  const { colors } = useAppTheme();
  const {
    batches, courses, students, saveBatch, deleteBatch, assignStudentToBatch, studentsInBatch,
    findBatchConflict, batchSettings, setBatchSettings, studentBatches, findAssignIssue,
  } = useData();

  const [editing, setEditing] = useState(null);
  const [assigning, setAssigning] = useState(null);
  const [assignSearch, setAssignSearch] = useState('');
  const [view, setView] = useState('cards');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [filters, setFilters] = useState({ q: '', type: 'All', days: 'All', branch: 'All', course: 'All', slot: 'All' });

  const capacityFor = (type) => (type === 'Lab' ? batchSettings.labCapacity : batchSettings.theoryCapacity);

  const newBatch = (preset = {}) => ({
    name: '', type: 'Theory', courseCode: courses[0]?.code || 'ADIT', days: 'MWF', timing: TIME_SLOTS[0],
    room: 'Classroom 1', instructor: 'Sonu Kumar', branch: 'Branch 2', maxCapacity: batchSettings.theoryCapacity,
    ...preset,
  });

  /* ---------------- filtering ---------------- */
  const setF = (k) => (e) => setFilters((f) => ({ ...f, [k]: e.target.value }));
  const activeFilterCount = Object.entries(filters).filter(([k, v]) => (k === 'q' ? v.trim() : v !== 'All')).length;
  const visible = useMemo(
    () =>
      batches
        .filter((b) => filters.type === 'All' || (b.type || 'Theory') === filters.type)
        .filter((b) => filters.days === 'All' || b.days === filters.days)
        .filter((b) => filters.branch === 'All' || b.branch === filters.branch)
        .filter((b) => filters.course === 'All' || b.courseCode === filters.course)
        .filter((b) => filters.slot === 'All' || b.timing === filters.slot)
        .filter((b) => {
          const q = filters.q.trim().toLowerCase();
          return !q || [b.id, b.name, b.instructor, b.room].some((x) => x?.toLowerCase().includes(q));
        })
        .sort((a, b) => Number(a.type === 'Lab') - Number(b.type === 'Lab') || slotOrder(a.timing) - slotOrder(b.timing) || a.days.localeCompare(b.days)),
    [batches, filters]
  );

  /* ---------------- create / edit ---------------- */
  const conflict = editing ? findBatchConflict(editing) : null;
  const set = (k) => (e) => {
    const v = e.target.value;
    setEditing((p) => {
      const next = { ...p, [k]: v };
      // switching type picks that type's default capacity unless the admin already changed it
      if (k === 'type' && Number(p.maxCapacity) === capacityFor(p.type)) next.maxCapacity = capacityFor(v);
      if (k === 'type' && p.room === (p.type === 'Lab' ? 'Lab A' : 'Classroom 1')) next.room = v === 'Lab' ? 'Lab A' : 'Classroom 1';
      return next;
    });
  };
  const autoName = (b) => `${b.courseCode} ${b.type} – ${b.timing.split(' – ')[0]} ${b.days}`;

  const handleSave = () => {
    if (conflict) return;
    saveBatch({ ...editing, name: editing.name.trim() || autoName(editing), maxCapacity: Number(editing.maxCapacity) || capacityFor(editing.type) });
    setEditing(null);
  };

  const handleDelete = (b) => {
    const n = studentsInBatch(b.id).length;
    if (window.confirm(`Delete ${b.id} (${b.name})?${n ? ` Its ${n} student(s) will become unassigned.` : ''}`)) deleteBatch(b.id);
  };

  /* ---------------- assign students ---------------- */
  const assigningBatch = assigning && batches.find((b) => b.id === assigning);
  const inBatch = assigningBatch ? studentsInBatch(assigningBatch.id) : [];
  const candidates = assigningBatch
    ? students.filter(
        (s) =>
          !inBatch.some((x) => x.id === s.id) &&
          (s.name.toLowerCase().includes(assignSearch.toLowerCase()) || s.regNo.toLowerCase().includes(assignSearch.toLowerCase()))
      ).sort((a, b) => Number(b.courseCode === assigningBatch.courseCode) - Number(a.courseCode === assigningBatch.courseCode))
    : [];
  const assignType = assigningBatch?.type || 'Theory';
  const slotLabel = (b) => (b ? `${b.id} · ${b.days} · ${b.timing.split(' – ')[0]}` : 'Not assigned');
  const isFull = assigningBatch && inBatch.length >= assigningBatch.maxCapacity;

  /* ---------------- capacity settings ---------------- */
  const [draftSettings, setDraftSettings] = useState(batchSettings);
  const [applyExisting, setApplyExisting] = useState(false);
  const openSettings = () => { setDraftSettings(batchSettings); setApplyExisting(false); setSettingsOpen(true); };
  const saveSettings = () => {
    const next = { theoryCapacity: Number(draftSettings.theoryCapacity) || 1, labCapacity: Number(draftSettings.labCapacity) || 1 };
    setBatchSettings(next);
    if (applyExisting) {
      batches.forEach((b) => saveBatch({ ...b, maxCapacity: (b.type || 'Theory') === 'Lab' ? next.labCapacity : next.theoryCapacity }));
    }
    setSettingsOpen(false);
  };

  const typeTone = (t) => ((t || 'Theory') === 'Lab' ? 'amber' : 'blue');
  const timetableSlots = [...new Set(visible.map((b) => b.timing))].sort((a, b) => slotOrder(a) - slotOrder(b));
  const theoryCount = batches.filter((b) => (b.type || 'Theory') === 'Theory').length;

  return (
    <div className="space-y-6">
      <PageHead
        title="BATCH MANAGEMENT"
        subtitle="1-hour batches · two per hour (MWF & TTS) · Theory and Lab with their own capacity"
        action={
          <>
            <Btn variant="ghost" onClick={openSettings}><Settings2 className="w-4 h-4" />CAPACITY</Btn>
            <Btn variant="ghost" onClick={() => setView(view === 'cards' ? 'timetable' : 'cards')}>
              <CalendarDays className="w-4 h-4" />{view === 'cards' ? 'WEEKLY TIMETABLE' : 'BATCH CARDS'}
            </Btn>
            <Btn onClick={() => setEditing(newBatch())}><PlusCircle className="w-4 h-4" />CREATE BATCH</Btn>
          </>
        }
      />

      {/* Capacity summary */}
      <div className="flex flex-wrap gap-3 text-xs">
        <Panel className="px-4 py-2.5 flex items-center gap-2">
          <Badge tone="blue">Theory</Badge>
          <span style={{ color: colors.gray[100] }}><strong>{batchSettings.theoryCapacity}</strong> seats / batch</span>
          <Muted>· {theoryCount} batches</Muted>
        </Panel>
        <Panel className="px-4 py-2.5 flex items-center gap-2">
          <Badge tone="amber">Lab</Badge>
          <span style={{ color: colors.gray[100] }}><strong>{batchSettings.labCapacity}</strong> PCs / batch</span>
          <Muted>· {batches.length - theoryCount} batches</Muted>
        </Panel>
      </div>

      {/* Filters */}
      <Panel className="p-4 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 items-end">
        <label className="col-span-2 md:col-span-3 xl:col-span-1 block">
          <Muted className="block text-[11px] font-bold uppercase tracking-wider mb-1">Search</Muted>
          <div style={{ backgroundColor: colors.primary[500] }} className="flex items-center rounded-md px-3 py-2">
            <Search className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
            <input value={filters.q} onChange={setF('q')} placeholder="ID, name, mentor, room" style={{ color: colors.gray[100] }} className="bg-transparent outline-none text-sm flex-1 min-w-0" />
          </div>
        </label>
        <Field label="Type" as="select" value={filters.type} onChange={setF('type')}>
          <option value="All">All types</option>
          {TYPES.map((t) => <option key={t}>{t}</option>)}
        </Field>
        <Field label="Days" as="select" value={filters.days} onChange={setF('days')}>
          <option value="All">MWF + TTS</option>
          {DAY_OPTIONS.map((d) => <option key={d}>{d}</option>)}
        </Field>
        <Field label="Time" as="select" value={filters.slot} onChange={setF('slot')}>
          <option value="All">All hours</option>
          {TIME_SLOTS.map((t) => <option key={t}>{t}</option>)}
        </Field>
        <Field label="Course" as="select" value={filters.course} onChange={setF('course')}>
          <option value="All">All courses</option>
          {courses.map((c) => <option key={c.code}>{c.code}</option>)}
        </Field>
        <Field label="Branch" as="select" value={filters.branch} onChange={setF('branch')}>
          <option value="All">Both branches</option>
          <option>Branch 2</option>
          <option>Branch 1</option>
        </Field>
        {activeFilterCount > 0 && (
          <div className="col-span-2 md:col-span-3 xl:col-span-6 flex items-center justify-between text-xs">
            <Muted>Showing {visible.length} of {batches.length} batches</Muted>
            <button onClick={() => setFilters({ q: '', type: 'All', days: 'All', branch: 'All', course: 'All', slot: 'All' })} style={{ color: colors.greenAccent[500] }} className="font-bold inline-flex items-center gap-1">
              <X className="w-3.5 h-3.5" /> Clear filters
            </button>
          </div>
        )}
      </Panel>

      {visible.length === 0 ? (
        <Panel className="p-10 text-center"><Muted className="text-sm">No batches match these filters.</Muted></Panel>
      ) : view === 'timetable' ? (
        <Panel className="overflow-x-auto">
          <table className="w-full text-xs border-collapse min-w-[760px]">
            <thead>
              <tr style={{ backgroundColor: colors.primary[500], color: colors.gray[300] }} className="text-[11px] uppercase tracking-wider">
                <th className="py-3 px-3 text-left">Time</th>
                {WEEK.map((d) => <th key={d} className="py-3 px-3 text-left">{d}</th>)}
              </tr>
            </thead>
            <tbody style={{ color: colors.gray[100] }} className="divide-y divide-white/5">
              {timetableSlots.map((slot) => (
                <tr key={slot}>
                  <td className="py-3 px-3 font-bold whitespace-nowrap align-top">{slot}</td>
                  {WEEK.map((d) => (
                    <td key={d} className="py-2 px-2 align-top">
                      <div className="space-y-1">
                        {visible
                          .filter((b) => b.timing === slot && (DAY_PATTERNS[b.days] || DAY_PATTERNS.MWF).days.includes(d))
                          .map((b) => (
                            <button
                              key={b.id}
                              onClick={() => setEditing({ ...b })}
                              style={{ backgroundColor: colors.primary[500], borderLeftColor: (b.type || 'Theory') === 'Lab' ? '#f59e0b' : colors.blueAccent[400] }}
                              className="w-full text-left rounded px-2 py-1 border-l-[3px] hover:opacity-80"
                              title="Edit batch"
                            >
                              <span style={{ color: colors.greenAccent[500] }} className="font-bold">{b.id}</span>{' '}
                              <span>{b.courseCode}</span>{' '}
                              <Muted className="text-[10px]">{b.type || 'Theory'}</Muted>
                              <Muted className="block text-[10px]">{b.room} · {b.branch}</Muted>
                            </button>
                          ))}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex gap-4 px-4 py-3 text-[11px]">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm" style={{ backgroundColor: colors.blueAccent[400] }} /><Muted>Theory</Muted></span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-amber-500" /><Muted>Lab</Muted></span>
          </div>
        </Panel>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {visible.map((b) => {
            const count = studentsInBatch(b.id).length;
            const pct = Math.min(100, Math.round((count / (b.maxCapacity || 1)) * 100));
            const unit = (b.type || 'Theory') === 'Lab' ? 'PCs' : 'seats';
            return (
              <Panel key={b.id} className="p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span style={{ backgroundColor: colors.primary[500], color: colors.greenAccent[500] }} className="text-xs font-bold px-2 py-0.5 rounded">{b.id}</span>
                    <div className="flex gap-1.5">
                      <Badge tone={typeTone(b.type)}>{b.type || 'Theory'}</Badge>
                      <Badge tone="gray">{b.days}</Badge>
                      <Badge tone="green">{b.courseCode || 'Mixed'}</Badge>
                    </div>
                  </div>
                  <h3 style={{ color: colors.gray[100] }} className="font-bold text-sm mt-3">{b.name}</h3>
                  <div style={{ color: colors.gray[300] }} className="mt-2 space-y-1 text-xs">
                    <div>Time: <strong style={{ color: colors.gray[100] }}>{b.timing}</strong></div>
                    <div>Days: <strong style={{ color: colors.gray[100] }}>{(DAY_PATTERNS[b.days] || DAY_PATTERNS.MWF).label}</strong></div>
                    <div>Room: <strong style={{ color: colors.gray[100] }}>{b.room} · {b.branch}</strong></div>
                    <div>Mentor: <strong style={{ color: colors.gray[100] }}>{b.instructor}</strong></div>
                  </div>
                  <div className="mt-3">
                    <div className="flex justify-between text-[11px] mb-1">
                      <Muted>Capacity ({unit})</Muted>
                      <strong style={{ color: pct >= 100 ? colors.redAccent[400] : colors.gray[100] }}>{count}/{b.maxCapacity}</strong>
                    </div>
                    <div style={{ backgroundColor: colors.primary[500] }} className="h-1.5 rounded-full overflow-hidden">
                      <div style={{ width: `${pct}%`, backgroundColor: pct >= 100 ? colors.redAccent[400] : colors.greenAccent[500] }} className="h-full" />
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center gap-2">
                  <Btn variant="success" onClick={() => { setAssignSearch(''); setAssigning(b.id); }}><UserPlus className="w-3.5 h-3.5" />Assign</Btn>
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
          footer={<><Btn variant="ghost" onClick={() => setEditing(null)}>Cancel</Btn><Btn onClick={handleSave} disabled={!!conflict}>{editing.id ? 'Save Changes' : 'Create Batch'}</Btn></>}
        >
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Type"
              as="select"
              value={editing.type || 'Theory'}
              onChange={set('type')}
              disabled={!!editing.id && studentsInBatch(editing.id).length > 0}
              hint={editing.id && studentsInBatch(editing.id).length > 0 ? 'Remove students first to change type' : undefined}
            >
              {TYPES.map((t) => <option key={t}>{t}</option>)}
            </Field>
            <Field label="Days" as="select" value={editing.days} onChange={set('days')}>
              {[...new Set([...DAY_OPTIONS, editing.days])].map((k) => <option key={k} value={k}>{DAY_PATTERNS[k]?.label || k}</option>)}
            </Field>
            <Field label="Time (1 hour)" as="select" value={editing.timing} onChange={set('timing')} className="col-span-2">
              {[...new Set([...TIME_SLOTS, editing.timing])].map((t) => <option key={t}>{t}</option>)}
            </Field>
            <Field label="Course" as="select" value={editing.courseCode} onChange={set('courseCode')}>
              {courses.map((c) => <option key={c.code} value={c.code}>{c.code}</option>)}
              <option value="Mixed">Mixed</option>
            </Field>
            <Field label="Branch" as="select" value={editing.branch} onChange={set('branch')}>
              <option>Branch 2</option>
              <option>Branch 1</option>
            </Field>
            <Field label={editing.type === 'Lab' ? 'Lab' : 'Classroom'} value={editing.room} onChange={set('room')} />
            <Field label="Instructor" value={editing.instructor} onChange={set('instructor')} />
            <Field
              label={`Capacity (${editing.type === 'Lab' ? 'PCs' : 'seats'})`}
              type="number"
              min="1"
              value={editing.maxCapacity}
              onChange={set('maxCapacity')}
              hint={`Default for ${editing.type || 'Theory'}: ${capacityFor(editing.type)}`}
            />
            <Field label="Batch name (optional)" value={editing.name} onChange={set('name')} placeholder={autoName(editing)} />
          </div>

          {conflict?.kind === 'duplicate' && (
            <div className="rounded-md border border-rose-500/40 bg-rose-500/10 p-3 text-xs">
              <p className="flex items-start gap-2 font-semibold text-rose-400">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                This batch already exists: {conflict.batch.id} · {conflict.batch.type || 'Theory'} · {conflict.batch.days} · {conflict.batch.timing} ({conflict.batch.branch}).
              </p>
              {!editing.id && (
                <Btn variant="ghost" className="mt-2" onClick={() => setEditing({ ...conflict.batch })}>
                  <Pencil className="w-3.5 h-3.5" />Edit {conflict.batch.id} instead
                </Btn>
              )}
            </div>
          )}
          {conflict?.kind === 'room' && (
            <p className="flex items-start gap-2 text-xs font-semibold text-rose-400">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              {editing.room} is already used by {conflict.batch.id} ({conflict.batch.type || 'Theory'}) at this time on {conflict.batch.days}. Choose another room.
            </p>
          )}
          {!conflict && (
            <Muted className="block text-[11px]">
              Each hour can have one {editing.type || 'Theory'} batch on MWF and one on TTS per branch.
            </Muted>
          )}
        </Modal>
      )}

      {/* Capacity settings */}
      {settingsOpen && (
        <Modal
          title="Batch Capacity"
          onClose={() => setSettingsOpen(false)}
          footer={<><Btn variant="ghost" onClick={() => setSettingsOpen(false)}>Cancel</Btn><Btn onClick={saveSettings}>Save</Btn></>}
        >
          <div className="grid grid-cols-2 gap-4">
            <Field label="Theory batch (seats)" type="number" min="1" value={draftSettings.theoryCapacity} onChange={(e) => setDraftSettings({ ...draftSettings, theoryCapacity: e.target.value })} />
            <Field label="Lab batch (PCs)" type="number" min="1" value={draftSettings.labCapacity} onChange={(e) => setDraftSettings({ ...draftSettings, labCapacity: e.target.value })} />
          </div>
          <label className="flex items-center gap-2 text-xs cursor-pointer">
            <input type="checkbox" checked={applyExisting} onChange={(e) => setApplyExisting(e.target.checked)} className="accent-emerald-500" />
            <span style={{ color: colors.gray[200] }}>Also apply to all existing batches</span>
          </label>
          <Muted className="block text-[11px]">
            New batches start with these numbers. You can still change capacity on any single batch.
          </Muted>
        </Modal>
      )}

      {/* Assign students */}
      {assigningBatch && (
        <Modal title={`Assign students · ${assigningBatch.id} ${assigningBatch.name}`} onClose={() => setAssigning(null)} wide>
          <div className="flex items-center justify-between text-xs">
            <Muted>{assigningBatch.type || 'Theory'} · {assigningBatch.timing} · {assigningBatch.days} · {assigningBatch.room}</Muted>
            <Badge tone={isFull ? 'red' : 'green'}>{inBatch.length}/{assigningBatch.maxCapacity} {(assigningBatch.type || 'Theory') === 'Lab' ? 'PCs' : 'seats'}</Badge>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-2">In this batch</h4>
            {inBatch.length === 0 && <Muted className="text-xs">No students yet.</Muted>}
            <div className="space-y-1.5">
              {inBatch.map((s) => (
                <div key={s.id} style={{ backgroundColor: colors.primary[500] }} className="flex items-center justify-between rounded-md px-3 py-2 text-xs">
                  <span><strong>{s.name}</strong> <Muted>· {s.regNo} · {s.courseCode}</Muted></span>
                  <Btn variant="ghost" onClick={() => assignStudentToBatch(s.id, null, assignType)}><UserMinus className="w-3.5 h-3.5 text-rose-400" />Remove</Btn>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-2">Add students as {assignType}</h4>
            {isFull && <p className="text-xs font-semibold text-rose-400 mb-2">This batch is full. Increase its capacity or use another batch.</p>}
            <div style={{ backgroundColor: colors.primary[500] }} className="flex items-center rounded-md px-3 py-2 mb-2">
              <Search className="w-4 h-4 text-slate-400 mr-2" />
              <input value={assignSearch} onChange={(e) => setAssignSearch(e.target.value)} placeholder="Search by name or reg. no..." style={{ color: colors.gray[100] }} className="bg-transparent outline-none text-xs flex-1" />
            </div>
            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              {candidates.map((s) => {
                const mine = studentBatches(s);
                const current = assignType === 'Lab' ? mine.lab : mine.theory;
                const issue = findAssignIssue(s, assigningBatch);
                return (
                  <div key={s.id} className="flex items-center justify-between gap-3 rounded-md px-3 py-2 text-xs border border-white/5">
                    <span className="min-w-0">
                      <strong>{s.name}</strong> <Muted>· {s.regNo} · {s.courseCode}</Muted>
                      <Muted className="block text-[10px]">Theory: {slotLabel(mine.theory)} &nbsp;|&nbsp; Lab: {slotLabel(mine.lab)}</Muted>
                      {issue?.kind === 'clash' && (
                        <span className="block text-[10px] font-semibold text-rose-400">Clashes with their {assignType === 'Lab' ? 'Theory' : 'Lab'} batch {issue.batch.id} (same hour and days)</span>
                      )}
                      {issue?.kind === 'sameDays' && (
                        <span className="block text-[10px] font-semibold text-amber-400">Their {assignType === 'Lab' ? 'Theory' : 'Lab'} batch is also {issue.batch.days} — usually Theory and Lab are on opposite days</span>
                      )}
                    </span>
                    <Btn variant="success" disabled={isFull || issue?.kind === 'clash'} onClick={() => assignStudentToBatch(s.id, assigningBatch.id)}>
                      <UserPlus className="w-3.5 h-3.5" />{current ? 'Move here' : 'Assign'}
                    </Btn>
                  </div>
                );
              })}
              {candidates.length === 0 && <Muted className="text-xs">No matching students.</Muted>}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminBatches;
