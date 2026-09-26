import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle, ArrowRight, Package, Factory, Globe } from 'lucide-react';
import { Header } from '../../components/common/Header';
import { AudioGuidanceCard } from '../../components/common/AudioGuidanceCard';
import { useApp } from '../../hooks/useApp';
import type { SupportedLanguage } from '../../localization/translations';

export const RoleSelectionPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'collector' | 'recycler'>('collector');
  const navigate = useNavigate();
  const { language, setLanguage, t } = useApp();

  const roleAudioPrompts: Record<string, string> = {
    en: 'Welcome to Kabadiwala Connect. Please select your role: Collector or Recycler. Then press the button below to continue.',
    hi: 'कबाड़ीवाला कनेक्ट में आपका स्वागत है। कृपया अपनी भूमिका चुनें: कबाड़ीवाला या रिसाइक्लर। फिर आगे बढ़ने के लिए नीचे हरा बटन दबाएं।',
    mr: 'कबाड़ीवाला कनेक्ट मध्ये आपले स्वागत आहे. कृपया आपली भूमिका निवडा: कबाड़ीवाला किंवा रिसायकलर. नंतर पुढे जाण्यासाठी खालील बटण दाबा.',
  };

  const handleContinue = () => {
    if (selectedRole === 'collector') {
      navigate('/collector');
    } else {
      navigate('/recycler');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB]">
      <Header />

      <div className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6 pb-28 space-y-4 overflow-y-auto">
        {/* Prominent Audio Guidance Feature */}
        <AudioGuidanceCard
          audioId="A01_role_selection"
          instruction={roleAudioPrompts[language] || roleAudioPrompts.hi}
        />

        {/* Global Language Selection for Onboarding (Set once) */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-3.5 shadow-mech-sm space-y-2">
          <div className="flex items-center gap-2 text-xs font-black text-[#57534E] uppercase tracking-wider">
            <Globe className="w-4 h-4 text-[#14532D]" />
            <span>{t.settingsLanguage}</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[
              { code: 'hi' as SupportedLanguage, label: 'हिन्दी', sub: 'Hindi' },
              { code: 'en' as SupportedLanguage, label: 'English', sub: 'अंग्रेजी' },
              { code: 'mr' as SupportedLanguage, label: 'मराठी', sub: 'Marathi' },
            ].map((item) => (
              <button
                key={item.code}
                onClick={() => setLanguage(item.code)}
                className={`p-2.5 rounded-lg border-2 text-left transition-all active:translate-y-0.5 ${
                  language === item.code
                    ? 'bg-[#F2F9F3] border-[#14532D] shadow-mech-sm ring-1 ring-[#14532D]'
                    : 'bg-[#FFFBEB] hover:bg-[#FEF9C3] border-[#1C1917]'
                }`}
              >
                <div className="font-heading font-black text-sm sm:text-base text-[#1C1917]">
                  {item.label}
                </div>
                <div className="text-[11px] font-semibold text-[#57534E]">
                  {item.sub}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Page Title Card */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-3.5 shadow-mech-sm">
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#1C1917] leading-tight">
            {t.roleTitle}
          </h2>
          <p className="text-sm sm:text-base text-[#57534E] mt-1 font-medium">
            {t.roleSubtitle}
          </p>
        </div>

        {/* Roles Grid: 1 column on mobile, 2 columns on desktop/tablet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Collector Role Card */}
          <div
            onClick={() => setSelectedRole('collector')}
            className={`cursor-pointer rounded-lg border-2 transition-all p-4 flex flex-col justify-between ${
              selectedRole === 'collector'
                ? 'bg-[#F2F9F3] border-[#14532D] shadow-mech ring-1 ring-[#14532D]'
                : 'bg-white border-[#1C1917] hover:border-[#14532D]'
            }`}
          >
            <div>
              {selectedRole === 'collector' && (
                <div className="inline-flex items-center bg-[#ECFDF5] border border-[#14532D] text-[#14532D] text-xs font-black px-2 py-0.5 rounded mb-3">
                  <span>{t.roleSelectedBadge}</span>
                </div>
              )}

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-lg bg-[#14532D] text-white border-1.5 border-[#1C1917] flex items-center justify-center shrink-0 shadow-mech-sm">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-xl sm:text-2xl text-[#1C1917] leading-tight">
                      {t.roleCollectorTitle}
                    </h3>
                    <p className="text-sm font-bold text-[#166534] mt-0.5">
                      {t.roleCollectorSub}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 mt-1">
                  {selectedRole === 'collector' ? (
                    <CheckCircle2 className="w-6 h-6 text-[#14532D] fill-[#ECFDF5]" />
                  ) : (
                    <Circle className="w-6 h-6 text-[#A8A29E]" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recycler Role Card */}
          <div
            onClick={() => setSelectedRole('recycler')}
            className={`cursor-pointer rounded-lg border-2 transition-all p-4 flex flex-col justify-between ${
              selectedRole === 'recycler'
                ? 'bg-[#F2F9F3] border-[#14532D] shadow-mech ring-1 ring-[#14532D]'
                : 'bg-white border-[#1C1917] hover:border-[#14532D]'
            }`}
          >
            <div>
              {selectedRole === 'recycler' && (
                <div className="inline-flex items-center bg-[#ECFDF5] border border-[#14532D] text-[#14532D] text-xs font-black px-2 py-0.5 rounded mb-3">
                  <span>{t.roleSelectedBadge}</span>
                </div>
              )}

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-lg bg-[#E2D9C8] text-[#1C1917] border-1.5 border-[#1C1917] flex items-center justify-center shrink-0">
                    <Factory className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-xl sm:text-2xl text-[#1C1917] leading-tight">
                      {t.roleRecyclerTitle}
                    </h3>
                    <p className="text-sm font-bold text-[#57534E] mt-0.5">
                      {t.roleRecyclerSub}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 mt-1">
                  {selectedRole === 'recycler' ? (
                    <CheckCircle2 className="w-6 h-6 text-[#14532D] fill-[#ECFDF5]" />
                  ) : (
                    <Circle className="w-6 h-6 text-[#A8A29E]" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="sticky bottom-0 z-30 bg-white border-t-2 border-[#1C1917] p-3.5 shadow-[0_-4px_10px_rgba(0,0,0,0.06)]">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleContinue}
            className="w-full bg-[#14532D] hover:bg-[#0F3F22] text-white border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-lg tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
          >
            <span>
              {selectedRole === 'collector' ? t.continueCollector : t.continueRecycler}
            </span>
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </button>
        </div>
      </div>
    </div>
  );
};
