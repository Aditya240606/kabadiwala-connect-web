import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Inbox,
  Scale,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Header } from '../../components/common/Header';
import { useApp } from '../../hooks/useApp';
import { collectionRepository } from '../../services/collectionRepository';
import type { HandoverTransactionDto } from '../../models/collection';
import { getCategoryDisplayName } from '../../data/categories';

export const RecyclerIncomingLotsPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, t } = useApp();

  const [pendingLots, setPendingLots] = useState<HandoverTransactionDto[]>([]);

  useEffect(() => {
    collectionRepository.getRecyclerPendingTransactions().then((data) => {
      setPendingLots(data);
    });
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB] min-h-screen">
      <Header
        showBack
        onBack={() => navigate('/recycler')}
        titleOverride={t.recyclerIncomingTitle}
        subtitleOverride={t.recyclerIncomingSub}
      />

      <div className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-6 space-y-4 overflow-y-auto pb-16">
        {/* Role Switcher Banner */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-3 shadow-mech-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="bg-[#B45309] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
              {language === 'hi' ? 'रिसाइक्लर मोड' : language === 'mr' ? 'रिसायकलर मोड' : 'RECYCLER MODE'}
            </span>
            <span className="text-xs font-semibold text-[#57534E]">
              EcoRecycle Green Hub • {pendingLots.length} {language === 'hi' ? 'लंबित लॉट' : language === 'mr' ? 'प्रलंबित लॉट्स' : 'pending lots'}
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

        {/* Incoming Lots List */}
        {pendingLots.length === 0 ? (
          <div className="bg-white border-2 border-[#1C1917] rounded-lg p-8 text-center space-y-2 shadow-mech">
            <Inbox className="w-10 h-10 text-[#78716C] mx-auto opacity-50" />
            <h3 className="font-heading font-black text-lg text-[#1C1917]">
              {t.recyclerNoIncoming}
            </h3>
          </div>
        ) : (
          <div className="space-y-4">
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
                  className="bg-white border-2 border-[#1C1917] hover:border-[#14532D] rounded-lg p-4 sm:p-5 shadow-mech cursor-pointer transition-all active:translate-y-0.5 space-y-3.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-black text-base text-[#1C1917]">
                          {txn.id}
                        </span>
                        <span className="text-xs text-[#78716C]">
                          • {txn.lotId}
                        </span>
                      </div>
                      <h4 className="font-heading font-black text-lg sm:text-xl text-[#14532D] mt-0.5">
                        {materialName}
                      </h4>
                    </div>

                    <span
                      className={`font-heading font-black text-xs px-2.5 py-0.5 rounded border uppercase shrink-0 ${
                        txn.status === 'ACCEPTED'
                          ? 'bg-[#FEF3C7] text-[#B45309] border-[#B45309]'
                          : 'bg-[#ECFDF5] text-[#14532D] border-[#14532D]'
                      }`}
                    >
                      {txn.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 border-t border-[#E2D9C8] text-sm">
                    <div>
                      <span className="text-xs font-bold text-[#57534E] uppercase block">
                        {t.receiveCollectorDeclared}
                      </span>
                      <span className="font-mono font-bold text-[#1C1917] flex items-center gap-1 text-base">
                        <Scale className="w-4 h-4 text-[#B45309]" />
                        {txn.declaredWeightKg} KG
                      </span>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-[#57534E] uppercase block">
                        {t.paymentEstValue}
                      </span>
                      <span className="font-heading font-black text-base sm:text-lg text-[#B45309]">
                        ₹{txn.estimatedTotal ?? 620}
                      </span>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <span className="text-xs font-bold text-[#57534E] uppercase block">
                        {language === 'hi' ? 'कबाड़ीवाला' : language === 'mr' ? 'कबाड़ीवाला' : 'Collector'}
                      </span>
                      <span className="font-semibold text-[#1C1917] text-sm">
                        {txn.collectorId}
                      </span>
                    </div>
                  </div>

                  {txn.handoverNotes && (
                    <div className="bg-[#FFFBEB] border border-[#E2D9C8] rounded p-2.5 text-sm text-[#57534E]">
                      <strong>{t.handoverNotesLabel}:</strong> {txn.handoverNotes}
                    </div>
                  )}

                  <div className="pt-2 border-t border-[#E2D9C8] flex justify-end">
                    <button
                      type="button"
                      className="bg-[#14532D] hover:bg-[#0F3F22] text-white border border-[#1C1917] rounded px-3.5 py-2 font-heading font-black text-sm shadow-mech-sm flex items-center gap-1.5 active:translate-y-0.5 transition-all"
                    >
                      <span>{t.recyclerInspectBtn}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
