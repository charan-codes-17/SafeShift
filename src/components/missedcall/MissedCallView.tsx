import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Phone, PhoneCall, PhoneOff, Mic, Play, Pause, ChevronRight, ChevronLeft, ShieldCheck, Volume2, Hash } from 'lucide-react';
import { Waveform } from '../common/Waveform';

export const MissedCallView: React.FC = () => {
  const { t } = useApp();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [autoPlay, setAutoPlay] = useState(false);
  const [ivrSelection, setIvrSelection] = useState<string | null>(null);
  const [anonSelection, setAnonSelection] = useState<string | null>(null);

  // Auto-advance stepper if autoPlay is enabled
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev === 3 ? 1 : ((prev + 1) as 1 | 2 | 3)));
    }, 4500);

    return () => clearInterval(timer);
  }, [autoPlay]);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1E293B] text-white select-none relative overflow-y-auto">
      {/* Top Headline Chip */}
      <div className="bg-[#0E7C86] py-1.5 px-3 text-center border-b border-teal-700/60 shrink-0">
        <span className="text-xs font-black text-white inline-flex items-center gap-1.5 tracking-wide">
          <ShieldCheck size={14} className="text-amber-300" />
          Toll-free number (example) • Works on any basic phone
        </span>
      </div>

      {/* Stepper Navigation Controls */}
      <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((stepNum) => (
            <button
              key={stepNum}
              onClick={() => setCurrentStep(stepNum as 1 | 2 | 3)}
              className="min-h-[48px] min-w-[48px] flex items-center justify-center"
              aria-label={`Go to step ${stepNum}`}
            >
              <div
                className={`w-8 h-8 rounded-full text-xs font-black flex items-center justify-center transition-all ${
                  currentStep === stepNum
                    ? 'bg-[#0E7C86] text-white ring-2 ring-teal-400'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {stepNum}
              </div>
            </button>
          ))}
          <span className="text-xs text-slate-400 font-bold ml-1">
            {currentStep === 1 && 'Dial 1800'}
            {currentStep === 2 && 'Callback'}
            {currentStep === 3 && 'IVR Menu'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`min-h-[48px] px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              autoPlay ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-300'
            }`}
            aria-label="Toggle auto advancing simulator"
          >
            {autoPlay ? <Pause size={14} /> : <Play size={14} />}
            <span>Auto</span>
          </button>

          <button
            onClick={() => setCurrentStep((prev) => (prev === 3 ? 1 : ((prev + 1) as 1 | 2 | 3)))}
            className="min-h-[48px] px-3.5 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-bold text-teal-400 flex items-center gap-1"
            aria-label="Next simulator step"
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* STEP 1: Basic Phone Dial & Missed Call */}
      {currentStep === 1 && (
        <div className="flex-1 flex flex-col justify-between p-5 space-y-4 animate-fadeIn">
          <div className="text-center pt-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-teal-400 bg-teal-950 px-2.5 py-1 rounded-full border border-teal-800">
              Toll-free number (example)
            </span>
            <h3 className="text-2xl font-black text-white mt-2">
              Give a Missed Call
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Workers incur zero call charges or data costs.
            </p>
          </div>

          {/* Feature Phone Dial Screen Mockup */}
          <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl p-5 shadow-inner space-y-4 max-w-xs mx-auto w-full">
            <div className="bg-emerald-950/60 border border-emerald-600/40 rounded-2xl p-3 text-center">
              <span className="text-[10px] font-mono text-emerald-400 block uppercase">
                Toll-free number (example)
              </span>
              <div className="text-xl font-mono font-black text-emerald-300 tracking-wider">
                1800-XXX-XXXX
              </div>
              <span className="text-[10px] text-emerald-500 font-mono">(Simulated 2G hotline)</span>
            </div>

            {/* Dialpad Keypad */}
            <div className="grid grid-cols-3 gap-2 text-center">
              {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((k) => (
                <div
                  key={k}
                  className="h-10 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center justify-center font-mono font-bold text-base text-slate-200"
                >
                  {k}
                </div>
              ))}
            </div>

            {/* Dial / Hangup Action */}
            <button
              onClick={() => setCurrentStep(2)}
              className="w-full h-13 bg-red-600 hover:bg-red-700 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all text-white"
            >
              <PhoneOff size={20} />
              <span>Call & Hang up (Missed Call)</span>
            </button>
          </div>

          {/* Missed Call Logged Banner */}
          <div className="bg-teal-950/90 border border-teal-500/60 rounded-2xl p-3 text-center text-xs font-bold text-teal-200 flex items-center justify-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-ping" />
            <span>Missed call registered in 0.4s • System will dial back now</span>
          </div>
        </div>
      )}

      {/* STEP 2: Incoming Call Screen */}
      {currentStep === 2 && (
        <div className="flex-1 flex flex-col justify-between p-6 text-center animate-fadeIn my-auto">
          <div className="pt-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-950/60 px-3 py-1 rounded-full border border-amber-700">
              Step 2: Instant Callback
            </span>
            <h3 className="text-2xl font-black text-white mt-3">
              Calling you back...
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Cloud IVR automatically dials the worker's mobile number.
            </p>
          </div>

          {/* Pulsing Avatar */}
          <div className="relative my-8 flex items-center justify-center">
            <div className="w-36 h-36 rounded-full bg-teal-500/20 animate-ping absolute" />
            <div className="w-32 h-32 rounded-full bg-teal-500/30 animate-pulse absolute" />
            <div className="w-28 h-28 rounded-full bg-[#0E7C86] flex flex-col items-center justify-center shadow-2xl relative z-10 border-4 border-white/20">
              <PhoneCall size={44} className="text-white animate-bounce" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-black text-white">SafeShift Buddy</div>
            <div className="text-sm font-mono text-teal-300 font-semibold">
              Sunrise Textiles Unit 2
            </div>
            <div className="text-xs text-slate-400">Incoming Voice Call</div>
          </div>

          {/* Answer / Decline controls */}
          <div className="flex items-center justify-around pt-6 pb-2">
            <button
              onClick={() => setCurrentStep(1)}
              className="flex flex-col items-center gap-1 group focus-visible:ring-2 focus-visible:ring-red-400 rounded-2xl p-1"
              aria-label="Decline incoming call"
            >
              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white shadow-lg active:scale-95">
                <PhoneOff size={28} />
              </div>
              <span className="text-xs font-bold text-slate-400">Decline</span>
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className="flex flex-col items-center gap-1 group focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-2xl p-1"
              aria-label="Answer incoming call"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-lg ring-4 ring-emerald-500/40 active:scale-95 animate-pulse">
                <Phone size={28} />
              </div>
              <span className="text-xs font-bold text-emerald-400">Answer</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: IVR Voice Menu & Keypad Prompts */}
      {currentStep === 3 && (
        <div className="flex-1 flex flex-col justify-between p-4 space-y-3 animate-fadeIn">
          {/* Active Call Header */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black text-emerald-400">CALL ACTIVE • 00:24</span>
            </div>
            <span className="text-xs font-bold text-slate-400">Toll-free / Zero data</span>
          </div>

          {/* Voice Prompt Simulation */}
          <div className="bg-[#14213D] border border-teal-500/40 rounded-2xl p-3.5 space-y-2 shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-teal-300 flex items-center gap-1">
                <Volume2 size={13} /> IVR Voice Audio
              </span>
              <Waveform active={true} barCount={12} color="#14B8A6" className="h-4" />
            </div>

            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700 space-y-1.5 text-xs">
              <p className="font-bold text-white leading-relaxed">
                📢 &ldquo;Welcome to SafeShift. Press <strong className="text-amber-400">1</strong> to ask a safety question. Press <strong className="text-amber-400">2</strong> to report a hazard.&rdquo;
              </p>
              <div className="pt-1 border-t border-slate-700 text-slate-300">
                🔒 &ldquo;Press <strong className="text-emerald-400">1</strong> to say your name, or <strong className="text-emerald-400">2</strong> to stay anonymous.&rdquo;
              </div>
            </div>
          </div>

          {/* Large Keypad for Basic Phones */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 space-y-2">
            <div className="text-[11px] font-bold text-slate-400 text-center uppercase tracking-wider">
              Tap Keypad Option
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setIvrSelection('1')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                  ivrSelection === '1'
                    ? 'bg-teal-600 text-white border-teal-400'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center font-black text-lg text-amber-400">
                  1
                </div>
                <div>
                  <div className="font-extrabold text-xs">Ask Safety Question</div>
                  <div className="text-[10px] text-slate-400">Speak after beep</div>
                </div>
              </button>

              <button
                onClick={() => setIvrSelection('2')}
                className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all text-left ${
                  ivrSelection === '2'
                    ? 'bg-amber-600 text-white border-amber-400'
                    : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-750'
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center font-black text-lg text-amber-400">
                  2
                </div>
                <div>
                  <div className="font-extrabold text-xs">Report a Hazard</div>
                  <div className="text-[10px] text-slate-400">Voice observation</div>
                </div>
              </button>
            </div>

            {/* Recording Indicator */}
            {ivrSelection && (
              <div className="p-3 bg-red-950/70 border border-red-500/50 rounded-xl flex items-center justify-between text-xs animate-fadeIn">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                  <span className="font-black text-red-200">Recording Voice Note... [0:08]</span>
                </div>
                <Mic size={16} className="text-red-400 animate-pulse" />
              </div>
            )}
          </div>

          {/* End Call Button */}
          <button
            onClick={() => setCurrentStep(1)}
            className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl text-white font-black text-sm flex items-center justify-center gap-2 shadow-md"
          >
            <PhoneOff size={18} />
            <span>Hang up Call</span>
          </button>
        </div>
      )}
    </div>
  );
};
