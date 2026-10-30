import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Waveform } from '../common/Waveform';
import { AudioPlayer } from '../common/AudioPlayer';
import { MachineUnsafe, MachineLockout } from '../pictograms';
import { UnderstandingQuiz } from './UnderstandingQuiz';
import { Mic, X, MessageSquare, Volume2, ShieldAlert } from 'lucide-react';

interface VoiceQAScreenProps {
  onClose: () => void;
}

export const VoiceQAScreen: React.FC<VoiceQAScreenProps> = ({ onClose }) => {
  const { t, getAudioPlayingLabel, voiceStepOverride } = useApp();
  
  // Scripted sequence:
  // Step 1: Listening overlay (~2.5s)
  // Step 2: Worker voice bubble appears with audio + transcribed question text
  // Step 3: Buddy typing indicator (~1s)
  // Step 4: Safety Card bubble with pictogram, one-line rule, audio, and understanding check quiz
  const [step, setStep] = useState<'listening' | 'transcribing' | 'buddy_answering' | 'done'>('listening');
  const activeStep = voiceStepOverride || step;

  useEffect(() => {
    if (voiceStepOverride) return;

    let t1: number, t2: number;
    // After 2.5s, switch from listening to worker bubble + buddy typing
    t1 = window.setTimeout(() => {
      setStep('buddy_answering');
      t2 = window.setTimeout(() => {
        setStep('done');
      }, 1200);
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [voiceStepOverride]);

  return (
    <div className="flex-1 flex flex-col bg-[#F6F4EF] text-[#14213D] pb-24 relative overflow-y-auto">
      {/* Listening Full Overlay (Active during step 'listening') */}
      {activeStep === 'listening' && (
        <div className="absolute inset-0 z-40 bg-[#14213D]/95 backdrop-blur-xs flex flex-col items-center justify-between p-6 text-white animate-fadeIn">
          {/* Top Cancel Button */}
          <div className="w-full flex justify-end">
            <button
              onClick={onClose}
              className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white focus-visible:ring-2 focus-visible:ring-teal-400"
              aria-label="Cancel voice question"
            >
              <X size={22} />
            </button>
          </div>

          {/* Large Waveform & Mic Circle */}
          <div className="flex flex-col items-center space-y-6 my-auto">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-teal-500/20 animate-ping absolute inset-0" />
              <div className="w-32 h-32 rounded-full bg-[#0E7C86] flex items-center justify-center shadow-2xl relative z-10 border-4 border-teal-300">
                <Mic size={52} className="text-white" />
              </div>
            </div>

            <div className="w-64 h-16 flex items-center justify-center">
              <Waveform active={true} barCount={22} color="#14B8A6" className="h-12 w-full" />
            </div>

            <div className="text-center space-y-1">
              <span className="text-xs font-black uppercase tracking-widest text-teal-300 bg-teal-900/60 px-3 py-1 rounded-full border border-teal-500/30">
                Listening / सुन रहा है...
              </span>
              <h2 className="text-3xl font-black text-white tracking-tight mt-1 leading-relaxed">
                {t('speak_now')}
              </h2>
              <p className="text-xs text-slate-300">
                Speak naturally in your mother tongue
              </p>
            </div>
          </div>

          {/* Bottom Cancel helper */}
          <div className="w-full pb-4">
            <button
              onClick={onClose}
              className="w-full min-h-[48px] py-3 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold text-sm"
              aria-label="Cancel recording"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Main Conversation Stream */}
      <div className="p-4 space-y-4">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="font-extrabold text-sm text-[#0E7C86]">Voice Q&A Session</span>
          </div>
          <button
            onClick={onClose}
            className="min-h-[48px] px-3.5 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white rounded-xl border border-slate-200 shadow-2xs"
            aria-label="Done voice session"
          >
            Done
          </button>
        </div>

        {/* 1. Worker Voice Bubble */}
        <div className="flex flex-col items-end space-y-1 animate-fadeIn">
          <div className="bg-[#14213D] text-white p-3.5 rounded-2xl rounded-tr-xs max-w-[90%] shadow-md space-y-2">
            {/* Audio waveform player inside bubble */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0E7C86] text-white flex items-center justify-center shrink-0">
                <Mic size={18} />
              </div>
              <div className="flex-1">
                <Waveform active={false} barCount={14} color="#94A3B8" className="h-4" />
              </div>
              <span className="text-[11px] font-mono text-slate-300">0:04</span>
            </div>

            {/* Transcribed text below */}
            <div className="pt-1 border-t border-slate-700/60">
              <span className="text-[10px] text-teal-300 font-bold uppercase tracking-wider block">
                Transcribed voice:
              </span>
              <p className="text-base font-bold text-white mt-0.5 leading-relaxed">
                &ldquo;{t('question')}&rdquo;
              </p>
            </div>
          </div>
          <span className="text-[10px] font-semibold text-slate-400 pr-1">Worker • Just now</span>
        </div>

        {/* 2. Buddy Typing Indicator */}
        {activeStep === 'buddy_answering' && (
          <div className="flex items-center gap-2 text-slate-500 p-2 text-xs font-semibold animate-pulse">
            <div className="w-6 h-6 rounded-full bg-[#0E7C86] text-white flex items-center justify-center text-[10px] font-black">
              SB
            </div>
            <span>SafeShift Buddy is translating rule...</span>
          </div>
        )}

        {/* 3. Buddy Safety Card Answer Bubble */}
        {activeStep === 'done' && (
          <div className="space-y-4 animate-fade-up">
            <div className="bg-white rounded-[24px] p-5 shadow-card-elevated border border-slate-100 space-y-3.5 relative overflow-hidden">
              {/* Soft Red Top Danger Band */}
              <div className="flex items-center justify-between -mx-5 -mt-5 px-5 py-3 rounded-t-[24px] bg-red-50/95 border-b border-red-100/90">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-wider text-red-900 flex items-center gap-1.5">
                    <ShieldAlert size={14} className="text-red-600" />
                    DANGER • CRITICAL RULE / ज़रूरी नियम
                  </span>
                </div>
                <span className="text-[11px] font-extrabold text-red-800 bg-red-100/90 px-2 py-0.5 rounded-md">
                  LOTO
                </span>
              </div>

              {/* Large Pictogram (Machine with hand near it and red X: rendered at h-40 = 160px) */}
              <div className="rounded-2xl overflow-hidden shadow-inner border border-red-100/80 bg-red-50/40">
                <MachineUnsafe className="w-full h-40" />
              </div>

              {/* One-line Rule in a bold red-accent heading */}
              <div className="p-3.5 bg-red-50/90 rounded-2xl border-l-4 border-red-600">
                <h3 className="text-lg font-black text-red-950 leading-relaxed">
                  {t('rule')}
                </h3>
              </div>

              {/* Prominent Audio Play Button with Progress Bar & Label */}
              <div data-demo-target="card-audio-btn">
                <AudioPlayer label={getAudioPlayingLabel()} durationSeconds={4} autoPlay={false} />
              </div>
            </div>

            {/* 4. Understanding Check attached under the card */}
            <UnderstandingQuiz onComplete={() => {}} />
          </div>
        )}
      </div>
    </div>
  );
};
