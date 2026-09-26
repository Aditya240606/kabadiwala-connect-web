import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Scale,
  CheckCircle,
  XCircle,
  FileText,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  Camera,
  Info
} from 'lucide-react';
import { Header } from '../../components/common/Header';
import { AudioGuidanceCard } from '../../components/common/AudioGuidanceCard';
import { useApp } from '../../hooks/useApp';
import { collectionRepository } from '../../services/collectionRepository';
import type { HandoverTransactionDto } from '../../models/collection';
import { getCategoryDisplayName } from '../../data/categories';
import { SAMPLE_EWASTE_PHOTO } from '../../data/samplePhoto';

export const RecyclerLotDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useApp();

  const [txn, setTxn] = useState<HandoverTransactionDto | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const txnId = id || 'TXN-2026-001';

  const loadData = useCallback(() => {
    collectionRepository.getTransactionById(txnId).then((data) => {
      setTxn(data);
    });
  }, [txnId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleAccept = async () => {
    if (!txn || isProcessing) return;
    setIsProcessing(true);
    await collectionRepository.acceptHandover({
      transactionId: txn.id,
      notes: 'Accepted for yard delivery and weighing',
    });
    await loadData();
    setIsProcessing(false);
  };

  const status = txn?.status || 'INITIATED';

  const materialName = (language === 'hi' && txn?.materialTitleHindi)
    ? txn.materialTitleHindi
    : (language === 'mr' && txn?.materialTitleMarathi)
      ? txn.materialTitleMarathi
      : txn?.materialTitleEnglish || getCategoryDisplayName(txn?.materialCategoryCode || 'PCB_MOTHERBOARD', language);

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB] min-h-screen">
      <Header
        showBack
        onBack={() => navigate('/recycler/incoming')}
        titleOverride={t.recyclerLotDetailTitle}
        subtitleOverride={t.recyclerConsoleSub}
      />

      <div className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-6 space-y-4 overflow-y-auto pb-16">
        {/* Role Switcher Banner */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-3 shadow-mech-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="bg-[#B45309] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
              {language === 'hi' ? 'रिसाइक्लर मोड' : language === 'mr' ? 'रिसायकलर मोड' : 'RECYCLER MODE'}
            </span>
            <span className="text-xs font-semibold text-[#57534E]">
              EcoRecycle Green Hub • Yard Inspection
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

        {/* Audio Guidance Card */}
        <AudioGuidanceCard
          audioId="A18_recycler_lot_detail"
          instruction={
            language === 'hi'
              ? 'लॉट निरीक्षण: फोटो और वजन की जांच करें, फिर यार्ड डिलीवरी के लिए हस्तांतरण स्वीकार करें।'
              : language === 'mr'
                ? 'लॉट तपासणी: फोटो आणि वजन तपासा, नंतर यार्ड डिलिव्हरीसाठी हस्तांतरण स्वीकारा.'
                : 'Lot inspection: Review scrap photograph and declared details, then accept handover for yard delivery.'
          }
        />

        {/* Transaction Header Card */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-5 shadow-mech space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#E2D9C8] pb-3">
            <div>
              <span className="text-xs font-bold text-[#57534E] uppercase tracking-wider block">
                {t.txnIdLabel}
              </span>
              <h2 className="font-heading font-black text-xl sm:text-2xl text-[#1C1917] font-mono">
                {txnId}
              </h2>
              <span className="text-sm text-[#78716C] font-semibold">
                {language === 'hi' ? 'लॉट संख्या' : language === 'mr' ? 'लॉट क्रमांक' : 'Lot Ref'}: {txn?.lotId}
              </span>
            </div>

            <span
              className={`font-heading font-black text-sm px-3 py-1 rounded border uppercase ${
                status === 'COMPLETED'
                  ? 'bg-[#ECFDF5] text-[#14532D] border-[#14532D]'
                  : status === 'COLLECTED'
                    ? 'bg-[#EFF6FF] text-[#1D4ED8] border-[#1D4ED8]'
                    : status === 'ACCEPTED'
                      ? 'bg-[#FEF3C7] text-[#B45309] border-[#B45309]'
                      : 'bg-[#FFFBEB] text-[#78716C] border-[#78716C]'
              }`}
            >
              {status}
            </span>
          </div>

          {/* Material Category & Details */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
            <div>
              <span className="text-xs font-bold text-[#57534E] uppercase block">
                {t.reviewCategory}
              </span>
              <span className="font-heading font-black text-lg sm:text-xl text-[#14532D] block mt-0.5">
                {materialName}
              </span>
            </div>

            <div>
              <span className="text-xs font-bold text-[#57534E] uppercase block">
                {t.receiveCollectorDeclared}
              </span>
              <span className="font-mono font-black text-lg sm:text-xl text-[#1C1917] flex items-center gap-1 mt-0.5">
                <Scale className="w-4 h-4 text-[#B45309]" />
                {txn?.declaredWeightKg ?? 2.1} KG
              </span>
            </div>

            <div>
              <span className="text-xs font-bold text-[#57534E] uppercase block">
                {t.paymentEstValue}
              </span>
              <span className="font-heading font-black text-lg sm:text-xl text-[#B45309] block mt-0.5">
                ₹{txn?.estimatedTotal ?? 620}
              </span>
            </div>
          </div>
        </div>

        {/* Supporting Reference Photograph Card */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-5 shadow-mech space-y-3.5">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#14532D]" />
            <h3 className="font-heading font-black text-sm text-[#1C1917] tracking-wider uppercase">
              {t.reviewPhoto} ({language === 'hi' ? 'संदर्भ मात्र' : language === 'mr' ? 'केवळ संदर्भ' : 'Reference Only'})
            </h3>
          </div>

          <div className="rounded-md border-2 border-[#1C1917] overflow-hidden bg-[#1C1917]/5 max-h-52 flex items-center justify-center">
            <img
              src={SAMPLE_EWASTE_PHOTO}
              alt="E-waste lot visual reference"
              className="w-full h-48 object-cover"
            />
          </div>

          <div className="bg-[#FFFBEB] border border-[#E2D9C8] rounded p-3 text-sm text-[#78350F] flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#B45309]" />
            <p className="leading-relaxed font-medium">
              {language === 'hi'
                ? 'फोटो केवल दृश्य संदर्भ के लिए है। यह वजन या स्वामित्व का प्रमाण नहीं है। यार्ड पर भौतिक वजन अनिवार्य है।'
                : language === 'mr'
                  ? 'फोटो केवळ दृश्य संदर्भासाठी आहे. तो वजन किंवा मालकीचा पुरावा नाही. यार्डवर प्रत्यक्ष वजन अनिवार्य आहे.'
                  : 'Photo is supporting reference only. Not proof of weight, ownership, or legal certification.'}
            </p>
          </div>
        </div>

        {/* Handover Delivery Notes */}
        {txn?.handoverNotes && (
          <div className="bg-white border-2 border-[#1C1917] rounded-lg p-5 shadow-mech space-y-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#57534E]" />
              <h3 className="font-heading font-black text-sm text-[#1C1917] tracking-wider uppercase">
                {t.handoverNotesLabel}
              </h3>
            </div>
            <p className="text-sm font-semibold text-[#1C1917] bg-[#F2EEDE] p-3 rounded border border-[#E2D9C8]">
              {txn.handoverNotes}
            </p>
          </div>
        )}

        {/* Non-negotiable Yard Inspection Warning */}
        <div className="bg-[#FEF3C7] border-2 border-[#B45309] rounded-lg p-3.5 shadow-mech-sm flex items-start gap-2.5">
          <ShieldAlert className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
          <p className="text-sm text-[#78350F] font-semibold leading-relaxed">
            {t.recyclerPolicyNotice}
          </p>
        </div>

        {/* Primary Action Button Based on Current State */}
        <div className="space-y-3 pt-2">
          {status === 'INITIATED' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={handleAccept}
                disabled={isProcessing}
                className="sm:col-span-2 bg-[#14532D] hover:bg-[#0F3F22] text-white border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-base sm:text-lg tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
              >
                <CheckCircle className="w-5 h-5 stroke-[2.5]" />
                <span>{isProcessing ? 'Accepting…' : t.recyclerAcceptBtn}</span>
                <ArrowRight className="w-5 h-5 ml-auto stroke-[3]" />
              </button>

              <button
                onClick={() => navigate('/recycler/incoming')}
                className="bg-white hover:bg-[#FEE2E2] text-[#B91C1C] border-2 border-[#1C1917] rounded-lg py-3.5 px-3 font-heading font-black text-sm uppercase tracking-wide shadow-mech-sm flex items-center justify-center gap-1 active:translate-y-0.5 transition-all"
              >
                <XCircle className="w-4 h-4" />
                <span>{t.recyclerRejectBtn}</span>
              </button>
            </div>
          )}

          {status === 'ACCEPTED' && (
            <button
              onClick={() => navigate(`/recycler/receive/${txnId}`)}
              className="w-full bg-[#14532D] hover:bg-[#0F3F22] text-white border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-base sm:text-lg tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
            >
              <Scale className="w-5 h-5 stroke-[2.5]" />
              <span>{t.recyclerProceedToReceive}</span>
              <ArrowRight className="w-5 h-5 ml-auto stroke-[3]" />
            </button>
          )}

          {status === 'COLLECTED' && (
            <button
              onClick={() => navigate(`/recycler/settle/${txnId}`)}
              className="w-full bg-[#14532D] hover:bg-[#0F3F22] text-white border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-base sm:text-lg tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
            >
              <span>{language === 'hi' ? 'भुगतान निपटान के लिए आगे बढ़ें' : language === 'mr' ? 'पेमेंट देयकासाठी पुढे जा' : 'PROCEED TO PAYMENT SETTLEMENT'}</span>
              <ArrowRight className="w-5 h-5 ml-auto stroke-[3]" />
            </button>
          )}

          {status === 'COMPLETED' && (
            <button
              onClick={() => navigate(`/recycler/complete/${txnId}`)}
              className="w-full bg-[#14532D] hover:bg-[#0F3F22] text-white border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-base sm:text-lg tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
            >
              <span>{t.digitalReceiptTitle}</span>
              <ArrowRight className="w-5 h-5 ml-auto stroke-[3]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
