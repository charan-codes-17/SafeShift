import React from 'react';
import { Wifi, BatteryMedium, Signal } from 'lucide-react';

interface PhoneFrameProps {
  children: React.ReactNode;
  headerTitle?: string;
  className?: string;
}

export const PhoneFrame: React.FC<PhoneFrameProps> = ({ children, headerTitle, className = '' }) => {
  return (
    <div className="flex justify-center items-center py-2 sm:py-6 w-full">
      {/* Outer Phone Shell */}
      <div
        className={`w-full max-w-[392px] h-[846px] sm:rounded-[48px] bg-[#0F172A] p-3 relative flex flex-col border-[5px] border-[#334155]/80 transition-all ${className}`}
        style={{
          boxShadow: '0 30px 70px -15px rgba(20, 33, 61, 0.35), 0 10px 24px -5px rgba(20, 33, 61, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Subtle Hardware Side Buttons */}
        <div className="hidden sm:block absolute -left-[8px] top-28 w-1.5 h-12 bg-slate-600 rounded-l-md shadow-xs" />
        <div className="hidden sm:block absolute -left-[8px] top-44 w-1.5 h-12 bg-slate-600 rounded-l-md shadow-xs" />
        <div className="hidden sm:block absolute -right-[8px] top-32 w-1.5 h-16 bg-slate-600 rounded-r-md shadow-xs" />

        {/* Screen Bezel & Surface with 36px radius */}
        <div className="w-full h-full bg-[#F6F4EF] sm:rounded-[38px] overflow-hidden flex flex-col relative shadow-inner">
          {/* Top Speaker Micro-Ear Grill */}
          <div className="w-16 h-1 bg-slate-800/40 rounded-full mx-auto mt-1 absolute top-1 left-1/2 -translate-x-1/2 z-40 pointer-events-none" />

          {/* Android Status Bar */}
          <div className="h-10 px-6 pt-2 pb-1 bg-inherit flex items-center justify-between text-xs font-bold text-[#14213D] shrink-0 select-none z-30">
            <span className="tabular-nums tracking-tight font-semibold">10:14</span>

            {/* Front Camera Punch Hole */}
            <div className="w-4 h-4 rounded-full bg-[#020617] border border-slate-700/60 flex items-center justify-center shadow-inner">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-950/80 border border-blue-900/60" />
            </div>

            <div className="flex items-center gap-1.5 opacity-90 text-[#14213D]">
              <Signal size={13} strokeWidth={2.5} />
              <Wifi size={13} strokeWidth={2.5} />
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] font-mono font-bold">85%</span>
                <BatteryMedium size={15} strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* Optional sub-header chip when passed */}
          {headerTitle && (
            <div className="bg-teal-900/10 text-teal-950 text-[11px] font-extrabold py-1.5 px-3 text-center border-b border-teal-900/10 shrink-0 tracking-wide">
              {headerTitle}
            </div>
          )}

          {/* Main App Content Container */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative">
            {children}
          </div>

          {/* Android Bottom Home Navigation Gesture Bar */}
          <div className="h-6 bg-inherit flex items-center justify-center shrink-0 z-30 select-none">
            <div className="w-32 h-1.5 bg-[#14213D]/25 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
