import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle, ArrowRight, Package, Factory } from 'lucide-react';
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
        {/* Page Title Card */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-3.5 shadow-mech-sm">
          <h2 className="font-heading font-black text-xl text-[#1C1917] leading-tight">
            {t.roleTitle}
          </h2>
          <p className="text-xs text-[#57534E] mt-0.5 font-medium">
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
                <div className="inline-flex items-center bg-[#ECFDF5] border border-[#14532D] text-[#14532D] text-[10.5px] font-black px-2 py-0.5 rounded mb-3">
                  <span>{t.roleSelectedBadge}</span>
                </div>
              )}

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-lg bg-[#14532D] text-white border-1.5 border-[#1C1917] flex items-center justify-center shrink-0 shadow-mech-sm">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-lg text-[#1C1917] leading-tight">
                      {t.roleCollectorTitle}
                    </h3>
                    <p className="text-xs font-bold text-[#166534] mt-0.5">
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
                <div className="inline-flex items-center bg-[#ECFDF5] border border-[#14532D] text-[#14532D] text-[10.5px] font-black px-2 py-0.5 rounded mb-3">
                  <span>{t.roleSelectedBadge}</span>
                </div>
              )}

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-lg bg-[#E2D9C8] text-[#1C1917] border-1.5 border-[#1C1917] flex items-center justify-center shrink-0">
                    <Factory className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-lg text-[#1C1917] leading-tight">
                      {t.roleRecyclerTitle}
                    </h3>
                    <p className="text-xs font-bold text-[#57534E] mt-0.5">
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
            className="w-full bg-[#14532D] hover:bg-[#0F3F22] text-white border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-base tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
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
