import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  ShieldCheck,
  Building2,
  ExternalLink,
  Info,
  Home
} from 'lucide-react';
import { Header } from '../../components/common/Header';
import { AudioGuidanceCard } from '../../components/common/AudioGuidanceCard';
import { useApp } from '../../hooks/useApp';
import { collectionRepository } from '../../services/collectionRepository';
import type { HandoverTransactionDto } from '../../models/collection';
import { getCategoryDisplayName } from '../../data/categories';

export const RecyclerCompletePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useApp();

  const [txn, setTxn] = useState<HandoverTransactionDto | null>(null);

  const txnId = id || 'TXN-2026-001';

  const completeAudioPrompts: Record<string, string> = {
    en: 'Transaction complete! The digital handover record and payment settlement have been successfully finalized.',
    hi: 'लेन-देन पूर्ण हुआ! डिजिटल हस्तांतरण रिकॉर्ड और भुगतान निपटान सफलतापूर्वक पूरा कर लिया गया है।',
    mr: 'व्यवहार पूर्ण झाला! डिजिटल हस्तांतरण नोंद आणि देयक निपटारा यशस्वीरित्या पूर्ण झाला आहे.',
  };

  useEffect(() => {
    collectionRepository.getTransactionById(txnId).then((data) => {
      if (data) setTxn(data);
    });
  }, [txnId]);

  const materialName = (language === 'hi' && txn?.materialTitleHindi)
    ? txn.materialTitleHindi
    : (language === 'mr' && txn?.materialTitleMarathi)
      ? txn.materialTitleMarathi
      : txn?.materialTitleEnglish || getCategoryDisplayName(txn?.materialCategoryCode || 'PCB_MOTHERBOARD', language);

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB] min-h-screen">
      <Header
        showBack={false}
        titleOverride={t.txnCompleteTitle}
        subtitleOverride={t.txnCompleteSub}
      />

      <div className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-6 space-y-4 overflow-y-auto pb-16">
        {/* Success Header Badge */}
        <div className="flex flex-col items-center justify-center text-center space-y-2 py-4">
          <div className="w-16 h-16 rounded-full bg-[#ECFDF5] border-4 border-[#14532D] flex items-center justify-center shadow-mech">
            <CheckCircle className="w-9 h-9 text-[#14532D] stroke-[3]" />
          </div>

          <h2 className="font-heading font-black text-2xl text-[#14532D]">
            {t.txnCompleteTitle}
          </h2>
          <p className="text-xs font-semibold text-[#57534E] max-w-md">
            {t.txnCompleteSub}
          </p>
        </div>

        {/* Audio Guidance Card */}
        <AudioGuidanceCard
          audioId="A20_recycler_complete"
          instruction={completeAudioPrompts[language] || completeAudioPrompts.hi}
        />

        {/* Digital Transaction Record Card */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-5 sm:p-6 shadow-mech space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2D9C8] pb-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#14532D]" />
              <h3 className="font-heading font-black text-base text-[#14532D] uppercase tracking-wide">
                {t.digitalReceiptTitle}
              </h3>
            </div>

            <span className="font-heading font-black text-sm px-3 py-1 rounded bg-[#ECFDF5] text-[#14532D] border border-[#14532D] uppercase">
              COMPLETED
            </span>
          </div>

          {/* Breakdown Table */}
          <div className="border border-[#1C1917] rounded overflow-hidden">
            <div className="grid grid-cols-2 bg-[#F2EEDE] border-b border-[#1C1917] p-2.5 text-xs font-bold text-[#57534E]">
              <span>{t.declaredVsReceived}</span>
              <span className="text-right">{language === 'hi' ? 'विवरण' : language === 'mr' ? 'तपशील' : 'Recorded Value'}</span>
            </div>

            <div className="divide-y divide-[#E2D9C8] text-sm">
              <div className="p-2.5 flex justify-between">
                <span className="text-[#57534E] font-medium">{t.txnIdLabel}</span>
                <span className="font-mono font-bold text-[#1C1917]">{txnId}</span>
              </div>

              <div className="p-2.5 flex justify-between">
                <span className="text-[#57534E] font-medium">{t.reviewCategory}</span>
                <span className="font-heading font-black text-[#14532D]">{materialName}</span>
              </div>

              <div className="p-2.5 flex justify-between">
                <span className="text-[#57534E] font-medium">{t.handoverTargetFacility}</span>
                <span className="font-bold text-[#1C1917]">{txn?.recyclerFacilityName || 'EcoRecycle Green Hub'}</span>
              </div>

              <div className="p-2.5 flex justify-between">
                <span className="text-[#57534E] font-medium">{t.receiveCollectorDeclared}</span>
                <span className="font-mono font-bold text-[#1C1917]">{txn?.declaredWeightKg ?? 2.1} KG</span>
              </div>

              <div className="p-2.5 flex justify-between bg-[#F2F9F3]">
                <span className="text-[#14532D] font-bold">{t.receiveActualWeight}</span>
                <span className="font-mono font-black text-base text-[#14532D]">{txn?.receivedWeightKg ?? 2.0} KG</span>
              </div>

              <div className="p-2.5 flex justify-between">
                <span className="text-[#57534E] font-medium">{t.qualityTitle}</span>
                <span className="font-bold text-[#1C1917]">
                  {txn?.qualityGrade === 'MIXED' ? t.qualityMixed : txn?.qualityGrade === 'NEEDS_REVIEW' ? t.qualityReview : t.qualityAccepted}
                </span>
              </div>

              <div className="p-2.5 flex justify-between">
                <span className="text-[#57534E] font-medium">{t.paymentEstValue}</span>
                <span className="font-mono text-[#78716C]">₹{txn?.estimatedTotal ?? 620}</span>
              </div>

              <div className="p-2.5 flex justify-between bg-[#FFFBEB]">
                <span className="text-[#B45309] font-black">{t.paymentFinalSettlement}</span>
                <span className="font-heading font-black text-lg text-[#B45309]">₹{txn?.totalAmount ?? 590}</span>
              </div>

              <div className="p-2.5 flex justify-between">
                <span className="text-[#57534E] font-medium">{t.paymentMethodLabel}</span>
                <span className="font-bold text-[#14532D] uppercase">{txn?.paymentMethod || 'UPI'}</span>
              </div>

              <div className="p-2.5 flex justify-between">
                <span className="text-[#57534E] font-medium">{t.txnDateLabel}</span>
                <span className="font-mono text-xs text-[#57534E]">
                  {txn?.completedAt ? new Date(txn.completedAt).toLocaleString() : '24 Sep 2026, 11:45 AM'}
                </span>
              </div>
            </div>
          </div>

          {/* Product Truth Notice */}
          <div className="bg-[#FEF3C7] border border-[#B45309] rounded p-3 text-sm text-[#78350F] flex items-start gap-2">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#B45309]" />
            <p className="leading-relaxed font-medium">
              {t.recordDisclaimer}
            </p>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="space-y-3 pt-2">
          {/* Two-Sided Loop: Return to Collector View */}
          <button
            onClick={() => navigate(`/collector/transactions/${txnId}`)}
            className="w-full bg-[#14532D] hover:bg-[#0F3F22] text-white border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-base sm:text-lg tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
          >
            <Building2 className="w-5 h-5" />
            <span>
              {language === 'hi' ? 'कबाड़ीवाला देखें (पूर्ण रिकॉर्ड)' : language === 'mr' ? 'कबाड़ीवाला पहा (पूर्ण नोंद)' : 'SWITCH TO COLLECTOR (VIEW COMPLETED RECORD)'}
            </span>
            <ExternalLink className="w-4 h-4 ml-auto" />
          </button>

          <button
            onClick={() => navigate('/recycler')}
            className="w-full bg-white hover:bg-[#F2EEDE] text-[#1C1917] border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-sm uppercase tracking-wide shadow-mech-sm flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>{t.backToConsoleBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
