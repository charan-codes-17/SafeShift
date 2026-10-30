import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mic, Camera, Bell, ArrowRight, ShieldCheck } from 'lucide-react';

export const PermissionsScreen: React.FC = () => {
  const { setWorkerScreen, t } = useApp();
  const [micEnabled, setMicEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [notifEnabled, setNotifEnabled] = useState(true);

  return (
    <div className="flex-1 flex flex-col justify-between p-5 bg-[#F6F4EF] text-[#14213D] select-none">
      <div className="pt-1 animate-fade-up">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100/80 px-3 py-1 rounded-full">
          Step 2 of 2
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] mt-2 tracking-tight">
          Safety permissions
        </h2>
        <p className="text-sm text-slate-600 mt-1 font-medium">
          Enable voice & camera so you never have to type.
        </p>
      </div>

      {/* Permissions Rows */}
      <div className="space-y-3.5 my-auto py-2 animate-fade-up delay-75">
        {/* Row 1: Microphone (Core Voice Feature) */}
        <div className="bg-white border-2 border-teal-500/30 rounded-[24px] p-5 shadow-soft flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-teal-100/80 text-[#0E7C86] flex items-center justify-center shrink-0 shadow-2xs">
              <Mic size={26} strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-extrabold text-base text-[#14213D] flex items-center gap-1.5">
                <span>Microphone</span>
                <span className="text-[10px] bg-red-100 text-red-800 font-extrabold px-2 py-0.5 rounded-full">Required</span>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">To ask safety questions & record voice hazards.</p>
            </div>
          </div>
          <button
            onClick={() => setMicEnabled(!micEnabled)}
            className={`w-14 h-8 rounded-full p-1 transition-colors ${micEnabled ? 'bg-[#0E7C86]' : 'bg-slate-300'}`}
            aria-label="Toggle Microphone Permission"
          >
            <div
              className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                micEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Row 2: Camera (Optional photo hazard reports) */}
        <div className="bg-white border border-slate-200/90 rounded-[24px] p-5 shadow-soft flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 shadow-2xs">
              <Camera size={26} strokeWidth={2} />
            </div>
            <div>
              <div className="font-extrabold text-base text-[#14213D] flex items-center gap-1.5">
                <span>Camera</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">Optional</span>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">To snap photos of broken machinery or leaks.</p>
            </div>
          </div>
          <button
            onClick={() => setCameraEnabled(!cameraEnabled)}
            className={`w-14 h-8 rounded-full p-1 transition-colors ${cameraEnabled ? 'bg-[#0E7C86]' : 'bg-slate-300'}`}
            aria-label="Toggle Camera Permission"
          >
            <div
              className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                cameraEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Row 3: Notifications (Optional shift safety alerts) */}
        <div className="bg-white border border-slate-200/90 rounded-[24px] p-5 shadow-soft flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 shadow-2xs">
              <Bell size={26} strokeWidth={2} />
            </div>
            <div>
              <div className="font-extrabold text-base text-[#14213D] flex items-center gap-1.5">
                <span>Notifications</span>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-full">Optional</span>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-0.5">To receive safety reminders before your shift begins.</p>
            </div>
          </div>
          <button
            onClick={() => setNotifEnabled(!notifEnabled)}
            className={`w-14 h-8 rounded-full p-1 transition-colors ${notifEnabled ? 'bg-[#0E7C86]' : 'bg-slate-300'}`}
            aria-label="Toggle Notifications Permission"
          >
            <div
              className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                notifEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center gap-2.5 p-3.5 bg-emerald-50/90 border border-emerald-200 rounded-2xl text-emerald-900 text-xs font-semibold shadow-2xs">
          <ShieldCheck size={20} className="text-emerald-700 shrink-0" />
          <span>{t('report_anon')}: Anonymous by default. Voice recordings stay local to your factory.</span>
        </div>
      </div>

      {/* Bottom Continue Button - ONE clear primary hero action */}
      <div className="pt-2 pb-3 animate-fade-up delay-150">
        <button
          onClick={() => setWorkerScreen('main')}
          className="w-full h-16 min-h-[56px] bg-[#0E7C86] hover:bg-[#095E66] btn-press transition-all rounded-[24px] text-white font-extrabold text-xl flex items-center justify-center gap-2.5 shadow-glow-teal focus-visible:ring-3 focus-visible:ring-teal-400"
          aria-label="Continue to SafeShift Buddy Home"
        >
          <span>Continue / शुरू करें</span>
          <ArrowRight size={22} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
