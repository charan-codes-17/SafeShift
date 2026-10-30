import React, { createContext, useContext, useState, useMemo, useCallback, useRef, useEffect } from 'react';
import {
  SupportedLanguage,
  DemoView,
  WorkerScreen,
  WorkerTab,
  HazardReport,
  ReportStatus,
  SafetyCardItem,
  ConfusingTopic,
  UnderstandingMetrics,
  DashboardTab,
  QuizOverride,
  DemoTapIndicator,
  DemoStoryState,
} from '../types';
import {
  LANGUAGES,
  STRINGS,
  INITIAL_REPORTS,
  INITIAL_SAFETY_CARDS,
  INITIAL_CONFUSING_TOPICS,
  INITIAL_METRICS,
} from '../data';
import { DEMO_STEPS, TOTAL_DEMO_DURATION_MS } from '../components/demo/demoStoryData';

interface AppContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  currentView: DemoView;
  setCurrentView: (view: DemoView) => void;
  workerScreen: WorkerScreen;
  setWorkerScreen: (screen: WorkerScreen) => void;
  workerTab: WorkerTab;
  setWorkerTab: (tab: WorkerTab) => void;
  dashboardTab: DashboardTab;
  setDashboardTab: (tab: DashboardTab) => void;
  isVoiceActive: boolean;
  setIsVoiceActive: (active: boolean) => void;
  voiceStepOverride: 'listening' | 'transcribing' | 'buddy_answering' | 'done' | null;
  setVoiceStepOverride: (step: 'listening' | 'transcribing' | 'buddy_answering' | 'done' | null) => void;
  quizOverride: QuizOverride | null;
  setQuizOverride: (override: QuizOverride | null) => void;
  demoHighlight: string | null;
  setDemoHighlight: (highlight: string | null) => void;
  selectedReportId: string | null;
  setSelectedReportId: (id: string | null) => void;
  latestSubmittedReportId: string | null;
  setLatestSubmittedReportId: (id: string | null) => void;
  reports: HazardReport[];
  updateReportStatus: (id: string, newStatus: ReportStatus, notes?: string) => void;
  addHazardReport: (report: Partial<HazardReport>) => string;
  safetyCards: SafetyCardItem[];
  updateSafetyCard: (card: SafetyCardItem) => void;
  publishCardUpdate: (cardId: string) => void;
  metrics: UnderstandingMetrics;
  confusingTopics: ConfusingTopic[];
  recordUnderstandingResult: (isCorrect: boolean, topicId?: string) => void;
  resetDemo: () => void;
  t: (key: string) => string;
  getAudioPlayingLabel: () => string;
  // Demo Story Controls
  demoState: DemoStoryState;
  tapIndicator: DemoTapIndicator | null;
  setTapIndicator: (ind: DemoTapIndicator | null) => void;
  triggerFakeTap: (target: string | { x: number; y: number }, label?: string) => void;
  startDemo: () => void;
  stopDemo: () => void;
  pauseDemo: () => void;
  resumeDemo: () => void;
  nextDemoStep: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [currentView, setCurrentView] = useState<DemoView>('worker');
  const [workerScreen, setWorkerScreen] = useState<WorkerScreen>('splash');
  const [workerTab, setWorkerTab] = useState<WorkerTab>('chat');
  const [dashboardTab, setDashboardTab] = useState<DashboardTab>('overview');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [voiceStepOverride, setVoiceStepOverride] = useState<'listening' | 'transcribing' | 'buddy_answering' | 'done' | null>(null);
  const [quizOverride, setQuizOverride] = useState<QuizOverride | null>(null);
  const [demoHighlight, setDemoHighlight] = useState<string | null>(null);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [latestSubmittedReportId, setLatestSubmittedReportId] = useState<string | null>(null);

  const [reports, setReports] = useState<HazardReport[]>(() => JSON.parse(JSON.stringify(INITIAL_REPORTS)));
  const [safetyCards, setSafetyCards] = useState<SafetyCardItem[]>(() => JSON.parse(JSON.stringify(INITIAL_SAFETY_CARDS)));
  const [confusingTopics, setConfusingTopics] = useState<ConfusingTopic[]>(() => JSON.parse(JSON.stringify(INITIAL_CONFUSING_TOPICS)));
  const [metrics, setMetrics] = useState<UnderstandingMetrics>(() => JSON.parse(JSON.stringify(INITIAL_METRICS)));

  // Demo Story States
  const [demoState, setDemoState] = useState<DemoStoryState>({
    isRunning: false,
    isPaused: false,
    stepIndex: 0,
    progress: 0,
    caption: DEMO_STEPS[0].caption,
    isCompleted: false,
  });
  const [tapIndicator, setTapIndicator] = useState<DemoTapIndicator | null>(null);

  const stepTimeoutsRef = useRef<number[]>([]);
  const demoIntervalRef = useRef<number | null>(null);
  const stepElapsedMsRef = useRef<number>(0);
  const activeStepIndexRef = useRef<number>(0);
  const isDemoRunningRef = useRef<boolean>(false);
  const isDemoPausedRef = useRef<boolean>(false);

  // Keep refs in sync with state for timer interval
  activeStepIndexRef.current = demoState.stepIndex;
  isDemoRunningRef.current = demoState.isRunning;
  isDemoPausedRef.current = demoState.isPaused;

  // String lookup helper
  const t = useCallback(
    (key: string): string => {
      const entry = STRINGS[key];
      if (!entry) return key;
      return entry[language] || entry.en || key;
    },
    [language]
  );

  // Audio playing label in native language
  const getAudioPlayingLabel = useCallback((): string => {
    const langObj = LANGUAGES.find((l) => l.code === language);
    const nativeName = langObj ? langObj.nativeName : 'English';
    return `Playing in ${nativeName}`;
  }, [language]);

  // Update Hazard Report Status (Officer Dashboard -> Worker App Live Sync)
  const updateReportStatus = useCallback((id: string, newStatus: ReportStatus, notes?: string) => {
    setReports((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          return {
            ...r,
            status: newStatus,
            internalNotes: notes !== undefined ? notes : r.internalNotes,
            timeAgo: 'Just now',
          };
        }
        return r;
      })
    );
  }, []);

  // Worker submits a new hazard report
  const addHazardReport = useCallback((reportData: Partial<HazardReport>): string => {
    const nextNum = Math.floor(1235 + Math.random() * 80);
    const newId = `#${nextNum}`;
    const langObj = LANGUAGES.find((l) => l.code === language);
    const newReport: HazardReport = {
      id: newId,
      title: reportData.title || 'Voice hazard report in Zone B',
      area: reportData.area || 'Zone B',
      category: reportData.category || 'Safety Observation',
      language: reportData.language || (langObj ? langObj.englishName : 'Hindi'),
      isAnonymous: reportData.isAnonymous ?? true,
      status: 'Received',
      timeAgo: 'Just now',
      timestamp: 'Just now',
      hasAudio: reportData.hasAudio ?? true,
      audioDurationSeconds: reportData.audioDurationSeconds || 12,
      hasPhoto: reportData.hasPhoto ?? false,
      internalNotes: 'New anonymous hazard voice note received via SafeShift Buddy.',
      submittedBy: reportData.isAnonymous ? undefined : 'Worker (Direct)',
    };

    setReports((prev) => [newReport, ...prev]);
    setLatestSubmittedReportId(newId);
    return newId;
  }, [language]);

  // Edit safety card
  const updateSafetyCard = useCallback((updatedCard: SafetyCardItem) => {
    setSafetyCards((prev) => prev.map((c) => (c.id === updatedCard.id ? updatedCard : c)));
  }, []);

  // Officer clicks "Publish update" in Safety Cards view
  const publishCardUpdate = useCallback((cardId: string) => {
    setSafetyCards((prev) =>
      prev.map((c) =>
        c.id === cardId
          ? {
              ...c,
              lastUpdated: 'Just updated',
              understandingRate: 81,
            }
          : c
      )
    );

    // Update Lockout / Tagout metric in confusing topics and mark improved
    setConfusingTopics((prev) =>
      prev.map((t) => (t.id === 'loto' ? { ...t, understandingRate: 81, riskLevel: 'low' } : t))
    );

    setMetrics((prev) => ({
      ...prev,
      overallPercentage: 81,
      lockoutTagoutImproved: true,
      weeklyTrend: [...prev.weeklyTrend.slice(0, 7), 81],
    }));
  }, []);

  // Worker answers quiz or thumbs up/down -> live updates officer dashboard
  const recordUnderstandingResult = useCallback(
    (isCorrect: boolean, topicId: string = 'loto') => {
      setMetrics((prev) => {
        const newTotalTaken = prev.totalQuizzesTaken + 1;
        const newTotalCorrect = prev.totalCorrect + (isCorrect ? 1 : 0);
        const newOverall = isCorrect
          ? Math.min(99, prev.overallPercentage + 1)
          : Math.max(45, prev.overallPercentage - 1);

        const updatedByLang = prev.byLanguage.map((item) => {
          if (item.code === language) {
            const adjusted = isCorrect ? Math.min(99, item.rate + 3) : Math.max(40, item.rate - 3);
            return { ...item, rate: adjusted };
          }
          return item;
        });

        const updatedTrend = [...prev.weeklyTrend];
        updatedTrend[updatedTrend.length - 1] = isCorrect
          ? Math.min(95, updatedTrend[updatedTrend.length - 1] + 1)
          : Math.max(45, updatedTrend[updatedTrend.length - 1] - 1);

        return {
          ...prev,
          totalQuizzesTaken: newTotalTaken,
          totalCorrect: newTotalCorrect,
          overallPercentage: newOverall,
          byLanguage: updatedByLang,
          weeklyTrend: updatedTrend,
        };
      });

      if (topicId) {
        setConfusingTopics((prev) =>
          prev.map((t) => {
            if (t.id === topicId) {
              const delta = isCorrect ? 3 : -3;
              const newScore = Math.max(30, Math.min(95, t.understandingRate + delta));
              return {
                ...t,
                understandingRate: newScore,
                questionsCount: t.questionsCount + 1,
              };
            }
            return t;
          })
        );
      }
    },
    [language]
  );

  // Reset demo state to exact initial values
  const resetDemo = useCallback(() => {
    setLanguage('en');
    setCurrentView('worker');
    setWorkerScreen('splash');
    setWorkerTab('chat');
    setDashboardTab('overview');
    setIsVoiceActive(false);
    setVoiceStepOverride(null);
    setQuizOverride(null);
    setDemoHighlight(null);
    setSelectedReportId(null);
    setLatestSubmittedReportId(null);
    setTapIndicator(null);
    setReports(JSON.parse(JSON.stringify(INITIAL_REPORTS)));
    setSafetyCards(JSON.parse(JSON.stringify(INITIAL_SAFETY_CARDS)));
    setConfusingTopics(JSON.parse(JSON.stringify(INITIAL_CONFUSING_TOPICS)));
    setMetrics(JSON.parse(JSON.stringify(INITIAL_METRICS)));
  }, []);

  // Helper to trigger visual fake tap ripple indicator
  const triggerFakeTap = useCallback((target: string | { x: number; y: number }, label?: string) => {
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    if (typeof target === 'string') {
      const el = document.querySelector(`[data-demo-target="${target}"]`) || document.querySelector(target);
      if (el) {
        const rect = el.getBoundingClientRect();
        x = Math.round(rect.left + rect.width / 2);
        y = Math.round(rect.top + rect.height / 2);
      }
    } else {
      x = target.x;
      y = target.y;
    }

    setTapIndicator({ x, y, visible: true, label });
    const t = window.setTimeout(() => {
      setTapIndicator(null);
    }, 900);
    stepTimeoutsRef.current.push(t);
  }, []);

  // Clear all pending timeouts for step execution
  const clearStepTimeouts = useCallback(() => {
    stepTimeoutsRef.current.forEach((id) => clearTimeout(id));
    stepTimeoutsRef.current = [];
  }, []);

  // Helper to schedule action inside current step
  const scheduleStepAction = useCallback((delayMs: number, action: () => void) => {
    const id = window.setTimeout(() => {
      if (isDemoRunningRef.current) {
        action();
      }
    }, delayMs);
    stepTimeoutsRef.current.push(id);
  }, []);

  // Step Runner - executes real state actions for each step
  const executeStep = useCallback((stepIdx: number) => {
    clearStepTimeouts();
    stepElapsedMsRef.current = 0;

    const stepDef = DEMO_STEPS[stepIdx];
    if (!stepDef) return;

    setDemoState((prev) => ({
      ...prev,
      stepIndex: stepIdx,
      caption: stepDef.caption,
      isCompleted: stepIdx === 10,
    }));

    switch (stepIdx) {
      // 1. Worker App splash -> language picker. Select Hindi. "A worker picks their own language."
      case 0: {
        setCurrentView('worker');
        setWorkerScreen('splash');
        setWorkerTab('chat');
        setIsVoiceActive(false);
        setQuizOverride(null);
        setDemoHighlight(null);
        setSelectedReportId(null);

        // Tap Start button
        scheduleStepAction(1800, () => {
          triggerFakeTap('start-btn', 'Tap: Start / शुरू करें');
          setWorkerScreen('language');
        });

        // Tap Hindi language card
        scheduleStepAction(4200, () => {
          triggerFakeTap('hindi-lang', 'Tap: हिन्दी');
          setLanguage('hi');
        });

        // Tap Continue button
        scheduleStepAction(6200, () => {
          triggerFakeTap('continue-btn', 'Tap: Continue / आगे बढ़ें');
          setWorkerScreen('main');
          setWorkerTab('chat');
        });
        break;
      }

      // 2. Home -> the mic pulses -> listening -> Hindi question appears. "They ask a safety question by voice."
      case 1: {
        setCurrentView('worker');
        setWorkerScreen('main');
        setWorkerTab('chat');
        setIsVoiceActive(false);
        setLanguage('hi');

        // Tap pulsing mic button
        scheduleStepAction(1800, () => {
          triggerFakeTap('mic-hero', 'Tap: Mic');
          setIsVoiceActive(true);
          setVoiceStepOverride('listening');
        });

        // Transcribed question bubble appears in Hindi
        scheduleStepAction(4200, () => {
          setVoiceStepOverride('transcribing');
        });
        break;
      }

      // 3. Answer card with audio plays. "They get a picture, one rule and audio. No reading needed."
      case 2: {
        setCurrentView('worker');
        setWorkerScreen('main');
        setWorkerTab('chat');
        setIsVoiceActive(true);
        setVoiceStepOverride('done');
        setLanguage('hi');
        setQuizOverride(null);

        // Tap audio player button
        scheduleStepAction(1500, () => {
          triggerFakeTap('card-audio-btn', 'Tap: Audio rule');
        });
        break;
      }

      // 4. Quiz: tap the WRONG option first -> amber re-brief card. "If they didn't understand, Buddy explains again, simpler."
      case 3: {
        setCurrentView('worker');
        setWorkerScreen('main');
        setWorkerTab('chat');
        setIsVoiceActive(true);
        setVoiceStepOverride('done');
        setLanguage('hi');

        // Tap wrong option (Option A)
        scheduleStepAction(2000, () => {
          triggerFakeTap('quiz-option-a', 'Tap: Option A (Unsafe)');
          setQuizOverride({ selectedOption: 'A', answeredState: 'wrong' });
          recordUnderstandingResult(false, 'loto');
        });

        // Tap call supervisor demo button
        scheduleStepAction(5200, () => {
          triggerFakeTap('call-supervisor-btn', 'Tap: Call supervisor');
        });
        break;
      }

      // 5. Tap the correct option -> celebration. "Understanding is confirmed, not assumed."
      case 4: {
        setCurrentView('worker');
        setWorkerScreen('main');
        setWorkerTab('chat');
        setIsVoiceActive(true);
        setVoiceStepOverride('done');
        setLanguage('hi');

        // Tap correct option (Option B)
        scheduleStepAction(2000, () => {
          triggerFakeTap('quiz-option-b', 'Tap: Option B (Safe Lockout)');
          setQuizOverride({ selectedOption: 'B', answeredState: 'correct' });
          recordUnderstandingResult(true, 'loto');
        });
        break;
      }

      // 6. Reports tab -> anonymous toggle ON -> voice report -> submit -> tracker shows Received. "They can report hazards without their name."
      case 5: {
        setCurrentView('worker');
        setWorkerScreen('main');
        setIsVoiceActive(false);

        // Tap Reports Tab in bottom bar
        scheduleStepAction(600, () => {
          triggerFakeTap('reports-tab', 'Tap: Reports Tab');
          setWorkerTab('reports');
        });

        // Tap Submit Report button
        scheduleStepAction(3800, () => {
          triggerFakeTap('submit-report-btn', 'Tap: Submit Report');
          const newId = addHazardReport({
            title: 'Voice hazard report in Zone B (Loom gear check)',
            area: 'Zone B',
            category: 'Safety Observation',
            language: 'Hindi',
            isAnonymous: true,
            hasAudio: true,
            audioDurationSeconds: 12,
          });
          setLatestSubmittedReportId(newId);
        });
        break;
      }

      // 7. Switch to Officer Dashboard overview. "The safety officer sees what workers understood."
      case 6: {
        setCurrentView('dashboard');
        setDashboardTab('overview');
        setDemoHighlight(null);
        break;
      }

      // 8. Point out the "Needs re-briefing" tile (highlight ring) -> open Hazard Reports -> open the new report -> set status to Under review. "And acts on anonymous reports."
      case 7: {
        setCurrentView('dashboard');
        setDashboardTab('overview');
        // Point out "Needs re-briefing" tile with pulsating highlight ring
        setDemoHighlight('rebrief-tile');

        // Switch to Hazard Reports tab
        scheduleStepAction(3200, () => {
          setDemoHighlight(null);
          triggerFakeTap('hazards-tab', 'Tap: Hazard Reports');
          setDashboardTab('hazards');
        });

        // Set status of new report to Under review
        scheduleStepAction(5600, () => {
          triggerFakeTap('status-under-review', 'Tap: Under review');
          setReports((prev) => {
            if (prev.length === 0) return prev;
            const updated = [...prev];
            updated[0] = { ...updated[0], status: 'Under review', timeAgo: 'Just now' };
            return updated;
          });
        });
        break;
      }

      // 9. Switch back to the worker phone, showing the tracker at Under review. "The worker sees that someone is listening."
      case 8: {
        setCurrentView('worker');
        setWorkerScreen('main');
        setWorkerTab('reports');
        setIsVoiceActive(false);

        // Open status tracker modal showing Under review
        scheduleStepAction(800, () => {
          setReports((prev) => {
            const topId = prev[0]?.id || '#1248';
            setSelectedReportId(topId);
            return prev;
          });
        });
        break;
      }

      // 10. Dashboard -> Edit card -> Publish Update -> tile animates 54% -> 81%. "Fix the card. Watch confusion drop."
      case 9: {
        setSelectedReportId(null);
        setCurrentView('dashboard');
        setDashboardTab('cards');

        // Tap Publish Update on the card editor
        scheduleStepAction(3200, () => {
          triggerFakeTap('publish-card-btn', 'Tap: Publish Update');
          publishCardUpdate('card-1');
        });

        // Switch to Overview tab to watch tile improve 54% -> 81%
        scheduleStepAction(5000, () => {
          setDashboardTab('overview');
        });
        break;
      }

      // 11. End card: the tagline "Factories measure whether safety was told. SafeShift Buddy measures whether it was understood." with the app name.
      case 10: {
        setDemoState((prev) => ({
          ...prev,
          progress: 100,
          isCompleted: true,
        }));
        break;
      }

      default:
        break;
    }
  }, [
    clearStepTimeouts,
    scheduleStepAction,
    triggerFakeTap,
    resetDemo,
    addHazardReport,
    publishCardUpdate,
    recordUnderstandingResult,
  ]);

  // Main Demo Progress and Step Progression Loop
  useEffect(() => {
    if (!demoState.isRunning) {
      if (demoIntervalRef.current) {
        clearInterval(demoIntervalRef.current);
        demoIntervalRef.current = null;
      }
      return;
    }

    demoIntervalRef.current = window.setInterval(() => {
      if (isDemoPausedRef.current) return;

      const currentStepIdx = activeStepIndexRef.current;
      const stepDef = DEMO_STEPS[currentStepIdx];
      if (!stepDef) return;

      stepElapsedMsRef.current += 100;

      // Calculate total elapsed time across prior steps + current step
      let priorDuration = 0;
      for (let i = 0; i < currentStepIdx; i++) {
        priorDuration += DEMO_STEPS[i].durationMs;
      }
      const totalElapsed = Math.min(
        TOTAL_DEMO_DURATION_MS,
        priorDuration + stepElapsedMsRef.current
      );
      const overallProgress = (totalElapsed / TOTAL_DEMO_DURATION_MS) * 100;

      setDemoState((prev) => ({
        ...prev,
        progress: overallProgress,
      }));

      // Check if step completed
      if (stepElapsedMsRef.current >= stepDef.durationMs) {
        if (currentStepIdx < DEMO_STEPS.length - 1) {
          executeStep(currentStepIdx + 1);
        } else {
          // Finished all steps
          setDemoState((prev) => ({
            ...prev,
            progress: 100,
            isCompleted: true,
          }));
        }
      }
    }, 100);

    return () => {
      if (demoIntervalRef.current) {
        clearInterval(demoIntervalRef.current);
      }
    };
  }, [demoState.isRunning, executeStep]);

  // Demo Control API: startDemo
  const startDemo = useCallback(() => {
    clearStepTimeouts();
    resetDemo();

    setDemoState({
      isRunning: true,
      isPaused: false,
      stepIndex: 0,
      progress: 0,
      caption: DEMO_STEPS[0].caption,
      isCompleted: false,
    });

    executeStep(0);
  }, [clearStepTimeouts, resetDemo, executeStep]);

  // Demo Control API: stopDemo
  const stopDemo = useCallback(() => {
    clearStepTimeouts();
    if (demoIntervalRef.current) {
      clearInterval(demoIntervalRef.current);
      demoIntervalRef.current = null;
    }

    setDemoState({
      isRunning: false,
      isPaused: false,
      stepIndex: 0,
      progress: 0,
      caption: DEMO_STEPS[0].caption,
      isCompleted: false,
    });
    setTapIndicator(null);
    setDemoHighlight(null);
    setQuizOverride(null);
    setVoiceStepOverride(null);
  }, [clearStepTimeouts]);

  // Demo Control API: pauseDemo
  const pauseDemo = useCallback(() => {
    setDemoState((prev) => ({ ...prev, isPaused: true }));
  }, []);

  // Demo Control API: resumeDemo
  const resumeDemo = useCallback(() => {
    setDemoState((prev) => ({ ...prev, isPaused: false }));
  }, []);

  // Demo Control API: nextDemoStep (skipping)
  const nextDemoStep = useCallback(() => {
    const nextIdx = activeStepIndexRef.current + 1;
    if (nextIdx < DEMO_STEPS.length) {
      executeStep(nextIdx);
    } else {
      setDemoState((prev) => ({ ...prev, progress: 100, isCompleted: true }));
    }
  }, [executeStep]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      currentView,
      setCurrentView,
      workerScreen,
      setWorkerScreen,
      workerTab,
      setWorkerTab,
      dashboardTab,
      setDashboardTab,
      isVoiceActive,
      setIsVoiceActive,
      voiceStepOverride,
      setVoiceStepOverride,
      quizOverride,
      setQuizOverride,
      demoHighlight,
      setDemoHighlight,
      selectedReportId,
      setSelectedReportId,
      latestSubmittedReportId,
      setLatestSubmittedReportId,
      reports,
      updateReportStatus,
      addHazardReport,
      safetyCards,
      updateSafetyCard,
      publishCardUpdate,
      metrics,
      confusingTopics,
      recordUnderstandingResult,
      resetDemo,
      t,
      getAudioPlayingLabel,
      // Demo Story controls
      demoState,
      tapIndicator,
      setTapIndicator,
      triggerFakeTap,
      startDemo,
      stopDemo,
      pauseDemo,
      resumeDemo,
      nextDemoStep,
    }),
    [
      language,
      currentView,
      workerScreen,
      workerTab,
      dashboardTab,
      isVoiceActive,
      voiceStepOverride,
      quizOverride,
      demoHighlight,
      selectedReportId,
      latestSubmittedReportId,
      reports,
      updateReportStatus,
      addHazardReport,
      safetyCards,
      updateSafetyCard,
      publishCardUpdate,
      metrics,
      confusingTopics,
      recordUnderstandingResult,
      resetDemo,
      t,
      getAudioPlayingLabel,
      demoState,
      tapIndicator,
      triggerFakeTap,
      startDemo,
      stopDemo,
      pauseDemo,
      resumeDemo,
      nextDemoStep,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

