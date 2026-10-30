import React from 'react';

// Friendly Worker Illustration with Safety Vest and Headset
export const WorkerAvatar: React.FC<{ className?: string }> = ({ className = 'w-32 h-32' }) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Factory worker wearing safety gear and voice headset"
  >
    {/* Soft backdrop circle */}
    <circle cx="100" cy="100" r="92" fill="#E8F4F5" />
    <circle cx="100" cy="100" r="88" stroke="#0E7C86" strokeWidth="3" strokeDasharray="6 6" />

    {/* Body / High-visibility Safety Vest */}
    <path
      d="M48 180C48 152 70 140 100 140C130 140 152 152 152 180"
      fill="#F59E0B"
      stroke="#14213D"
      strokeWidth="4"
      strokeLinejoin="round"
    />
    {/* Silver retro-reflective stripes */}
    <path d="M72 144V180" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
    <path d="M128 144V180" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
    <path d="M56 168H144" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />

    {/* Neck */}
    <rect x="88" y="118" width="24" height="26" rx="4" fill="#E5A885" stroke="#14213D" strokeWidth="3" />

    {/* Head */}
    <circle cx="100" cy="94" r="32" fill="#E5A885" stroke="#14213D" strokeWidth="4" />

    {/* Friendly Face */}
    {/* Eyes */}
    <circle cx="88" cy="92" r="3.5" fill="#14213D" />
    <circle cx="112" cy="92" r="3.5" fill="#14213D" />
    <path d="M84 84C87 82 91 82 94 84" stroke="#14213D" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M106 84C109 82 113 82 116 84" stroke="#14213D" strokeWidth="2.5" strokeLinecap="round" />
    {/* Warm Smile */}
    <path d="M91 106C96 112 104 112 109 106" stroke="#14213D" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M80 98C82 101 84 101 85 98" stroke="#E5A885" strokeWidth="2" />
    <path d="M115 98C116 101 118 101 120 98" stroke="#E5A885" strokeWidth="2" />

    {/* Yellow Industrial Hard Hat */}
    <path
      d="M66 84C66 56 82 48 100 48C118 48 134 56 134 84H66Z"
      fill="#FACC15"
      stroke="#14213D"
      strokeWidth="4"
    />
    <path d="M60 84C60 82 140 82 140 84C140 86 60 86 60 84Z" fill="#EAB308" stroke="#14213D" strokeWidth="3" />
    <rect x="94" y="44" width="12" height="14" rx="2" fill="#CA8A04" stroke="#14213D" strokeWidth="2" />

    {/* Voice Headset */}
    <path d="M68 88C68 64 80 58 100 58C120 58 132 64 132 88" stroke="#0E7C86" strokeWidth="4.5" fill="none" />
    {/* Earpad left */}
    <rect x="62" y="82" width="10" height="20" rx="4" fill="#0E7C86" stroke="#14213D" strokeWidth="3" />
    {/* Earpad right */}
    <rect x="128" y="82" width="10" height="20" rx="4" fill="#0E7C86" stroke="#14213D" strokeWidth="3" />
    {/* Microphone boom to mouth */}
    <path d="M70 96C70 114 84 118 95 116" stroke="#0E7C86" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <circle cx="97" cy="116" r="4.5" fill="#0E7C86" stroke="#14213D" strokeWidth="2" />
  </svg>
);

// App Logo: Shield + Headset
export const ShieldHeadsetLogo: React.FC<{ className?: string; size?: number }> = ({ className = 'w-10 h-10', size }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={size ? { width: size, height: size } : undefined}
    role="img"
    aria-label="SafeShift Buddy Logo"
  >
    {/* Protective Shield */}
    <path
      d="M24 4L9 10.5V22C9 32.5 15.5 41 24 44C32.5 41 39 32.5 39 22V10.5L24 4Z"
      fill="#0E7C86"
      stroke="#09535A"
      strokeWidth="2.5"
      strokeLinejoin="round"
    />
    {/* Inner soft shield highlight */}
    <path
      d="M24 7L12 12V22C12 30.5 17 37.8 24 40.5C31 37.8 36 30.5 36 22V12L24 7Z"
      fill="#1295A2"
    />
    {/* Voice Headset on Shield */}
    <path
      d="M17 21C17 17.134 20.134 14 24 14C27.866 14 31 17.134 31 21V25"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <rect x="15.5" y="21" width="3" height="7" rx="1.5" fill="#FFFFFF" />
    <rect x="29.5" y="21" width="3" height="7" rx="1.5" fill="#FFFFFF" />
    <path
      d="M17 26C17 30 20 31.5 23 31.5"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="24.5" cy="31.5" r="2" fill="#FACC15" />
  </svg>
);

// OPTION A / UNSAFE: Hand reaching into running machine (Red X + Danger)
export const MachineUnsafe: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => (
  <svg
    viewBox="0 0 280 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Unsafe: Hand reaching into moving machine rollers while running"
  >
    {/* Background Container */}
    <rect width="280" height="180" rx="16" fill="#FEE2E2" stroke="#EF4444" strokeWidth="3" />

    {/* Machine Housing */}
    <rect x="30" y="40" width="130" height="100" rx="10" fill="#334155" stroke="#0F172A" strokeWidth="4" />
    <rect x="42" y="52" width="106" height="76" rx="6" fill="#1E293B" />

    {/* Spinning Gear 1 (Upper) */}
    <g transform="translate(75, 80)">
      <circle cx="0" cy="0" r="22" fill="#94A3B8" stroke="#0F172A" strokeWidth="3" />
      <circle cx="0" cy="0" r="9" fill="#334155" />
      {/* Teeth */}
      <rect x="-4" y="-27" width="8" height="8" rx="2" fill="#0F172A" />
      <rect x="-4" y="19" width="8" height="8" rx="2" fill="#0F172A" />
      <rect x="-27" y="-4" width="8" height="8" rx="2" fill="#0F172A" />
      <rect x="19" y="-4" width="8" height="8" rx="2" fill="#0F172A" />
      {/* Motion sparks/arrows */}
      <path d="M-16 -18C-8 -26 8 -26 16 -18" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <path d="M14 -22L17 -18L13 -15" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
    </g>

    {/* Spinning Gear 2 (Lower) */}
    <g transform="translate(115, 100)">
      <circle cx="0" cy="0" r="18" fill="#CBD5E1" stroke="#0F172A" strokeWidth="3" />
      <circle cx="0" cy="0" r="7" fill="#334155" />
      <rect x="-3" y="-22" width="6" height="7" rx="1.5" fill="#0F172A" />
      <rect x="-3" y="15" width="6" height="7" rx="1.5" fill="#0F172A" />
      <rect x="-22" y="-3" width="7" height="6" rx="1.5" fill="#0F172A" />
      <rect x="15" y="-3" width="7" height="6" rx="1.5" fill="#0F172A" />
    </g>

    {/* Machine Power ON LED (Bright Green + Flash) */}
    <circle cx="50" cy="52" r="5" fill="#22C55E" />
    <circle cx="50" cy="52" r="9" stroke="#22C55E" strokeWidth="2" strokeDasharray="2 3" />
    <text x="60" y="55" fill="#22C55E" fontSize="9" fontWeight="bold">RUNNING</text>

    {/* Human Arm & Hand Reaching In */}
    <g transform="translate(140, 60)">
      {/* Bare Arm */}
      <path
        d="M80 65C60 62 40 50 18 36"
        stroke="#E5A885"
        strokeWidth="20"
        strokeLinecap="round"
      />
      {/* Palm & Fingers near nip point */}
      <path
        d="M20 37C12 33 2 30 -6 32"
        stroke="#E5A885"
        strokeWidth="14"
        strokeLinecap="round"
      />
      {/* Fingers reaching into pinch zone */}
      <path d="M-6 32L-18 30" stroke="#E5A885" strokeWidth="4" strokeLinecap="round" />
      <path d="M-6 34L-17 36" stroke="#E5A885" strokeWidth="4" strokeLinecap="round" />
      <path d="M-5 36L-14 42" stroke="#E5A885" strokeWidth="4" strokeLinecap="round" />
    </g>

    {/* Bold Red Danger Slash / Cross */}
    <circle cx="225" cy="55" r="32" fill="#DC2626" />
    <path d="M212 42L238 68" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />
    <path d="M238 42L212 68" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />

    {/* Bottom Danger Banner */}
    <rect x="20" y="148" width="240" height="24" rx="6" fill="#DC2626" />
    <text x="140" y="165" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle">
      ❌ UNSAFE: Machine running
    </text>
  </svg>
);

// OPTION B / SAFE: Machine Locked Out & Switched Off (Green Check + Lockout)
export const MachineLockout: React.FC<{ className?: string }> = ({ className = 'w-full h-44' }) => (
  <svg
    viewBox="0 0 280 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    role="img"
    aria-label="Safe: Machine switched off and locked out with a heavy padlock"
  >
    {/* Background Container */}
    <rect width="280" height="180" rx="16" fill="#DCFCE7" stroke="#16A34A" strokeWidth="3" />

    {/* Machine Housing (Grey, Still) */}
    <rect x="30" y="40" width="130" height="100" rx="10" fill="#475569" stroke="#0F172A" strokeWidth="4" />
    <rect x="42" y="52" width="106" height="76" rx="6" fill="#1E293B" />

    {/* Gears STOPPED */}
    <g transform="translate(75, 80)">
      <circle cx="0" cy="0" r="22" fill="#64748B" stroke="#0F172A" strokeWidth="3" />
      <circle cx="0" cy="0" r="9" fill="#334155" />
      <rect x="-4" y="-27" width="8" height="8" rx="2" fill="#0F172A" />
      <rect x="-4" y="19" width="8" height="8" rx="2" fill="#0F172A" />
    </g>
    <g transform="translate(115, 100)">
      <circle cx="0" cy="0" r="18" fill="#64748B" stroke="#0F172A" strokeWidth="3" />
      <circle cx="0" cy="0" r="7" fill="#334155" />
    </g>

    {/* Machine OFF Indicator */}
    <circle cx="50" cy="52" r="5" fill="#94A3B8" />
    <text x="60" y="55" fill="#94A3B8" fontSize="9" fontWeight="bold">OFF / ZERO POWER</text>

    {/* Main Power Switch Box on Side */}
    <rect x="145" y="65" width="45" height="58" rx="6" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3" />
    {/* Switch handle DOWN (OFF position) */}
    <path d="M167 80V100" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" />
    <circle cx="167" cy="100" r="7" fill="#DC2626" stroke="#0F172A" strokeWidth="2" />

    {/* Big Red LOTO Padlock Clamped on Handle */}
    <g transform="translate(170, 78)">
      {/* Padlock Shackle through switch */}
      <path
        d="M10 12V2C10 -6 22 -6 22 2V12"
        stroke="#475569"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Lock Body */}
      <rect x="6" y="12" width="20" height="22" rx="4" fill="#DC2626" stroke="#0F172A" strokeWidth="2.5" />
      {/* Keyhole */}
      <circle cx="16" cy="21" r="2.5" fill="#FEF08A" />
      <path d="M16 23.5V28" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
      {/* LOTO Tag */}
      <path d="M26 24L38 32V44H26V24Z" fill="#FACC15" stroke="#0F172A" strokeWidth="1.5" />
      <text x="28" y="38" fontSize="6" fontWeight="bold" fill="#000">DANGER</text>
    </g>

    {/* Big Green Safe Checkmark */}
    <circle cx="235" cy="52" r="30" fill="#16A34A" />
    <path d="M222 52L231 61L248 42" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />

    {/* Bottom Safe Banner */}
    <rect x="20" y="148" width="240" height="24" rx="6" fill="#16A34A" />
    <text x="140" y="165" fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle">
      ✅ SAFE: Switched off & locked
    </text>
  </svg>
);

// Standalone Padlock
export const Padlock: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Padlock">
    <path d="M11 15V9C11 5.134 14.134 2 18 2C21.866 2 25 5.134 25 9V15" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <rect x="7" y="14" width="22" height="18" rx="4" fill="#DC2626" stroke="#0F172A" strokeWidth="2.5" />
    <circle cx="18" cy="22" r="2.5" fill="#FACC15" />
    <path d="M18 24.5V28" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Industrial Safety Hard Hat
export const HardHat: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Hard Hat">
    <path d="M6 22C6 12 11 6 18 6C25 6 30 12 30 22H6Z" fill="#FACC15" stroke="#14213D" strokeWidth="2.5" />
    <rect x="3" y="21" width="30" height="5" rx="2" fill="#EAB308" stroke="#14213D" strokeWidth="2" />
    <rect x="16" y="5" width="4" height="6" rx="1" fill="#CA8A04" />
  </svg>
);

// Green Fire Exit pictogram
export const FireExit: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Fire Exit">
    <rect width="36" height="36" rx="6" fill="#16A34A" />
    {/* Door outline */}
    <rect x="20" y="6" width="11" height="24" rx="2" fill="#14532D" stroke="#FFFFFF" strokeWidth="1.5" />
    {/* Running figure */}
    <circle cx="12" cy="11" r="2.5" fill="#FFFFFF" />
    <path d="M10 16L13 19L16 17" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <path d="M13 18L13 24L10 29" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <path d="M13 24L17 28" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    {/* Exit Arrow */}
    <path d="M5 19H9" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    <path d="M7 16L4 19L7 22" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// GHS Chemical Danger Diamond
export const ChemicalLabel: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Chemical Hazard">
    {/* Rotated diamond */}
    <rect x="18" y="2" width="22" height="22" rx="3" transform="rotate(45 18 2)" fill="#FEF2F2" stroke="#DC2626" strokeWidth="3" />
    {/* Test tubes pouring onto surface & hand */}
    <path d="M14 14L17 18" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
    <path d="M22 14L19 18" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
    <path d="M13 22H23" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
    <circle cx="18" cy="20" r="1.5" fill="#DC2626" />
  </svg>
);

// Safety Protective Gloves
export const Gloves: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Protective Gloves">
    <path
      d="M10 28V18C10 16.5 11 15 12.5 15C13.5 15 14.5 15.8 15 17V12C15 10.5 16 9.5 17.5 9.5C19 9.5 20 10.5 20 12V11C20 9.5 21 8.5 22.5 8.5C24 8.5 25 9.5 25 11V14C25 12.5 26 11.5 27.5 11.5C29 11.5 30 12.5 30 14V22C30 27 26 29 22 29H14C11.5 29 10 28 10 28Z"
      fill="#0E7C86"
      stroke="#14213D"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <rect x="9" y="27" width="16" height="5" rx="2" fill="#F59E0B" stroke="#14213D" strokeWidth="1.5" />
  </svg>
);

// Machine Guard Interlock
export const MachineGuard: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Machine Safety Guard">
    <rect x="4" y="5" width="28" height="26" rx="4" fill="#F1F5F9" stroke="#0E7C86" strokeWidth="2.5" />
    {/* Grid mesh */}
    <path d="M11 5V31" stroke="#0E7C86" strokeWidth="1.5" />
    <path d="M18 5V31" stroke="#0E7C86" strokeWidth="1.5" />
    <path d="M25 5V31" stroke="#0E7C86" strokeWidth="1.5" />
    <path d="M4 13H32" stroke="#0E7C86" strokeWidth="1.5" />
    <path d="M4 21H32" stroke="#0E7C86" strokeWidth="1.5" />
    {/* Interlock key symbol */}
    <circle cx="28" cy="18" r="3" fill="#16A34A" />
  </svg>
);
