import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import type { SupportedLanguage } from '../../localization/translations';

interface HeaderProps {
  showBack?: boolean;
  backUrl?: string;
  onBack?: () => void;
  titleOverride?: string;
  subtitleOverride?: string;
  audioPromptText?: string;
}

export const Header: React.FC<HeaderProps> = ({
  showBack = false,
  onBack,
  titleOverride,
  subtitleOverride,
  audioPromptText,
}) => {
  const { language, setLanguage, t, isAudioGuideEnabled, isSpeaking, playAudioPrompt, stopAudio } = useApp();

  const handleAudioClick = () => {
    if (isSpeaking) {
      stopAudio();
    } else {
      const textToSpeak = audioPromptText || `${titleOverride || t.appName}. ${subtitleOverride || t.appSubtitle}`;
      playAudioPrompt(textToSpeak);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b-2 border-[#1C1917] px-4 md:px-6 py-2.5">
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
        {showBack ? (
          <button
            onClick={onBack || (() => window.history.back())}
            className="w-9 h-9 rounded bg-[#FFFBEB] border-1.5 border-[#1C1917] flex items-center justify-center font-bold text-lg active:translate-y-0.5"
            aria-label="Go Back"
          >
            ←
          </button>
        ) : (
          <div className="w-8 h-8 rounded bg-[#14532D] text-white flex items-center justify-center border-1.5 border-[#1C1917]">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L6 8h4v6h4V8h4L12 2zm-8 14l6 6v-4h8v4l6-6-6-6v4H10v-4L4 16z" />
            </svg>
          </div>
        )}

        <div>
          <h1 className="font-heading font-black text-[#14532D] text-base sm:text-lg tracking-tight leading-tight">
            {titleOverride || t.appName}
          </h1>
          <p className="text-xs font-bold text-[#B45309] tracking-wider uppercase leading-none mt-0.5">
            {subtitleOverride || t.appSubtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Language Quick Switcher */}
        <div className="flex items-center bg-[#F2EEDE] rounded border border-[#1C1917] p-0.5 text-xs font-bold">
          {(['hi', 'en', 'mr'] as SupportedLanguage[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-2 py-0.5 rounded uppercase transition-colors ${
                language === lang
                  ? 'bg-[#14532D] text-white'
                  : 'text-[#57534E] hover:text-[#1C1917]'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>

        {/* Audio Assistance Pill Button */}
        {isAudioGuideEnabled && (
          <button
            onClick={handleAudioClick}
            className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold border-1.5 border-[#763300] shadow-mech-copper transition-all active:translate-y-0.5 ${
              isSpeaking
                ? 'bg-[#F59E0B] text-[#1C1917] animate-pulse'
                : 'bg-[#B45309] text-white hover:bg-[#92400E]'
            }`}
            title="Listen to screen audio guidance"
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isSpeaking ? t.listening : t.listen}</span>
          </button>
        )}
      </div>
      </div>
    </header>
  );
};
