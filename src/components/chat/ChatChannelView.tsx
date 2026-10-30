import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../data';
import { SupportedLanguage } from '../../types';
import { MachineLockout, MachineUnsafe } from '../pictograms';
import { Waveform } from '../common/Waveform';
import {
  Check,
  CheckCheck,
  Play,
  Pause,
  Mic,
  Send,
  MoreVertical,
  Phone,
  Video,
  ThumbsUp,
  ThumbsDown,
  Volume2,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

export const ChatChannelView: React.FC = () => {
  const { language, setLanguage, t, recordUnderstandingResult } = useApp();
  const [isPlayingWorkerAudio, setIsPlayingWorkerAudio] = useState(false);
  const [isPlayingBuddyAudio, setIsPlayingBuddyAudio] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<'got_it' | 'not_sure' | null>(null);

  const handleFeedback = (type: 'got_it' | 'not_sure') => {
    setFeedbackGiven(type);
    recordUnderstandingResult(type === 'got_it', 'loto');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#E5DDD5] text-[#111B21] select-none relative">
      {/* Top Green WhatsApp-Style Header */}
      <div className="bg-[#075E54] text-white px-3 py-2.5 flex items-center justify-between shadow-md shrink-0 z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-[#128C7E] border-2 border-white/20 flex items-center justify-center font-black text-sm text-white shadow-xs">
            SB
          </div>
          <div>
            <div className="flex items-center gap-1 font-bold text-base leading-tight">
              <span>SafeShift Buddy</span>
              {/* Verified Tick */}
              <div className="w-4 h-4 rounded-full bg-emerald-400 text-teal-950 flex items-center justify-center text-[9px] font-black">
                ✓
              </div>
            </div>
            <div className="text-[11px] text-teal-100 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Official Factory Safety Channel</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-white/90">
          <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10" aria-label="Video call">
            <Video size={18} />
          </button>
          <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10" aria-label="Voice call">
            <Phone size={18} />
          </button>
          <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10" aria-label="More options">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Reassurance Caption Chip */}
      <div className="bg-[#128C7E]/10 border-b border-[#128C7E]/20 py-1.5 px-4 text-center">
        <span className="text-[11px] font-bold text-[#075E54] inline-flex items-center gap-1">
          <ShieldCheck size={13} />
          Chat channel (WhatsApp-style) • Familiar messaging, zero app download
        </span>
      </div>

      {/* Messages Stream with Classic Wallpaper Backdrop */}
      <div
        className="flex-1 overflow-y-auto p-3 space-y-3"
        style={{
          backgroundColor: '#EFEAE2',
          backgroundImage: 'radial-gradient(#CBD5E1 0.75px, transparent 0.75px)',
          backgroundSize: '16px 16px',
        }}
      >
        {/* Encryption notice */}
        <div className="flex justify-center">
          <div className="bg-[#FFF8DD] text-[#54656F] text-[10px] font-semibold px-3 py-1 rounded-lg text-center shadow-2xs max-w-xs border border-amber-200/50">
            🔒 SafeShift factory channel is monitored by Sunrise Textiles Safety Committee.
          </div>
        </div>

        {/* 1. Quick-reply Language Menu */}
        <div className="bg-white rounded-2xl rounded-tl-xs p-3 max-w-[92%] shadow-xs space-y-2 border border-slate-200/60">
          <div className="text-xs font-bold text-[#075E54]">SafeShift Safety Bot</div>
          <p className="text-xs text-[#111B21] font-semibold leading-relaxed">
            Welcome to SafeShift! Choose your language to hear safety audio:
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`min-h-[48px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all border flex items-center justify-center ${
                  language === l.code
                    ? 'bg-[#075E54] text-white border-[#075E54] shadow-xs'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
                aria-label={`Switch language to ${l.englishName}`}
              >
                {l.nativeName}
              </button>
            ))}
          </div>

          <div className="text-right text-[9px] text-slate-400 font-semibold">10:11 PM</div>
        </div>

        {/* 2. Worker Voice-Note Bubble */}
        <div className="flex justify-end">
          <div className="bg-[#E7FFDB] rounded-2xl rounded-tr-xs p-3 max-w-[88%] shadow-xs space-y-2 border border-emerald-100">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlayingWorkerAudio(!isPlayingWorkerAudio)}
                className="w-12 h-12 min-h-[48px] min-w-[48px] rounded-full bg-[#075E54] text-white flex items-center justify-center shrink-0 shadow-xs focus-visible:ring-2 focus-visible:ring-emerald-700"
                aria-label={isPlayingWorkerAudio ? 'Pause worker voice note' : 'Play worker voice note'}
              >
                {isPlayingWorkerAudio ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
              </button>
              <div className="flex-1">
                <Waveform active={isPlayingWorkerAudio} barCount={16} color="#075E54" className="h-6" />
                <div className="h-1 w-full bg-emerald-300 rounded-full mt-1">
                  <div
                    className="h-full bg-[#075E54] rounded-full transition-all duration-300"
                    style={{ width: isPlayingWorkerAudio ? '80%' : '15%' }}
                  />
                </div>
              </div>
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-slate-300 overflow-hidden flex items-center justify-center text-xs font-bold text-slate-700">
                  👷
                </div>
                <Mic size={12} className="absolute -bottom-1 -right-1 text-[#075E54] bg-white rounded-full p-0.5" />
              </div>
            </div>

            <div className="text-[11px] font-bold text-slate-700 pt-1 border-t border-emerald-200/60 leading-relaxed">
              🎤 Voice message: &ldquo;{t('question')}&rdquo;
            </div>

            <div className="flex items-center justify-end gap-1 text-[9px] text-slate-500 font-semibold">
              <span>10:13 PM</span>
              <CheckCheck size={14} className="text-[#53BDEB]" />
            </div>
          </div>
        </div>

        {/* 3. Reply Voice-Note from SafeShift Buddy */}
        <div className="bg-white rounded-2xl rounded-tl-xs p-3 max-w-[88%] shadow-xs space-y-2 border border-slate-200/60">
          <div className="text-xs font-bold text-[#075E54] flex items-center gap-1">
            <Volume2 size={13} /> SafeShift Buddy Voice Answer
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlayingBuddyAudio(!isPlayingBuddyAudio)}
              className="w-12 h-12 min-h-[48px] min-w-[48px] rounded-full bg-[#075E54] text-white flex items-center justify-center shrink-0 shadow-xs focus-visible:ring-2 focus-visible:ring-emerald-700"
              aria-label={isPlayingBuddyAudio ? 'Pause safety bot voice note' : 'Play safety bot voice note'}
            >
              {isPlayingBuddyAudio ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
            </button>
            <div className="flex-1">
              <Waveform active={isPlayingBuddyAudio} barCount={16} color="#075E54" className="h-6" />
              <div className="h-1 w-full bg-slate-200 rounded-full mt-1">
                <div
                  className="h-full bg-[#075E54] rounded-full transition-all duration-300"
                  style={{ width: isPlayingBuddyAudio ? '90%' : '25%' }}
                />
              </div>
            </div>
            <span className="text-[10px] font-mono text-slate-500">0:04</span>
          </div>

          <div className="text-right text-[9px] text-slate-400 font-semibold">10:14 PM</div>
        </div>

        {/* 4. Pictogram Card Image Bubble with Caption and Rule */}
        <div className="bg-white rounded-2xl rounded-tl-xs p-2.5 max-w-[92%] shadow-xs space-y-2 border border-slate-200/60">
          <div className="rounded-xl overflow-hidden border border-slate-200">
            <MachineLockout className="w-full h-32" />
          </div>

          <div className="p-1 space-y-1">
            <span className="text-[10px] font-black uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded">
              Rule Card
            </span>
            <p className="text-sm font-extrabold text-[#111B21] leading-relaxed">
              {t('rule')}
            </p>
          </div>

          {/* Quick-reply buttons */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <span className="text-[10px] font-bold text-slate-500 block">
              Confirm your understanding:
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => handleFeedback('got_it')}
                className={`flex-1 min-h-[48px] py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                  feedbackGiven === 'got_it'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                }`}
                aria-label="I got it"
              >
                <ThumbsUp size={16} />
                <span>👍 I got it</span>
              </button>

              <button
                onClick={() => handleFeedback('not_sure')}
                className={`flex-1 min-h-[48px] py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all ${
                  feedbackGiven === 'not_sure'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100'
                }`}
                aria-label="I am not sure"
              >
                <ThumbsDown size={16} />
                <span>👎 I'm not sure</span>
              </button>
            </div>

            {feedbackGiven && (
              <div className="text-[11px] font-bold text-center text-teal-800 bg-teal-50 py-1 rounded-lg">
                {feedbackGiven === 'got_it'
                  ? '✅ Understood recorded for your shift.'
                  : '⚠️ Supervisor notified to brief you at shift start.'}
              </div>
            )}
          </div>

          <div className="text-right text-[9px] text-slate-400 font-semibold">10:14 PM</div>
        </div>
      </div>

      {/* Bottom Simulated Input Bar */}
      <div className="p-2 bg-[#F0F2F5] border-t border-slate-200 flex items-center gap-2 shrink-0">
        <div className="flex-1 bg-white rounded-full px-4 py-2 text-xs text-slate-400 flex items-center justify-between border border-slate-200 shadow-2xs">
          <span>Message SafeShift Buddy...</span>
          <span className="text-[10px] text-slate-400 font-mono">EN / HI</span>
        </div>
        <button
          className="w-12 h-12 min-h-[48px] min-w-[48px] rounded-full bg-[#075E54] text-white flex items-center justify-center shrink-0 shadow-sm hover:bg-[#064E46]"
          aria-label="Send voice message"
        >
          <Mic size={20} />
        </button>
      </div>
    </div>
  );
};
