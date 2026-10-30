import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SafetyCardItem, SupportedLanguage } from '../../types';
import { LANGUAGES } from '../../data';
import {
  MachineLockout,
  MachineGuard,
  ChemicalLabel,
  FireExit,
  Gloves,
  HardHat,
  Padlock,
} from '../pictograms';
import { AudioPlayer } from '../common/AudioPlayer';
import {
  Check,
  Send,
  Sparkles,
  Volume2,
  Globe,
  CheckCircle2,
  Eye,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface SafetyCardsTabProps {
  initialCardId?: string;
}

export const SafetyCardsTab: React.FC<SafetyCardsTabProps> = ({ initialCardId = 'card-1' }) => {
  const { safetyCards, updateSafetyCard, publishCardUpdate } = useApp();

  const [selectedCardId, setSelectedCardId] = useState<string>(initialCardId);
  const [previewLanguage, setPreviewLanguage] = useState<SupportedLanguage>('hi');
  const [publishSuccess, setPublishSuccess] = useState(false);

  const activeCard = safetyCards.find((c) => c.id === selectedCardId) || safetyCards[0];

  const [editTopic, setEditTopic] = useState(activeCard.topic);
  const [editIcon, setEditIcon] = useState(activeCard.iconName);
  const [editRules, setEditRules] = useState(activeCard.ruleTranslations);
  const [editAudioScript, setEditAudioScript] = useState(activeCard.audioScript);

  React.useEffect(() => {
    const card = safetyCards.find((c) => c.id === initialCardId) || safetyCards[0];
    if (card) {
      setSelectedCardId(card.id);
      setEditTopic(card.topic);
      setEditIcon(card.iconName);
      setEditRules(card.ruleTranslations);
      setEditAudioScript(card.audioScript);
    }
  }, [initialCardId, safetyCards]);

  // Switch active card
  const handleSelectCard = (card: SafetyCardItem) => {
    setSelectedCardId(card.id);
    setEditTopic(card.topic);
    setEditIcon(card.iconName);
    setEditRules(card.ruleTranslations);
    setEditAudioScript(card.audioScript);
    setPublishSuccess(false);
  };

  const handleRuleChange = (lang: SupportedLanguage, text: string) => {
    setEditRules((prev) => ({
      ...prev,
      [lang]: text,
    }));
  };

  const handlePublish = () => {
    // Update card in state
    updateSafetyCard({
      ...activeCard,
      topic: editTopic,
      iconName: editIcon,
      ruleTranslations: editRules,
      audioScript: editAudioScript,
    });

    // Trigger dashboard metric improvement
    publishCardUpdate(activeCard.id);
    setPublishSuccess(true);

    setTimeout(() => {
      setPublishSuccess(false);
    }, 4000);
  };

  const renderIconComponent = (iconName: string, className = 'w-full h-32') => {
    switch (iconName) {
      case 'machine-lockout':
        return <MachineLockout className={className} />;
      case 'machine-guard':
        return <MachineGuard className="w-20 h-20 text-[#0E7C86] mx-auto my-4" />;
      case 'chemical':
        return <ChemicalLabel className="w-20 h-20 mx-auto my-4" />;
      case 'fire-exit':
        return <FireExit className="w-20 h-20 mx-auto my-4" />;
      case 'ppe-gloves':
        return <Gloves className="w-20 h-20 mx-auto my-4" />;
      default:
        return <MachineLockout className={className} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-[#14213D] tracking-tight">
            Safety Cards & Pictogram Editor
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Deploy one-line safety rules and verified native audio to all factory units
          </p>
        </div>

        <button
          onClick={handlePublish}
          className="px-5 py-2.5 bg-[#0E7C86] hover:bg-[#095E66] text-white font-extrabold text-sm rounded-xl flex items-center gap-2 shadow-md active:scale-95 transition-all"
        >
          <Send size={16} />
          <span>Publish Update to Phones</span>
        </button>
      </div>

      {publishSuccess && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-500 rounded-2xl text-emerald-950 flex items-center justify-between animate-fadeIn shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <div className="font-extrabold text-sm">
                Card Published! Understanding rate jumped 54% ➔ 81%
              </div>
              <div className="text-xs text-emerald-800 font-medium">
                New audio and updated pictogram pushed to 340 night shift worker devices.
              </div>
            </div>
          </div>
          <span className="text-xs font-black uppercase tracking-wider bg-emerald-200 text-emerald-900 px-3 py-1 rounded-full">
            Live on Floor
          </span>
        </div>
      )}

      {/* Main 3-Column Layout: Cards List, Multi-language Editor, Live Phone Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Col 1: Card List (3 cols) */}
        <div className="lg:col-span-3 space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-400 block px-1">
            Active Safety Cards ({safetyCards.length})
          </span>

          <div className="space-y-2">
            {safetyCards.map((card) => {
              const isSelected = selectedCardId === card.id;

              return (
                <button
                  key={card.id}
                  onClick={() => handleSelectCard(card)}
                  className={`w-full text-left p-3 rounded-2xl border transition-all ${
                    isSelected
                      ? 'bg-white border-[#0E7C86] ring-2 ring-teal-500/20 shadow-sm'
                      : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-slate-400">{card.id}</span>
                    <span
                      className={`text-[10px] font-black px-1.5 py-0.2 rounded ${
                        card.understandingRate >= 75
                          ? 'bg-emerald-100 text-emerald-800'
                          : card.understandingRate >= 65
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {card.understandingRate}% understood
                    </span>
                  </div>

                  <h5 className="font-extrabold text-xs text-[#14213D] line-clamp-1">{card.topic}</h5>
                  <div className="text-[11px] text-slate-500 font-medium mt-1">
                    {card.languagesCoveredCount} Indian languages
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Col 2: Editor (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h4 className="font-black text-base text-[#14213D]">
              Edit Card: {editTopic}
            </h4>
            <p className="text-xs text-slate-500 font-medium">Keep safety rules to ONE punchy sentence.</p>
          </div>

          {/* Topic Title */}
          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-wider text-slate-600 block">
              Topic Title
            </label>
            <input
              type="text"
              value={editTopic}
              onChange={(e) => setEditTopic(e.target.value)}
              className="w-full p-2.5 text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500/30"
            />
          </div>

          {/* Icon Picker */}
          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-wider text-slate-600 block">
              Pictogram Symbol
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'machine-lockout', label: 'LOTO Lockout' },
                { id: 'machine-guard', label: 'Machine Guard' },
                { id: 'chemical', label: 'Chemical Diamond' },
                { id: 'fire-exit', label: 'Fire Exit' },
                { id: 'ppe-gloves', label: 'Safety Gloves' },
              ].map((ic) => (
                <button
                  key={ic.id}
                  onClick={() => setEditIcon(ic.id as any)}
                  className={`p-2 rounded-xl text-[11px] font-bold border transition-all text-center ${
                    editIcon === ic.id
                      ? 'bg-teal-50 border-[#0E7C86] text-[#0E7C86]'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {ic.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5 Language Rule Translations */}
          <div className="space-y-2 pt-1">
            <label className="text-xs font-black uppercase tracking-wider text-slate-600 block flex items-center justify-between">
              <span>One-Line Rule (All 5 Languages)</span>
              <span className="text-[10px] text-teal-700 font-bold lowercase">No jargon</span>
            </label>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {LANGUAGES.map((l) => (
                <div key={l.code} className="space-y-0.5">
                  <div className="text-[11px] font-bold text-slate-500 flex items-center justify-between">
                    <span>
                      {l.nativeName} ({l.englishName})
                    </span>
                    <button
                      onClick={() => setPreviewLanguage(l.code)}
                      className="text-[10px] text-[#0E7C86] font-bold hover:underline"
                    >
                      Preview on phone
                    </button>
                  </div>
                  <input
                    type="text"
                    value={editRules[l.code] || ''}
                    onChange={(e) => handleRuleChange(l.code, e.target.value)}
                    className="w-full p-2 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Audio Voice Script */}
          <div className="space-y-1 pt-1">
            <label className="text-xs font-black uppercase tracking-wider text-slate-600 block">
              Audio Script for Factory Speaker & IVR
            </label>
            <textarea
              value={editAudioScript}
              onChange={(e) => setEditAudioScript(e.target.value)}
              rows={2}
              className="w-full p-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500/30"
            />
          </div>

          {/* Bottom Publish Button */}
          <button
            data-demo-target="publish-card-btn"
            onClick={handlePublish}
            className="w-full py-3 bg-[#0E7C86] hover:bg-[#095E66] text-white font-extrabold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm btn-press"
          >
            <Send size={16} />
            <span>Publish Update to All Shift Phones</span>
          </button>
        </div>

        {/* Col 3: Live Phone Preview (4 cols) */}
        <div className="lg:col-span-4 bg-slate-100 rounded-3xl border border-slate-200 p-5 flex flex-col items-center">
          <div className="w-full flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <Eye size={14} className="text-[#0E7C86]" />
              <span>Live Phone Card Preview</span>
            </div>

            {/* Language preview selector */}
            <select
              value={previewLanguage}
              onChange={(e) => setPreviewLanguage(e.target.value as SupportedLanguage)}
              className="text-xs font-bold bg-white border border-slate-300 rounded-lg p-1 text-slate-700"
            >
              {LANGUAGES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.nativeName} ({l.englishName})
                </option>
              ))}
            </select>
          </div>

          {/* Phone Card Mockup Surface */}
          <div className="w-full max-w-[300px] bg-white rounded-3xl p-4 border-2 border-teal-200 shadow-md space-y-3">
            {/* Tag */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-red-700 bg-red-100 px-2 py-0.5 rounded-full">
                Safety Card
              </span>
              <span className="text-[10px] font-semibold text-slate-400">Unit 2</span>
            </div>

            {/* Pictogram rendering */}
            <div className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 shadow-inner">
              {renderIconComponent(editIcon)}
            </div>

            {/* One line in selected language */}
            <div className="p-2.5 bg-red-50/90 rounded-2xl border-l-4 border-red-600">
              <p className="text-sm font-black text-red-950 leading-snug">
                {editRules[previewLanguage] || editRules.en}
              </p>
            </div>

            {/* Audio player preview */}
            <AudioPlayer
              label={`Playing in ${LANGUAGES.find((l) => l.code === previewLanguage)?.nativeName}`}
              durationSeconds={4}
            />

            <div className="text-center pt-1">
              <span className="text-[10px] text-slate-400 font-semibold">
                Tap card to launch understanding check
              </span>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 font-medium text-center mt-3 max-w-xs">
            What workers see on their Android app and WhatsApp safety channel.
          </div>
        </div>
      </div>
    </div>
  );
};
