import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useApp } from '../../hooks/useApp';

interface AudioGuidanceCardProps {
  /** Optional audio file ID (e.g., 'A03_take_photo') mapped to /audio/{lang}/{audioId}.mp3 */
  audioId?: string;
  /** Text prompt for screen/instruction. If an object with languages is passed or string */
  instruction: string;
  /** Optional secondary subtitle or tip */
  subtitle?: string;
  /** Optional container CSS class */
  className?: string;
}

/**
 * Primary Audio Guidance component designed specifically for Kabadiwala Connect's
 * low-literacy field accessibility.
 *
 * Implements the preferred Industrial Fieldwork pattern:
 * ┌──────────────────────────────────────┐
 * │  🔊  Listen                          │
 * │      [audio instruction]             │
 * └──────────────────────────────────────┘
 *
 * Features:
 * - Large touch target (> 48px interactive area)
 * - Clear active/playing state with animated soundwave indicator
 * - Clear stopped/idle state with contrasting Industrial Fieldwork tokens
 * - Never shows language dropdowns or repeated language selection buttons
 * - Automatically follows global AppContext language and audio sources
 */
export const AudioGuidanceCard: React.FC<AudioGuidanceCardProps> = ({
  audioId,
  instruction,
  subtitle,
  className = '',
}) => {
  const { isAudioGuideEnabled, isSpeaking, playAudioPrompt, stopAudio, t } = useApp();

  if (!isAudioGuideEnabled) return null;

  const handleClick = () => {
    if (isSpeaking) {
      stopAudio();
    } else {
      playAudioPrompt(instruction, audioId);
    }
  };

  return (
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`${isSpeaking ? t.listening : t.listen}: ${instruction}`}
      className={`group cursor-pointer select-none rounded-lg border-2 transition-all p-3 sm:p-3.5 shadow-mech-sm flex items-start gap-3 active:translate-y-0.5 ${
        isSpeaking
          ? 'bg-[#FEF3C7] border-[#B45309] ring-2 ring-[#F59E0B]'
          : 'bg-[#FFFBEB] hover:bg-[#FEF9C3] border-[#1C1917]'
      } ${className}`}
    >
      {/* Prominent Speaker Icon Box with min 48px touch boundary */}
      <div
        className={`w-12 h-12 rounded-lg border-2 border-[#1C1917] flex items-center justify-center shrink-0 transition-colors shadow-mech-sm ${
          isSpeaking
            ? 'bg-[#F59E0B] text-[#1C1917] animate-pulse'
            : 'bg-[#14532D] text-white group-hover:bg-[#0F3F22]'
        }`}
      >
        {isSpeaking ? (
          <VolumeX className="w-6 h-6 stroke-[2.5]" />
        ) : (
          <Volume2 className="w-6 h-6 stroke-[2.5]" />
        )}
      </div>

      {/* Content: Prominent Action Header + Instruction Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`font-heading font-black text-sm uppercase tracking-wider ${
                isSpeaking ? 'text-[#92400E]' : 'text-[#14532D]'
              }`}
            >
              {isSpeaking ? t.listening : t.listen}
            </span>
            {isSpeaking && (
              <span className="flex items-center gap-0.5">
                <span className="w-1 h-3 bg-[#B45309] rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1 h-4 bg-[#B45309] rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1 h-2.5 bg-[#B45309] rounded-full animate-bounce" />
              </span>
            )}
          </div>

          <span
            className={`text-[10px] font-black uppercase px-1.5 py-0.5 rounded border ${
              isSpeaking
                ? 'bg-[#B45309] text-white border-[#B45309]'
                : 'bg-white text-[#57534E] border-[#D6D3D1]'
            }`}
          >
            {isSpeaking ? 'AUDIO ON' : 'AUDIO'}
          </span>
        </div>

        <p className="text-sm sm:text-base font-bold text-[#1C1917] leading-snug mt-1">
          {instruction}
        </p>

        {subtitle && (
          <p className="text-xs font-semibold text-[#57534E] mt-0.5 leading-normal">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};
