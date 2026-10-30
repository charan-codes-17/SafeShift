import React from 'react';
import { useApp } from '../../context/AppContext';
import { Mail, Search, CheckCircle2, X, AlertTriangle, ShieldCheck, Clock, MapPin, Volume2 } from 'lucide-react';
import { ReportStatus } from '../../types';

interface ReportDetailModalProps {
  reportId: string;
  onClose: () => void;
}

export const ReportDetailModal: React.FC<ReportDetailModalProps> = ({ reportId, onClose }) => {
  const { reports } = useApp();

  const report = reports.find((r) => r.id === reportId) || reports[0];

  const steps: { key: ReportStatus; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      key: 'Received',
      label: 'Received',
      icon: <Mail size={18} strokeWidth={2.5} />,
      desc: 'Logged securely into factory dashboard',
    },
    {
      key: 'Under review',
      label: 'Under review',
      icon: <Search size={18} strokeWidth={2.5} />,
      desc: 'Assigned to area supervisor & maintenance technician',
    },
    {
      key: 'Resolved',
      label: 'Resolved',
      icon: <CheckCircle2 size={18} strokeWidth={2.5} />,
      desc: 'Hazard fixed, verified and closed',
    },
  ];

  const getStepStatus = (stepKey: ReportStatus) => {
    const order: ReportStatus[] = ['Received', 'Under review', 'Resolved'];
    const currentIndex = order.indexOf(report.status);
    const stepIndex = order.indexOf(stepKey);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#14213D]/80 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div className="bg-[#F6F4EF] w-full max-w-sm rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-black text-[#14213D]">{report.id}</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                {report.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Live status tracker</p>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 min-h-[48px] min-w-[48px] rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 focus-visible:ring-2 focus-visible:ring-teal-500"
            aria-label="Close status tracker"
          >
            <X size={20} />
          </button>
        </div>

        {/* Hazard Summary Card */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <h4 className="font-extrabold text-base text-[#14213D]">{report.title}</h4>
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
              <MapPin size={12} className="text-teal-700" /> {report.area}
            </span>
            <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md">
              <Clock size={12} /> {report.timeAgo}
            </span>
            {report.isAnonymous && (
              <span className="flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-bold">
                <ShieldCheck size={12} /> Anonymous
              </span>
            )}
          </div>
        </div>

        {/* 3-Step Vertical Stepper */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h5 className="text-xs font-black uppercase tracking-wider text-slate-500">
            Resolution Progress
          </h5>

          <div className="space-y-4 relative">
            {steps.map((st, idx) => {
              const state = getStepStatus(st.key);
              const isLast = idx === steps.length - 1;

              return (
                <div key={st.key} className="flex items-start gap-3.5 relative">
                  {/* Connecting Line */}
                  {!isLast && (
                    <div
                      className={`absolute left-4 top-8 w-0.5 h-10 ${
                        state === 'completed' ? 'bg-emerald-500' : 'bg-slate-200'
                      }`}
                    />
                  )}

                  {/* Icon Circle */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 transition-all ${
                      state === 'completed'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : state === 'current'
                        ? 'bg-[#0E7C86] text-white ring-4 ring-teal-200 animate-pulse'
                        : 'bg-slate-100 text-slate-400 border border-slate-300'
                    }`}
                  >
                    {st.icon}
                  </div>

                  {/* Text details */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-black text-sm ${
                          state === 'current'
                            ? 'text-[#0E7C86]'
                            : state === 'completed'
                            ? 'text-emerald-800'
                            : 'text-slate-400'
                        }`}
                      >
                        {st.label}
                      </span>
                      {state === 'current' && (
                        <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-teal-100 text-teal-800">
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 font-medium mt-0.5">{st.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live sync note */}
        <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-teal-900 text-xs font-semibold flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal-600 animate-ping" />
          <span>Updates automatically when safety officer reviews this in dashboard.</span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-[#14213D] hover:bg-slate-800 text-white font-bold rounded-xl text-sm"
        >
          Back to reports
        </button>
      </div>
    </div>
  );
};
