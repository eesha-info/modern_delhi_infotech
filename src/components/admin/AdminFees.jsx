import React, { useMemo, useState } from 'react';
import { IndianRupee, Printer, Search } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAppTheme } from '../../context/ThemeContext';
import { Btn, Field, Modal, Badge, DataTable, Muted, PageHead, StatTile } from './ui';

const inr = (n) => `₹${Number(n || 0).toLocaleString('en-IN')}`;

const AdminFees = () => {
  const { colors } = useAppTheme();
  const { students, invoices, recordPayment, setActiveInvoice } = useData();
  const [filter, setFilter] = useState('Due');
  const [search, setSearch] = useState('');
  const [collecting, setCollecting] = useState(null);
  const [form, setForm] = useState({ amount: '', mode: 'Cash', ref: '' });
  const [error, setError] = useState('');

  const rows = useMemo(
    () =>
      students
        .map((s) => {
          const inv = invoices.find((i) => i.student?.regNo === s.regNo);
          const total = inv?.totalCourseFee ?? Number(s.totalFee || 0);
          const paid = inv?.totalPaid ?? Number(s.paidFee || 0);
          return { student: s, inv, total, paid, due: Math.max(0, total - paid) };
        })
        .filter((r) => (filter === 'All' ? true : filter === 'Due' ? r.due > 0 : r.due === 0))
        .filter(
          (r) =>
            r.student.name.toLowerCase().includes(search.toLowerCase()) ||
            r.student.regNo.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => b.due - a.due),
    [students, invoices, filter, search]
  );

  const totals = students.reduce(
    (acc, s) => {
      const inv = invoices.find((i) => i.student?.regNo === s.regNo);
      const total = inv?.totalCourseFee ?? Number(s.totalFee || 0);
      const paid = inv?.totalPaid ?? Number(s.paidFee || 0);
      acc.total += total;
      acc.paid += paid;
      acc.due += Math.max(0, total - paid);
      if (total - paid > 0) acc.dueCount += 1;
      return acc;
    },
    { total: 0, paid: 0, due: 0, dueCount: 0 }
  );

  const recent = invoices
    .flatMap((inv) => (inv.installments || []).map((p) => ({ ...p, student: inv.student, invoiceNo: inv.invoiceNo })))
    .slice(-8)
    .reverse();

  const openCollect = (row) => {
    setError('');
    setForm({ amount: row.due, mode: 'Cash', ref: '' });
    setCollecting(row);
  };

  const handleCollect = () => {
    const amt = Number(form.amount);
    if (!amt || amt <= 0) return setError('Enter an amount greater than zero.');
    if (amt > collecting.due) return setError(`Amount cannot exceed the balance due (${inr(collecting.due)}).`);
    recordPayment(collecting.student.regNo, form);
    setCollecting(null);
  };

  return (
    <div className="space-y-6">
      <PageHead title="FEE MANAGEMENT" subtitle="Collect installments, track dues and print receipts" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatTile label="Total fees billed" value={inr(totals.total)} />
        <StatTile label="Collected" value={inr(totals.paid)} tone="green" />
        <StatTile label="Outstanding dues" value={inr(totals.due)} tone="red" />
        <StatTile label="Students with dues" value={totals.dueCount} tone="blue" />
      </div>

      <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
        <div className="flex gap-2">
          {['Due', 'Paid', 'All'].map((f) => (
            <Btn key={f} variant={filter === f ? 'primary' : 'ghost'} onClick={() => setFilter(f)}>
              {f === 'Due' ? 'Pending dues' : f === 'Paid' ? 'Fully paid' : 'All students'}
            </Btn>
          ))}
        </div>
        <div style={{ backgroundColor: colors.primary[400] }} className="flex items-center rounded-md px-3 py-2 md:w-72">
          <Search className="w-4 h-4 text-slate-400 mr-2" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student or reg. no..."
            style={{ color: colors.gray[100] }}
            className="bg-transparent outline-none text-xs flex-1"
          />
        </div>
      </div>

      <DataTable columns={['Student', 'Course', 'Total fee', 'Paid', 'Balance', 'Actions']} empty={rows.length === 0 ? 'No students in this view.' : null}>
        {rows.map((r) => (
          <tr key={r.student.id}>
            <td className="py-3 px-4">
              <div className="font-bold">{r.student.name}</div>
              <Muted className="text-[10px] font-mono">{r.student.regNo}</Muted>
            </td>
            <td className="py-3 px-4">{r.student.courseCode}</td>
            <td className="py-3 px-4">{inr(r.total)}</td>
            <td className="py-3 px-4" style={{ color: colors.greenAccent[500] }}>{inr(r.paid)}</td>
            <td className="py-3 px-4">
              {r.due > 0 ? <strong style={{ color: colors.redAccent[400] }}>{inr(r.due)}</strong> : <Badge tone="green">Fully paid</Badge>}
            </td>
            <td className="py-3 px-4 text-right whitespace-nowrap">
              {r.due > 0 && (
                <Btn variant="success" onClick={() => openCollect(r)} className="mr-2"><IndianRupee className="w-3.5 h-3.5" />Collect</Btn>
              )}
              {r.inv && (
                <Btn variant="ghost" onClick={() => setActiveInvoice(r.inv)}><Printer className="w-3.5 h-3.5" />Receipt</Btn>
              )}
            </td>
          </tr>
        ))}
      </DataTable>

      <div>
        <h3 style={{ color: colors.gray[100] }} className="text-sm font-bold uppercase tracking-wider mb-3">Recent payments</h3>
        <DataTable columns={['Date', 'Student', 'Installment', 'Mode', 'Amount']} empty={recent.length === 0 ? 'No payments recorded yet.' : null}>
          {recent.map((p, i) => (
            <tr key={`${p.invoiceNo}-${p.no}-${i}`}>
              <td className="py-3 px-4"><Muted>{p.date}</Muted></td>
              <td className="py-3 px-4 font-bold">{p.student?.name}</td>
              <td className="py-3 px-4">{p.title}</td>
              <td className="py-3 px-4">{p.mode}</td>
              <td className="py-3 px-4 font-bold" style={{ color: colors.greenAccent[500] }}>{inr(p.amount)}</td>
            </tr>
          ))}
        </DataTable>
      </div>

      {collecting && (
        <Modal
          title={`Collect fee · ${collecting.student.name}`}
          onClose={() => setCollecting(null)}
          footer={<><Btn variant="ghost" onClick={() => setCollecting(null)}>Cancel</Btn><Btn variant="success" onClick={handleCollect}>Record Payment</Btn></>}
        >
          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div><Muted className="block">Total</Muted><strong>{inr(collecting.total)}</strong></div>
            <div><Muted className="block">Paid</Muted><strong style={{ color: colors.greenAccent[500] }}>{inr(collecting.paid)}</strong></div>
            <div><Muted className="block">Balance</Muted><strong style={{ color: colors.redAccent[400] }}>{inr(collecting.due)}</strong></div>
          </div>
          {error && <p className="text-xs font-bold text-rose-400">{error}</p>}
          <Field label="Amount (₹)" type="number" min="1" max={collecting.due} value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
          <Field label="Payment mode" as="select" value={form.mode} onChange={(e) => setForm({ ...form, mode: e.target.value })}>
            {['Cash', 'UPI', 'Bank Transfer', 'Cheque'].map((m) => <option key={m}>{m}</option>)}
          </Field>
          <Field label="Reference / note" value={form.ref} onChange={(e) => setForm({ ...form, ref: e.target.value })} placeholder="UPI txn id, cheque no..." />
        </Modal>
      )}
    </div>
  );
};

export default AdminFees;
