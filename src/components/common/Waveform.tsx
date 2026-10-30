import React from 'react';

interface WaveformProps {
  active?: boolean;
  barCount?: number;
  color?: string;
  className?: string;
}

export const Waveform: React.FC<WaveformProps> = ({
  active = true,
  barCount = 18,
  color = '#0E7C86',
  className = 'h-8 items-center gap-1',
}) => {
  // Pre-calculated heights for natural voice wave appearance
  const heights = [35, 60, 45, 80, 100, 70, 90, 50, 85, 95, 65, 75, 40, 85, 60, 45, 70, 30];

  return (
    <div className={`flex items-center justify-center ${className}`} aria-hidden="true">
      {Array.from({ length: barCount }).map((_, i) => {
        const heightPct = heights[i % heights.length];
        const animationDelay = `${(i * 0.08) % 1.2}s`;
        const animationDuration = `${0.6 + (i % 3) * 0.2}s`;

        return (
          <div
            key={i}
            className="w-1 rounded-full transition-all duration-200"
            style={{
              backgroundColor: color,
              height: active ? `${Math.max(15, heightPct)}%` : '20%',
              minHeight: '4px',
              animation: active ? `wave-bar ${animationDuration} ease-in-out infinite alternate` : 'none',
              animationDelay,
            }}
          />
        );
      })}
    </div>
  );
};
