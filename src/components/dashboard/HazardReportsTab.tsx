import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { HazardReport, ReportStatus } from '../../types';
import { Waveform } from '../common/Waveform';
import {
  Search,
  Filter,
  ShieldCheck,
  User,
  Volume2,
  Camera,
  Clock,
  MapPin,
  ChevronRight,
  X,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  MessageSquare,
} from 'lucide-react';

export const HazardReportsTab: React.FC = () => {
  const { reports, updateReportStatus } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedReport, setSelectedReport] = useState<HazardReport | null>(reports[0] || null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [notesText, setNotesText] = useState(selectedReport?.internalNotes || '');

  const filteredReports = reports.filter((r) => {
    if (filterStatus === 'All') return true;
    return r.status === filterStatus;
  });

  const handleSelectReport = (report: HazardReport) => {
    setSelectedReport(report);
    setNotesText(report.internalNotes || '');
    setIsPlayingAudio(false);
  };

  const handleStatusChange = (newStatus: ReportStatus) => {
    if (!selectedReport) return;
    updateReportStatus(selectedReport.id, newStatus, notesText);
    setSelectedReport({ ...selectedReport, status: newStatus, internalNotes: notesText });
  };

  const handleSaveNotes = () => {
    if (!selectedReport) return;
    updateReportStatus(selectedReport.id, selectedReport.status, notesText);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h3 className="text-xl font-black text-[#14213D] tracking-tight">
            Hazard Incident Reports
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Live stream of worker voice & photo hazards with anonymous protection
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          {['All', 'Received', 'Under review', 'Resolved'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterStatus === st
                  ? 'bg-white text-[#14213D] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Data Table + Side Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table View (8 cols on large) */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Hazard Description</th>
                  <th className="py-3 px-4">Area</th>
                  <th className="py-3 px-4">Media</th>
                  <th className="py-3 px-4">Source</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredReports.map((r) => {
                  const isSelected = selectedReport?.id === r.id;
                  const isResolved = r.status === 'Resolved';
                  const isReview = r.status === 'Under review';

                  return (
                    <tr
                      key={r.id}
                      onClick={() => handleSelectReport(r)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-teal-50/70' : 'hover:bg-slate-50/80'
                      }`}
                    >
                      <td className="py-3.5 px-4 font-black text-slate-900">
                        {r.id}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#14213D] max-w-[220px]">
                        <div className="truncate">{r.title}</div>
                        <div className="text-[11px] text-slate-400 font-normal">{r.category}</div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-600">
                        {r.area}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          {r.hasAudio && (
                            <span className="p-1 rounded bg-teal-100 text-[#0E7C86]" title="Voice recording attached">
                              <Volume2 size={13} />
                            </span>
                          )}
                          {r.hasPhoto && (
                            <span className="p-1 rounded bg-amber-100 text-amber-800" title="Photo snapshot attached">
                              <Camera size={13} />
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        {r.isAnonymous ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            <ShieldCheck size={11} /> Anonymous
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                            <User size={11} /> {r.submittedBy || 'Worker'}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
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
                      </td>
                      <td className="py-3.5 px-4 text-right text-[11px] text-slate-400 whitespace-nowrap">
                        {r.timeAgo}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 font-semibold flex items-center justify-between">
            <span>Showing {filteredReports.length} hazard observations</span>
            <span className="text-[#0E7C86]">Click row to open action drawer</span>
          </div>
        </div>

        {/* SIDE DRAWER (5 cols on large) */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-4 flex flex-col">
          {selectedReport ? (
            <>
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-[#14213D]">{selectedReport.id}</span>
                    <span className="text-xs font-bold text-slate-500">• {selectedReport.category}</span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium">Logged {selectedReport.timestamp}</p>
                </div>

                <span
                  className={`text-xs font-black uppercase px-2.5 py-1 rounded-full ${
                    selectedReport.status === 'Resolved'
                      ? 'bg-emerald-100 text-emerald-800'
                      : selectedReport.status === 'Under review'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {selectedReport.status}
                </span>
              </div>

              {/* Title & Location Card */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80 space-y-1.5">
                <h4 className="font-extrabold text-sm text-[#14213D]">{selectedReport.title}</h4>
                <div className="flex items-center gap-3 text-xs text-slate-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <MapPin size={12} className="text-teal-700" /> {selectedReport.area}
                  </span>
                  <span>Language: {selectedReport.language}</span>
                  {selectedReport.isAnonymous && (
                    <span className="text-emerald-700 flex items-center gap-0.5">
                      <ShieldCheck size={12} /> Confidential
                    </span>
                  )}
                </div>
              </div>

              {/* Media Attachments */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
                  Reported Evidence
                </span>

                {selectedReport.hasAudio && (
                  <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold text-teal-900">
                      <span className="flex items-center gap-1.5">
                        <Volume2 size={14} className="text-[#0E7C86]" />
                        Worker Voice Note ({selectedReport.audioDurationSeconds}s in {selectedReport.language})
                      </span>
                      <button
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className="text-xs font-bold text-[#0E7C86] underline"
                      >
                        {isPlayingAudio ? 'Pause' : 'Play'}
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className="w-9 h-9 rounded-full bg-[#0E7C86] text-white flex items-center justify-center shrink-0 shadow-xs"
                      >
                        {isPlayingAudio ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
                      </button>
                      <Waveform active={isPlayingAudio} barCount={18} color="#0E7C86" className="h-5 flex-1" />
                    </div>
                  </div>
                )}

                {selectedReport.hasPhoto && (
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-amber-200 border border-amber-300 flex items-center justify-center text-xl shrink-0 font-bold">
                      📸
                    </div>
                    <div>
                      <div className="text-xs font-bold text-amber-950">Photo Snapshot Attached</div>
                      <div className="text-[11px] text-amber-800">High-resolution frame logged from unit floor</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Status Selector (Updates Worker App in Real Time) */}
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 block">
                  Change Resolution Status (Syncs to Worker Phone)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Received', 'Under review', 'Resolved'] as ReportStatus[]).map((statusOption) => (
                    <button
                      key={statusOption}
                      data-demo-target={statusOption === 'Under review' ? 'status-under-review' : undefined}
                      onClick={() => handleStatusChange(statusOption)}
                      className={`py-2 px-2 rounded-xl text-xs font-black border transition-all ${
                        selectedReport.status === statusOption
                          ? 'bg-[#0E7C86] text-white border-[#0E7C86] shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {statusOption}
                    </button>
                  ))}
                </div>
              </div>

              {/* Internal Notes Box */}
              <div className="space-y-1.5 flex-1 flex flex-col">
                <label className="text-xs font-black uppercase tracking-wider text-slate-700 block flex items-center gap-1">
                  <MessageSquare size={12} /> Safety Officer Internal Notes
                </label>
                <textarea
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  placeholder="Add maintenance assignment notes, technician dispatch details, or parts requested..."
                  className="w-full flex-1 min-h-[90px] p-2.5 text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-teal-500/30"
                />
                <button
                  onClick={handleSaveNotes}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Save Internal Notes
                </button>
              </div>

              {/* Live sync tip */}
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-[11px] text-emerald-900 font-semibold flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-700 shrink-0" />
                <span>Status changes update the worker's 3-step tracker instantly.</span>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Select a hazard report from the table to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
