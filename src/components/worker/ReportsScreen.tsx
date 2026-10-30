import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mic, Camera, ShieldCheck, Lock, CheckCircle2, ChevronRight, AlertOctagon, Volume2, Sparkles, MapPin } from 'lucide-react';
import { Waveform } from '../common/Waveform';
import { ReportDetailModal } from './ReportDetailModal';

export const ReportsScreen: React.FC = () => {
  const { t, reports, addHazardReport, selectedReportId, setSelectedReportId } = useApp();

  const [mode, setMode] = useState<'voice' | 'photo'>('voice');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [selectedZone, setSelectedZone] = useState('Zone B');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingRecorded, setRecordingRecorded] = useState(true); // pre-seeded so ready to submit
  const [photoSnapped, setPhotoSnapped] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const zones = ['Zone A', 'Zone B', 'Zone C', 'Warehouse'];

  const handleSubmit = () => {
    const newId = addHazardReport({
      title: mode === 'voice' ? 'Voice hazard report in ' + selectedZone : 'Machine photo hazard in ' + selectedZone,
      area: selectedZone,
      category: mode === 'voice' ? 'Safety Observation' : 'Physical Defect',
      language: 'Hindi',
      isAnonymous,
      hasAudio: mode === 'voice',
      audioDurationSeconds: 12,
      hasPhoto: mode === 'photo',
    });

    setSubmittedId(newId);
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
    setSubmittedId(null);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F6F4EF] text-[#14213D] p-4 pb-24 overflow-y-auto select-none space-y-4">
      {/* Detail Tracker Modal */}
      {selectedReportId && (
        <ReportDetailModal
          reportId={selectedReportId}
          onClose={() => setSelectedReportId(null)}
        />
      )}

      {/* Screen Title */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
        <div>
          <h2 className="text-2xl font-black text-[#14213D] tracking-tight">
            Report a Hazard
          </h2>
          <p className="text-xs text-slate-500 font-medium">Fast, visual & confidential</p>
        </div>
        <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full flex items-center gap-1">
          <AlertOctagon size={12} /> Priority
        </span>
      </div>

      {/* Submission Success Screen State */}
      {isSubmitted ? (
        <div className="bg-white border-2 border-emerald-500 rounded-[24px] p-6 text-center space-y-4 shadow-soft animate-fade-up">
          <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-600/30">
            <CheckCircle2 size={40} strokeWidth={2.5} />
          </div>

          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full tabular-nums">
              Report Logged: {submittedId}
            </span>
            <h3 className="text-2xl font-black text-[#14213D] mt-2">
              Hazard Received!
            </h3>
            <p className="text-sm text-slate-600 font-medium mt-1">
              Your safety officer and area maintenance team have been notified.
            </p>
          </div>

          {/* Quick open status tracker */}
          <button
            onClick={() => setSelectedReportId(submittedId)}
            className="w-full min-h-[52px] bg-[#0E7C86] hover:bg-[#095E66] btn-press text-white font-extrabold rounded-2xl text-sm flex items-center justify-center gap-2 shadow-soft"
          >
            <span>Track Resolution Progress</span>
            <ChevronRight size={16} />
          </button>

          <button
            onClick={handleResetForm}
            className="text-xs font-bold text-slate-500 underline hover:text-slate-700 min-h-[44px] flex items-center justify-center mx-auto"
          >
            Submit another report
          </button>
        </div>
      ) : (
        /* Form Card - 24px radius, generous padding */
        <div className="bg-white border border-slate-200/90 rounded-[24px] p-5 shadow-soft space-y-4.5 animate-fade-up">
          {/* Two Mode Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMode('voice')}
              className={`min-h-[74px] rounded-2xl flex flex-col items-center justify-center gap-1.5 font-black text-sm border-2 transition-all btn-press ${
                mode === 'voice'
                  ? 'bg-teal-50 border-[#0E7C86] text-[#0E7C86] shadow-xs ring-2 ring-teal-500/20'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
              }`}
              aria-label="Switch to voice report"
            >
              <Mic size={26} strokeWidth={2.5} />
              <span>Voice Report</span>
            </button>

            <button
              onClick={() => setMode('photo')}
              className={`min-h-[74px] rounded-2xl flex flex-col items-center justify-center gap-1.5 font-black text-sm border-2 transition-all btn-press ${
                mode === 'photo'
                  ? 'bg-amber-50 border-amber-600 text-amber-900 shadow-xs ring-2 ring-amber-500/20'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'
              }`}
              aria-label="Switch to photo report"
            >
              <Camera size={26} strokeWidth={2.5} />
              <span>Photo Report</span>
            </button>
          </div>

          {/* Anonymous Toggle (Masked figure / Lock icon) */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-slate-200 text-slate-800 flex items-center justify-center shrink-0">
                <Lock size={20} />
              </div>
              <div>
                <span className="text-sm font-extrabold text-[#14213D] block leading-relaxed">
                  {t('report_anon')}
                </span>
                <span className="text-[11px] text-slate-500 font-semibold block">
                  Your name is not shared with supervisors.
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsAnonymous(!isAnonymous)}
              className="min-h-[48px] min-w-[48px] flex items-center justify-center rounded-xl p-1"
              aria-label="Toggle anonymous reporting"
            >
              <div
                className={`w-13 h-7 rounded-full p-1 transition-colors ${
                  isAnonymous ? 'bg-[#0E7C86]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                    isAnonymous ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </div>
            </button>
          </div>

          {/* Zone Chips */}
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2 block flex items-center gap-1">
              <MapPin size={13} /> Select Factory Zone
            </label>
            <div className="flex flex-wrap gap-2">
              {zones.map((zone) => {
                const isSelected = selectedZone === zone;
                return (
                  <button
                    key={zone}
                    onClick={() => setSelectedZone(zone)}
                    className={`min-h-[48px] px-4.5 py-2.5 rounded-xl text-xs font-black transition-all border flex items-center justify-center btn-press ${
                      isSelected
                        ? 'bg-[#14213D] text-white border-[#14213D] shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                    aria-label={`Select ${zone}`}
                  >
                    {zone}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recording Simulation or Photo Preview */}
          {mode === 'voice' ? (
            <div className="p-4 bg-teal-50/80 rounded-2xl border border-teal-200/90 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-teal-900">
                <span className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  Voice Note Recorded (0:12)
                </span>
                <button
                  onClick={() => setIsRecording(!isRecording)}
                  className="min-h-[48px] px-3 flex items-center text-teal-700 underline text-xs font-bold"
                  aria-label={isRecording ? 'Stop recording voice note' : 'Re-record voice note'}
                >
                  {isRecording ? 'Stop' : 'Re-record'}
                </button>
              </div>
              <Waveform active={true} barCount={20} color="#0E7C86" className="h-7" />
            </div>
          ) : (
            <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200/90 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-11 h-11 rounded-xl bg-amber-200 flex items-center justify-center text-amber-900 font-bold text-lg">
                  📷
                </div>
                <div>
                  <span className="text-xs font-bold text-amber-950 block">Hazard photo attached</span>
                  <span className="text-[11px] text-amber-800">Broken guard on Loom #4</span>
                </div>
              </div>
              <button
                onClick={() => setPhotoSnapped(!photoSnapped)}
                className="min-h-[48px] px-3.5 py-2 text-xs font-bold text-amber-900 bg-white border border-amber-300 rounded-xl btn-press"
                aria-label="Retake photo"
              >
                Retake
              </button>
            </div>
          )}

          {/* Big Primary Submit Button - ONE clear primary hero action */}
          <button
            data-demo-target="submit-report-btn"
            onClick={handleSubmit}
            className="w-full min-h-[58px] bg-[#0E7C86] hover:bg-[#095E66] btn-press transition-all text-white font-extrabold text-lg rounded-[22px] flex items-center justify-center gap-2.5 shadow-glow-teal focus-visible:ring-3 focus-visible:ring-teal-400"
            aria-label="Submit Hazard Report"
          >
            <CheckCircle2 size={22} strokeWidth={2.5} />
            <span>Submit Report / रिपोर्ट भेजें</span>
          </button>
        </div>
      )}

      {/* Past Reports List */}
      <div className="space-y-2">
        <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 px-1">
          Recent Safety Reports (Tap to track)
        </h3>

        <div className="space-y-2">
          {reports.slice(0, 4).map((r) => {
            const isResolved = r.status === 'Resolved';
            const isReview = r.status === 'Under review';

            return (
              <button
                key={r.id}
                onClick={() => setSelectedReportId(r.id)}
                className="w-full bg-white p-3.5 rounded-2xl border border-slate-200 hover:border-teal-400 text-left transition-all flex items-center justify-between shadow-xs active:scale-[0.99] group"
              >
                <div className="space-y-1 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm text-[#14213D]">{r.id}</span>
                    <span
                      className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        isResolved
                          ? 'bg-emerald-100 text-emerald-800'
                          : isReview
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 line-clamp-1">{r.title}</p>
                  <div className="flex items-center gap-2 text-[10px] font-semibold text-slate-400">
                    <span>{r.area}</span>
                    <span>•</span>
                    <span>{r.timeAgo}</span>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-teal-50 flex items-center justify-center text-slate-400 group-hover:text-teal-700 shrink-0">
                  <ChevronRight size={16} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
