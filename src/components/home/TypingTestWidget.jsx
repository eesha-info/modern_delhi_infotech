import React, { useState, useEffect, useRef } from 'react';
import { Keyboard, RotateCcw, CheckCircle2, Award, Zap, Trophy, ArrowRight } from 'lucide-react';
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
    <section id="typing-lab" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="section-eyebrow">
            Bihar Beltron &amp; Govt. Exam Lab
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-3 tracking-tight">
            Online Typing Speed Practice Simulation
          </h2>
          <p className="text-slate-600 text-base mt-3 leading-relaxed">
            Practice touch typing in Hindi (KrutiDev / Mangal) and English just like our classroom lab students!
          </p>

          {/* Language Switch */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            <button
              onClick={() => { setSelectedLang('English'); handleReset(); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedLang === 'English'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              English Touch Typing (Target 35+ WPM)
            </button>
            <button
              onClick={() => { setSelectedLang('Hindi'); handleReset(); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedLang === 'Hindi'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              हिन्दी टाइपिंग (KrutiDev / Mangal)
            </button>
          </div>
        </div>

        {/* Typing Practice Box */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
          
          {/* Header Metric Bars */}
          <div className="grid grid-cols-3 gap-3 mb-5 text-center">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block">Current Speed</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-900 font-mono mt-0.5">
                {wpm} <span className="text-xs text-slate-500 font-sans font-normal">WPM</span>
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block">Accuracy</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono mt-0.5">
                {accuracy}%
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-semibold text-slate-500 block">Target Beltron</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-700 font-mono mt-0.5">
                {selectedLang === 'Hindi' ? '30 WPM' : '35 WPM'}
              </div>
            </div>
          </div>

          {/* Sample Text to Type */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-4 text-sm sm:text-base leading-relaxed tracking-wide select-none font-mono">
            {targetText.split('').map((char, index) => {
              let colorClass = "text-slate-400";
              if (index < inputVal.length) {
                colorClass = inputVal[index] === char ? "text-emerald-700 font-bold bg-emerald-50" : "text-rose-600 bg-rose-50 font-bold";
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
                : "Click here and start typing the passage above..."
            }
            className="w-full bg-white border-2 border-slate-200 rounded-2xl p-4 text-sm sm:text-base text-slate-900 focus:outline-none focus:border-blue-600 font-mono resize-none transition-colors"
          />

          {/* Actions & Result */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Test</span>
            </button>

            {isCompleted && (
              <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold animate-bounce">
                <Trophy className="w-4 h-4 text-amber-500" />
                <span>Test Completed! Great Effort!</span>
              </div>
            )}

            <button
              onClick={() => onOpenAdmission({ code: 'TYPING', name: 'Hindi + English Typing' })}
              className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <Keyboard className="w-4 h-4" />
              <span>Join Typing Special Batch</span>
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            * Dedicated computer typing lab with daily speed tests available at Branch 2 (Adarsh Nagar, Madhepura).
          </p>
        </div>

      </div>
    </section>
  );
};

export default TypingTestWidget;
