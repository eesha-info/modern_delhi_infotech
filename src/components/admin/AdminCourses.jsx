import React, { useState } from 'react';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { Btn, Field, Modal, Badge, DataTable, Muted, PageHead } from './ui';

const CATEGORIES = ['Diploma', 'Accounting', 'Skill Certification', 'Programming', 'Design'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'All Levels', 'Job-Oriented'];

const emptyCourse = {
  code: '', name: '', hindiName: '', durationMonths: 6, fee: 5000,
  category: 'Diploma', level: 'Beginner', eligibility: '10th Pass', description: '', highlightsText: '',
};

const AdminCourses = () => {
  const { courses, students, batches, saveCourse, deleteCourse } = useData();
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const open = (course) => {
    setError('');
    setEditing(
      course
        ? { ...course, durationMonths: course.durationMonths || parseInt(course.duration, 10) || 0, highlightsText: (course.highlights || []).join('\n') }
        : { ...emptyCourse }
    );
  };

  const set = (k) => (e) => setEditing((p) => ({ ...p, [k]: e.target.value }));

  const handleSave = () => {
    if (!editing.code.trim() || !editing.name.trim()) return setError('Course code and name are required.');
    const code = editing.code.trim().toUpperCase();
    if (!editing.id && courses.some((c) => c.code === code)) return setError(`A course with code ${code} already exists.`);
    const { highlightsText, ...rest } = editing;
    saveCourse({ ...rest, highlights: highlightsText.split('\n').map((h) => h.trim()).filter(Boolean) });
    setEditing(null);
  };

  const handleDelete = (c) => {
    const enrolled = students.filter((s) => s.courseCode === c.code).length;
    if (enrolled) return window.alert(`${c.code} has ${enrolled} enrolled student(s). Move them to another course before deleting.`);
    if (window.confirm(`Delete course ${c.code} – ${c.name}?`)) deleteCourse(c.id);
  };

  return (
    <div className="space-y-6">
      <PageHead
        title="COURSE MANAGEMENT"
        subtitle="Add, edit and price the courses offered at both branches"
        action={<Btn onClick={() => open(null)}><PlusCircle className="w-4 h-4" />ADD COURSE</Btn>}
      />

      <DataTable columns={['Course', 'Category', 'Duration', 'Fee', 'Students', 'Batches', 'Actions']}>
        {courses.map((c) => (
          <tr key={c.id}>
            <td className="py-3 px-4">
              <div className="font-bold text-sm">{c.code}</div>
              <Muted className="text-[11px]">{c.name}</Muted>
            </td>
            <td className="py-3 px-4"><Badge tone="blue">{c.category}</Badge></td>
            <td className="py-3 px-4">{c.duration}</td>
            <td className="py-3 px-4 font-bold">₹{Number(c.fee || 0).toLocaleString('en-IN')}</td>
            <td className="py-3 px-4">{students.filter((s) => s.courseCode === c.code).length}</td>
            <td className="py-3 px-4">{batches.filter((b) => b.courseCode === c.code).length}</td>
            <td className="py-3 px-4 text-right whitespace-nowrap">
              <Btn variant="ghost" onClick={() => open(c)} className="mr-2"><Pencil className="w-3.5 h-3.5" />Edit</Btn>
              <Btn variant="ghost" onClick={() => handleDelete(c)} aria-label={`Delete ${c.code}`}><Trash2 className="w-3.5 h-3.5 text-rose-400" /></Btn>
            </td>
          </tr>
        ))}
      </DataTable>

      {editing && (
        <Modal
          title={editing.id ? `Edit ${editing.code}` : 'Add New Course'}
          onClose={() => setEditing(null)}
          wide
          footer={<><Btn variant="ghost" onClick={() => setEditing(null)}>Cancel</Btn><Btn onClick={handleSave}>Save Course</Btn></>}
        >
          {error && <p className="text-xs font-bold text-rose-400">{error}</p>}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field label="Code" value={editing.code} onChange={set('code')} placeholder="e.g. CCC" disabled={!!editing.id} />
            <Field label="Course name" className="sm:col-span-2" value={editing.name} onChange={set('name')} placeholder="Course on Computer Concepts" />
            <Field label="Hindi name" className="sm:col-span-3" value={editing.hindiName} onChange={set('hindiName')} />
            <Field label="Duration (months)" type="number" min="1" value={editing.durationMonths} onChange={set('durationMonths')} />
            <Field label="Fee (₹, incl. GST)" type="number" min="0" value={editing.fee} onChange={set('fee')} />
            <Field label="Eligibility" value={editing.eligibility} onChange={set('eligibility')} />
            <Field label="Category" as="select" value={editing.category} onChange={set('category')}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </Field>
            <Field label="Level" as="select" value={editing.level} onChange={set('level')}>
              {LEVELS.map((c) => <option key={c}>{c}</option>)}
            </Field>
            <Field label="Badge (optional)" value={editing.badge || ''} onChange={set('badge')} placeholder="Most Popular" />
            <Field label="Description" as="textarea" rows={2} className="sm:col-span-3" value={editing.description} onChange={set('description')} />
            <Field label="Key topics (one per line)" as="textarea" rows={4} className="sm:col-span-3" value={editing.highlightsText} onChange={set('highlightsText')} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminCourses;
