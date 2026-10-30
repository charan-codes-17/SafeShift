import React from 'react';
import { useApp } from '../../context/AppContext';
import { ConfusingTopic } from '../../types';
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Globe,
  ArrowUpRight,
  Sparkles,
  HelpCircle,
  Edit3,
} from 'lucide-react';

interface OverviewTabProps {
  onNavigateToCardEdit: (topicId?: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onNavigateToCardEdit }) => {
  const { metrics, confusingTopics, demoHighlight } = useApp();

  // SVG 8-Week Trend Line calculation
  const trendPoints = metrics.weeklyTrend;
  const minVal = 50;
  const maxVal = 90;
  const svgWidth = 360;
  const svgHeight = 90;

  const pointsString = trendPoints
    .map((val, idx) => {
      const x = (idx / (trendPoints.length - 1)) * (svgWidth - 40) + 20;
      const y = svgHeight - 15 - ((val - minVal) / (maxVal - minVal)) * (svgHeight - 30);
      return `${x},${y}`;
    })
    .join(' ');

  // Fill polygon for soft area under the curve
  const areaPoints = `${(0 / (trendPoints.length - 1)) * (svgWidth - 40) + 20},${svgHeight - 10} ${pointsString} ${
    ((trendPoints.length - 1) / (trendPoints.length - 1)) * (svgWidth - 40) + 20
  },${svgHeight - 10}`;

  return (
    <div className="space-y-6">
      {/* Top Re-briefing Alert Banner if Lockout/Tagout needs work */}
      <div className="grid grid-cols-12 gap-6">
        {/* Needs re-briefing tile */}
        <div
          data-demo-target="rebrief-tile"
          className={`col-span-12 rounded-[24px] p-5 md:p-6 border-2 transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-soft ${
            demoHighlight === 'rebrief-tile'
              ? 'ring-4 ring-amber-400 ring-offset-4 ring-offset-[#F6F4EF] shadow-2xl scale-[1.01]'
              : ''
          } ${
            metrics.lockoutTagoutImproved
              ? 'bg-emerald-50/90 border-emerald-400 text-emerald-950'
              : 'bg-amber-50/90 border-amber-400 text-amber-950'
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 shadow-xs ${
                metrics.lockoutTagoutImproved
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-500 text-white animate-bounce'
              }`}
            >
              {metrics.lockoutTagoutImproved ? (
                <CheckCircle2 size={28} strokeWidth={2.5} />
              ) : (
                <AlertTriangle size={28} strokeWidth={2.5} />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                    metrics.lockoutTagoutImproved
                      ? 'bg-emerald-200 text-emerald-900'
                      : 'bg-amber-200 text-amber-900'
                  }`}
                >
                  {metrics.lockoutTagoutImproved ? 'Rule Card Updated' : 'Needs Re-briefing'}
                </span>
                <span className="text-xs text-slate-500 font-bold tabular-nums">
                  {metrics.lockoutTagoutImproved
                    ? 'Understanding improved: 54% → 81%'
                    : 'Targeted Gap Identified'}
                </span>
              </div>

              <h4 className="text-lg md:text-xl font-black tracking-tight mt-1">
                {metrics.lockoutTagoutImproved
                  ? 'Understanding improved 54% -> 81%'
                  : 'Lockout/Tagout – Hindi, Night shift (54% understanding)'}
              </h4>
              <p className="text-xs md:text-sm text-slate-600 font-medium">
                {metrics.lockoutTagoutImproved
                  ? 'Updated pictogram with bold lock symbol was pushed to worker phones. Confirmed checks increased.'
                  : '46% of night shift workers confused machine idle switch with safety lockout.'}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={() => onNavigateToCardEdit('loto')}
              className={`min-h-[48px] px-5 py-2.5 rounded-xl font-black text-sm flex items-center gap-2 transition-all btn-press shadow-xs focus-visible:ring-2 focus-visible:ring-teal-500 ${
                metrics.lockoutTagoutImproved
                  ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                  : 'bg-amber-600 hover:bg-amber-700 text-white'
              }`}
              aria-label={metrics.lockoutTagoutImproved ? 'View Card in Editor' : 'Edit Card & Push Audio'}
            >
              <Edit3 size={18} />
              <span>{metrics.lockoutTagoutImproved ? 'View Card in Editor' : 'Edit Card & Push Audio'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* One-Line Key Insight Card Above Charts */}
      <div className="bg-amber-50/95 border border-amber-300 rounded-2xl px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3 text-xs sm:text-sm font-bold text-amber-950">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
          <span>Odia speakers on the night shift understand rules least. Re-brief Lockout/Tagout first.</span>
        </div>
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById('confusing-topics-section');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            } else {
              onNavigateToCardEdit('loto');
            }
          }}
          className="text-xs sm:text-sm font-extrabold text-[#0E7C86] hover:text-[#095E66] underline underline-offset-4 flex items-center gap-1 cursor-pointer transition-colors shrink-0"
        >
          <span>See affected topics</span>
          <ArrowUpRight size={14} />
        </button>
      </div>

      {/* Row 1: 12-Column Grid for Hero KPI (4 cols), Trend Line (5 cols), Shift (3 cols) */}
      <div className="grid grid-cols-12 gap-6">
        {/* HERO KPI CARD - subtle gradient tint, 24px radius, tabular numbers */}
        <div className="col-span-12 lg:col-span-4 bg-gradient-to-br from-teal-50/90 via-white to-white rounded-[24px] p-6 border-2 border-teal-500/25 shadow-soft relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-100/80 px-2.5 py-1 rounded-md">
                Core Safety Metric
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-0.5 tabular-nums">
                <ArrowUpRight size={14} /> +6% vs last month
              </span>
            </div>

            <div className="mt-5">
              <div className="text-5xl md:text-6xl font-black text-[#14213D] tracking-tight flex items-baseline gap-2 tabular-nums">
                {metrics.overallPercentage}%
                <span className="text-sm font-bold text-slate-500 tabular-nums">
                  ({metrics.totalCorrect} of {metrics.totalQuizzesTaken} verified)
                </span>
              </div>
              <h3 className="text-lg font-black text-[#0E7C86] mt-1.5">
                Understandings confirmed
              </h3>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-teal-100/60">
            <p className="text-xs text-slate-600 font-semibold leading-relaxed">
              &ldquo;Not signatures. Not attendance. <strong className="text-slate-900 font-extrabold">Actual understanding.</strong>&rdquo;
            </p>
          </div>
        </div>

        {/* 8-WEEK TREND LINE (SVG) - 5 cols */}
        <div className="col-span-12 lg:col-span-5 bg-white rounded-[24px] p-6 border border-slate-200/90 shadow-soft flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="text-sm font-black text-[#14213D] uppercase tracking-wider">
                8-Week Understanding Trend
              </h4>
              <p className="text-xs text-slate-500">Weekly pass rate across all factory units</p>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 text-xs font-extrabold">
              <TrendingUp size={16} />
              <span>Upward trajectory</span>
            </div>
          </div>

          {/* SVG Chart */}
          <div className="w-full h-32 my-auto flex items-center justify-center">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0E7C86" stopOpacity="0.30" />
                  <stop offset="100%" stopColor="#0E7C86" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="20" y1="20" x2={svgWidth - 20} y2="20" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="20" y1="50" x2={svgWidth - 20} y2="50" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="20" y1={svgHeight - 10} x2={svgWidth - 20} y2={svgHeight - 10} stroke="#E2E8F0" strokeWidth="1" />

              {/* Fill Area */}
              <polygon points={areaPoints} fill="url(#trendGradient)" />

              {/* Trend Polyline */}
              <polyline
                fill="none"
                stroke="#0E7C86"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={pointsString}
              />

              {/* Data points */}
              {trendPoints.map((val, idx) => {
                const x = (idx / (trendPoints.length - 1)) * (svgWidth - 40) + 20;
                const y = svgHeight - 15 - ((val - minVal) / (maxVal - minVal)) * (svgHeight - 30);
                const isLast = idx === trendPoints.length - 1;
                return (
                  <g key={idx}>
                    <circle
                      cx={x}
                      cy={y}
                      r={isLast ? 5.5 : 3.5}
                      fill={isLast ? '#0E7C86' : '#FFFFFF'}
                      stroke="#0E7C86"
                      strokeWidth={2}
                    />
                    {isLast && (
                      <text x={x} y={y - 8} fontSize="11" fontWeight="bold" fill="#0E7C86" textAnchor="middle" className="tabular-nums">
                        {val}%
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex justify-between text-[11px] text-slate-400 font-bold px-2 tabular-nums">
            <span>W1 (60%)</span>
            <span>W4 (66%)</span>
            <span className="text-[#0E7C86] font-extrabold">Current Week ({trendPoints[trendPoints.length - 1]}%)</span>
          </div>
        </div>

        {/* SHIFT PERFORMANCE TILES - 3 cols */}
        <div className="col-span-12 lg:col-span-3 bg-white rounded-[24px] p-6 border border-slate-200/90 shadow-soft flex flex-col justify-between space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-black text-[#14213D] uppercase tracking-wider">
              Shift Breakdown
            </h4>
            <Clock size={16} className="text-slate-400" />
          </div>

          <div className="space-y-3 my-auto">
            {metrics.byShift.map((s) => {
              const isHigh = s.rate >= 80;
              const isLow = s.rate < 70;

              return (
                <div key={s.shift} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-extrabold text-xs text-[#14213D]">{s.shift}</span>
                    <span
                      className={`text-xs font-black px-2 py-0.5 rounded-md tabular-nums ${
                        isHigh
                          ? 'bg-emerald-100 text-emerald-800'
                          : isLow
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {s.rate}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isHigh ? 'bg-emerald-600' : isLow ? 'bg-amber-500' : 'bg-blue-600'
                      }`}
                      style={{ width: `${s.rate}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold mt-1">{s.hours}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 2: 12-Column Grid for Bar Chart by Language (6 cols) & Most Confusing Topics (6 cols) */}
      <div className="grid grid-cols-12 gap-6">
        {/* BAR CHART BY LANGUAGE - 6 cols, color-coded: green at 80%+, amber at 65-79%, red below 65%, with text label on each bar */}
        <div className="col-span-12 lg:col-span-6 bg-white rounded-[24px] p-6 border border-slate-200/90 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-black text-[#14213D]">
                Understanding by Language
              </h4>
              <p className="text-xs text-slate-500">
                Identify migrant language groups needing clearer pictorial explanations
              </p>
            </div>
            <Globe size={20} className="text-[#0E7C86]" />
          </div>

          <div className="space-y-3.5 pt-2">
            {metrics.byLanguage.map((item) => {
              // Exact threshold requested: green at 80%+, amber at 65-79%, red below 65%
              const isGreen = item.rate >= 80;
              const isAmber = item.rate >= 65 && item.rate < 80;
              const isRed = item.rate < 65;

              const barColor = isGreen ? 'bg-emerald-600' : isAmber ? 'bg-amber-500' : 'bg-red-500';
              const badgeBg = isGreen
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : isAmber
                ? 'bg-amber-100 text-amber-800 border-amber-300'
                : 'bg-red-100 text-red-800 border-red-300';
              const statusLabel = isGreen
                ? 'Understood (≥80%)'
                : isAmber
                ? 'Review (65-79%)'
                : 'Action Needed (<65%)';

              return (
                <div key={item.language} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-900 font-extrabold text-sm">{item.language}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${badgeBg}`}>
                        {statusLabel}
                      </span>
                      <span className="font-mono text-slate-900 w-11 text-right font-black tabular-nums text-sm">
                        {item.rate}%
                      </span>
                    </div>
                  </div>

                  {/* Bar with inline text label */}
                  <div className="relative h-5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                    <div
                      className={`h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2 ${barColor}`}
                      style={{ width: `${item.rate}%` }}
                    >
                      {item.rate >= 25 && (
                        <span className="text-[10px] font-extrabold text-white leading-none tabular-nums drop-shadow-xs">
                          {item.rate}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-500 font-semibold pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="tabular-nums">Colour code: Green (≥80%) • Amber (65-79%) • Red (&lt;65%)</span>
            <span className="text-[#0E7C86] font-bold">5 Languages Tracked</span>
          </div>
        </div>

        {/* MOST CONFUSING TOPICS TABLE - 6 cols */}
        <div id="confusing-topics-section" className="col-span-12 lg:col-span-6 bg-white rounded-[24px] p-6 border border-slate-200/90 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-black text-[#14213D]">
                Most Confusing Safety Topics
              </h4>
              <p className="text-xs text-slate-500">
                Ranked by failure rate in worker quizzes & repeat voice queries
              </p>
            </div>
            <HelpCircle size={20} className="text-amber-600" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="py-2.5">Topic</th>
                  <th className="py-2.5">Understanding</th>
                  <th className="py-2.5">Questions</th>
                  <th className="py-2.5 text-right">Risk Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {confusingTopics.map((topic) => {
                  const isHigh = topic.riskLevel === 'high';
                  const isMedium = topic.riskLevel === 'medium';

                  return (
                    <tr key={topic.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 font-extrabold text-[#14213D]">
                        {topic.topic}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${
                                topic.understandingRate >= 80
                                  ? 'bg-emerald-600'
                                  : topic.understandingRate >= 65
                                  ? 'bg-amber-500'
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${topic.understandingRate}%` }}
                            />
                          </div>
                          <span className="font-bold text-xs tabular-nums">{topic.understandingRate}%</span>
                        </div>
                      </td>
                      <td className="py-3 font-bold text-slate-600 tabular-nums">
                        {topic.questionsCount}
                      </td>
                      <td className="py-3 text-right">
                        <span
                          className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                            isHigh
                              ? 'bg-red-100 text-red-800'
                              : isMedium
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {topic.riskLevel}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Overview Footnote */}
      <div className="pt-2 pb-1 text-center">
        <p className="text-[11px] text-slate-400 font-semibold tracking-wide">
          Illustrative figures for this prototype
        </p>
      </div>
    </div>
  );
};
