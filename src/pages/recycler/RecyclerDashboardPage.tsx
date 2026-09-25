import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Factory,
  Inbox,
  Clock,
  CheckCircle,
  ArrowRight,
  Package,
  ExternalLink
} from 'lucide-react';
import { Header } from '../../components/common/Header';
import { useApp } from '../../hooks/useApp';
import { collectionRepository } from '../../services/collectionRepository';
import type { HandoverTransactionDto } from '../../models/collection';
import { getCategoryDisplayName } from '../../data/categories';

export const RecyclerDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, t } = useApp();

  const [transactions, setTransactions] = useState<HandoverTransactionDto[]>([]);

  useEffect(() => {
    collectionRepository.getHandoverTransactions().then((data) => {
      setTransactions(data);
    });
  }, []);

  const incomingCount = transactions.filter((t) => t.status === 'INITIATED').length;
  const pendingHandoverCount = transactions.filter((t) => t.status === 'ACCEPTED' || t.status === 'COLLECTED').length;
  const completedTodayCount = transactions.filter((t) => t.status === 'COMPLETED').length;

  const pendingLots = transactions.filter((t) => t.status === 'INITIATED' || t.status === 'ACCEPTED');

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB] min-h-screen">
      <Header
        showBack={false}
        titleOverride={t.recyclerConsoleTitle}
        subtitleOverride={t.recyclerConsoleSub}
      />

      <div className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6 space-y-4 overflow-y-auto pb-16">
        {/* Role Switcher Banner */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-3 shadow-mech-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="bg-[#B45309] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
              {language === 'hi' ? 'रिसाइक्लर मोड' : language === 'mr' ? 'रिसायकलर मोड' : 'RECYCLER MODE'}
            </span>
            <span className="text-xs font-semibold text-[#57534E]">
              EcoRecycle Green Hub • Pune MIDC
            </span>
          </div>

          <button
            onClick={() => navigate('/collector')}
            className="w-full sm:w-auto bg-[#14532D] hover:bg-[#0F3F22] text-white border border-[#1C1917] rounded px-3 py-1.5 font-heading font-black text-xs shadow-mech-sm flex items-center justify-center gap-1.5 active:translate-y-0.5 transition-all"
          >
            <span>{t.recyclerRoleSwitchToCollector}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Recycler Facility Banner */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-4 shadow-mech flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#E2D9C8] border-1.5 border-[#1C1917] flex items-center justify-center text-[#1C1917]">
              <Factory className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-black text-lg text-[#1C1917] leading-tight">
                  EcoRecycle Green Hub
                </h2>
                <span className="bg-[#ECFDF5] text-[#14532D] border border-[#14532D] text-[10px] font-black px-1.5 py-0.5 rounded uppercase">
                  {t.matchingVerifiedBadge}
                </span>
              </div>
              <p className="text-xs text-[#57534E] font-medium mt-0.5">
                Plot 12, Industrial Area, Phase II, Pune • +91 98220 12345
              </p>
            </div>
          </div>
        </div>

        {/* 3 Metric Operational Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Card 1: Incoming Requests */}
          <div className="bg-[#ECFDF5] border-2 border-[#14532D] rounded-lg p-4 shadow-mech-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-heading font-black uppercase text-[#14532D] tracking-wider">
                {t.recyclerIncomingCard}
              </span>
              <Inbox className="w-4 h-4 text-[#14532D]" />
            </div>
            <div className="font-heading font-black text-3xl text-[#14532D]">
              {incomingCount}
            </div>
            <p className="text-[11px] font-medium text-[#166534]">
              {language === 'hi' ? 'स्वीकृति हेतु नए अनुरोध' : language === 'mr' ? 'स्वीकृतीसाठी नवीन विनंत्या' : 'Awaiting yard acceptance'}
            </p>
          </div>

          {/* Card 2: Pending Handovers */}
          <div className="bg-[#FEF3C7] border-2 border-[#B45309] rounded-lg p-4 shadow-mech-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-heading font-black uppercase text-[#B45309] tracking-wider">
                {t.recyclerPendingHandovers}
              </span>
              <Clock className="w-4 h-4 text-[#B45309]" />
            </div>
            <div className="font-heading font-black text-3xl text-[#B45309]">
              {pendingHandoverCount}
            </div>
            <p className="text-[11px] font-medium text-[#78350F]">
              {language === 'hi' ? 'यार्ड में वजन/जांच लंबित' : language === 'mr' ? 'यार्डवर वजन/तपासणी प्रलंबित' : 'Awaiting physical weighing'}
            </p>
          </div>

          {/* Card 3: Completed Today */}
          <div className="bg-white border-2 border-[#1C1917] rounded-lg p-4 shadow-mech-sm space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-heading font-black uppercase text-[#57534E] tracking-wider">
                {t.recyclerCompletedToday}
              </span>
              <CheckCircle className="w-4 h-4 text-[#14532D]" />
            </div>
            <div className="font-heading font-black text-3xl text-[#1C1917]">
              {completedTodayCount}
            </div>
            <p className="text-[11px] font-medium text-[#57534E]">
              {language === 'hi' ? 'भुगतान व निपटान पूर्ण' : language === 'mr' ? 'पेमेंट आणि देयक पूर्ण' : 'Fully settled & closed'}
            </p>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          onClick={() => navigate('/recycler/incoming')}
          className="w-full bg-[#14532D] hover:bg-[#0F3F22] text-white border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-sm tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
        >
          <Inbox className="w-5 h-5 stroke-[2.5]" />
          <span>{t.recyclerViewIncomingBtn}</span>
          <ArrowRight className="w-5 h-5 ml-auto stroke-[3]" />
        </button>

        {/* Pending Incoming Handovers Section */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-4 shadow-mech space-y-3">
          <div className="flex items-center justify-between border-b border-[#E2D9C8] pb-2">
            <h3 className="font-heading font-black text-xs text-[#1C1917] uppercase tracking-wider flex items-center gap-2">
              <Package className="w-4 h-4 text-[#14532D]" />
              <span>{t.recyclerIncomingTitle}</span>
            </h3>
            <span className="text-xs font-bold text-[#57534E]">
              {pendingLots.length} {language === 'hi' ? 'लॉट' : language === 'mr' ? 'लॉट्स' : 'Lots'}
            </span>
          </div>

          {pendingLots.length === 0 ? (
            <div className="text-center py-6 text-xs text-[#78716C] font-semibold">
              {t.recyclerNoIncoming}
            </div>
          ) : (
            <div className="space-y-2.5">
              {pendingLots.map((txn) => {
                const materialName = (language === 'hi' && txn.materialTitleHindi)
                  ? txn.materialTitleHindi
                  : (language === 'mr' && txn.materialTitleMarathi)
                    ? txn.materialTitleMarathi
                    : txn.materialTitleEnglish || getCategoryDisplayName(txn.materialCategoryCode || 'PCB_MOTHERBOARD', language);

                return (
                  <div
                    key={txn.id}
                    onClick={() => navigate(`/recycler/lot/${txn.id}`)}
                    className="border-2 border-[#1C1917] hover:border-[#14532D] rounded-md p-3 bg-[#FFFBEB] cursor-pointer transition-all active:translate-y-0.5 space-y-2"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-[#1C1917]">
                            {txn.id}
                          </span>
                          <span className="text-[10px] text-[#78716C]">
                            ({txn.lotId})
                          </span>
                        </div>
                        <h4 className="font-heading font-black text-sm text-[#14532D]">
                          {materialName}
                        </h4>
                      </div>

                      <span
                        className={`text-[10px] font-heading font-black px-2 py-0.5 rounded border uppercase ${
                          txn.status === 'ACCEPTED'
                            ? 'bg-[#FEF3C7] text-[#B45309] border-[#B45309]'
                            : 'bg-[#ECFDF5] text-[#14532D] border-[#14532D]'
                        }`}
                      >
                        {txn.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-[#E2D9C8]">
                      <span className="font-medium text-[#57534E]">
                        {t.receiveCollectorDeclared}: <strong>{txn.declaredWeightKg} KG</strong>
                      </span>
                      <span className="font-heading font-black text-[#B45309]">
                        {t.paymentEstValue}: ₹{txn.estimatedTotal ?? 620}
                      </span>
                    </div>

                    <div className="flex justify-end pt-1">
                      <span className="text-xs font-heading font-black text-[#14532D] flex items-center gap-1 hover:underline">
                        <span>{t.recyclerInspectBtn}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
