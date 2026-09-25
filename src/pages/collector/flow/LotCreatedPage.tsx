import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Eye, PlusCircle, Home } from 'lucide-react';
import { Header } from '../../../components/common/Header';
import { useApp } from '../../../hooks/useApp';
import { useCollectionFlow } from '../../../hooks/useCollectionFlow';

export const LotCreatedPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useApp();
  const { flow, resetFlow } = useCollectionFlow();

  const handleViewLot = () => {
    const lotId = flow.lotId || 'LOT-DEMO';
    resetFlow();
    navigate(`/collector/collections/${lotId}`);
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
          <h1 className="font-heading font-black text-2xl text-[#14532D]">
            {t.lotCreatedTitle}
          </h1>
          <p className="text-sm font-semibold text-[#57534E] max-w-xs mx-auto">
            {t.lotCreatedMsg}
          </p>
        </div>

        {/* Lot ID Card */}
        {flow.lotId && (
          <div className="bg-white border-2 border-[#1C1917] rounded-lg p-4 shadow-mech-sm w-full max-w-xs text-center">
            <span className="text-[10px] font-bold text-[#57534E] uppercase tracking-wider block">
              {t.lotCreatedId}
            </span>
            <span className="font-heading font-black text-lg text-[#1C1917] font-mono block mt-1">
              {flow.lotId}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="w-full max-w-xs space-y-2.5">
          <button
            onClick={handleViewLot}
            className="w-full bg-[#14532D] hover:bg-[#0F3F22] text-white border-2 border-[#1C1917] rounded-lg py-3 px-4 font-heading font-black text-sm tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
          >
            <Eye className="w-5 h-5" />
            <span>{t.lotCreatedViewBtn}</span>
          </button>

          <button
            onClick={handleNewCollection}
            className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1917] border-2 border-[#1C1917] rounded-lg py-3 px-4 font-heading font-black text-sm tracking-wide shadow-mech-sm flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
          >
            <PlusCircle className="w-5 h-5" />
            <span>{t.lotCreatedNewBtn}</span>
          </button>

          <button
            onClick={handleGoHome}
            className="w-full bg-white hover:bg-[#F2EEDE] text-[#1C1917] border-2 border-[#1C1917] rounded-lg py-3 px-4 font-heading font-black text-sm tracking-wide shadow-mech-sm flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
          >
            <Home className="w-5 h-5" />
            <span>{t.lotCreatedHomeBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
