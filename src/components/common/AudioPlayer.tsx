import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import { Waveform } from './Waveform';

interface AudioPlayerProps {
  label?: string;
  durationSeconds?: number;
  autoPlay?: boolean;
  className?: string;
  variant?: 'compact' | 'full' | 'bubble';
  color?: string;
  onFinished?: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  label = 'Listen',
  durationSeconds = 4,
  autoPlay = false,
  className = '',
  variant = 'full',
  color = '#0E7C86',
  onFinished,
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0); // 0 to 100
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying) {
      const stepMs = 50;
      const totalSteps = (durationSeconds * 1000) / stepMs;
      const increment = 100 / totalSteps;

      timerRef.current = window.setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            if (timerRef.current) clearInterval(timerRef.current);
            if (onFinished) onFinished();
            return 100;
          }
          return prev + increment;
        });
      }, stepMs);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, durationSeconds, onFinished]);

  const togglePlay = () => {
    if (progress >= 100) {
      setProgress(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const currentSeconds = Math.min(
    durationSeconds,
    Math.floor((progress / 100) * durationSeconds)
  );

  if (variant === 'compact') {
    return (
      <button
        onClick={togglePlay}
        className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-teal-50 border border-teal-200 text-[#0E7C86] font-semibold hover:bg-teal-100 transition-all active:scale-95 ${className}`}
        aria-label={isPlaying ? 'Pause audio' : 'Play audio instruction'}
      >
        {isPlaying ? <Pause size={18} className="fill-[#0E7C86]" /> : <Play size={18} className="fill-[#0E7C86]" />}
        <span className="text-sm font-medium">{label}</span>
      </button>
    );
  }

  if (variant === 'bubble') {
    return (
      <div className={`flex items-center gap-3 bg-teal-800 text-white p-3 rounded-2xl ${className}`}>
        <button
          onClick={togglePlay}
          className="w-10 h-10 rounded-full bg-white text-teal-800 flex items-center justify-center shrink-0 hover:bg-teal-50 shadow-sm active:scale-95"
          aria-label={isPlaying ? 'Pause voice message' : 'Play voice message'}
        >
          {isPlaying ? <Pause size={20} className="fill-teal-800" /> : <Play size={20} className="fill-teal-800 ml-0.5" />}
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs text-teal-100 mb-1">
            <span className="font-medium flex items-center gap-1">
              <Volume2 size={13} /> {label}
            </span>
            <span className="font-mono">
              0:0{currentSeconds} / 0:0{durationSeconds}
            </span>
          </div>
          {/* Progress bar with waveform overlay */}
          <div className="h-2 w-full bg-teal-950/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-300 transition-all duration-75 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 bg-teal-50/90 rounded-[20px] shadow-soft border border-teal-200/60 ${className}`}>
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0E7C86] animate-pulse" />
          <span className="text-xs font-black uppercase tracking-wider text-teal-950">{label}</span>
        </div>
        <span className="text-xs font-mono tabular-nums font-extrabold text-[#0E7C86] bg-teal-100/90 px-2 py-0.5 rounded-md">
          0:0{currentSeconds} / 0:0{durationSeconds}
        </span>
      </div>

      <div className="flex items-center gap-3.5">
        <button
          onClick={togglePlay}
          className="w-14 h-14 min-h-[56px] min-w-[56px] rounded-2xl bg-[#0E7C86] hover:bg-[#095E66] text-white flex items-center justify-center shrink-0 shadow-md transition-all active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-teal-600 cursor-pointer"
          aria-label={isPlaying ? 'Pause simulated audio' : 'Play simulated safety audio'}
        >
          {isPlaying ? (
            <Pause size={24} className="fill-white" />
          ) : progress >= 100 ? (
            <RotateCcw size={22} />
          ) : (
            <Play size={24} className="fill-white ml-0.5" />
          )}
        </button>

        <div className="flex-1 space-y-2">
          <Waveform active={isPlaying} barCount={20} color={color} className="h-7" />
          <div className="h-2.5 w-full bg-teal-200/70 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-linear-to-r from-[#0E7C86] to-teal-500 rounded-full transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
