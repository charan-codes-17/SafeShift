import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SplashScreen } from './SplashScreen';
import { LanguagePickerScreen } from './LanguagePickerScreen';
import { PermissionsScreen } from './PermissionsScreen';
import { HomeScreen } from './HomeScreen';
import { VoiceQAScreen } from './VoiceQAScreen';
import { ReportsScreen } from './ReportsScreen';
import { HistoryScreen } from './HistoryScreen';
import { ProfileScreen } from './ProfileScreen';
import { MessageSquare, AlertOctagon, History, User } from 'lucide-react';
import { WorkerTab } from '../../types';

export const WorkerApp: React.FC = () => {
  const { workerScreen, workerTab, setWorkerTab, isVoiceActive, setIsVoiceActive } = useApp();

  if (workerScreen === 'splash') {
    return <SplashScreen />;
  }

  if (workerScreen === 'language') {
    return <LanguagePickerScreen />;
  }

  if (workerScreen === 'permissions') {
    return <PermissionsScreen />;
  }

  const tabs: { id: WorkerTab; label: string; icon: React.ReactNode; demoTarget?: string }[] = [
    { id: 'chat', label: 'Chat', icon: <MessageSquare size={22} />, demoTarget: 'chat-tab' },
    { id: 'reports', label: 'Reports', icon: <AlertOctagon size={22} />, demoTarget: 'reports-tab' },
    { id: 'history', label: 'History', icon: <History size={22} />, demoTarget: 'history-tab' },
    { id: 'profile', label: 'Profile', icon: <User size={22} />, demoTarget: 'profile-tab' },
  ];

  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-[#F6F4EF]">
      {/* Tab Screen Content */}
      <div className="flex-1 overflow-y-auto">
        {workerTab === 'chat' && (
          isVoiceActive ? (
            <VoiceQAScreen onClose={() => setIsVoiceActive(false)} />
          ) : (
            <HomeScreen onStartVoice={() => setIsVoiceActive(true)} />
          )
        )}
        {workerTab === 'reports' && <ReportsScreen />}
        {workerTab === 'history' && <HistoryScreen />}
        {workerTab === 'profile' && <ProfileScreen />}
      </div>

      {/* Bottom Tab Bar (Touch targets >= 56px, high contrast, clean icons) */}
      <nav
        className="absolute bottom-0 inset-x-0 h-16 bg-white border-t border-slate-200 px-3 flex items-center justify-around z-30 shadow-lg select-none"
        aria-label="Worker app navigation"
      >
        {tabs.map((tab) => {
          const isActive = workerTab === tab.id;
          return (
            <button
              key={tab.id}
              data-demo-target={tab.demoTarget}
              onClick={() => {
                setWorkerTab(tab.id);
                if (tab.id === 'chat') {
                  // Keep whatever sub-state or reset voice
                }
              }}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all active:scale-95 ${
                isActive ? 'text-[#0E7C86] font-black' : 'text-slate-400 hover:text-slate-600 font-semibold'
              }`}
              aria-label={tab.label}
              aria-pressed={isActive}
            >
              <div className={`p-1 rounded-xl transition-all ${isActive ? 'bg-teal-50' : ''}`}>
                {tab.icon}
              </div>
              <span className="text-[10px] tracking-tight">{tab.label}</span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#0E7C86] mt-0.5" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
