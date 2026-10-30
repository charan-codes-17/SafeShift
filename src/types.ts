export type SupportedLanguage = 'en' | 'hi' | 'bn' | 'or' | 'ta';

export interface LanguageInfo {
  code: SupportedLanguage;
  nativeName: string;
  englishName: string;
  sampleGreeting: string;
}

export type DemoView = 'worker' | 'chat' | 'missed_call' | 'dashboard';

export type WorkerTab = 'chat' | 'reports' | 'history' | 'profile';

export type WorkerScreen = 'splash' | 'language' | 'permissions' | 'main';

export type ReportStatus = 'Received' | 'Under review' | 'Resolved';

export interface HazardReport {
  id: string; // e.g. "#1234"
  title: string;
  area: string; // e.g. "Zone B", "Zone A", "Warehouse"
  category: string; // e.g. "Machine Guard", "Electrical", "Slip/Trip", "Chemical", "PPE"
  language: string; // e.g. "Hindi", "Bengali"
  isAnonymous: boolean;
  status: ReportStatus;
  timeAgo: string;
  timestamp: string;
  hasAudio: boolean;
  audioDurationSeconds: number;
  hasPhoto: boolean;
  internalNotes?: string;
  submittedBy?: string;
}

export interface SafetyCardItem {
  id: string;
  topic: string;
  iconName: 'machine-lockout' | 'machine-guard' | 'chemical' | 'fire-exit' | 'ppe-gloves' | 'hard-hat';
  ruleTranslations: Record<SupportedLanguage, string>;
  audioScript: string;
  languagesCoveredCount: number;
  lastUpdated: string;
  understandingRate: number; // percentage
}

export interface ConfusingTopic {
  id: string;
  topic: string;
  understandingRate: number; // percentage
  questionsCount: number;
  riskLevel: 'high' | 'medium' | 'low';
}

export interface UnderstandingMetrics {
  overallPercentage: number;
  previousMonthPercentage: number;
  weeklyTrend: number[]; // 8 weeks e.g. [62, 64, 65, 67, 69, 71, 72, 74]
  byLanguage: {
    language: string;
    code: SupportedLanguage;
    rate: number;
  }[];
  byShift: {
    shift: string;
    rate: number;
    hours: string;
  }[];
  totalQuizzesTaken: number;
  totalCorrect: number;
  lockoutTagoutImproved: boolean;
}

export type DashboardTab = 'overview' | 'hazards' | 'cards';

export interface QuizOverride {
  selectedOption: 'A' | 'B' | null;
  answeredState: 'idle' | 'correct' | 'wrong';
}

export interface DemoTapIndicator {
  x: number;
  y: number;
  visible: boolean;
  label?: string;
}

export interface DemoStoryState {
  isRunning: boolean;
  isPaused: boolean;
  stepIndex: number;
  progress: number;
  caption: string;
  isCompleted: boolean;
}
