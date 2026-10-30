import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../data';
import { WorkerAvatar } from '../pictograms';
import { Globe, Clock, ShieldCheck, ChevronRight, Volume2, Building2 } from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { language, setLanguage, setWorkerScreen, t } = useApp();
  const [anonDefault, setAnonDefault] = useState(true);
  const [currentShift, setCurrentShift] = useState('Night shift (9 PM - 5 AM)');

  const currentLangObj = LANGUAGES.find((l) => l.code === language);

  return (
    <div className="flex-1 flex flex-col bg-[#F6F4EF] text-[#14213D] p-4 pb-24 overflow-y-auto select-none space-y-4">
      {/* Top Profile Card - 24px radius, generous padding */}
      <div className="bg-white p-5 rounded-[24px] border border-slate-200/90 shadow-soft flex items-center gap-4 animate-fade-up">
        <WorkerAvatar className="w-18 h-18 shrink-0 drop-shadow-xs" />
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-teal-800 bg-teal-100/80 px-2.5 py-0.5 rounded-full">
            Active Worker Badge
          </span>
          <h2 className="text-xl font-black text-[#14213D] mt-1">Loom Operator</h2>
          <p className="text-xs text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
            <Building2 size={13} /> Sunrise Textiles, Unit 2
          </p>
        </div>
      </div>

      {/* Settings Options - 24px radius */}
      <div className="bg-white rounded-[24px] border border-slate-200/90 shadow-soft overflow-hidden divide-y divide-slate-100 animate-fade-up delay-75">
        {/* Current Language Option */}
        <button
          onClick={() => setWorkerScreen('language')}
          className="w-full p-4.5 min-h-[68px] flex items-center justify-between hover:bg-slate-50 transition-colors text-left btn-press focus-visible:ring-2 focus-visible:ring-teal-500"
          aria-label="Change spoken language"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-teal-50 text-[#0E7C86] flex items-center justify-center shrink-0 shadow-2xs">
              <Globe size={22} />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Spoken Language
              </span>
              <span className="text-base font-extrabold text-[#14213D] leading-relaxed">
                {currentLangObj?.nativeName} ({currentLangObj?.englishName})
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-teal-700 font-bold text-xs">
            <span>Change</span>
            <ChevronRight size={16} />
          </div>
        </button>

        {/* Shift Setting */}
        <div className="p-4.5 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 shadow-2xs">
              <Clock size={22} />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Assigned Shift
              </span>
              <span className="text-sm font-extrabold text-[#14213D]">
                {currentShift}
              </span>
            </div>
          </div>
          <select
            value={currentShift}
            onChange={(e) => setCurrentShift(e.target.value)}
            className="min-h-[48px] text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 focus:outline-hidden"
            aria-label="Select assigned shift"
          >
            <option value="Day shift (7 AM - 3 PM)">Day shift</option>
            <option value="Evening shift (3 PM - 11 PM)">Evening shift</option>
            <option value="Night shift (9 PM - 5 AM)">Night shift</option>
          </select>
        </div>

        {/* Anonymous by Default Toggle */}
        <div className="p-4.5 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs">
              <ShieldCheck size={22} />
            </div>
            <div>
              <span className="text-sm font-extrabold text-[#14213D] block leading-relaxed">
                Anonymous by default
              </span>
              <span className="text-xs text-slate-500 font-medium block">
                Never attach your worker ID to hazard reports
              </span>
            </div>
          </div>

          <button
            onClick={() => setAnonDefault(!anonDefault)}
            className="min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl p-1"
            aria-label="Toggle anonymous default setting"
          >
            <div
              className={`w-13 h-7 rounded-full p-1 transition-colors ${
                anonDefault ? 'bg-[#0E7C86]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                  anonDefault ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Safety Hotline Banner */}
      <div className="p-4.5 bg-teal-50/90 border border-teal-200/90 rounded-[24px] space-y-1 shadow-2xs animate-fade-up delay-150">
        <span className="text-xs font-extrabold text-teal-900 uppercase tracking-wider flex items-center gap-1.5">
          <Volume2 size={15} className="text-[#0E7C86]" /> Factory Safety Toll-Free
        </span>
        <p className="text-base font-black text-teal-950">1800-SAFE-SHIFT (1800-723-3744)</p>
        <p className="text-xs text-slate-600 font-medium">Free missed call call-back for any 2G phone.</p>
      </div>
    </div>
  );
};
