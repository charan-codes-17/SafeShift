import React from 'react';
import { useApp } from '../../context/AppContext';
import { Play, Pause, Square, SkipForward, Sparkles } from 'lucide-react';
import { DEMO_STEPS } from './demoStoryData';

export const DemoCaptionBar: React.FC = () => {
  const { demoState, pauseDemo, resumeDemo, stopDemo, nextDemoStep } = useApp();

  if (!demoState.isRunning) {
    return null;
  }

  const currentStepNum = Math.min(demoState.stepIndex + 1, DEMO_STEPS.length);
  const totalSteps = DEMO_STEPS.length;

  return (
    <div
      className="fixed bottom-4 inset-x-0 mx-auto w-[94%] max-w-4xl z-50 animate-fade-up select-none pointer-events-auto"
      role="region"
      aria-label="Interactive Demo Story Controller"
    >
      <div className="bg-[#14213D]/95 text-white backdrop-blur-md rounded-[24px] border-2 border-teal-500/70 shadow-2xl overflow-hidden">
        {/* Top Slim Progress Bar */}
        <div className="w-full h-1.5 bg-slate-800 relative overflow-hidden">
          <div
            className="h-full bg-linear-to-r from-teal-400 via-emerald-400 to-amber-400 transition-all duration-150 ease-linear rounded-full"
            style={{ width: `${Math.min(100, Math.max(0, demoState.progress))}%` }}
          />
        </div>

        {/* Content Bar */}
        <div className="p-3.5 sm:p-4.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          {/* Left: Step Badge + Caption Text */}
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 flex items-center gap-1.5 tabular-nums">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                Step {currentStepNum} of {totalSteps}
              </span>
              <span className="text-xs text-slate-400 font-semibold hidden md:inline">
                SafeShift Buddy Interactive Tour
              </span>
            </div>

            {/* Main Caption (High contrast, bold, quote styling) */}
            <h3 className="text-sm sm:text-base md:text-lg font-black text-white tracking-tight leading-snug">
              &ldquo;{demoState.caption}&rdquo;
            </h3>
          </div>

          {/* Right: Controller Buttons */}
          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            {/* Pause / Resume Button */}
            {demoState.isPaused ? (
              <button
                onClick={resumeDemo}
                className="min-h-[48px] px-3.5 sm:px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 transition-all btn-press shadow-sm"
                aria-label="Resume demo"
                title="Resume demo"
              >
                <Play size={16} fill="currentColor" />
                <span>Resume</span>
              </button>
            ) : (
              <button
                onClick={pauseDemo}
                className="min-h-[48px] px-3.5 sm:px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 border border-slate-700 transition-all btn-press"
                aria-label="Pause demo"
                title="Pause demo"
              >
                <Pause size={16} fill="currentColor" />
                <span>Pause</span>
              </button>
            )}

            {/* Next Step Button (Skipping) */}
            <button
              onClick={nextDemoStep}
              disabled={currentStepNum >= totalSteps}
              className={`min-h-[48px] px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 border transition-all btn-press ${
                currentStepNum >= totalSteps
                  ? 'opacity-40 cursor-not-allowed bg-slate-800/40 border-slate-800 text-slate-500'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border-slate-700'
              }`}
              aria-label="Skip to next step"
              title="Skip to next step"
            >
              <span className="hidden xs:inline">Next step</span>
              <SkipForward size={16} />
            </button>

            {/* Stop Button */}
            <button
              onClick={stopDemo}
              className="min-h-[48px] px-3 py-2 rounded-xl bg-slate-800 hover:bg-red-950/60 hover:text-red-300 text-slate-400 font-bold text-xs sm:text-sm flex items-center gap-1.5 border border-slate-700 hover:border-red-800/60 transition-all btn-press"
              aria-label="Stop demo"
              title="Stop demo & explore manually"
            >
              <Square size={14} fill="currentColor" />
              <span>Stop</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
