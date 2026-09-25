import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Phone,
  MapPin,
  Languages,
  Volume2,
  HardDrive,
  RefreshCw,
  LogOut,
} from 'lucide-react';
import { Header } from '../../components/common/Header';
import { useApp } from '../../hooks/useApp';
import { collectionRepository } from '../../services/collectionRepository';
import type { CollectorProfile } from '../../models/collection';
import type { SupportedLanguage } from '../../localization/translations';

export const CollectorProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<CollectorProfile | null>(null);
  const navigate = useNavigate();
  const { language, setLanguage, isAudioGuideEnabled, setIsAudioGuideEnabled, t } = useApp();

  const profileAudioPrompts: Record<string, string> = {
    en: 'Collector Profile. Here you can manage your language, audio assistance, and application settings.',
    hi: 'कलेक्टर प्रोफाइल। यहां आप अपनी भाषा, आवाज सहायता और सेटिंग्स प्रबंधित कर सकते हैं।',
    mr: 'कलेक्टर प्रोफाइल. येथे आपण आपली भाषा, ध्वनी मार्गदर्शन आणि ॲप सेटिंग्ज व्यवस्थापित करू शकता.',
  };

  useEffect(() => {
    collectionRepository.getCollectorProfile().then(setProfile);
  }, []);

  const handleLanguageChange = (lang: SupportedLanguage) => {
    setLanguage(lang);
    if (profile) {
      const displayNames = {
        en: 'English',
        hi: 'हिन्दी',
        mr: 'मराठी',
      };
      setProfile({
        ...profile,
        languageCode: lang,
        languageDisplayName: displayNames[lang],
      });
    }
  };

  const handleAudioToggle = () => {
    const nextVal = !isAudioGuideEnabled;
    setIsAudioGuideEnabled(nextVal);
    if (profile) {
      setProfile({ ...profile, isAudioGuideEnabled: nextVal });
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB]">
      <Header
        titleOverride={t.profileTitle}
        subtitleOverride={t.profileSub}
        audioPromptText={profileAudioPrompts[language] || profileAudioPrompts.hi}
      />

      <div className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6 space-y-4 overflow-y-auto pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
          {/* Left Column: Profile Identity, Actions & Version */}
          <div className="md:col-span-6 space-y-4">
            {/* Profile Identity Card (Using neutral placeholders per product truth) */}
            <div className="bg-white border-2 border-[#1C1917] rounded-lg p-3.5 shadow-mech space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#14532D] text-white border-2 border-[#1C1917] flex items-center justify-center font-heading font-black text-xl shadow-mech-sm">
                  <User className="w-7 h-7" />
                </div>

                <div>
                  <h2 className="font-heading font-black text-base text-[#1C1917] leading-tight">
                    {t.profileName}
                  </h2>
                  <span className="bg-[#ECFDF5] text-[#14532D] border border-[#14532D] text-[10.5px] font-black px-2 py-0.5 rounded inline-block mt-1">
                    {t.profileRole}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E2D9C8] space-y-2 text-xs font-semibold text-[#57534E]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#B45309]" />
                    <span>{t.profilePhoneLabel}</span>
                  </div>
                  <span className="font-mono text-[#1C1917] font-bold">
                    {t.profilePhonePlaceholder}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#B45309]" />
                    <span>{t.profileAreaLabel}</span>
                  </div>
                  <span className="text-[#1C1917] font-bold">
                    {t.serviceArea}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Controls */}
            <div className="space-y-2.5 pt-1">
              <button
                onClick={() => navigate('/role-selection')}
                className="w-full bg-white hover:bg-[#F2EEDE] text-[#1C1917] border-2 border-[#1C1917] rounded-lg py-2.5 px-4 font-heading font-black text-xs tracking-wide shadow-mech-sm flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#B45309]" />
                <span>{t.switchRoleBtn}</span>
              </button>

              <button
                onClick={() => navigate('/role-selection')}
                className="w-full bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#991B1B] border-2 border-[#991B1B] rounded-lg py-2.5 px-4 font-heading font-black text-xs tracking-wide shadow-mech-sm flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t.logoutBtn}</span>
              </button>
            </div>

            {/* Version Notice */}
            <div className="text-center pt-2 text-[10.5px] font-bold text-[#78716C]">
              <span>{profile?.appVersion || 'v1.0.0 (SIH 2026 PS 26229)'}</span>
              <p className="text-[9.5px] text-[#A8A29E] mt-0.5">
                {t.appVersionNotice}
              </p>
            </div>
          </div>

          {/* Right Column: Preferences Section */}
          <div className="md:col-span-6 space-y-4">
            <div className="bg-white border-2 border-[#1C1917] rounded-lg p-3.5 shadow-mech space-y-3">
              <h3 className="font-heading font-black text-xs text-[#1C1917] uppercase tracking-wider border-b border-[#E2D9C8] pb-1.5">
                {t.preferencesTitle}
              </h3>

              {/* App Language */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-[#1C1917]">
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-[#14532D]" />
                    <span>{t.settingsLanguage}</span>
                  </div>
                  <span className="text-[#14532D] font-extrabold text-[11px]">
                    {language === 'hi' ? 'हिन्दी' : language === 'mr' ? 'मराठी' : 'English'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  {(['hi', 'en', 'mr'] as SupportedLanguage[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`py-1.5 px-2 rounded border font-bold text-xs transition-all ${
                        language === lang
                          ? 'bg-[#14532D] text-white border-[#1C1917] shadow-mech-sm'
                          : 'bg-[#F2EEDE] text-[#57534E] border-[#E2D9C8] hover:border-[#1C1917]'
                      }`}
                    >
                      {lang === 'hi' ? 'हिन्दी' : lang === 'mr' ? 'मराठी' : 'English'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Audio Guide Toggle */}
              <div className="pt-2 border-t border-[#E2D9C8] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-[#B45309]" />
                  <div>
                    <span className="text-xs font-bold text-[#1C1917] block">
                      {t.settingsAudio}
                    </span>
                    <span className="text-[10px] text-[#78716C] font-medium">
                      {t.settingsAudioSub}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleAudioToggle}
                  className={`w-11 h-6 rounded-full transition-colors relative border-1.5 border-[#1C1917] p-0.5 ${
                    isAudioGuideEnabled ? 'bg-[#14532D]' : 'bg-[#E2D9C8]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      isAudioGuideEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Local Lot Storage Cache */}
              <div className="pt-2 border-t border-[#E2D9C8] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-[#14532D]" />
                  <div>
                    <span className="text-xs font-bold text-[#1C1917] block">
                      {t.settingsLocalStorage}
                    </span>
                    <span className="text-[10px] text-[#78716C] font-medium">
                      {t.settingsLocalStorageSub}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-black bg-[#ECFDF5] text-[#14532D] border border-[#14532D] px-2 py-0.5 rounded uppercase">
                  {t.activeStatusBadge}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
