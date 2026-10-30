import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MachineUnsafe, MachineLockout, Padlock } from '../pictograms';
import { CheckCircle2, AlertTriangle, PhoneCall, RotateCcw, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import { AudioPlayer } from '../common/AudioPlayer';

export const UnderstandingQuiz: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const { t, getAudioPlayingLabel, recordUnderstandingResult, quizOverride } = useApp();
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);
  const [answeredState, setAnsweredState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [thumbsState, setThumbsState] = useState<'up' | 'down' | null>(null);
  const [supervisorToast, setSupervisorToast] = useState(false);

  const effectiveAnsweredState = quizOverride ? quizOverride.answeredState : answeredState;
  const effectiveSelectedOption = quizOverride ? quizOverride.selectedOption : selectedOption;

  const handleSelectOption = (option: 'A' | 'B') => {
    setSelectedOption(option);
    if (option === 'B') {
      // Correct answer! Machine turned off and padlocked
      setAnsweredState('correct');
      recordUnderstandingResult(true, 'loto');
      if (onComplete) onComplete();
    } else {
      // Wrong answer: Hand reaching into running machine
      setAnsweredState('wrong');
      recordUnderstandingResult(false, 'loto');
    }
  };

  const handleThumbSelect = (thumb: 'up' | 'down') => {
    setThumbsState(thumb);
    recordUnderstandingResult(thumb === 'up', 'loto');
  };

  const handleResetQuiz = () => {
    setSelectedOption(null);
    setAnsweredState('idle');
  };

  return (
    <div className="bg-white rounded-[24px] p-5 shadow-soft border border-slate-100 space-y-4">
      {/* Title Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-teal-100 text-[#0E7C86] flex items-center justify-center">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#14213D] leading-relaxed">
              {t('got_it_q')}
            </h3>
            <span className="text-xs font-bold text-slate-500">
              Which one is the safe way?
            </span>
          </div>
        </div>

        <button
          onClick={handleResetQuiz}
          className="text-slate-400 hover:text-slate-600 min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl hover:bg-slate-100 transition-colors"
          title="Try quiz again"
          aria-label="Reset quiz question"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      {/* State: Idle - Options A & B */}
      {effectiveAnsweredState === 'idle' && (
        <div className="space-y-3.5">
          <p className="text-sm font-extrabold text-slate-800">
            Tap the safe action below:
          </p>

          <div className="grid grid-cols-1 gap-3.5">
            {/* Option A: Hand near running machine (UNSAFE) */}
            <button
              data-demo-target="quiz-option-a"
              onClick={() => handleSelectOption('A')}
              className="w-full text-left p-3.5 rounded-2xl border-2 border-red-200 bg-red-50/40 hover:bg-red-50/80 transition-all btn-press shadow-xs group cursor-pointer"
              aria-label="Option A: Clean while machine is running"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-red-200 text-red-900">
                  Option A
                </span>
                <span className="text-xs font-black text-red-600 flex items-center gap-1">
                  <AlertTriangle size={14} />
                  Risk • Unsafe
                </span>
              </div>
              {/* Pictogram size >= 120px (rendered at h-36 = 144px) */}
              <div className="rounded-xl overflow-hidden shadow-xs border border-red-200/80 bg-white">
                <MachineUnsafe className="w-full h-36" />
              </div>
            </button>

            {/* Option B: Switched off with padlock (SAFE - CORRECT) */}
            <button
              data-demo-target="quiz-option-b"
              onClick={() => handleSelectOption('B')}
              className="w-full text-left p-3.5 rounded-2xl border-2 border-emerald-400 bg-emerald-50/50 hover:bg-emerald-50/90 transition-all btn-press shadow-xs group cursor-pointer ring-2 ring-emerald-500/20"
              aria-label="Option B: Turn off and lock out with padlock"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-emerald-200 text-emerald-950">
                  Option B
                </span>
                <span className="text-xs font-black text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 size={14} />
                  Safe Lockout
                </span>
              </div>
              {/* Pictogram size >= 120px (rendered at h-36 = 144px) */}
              <div className="rounded-xl overflow-hidden shadow-xs border border-emerald-300 bg-white">
                <MachineLockout className="w-full h-36" />
              </div>
            </button>
          </div>
        </div>
      )}

      {/* State: Correct (Option B tapped) */}
      {effectiveAnsweredState === 'correct' && (
        <div className="p-5 bg-emerald-50/90 border-2 border-emerald-500 rounded-[22px] text-center space-y-3.5 animate-fade-up">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30">
            <CheckCircle2 size={40} strokeWidth={2.5} />
          </div>

          <div>
            <h4 className="text-2xl font-black text-emerald-950 tracking-tight leading-relaxed">
              {t('got_it_yes')}
            </h4>
            <p className="text-sm font-bold text-emerald-800 mt-1">
              Never touch moving gears. Always padlock before cleaning!
            </p>
          </div>

          {/* Celebratory Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-200/80 text-emerald-950 font-black px-4 py-1.5 rounded-full text-xs">
            <Sparkles size={15} className="text-amber-600" />
            <span>Understanding logged on shift board (+1)</span>
          </div>

          <div className="pt-1">
            <button
              onClick={handleResetQuiz}
              className="min-h-[48px] px-4 text-xs font-extrabold text-emerald-800 underline underline-offset-2 hover:text-emerald-950 inline-flex items-center"
            >
              Take quiz again
            </button>
          </div>
        </div>
      )}

      {/* State: Wrong (Option A tapped) */}
      {effectiveAnsweredState === 'wrong' && (
        <div className="p-4 bg-amber-50 border-2 border-amber-500 rounded-2xl space-y-3 animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <AlertTriangle size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="text-lg font-black text-amber-950">
                {t('hear_again')}
              </h4>
              <p className="text-xs text-amber-900 font-semibold mt-0.5">
                Moving machine can crush hands in 0.2 seconds.
              </p>
            </div>
          </div>

          {/* Simpler Re-explanation Card with Audio */}
          <div className="bg-white p-3 rounded-xl border border-amber-300 shadow-xs space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-red-600">
              <span className="w-2 h-2 rounded-full bg-red-600" />
              <span>KEY RULE: Power switch OFF + Padlock locked!</span>
            </div>
            <p className="text-sm font-black text-[#14213D]">
              {t('rule')}
            </p>
            <AudioPlayer label={getAudioPlayingLabel()} durationSeconds={4} autoPlay={true} />
          </div>

          {/* Call Supervisor Button */}
          <div className="flex gap-2 pt-1">
            <button
              data-demo-target="call-supervisor-btn"
              onClick={() => {
                setSupervisorToast(true);
                setTimeout(() => setSupervisorToast(false), 3500);
              }}
              className="flex-1 min-h-[48px] bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm active:scale-98 focus-visible:ring-2 focus-visible:ring-amber-500"
              aria-label="Call supervisor for immediate assistance"
            >
              <PhoneCall size={18} />
              <span>Call supervisor</span>
            </button>
            <button
              onClick={handleResetQuiz}
              className="px-4 min-h-[48px] bg-white border border-amber-300 text-amber-900 font-bold text-sm rounded-xl hover:bg-amber-100/50"
              aria-label="Retry quiz"
            >
              Retry
            </button>
          </div>

          {/* Supervisor Toast */}
          {supervisorToast && (
            <div className="p-3 bg-slate-900 text-white rounded-xl flex items-center justify-between text-xs font-bold animate-fadeIn shadow-lg border border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <PhoneCall size={15} className="text-emerald-400 animate-pulse" />
                <span>Calling supervisor... (demo)</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">Connecting Bay 3</span>
            </div>
          )}
        </div>
      )}

      {/* Alternative Quick Thumbs Check */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="font-semibold">Quick feedback:</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleThumbSelect('up')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold transition-all ${
              thumbsState === 'up'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-emerald-50'
            }`}
            aria-label="I understood"
          >
            <ThumbsUp size={14} />
            <span>Understood</span>
          </button>
          <button
            onClick={() => handleThumbSelect('down')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-bold transition-all ${
              thumbsState === 'down'
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-amber-50'
            }`}
            aria-label="I need more explanation"
          >
            <ThumbsDown size={14} />
            <span>Need help</span>
          </button>
        </div>
      </div>
    </div>
  );
};
