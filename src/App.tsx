import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { DemoToolbar } from './components/common/DemoToolbar';
import { PhoneFrame } from './components/common/PhoneFrame';
import { WorkerApp } from './components/worker/WorkerApp';
import { ChatChannelView } from './components/chat/ChatChannelView';
import { MissedCallView } from './components/missedcall/MissedCallView';
import { OfficerDashboard } from './components/dashboard/OfficerDashboard';
import { DemoCaptionBar } from './components/demo/DemoCaptionBar';
import { FakeTapIndicator } from './components/demo/FakeTapIndicator';
import { DemoEndCard } from './components/demo/DemoEndCard';

function AppContent() {
  const { currentView } = useApp();

  return (
    <div className="min-h-screen bg-[#F6F4EF] flex flex-col antialiased selection:bg-teal-200 selection:text-teal-900 relative">
      {/* Top Demo Stage Navigation & Controls */}
      <DemoToolbar />

      {/* Main Presentation View */}
      <main className="flex-1 flex flex-col justify-center items-center p-2 sm:p-4 pb-20">
        {currentView === 'worker' && (
          <PhoneFrame headerTitle="SafeShift Worker App • Voice & Pictograms">
            <WorkerApp />
          </PhoneFrame>
        )}

        {currentView === 'chat' && (
          <PhoneFrame headerTitle="Chat channel (WhatsApp-style) • Familiar Messaging">
            <ChatChannelView />
          </PhoneFrame>
        )}

        {currentView === 'missed_call' && (
          <PhoneFrame headerTitle="Toll-free number (example) • 2G Feature Phones">
            <MissedCallView />
          </PhoneFrame>
        )}

        {currentView === 'dashboard' && (
          <div className="w-full">
            <OfficerDashboard />
          </div>
        )}
      </main>

      {/* Demo Mode Interactive Overlays */}
      <FakeTapIndicator />
      <DemoCaptionBar />
      <DemoEndCard />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

