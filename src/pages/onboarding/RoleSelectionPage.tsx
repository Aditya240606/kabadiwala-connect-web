import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CheckCircle2, Circle, ArrowRight, Package, Factory, Info } from 'lucide-react';
import { Header } from '../../components/common/Header';
import { useApp } from '../../hooks/useApp';

export const RoleSelectionPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'collector' | 'recycler'>('collector');
  const navigate = useNavigate();
  const { language, t } = useApp();

  const roleAudioPrompts: Record<string, string> = {
    en: 'Please select your role. Collector or Recycler. Press the green button below to continue.',
    hi: 'कृपया अपनी भूमिका चुनें। कबाड़ीवाला या रिसाइक्लर। आगे बढ़ने के लिए नीचे हरा बटन दबाएं।',
    mr: 'कृपया आपली भूमिका निवडा. कबाड़ीवाला किंवा रिसायकलर. पुढे जाण्यासाठी खाली हिरवे बटण दाबा.',
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
      <Header
        audioPromptText={roleAudioPrompts[language] || roleAudioPrompts.hi}
      />

      <div className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6 pb-28 space-y-4 overflow-y-auto">
        {/* Step Indicator Header Card */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-3.5 shadow-mech-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="bg-[#14532D] text-white text-[11px] font-extrabold px-2 py-0.5 rounded tracking-wide uppercase">
              {t.roleStepBadge}
            </span>
            <span className="text-xs font-bold text-[#57534E]">
              {t.roleStepTitle}
            </span>
          </div>
          <h2 className="font-heading font-black text-lg text-[#1C1917] leading-tight">
            {t.roleTitle}
          </h2>
          <p className="text-xs text-[#57534E] mt-1 font-medium leading-relaxed">
            {t.roleSubtitle}
          </p>
        </div>

        {/* Roles Grid: 1 column on mobile, 2 columns on desktop/tablet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Collector Role Card */}
          <div
            onClick={() => setSelectedRole('collector')}
            className={`cursor-pointer rounded-lg border-2 transition-all p-3.5 flex flex-col justify-between ${
              selectedRole === 'collector'
                ? 'bg-[#F2F9F3] border-[#14532D] shadow-mech ring-1 ring-[#14532D]'
                : 'bg-white border-[#1C1917] hover:border-[#14532D]'
            }`}
          >
            <div>
              {selectedRole === 'collector' && (
                <div className="flex items-center justify-between bg-[#ECFDF5] border border-[#14532D] text-[#14532D] text-[10.5px] font-black px-2 py-0.5 rounded mb-2.5">
                  <span>{t.roleSelectedBadge}</span>
                  <span>{t.rolePrimaryBadge}</span>
                </div>
              )}

              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-[#14532D] text-white border-1.5 border-[#1C1917] flex items-center justify-center shrink-0">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-base text-[#1C1917] leading-tight">
                      {t.roleCollectorTitle}
                    </h3>
                    <p className="text-xs font-semibold text-[#166534] mt-0.5">
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

              {/* Bullet points */}
              <div className="mt-3.5 pt-3 border-t border-[#E2D9C8] space-y-2">
                {t.roleCollectorBullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#1C1917] font-medium leading-snug">
                    <div className="w-4 h-4 rounded-sm bg-[#ECFDF5] border border-[#14532D] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#14532D] stroke-[3]" />
                    </div>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 bg-[#FEF3C7] border border-[#F59E0B] rounded p-1.5 text-[11px] font-bold text-[#B45309] flex items-center gap-1.5">
              <span>★</span>
              <span>{t.roleCollectorTag}</span>
            </div>
          </div>

          {/* Recycler Role Card */}
          <div
            onClick={() => setSelectedRole('recycler')}
            className={`cursor-pointer rounded-lg border-2 transition-all p-3.5 flex flex-col justify-between ${
              selectedRole === 'recycler'
                ? 'bg-[#F2F9F3] border-[#14532D] shadow-mech ring-1 ring-[#14532D]'
                : 'bg-white border-[#1C1917] hover:border-[#14532D]'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-lg bg-[#E2D9C8] text-[#1C1917] border-1.5 border-[#1C1917] flex items-center justify-center shrink-0">
                    <Factory className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-base text-[#1C1917] leading-tight">
                      {t.roleRecyclerTitle}
                    </h3>
                    <p className="text-xs font-semibold text-[#57534E] mt-0.5">
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

              {/* Bullet points */}
              <div className="mt-3.5 pt-3 border-t border-[#E2D9C8] space-y-2">
                {t.roleRecyclerBullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-[#57534E] font-medium leading-snug">
                    <div className="w-4 h-4 rounded-sm bg-[#F2EEDE] border border-[#78716C] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-[#57534E] stroke-[3]" />
                    </div>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Truthful Notice Card */}
        <div className="bg-[#FFF4E5] border border-[#F59E0B] rounded-lg p-3 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
          <p className="text-xs text-[#78350F] font-semibold leading-relaxed">
            {t.roleNotice}
          </p>
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="sticky bottom-0 z-30 bg-white border-t-2 border-[#1C1917] p-3.5 shadow-[0_-4px_10px_rgba(0,0,0,0.06)]">
        <div className="max-w-md mx-auto">
          <button
            onClick={handleContinue}
            className="w-full bg-[#14532D] hover:bg-[#0F3F22] text-white border-2 border-[#1C1917] rounded-lg py-3 px-4 font-heading font-black text-sm tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
          >
            <span>
              {selectedRole === 'collector' ? t.continueCollector : t.continueRecycler}
            </span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
          <p className="text-[11px] font-semibold text-[#57534E] text-center mt-2">
            {t.roleEnterWorkspace}
          </p>
        </div>
      </div>
    </div>
  );
};
