import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Edit3, Layers, Scale, Camera, Tag, ArrowRight } from 'lucide-react';
import { Header } from '../../../components/common/Header';
import { FlowStepIndicator } from '../../../components/common/FlowStepIndicator';
import { useApp } from '../../../hooks/useApp';
import { useCollectionFlow } from '../../../hooks/useCollectionFlow';
import { getCategoryByCode, getCategoryDisplayName } from '../../../data/categories';
import { collectionRepository } from '../../../services/collectionRepository';

export const ReviewLotPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, t } = useApp();
  const { flow, setLotId, setStep } = useCollectionFlow();
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (!flow.weightKg || !flow.confirmedCategoryCode) {
      navigate('/collector/flow/capture', { replace: true });
    }
  }, [flow.weightKg, flow.confirmedCategoryCode, navigate]);

  const cat = flow.confirmedCategoryCode ? getCategoryByCode(flow.confirmedCategoryCode) : null;
  const catDisplayName = flow.confirmedCategoryCode ? getCategoryDisplayName(flow.confirmedCategoryCode, language) : '';
  const CatIcon = cat?.icon || Layers;

  const methodLabel = flow.classificationMethod === 'AI_CONFIRMED'
    ? t.classifyAiAssisted
    : flow.classificationMethod === 'AI_CORRECTED'
      ? `${t.classifyAiAssisted} → ${t.classifyCorrectBtn}`
      : t.classifyManualBtn;

  const handleCreate = async () => {
    setIsCreating(true);
    try {
      const result = await collectionRepository.createLot({
        categoryCode: flow.confirmedCategoryCode || undefined,
        notes: flow.notes,
        weightKg: flow.weightKg || undefined,
        classificationMethod: flow.classificationMethod || undefined,
        predictedClass: flow.classificationResult?.predictedClass,
        confidence: flow.classificationResult?.confidence,
        modelName: flow.classificationResult?.modelName,
      });
      setLotId(result.id);
      setStep('created');
      navigate('/collector/flow/created');
    } catch (err) {
      console.warn('Error creating lot via repository, falling back:', err);
      const fallbackId = `LOT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
      setLotId(fallbackId);
      setStep('created');
      navigate('/collector/flow/created');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB]">
      <Header
        showBack
        onBack={() => navigate(-1)}
        titleOverride={t.reviewTitle}
        subtitleOverride={t.flowStep4Review}
      />

      <div className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-6 space-y-4 overflow-y-auto pb-12">
        <FlowStepIndicator currentStep={4} />

        {/* Review Card */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg shadow-mech overflow-hidden">
          {/* Photo strip */}
          {flow.photoDataUrl && (
            <div className="relative">
              <img
                src={flow.photoDataUrl}
                alt="Material"
                className="w-full aspect-[16/9] object-cover"
              />
              <button
                onClick={() => navigate('/collector/flow/capture')}
                className="absolute top-3 right-3 bg-white/90 border border-[#1C1917] rounded px-2 py-1 text-[10px] font-black flex items-center gap-1"
              >
                <Edit3 className="w-3 h-3" />
                {t.reviewEditBtn}
              </button>
            </div>
          )}

          {/* Details Grid */}
          <div className="p-4 space-y-3">
            {/* Category Row */}
            <div className="flex items-center justify-between border-b border-[#E2D9C8] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded bg-[#ECFDF5] border border-[#14532D] flex items-center justify-center">
                  <CatIcon className="w-5 h-5 text-[#14532D]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#57534E] uppercase tracking-wider block">
                    {t.reviewCategory}
                  </span>
                  <span className="font-heading font-black text-sm text-[#1C1917]">
                    {catDisplayName}
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate('/collector/flow/manual-category')}
                className="text-[10px] font-black text-[#14532D] border border-[#14532D] rounded px-2 py-0.5 hover:bg-[#ECFDF5]"
              >
                {t.reviewEditBtn}
              </button>
            </div>

            {/* Weight Row */}
            <div className="flex items-center justify-between border-b border-[#E2D9C8] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded bg-[#FFFBEB] border border-[#B45309] flex items-center justify-center">
                  <Scale className="w-5 h-5 text-[#B45309]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#57534E] uppercase tracking-wider block">
                    {t.reviewWeight}
                  </span>
                  <span className="font-heading font-black text-lg text-[#1C1917]">
                    {flow.weightKg} {t.weightUnit}
                  </span>
                </div>
              </div>
              <button
                onClick={() => navigate('/collector/flow/weight')}
                className="text-[10px] font-black text-[#14532D] border border-[#14532D] rounded px-2 py-0.5 hover:bg-[#ECFDF5]"
              >
                {t.reviewEditBtn}
              </button>
            </div>

            {/* Est. Value */}
            <div className="bg-[#FFFBEB] border border-[#E2D9C8] rounded-lg p-3">
              <span className="text-[10px] font-bold text-[#57534E] uppercase tracking-wider block">
                {t.reviewEstValue}
              </span>
              <span className="font-heading font-black text-2xl text-[#B45309] block mt-0.5">
                ₹{flow.estimatedTotal ?? 0}
              </span>
              <span className="text-[10px] font-semibold text-[#78716C]">
                {t.reviewIndicativeNote}
              </span>
            </div>

            {/* Method & Photo badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 bg-[#ECFDF5] text-[#14532D] border border-[#14532D]/30 text-[10px] font-black px-2 py-0.5 rounded">
                <Tag className="w-3 h-3" />
                {methodLabel}
              </span>
              {flow.photoDataUrl && (
                <span className="inline-flex items-center gap-1 bg-[#F2EEDE] text-[#57534E] border border-[#E2D9C8] text-[10px] font-black px-2 py-0.5 rounded">
                  <Camera className="w-3 h-3" />
                  {t.reviewPhoto}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Create Lot Button */}
        <button
          onClick={handleCreate}
          disabled={isCreating}
          className={`w-full border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-sm tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all ${
            isCreating
              ? 'bg-[#E2D9C8] text-[#78716C] cursor-wait'
              : 'bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1917]'
          }`}
        >
          {isCreating ? (
            <span className="animate-pulse">{t.reviewCreateBtn}…</span>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 stroke-[3]" />
              <span>{t.reviewCreateBtn}</span>
              <ArrowRight className="w-5 h-5 ml-auto stroke-[3]" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
