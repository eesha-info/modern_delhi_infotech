import React, { useState } from 'react';
import { PlusCircle, Pencil, Trash2, CheckCircle2, ListChecks, FileQuestion, BarChart3 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAppTheme } from '../../context/ThemeContext';
import { Panel, Btn, Field, Modal, Badge, DataTable, Muted, PageHead } from './ui';

const emptyQuestion = { courseCode: 'ADIT', topic: '', question: '', options: ['', '', '', ''], answer: 0 };
const emptyTest = { title: '', courseCode: 'ADIT', batchId: 'ALL', durationMinutes: 15, passMarks: 50, questionIds: [], status: 'Published' };

const AdminTests = () => {
  const { colors } = useAppTheme();
  const { courses, batches, questions, tests, testResults, saveQuestion, deleteQuestion, saveTest, deleteTest } = useData();
  const [tab, setTab] = useState('questions');
  const [courseFilter, setCourseFilter] = useState('All');
  const [editQ, setEditQ] = useState(null);
  const [editT, setEditT] = useState(null);
  const [resultsFor, setResultsFor] = useState(null);
  const [error, setError] = useState('');

  const visibleQuestions = questions.filter((q) => courseFilter === 'All' || q.courseCode === courseFilter);

  /* ---- question form ---- */
  const saveQ = () => {
    if (!editQ.question.trim()) return setError('Write the question text.');
    if (editQ.options.some((o) => !o.trim())) return setError('Fill all four options.');
    saveQuestion({ ...editQ, options: editQ.options.map((o) => o.trim()) });
    setEditQ(null);
  };

  /* ---- test form ---- */
  const poolForTest = editT ? questions.filter((q) => q.courseCode === editT.courseCode) : [];
  const toggleQ = (id) =>
    setEditT((t) => ({ ...t, questionIds: t.questionIds.includes(id) ? t.questionIds.filter((x) => x !== id) : [...t.questionIds, id] }));
  const saveT = () => {
    if (!editT.title.trim()) return setError('Give the test a title.');
    if (editT.questionIds.length === 0) return setError('Select at least one question.');
    saveTest(editT);
    setEditT(null);
  };

  const resultTest = resultsFor && tests.find((t) => t.id === resultsFor);
  const resultRows = resultTest ? testResults.filter((r) => r.testId === resultTest.id) : [];

  return (
    <div className="space-y-6">
      <PageHead
        title="ONLINE TESTS"
        subtitle="Manage the MCQ question bank and publish tests to batches"
        action={
          tab === 'questions' ? (
            <Btn onClick={() => { setError(''); setEditQ({ ...emptyQuestion, options: ['', '', '', ''], courseCode: courseFilter === 'All' ? 'ADIT' : courseFilter }); }}>
              <PlusCircle className="w-4 h-4" />ADD QUESTION
            </Btn>
          ) : (
            <Btn onClick={() => { setError(''); setEditT({ ...emptyTest, questionIds: [] }); }}><PlusCircle className="w-4 h-4" />CREATE TEST</Btn>
          )
        }
      />

      <div className="flex flex-wrap gap-2">
        <Btn variant={tab === 'questions' ? 'primary' : 'ghost'} onClick={() => setTab('questions')}><FileQuestion className="w-4 h-4" />Question bank ({questions.length})</Btn>
        <Btn variant={tab === 'tests' ? 'primary' : 'ghost'} onClick={() => setTab('tests')}><ListChecks className="w-4 h-4" />Tests ({tests.length})</Btn>
      </div>

      {tab === 'questions' && (
        <>
          <div className="flex flex-wrap gap-2">
            {['All', ...courses.map((c) => c.code)].map((c) => (
              <button
                key={c}
                onClick={() => setCourseFilter(c)}
                style={{
                  backgroundColor: courseFilter === c ? colors.greenAccent[600] : colors.primary[400],
                  color: courseFilter === c ? '#fff' : colors.gray[200],
                }}
                className="px-3 py-1 rounded-full text-[11px] font-bold"
              >
                {c} {c !== 'All' && `(${questions.filter((q) => q.courseCode === c).length})`}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {visibleQuestions.length === 0 && <Panel className="p-8 text-center"><Muted className="text-xs">No questions for this course yet.</Muted></Panel>}
            {visibleQuestions.map((q, idx) => (
              <Panel key={q.id} className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap gap-1.5 mb-1.5">
                      <Badge tone="blue">{q.courseCode}</Badge>
                      {q.topic && <Badge tone="gray">{q.topic}</Badge>}
                    </div>
                    <p style={{ color: colors.gray[100] }} className="font-semibold text-sm">Q{idx + 1}. {q.question}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 mt-2 text-xs">
                      {q.options.map((o, i) => (
                        <span key={i} style={{ color: i === q.answer ? colors.greenAccent[500] : colors.gray[300] }} className={`flex items-center gap-1.5 ${i === q.answer ? 'font-bold' : ''}`}>
                          {i === q.answer ? <CheckCircle2 className="w-3.5 h-3.5" /> : <span className="w-3.5 text-center">{String.fromCharCode(65 + i)}</span>}
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <Btn variant="ghost" onClick={() => { setError(''); setEditQ({ ...q, options: [...q.options] }); }} aria-label="Edit question"><Pencil className="w-3.5 h-3.5" /></Btn>
                    <Btn variant="ghost" onClick={() => window.confirm('Delete this question? It will also be removed from any tests.') && deleteQuestion(q.id)} aria-label="Delete question"><Trash2 className="w-3.5 h-3.5 text-rose-400" /></Btn>
                  </div>
                </div>
              </Panel>
            ))}
          </div>
        </>
      )}

      {tab === 'tests' && (
        <DataTable columns={['Test', 'Course / Batch', 'Questions', 'Duration', 'Attempts', 'Status', 'Actions']} empty={tests.length === 0 ? 'No tests created yet.' : null}>
          {tests.map((t) => {
            const attempts = testResults.filter((r) => r.testId === t.id);
            return (
              <tr key={t.id}>
                <td className="py-3 px-4">
                  <div className="font-bold">{t.title}</div>
                  <Muted className="text-[10px]">Created {t.createdOn} · Pass {t.passMarks}%</Muted>
                </td>
                <td className="py-3 px-4">{t.courseCode} <Muted>· {t.batchId === 'ALL' ? 'All batches' : t.batchId}</Muted></td>
                <td className="py-3 px-4">{t.questionIds.length}</td>
                <td className="py-3 px-4">{t.durationMinutes} min</td>
                <td className="py-3 px-4">{attempts.length}</td>
                <td className="py-3 px-4">
                  <button onClick={() => saveTest({ ...t, status: t.status === 'Published' ? 'Draft' : 'Published' })} title="Toggle status">
                    <Badge tone={t.status === 'Published' ? 'green' : 'gray'}>{t.status}</Badge>
                  </button>
                </td>
                <td className="py-3 px-4 text-right whitespace-nowrap">
                  <Btn variant="ghost" onClick={() => setResultsFor(t.id)} className="mr-2"><BarChart3 className="w-3.5 h-3.5" />Results</Btn>
                  <Btn variant="ghost" onClick={() => { setError(''); setEditT({ ...t, questionIds: [...t.questionIds] }); }} className="mr-2" aria-label="Edit test"><Pencil className="w-3.5 h-3.5" /></Btn>
                  <Btn variant="ghost" onClick={() => window.confirm(`Delete test "${t.title}"?`) && deleteTest(t.id)} aria-label="Delete test"><Trash2 className="w-3.5 h-3.5 text-rose-400" /></Btn>
                </td>
              </tr>
            );
          })}
        </DataTable>
      )}

      {/* Question editor */}
      {editQ && (
        <Modal
          title={editQ.id ? 'Edit Question' : 'Add MCQ Question'}
          onClose={() => setEditQ(null)}
          footer={<><Btn variant="ghost" onClick={() => setEditQ(null)}>Cancel</Btn><Btn onClick={saveQ}>Save Question</Btn></>}
        >
          {error && <p className="text-xs font-bold text-rose-400">{error}</p>}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Course" as="select" value={editQ.courseCode} onChange={(e) => setEditQ({ ...editQ, courseCode: e.target.value })}>
              {courses.map((c) => <option key={c.code}>{c.code}</option>)}
            </Field>
            <Field label="Topic" value={editQ.topic} onChange={(e) => setEditQ({ ...editQ, topic: e.target.value })} placeholder="MS Excel" />
          </div>
          <Field label="Question" as="textarea" rows={2} value={editQ.question} onChange={(e) => setEditQ({ ...editQ, question: e.target.value })} />
          <div className="space-y-2">
            <Muted className="block text-[11px] font-bold uppercase tracking-wider">Options — select the correct answer</Muted>
            {editQ.options.map((o, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="correct"
                  checked={editQ.answer === i}
                  onChange={() => setEditQ({ ...editQ, answer: i })}
                  className="accent-emerald-500 w-4 h-4"
                  aria-label={`Mark option ${String.fromCharCode(65 + i)} correct`}
                />
                <Field
                  className="flex-1"
                  value={o}
                  placeholder={`Option ${String.fromCharCode(65 + i)}`}
                  onChange={(e) => setEditQ({ ...editQ, options: editQ.options.map((x, j) => (j === i ? e.target.value : x)) })}
                />
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* Test editor */}
      {editT && (
        <Modal
          title={editT.id ? 'Edit Test' : 'Create Online Test'}
          onClose={() => setEditT(null)}
          wide
          footer={<><Btn variant="ghost" onClick={() => setEditT(null)}>Cancel</Btn><Btn onClick={saveT}>Save Test</Btn></>}
        >
          {error && <p className="text-xs font-bold text-rose-400">{error}</p>}
          <Field label="Test title" value={editT.title} onChange={(e) => setEditT({ ...editT, title: e.target.value })} placeholder="DCA Weekly Test – Windows" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Field label="Course" as="select" value={editT.courseCode} onChange={(e) => setEditT({ ...editT, courseCode: e.target.value, questionIds: [] })}>
              {courses.map((c) => <option key={c.code}>{c.code}</option>)}
            </Field>
            <Field label="Batch" as="select" value={editT.batchId} onChange={(e) => setEditT({ ...editT, batchId: e.target.value })}>
              <option value="ALL">All batches</option>
              {batches.map((b) => <option key={b.id} value={b.id}>{b.id} · {b.days}</option>)}
            </Field>
            <Field label="Duration (min)" type="number" min="1" value={editT.durationMinutes} onChange={(e) => setEditT({ ...editT, durationMinutes: e.target.value })} />
            <Field label="Pass mark (%)" type="number" min="0" max="100" value={editT.passMarks} onChange={(e) => setEditT({ ...editT, passMarks: e.target.value })} />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <Muted className="text-[11px] font-bold uppercase tracking-wider">Select questions ({editT.questionIds.length} of {poolForTest.length})</Muted>
              {poolForTest.length > 0 && (
                <button className="text-[11px] font-bold" style={{ color: colors.greenAccent[500] }} onClick={() => setEditT({ ...editT, questionIds: poolForTest.map((q) => q.id) })}>
                  Select all
                </button>
              )}
            </div>
            {poolForTest.length === 0 && <Muted className="text-xs">No {editT.courseCode} questions in the bank. Add some under Question bank first.</Muted>}
            <div className="space-y-1.5 max-h-64 overflow-y-auto">
              {poolForTest.map((q) => (
                <label key={q.id} style={{ backgroundColor: colors.primary[500] }} className="flex items-start gap-2 rounded-md px-3 py-2 text-xs cursor-pointer">
                  <input type="checkbox" checked={editT.questionIds.includes(q.id)} onChange={() => toggleQ(q.id)} className="mt-0.5 accent-emerald-500" />
                  <span>{q.question} {q.topic && <Muted>· {q.topic}</Muted>}</span>
                </label>
              ))}
            </div>
          </div>
        </Modal>
      )}

      {/* Results */}
      {resultTest && (
        <Modal title={`Results · ${resultTest.title}`} onClose={() => setResultsFor(null)} wide>
          {resultRows.length === 0 ? (
            <Muted className="text-xs">No student has attempted this test yet. Students take it from the "Online Tests" tab in their portal.</Muted>
          ) : (
            <table className="w-full text-xs">
              <thead>
                <tr style={{ color: colors.gray[300] }} className="text-left text-[11px] uppercase">
                  <th className="py-2">Student</th><th>Score</th><th>Percent</th><th>Result</th><th>Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {resultRows.map((r) => (
                  <tr key={r.id}>
                    <td className="py-2"><strong>{r.studentName}</strong> <Muted>· {r.regNo}</Muted></td>
                    <td>{r.correct}/{r.total}</td>
                    <td>{r.percent}%</td>
                    <td><Badge tone={r.passed ? 'green' : 'red'}>{r.passed ? 'Pass' : 'Fail'}</Badge></td>
                    <td><Muted>{r.submittedOn}</Muted></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Modal>
      )}
    </div>
  );
};

export default AdminTests;
