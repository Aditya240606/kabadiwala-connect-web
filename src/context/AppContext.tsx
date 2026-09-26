import React, { useState, useEffect } from 'react';
import { translations } from '../localization/translations';
import type { SupportedLanguage } from '../localization/translations';
import { collectionRepository } from '../services/collectionRepository';
import { AppContext } from './appContextDefinition';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem('kc_language');
      if (saved === 'en' || saved === 'hi' || saved === 'mr') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'hi';
  });
  const [isAudioGuideEnabled, setIsAudioGuideEnabledState] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    // Load initial settings from repository
    collectionRepository.getCollectorProfile().then((profile) => {
      try {
        const saved = localStorage.getItem('kc_language');
        if (saved === 'en' || saved === 'hi' || saved === 'mr') {
          setLanguageState(saved);
        } else {
          setLanguageState(profile.languageCode);
        }
      } catch {
        setLanguageState(profile.languageCode);
      }
      setIsAudioGuideEnabledState(profile.isAudioGuideEnabled);
    });

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'kc_language' && (e.newValue === 'en' || e.newValue === 'hi' || e.newValue === 'mr')) {
        setLanguageState(e.newValue);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('kc_language', lang);
    } catch {
      // ignore
    }
    collectionRepository.updateLanguage(lang);
  };

  const setIsAudioGuideEnabled = (val: boolean) => {
    setIsAudioGuideEnabledState(val);
    collectionRepository.updateAudioGuide(val);
  };

  const currentAudioRef = React.useRef<HTMLAudioElement | null>(null);

  const stopAudio = () => {
    if (currentAudioRef.current) {
      try {
        currentAudioRef.current.pause();
        currentAudioRef.current.currentTime = 0;
      } catch {
        // ignore
      }
      currentAudioRef.current = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  };

  const playSpeechSynthesis = (text: string) => {
    if (!('speechSynthesis' in window)) {
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    if (language === 'hi') {
      utterance.lang = 'hi-IN';
    } else if (language === 'mr') {
      utterance.lang = 'mr-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const playAudioPrompt = (text: string, audioId?: string) => {
    if (!isAudioGuideEnabled) return;

    stopAudio();

    if (audioId) {
      const audioSrc = `/audio/${language}/${audioId}.mp3`;
      try {
        const audio = new Audio(audioSrc);
        currentAudioRef.current = audio;

        audio.onplay = () => setIsSpeaking(true);
        audio.onended = () => {
          setIsSpeaking(false);
          currentAudioRef.current = null;
        };
        audio.onerror = () => {
          // Fall back gracefully to browser SpeechSynthesis if MP3 is missing
          currentAudioRef.current = null;
          playSpeechSynthesis(text);
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            currentAudioRef.current = null;
            playSpeechSynthesis(text);
          });
        }
        return;
      } catch {
        playSpeechSynthesis(text);
        return;
      }
    }

    playSpeechSynthesis(text);
  };

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        isAudioGuideEnabled,
        setIsAudioGuideEnabled,
        isSpeaking,
        playAudioPrompt,
        stopAudio,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
