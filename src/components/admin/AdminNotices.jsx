import React, { useState } from 'react';
import { PlusCircle, Pencil, Trash2, Eye, EyeOff, Megaphone } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAppTheme } from '../../context/ThemeContext';
import { Panel, Btn, Field, Modal, Badge, Muted, PageHead } from './ui';

const CATEGORIES = ['Admissions', 'New Batch', 'Exam & Competition', 'Certificates', 'Holiday', 'Fees', 'General'];
const today = () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

// Manage the "Latest Updates" marquee shown under the website menu bar.
const AdminNotices = () => {
  const { colors } = useAppTheme();
  const { notices, addNotice, updateNotice, deleteNotice } = useData();
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');

  const open = (n) => {
    setError('');
    setEditing(n ? { ...n } : { title: '', category: 'Admissions', content: '', important: false, visible: true, date: today() });
  };

  const save = () => {
    if (!editing.title.trim()) return setError('Write a short headline for the update.');
    const data = { ...editing, title: editing.title.trim(), content: editing.content.trim() };
    if (editing.id) updateNotice(editing.id, data);
    else addNotice(data);
    setEditing(null);
  };

  const shown = notices.filter((n) => n.visible !== false).length;

  return (
    <div className="space-y-6">
      <PageHead
        title="LATEST UPDATES"
        subtitle="News shown in the scrolling bar under the website menu"
        action={<Btn onClick={() => open(null)}><PlusCircle className="w-4 h-4" />ADD UPDATE</Btn>}
      />

      <Panel className="p-4 flex items-center gap-3 text-xs">
        <Megaphone className="w-5 h-5" style={{ color: colors.greenAccent[500] }} />
        <span style={{ color: colors.gray[100] }}>
          <strong>{shown}</strong> of {notices.length} updates are showing on the website. Updates marked <Badge tone="red">New</Badge> appear first.
        </span>
      </Panel>

      <div className="space-y-3">
        {notices.length === 0 && <Panel className="p-8 text-center"><Muted className="text-sm">No updates yet. Add one to start the website marquee.</Muted></Panel>}
        {notices.map((n) => {
          const visible = n.visible !== false;
          return (
            <Panel key={n.id} className={`p-4 flex items-start gap-4 ${visible ? '' : 'opacity-60'}`}>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                  <Badge tone="blue">{n.category}</Badge>
                  {n.important && <Badge tone="red">New</Badge>}
                  {!visible && <Badge tone="gray">Hidden</Badge>}
                  <Muted className="text-[11px]">{n.date}</Muted>
                </div>
                <p style={{ color: colors.gray[100] }} className="font-semibold text-sm">{n.title}</p>
                {n.content && <Muted className="block text-xs mt-1 line-clamp-2">{n.content}</Muted>}
              </div>
              <div className="flex gap-1.5 flex-shrink-0">
                <Btn variant="ghost" onClick={() => updateNotice(n.id, { visible: !visible })} title={visible ? 'Hide from website' : 'Show on website'}>
                  {visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  {visible ? 'Showing' : 'Hidden'}
                </Btn>
                <Btn variant="ghost" onClick={() => open(n)} aria-label="Edit update"><Pencil className="w-3.5 h-3.5" /></Btn>
                <Btn variant="ghost" onClick={() => window.confirm(`Delete "${n.title}"?`) && deleteNotice(n.id)} aria-label="Delete update"><Trash2 className="w-3.5 h-3.5 text-rose-400" /></Btn>
              </div>
            </Panel>
          );
        })}
      </div>

      {editing && (
        <Modal
          title={editing.id ? 'Edit Update' : 'Add Update'}
          onClose={() => setEditing(null)}
          footer={<><Btn variant="ghost" onClick={() => setEditing(null)}>Cancel</Btn><Btn onClick={save}>Save Update</Btn></>}
        >
          {error && <p className="text-xs font-bold text-rose-400">{error}</p>}
          <Field label="Headline (shown in the marquee)" value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="New ADCA batch starts Monday at 7 AM" maxLength={110} />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category" as="select" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
              {[...new Set([editing.category, ...CATEGORIES])].map((c) => <option key={c}>{c}</option>)}
            </Field>
            <Field label="Date" value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} placeholder="05 Nov 2026" />
          </div>
          <Field label="Details (shown when a visitor clicks it)" as="textarea" rows={4} value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} />
          <div className="flex flex-wrap gap-5 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={!!editing.important} onChange={(e) => setEditing({ ...editing, important: e.target.checked })} className="accent-rose-500" />
              <span style={{ color: colors.gray[200] }}>Mark as <strong>New</strong> (shown first)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={editing.visible !== false} onChange={(e) => setEditing({ ...editing, visible: e.target.checked })} className="accent-emerald-500" />
              <span style={{ color: colors.gray[200] }}>Show on website</span>
            </label>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminNotices;
