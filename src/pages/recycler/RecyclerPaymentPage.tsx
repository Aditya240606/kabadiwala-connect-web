import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Banknote,
  QrCode,
  ShieldAlert,
  CheckCircle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Header } from '../../components/common/Header';
import { useApp } from '../../hooks/useApp';
import { collectionRepository } from '../../services/collectionRepository';
import type { HandoverTransactionDto } from '../../models/collection';
import { getCategoryDisplayName } from '../../data/categories';

export const RecyclerPaymentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useApp();

  const [txn, setTxn] = useState<HandoverTransactionDto | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'DIGITAL'>('DIGITAL');
  const [paymentNote, setPaymentNote] = useState<string>('Settled at yard counter');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const txnId = id || 'TXN-2026-001';

  useEffect(() => {
    collectionRepository.getTransactionById(txnId).then((data) => {
      if (data) {
        setTxn(data);
      }
    });
  }, [txnId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txn || isSubmitting) return;

    setIsSubmitting(true);
    await collectionRepository.completeTransaction({
      transactionId: txn.id,
      paymentMethod,
      notes: paymentNote,
    });
    setIsSubmitting(false);
    navigate(`/recycler/complete/${txn.id}`);
  };

  const finalAmount = txn?.totalAmount ?? (txn?.receivedWeightKg ? Math.round(txn.receivedWeightKg * (txn.agreedPricePerKg || 295)) : 590);

  const materialName = (language === 'hi' && txn?.materialTitleHindi)
    ? txn.materialTitleHindi
    : (language === 'mr' && txn?.materialTitleMarathi)
      ? txn.materialTitleMarathi
      : txn?.materialTitleEnglish || getCategoryDisplayName(txn?.materialCategoryCode || 'PCB_MOTHERBOARD', language);

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB] min-h-screen">
      <Header
        showBack
        onBack={() => navigate(`/recycler/receive/${txnId}`)}
        titleOverride={t.paymentTitle}
        subtitleOverride={t.paymentSub}
      />

      <div className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-6 space-y-4 overflow-y-auto pb-16">
        {/* Role Switcher Banner */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-3 shadow-mech-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="bg-[#B45309] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
              {language === 'hi' ? 'रिसाइक्लर मोड' : language === 'mr' ? 'रिसायकलर मोड' : 'RECYCLER MODE'}
            </span>
            <span className="text-xs font-semibold text-[#57534E]">
              {language === 'hi' ? 'भुगतान निपटान प्रविष्टि' : language === 'mr' ? 'पेमेंट देयक नोंदणी' : 'Payment Recording (No Gateway)'}
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

        {/* Transaction Summary Card */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-4 shadow-mech space-y-3">
          <div className="flex items-center justify-between border-b border-[#E2D9C8] pb-2">
            <span className="font-mono font-black text-sm text-[#1C1917]">
              {txnId}
            </span>
            <span className="font-heading font-black text-xs text-[#14532D]">
              {materialName}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-[10px] font-bold text-[#57534E] uppercase block">
                {t.receiveCollectorDeclared}
              </span>
              <span className="font-mono font-bold text-[#1C1917]">
                {txn?.declaredWeightKg ?? 2.1} KG
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-[#14532D] uppercase block">
                {t.receiveActualWeight}
              </span>
              <span className="font-mono font-black text-sm text-[#14532D]">
                {txn?.receivedWeightKg ?? 2.0} KG
              </span>
            </div>
          </div>
        </div>

        {/* Indicative Estimate vs Final Settlement Card */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-4 shadow-mech space-y-3">
          <h3 className="font-heading font-black text-xs text-[#1C1917] uppercase tracking-wider">
            {language === 'hi' ? 'मूल्य तुलना एवं निपटान' : language === 'mr' ? 'मूल्य तुलना आणि देयक' : 'Price Comparison & Settlement'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Indicative Original Estimate */}
            <div className="bg-[#F2EEDE] border border-[#1C1917] rounded-lg p-3 space-y-0.5">
              <span className="text-[10px] font-bold text-[#57534E] uppercase block">
                {t.paymentEstValue}
              </span>
              <div className="font-heading font-black text-xl text-[#78716C] line-through">
                ₹{txn?.estimatedTotal ?? 620}
              </div>
              <span className="text-[10px] font-semibold text-[#78716C] block">
                {language === 'hi' ? 'घोषित वजन पर आधारित अनुमान' : language === 'mr' ? 'नोंदवलेल्या वजनावरील अंदाज' : 'Based on declared weight'}
              </span>
            </div>

            {/* Final Settled Payout */}
            <div className="bg-[#FFFBEB] border-2 border-[#B45309] rounded-lg p-3 space-y-0.5 shadow-mech-sm">
              <span className="text-[10px] font-black text-[#B45309] uppercase block tracking-wide">
                {t.paymentFinalSettlement}
              </span>
              <div className="font-heading font-black text-2xl text-[#B45309]">
                ₹{finalAmount}
              </div>
              <span className="text-[10px] font-bold text-[#78350F] block">
                {t.paymentSettlementNote}
              </span>
            </div>
          </div>
        </div>

        {/* Product Truth: Payment Recording Only */}
        <div className="bg-[#FEF3C7] border-2 border-[#B45309] rounded-lg p-3.5 shadow-mech-sm flex items-start gap-2.5">
          <ShieldAlert className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
          <p className="text-xs text-[#78350F] font-semibold leading-relaxed">
            {t.paymentRecordingOnlyNotice}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Payment Method Selection */}
          <div className="bg-white border-2 border-[#1C1917] rounded-lg p-4 shadow-mech space-y-3">
            <h3 className="font-heading font-black text-xs text-[#1C1917] uppercase tracking-wider">
              {t.paymentMethodLabel}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* UPI Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod('DIGITAL')}
                className={`border-2 rounded-lg p-3.5 text-left transition-all ${
                  paymentMethod === 'DIGITAL'
                    ? 'border-[#14532D] bg-[#ECFDF5] shadow-mech-sm ring-1 ring-[#14532D]'
                    : 'border-[#1C1917] bg-white hover:border-[#14532D]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-[#14532D]" />
                    <span className="font-heading font-black text-sm text-[#1C1917]">
                      {t.paymentUpi}
                    </span>
                  </div>
                  {paymentMethod === 'DIGITAL' && (
                    <CheckCircle className="w-5 h-5 text-[#14532D]" />
                  )}
                </div>
                <span className="text-[11px] text-[#57534E] font-medium block mt-1">
                  {language === 'hi' ? 'काउंटर पर सीधे UPI द्वारा निपटान' : language === 'mr' ? 'काउंटरवर थेट UPI द्वारे पेमेंट' : 'Direct UPI transfer at yard counter'}
                </span>
              </button>

              {/* Cash Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod('CASH')}
                className={`border-2 rounded-lg p-3.5 text-left transition-all ${
                  paymentMethod === 'CASH'
                    ? 'border-[#14532D] bg-[#ECFDF5] shadow-mech-sm ring-1 ring-[#14532D]'
                    : 'border-[#1C1917] bg-white hover:border-[#14532D]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Banknote className="w-5 h-5 text-[#14532D]" />
                    <span className="font-heading font-black text-sm text-[#1C1917]">
                      {t.paymentCash}
                    </span>
                  </div>
                  {paymentMethod === 'CASH' && (
                    <CheckCircle className="w-5 h-5 text-[#14532D]" />
                  )}
                </div>
                <span className="text-[11px] text-[#57534E] font-medium block mt-1">
                  {language === 'hi' ? 'यार्ड में नकद भुगतान' : language === 'mr' ? 'यार्डवर रोख रक्कम देणे' : 'Physical cash handed over at counter'}
                </span>
              </button>
            </div>
          </div>

          {/* Reference Notes */}
          <div className="bg-white border-2 border-[#1C1917] rounded-lg p-4 shadow-mech space-y-2">
            <label className="text-[10px] font-bold text-[#57534E] uppercase tracking-wider block">
              {t.paymentNotesLabel}
            </label>
            <input
              type="text"
              value={paymentNote}
              onChange={(e) => setPaymentNote(e.target.value)}
              className="w-full bg-[#F2EEDE] border-2 border-[#1C1917] rounded-md px-3 py-2 text-xs font-semibold text-[#1C1917] outline-none focus:border-[#14532D]"
              placeholder="e.g. Paid in full at yard counter"
            />
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-sm tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all ${
              isSubmitting
                ? 'bg-[#E2D9C8] text-[#78716C] cursor-wait'
                : 'bg-[#14532D] hover:bg-[#0F3F22] text-white'
            }`}
          >
            <CheckCircle className="w-5 h-5 stroke-[2.5]" />
            <span>{isSubmitting ? 'Recording settlement…' : t.paymentCompleteBtn}</span>
            <ArrowRight className="w-5 h-5 ml-auto stroke-[3]" />
          </button>
        </form>
      </div>
    </div>
  );
};
