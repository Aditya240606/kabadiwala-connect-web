import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Eye, PlusCircle, Home } from 'lucide-react';
import { Header } from '../../../components/common/Header';
import { AudioGuidanceCard } from '../../../components/common/AudioGuidanceCard';
import { useApp } from '../../../hooks/useApp';
import { useCollectionFlow } from '../../../hooks/useCollectionFlow';
import { DigitalLotQrCard } from '../../../components/common/DigitalLotQrCard';

export const LotCreatedPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, t } = useApp();
  const { flow, resetFlow } = useCollectionFlow();

  const createdAudioPrompts: Record<string, string> = {
    en: 'Your scrap collection lot has been logged successfully. You can view the lot, match with recyclers, or start a new collection.',
    hi: 'आपकी स्क्रैप संग्रह सामग्री सफलतापूर्वक दर्ज हो गई है। आप लॉट देख सकते हैं, रिसाइक्लर खोज सकते हैं, या नया संग्रह शुरू कर सकते हैं।',
    mr: 'आपला भंगार संकलन लॉट यशस्वीरित्या नोंदवला गेला आहे. आपण लॉट पाहू शकता, रिसायकलर शोधू शकता किंवा नवीन संकलन सुरू करू शकता.',
  };

  const handleViewLot = () => {
    const lotId = flow.lotId || 'LOT-DEMO';
    resetFlow();
    navigate(`/collector/lots/${lotId}`);
  };

  const handleNewCollection = () => {
    resetFlow();
    navigate('/collector/flow/capture');
  };

  const handleGoHome = () => {
    resetFlow();
    navigate('/collector');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB]">
      <Header
        titleOverride={t.lotCreatedTitle}
      />

      <div className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-6 flex flex-col items-center justify-center gap-6">
        {/* Audio Guidance Card */}
        <div className="w-full max-w-sm">
          <AudioGuidanceCard
            audioId="A21_lot_created"
            instruction={createdAudioPrompts[language] || createdAudioPrompts.hi}
          />
        </div>

        {/* Success Animation */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-[#ECFDF5] border-4 border-[#14532D] flex items-center justify-center shadow-mech animate-bounce">
            <CheckCircle className="w-12 h-12 text-[#14532D] stroke-[3]" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#F59E0B] border-2 border-[#1C1917] flex items-center justify-center">
            <span className="text-sm font-black">✓</span>
          </div>
        </div>

        <div className="text-center space-y-2">
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#14532D]">
            {t.lotCreatedTitle}
          </h1>
          <p className="text-base font-semibold text-[#57534E] max-w-sm mx-auto">
            {t.lotCreatedMsg}
          </p>
        </div>

        {/* Digital Lot ID Card with QR Code */}
        <div className="w-full max-w-sm">
          <DigitalLotQrCard
            lotId={flow.lotId || 'LOT-2026-DEMO'}
            size={180}
            compact={false}
          />
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-3">
          <button
            onClick={handleViewLot}
            className="w-full bg-[#14532D] hover:bg-[#0F3F22] text-white border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-base sm:text-lg tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
          >
            <Eye className="w-5 h-5" />
            <span>{t.lotCreatedViewBtn}</span>
          </button>

          <button
            onClick={handleNewCollection}
            className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1917] border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-base sm:text-lg tracking-wide shadow-mech-sm flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
          >
            <PlusCircle className="w-5 h-5" />
            <span>{t.lotCreatedNewBtn}</span>
          </button>

          <button
            onClick={handleGoHome}
            className="w-full bg-white hover:bg-[#F2EEDE] text-[#1C1917] border-2 border-[#1C1917] rounded-lg py-3 px-4 font-heading font-black text-base tracking-wide shadow-mech-sm flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
          >
            <Home className="w-5 h-5" />
            <span>{t.lotCreatedHomeBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
