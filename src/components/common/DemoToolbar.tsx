import React from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../data';
import { SupportedLanguage, DemoView } from '../../types';
import { ShieldHeadsetLogo } from '../pictograms';
import { RotateCcw, Smartphone, MessageSquare, PhoneCall, LayoutDashboard, Globe, Play } from 'lucide-react';

export const DemoToolbar: React.FC = () => {
  const { currentView, setCurrentView, language, setLanguage, resetDemo, startDemo, stopDemo, demoState } = useApp();

  const navItems: { id: DemoView; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'worker', label: 'Worker App', icon: <Smartphone size={16} /> },
    { id: 'chat', label: 'Chat Channel', icon: <MessageSquare size={16} />, badge: 'WhatsApp-style' },
    { id: 'missed_call', label: 'Missed Call', icon: <PhoneCall size={16} />, badge: 'IVR / 2G' },
    { id: 'dashboard', label: 'Officer Dashboard', icon: <LayoutDashboard size={16} />, badge: 'Desktop' },
  ];

  return (
    <header className="bg-[#14213D] text-white border-b border-slate-700/80 sticky top-0 z-50 shadow-md">
      {/* Top Banner with Tagline */}
      <div className="bg-[#0E7C86] px-4 py-1.5 text-center text-xs sm:text-sm font-semibold tracking-wide text-teal-50 flex items-center justify-center gap-2">
        <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span>&ldquo;Factories measure whether safety was told. <strong className="text-white underline decoration-amber-400 underline-offset-2">SafeShift Buddy measures whether it was understood.</strong>&rdquo;</span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <ShieldHeadsetLogo className="w-8 h-8" />
            <div>
              <div className="font-extrabold text-base sm:text-lg tracking-tight leading-tight flex items-center gap-1.5">
                SafeShift Buddy
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-teal-500/30 text-teal-300 border border-teal-400/30">
                  Hackathon Prototype
                </span>
              </div>
              <p className="text-[11px] text-slate-300 hidden md:block">Voice-first & icon-led factory safety</p>
            </div>
          </div>
        </div>

        {/* Center: View Switcher Segmented Control */}
        <nav className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700 overflow-x-auto shadow-inner" aria-label="Demo Views">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#0E7C86] text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                }`}
                aria-pressed={isActive}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`hidden xl:inline text-[9px] px-1 rounded ${
                      isActive ? 'bg-teal-900/60 text-teal-200' : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Language Selector, Play Demo (Primary style), & Reset Demo */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Primary Style "Play demo" Button */}
          {demoState.isRunning ? (
            <button
              onClick={stopDemo}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black bg-red-600 hover:bg-red-500 text-white shadow-md btn-press transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-red-400"
              aria-label="Stop running demo"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Stop demo</span>
            </button>
          ) : (
            <button
              onClick={startDemo}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 shadow-glow-teal btn-press transition-all cursor-pointer focus-visible:ring-3 focus-visible:ring-teal-400"
              aria-label="Play 80-second interactive demo story"
            >
              <div className="w-5 h-5 rounded-full bg-slate-950/20 flex items-center justify-center">
                <Play size={13} fill="currentColor" className="translate-x-0.5" />
              </div>
              <span className="tracking-tight">Play demo</span>
              <span className="hidden lg:inline text-[10px] bg-slate-950/15 px-1.5 py-0.5 rounded-md font-extrabold">
                80s
              </span>
            </button>
          )}

          {/* Language Selector */}
          <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1 text-xs">
            <Globe size={14} className="text-teal-400 shrink-0" />
            <label htmlFor="demo-lang-select" className="sr-only">Choose Language</label>
            <select
              id="demo-lang-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="bg-transparent text-white font-bold text-xs sm:text-sm focus:outline-hidden cursor-pointer"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code} className="bg-slate-800 text-white font-medium">
                  {l.nativeName} ({l.englishName})
                </option>
              ))}
            </select>
          </div>

          {/* Reset Demo button */}
          <button
            onClick={resetDemo}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-3 py-2 rounded-lg border border-slate-700 transition-colors focus-visible:ring-2 focus-visible:ring-teal-400"
            title="Reset to fresh demo state"
            aria-label="Reset demo to initial state"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">Reset demo</span>
          </button>
        </div>
      </div>
    </header>
  );
};
