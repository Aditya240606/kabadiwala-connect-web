import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cpu, CheckCircle, ArrowRight, RefreshCw, Hand } from 'lucide-react';
import { Header } from '../../../components/common/Header';
import { FlowStepIndicator } from '../../../components/common/FlowStepIndicator';
import { useApp } from '../../../hooks/useApp';
import { useCollectionFlow } from '../../../hooks/useCollectionFlow';
import type { ClassificationResult } from '../../../context/CollectionFlowContext';
import { EWASTE_CATEGORIES, getCategoryDisplayName } from '../../../data/categories';

/**
 * Demo AI classification — simulates the backend POST /{id}/classify-ai endpoint.
 * In production, this would POST the photo to the Spring Boot backend.
 */
function simulateAiClassification(): Promise<ClassificationResult> {
  return new Promise((resolve) => {
    const delay = 1500 + Math.random() * 1500;
    const cats = EWASTE_CATEGORIES.filter(c => ['SMARTPHONE', 'PCB_MOTHERBOARD', 'COPPER_WIRE', 'TELECOM_CARDS', 'BATTERY_PACK'].includes(c.code));
    const pick = cats[Math.floor(Math.random() * cats.length)];
    setTimeout(() => {
      resolve({
        predictedClass: pick.displayName,
        confidence: 0.65 + Math.random() * 0.3,
        suggestedCategoryCode: pick.code,
        suggestedCategoryDisplayName: pick.displayName,
        modelName: 'ewaste-classifier-v2',
        modelVersion: '2.1.0',
        needsConfirmation: true,
        requiresManualSelection: false,
      });
    }, delay);
  });
}

export const ClassificationResultPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, t } = useApp();
  const { flow, setClassificationResult, confirmCategory } = useCollectionFlow();
  const [isLoading, setIsLoading] = useState(!flow.classificationResult);
  const [result, setResult] = useState<ClassificationResult | null>(flow.classificationResult);

  useEffect(() => {
    if (!flow.photoDataUrl) {
      navigate('/collector/flow/capture', { replace: true });
      return;
    }
    if (!result) {
      simulateAiClassification().then((r) => {
        setResult(r);
        setClassificationResult(r);
        setIsLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flow.photoDataUrl, navigate]);

  const handleConfirm = () => {
    if (!result) return;
    confirmCategory(result.suggestedCategoryCode, result.suggestedCategoryDisplayName, 'AI_CONFIRMED');
    navigate('/collector/flow/weight');
  };

  const handleCorrect = () => {
    navigate('/collector/flow/manual-category', { state: { fromAi: true } });
  };

  const handleManual = () => {
    navigate('/collector/flow/manual-category');
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col bg-[#FFFBEB]">
        <Header
          showBack
          onBack={() => navigate('/collector/flow/capture')}
          titleOverride={t.classifyingTitle}
        />
        <div className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-6 space-y-4 overflow-y-auto pb-12">
          <FlowStepIndicator currentStep={2} />

          <div className="bg-white border-2 border-[#1C1917] rounded-lg p-8 shadow-mech flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#F59E0B] border-2 border-[#1C1917] flex items-center justify-center animate-pulse shadow-mech">
              <Cpu className="w-8 h-8 text-[#1C1917]" />
            </div>
            <h2 className="font-heading font-black text-xl sm:text-2xl text-[#1C1917] text-center">
              {t.classifyingTitle}
            </h2>
            <p className="text-base text-[#57534E] font-semibold text-center">
              {t.classifyingMsg}
            </p>

            {/* Loading bar */}
            <div className="w-full h-2 bg-[#E2D9C8] rounded overflow-hidden">
              <div className="h-full bg-[#14532D] rounded animate-[loading_2s_ease-in-out_infinite]" style={{ width: '60%' }} />
            </div>

            {/* Thumbnail preview */}
            {flow.photoDataUrl && (
              <img
                src={flow.photoDataUrl}
                alt="Material"
                className="w-28 h-28 rounded border-2 border-[#E2D9C8] object-cover mt-2 opacity-60"
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // Result state
  const confidencePercent = result ? Math.round(result.confidence * 100) : 0;
  const displayName = result ? getCategoryDisplayName(result.suggestedCategoryCode, language) : '';

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB]">
      <Header
        showBack
        onBack={() => navigate('/collector/flow/capture')}
        titleOverride={t.classifyResultTitle}
      />

      <div className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-6 space-y-4 overflow-y-auto pb-12">
        <FlowStepIndicator currentStep={2} />

        {/* Result Card */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg shadow-mech overflow-hidden">
          {/* Photo + Category overlay */}
          <div className="relative">
            {flow.photoDataUrl && (
              <img
                src={flow.photoDataUrl}
                alt="Material"
                className="w-full aspect-[16/9] object-cover"
              />
            )}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1C1917]/90 to-transparent p-4 pt-12">
              <span className="bg-[#F59E0B] text-[#1C1917] text-xs font-black px-2 py-0.5 rounded uppercase">
                {t.classifySuggested}
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1.5 leading-tight">
                {displayName}
              </h2>
            </div>
          </div>

          {/* Confidence & Model */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#57534E] uppercase tracking-wider block">
                  {t.classifyConfidence}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-24 h-2.5 bg-[#E2D9C8] rounded overflow-hidden">
                    <div
                      className="h-full rounded transition-all duration-500"
                      style={{
                        width: `${confidencePercent}%`,
                        backgroundColor: confidencePercent > 80 ? '#15803D' : confidencePercent > 50 ? '#F59E0B' : '#DC2626',
                      }}
                    />
                  </div>
                  <span className="font-heading font-black text-base text-[#1C1917]">
                    {confidencePercent}%
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-[#57534E] uppercase tracking-wider block">
                  {t.classifyModel}
                </span>
                <span className="text-xs sm:text-sm font-bold text-[#78716C]">
                  {result?.modelName} v{result?.modelVersion}
                </span>
              </div>
            </div>

            <div className="bg-[#ECFDF5] border border-[#14532D]/30 rounded p-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#14532D]" />
              <span className="text-xs sm:text-sm font-bold text-[#166534]">
                {t.classifyAiAssisted}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={handleConfirm}
            className="w-full bg-[#14532D] hover:bg-[#0F3F22] text-white border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-lg tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
          >
            <CheckCircle className="w-5 h-5 stroke-[2.5]" />
            <span>{t.classifyConfirmBtn}</span>
            <ArrowRight className="w-5 h-5 ml-auto stroke-[2.5]" />
          </button>

          <button
            onClick={handleCorrect}
            className="w-full bg-white hover:bg-[#F2EEDE] text-[#1C1917] border-2 border-[#1C1917] rounded-lg py-3 px-4 font-heading font-black text-base tracking-wide shadow-mech-sm flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{t.classifyCorrectBtn}</span>
          </button>

          <button
            onClick={handleManual}
            className="w-full bg-[#FEF3C7] hover:bg-[#FDE68A] text-[#78350F] border-2 border-[#1C1917] rounded-lg py-3 px-4 font-heading font-black text-base tracking-wide shadow-mech-sm flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
          >
            <Hand className="w-4 h-4" />
            <span>{t.classifyManualBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
