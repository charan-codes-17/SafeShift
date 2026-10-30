export interface DemoStepDefinition {
  id: number;
  caption: string;
  durationMs: number;
}

export const DEMO_STEPS: DemoStepDefinition[] = [
  {
    id: 1,
    caption: 'A worker picks their own language.',
    durationMs: 7500,
  },
  {
    id: 2,
    caption: 'They ask a safety question by voice.',
    durationMs: 7500,
  },
  {
    id: 3,
    caption: 'They get a picture, one rule and audio. No reading needed.',
    durationMs: 7500,
  },
  {
    id: 4,
    caption: "If they didn't understand, Buddy explains again, simpler.",
    durationMs: 7500,
  },
  {
    id: 5,
    caption: 'Understanding is confirmed, not assumed.',
    durationMs: 7500,
  },
  {
    id: 6,
    caption: 'They can report hazards without their name.',
    durationMs: 7500,
  },
  {
    id: 7,
    caption: 'The safety officer sees what workers understood.',
    durationMs: 7000,
  },
  {
    id: 8,
    caption: 'And acts on anonymous reports.',
    durationMs: 8500,
  },
  {
    id: 9,
    caption: 'The worker sees that someone is listening.',
    durationMs: 7500,
  },
  {
    id: 10,
    caption: 'Fix the card. Watch confusion drop.',
    durationMs: 8000,
  },
  {
    id: 11,
    caption: 'Factories measure whether safety was told. SafeShift Buddy measures whether it was understood.',
    durationMs: 8000,
  },
];

export const TOTAL_DEMO_DURATION_MS = DEMO_STEPS.reduce((sum, s) => sum + s.durationMs, 0);
