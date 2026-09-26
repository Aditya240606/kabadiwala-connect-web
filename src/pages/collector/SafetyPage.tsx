import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Battery,
  Smartphone,
  Zap,
  Shield,
  AlertTriangle,
  Volume2,
  VolumeX,
  ShieldCheck,
  ArrowRight,
  PlusCircle,
} from 'lucide-react';
import { Header } from '../../components/common/Header';
import { AudioGuidanceCard } from '../../components/common/AudioGuidanceCard';
import { useApp } from '../../hooks/useApp';

interface SafetyItem {
  id: string;
  icon: typeof Battery;
  titleKey: 'safetyBatTitle' | 'safetyPhonesTitle' | 'safetyWiresTitle' | 'safetyGlovesTitle' | 'safetyMixedTitle';
  descKey: 'safetyBatDesc' | 'safetyPhonesDesc' | 'safetyWiresDesc' | 'safetyGlovesDesc' | 'safetyMixedDesc';
  audioId: string;
  badgeColor: string;
  iconColor: string;
}

const SAFETY_ITEMS: SafetyItem[] = [
  {
    id: 'batteries',
    icon: Battery,
    titleKey: 'safetyBatTitle',
    descKey: 'safetyBatDesc',
    audioId: 'A26_safety_batteries',
    badgeColor: 'bg-[#FEF3C7] border-[#B45309]',
    iconColor: 'text-[#B45309]',
  },
  {
    id: 'phones',
    icon: Smartphone,
    titleKey: 'safetyPhonesTitle',
    descKey: 'safetyPhonesDesc',
    audioId: 'A26_safety_phones',
    badgeColor: 'bg-[#ECFDF5] border-[#14532D]',
    iconColor: 'text-[#14532D]',
  },
  {
    id: 'wires',
    icon: Zap,
    titleKey: 'safetyWiresTitle',
    descKey: 'safetyWiresDesc',
    audioId: 'A26_safety_wires',
    badgeColor: 'bg-[#FFFBEB] border-[#F59E0B]',
    iconColor: 'text-[#D97706]',
  },
  {
    id: 'gloves',
    icon: Shield,
    titleKey: 'safetyGlovesTitle',
    descKey: 'safetyGlovesDesc',
    audioId: 'A26_safety_gloves',
    badgeColor: 'bg-[#ECFDF5] border-[#14532D]',
    iconColor: 'text-[#14532D]',
  },
  {
    id: 'mixed',
    icon: AlertTriangle,
    titleKey: 'safetyMixedTitle',
    descKey: 'safetyMixedDesc',
    audioId: 'A26_safety_mixed',
    badgeColor: 'bg-[#FFF4E5] border-[#B45309]',
    iconColor: 'text-[#B45309]',
  },
];

export const SafetyPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, t, playAudioPrompt, stopAudio, isSpeaking } = useApp();
  const [activeCardAudioId, setActiveCardAudioId] = useState<string | null>(null);

  const pageAudioPrompts: Record<string, string> = {
    en: 'E-waste handling safety guidelines. Keep batteries separate, handle screens carefully, avoid exposed wiring, and use gloves.',
    hi: 'ई-कचरा संभालते समय सुरक्षा नियम। बैटरी अलग रखें, स्क्रीन ध्यान से संभालें, खुली तारों से बचें, और दस्ताने पहनें।',
    mr: 'ई-कचरा हाताळताना सुरक्षा नियम. बॅटरी नेहमी वेगळी ठेवा, स्क्रीन काळजीपूर्वक हाताळा, उघड्या तारांना स्पर्श टाळा आणि हातमोजे वापरा.',
  };

  const handleCardAudio = (item: SafetyItem) => {
    if (isSpeaking && activeCardAudioId === item.audioId) {
      stopAudio();
      setActiveCardAudioId(null);
    } else {
      setActiveCardAudioId(item.audioId);
      const text = `${t[item.titleKey]}: ${t[item.descKey]}`;
      playAudioPrompt(text, item.audioId);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB]">
      <Header
        showBack
        onBack={() => navigate('/collector')}
        titleOverride={t.safetyTitle}
        subtitleOverride={t.safetySub}
      />

      <div className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6 space-y-4 overflow-y-auto pb-24">
        {/* Prominent Page-Level Audio Guidance Control */}
        <AudioGuidanceCard
          audioId="A26_safety"
          instruction={pageAudioPrompts[language] || pageAudioPrompts.hi}
        />

        {/* Informational Disclaimer Strip (Field Guidance, No Unsupported Medical Claims) */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-3 shadow-mech-sm flex items-center justify-between text-xs font-semibold text-[#57534E]">
          <div className="flex items-center gap-2">
            <span className="bg-[#B45309] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
              FIELD SAFETY
            </span>
            <span>{t.safetyNotice}</span>
          </div>
          <ShieldCheck className="w-4 h-4 text-[#14532D] shrink-0" />
        </div>

        {/* Visual Low-Literacy Safety Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {SAFETY_ITEMS.map((item, index) => {
            const IconComponent = item.icon;
            const isThisCardSpeaking = isSpeaking && activeCardAudioId === item.audioId;

            return (
              <div
                key={item.id}
                className={`bg-white border-2 border-[#1C1917] rounded-lg p-4 shadow-mech flex flex-col justify-between gap-3.5 transition-all ${
                  isThisCardSpeaking ? 'ring-2 ring-[#F59E0B] bg-[#FFFBEB]' : ''
                }`}
              >
                <div className="flex items-start gap-3.5">
                  {/* Visual Icon Badge */}
                  <div
                    className={`w-14 h-14 rounded-lg border-2 border-[#1C1917] flex items-center justify-center shrink-0 shadow-mech-sm ${item.badgeColor}`}
                  >
                    <IconComponent className={`w-8 h-8 ${item.iconColor} stroke-[2.2]`} />
                  </div>

                  {/* Title & Short Instruction */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-black text-[#78716C] font-mono">
                        0{index + 1}
                      </span>
                      <h3 className="font-heading font-black text-lg sm:text-xl text-[#1C1917] leading-tight">
                        {t[item.titleKey]}
                      </h3>
                    </div>
                    <p className="text-base sm:text-lg font-bold text-[#14532D] mt-1 leading-snug">
                      {t[item.descKey]}
                    </p>
                  </div>
                </div>

                {/* Individual Card Audio Button */}
                <div className="pt-2 border-t border-[#E2D9C8] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleCardAudio(item)}
                    className={`flex items-center gap-2 border-2 border-[#1C1917] rounded-md px-3 py-1.5 text-xs font-black uppercase tracking-wider shadow-mech-sm transition-all active:translate-y-0.5 ${
                      isThisCardSpeaking
                        ? 'bg-[#F59E0B] text-[#1C1917]'
                        : 'bg-[#FFFBEB] hover:bg-[#FEF3C7] text-[#14532D]'
                    }`}
                  >
                    {isThisCardSpeaking ? (
                      <>
                        <VolumeX className="w-4 h-4 text-[#1C1917]" />
                        <span>{t.listening}</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-[#14532D]" />
                        <span>{t.listen}</span>
                      </>
                    )}
                  </button>

                  <span className="text-xs font-extrabold text-[#78716C]">
                    SAFE HANDLING
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to Collection Flow */}
        <div className="pt-2">
          <button
            onClick={() => navigate('/collector/start')}
            className="w-full bg-[#14532D] hover:bg-[#0F3F22] text-white border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-base sm:text-lg tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
          >
            <PlusCircle className="w-5 h-5 stroke-[2.5]" />
            <span>{t.homeHeroCta}</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5] ml-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};
