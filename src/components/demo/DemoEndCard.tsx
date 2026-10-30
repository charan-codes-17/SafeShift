import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldHeadsetLogo } from '../pictograms';
import { RotateCcw, Compass, CheckCircle2, ShieldAlert, Users, Volume2 } from 'lucide-react';

export const DemoEndCard: React.FC = () => {
  const { demoState, startDemo, stopDemo } = useApp();

  if (!demoState.isRunning || demoState.stepIndex !== 10) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-40 bg-[#14213D]/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-up select-none"
      role="dialog"
      aria-label="Demo Completed Presentation Card"
    >
      <div className="bg-white rounded-[32px] p-6 sm:p-8 max-w-xl w-full border-2 border-teal-500/40 shadow-2xl text-center space-y-6 relative overflow-hidden">
        {/* Soft background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

        {/* Brand Header */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center shadow-soft">
            <ShieldHeadsetLogo className="w-10 h-10" />
          </div>
          <span className="text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-100/80 px-3 py-1 rounded-full">
            Hackathon Submission
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#14213D] tracking-tight">
            SafeShift Buddy
          </h2>
        </div>

        {/* The Hero Tagline (Prominent, High-Contrast) */}
        <div className="bg-gradient-to-br from-teal-50/90 via-white to-teal-50/50 p-6 rounded-[24px] border-2 border-[#0E7C86]/30 shadow-soft">
          <p className="text-lg sm:text-xl font-bold text-slate-700 leading-relaxed">
            &ldquo;Factories measure whether safety was told.{' '}
            <strong className="text-[#0E7C86] font-black block mt-2 text-xl sm:text-2xl underline decoration-teal-400 decoration-3 underline-offset-4">
              SafeShift Buddy measures whether it was understood.
            </strong>&rdquo;
          </p>
        </div>

        {/* 4 Core Pillars Recap */}
        <div className="grid grid-cols-2 gap-3 text-left">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-teal-700 font-extrabold text-xs">
              <Volume2 size={16} />
              <span>Voice-First & Audio</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">5 Indian languages, zero reading barrier.</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-teal-700 font-extrabold text-xs">
              <CheckCircle2 size={16} />
              <span>Confirmed Checks</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">Immediate re-briefing if misunderstood.</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-teal-700 font-extrabold text-xs">
              <ShieldAlert size={16} />
              <span>Anonymous Hazards</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">Safe voice reports with live status loop.</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-teal-700 font-extrabold text-xs">
              <Users size={16} />
              <span>Safety Intelligence</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1 font-medium">Live dashboard showing true gap insights.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <button
            onClick={startDemo}
            className="w-full sm:flex-1 min-h-[52px] bg-[#0E7C86] hover:bg-[#095E66] text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-glow-teal btn-press transition-all cursor-pointer"
            aria-label="Replay automated demo"
          >
            <RotateCcw size={18} />
            <span>Replay Demo (80s)</span>
          </button>

          <button
            onClick={stopDemo}
            className="w-full sm:flex-1 min-h-[52px] bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-sm rounded-2xl flex items-center justify-center gap-2 border border-slate-300 btn-press transition-all cursor-pointer"
            aria-label="Explore prototype manually"
          >
            <Compass size={18} />
            <span>Explore Prototype Manually</span>
          </button>
        </div>
      </div>
    </div>
  );
};
