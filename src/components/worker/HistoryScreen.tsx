import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, Volume2, RotateCcw } from 'lucide-react';
import { MachineLockout, HardHat, ChemicalLabel, FireExit, Gloves } from '../pictograms';

export const HistoryScreen: React.FC = () => {
  const { t, getAudioPlayingLabel } = useApp();

  const historyItems = [
    {
      id: 'h1',
      question: t('question'),
      rule: t('rule'),
      status: 'Understood' as const,
      time: 'Today, 10:14 PM',
      icon: <MachineLockout className="w-12 h-12" />,
    },
    {
      id: 'h2',
      question: 'Where is the emergency eyewash station for chemical spills?',
      rule: 'Eyewash is 10 steps left of the yellow safety shower in Bay 3.',
      status: 'Understood' as const,
      time: 'Yesterday, 04:30 PM',
      icon: <ChemicalLabel className="w-12 h-12" />,
    },
    {
      id: 'h3',
      question: 'Can I stack fabric rolls in front of fire exit doors?',
      rule: 'Never block fire exit paths. Keep 2 meters of clear clearance.',
      status: 'Re-listen' as const,
      time: '2 days ago',
      icon: <FireExit className="w-12 h-12" />,
    },
    {
      id: 'h4',
      question: 'Which gloves to wear for hot steam valve maintenance?',
      rule: 'Always wear silver aluminized thermal gloves for steam lines.',
      status: 'Understood' as const,
      time: '3 days ago',
      icon: <Gloves className="w-12 h-12" />,
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#F6F4EF] text-[#14213D] p-4 pb-24 overflow-y-auto select-none space-y-4">
      <div className="border-b border-slate-200 pb-2">
        <h2 className="text-2xl font-black text-[#14213D] tracking-tight">
          Safety History
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          Past voice questions & verified understanding checks
        </p>
      </div>

      {/* History Cards */}
      <div className="space-y-3.5 animate-fade-up delay-75">
        {historyItems.map((item) => {
          const isUnderstood = item.status === 'Understood';

          return (
            <div
              key={item.id}
              className="bg-white p-5 rounded-[24px] border border-slate-200/90 shadow-soft space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 tabular-nums">{item.time}</span>
                <span
                  className={`text-[11px] font-black uppercase px-3 py-0.5 rounded-full flex items-center gap-1 ${
                    isUnderstood
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {isUnderstood ? (
                    <>
                      <CheckCircle2 size={13} /> Understood
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={13} /> Re-listen
                    </>
                  )}
                </span>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="shrink-0 p-1.5 bg-slate-50 rounded-2xl border border-slate-100/90">
                  {item.icon}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-xs font-bold text-slate-500 line-clamp-1">
                    Q: &ldquo;{item.question}&rdquo;
                  </p>
                  <p className="text-sm font-extrabold text-[#14213D] leading-relaxed">
                    {item.rule}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                <button
                  className="min-h-[48px] px-3 text-xs font-black text-[#0E7C86] flex items-center gap-2 hover:bg-teal-50 btn-press focus-visible:ring-2 focus-visible:ring-teal-500 rounded-xl"
                  aria-label={`Listen in audio for: ${item.rule}`}
                >
                  <Volume2 size={16} />
                  <span>Listen in audio</span>
                </button>
                <span className="text-[10px] text-slate-400 font-semibold">Score logged on shift board</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
