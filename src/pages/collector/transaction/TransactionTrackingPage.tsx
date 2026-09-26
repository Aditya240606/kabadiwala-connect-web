import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  Clock,
  Building2,
  Scale,
  Receipt,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  Info
} from 'lucide-react';
import { Header } from '../../../components/common/Header';
import { useApp } from '../../../hooks/useApp';
import { collectionRepository } from '../../../services/collectionRepository';
import type { HandoverTransactionDto } from '../../../models/collection';
import { getCategoryDisplayName } from '../../../data/categories';

export const TransactionTrackingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useApp();

  const [transaction, setTransaction] = useState<HandoverTransactionDto | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const txnId = id || 'TXN-2026-001';

  const loadData = useCallback(() => {
    collectionRepository.getTransactionById(txnId).then((data) => {
      setTransaction(data);
      setIsLoading(false);
    });
  }, [txnId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const status = transaction?.status || 'INITIATED';

  // Status mapping
  const isAcceptedDone = status === 'ACCEPTED' || status === 'COLLECTED' || status === 'COMPLETED';
  const isCollectedDone = status === 'COLLECTED' || status === 'COMPLETED';
  const isCompletedDone = status === 'COMPLETED';

  const materialName = transaction
    ? (language === 'hi' && transaction.materialTitleHindi)
      ? transaction.materialTitleHindi
      : (language === 'mr' && transaction.materialTitleMarathi)
        ? transaction.materialTitleMarathi
        : transaction.materialTitleEnglish || getCategoryDisplayName(transaction.materialCategoryCode || 'PCB_MOTHERBOARD', language)
    : 'Motherboard PCB';

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB] min-h-screen">
      <Header
        showBack
        onBack={() => navigate('/collector/transactions')}
        titleOverride={t.trackingTitle}
        subtitleOverride={t.trackingSub}
      />

      <div className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-6 space-y-4 overflow-y-auto pb-16">
        {/* Role Demo Switcher Banner */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-3 sm:p-4 shadow-mech-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="bg-[#14532D] text-white text-xs font-black px-2.5 py-1 rounded uppercase">
              {language === 'hi' ? 'कबाड़ीवाला मोड' : language === 'mr' ? 'कबाड़ीवाला मोड' : 'COLLECTOR MODE'}
            </span>
            <span className="text-sm font-semibold text-[#57534E]">
              {language === 'hi' ? 'लाइव लेन-देन स्थिति' : language === 'mr' ? 'थेट व्यवहार स्थिती' : 'Viewing transaction from collector view'}
            </span>
          </div>

          <button
            onClick={() => navigate(`/recycler/lot/${txnId}`)}
            className="w-full sm:w-auto bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1917] border border-[#1C1917] rounded px-3.5 py-2 font-heading font-black text-sm shadow-mech-sm flex items-center justify-center gap-1.5 active:translate-y-0.5 transition-all"
          >
            <Building2 className="w-4 h-4" />
            <span>{t.collectorRoleSwitchToRecycler}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Transaction Summary Card */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-5 shadow-mech space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#E2D9C8] pb-3">
            <div>
              <span className="text-xs font-bold text-[#57534E] uppercase tracking-wider block">
                {t.txnIdLabel}
              </span>
              <h2 className="font-heading font-black text-xl sm:text-2xl text-[#1C1917] font-mono">
                {txnId}
              </h2>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-[#57534E] uppercase tracking-wider block">
                {t.txnStatusLabel}
              </span>
              <span
                className={`inline-block font-heading font-black text-sm px-3 py-1 rounded border uppercase mt-1 ${
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
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
            <div>
              <span className="text-xs font-bold text-[#57534E] uppercase block">
                {t.reviewCategory}
              </span>
              <span className="font-heading font-black text-[#14532D] block truncate text-base">
                {materialName}
              </span>
            </div>

            <div>
              <span className="text-xs font-bold text-[#57534E] uppercase block">
                {t.handoverTargetFacility}
              </span>
              <span className="font-bold text-[#1C1917] block truncate text-sm">
                {transaction?.recyclerFacilityName || 'EcoRecycle Green Hub'}
              </span>
            </div>

            <div>
              <span className="text-xs font-bold text-[#57534E] uppercase block">
                {t.receiveCollectorDeclared}
              </span>
              <span className="font-mono font-bold text-[#1C1917] text-base">
                {transaction?.declaredWeightKg ?? 2.1} KG
              </span>
            </div>

            <div>
              <span className="text-xs font-bold text-[#57534E] uppercase block">
                {status === 'COMPLETED' ? t.paymentFinalSettlement : t.paymentEstValue}
              </span>
              <span className="font-heading font-black text-lg text-[#B45309]">
                ₹{status === 'COMPLETED' && transaction?.totalAmount ? transaction.totalAmount : (transaction?.estimatedTotal ?? 620)}
              </span>
            </div>
          </div>
        </div>

        {/* 4-Stage Lifecycle Progression */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-5 md:p-6 shadow-mech space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2D9C8] pb-2">
            <h3 className="font-heading font-black text-base text-[#1C1917] uppercase tracking-wide flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#14532D]" />
              <span>{t.trackingTitle}</span>
            </h3>

            <button
              onClick={loadData}
              className="text-sm font-bold text-[#14532D] hover:underline flex items-center gap-1"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{language === 'hi' ? 'रीफ्रेश' : language === 'mr' ? 'रिफ्रेश' : 'Refresh'}</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Stage 1: Handover Initiated */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#14532D] text-white flex items-center justify-center shrink-0 border-2 border-[#1C1917]">
                <CheckCircle className="w-5 h-5 stroke-[3]" />
              </div>
              <div className="flex-1 pt-0.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-black text-base text-[#1C1917]">
                    1. {t.stageInitiated}
                  </h4>
                  <span className="text-xs font-bold text-[#14532D] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#14532D]">
                    ✓
                  </span>
                </div>
                <p className="text-sm text-[#57534E] font-medium mt-0.5">
                  {t.stageInitiatedDesc}
                </p>
              </div>
            </div>

            {/* Stage 2: Recycler Accepted */}
            <div className="flex items-start gap-3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 border-[#1C1917] ${
                  isAcceptedDone
                    ? 'bg-[#14532D] text-white'
                    : 'bg-[#F2EEDE] text-[#78716C]'
                }`}
              >
                {isAcceptedDone ? (
                  <CheckCircle className="w-5 h-5 stroke-[3]" />
                ) : (
                  <Clock className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1 pt-0.5">
                <div className="flex items-center justify-between">
                  <h4 className={`font-heading font-black text-base ${isAcceptedDone ? 'text-[#1C1917]' : 'text-[#78716C]'}`}>
                    2. {t.stageAccepted}
                  </h4>
                  {isAcceptedDone ? (
                    <span className="text-xs font-bold text-[#14532D] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#14532D]">
                      ✓
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-[#78716C] bg-[#F2EEDE] px-2 py-0.5 rounded border border-[#A8A29E]">
                      {language === 'hi' ? 'लंबित' : language === 'mr' ? 'प्रलंबित' : 'Pending'}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#57534E] font-medium mt-0.5">
                  {t.stageAcceptedDesc}
                </p>
              </div>
            </div>

            {/* Stage 3: Physical Handover & Weighing */}
            <div className="flex items-start gap-3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 border-[#1C1917] ${
                  isCollectedDone
                    ? 'bg-[#14532D] text-white'
                    : 'bg-[#F2EEDE] text-[#78716C]'
                }`}
              >
                {isCollectedDone ? (
                  <CheckCircle className="w-5 h-5 stroke-[3]" />
                ) : (
                  <Scale className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1 pt-0.5">
                <div className="flex items-center justify-between">
                  <h4 className={`font-heading font-black text-base ${isCollectedDone ? 'text-[#1C1917]' : 'text-[#78716C]'}`}>
                    3. {t.stageCollected}
                  </h4>
                  {isCollectedDone ? (
                    <span className="text-xs font-bold text-[#14532D] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#14532D]">
                      ✓
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-[#78716C] bg-[#F2EEDE] px-2 py-0.5 rounded border border-[#A8A29E]">
                      {language === 'hi' ? 'लंबित' : language === 'mr' ? 'प्रलंबित' : 'Pending'}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#57534E] font-medium mt-0.5">
                  {t.stageCollectedDesc}
                </p>

                {isCollectedDone && (
                  <div className="mt-2.5 bg-[#F2F9F3] border border-[#14532D]/30 rounded p-2.5 text-sm grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-xs font-bold text-[#57534E] uppercase block">
                        {t.receiveActualWeight}
                      </span>
                      <span className="font-mono font-bold text-[#14532D] text-base">
                        {transaction?.receivedWeightKg ?? transaction?.declaredWeightKg} KG
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#57534E] uppercase block">
                        {t.qualityTitle}
                      </span>
                      <span className="font-bold text-[#1C1917]">
                        {transaction?.qualityGrade === 'MIXED' ? t.qualityMixed : transaction?.qualityGrade === 'NEEDS_REVIEW' ? t.qualityReview : t.qualityAccepted}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stage 4: Settlement Recorded */}
            <div className="flex items-start gap-3">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 border-[#1C1917] ${
                  isCompletedDone
                    ? 'bg-[#14532D] text-white'
                    : 'bg-[#F2EEDE] text-[#78716C]'
                }`}
              >
                {isCompletedDone ? (
                  <CheckCircle className="w-5 h-5 stroke-[3]" />
                ) : (
                  <Receipt className="w-5 h-5" />
                )}
              </div>
              <div className="flex-1 pt-0.5">
                <div className="flex items-center justify-between">
                  <h4 className={`font-heading font-black text-base ${isCompletedDone ? 'text-[#1C1917]' : 'text-[#78716C]'}`}>
                    4. {t.stageCompleted}
                  </h4>
                  {isCompletedDone ? (
                    <span className="text-xs font-bold text-[#14532D] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#14532D]">
                      ✓
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-[#78716C] bg-[#F2EEDE] px-2 py-0.5 rounded border border-[#A8A29E]">
                      {language === 'hi' ? 'लंबित' : language === 'mr' ? 'प्रलंबित' : 'Pending'}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#57534E] font-medium mt-0.5">
                  {t.stageCompletedDesc}
                </p>

                {isCompletedDone && (
                  <div className="mt-2.5 bg-[#FFFBEB] border border-[#B45309]/30 rounded p-2.5 text-sm flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#57534E] uppercase block">
                        {t.paymentFinalSettlement}
                      </span>
                      <span className="font-heading font-black text-lg text-[#B45309]">
                        ₹{transaction?.totalAmount ?? 590}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#57534E] uppercase block">
                        {t.paymentMethodLabel}
                      </span>
                      <span className="font-bold text-[#14532D] uppercase">
                        {transaction?.paymentMethod || 'UPI'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Digital Transaction Record / Full Breakdown Card */}
        {isCompletedDone && (
          <div className="bg-white border-2 border-[#1C1917] rounded-lg p-5 sm:p-6 shadow-mech space-y-4">
            <div className="flex items-center gap-2 border-b border-[#E2D9C8] pb-3">
              <ShieldCheck className="w-5 h-5 text-[#14532D]" />
              <h3 className="font-heading font-black text-base text-[#14532D] uppercase tracking-wide">
                {t.digitalReceiptTitle}
              </h3>
            </div>

            {/* Comparison Table */}
            <div className="border border-[#1C1917] rounded overflow-hidden">
              <div className="grid grid-cols-2 bg-[#F2EEDE] border-b border-[#1C1917] p-2.5 text-xs font-bold text-[#57534E]">
                <span>{t.declaredVsReceived}</span>
                <span className="text-right">{language === 'hi' ? 'विवरण' : language === 'mr' ? 'तपशील' : 'Recorded Value'}</span>
              </div>

              <div className="divide-y divide-[#E2D9C8] text-sm">
                <div className="p-2.5 flex justify-between">
                  <span className="text-[#57534E] font-medium">{t.receiveCollectorDeclared}</span>
                  <span className="font-mono font-bold text-[#1C1917]">{transaction?.declaredWeightKg ?? 2.1} KG</span>
                </div>

                <div className="p-2.5 flex justify-between bg-[#F2F9F3]">
                  <span className="text-[#14532D] font-bold">{t.receiveActualWeight}</span>
                  <span className="font-mono font-black text-[#14532D]">{transaction?.receivedWeightKg ?? 2.0} KG</span>
                </div>

                <div className="p-2.5 flex justify-between">
                  <span className="text-[#57534E] font-medium">{t.paymentEstValue}</span>
                  <span className="font-mono text-[#78716C]">₹{transaction?.estimatedTotal ?? 620}</span>
                </div>

                <div className="p-2.5 flex justify-between bg-[#FFFBEB]">
                  <span className="text-[#B45309] font-black">{t.paymentFinalSettlement}</span>
                  <span className="font-heading font-black text-lg text-[#B45309]">₹{transaction?.totalAmount ?? 590}</span>
                </div>

                <div className="p-2.5 flex justify-between">
                  <span className="text-[#57534E] font-medium">{t.paymentMethodLabel}</span>
                  <span className="font-bold text-[#1C1917]">{transaction?.paymentMethod || 'UPI'}</span>
                </div>

                <div className="p-2.5 flex justify-between">
                  <span className="text-[#57534E] font-medium">{t.txnDateLabel}</span>
                  <span className="font-mono text-xs text-[#57534E]">
                    {transaction?.completedAt ? new Date(transaction.completedAt).toLocaleString() : '24 Sep 2026, 11:45 AM'}
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
        )}

        {/* Action CTAs */}
        <div className="space-y-3 pt-2">
          {!isCompletedDone && (
            <button
              onClick={() => navigate(`/recycler/lot/${txnId}`)}
              className="w-full bg-[#14532D] hover:bg-[#0F3F22] text-white border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-base sm:text-lg tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
            >
              <Building2 className="w-5 h-5" />
              <span>
                {status === 'INITIATED'
                  ? (language === 'hi' ? 'रिसाइक्लर कंसोल में स्वीकारें (डेमो)' : language === 'mr' ? 'रिसायकलर कन्सोलमध्ये स्वीकारा (डेमो)' : 'ACCEPT AS RECYCLER (DEMO FLOW)')
                  : status === 'ACCEPTED'
                    ? (language === 'hi' ? 'रिसाइक्लर यार्ड में वजन दर्ज करें (डेमो)' : language === 'mr' ? 'रिसायकलर यार्डमध्ये वजन नोंदवा (डेमो)' : 'RECORD WEIGHING AS RECYCLER (DEMO)')
                    : (language === 'hi' ? 'भुगतान दर्ज करें और पूर्ण करें (डेमो)' : language === 'mr' ? 'पेमेंट नोंदवा आणि पूर्ण करा (डेमो)' : 'RECORD PAYMENT AS RECYCLER (DEMO)')}
              </span>
              <ArrowRight className="w-5 h-5 ml-auto" />
            </button>
          )}

          <button
            onClick={() => navigate('/collector/transactions')}
            className="w-full bg-white hover:bg-[#F2EEDE] text-[#1C1917] border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-sm uppercase tracking-wide shadow-mech-sm flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
          >
            <Receipt className="w-4 h-4" />
            <span>{t.viewHistoryBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
