import React, { useState, useEffect, useRef } from 'react';
import { Keyboard, RotateCcw, CheckCircle2, Award, Zap, Trophy } from 'lucide-react';
import { typingPracticeTexts } from '../../data/mdiData';

const TypingTestWidget = ({ onOpenAdmission }) => {
  const [selectedLang, setSelectedLang] = useState('English');
  const [inputVal, setInputVal] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isCompleted, setIsCompleted] = useState(false);
  const inputRef = useRef(null);

  const currentSample = typingPracticeTexts.find(t => t.language === selectedLang) || typingPracticeTexts[0];
  const targetText = currentSample.text;

  const handleReset = () => {
    setInputVal('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsCompleted(false);
    if (inputRef.current) inputRef.current.focus();
  };

  const handleTextChange = (e) => {
    const val = e.target.value;
    if (!startTime && val.length > 0) {
      setStartTime(Date.now());
    }

    setInputVal(val);

    // Calculate accuracy
    let correctChars = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === targetText[i]) correctChars++;
    }
    const acc = val.length > 0 ? Math.round((correctChars / val.length) * 100) : 100;
    setAccuracy(acc);

    // Calculate WPM (5 chars = 1 word)
    if (startTime) {
      const minutes = (Date.now() - startTime) / 60000;
      if (minutes > 0.05) {
        const words = correctChars / 5;
        setWpm(Math.round(words / minutes));
      }
    }

    if (val.length >= targetText.length) {
      setIsCompleted(true);
    }
  };

  return (
    <section id="typing-lab" className="py-20 bg-gradient-to-b from-slate-900 to-brand-navyDark text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
            Bihar Beltron & Govt. Exam Special
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-3 tracking-tight">
            Try Our Online Typing Speed Simulation
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Practice touch typing in Hindi (KrutiDev / Mangal) and English just like our classroom lab students!
          </p>

          {/* Language Switch */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={() => { setSelectedLang('English'); handleReset(); }}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedLang === 'English'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              English Touch Typing (35+ WPM)
            </button>
            <button
              onClick={() => { setSelectedLang('Hindi'); handleReset(); }}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedLang === 'Hindi'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              हिन्दी टाइपिंग (KrutiDev / Mangal)
            </button>
          </div>
        </div>

        {/* Typing Practice Box */}
        <div className="max-w-3xl mx-auto bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl backdrop-blur-md">
          
          {/* Header Metric Bars */}
          <div className="grid grid-cols-3 gap-3 mb-6 text-center">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-xs text-slate-400">Current Speed</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
                {wpm} <span className="text-xs text-slate-400">WPM</span>
              </div>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-xs text-slate-400">Accuracy</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                {accuracy}%
              </div>
            </div>
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
              <span className="text-xs text-slate-400">Target Beltron</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono">
                {selectedLang === 'Hindi' ? '30 WPM' : '35 WPM'}
              </div>
            </div>
          </div>

          {/* Sample Text to Type */}
          <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-700/80 mb-4 text-sm sm:text-base leading-relaxed tracking-wide select-none font-mono">
            {targetText.split('').map((char, index) => {
              let colorClass = "text-slate-400";
              if (index < inputVal.length) {
                colorClass = inputVal[index] === char ? "text-emerald-400 font-bold" : "text-rose-400 bg-rose-950/60 font-bold";
              }
              return (
                <span key={index} className={colorClass}>
                  {char}
                </span>
              );
            })}
          </div>

          {/* User Input Textarea */}
          <textarea
            ref={inputRef}
            value={inputVal}
            onChange={handleTextChange}
            rows={3}
            placeholder={
              selectedLang === 'Hindi'
                ? "यहाँ टाइप करना शुरू करें (Start typing here)..."
                : "Start typing the text above to test your speed..."
            }
            className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-4 text-sm sm:text-base text-white focus:outline-none focus:border-amber-400 font-mono resize-none transition-colors"
          />

          {/* Actions & Result */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-white/10 hover:bg-white/15 text-slate-300 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Test</span>
            </button>

            {isCompleted && (
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold animate-bounce">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span>Test Completed! Great Effort!</span>
              </div>
            )}

            <button
              onClick={() => onOpenAdmission({ code: 'TYPING', name: 'Hindi + English Typing' })}
              className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1"
            >
              <Keyboard className="w-4 h-4" />
              <span>Join Typing Special Batch</span>
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-slate-400">
            * Dedicated mechanical keyboard lab with daily speed analysis reports available at Branch 2 (Adarsh Nagar).
          </p>
        </div>

      </div>
    </section>
  );
};

export default TypingTestWidget;

