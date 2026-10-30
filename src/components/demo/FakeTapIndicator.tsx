import React from 'react';
import { useApp } from '../../context/AppContext';

export const FakeTapIndicator: React.FC = () => {
  const { tapIndicator } = useApp();

  if (!tapIndicator || !tapIndicator.visible) {
    return null;
  }

  return (
    <div
      className="pointer-events-none fixed z-[100] transition-transform duration-200"
      style={{
        left: `${tapIndicator.x}px`,
        top: `${tapIndicator.y}px`,
      }}
      aria-hidden="true"
    >
      {/* Outer expanding ripple */}
      <div className="absolute w-16 h-16 -ml-8 -mt-8 rounded-full border-2 border-teal-400 bg-teal-400/20 animate-ping opacity-75" />

      {/* Second soft glowing ring */}
      <div className="absolute w-12 h-12 -ml-6 -mt-6 rounded-full border border-teal-300/80 animate-pulse" />

      {/* Center touch circle (finger tap simulation) */}
      <div className="absolute w-8 h-8 -ml-4 -mt-4 rounded-full bg-teal-400 border-2 border-white shadow-xl shadow-teal-900/50 flex items-center justify-center transform active:scale-90 transition-transform">
        <div className="w-2.5 h-2.5 rounded-full bg-white shadow-xs" />
      </div>

      {/* Optional action tooltip tag */}
      {tapIndicator.label && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#14213D] text-teal-300 text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-teal-400/40 shadow-xl shadow-black/40 animate-fade-up">
          {tapIndicator.label}
        </div>
      )}
    </div>
  );
};
