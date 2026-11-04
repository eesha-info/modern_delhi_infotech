import React, { useState } from 'react';
import { Award, Eye, Printer, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAppTheme } from '../../context/ThemeContext';
import { gradeFor, GRADE_SCALE } from '../../data/academicData';
import CertificateCard from '../common/CertificateCard';
import { Btn, Field, Modal, Badge, DataTable, Muted, PageHead, StatTile } from './ui';

const AdminCertificates = () => {
  const { colors } = useAppTheme();
  const { students, invoices, testResults, certificates, issueCertificate, revokeCertificate } = useData();
  const [issuing, setIssuing] = useState(null);
  const [preview, setPreview] = useState(null);
  const [tab, setTab] = useState('eligible');

  const rows = students.map((s) => {
    const inv = invoices.find((i) => i.student?.regNo === s.regNo);
    const due = inv ? inv.balanceDues : Number(s.balanceDues || 0);
    const results = testResults.filter((r) => r.regNo === s.regNo);
    const avg = results.length ? Math.round(results.reduce((a, r) => a + r.percent, 0) / results.length) : null;
    const attendance = parseInt(s.attendance, 10) || 0;
    const cert = certificates.find((c) => c.regNo === s.regNo && c.courseCode === s.courseCode);
    const checks = { fees: due === 0, attendance: attendance >= 75, test: avg !== null && avg >= 40 };
    return { s, due, avg, attendance, results, cert, checks, eligible: Object.values(checks).every(Boolean) };
  });

  const pending = rows.filter((r) => !r.cert);

  const openIssue = (r) => {
    const percent = r.avg ?? r.s.progress ?? 60;
    const g = gradeFor(percent);
    setIssuing({ row: r, percent, grade: g.grade, remark: g.remark });
  };

  const handleIssue = () => {
    const cert = issueCertificate({ regNo: issuing.row.s.regNo, grade: issuing.grade, remark: issuing.remark, percent: issuing.percent });
    setIssuing(null);
    if (cert) setPreview(cert);
  };

  const Check = ({ ok, label }) => (
    <span style={{ color: ok ? colors.greenAccent[500] : colors.redAccent[400] }} className="inline-flex items-center gap-1 text-[11px] font-semibold mr-3 whitespace-nowrap">
      {ok ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}{label}
    </span>
  );

  return (
    <div className="space-y-6">
      <PageHead title="CERTIFICATION" subtitle="Check eligibility, issue certificates and print them for students" />

      <div className="grid grid-cols-3 gap-4">
        <StatTile label="Certificates issued" value={certificates.length} tone="green" />
        <StatTile label="Eligible now" value={pending.filter((r) => r.eligible).length} tone="blue" />
        <StatTile label="Not yet eligible" value={pending.filter((r) => !r.eligible).length} tone="red" />
      </div>

      <div className="flex gap-2">
        <Btn variant={tab === 'eligible' ? 'primary' : 'ghost'} onClick={() => setTab('eligible')}>Pending ({pending.length})</Btn>
        <Btn variant={tab === 'issued' ? 'primary' : 'ghost'} onClick={() => setTab('issued')}>Issued ({certificates.length})</Btn>
      </div>

      {tab === 'eligible' && (
        <>
          <Muted className="block text-xs">
            Eligibility rule: fees fully paid, attendance 75% or more, and an average online test score of at least 40%. You can still issue manually if needed.
          </Muted>
          <DataTable columns={['Student', 'Course', 'Checks', 'Avg. test', 'Actions']} empty={pending.length === 0 ? 'Every student already has a certificate.' : null}>
            {pending
              .sort((a, b) => Number(b.eligible) - Number(a.eligible))
              .map((r) => (
                <tr key={r.s.id}>
                  <td className="py-3 px-4">
                    <div className="font-bold">{r.s.name}</div>
                    <Muted className="text-[10px] font-mono">{r.s.regNo}</Muted>
                  </td>
                  <td className="py-3 px-4">{r.s.courseCode}</td>
                  <td className="py-3 px-4">
                    <Check ok={r.checks.fees} label={r.checks.fees ? 'Fees paid' : `Due ₹${r.due}`} />
                    <Check ok={r.checks.attendance} label={`Attendance ${r.attendance}%`} />
                    <Check ok={r.checks.test} label={r.avg === null ? 'No test taken' : r.checks.test ? 'Test passed' : `Test avg ${r.avg}%`} />
                  </td>
                  <td className="py-3 px-4">{r.avg === null ? <Muted>—</Muted> : `${r.avg}% (${r.results.length})`}</td>
                  <td className="py-3 px-4 text-right">
                    <Btn variant={r.eligible ? 'success' : 'ghost'} onClick={() => openIssue(r)}>
                      <Award className="w-3.5 h-3.5" />{r.eligible ? 'Issue' : 'Issue anyway'}
                    </Btn>
                  </td>
                </tr>
              ))}
          </DataTable>
        </>
      )}

      {tab === 'issued' && (
        <DataTable columns={['Certificate No.', 'Student', 'Course', 'Grade', 'Issued', 'Actions']} empty={certificates.length === 0 ? 'No certificates issued yet.' : null}>
          {certificates.map((c) => (
            <tr key={c.id}>
              <td className="py-3 px-4 font-mono text-[11px]" style={{ color: colors.greenAccent[500] }}>{c.certificateNo}</td>
              <td className="py-3 px-4"><div className="font-bold">{c.studentName}</div><Muted className="text-[10px]">{c.regNo}</Muted></td>
              <td className="py-3 px-4">{c.courseCode}</td>
              <td className="py-3 px-4"><Badge tone="green">{c.grade} · {c.percent}%</Badge></td>
              <td className="py-3 px-4"><Muted>{c.issueDate}</Muted></td>
              <td className="py-3 px-4 text-right whitespace-nowrap">
                <Btn variant="ghost" onClick={() => setPreview(c)} className="mr-2"><Eye className="w-3.5 h-3.5" />View</Btn>
                <Btn variant="ghost" onClick={() => window.confirm(`Revoke certificate ${c.certificateNo}?`) && revokeCertificate(c.id)} aria-label="Revoke"><Trash2 className="w-3.5 h-3.5 text-rose-400" /></Btn>
              </td>
            </tr>
          ))}
        </DataTable>
      )}

      {issuing && (
        <Modal
          title={`Issue certificate · ${issuing.row.s.name}`}
          onClose={() => setIssuing(null)}
          footer={<><Btn variant="ghost" onClick={() => setIssuing(null)}>Cancel</Btn><Btn variant="success" onClick={handleIssue}><Award className="w-3.5 h-3.5" />Issue Certificate</Btn></>}
        >
          {!issuing.row.eligible && (
            <p className="text-xs font-semibold text-amber-400">This student doesn't meet every eligibility check yet. Issue only if you've verified it manually.</p>
          )}
          <div className="grid grid-cols-3 gap-4">
            <Field
              label="Final %"
              type="number"
              min="0"
              max="100"
              value={issuing.percent}
              onChange={(e) => {
                const g = gradeFor(Number(e.target.value));
                setIssuing({ ...issuing, percent: e.target.value, grade: g.grade, remark: g.remark });
              }}
            />
            <Field label="Grade" as="select" value={issuing.grade} onChange={(e) => {
              const g = GRADE_SCALE.find((x) => x.grade === e.target.value);
              setIssuing({ ...issuing, grade: g.grade, remark: g.remark });
            }}>
              {GRADE_SCALE.map((g) => <option key={g.grade}>{g.grade}</option>)}
            </Field>
            <Field label="Remark" value={issuing.remark} onChange={(e) => setIssuing({ ...issuing, remark: e.target.value })} />
          </div>
          <Muted className="block text-[11px]">
            {issuing.row.avg !== null ? `Suggested from the average of ${issuing.row.results.length} online test(s).` : 'No online test results — suggested from course progress.'}
          </Muted>
        </Modal>
      )}

      {preview && (
        <Modal
          title={`Certificate ${preview.certificateNo}`}
          onClose={() => setPreview(null)}
          wide
          footer={<Btn onClick={() => window.print()}><Printer className="w-3.5 h-3.5" />Print</Btn>}
        >
          <CertificateCard cert={preview} />
        </Modal>
      )}
    </div>
  );
};

export default AdminCertificates;
