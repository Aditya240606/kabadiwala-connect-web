import { createContext } from 'react';
import type { SupportedLanguage, Translations } from '../localization/translations';

export interface AppContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: Translations;
  isAudioGuideEnabled: boolean;
  setIsAudioGuideEnabled: (val: boolean) => void;
  isSpeaking: boolean;
  playAudioPrompt: (text: string) => void;
  stopAudio: () => void;
}

export const AppContext = createContext<AppContextType | null>(null);
