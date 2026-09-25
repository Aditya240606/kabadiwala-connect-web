import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, ArrowRight, Info } from 'lucide-react';
import { Header } from '../../../components/common/Header';
import { FlowStepIndicator } from '../../../components/common/FlowStepIndicator';
import { useApp } from '../../../hooks/useApp';
import { useCollectionFlow } from '../../../hooks/useCollectionFlow';
import { getCategoryByCode, getCategoryDisplayName } from '../../../data/categories';

export const WeightEntryPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, t } = useApp();
  const { flow, setWeight, setEstimatedPrice } = useCollectionFlow();
  const [weightInput, setWeightInput] = useState(flow.weightKg?.toString() || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!flow.confirmedCategoryCode) {
      navigate('/collector/flow/classify', { replace: true });
    }
  }, [flow.confirmedCategoryCode, navigate]);

  const cat = flow.confirmedCategoryCode ? getCategoryByCode(flow.confirmedCategoryCode) : null;
  const catDisplayName = flow.confirmedCategoryCode ? getCategoryDisplayName(flow.confirmedCategoryCode, language) : '';

  const parsedWeight = parseFloat(weightInput);
  const isValidWeight = !isNaN(parsedWeight) && parsedWeight >= 0.001 && parsedWeight <= 50000;

  const estLow = cat && isValidWeight ? Math.round(parsedWeight * cat.pricePerKgLow) : 0;
  const estHigh = cat && isValidWeight ? Math.round(parsedWeight * cat.pricePerKgHigh) : 0;

  const handleContinue = () => {
    if (!isValidWeight) {
      setError(language === 'hi' ? 'कृपया वैध वज़न दर्ज करें' : language === 'mr' ? 'कृपया वैध वजन नोंदवा' : 'Please enter a valid weight');
      return;
    }
    setWeight(parsedWeight);
    if (cat) {
      const avgPerKg = (cat.pricePerKgLow + cat.pricePerKgHigh) / 2;
      const total = Math.round(parsedWeight * avgPerKg);
      setEstimatedPrice(avgPerKg, total);
    }
    navigate('/collector/flow/review');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB]">
      <Header
        showBack
        onBack={() => navigate(-1)}
        titleOverride={t.weightTitle}
        subtitleOverride={t.flowStep3Weight}
      />

      <div className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-6 space-y-4 overflow-y-auto pb-12">
        <FlowStepIndicator currentStep={3} />

        {/* Category context strip */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-3 shadow-mech-sm flex items-center gap-3">
          {cat && <cat.icon className="w-6 h-6 text-[#14532D]" />}
          <div>
            <span className="font-heading font-black text-sm text-[#1C1917]">{catDisplayName}</span>
            <span className="text-[10px] font-bold text-[#78716C] block uppercase">{t.weightManualNote}</span>
          </div>
        </div>

        {/* Weight Input Card */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-5 shadow-mech space-y-4">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#B45309]" />
            <span className="font-heading font-black text-xs text-[#1C1917] tracking-wider uppercase">
              {t.weightInputLabel}
            </span>
          </div>

          <div className="flex items-end gap-3">
            <div className="flex-1">
              <input
                type="number"
                inputMode="decimal"
                step="0.1"
                min="0.001"
                max="50000"
                value={weightInput}
                onChange={(e) => {
                  setWeightInput(e.target.value);
                  setError('');
                }}
                placeholder="0.0"
                className="w-full bg-[#F2EEDE] border-2 border-[#1C1917] rounded-lg py-4 px-4 font-heading font-black text-3xl text-[#1C1917] text-center outline-none focus:border-[#14532D] focus:ring-2 focus:ring-[#14532D]/20 transition-all placeholder:text-[#78716C]/50"
              />
              {error && (
                <p className="text-xs font-bold text-red-600 mt-1.5">{error}</p>
              )}
            </div>
            <div className="bg-[#14532D] text-white border-2 border-[#1C1917] rounded-lg py-4 px-4 font-heading font-black text-lg shadow-mech-sm">
              {t.weightUnit}
            </div>
          </div>

          {/* Estimated value preview */}
          {isValidWeight && cat && (
            <div className="bg-[#FFFBEB] border border-[#E2D9C8] rounded-lg p-3 space-y-1.5 mt-2">
              <div className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-[#B45309]" />
                <span className="text-[10px] font-bold text-[#57534E] uppercase tracking-wider">
                  {t.reviewEstValue}
                </span>
              </div>
              <span className="font-heading font-black text-2xl text-[#B45309] block">
                ₹{estLow} – ₹{estHigh}
              </span>
              <span className="text-[10px] font-semibold text-[#78716C]">
                {t.reviewIndicativeNote}
              </span>
            </div>
          )}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!isValidWeight}
          className={`w-full border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-sm tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all ${
            isValidWeight
              ? 'bg-[#14532D] hover:bg-[#0F3F22] text-white'
              : 'bg-[#E2D9C8] text-[#78716C] cursor-not-allowed'
          }`}
        >
          <span>{t.weightNextBtn}</span>
          <ArrowRight className="w-5 h-5 ml-auto" />
        </button>
      </div>
    </div>
  );
};
