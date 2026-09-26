import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Building2, Package, Scale, ArrowRight, ShieldAlert, FileText, Eye, Home } from 'lucide-react';
import { Header } from '../../../components/common/Header';
import { AudioGuidanceCard } from '../../../components/common/AudioGuidanceCard';
import { useApp } from '../../../hooks/useApp';
import { useCollectionFlow } from '../../../hooks/useCollectionFlow';
import { collectionRepository } from '../../../services/collectionRepository';
import type { RecyclerDto, CollectionLot } from '../../../models/collection';
import { getCategoryDisplayName } from '../../../data/categories';

export const HandoverRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { language, t } = useApp();
  const { flow } = useCollectionFlow();

  const lotIdParam = searchParams.get('lotId') || flow.lotId || 'LOT-2026-0818';
  const recyclerIdParam = searchParams.get('recyclerId') || 'rec-pune-01';

  const [lot, setLot] = useState<CollectionLot | null>(null);
  const [recycler, setRecycler] = useState<RecyclerDto | null>(null);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTxnId, setSubmittedTxnId] = useState<string | null>(null);

  useEffect(() => {
    collectionRepository.getLotById(lotIdParam).then(setLot);
    collectionRepository.getRecyclerById(recyclerIdParam).then(setRecycler);
  }, [lotIdParam, recyclerIdParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recycler || isSubmitting) return;

    setIsSubmitting(true);
    const txn = await collectionRepository.initiateHandover({
      lotId: lotIdParam,
      recyclerId: recycler.id,
      notes,
    });
    setSubmittedTxnId(txn.id);
    setIsSubmitting(false);
  };

  const facilityName = recycler
    ? (language === 'hi' && recycler.facilityNameHi)
      ? recycler.facilityNameHi
      : (language === 'mr' && recycler.facilityNameMr)
        ? recycler.facilityNameMr
        : recycler.facilityName
    : '';

  const facilityAddress = recycler
    ? (language === 'hi' && recycler.locationAddressHi)
      ? recycler.locationAddressHi
      : (language === 'mr' && recycler.locationAddressMr)
        ? recycler.locationAddressMr
        : recycler.locationAddress
    : '';

  // Success Confirmation State
  if (submittedTxnId) {
    return (
      <div className="flex-1 flex flex-col bg-[#FFFBEB]">
        <Header titleOverride={t.handoverSuccessTitle} />

        <div className="flex-1 w-full max-w-xl mx-auto p-4 md:p-6 flex flex-col items-center justify-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-[#ECFDF5] border-4 border-[#14532D] flex items-center justify-center shadow-mech animate-bounce">
              <CheckCircle className="w-12 h-12 text-[#14532D] stroke-[3]" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#14532D]">
              {t.handoverSuccessTitle}
            </h1>
            <p className="text-base font-semibold text-[#57534E] max-w-md mx-auto">
              {t.handoverSuccessMsg}
            </p>
          </div>

          {/* Transaction Card */}
          <div className="bg-white border-2 border-[#1C1917] rounded-lg p-5 shadow-mech w-full space-y-2 text-center">
            <span className="text-xs font-black text-[#57534E] uppercase tracking-wider block">
              {t.handoverTxnId}
            </span>
            <span className="font-heading font-black text-2xl sm:text-3xl text-[#1C1917] font-mono block">
              {submittedTxnId}
            </span>
            <div className="pt-2 border-t border-[#E2D9C8] flex flex-wrap justify-between gap-2 text-sm text-[#57534E]">
              <span>{language === 'hi' ? 'लॉट संख्या' : language === 'mr' ? 'लॉट क्रमांक' : 'Lot Ref'}: <strong className="text-[#1C1917]">{lotIdParam}</strong></span>
              <span>{language === 'hi' ? 'सुविधा' : language === 'mr' ? 'सुविधा' : 'Facility'}: <strong className="text-[#1C1917]">{facilityName}</strong></span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="w-full space-y-3">
            <button
              onClick={() => navigate(`/collector/transactions/${submittedTxnId}`)}
              className="w-full bg-[#14532D] hover:bg-[#0F3F22] text-white border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-base sm:text-lg tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
            >
              <FileText className="w-5 h-5" />
              <span>{t.trackTransactionBtn}</span>
              <ArrowRight className="w-5 h-5 ml-auto" />
            </button>

            <button
              onClick={() => navigate('/recycler')}
              className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1917] border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-base tracking-wide shadow-mech-sm flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
            >
              <Building2 className="w-5 h-5" />
              <span>{t.collectorRoleSwitchToRecycler}</span>
            </button>

            <button
              onClick={() => navigate(`/collector/collections/${lotIdParam}`)}
              className="w-full bg-white hover:bg-[#F2EEDE] text-[#1C1917] border-2 border-[#1C1917] rounded-lg py-3 px-4 font-heading font-black text-base tracking-wide shadow-mech-sm flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
            >
              <Eye className="w-5 h-5" />
              <span>{t.handoverViewLotBtn}</span>
            </button>

            <button
              onClick={() => navigate('/collector')}
              className="w-full bg-[#F2EEDE] hover:bg-[#E2D9C8] text-[#1C1917] border-2 border-[#1C1917] rounded-lg py-3 px-4 font-heading font-black text-base tracking-wide shadow-mech-sm flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
            >
              <Home className="w-5 h-5" />
              <span>{t.lotCreatedHomeBtn}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handoverAudioPrompts: Record<string, string> = {
    en: 'Review the scrap lot details and destination recycler facility, then submit your handover request.',
    hi: 'स्क्रैप लॉट विवरण और गंतव्य रिसाइक्लर सुविधा की समीक्षा करें, फिर हस्तांतरण अनुरोध भेजें।',
    mr: 'भंगार लॉट तपशील आणि गंतव्य रिसायकलर सुविधेचे पुनरावलोकन करा, नंतर हस्तांतरण विनंती पाठवा.',
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB]">
      <Header
        showBack
        onBack={() => navigate(-1)}
        titleOverride={t.handoverTitle}
        subtitleOverride={t.handoverSub}
      />

      <div className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-6 space-y-4 overflow-y-auto pb-12">
        {/* Audio Guidance Card */}
        <AudioGuidanceCard
          audioId="A09_handover_request"
          instruction={handoverAudioPrompts[language] || handoverAudioPrompts.hi}
        />

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Lot Details Card */}
          <div className="bg-white border-2 border-[#1C1917] rounded-lg p-5 shadow-mech space-y-3">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-[#14532D]" />
              <h3 className="font-heading font-black text-sm text-[#1C1917] tracking-wider uppercase">
                {t.handoverLotSummary}
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-[#E2D9C8]">
              <div>
                <span className="text-xs font-bold text-[#57534E] uppercase tracking-wider block">
                  {t.lotCreatedId}
                </span>
                <span className="font-mono font-bold text-base text-[#1C1917]">
                  {lotIdParam}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-[#57534E] uppercase tracking-wider block">
                  {t.reviewCategory}
                </span>
                <span className="font-heading font-black text-base text-[#14532D]">
                  {lot ? getCategoryDisplayName(lot.categoryCode, language) : 'Motherboard PCB'}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-[#57534E] uppercase tracking-wider block">
                  {t.reviewWeight}
                </span>
                <span className="font-heading font-black text-base text-[#1C1917] flex items-center gap-1">
                  <Scale className="w-4 h-4 text-[#B45309]" />
                  {lot ? `${lot.declaredWeightKg} KG` : '2.1 KG'}
                </span>
              </div>
            </div>

            <div className="bg-[#FFFBEB] border border-[#E2D9C8] rounded p-3 flex items-center justify-between text-sm">
              <span className="font-bold text-[#57534E] uppercase text-xs">
                {t.reviewEstValue}:
              </span>
              <span className="font-heading font-black text-xl sm:text-2xl text-[#B45309]">
                ₹{lot?.estimatedPrice ?? 620}
              </span>
            </div>
          </div>

          {/* 2. Destination Recycler Facility */}
          {recycler && (
            <div className="bg-white border-2 border-[#1C1917] rounded-lg p-5 shadow-mech space-y-2.5">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#B45309]" />
                <h3 className="font-heading font-black text-sm text-[#1C1917] tracking-wider uppercase">
                  {t.handoverTargetFacility}
                </h3>
              </div>

              <div className="pt-2 border-t border-[#E2D9C8] flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h4 className="font-heading font-black text-base sm:text-lg text-[#1C1917]">
                    {facilityName}
                  </h4>
                  <p className="text-sm text-[#57534E] font-medium mt-0.5">
                    {facilityAddress}, {recycler.city}
                  </p>
                  <p className="text-sm text-[#14532D] font-bold mt-1">
                    {recycler.contactPhone}
                  </p>
                </div>
                <span className="bg-[#ECFDF5] text-[#14532D] border border-[#14532D] text-xs font-black px-2 py-0.5 rounded uppercase">
                  {t.matchingVerifiedBadge}
                </span>
              </div>
            </div>
          )}

          {/* 3. Handover Notes */}
          <div className="bg-white border-2 border-[#1C1917] rounded-lg p-5 shadow-mech space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#57534E]" />
              <label className="font-heading font-black text-sm text-[#1C1917] tracking-wider uppercase block">
                {t.handoverNotesLabel}
              </label>
            </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.handoverNotesPlaceholder}
              rows={3}
              className="w-full bg-[#F2EEDE] border-2 border-[#1C1917] rounded-md p-3 text-sm font-semibold text-[#1C1917] outline-none focus:border-[#14532D] focus:ring-2 focus:ring-[#14532D]/20 transition-all placeholder:text-[#78716C]/60"
            />
          </div>

          {/* 4. Truth Alert */}
          <div className="bg-[#FEF3C7] border-2 border-[#1C1917] rounded-lg p-3.5 shadow-mech-sm flex items-start gap-2.5">
            <ShieldAlert className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
            <p className="text-sm text-[#78350F] font-semibold leading-relaxed">
              {t.recyclerPolicyNotice}
            </p>
          </div>

          {/* 5. Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-base sm:text-lg tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all ${
              isSubmitting
                ? 'bg-[#E2D9C8] text-[#78716C] cursor-wait'
                : 'bg-[#14532D] hover:bg-[#0F3F22] text-white'
            }`}
          >
            {isSubmitting ? (
              <span className="animate-pulse">{language === 'hi' ? 'अनुरोध भेजा जा रहा है…' : language === 'mr' ? 'विनंती पाठवत आहे…' : 'Submitting request…'}</span>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 stroke-[3]" />
                <span>{t.handoverSubmitBtn}</span>
                <ArrowRight className="w-5 h-5 ml-auto stroke-[3]" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
