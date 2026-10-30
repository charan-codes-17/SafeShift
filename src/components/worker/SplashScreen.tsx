import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldHeadsetLogo, WorkerAvatar } from '../pictograms';
import { ArrowRight, Volume2 } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { setWorkerScreen, getAudioPlayingLabel } = useApp();

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-[#F6F4EF] text-[#14213D] select-none">
      {/* Top Brand Pill */}
      <div className="flex items-center justify-between pt-1 animate-fade-up">
        <div className="flex items-center gap-2 bg-white/90 border border-teal-100/90 px-3.5 py-1.5 rounded-full shadow-soft">
          <ShieldHeadsetLogo className="w-6 h-6" />
          <span className="font-extrabold text-sm text-[#0E7C86] tracking-tight">SafeShift Buddy</span>
        </div>
        <span className="text-xs font-bold text-slate-500 bg-slate-200/80 px-3 py-1 rounded-full">
          Unit 2 • Night Shift
        </span>
      </div>

      {/* Hero Content */}
      <div className="flex flex-col items-center text-center my-auto py-4 animate-fade-up delay-75">
        {/* Friendly Worker Illustration */}
        <div className="relative mb-5">
          <WorkerAvatar className="w-44 h-44 drop-shadow-md" />
          <div className="absolute -bottom-2 right-2 bg-white border border-teal-200 px-3 py-1 rounded-full shadow-soft flex items-center gap-1.5 text-xs font-bold text-[#0E7C86]">
            <Volume2 size={14} className="text-teal-600 animate-pulse" />
            <span>Voice Assistant</span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#14213D] tracking-tight leading-tight mb-3">
          SafeShift Buddy
        </h1>

        {/* Tagline Box - 24px radius, generous padding */}
        <div className="bg-white border border-teal-100/90 rounded-[24px] p-5 shadow-soft mb-4 max-w-xs text-center">
          <p className="text-base text-slate-700 leading-snug font-medium">
            &ldquo;Factories measure whether safety was told.{' '}
            <strong className="text-[#0E7C86] font-extrabold block mt-1.5 text-base">
              SafeShift Buddy measures whether it was understood.
            </strong>&rdquo;
          </p>
        </div>

        {/* Multi-language welcome audio preview */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-teal-50/90 border border-teal-200/90 px-3.5 py-1.5 rounded-full shadow-2xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{getAudioPlayingLabel()}</span>
        </div>
      </div>

      {/* Bottom Action Button - ONE clear primary hero action */}
      <div className="pt-2 pb-3 animate-fade-up delay-150">
        <button
          data-demo-target="start-btn"
          onClick={() => setWorkerScreen('language')}
          className="w-full h-16 min-h-[56px] bg-[#0E7C86] hover:bg-[#095E66] btn-press transition-all rounded-[24px] text-white font-extrabold text-xl flex items-center justify-center gap-3 shadow-glow-teal focus-visible:ring-3 focus-visible:ring-teal-400"
          aria-label="Start SafeShift Buddy setup"
        >
          <span>Start / शुरू करें</span>
          <ArrowRight size={24} strokeWidth={2.5} />
        </button>
        <p className="text-center text-xs text-slate-500 mt-2.5 font-medium">
          Zero reading required • 100% voice & icons
        </p>
      </div>
    </div>
  );
};
