import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OverviewTab } from './OverviewTab';
import { HazardReportsTab } from './HazardReportsTab';
import { SafetyCardsTab } from './SafetyCardsTab';
import { ShieldHeadsetLogo } from '../pictograms';
import {
  LayoutDashboard,
  AlertOctagon,
  Layers,
  Building2,
  Calendar,
  Filter,
  CheckCircle,
  Sparkles,
} from 'lucide-react';

export const OfficerDashboard: React.FC = () => {
  const { dashboardTab, setDashboardTab } = useApp();
  const [selectedShiftFilter, setSelectedShiftFilter] = useState('All Shifts');
  const [targetCardId, setTargetCardId] = useState<string>('card-1');

  const handleNavigateToCardEdit = (topicId?: string) => {
    setTargetCardId(topicId === 'loto' ? 'card-1' : 'card-2');
    setDashboardTab('cards');
  };

  return (
    <div className="w-full min-h-screen bg-[#F6F4EF] text-[#14213D] flex flex-col antialiased">
      {/* Top Bar with Factory Name, Shift Filter, and Sample Data Badge */}
      <div className="bg-white border-b border-slate-200 px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 sticky top-12 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-teal-50 border border-teal-200">
            <Building2 size={22} className="text-[#0E7C86]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-[#14213D] tracking-tight">
                Sunrise Textiles, Unit 2
              </h1>
              <span className="text-[10px] font-black uppercase tracking-wider bg-teal-100 text-[#0E7C86] px-2 py-0.5 rounded-md">
                Safety Operations Center
              </span>
            </div>
            <p className="text-xs text-slate-500 font-semibold">
              Ahmedabad Weaving & Dyeing Complex • 1,240 On-Floor Operatives
            </p>
          </div>
        </div>

        {/* Shift Filter & Sample Data Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700">
            <Filter size={14} className="text-slate-500" />
            <select
              value={selectedShiftFilter}
              onChange={(e) => setSelectedShiftFilter(e.target.value)}
              className="bg-transparent focus:outline-hidden cursor-pointer"
            >
              <option value="All Shifts">All Shifts (24 hrs)</option>
              <option value="Night shift">Night shift (9 PM - 5 AM)</option>
              <option value="Day shift">Day shift (7 AM - 3 PM)</option>
              <option value="Evening shift">Evening shift (3 PM - 11 PM)</option>
            </select>
          </div>

          <span className="text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            Sample data
          </span>
        </div>
      </div>

      {/* Main Body with Sidebar + Tab Content */}
      <div className="max-w-[1400px] w-full mx-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 flex-1">
        {/* Left Sidebar Navigation (2 cols) */}
        <aside className="md:col-span-3 xl:col-span-2">
          <div className="bg-white rounded-3xl p-3 border border-slate-200 shadow-sm sticky top-32 space-y-1">
            <div className="px-3 py-2 text-[11px] font-black uppercase tracking-wider text-slate-400">
              Operations Menu
            </div>

            <button
              onClick={() => setDashboardTab('overview')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all text-left btn-press ${
                dashboardTab === 'overview'
                  ? 'bg-[#0E7C86] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard size={18} />
              <span>Overview</span>
            </button>

            <button
              data-demo-target="hazards-tab"
              onClick={() => setDashboardTab('hazards')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all text-left btn-press ${
                dashboardTab === 'hazards'
                  ? 'bg-[#0E7C86] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <AlertOctagon size={18} />
              <span>Hazard Reports</span>
            </button>

            <button
              data-demo-target="cards-tab"
              onClick={() => setDashboardTab('cards')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all text-left btn-press ${
                dashboardTab === 'cards'
                  ? 'bg-[#0E7C86] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Layers size={18} />
              <span>Safety Cards</span>
            </button>

            {/* Shift Briefing Summary Box in Sidebar */}
            <div className="mt-6 p-3.5 bg-teal-50/70 border border-teal-200 rounded-2xl space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#0E7C86] flex items-center gap-1">
                <Sparkles size={12} /> Shift Briefing
              </span>
              <p className="text-xs text-teal-950 font-bold leading-tight">
                Tonight's Focus: Lockout/Tagout for Loom maintenance.
              </p>
              <div className="text-[10px] text-slate-500 font-semibold">
                Voice audio broadcast sent to 340 worker WhatsApp/app feeds.
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area (10 cols) */}
        <main className="md:col-span-9 xl:col-span-10">
          {dashboardTab === 'overview' && (
            <OverviewTab onNavigateToCardEdit={handleNavigateToCardEdit} />
          )}
          {dashboardTab === 'hazards' && <HazardReportsTab />}
          {dashboardTab === 'cards' && <SafetyCardsTab initialCardId={targetCardId} />}
        </main>
      </div>
    </div>
  );
};
