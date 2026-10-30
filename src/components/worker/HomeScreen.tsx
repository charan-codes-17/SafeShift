import React from 'react';
import { useApp } from '../../context/AppContext';
import { MachineLockout, HardHat, ShieldHeadsetLogo } from '../pictograms';
import { Mic, Clock, AlertOctagon, Volume2, Sparkles, ChevronRight } from 'lucide-react';
import { AudioPlayer } from '../common/AudioPlayer';

interface HomeScreenProps {
  onStartVoice: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onStartVoice }) => {
  const { t, getAudioPlayingLabel, setWorkerTab, setWorkerScreen } = useApp();

  return (
    <div className="flex-1 flex flex-col justify-between p-4 bg-[#F6F4EF] text-[#14213D] select-none pb-24 space-y-4">
      {/* Top App Header with Language Quick-Badge */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <ShieldHeadsetLogo className="w-8 h-8" />
          <span className="font-extrabold text-base tracking-tight text-[#0E7C86]">
            SafeShift Buddy
          </span>
        </div>
        <button
          onClick={() => setWorkerScreen('language')}
          className="min-h-[48px] text-xs font-extrabold text-[#0E7C86] bg-white shadow-soft px-4 py-2 rounded-full flex items-center gap-2 btn-press focus-visible:ring-2 focus-visible:ring-teal-500"
          aria-label="Change language"
        >
          <Volume2 size={16} className="text-[#0E7C86]" />
          <span>Change language</span>
        </button>
      </div>

      {/* Top "Today's Safety" Card (24px radius, 20px padding, soft danger top band) */}
      <div className="bg-white rounded-[24px] p-5 shadow-soft border border-slate-100 space-y-3.5 animate-fade-up">
        {/* Soft Red Top Danger Band */}
        <div className="flex items-center justify-between -mx-5 -mt-5 px-5 py-3 rounded-t-[24px] bg-red-50/90 border-b border-red-100/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-red-900 flex items-center gap-1.5">
              <AlertOctagon size={14} className="text-red-600" />
              DANGER • Critical Rule
            </span>
          </div>
          <span className="text-[11px] font-extrabold text-red-800 bg-red-100/80 px-2 py-0.5 rounded-md">
            LOTO
          </span>
        </div>

        {/* Pictogram (at least 96px tall: rendered at h-36 = 144px) */}
        <div className="rounded-2xl overflow-hidden shadow-inner border border-slate-100 bg-slate-50">
          <MachineLockout className="w-full h-36" />
        </div>

        {/* One line in current language */}
        <div>
          <p className="text-lg font-black text-[#14213D] leading-relaxed">
            {t('rule')}
          </p>
        </div>

        {/* Audio Play Button */}
        <AudioPlayer label={getAudioPlayingLabel()} durationSeconds={4} />
      </div>

      {/* Center: Hero Primary Action - Very Large Pulsing Mic Button */}
      <div className="my-auto py-2 flex flex-col items-center text-center animate-fade-up delay-75">
        <div className="relative flex items-center justify-center">
          {/* Subtle Outer Rings */}
          <div className="absolute w-40 h-40 rounded-full bg-teal-400/20 animate-pulse-mic pointer-events-none" />

          {/* Main Hero Mic Button */}
          <button
            data-demo-target="mic-hero"
            onClick={onStartVoice}
            className="w-32 h-32 rounded-full bg-linear-to-tr from-[#0E7C86] to-[#1295A2] text-white flex flex-col items-center justify-center shadow-glow-teal hover:scale-105 btn-press transition-all z-10 border-4 border-white cursor-pointer"
            aria-label={t('ask_voice')}
          >
            <Mic size={48} strokeWidth={2.5} className="drop-shadow-sm" />
            <span className="text-[11px] font-black uppercase tracking-widest mt-1 opacity-90">
              MIC
            </span>
          </button>
        </div>

        {/* Primary Action Label with ask_voice string */}
        <h2 className="text-2xl font-black text-[#14213D] tracking-tight mt-3 leading-relaxed">
          {t('ask_voice')}
        </h2>
        <p className="text-xs text-slate-500 font-bold mt-0.5 max-w-[260px]">
          Tap to speak. Any question in your mother tongue.
        </p>
      </div>

      {/* Shift Tile (24px radius, 20px padding) */}
      <div className="bg-white rounded-[24px] p-4.5 shadow-soft border border-slate-100 flex items-center justify-between animate-fade-up delay-150">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-teal-50 text-[#0E7C86] flex items-center justify-center shrink-0">
            <Clock size={22} />
          </div>
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-400">
              Shift Schedule
            </div>
            <div className="text-sm font-extrabold text-[#14213D]">
              Today: Night shift, 9 PM – 5 AM
            </div>
          </div>
        </div>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs" />
      </div>

      {/* Full-width Red-accented "Report a hazard" Button (24px radius) */}
      <button
        onClick={() => setWorkerTab('reports')}
        className="w-full min-h-[56px] rounded-[24px] border-2 border-red-500 bg-red-50/90 hover:bg-red-100 text-red-700 font-black text-base flex items-center justify-between px-5 transition-all shadow-soft btn-press animate-fade-up delay-200"
        aria-label="Report a safety hazard"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shadow-xs">
            <AlertOctagon size={20} strokeWidth={2.5} />
          </div>
          <span className="leading-relaxed">Report a hazard / ख़तरा बताएं</span>
        </div>
        <ChevronRight size={22} className="text-red-500" />
      </button>
    </div>
  );
};
