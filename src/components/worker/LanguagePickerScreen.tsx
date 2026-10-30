import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../data';
import { SupportedLanguage } from '../../types';
import { Check, Volume2, ArrowRight } from 'lucide-react';

export const LanguagePickerScreen: React.FC = () => {
  const { language, setLanguage, setWorkerScreen } = useApp();
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>(language);
  const [audioFeedback, setAudioFeedback] = useState<string | null>(null);

  const handleSelectLanguage = (code: SupportedLanguage) => {
    setSelectedLang(code);
    setLanguage(code);

    const langObj = LANGUAGES.find((l) => l.code === code);
    const native = langObj?.nativeName || 'English';
    setAudioFeedback(`We will speak in ${native}`);
  };

  const handleContinue = () => {
    setLanguage(selectedLang);
    setWorkerScreen('permissions');
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-5 bg-[#F6F4EF] text-[#14213D] select-none">
      {/* Top Heading */}
      <div className="pt-1 animate-fade-up">
        <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100/80 px-3 py-1 rounded-full">
          Step 1 of 2
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#14213D] mt-2 tracking-tight">
          Choose your language
        </h2>
        <p className="text-sm text-slate-600 mt-1 font-medium">
          अपनी भाषा चुनें • ਆਪਣੀ ਬੋਲੀ ਚੁਣੋ • உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்
        </p>
      </div>

      {/* 5 Language Large Cards */}
      <div className="space-y-3 my-auto py-2 animate-fade-up delay-75">
        {LANGUAGES.map((item) => {
          const isSelected = selectedLang === item.code;
          return (
            <button
              key={item.code}
              data-demo-target={item.code === 'hi' ? 'hindi-lang' : undefined}
              onClick={() => handleSelectLanguage(item.code)}
              className={`w-full min-h-[64px] px-4.5 py-3 rounded-[20px] flex items-center justify-between transition-all border-2 text-left btn-press ${
                isSelected
                  ? 'bg-white border-[#0E7C86] shadow-soft ring-2 ring-teal-500/20'
                  : 'bg-white/80 border-slate-200/80 hover:border-teal-300 hover:bg-white shadow-xs'
              }`}
              aria-label={`Select ${item.englishName}`}
            >
              <div className="flex items-center gap-3.5">
                {/* Audio speaker icon pill */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                    isSelected ? 'bg-[#0E7C86] text-white shadow-xs' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Volume2 size={22} />
                </div>

                <div>
                  {/* Native Script Large */}
                  <div className="text-xl sm:text-2xl font-black text-[#14213D] tracking-tight leading-tight">
                    {item.nativeName}
                  </div>
                  {/* English name underneath */}
                  <div className="text-xs sm:text-sm font-semibold text-slate-500">
                    {item.englishName}
                  </div>
                </div>
              </div>

              {/* Checkmark indicator */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ${
                  isSelected ? 'bg-[#0E7C86] text-white shadow-xs' : 'border-2 border-slate-300'
                }`}
              >
                {isSelected && <Check size={18} strokeWidth={3} />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Audio Chip Notification */}
      {audioFeedback && (
        <div className="bg-teal-50/90 border border-teal-200 text-teal-900 rounded-2xl px-4 py-2.5 flex items-center gap-2.5 text-sm font-bold shadow-soft mb-2 animate-fade-up">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-ping" />
          <Volume2 size={16} className="text-[#0E7C86]" />
          <span>{audioFeedback}</span>
        </div>
      )}

      {/* Bottom Continue Button - single primary action */}
      <div className="pt-2 pb-3 animate-fade-up delay-150">
        <button
          data-demo-target="continue-btn"
          onClick={handleContinue}
          className="w-full h-16 min-h-[56px] bg-[#0E7C86] hover:bg-[#095E66] btn-press transition-all rounded-[24px] text-white font-extrabold text-xl flex items-center justify-center gap-2.5 shadow-glow-teal focus-visible:ring-3 focus-visible:ring-teal-400"
          aria-label="Continue with selected language"
        >
          <span>Continue / आगे बढ़ें</span>
          <ArrowRight size={22} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
