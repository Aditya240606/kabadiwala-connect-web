import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Scale,
  CheckCircle,
  ArrowRight,
  Info,
  ExternalLink
} from 'lucide-react';
import { Header } from '../../components/common/Header';
import { useApp } from '../../hooks/useApp';
import { collectionRepository } from '../../services/collectionRepository';
import type { HandoverTransactionDto, QualityGrade } from '../../models/collection';
import { getCategoryDisplayName } from '../../data/categories';

export const RecyclerReceivePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useApp();

  const [txn, setTxn] = useState<HandoverTransactionDto | null>(null);
  const [receivedWeight, setReceivedWeight] = useState<string>('2.0');
  const [qualityGrade, setQualityGrade] = useState<QualityGrade>('ACCEPTED');
  const [ratePerKg, setRatePerKg] = useState<string>('295');
  const [notes, setNotes] = useState<string>('Clean dismantled PCB, minor connector oxidation');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const txnId = id || 'TXN-2026-001';

  useEffect(() => {
    collectionRepository.getTransactionById(txnId).then((data) => {
      if (data) {
        setTxn(data);
        if (data.receivedWeightKg) {
          setReceivedWeight(String(data.receivedWeightKg));
        } else if (data.declaredWeightKg) {
          // Default slightly different for realistic demo
          const demoRec = Math.max(0.1, Number((data.declaredWeightKg - 0.1).toFixed(1)));
          setReceivedWeight(String(demoRec));
        }
        if (data.agreedPricePerKg) {
          setRatePerKg(String(data.agreedPricePerKg));
        }
      }
    });
  }, [txnId]);

  const numWeight = parseFloat(receivedWeight) || 0;
  const numRate = parseFloat(ratePerKg) || 0;
  const calculatedTotal = Math.round(numWeight * numRate);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txn || isSubmitting) return;

    setIsSubmitting(true);
    await collectionRepository.collectHandover({
      transactionId: txn.id,
      confirmedWeightKg: numWeight,
      confirmedPricePerKg: numRate,
      qualityGrade,
      notes,
    });
    setIsSubmitting(false);
    navigate(`/recycler/settle/${txn.id}`);
  };

  const materialName = (language === 'hi' && txn?.materialTitleHindi)
    ? txn.materialTitleHindi
    : (language === 'mr' && txn?.materialTitleMarathi)
      ? txn.materialTitleMarathi
      : txn?.materialTitleEnglish || getCategoryDisplayName(txn?.materialCategoryCode || 'PCB_MOTHERBOARD', language);

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB] min-h-screen">
      <Header
        showBack
        onBack={() => navigate(`/recycler/lot/${txnId}`)}
        titleOverride={t.receiveTitle}
        subtitleOverride={t.receiveSub}
      />

      <div className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-6 space-y-4 overflow-y-auto pb-16">
        {/* Role Switcher Banner */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-3 shadow-mech-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="bg-[#B45309] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
              {language === 'hi' ? 'रिसाइक्लर मोड' : language === 'mr' ? 'रिसायकलर मोड' : 'RECYCLER MODE'}
            </span>
            <span className="text-xs font-semibold text-[#57534E]">
              {language === 'hi' ? 'यार्ड में भौतिक सामग्री प्राप्त करें' : language === 'mr' ? 'यार्डवर प्रत्यक्ष सामग्री स्वीकारा' : 'Physical Handover & Weight Recording'}
            </span>
          </div>

          <button
            onClick={() => navigate(`/collector/transactions/${txnId}`)}
            className="w-full sm:w-auto bg-[#14532D] hover:bg-[#0F3F22] text-white border border-[#1C1917] rounded px-3 py-1.5 font-heading font-black text-xs shadow-mech-sm flex items-center justify-center gap-1.5 active:translate-y-0.5 transition-all"
          >
            <span>{t.recyclerRoleSwitchToCollector}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Lot Header Info */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-5 shadow-mech space-y-3">
          <div className="flex items-center justify-between border-b border-[#E2D9C8] pb-2.5">
            <span className="font-mono font-black text-base text-[#1C1917]">
              {txnId}
            </span>
            <span className="text-sm font-semibold text-[#57534E]">
              {txn?.lotId}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-[#57534E] uppercase block">
                {t.reviewCategory}
              </span>
              <h3 className="font-heading font-black text-lg sm:text-xl text-[#14532D]">
                {materialName}
              </h3>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-[#57534E] uppercase block">
                {t.paymentEstValue}
              </span>
              <span className="font-heading font-black text-xl sm:text-2xl text-[#B45309]">
                ₹{txn?.estimatedTotal ?? 620}
              </span>
            </div>
          </div>
        </div>

        {/* Non-negotiable Product Truth: Manual Weighing */}
        <div className="bg-[#FEF3C7] border-2 border-[#B45309] rounded-lg p-3.5 shadow-mech-sm flex items-start gap-2.5">
          <Info className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
          <p className="text-sm text-[#78350F] font-semibold leading-relaxed">
            {t.receiveManualOnlyNotice}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Side-by-side Weight Comparison Card */}
          <div className="bg-white border-2 border-[#1C1917] rounded-lg p-5 shadow-mech space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E2D9C8] pb-2.5">
              <Scale className="w-5 h-5 text-[#14532D]" />
              <h3 className="font-heading font-black text-sm text-[#1C1917] uppercase tracking-wider">
                {t.declaredVsReceived}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Field 1: Collector Declared (Read-only, Unchanged) */}
              <div className="bg-[#F2EEDE] border-2 border-[#1C1917] rounded-lg p-4 space-y-1.5">
                <span className="text-xs font-bold text-[#57534E] uppercase tracking-wider block">
                  {t.receiveCollectorDeclared}
                </span>
                <div className="font-mono font-black text-2xl sm:text-3xl text-[#1C1917]">
                  {txn?.declaredWeightKg ?? 2.1} <span className="text-base font-bold text-[#57534E]">KG</span>
                </div>
                <p className="text-xs font-semibold text-[#78716C]">
                  {language === 'hi' ? 'कबाड़ीवाला द्वारा दर्ज (अपरिवर्तनीय)' : language === 'mr' ? 'कबाड़ीवाला यांनी नोंदवलेले (अपरिवर्तनीय)' : 'Collector declared (Fixed baseline)'}
                </p>
              </div>

              {/* Field 2: Recycler Received Weight (Editable, Manual Entry) */}
              <div className="bg-[#F2F9F3] border-2 border-[#14532D] rounded-lg p-4 space-y-1.5 ring-1 ring-[#14532D]">
                <label className="text-xs font-bold text-[#14532D] uppercase tracking-wider block">
                  {t.receiveActualWeight} (KG) *
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="10000"
                    required
                    value={receivedWeight}
                    onChange={(e) => setReceivedWeight(e.target.value)}
                    className="w-full bg-white border-2 border-[#1C1917] rounded-md px-3 py-1.5 font-mono font-black text-2xl sm:text-3xl text-[#14532D] outline-none focus:ring-2 focus:ring-[#14532D]"
                  />
                  <span className="font-heading font-black text-lg text-[#14532D]">
                    KG
                  </span>
                </div>
                <p className="text-xs font-semibold text-[#166534]">
                  {t.receiveWeightInstruction}
                </p>
              </div>
            </div>
          </div>

          {/* Quality / Grade Selection */}
          <div className="bg-white border-2 border-[#1C1917] rounded-lg p-5 shadow-mech space-y-3.5">
            <h3 className="font-heading font-black text-sm text-[#1C1917] uppercase tracking-wider block">
              {t.qualityTitle}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'ACCEPTED' as QualityGrade, label: t.qualityAccepted, color: '#14532D', desc: 'Clean, sorted' },
                { id: 'MIXED' as QualityGrade, label: t.qualityMixed, color: '#B45309', desc: 'Slight foreign scrap' },
                { id: 'NEEDS_REVIEW' as QualityGrade, label: t.qualityReview, color: '#78716C', desc: 'Moisture / dirt' },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setQualityGrade(opt.id)}
                  className={`border-2 rounded-lg p-3.5 text-left transition-all ${
                    qualityGrade === opt.id
                      ? 'border-[#14532D] bg-[#ECFDF5] shadow-mech-sm ring-1 ring-[#14532D]'
                      : 'border-[#1C1917] bg-white hover:border-[#14532D]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-black text-sm text-[#1C1917]">
                      {opt.label}
                    </span>
                    {qualityGrade === opt.id && (
                      <CheckCircle className="w-4 h-4 text-[#14532D]" />
                    )}
                  </div>
                  <span className="text-xs text-[#57534E] font-medium block mt-1">
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Agreed Rate & Calculated Amount */}
          <div className="bg-white border-2 border-[#1C1917] rounded-lg p-5 shadow-mech space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-[#57534E] uppercase tracking-wider block mb-1">
                  {t.agreedRateLabel} (₹/KG)
                </label>
                <input
                  type="number"
                  step="1"
                  min="1"
                  value={ratePerKg}
                  onChange={(e) => setRatePerKg(e.target.value)}
                  className="w-full bg-[#F2EEDE] border-2 border-[#1C1917] rounded-md px-3 py-2 font-mono font-bold text-xl text-[#1C1917] outline-none focus:border-[#14532D]"
                />
              </div>

              <div className="bg-[#FFFBEB] border border-[#B45309] rounded-md p-3.5 flex flex-col justify-between">
                <span className="text-xs font-bold text-[#57534E] uppercase tracking-wider block">
                  {t.calculatedPayout}
                </span>
                <span className="font-heading font-black text-2xl sm:text-3xl text-[#B45309]">
                  ₹{calculatedTotal}
                </span>
                <span className="text-xs text-[#78350F] font-semibold">
                  {numWeight} KG × ₹{numRate}/KG
                </span>
              </div>
            </div>
          </div>

          {/* Inspection Note */}
          <div className="bg-white border-2 border-[#1C1917] rounded-lg p-5 shadow-mech space-y-2">
            <label className="text-xs font-bold text-[#57534E] uppercase tracking-wider block">
              {language === 'hi' ? 'निरीक्षण नोट (वैकल्पिक)' : language === 'mr' ? 'तपासणी नोंद (पर्यायी)' : 'Inspection Note (Optional)'}
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#F2EEDE] border-2 border-[#1C1917] rounded-md px-3 py-2.5 text-sm font-semibold text-[#1C1917] outline-none focus:border-[#14532D]"
              placeholder="e.g., Clean Dismantled Class A"
            />
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            disabled={isSubmitting || numWeight <= 0}
            className={`w-full border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-base sm:text-lg tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all ${
              isSubmitting
                ? 'bg-[#E2D9C8] text-[#78716C] cursor-wait'
                : 'bg-[#14532D] hover:bg-[#0F3F22] text-white'
            }`}
          >
            <CheckCircle className="w-5 h-5 stroke-[2.5]" />
            <span>{isSubmitting ? 'Recording…' : t.receiveConfirmBtn}</span>
            <ArrowRight className="w-5 h-5 ml-auto stroke-[3]" />
          </button>
        </form>
      </div>
    </div>
  );
};
