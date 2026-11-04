import React, { useEffect, useState } from 'react';
import { Clock, PlayCircle, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAppTheme } from '../../context/ThemeContext';
import { Panel, Btn, Badge, Muted, PageHead } from '../admin/ui';

const StudentTests = ({ student }) => {
  const { colors } = useAppTheme();
  const { tests, questions, testResults, submitTestAttempt } = useData();
  const [active, setActive] = useState(null); // { test, qs, answers, endsAt }
  const [lastResult, setLastResult] = useState(null);
  const [now, setNow] = useState(Date.now());

  const toId = (no) => (no?.startsWith('Batch-') ? `B${no.replace('Batch-', '')}` : null);
  const myBatchIds = [toId(student?.batchNo), toId(student?.labBatchNo)].filter(Boolean);
  const available = tests.filter(
    (t) => t.status === 'Published' && t.courseCode === student?.courseCode && (t.batchId === 'ALL' || myBatchIds.includes(t.batchId))
  );
  const myResults = testResults.filter((r) => r.regNo === student?.regNo);

  const finish = (state = active) => {
    if (!state) return;
    const result = submitTestAttempt(state.test.id, student, state.answers);
    setLastResult(result);
    setActive(null);
  };

  useEffect(() => {
    if (!active) return undefined;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [active]);

  useEffect(() => {
    if (active && now >= active.endsAt) finish(active); // active is current here: effect runs after render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now]);

  const start = (test) => {
    const qs = test.questionIds.map((id) => questions.find((q) => q.id === id)).filter(Boolean);
    setLastResult(null);
    setNow(Date.now());
    setActive({ test, qs, answers: {}, endsAt: Date.now() + test.durationMinutes * 60000 });
  };

  if (active) {
    const left = Math.max(0, Math.round((active.endsAt - now) / 1000));
    const answered = Object.keys(active.answers).length;
    return (
      <div className="space-y-5">
        <Panel className="p-4 flex flex-wrap items-center justify-between gap-3 sticky top-20 z-10">
          <div>
            <h2 style={{ color: colors.gray[100] }} className="font-bold">{active.test.title}</h2>
            <Muted className="text-xs">{answered} of {active.qs.length} answered</Muted>
          </div>
          <div className="flex items-center gap-3">
            <span style={{ color: left < 60 ? colors.redAccent[400] : colors.greenAccent[500] }} className="flex items-center gap-1.5 font-mono font-bold text-lg">
              <Clock className="w-4 h-4" />{Math.floor(left / 60)}:{String(left % 60).padStart(2, '0')}
            </span>
            <Btn variant="success" onClick={() => window.confirm(`Submit test? ${active.qs.length - answered} unanswered.`) && finish()}>Submit</Btn>
          </div>
        </Panel>

        {active.qs.map((q, i) => (
          <Panel key={q.id} className="p-5">
            <p style={{ color: colors.gray[100] }} className="font-semibold text-sm mb-3">Q{i + 1}. {q.question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map((o, j) => {
                const selected = active.answers[q.id] === j;
                return (
                  <button
                    key={j}
                    onClick={() => setActive((cur) => ({ ...cur, answers: { ...cur.answers, [q.id]: j } }))}
                    style={{
                      backgroundColor: selected ? colors.blueAccent[700] : colors.primary[500],
                      color: selected ? '#fff' : colors.gray[100],
                    }}
                    className="text-left rounded-md px-3 py-2.5 text-sm transition-colors"
                  >
                    <strong className="mr-2">{String.fromCharCode(65 + j)}.</strong>{o}
                  </button>
                );
              })}
            </div>
          </Panel>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHead title="ONLINE TESTS" subtitle="MCQ tests published by your instructor for your course" />

      {lastResult && (
        <Panel className="p-5 flex items-center gap-4">
          <Trophy className="w-8 h-8 text-amber-400 flex-shrink-0" />
          <div>
            <p style={{ color: colors.gray[100] }} className="font-bold">
              You scored {lastResult.correct}/{lastResult.total} ({lastResult.percent}%) — {lastResult.passed ? 'Passed' : 'Not passed'}
            </p>
            <Muted className="text-xs">Your result has been sent to Sonu Sir.</Muted>
          </div>
        </Panel>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {available.length === 0 && (
          <Panel className="p-8 md:col-span-2 text-center"><Muted className="text-sm">No tests are published for your course right now.</Muted></Panel>
        )}
        {available.map((t) => {
          const done = myResults.find((r) => r.testId === t.id);
          return (
            <Panel key={t.id} className="p-5 flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <Badge tone="blue">{t.courseCode}</Badge>
                  {done && <Badge tone={done.passed ? 'green' : 'red'}>{done.percent}% · {done.passed ? 'Pass' : 'Fail'}</Badge>}
                </div>
                <h3 style={{ color: colors.gray[100] }} className="font-bold mt-3">{t.title}</h3>
                <Muted className="text-xs block mt-1">{t.questionIds.length} questions · {t.durationMinutes} minutes · Pass mark {t.passMarks}%</Muted>
              </div>
              <Btn onClick={() => start(t)} disabled={t.questionIds.length === 0}>
                <PlayCircle className="w-4 h-4" />{done ? 'Retake test' : 'Start test'}
              </Btn>
            </Panel>
          );
        })}
      </div>

      {myResults.length > 0 && (
        <div>
          <h3 style={{ color: colors.gray[100] }} className="text-sm font-bold uppercase tracking-wider mb-3">My results</h3>
          <Panel className="divide-y divide-white/5">
            {myResults.map((r) => (
              <div key={r.id} className="flex items-center justify-between px-4 py-3 text-xs">
                <span style={{ color: colors.gray[100] }} className="font-semibold">{r.testTitle}</span>
                <span className="flex items-center gap-3">
                  <Muted>{r.submittedOn}</Muted>
                  <span style={{ color: r.passed ? colors.greenAccent[500] : colors.redAccent[400] }} className="font-bold flex items-center gap-1">
                    {r.passed ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}{r.correct}/{r.total} ({r.percent}%)
                  </span>
                </span>
              </div>
            ))}
          </Panel>
        </div>
      )}
    </div>
  );
};

export default StudentTests;
