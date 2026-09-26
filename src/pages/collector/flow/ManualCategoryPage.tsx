import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Header } from '../../../components/common/Header';
import { AudioGuidanceCard } from '../../../components/common/AudioGuidanceCard';
import { FlowStepIndicator } from '../../../components/common/FlowStepIndicator';
import { useApp } from '../../../hooks/useApp';
import { useCollectionFlow } from '../../../hooks/useCollectionFlow';
import { EWASTE_CATEGORIES } from '../../../data/categories';

export const ManualCategoryPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, t } = useApp();
  const { confirmCategory } = useCollectionFlow();
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const manualAudioPrompts: Record<string, string> = {
    en: 'Select the scrap category from the list below, then press confirm selection.',
    hi: 'नीचे दी गई सूची में से स्क्रैप श्रेणी चुनें, फिर पुष्टि करने के लिए बटन दबाएं।',
    mr: 'खालील यादीतून भंगार श्रेणी निवडा, नंतर पुष्टी करण्यासाठी बटण दाबा.',
  };

  const fromAi = (location.state as { fromAi?: boolean })?.fromAi ?? false;

  const getCatName = (cat: typeof EWASTE_CATEGORIES[0]) => {
    if (language === 'hi') return cat.displayNameHi;
    if (language === 'mr') return cat.displayNameMr;
    return cat.displayName;
  };

  const handleConfirm = () => {
    if (!selectedCode) return;
    const cat = EWASTE_CATEGORIES.find(c => c.code === selectedCode);
    if (!cat) return;
    const method = fromAi ? 'AI_CORRECTED' : 'MANUAL';
    confirmCategory(selectedCode, cat.displayName, method);
    navigate('/collector/flow/weight');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB]">
      <Header
        showBack
        onBack={() => navigate(-1)}
        titleOverride={t.manualCategoryTitle}
        subtitleOverride={t.flowStep2Classify}
      />

      <div className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-6 space-y-4 overflow-y-auto pb-12">
        <FlowStepIndicator currentStep={2} />

        {/* Audio Guidance Card */}
        <AudioGuidanceCard
          audioId="A05_manual_category"
          instruction={manualAudioPrompts[language] || manualAudioPrompts.hi}
        />


        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
          {EWASTE_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCode === cat.code;
            return (
              <button
                key={cat.code}
                onClick={() => setSelectedCode(cat.code)}
                className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all active:translate-y-0.5 ${
                  isSelected
                    ? 'bg-[#ECFDF5] border-[#14532D] shadow-mech-sm ring-1 ring-[#14532D]'
                    : 'bg-white border-[#1C1917] shadow-mech-sm hover:border-[#14532D]'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border ${
                    isSelected
                      ? 'bg-[#14532D] border-[#14532D] text-white'
                      : 'bg-[#F2EEDE] border-[#E2D9C8] text-[#1C1917]'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-heading font-black text-xs sm:text-sm text-center text-[#1C1917] leading-tight">
                  {getCatName(cat)}
                </span>
                {isSelected && (
                  <CheckCircle className="w-5 h-5 text-[#14532D]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={!selectedCode}
          className={`w-full border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-lg tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all ${
            selectedCode
              ? 'bg-[#14532D] hover:bg-[#0F3F22] text-white'
              : 'bg-[#E2D9C8] text-[#78716C] cursor-not-allowed'
          }`}
        >
          <CheckCircle className="w-5 h-5 stroke-[2.5]" />
          <span>{t.manualCategoryConfirm}</span>
          <ArrowRight className="w-5 h-5 ml-auto stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
