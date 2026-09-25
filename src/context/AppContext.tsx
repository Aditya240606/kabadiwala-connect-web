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

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const playAudioPrompt = (text: string) => {
    if (!isAudioGuideEnabled || !('speechSynthesis' in window)) return;

    stopAudio();
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
