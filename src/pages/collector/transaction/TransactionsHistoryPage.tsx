import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Receipt,
  Building2,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Header } from '../../../components/common/Header';
import { useApp } from '../../../hooks/useApp';
import { collectionRepository } from '../../../services/collectionRepository';
import type { HandoverTransactionDto } from '../../../models/collection';
import { getCategoryDisplayName } from '../../../data/categories';

export const TransactionsHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, t } = useApp();

  const [transactions, setTransactions] = useState<HandoverTransactionDto[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    collectionRepository.getHandoverTransactions().then((data) => {
      setTransactions(data);
    });
  }, []);

  const filteredTransactions = transactions.filter((txn) => {
    if (filter === 'pending') {
      return txn.status === 'INITIATED' || txn.status === 'ACCEPTED' || txn.status === 'COLLECTED';
    }
    if (filter === 'completed') {
      return txn.status === 'COMPLETED';
    }
    return true;
  });

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB] min-h-screen">
      <Header
        showBack={false}
        titleOverride={t.historyTitle}
        subtitleOverride={t.historySub}
      />

      <div className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6 space-y-4 overflow-y-auto pb-24">
        {/* Role Demo Switcher Banner */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-3 shadow-mech-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="bg-[#14532D] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
              {language === 'hi' ? 'कबाड़ीवाला मोड' : language === 'mr' ? 'कबाड़ीवाला मोड' : 'COLLECTOR MODE'}
            </span>
            <span className="text-xs font-semibold text-[#57534E]">
              {language === 'hi' ? 'सभी ई-कचरा लेन-देन इतिहास' : language === 'mr' ? 'सर्व ई-कचरा व्यवहार इतिहास' : 'Digital records of all handovers & settlements'}
            </span>
          </div>

          <button
            onClick={() => navigate('/recycler')}
            className="w-full sm:w-auto bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1917] border border-[#1C1917] rounded px-3 py-1.5 font-heading font-black text-xs shadow-mech-sm flex items-center justify-center gap-1.5 active:translate-y-0.5 transition-all"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>{t.collectorRoleSwitchToRecycler}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-[#F2EEDE] border-2 border-[#1C1917] rounded-lg p-1 gap-1">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 py-1.5 px-3 rounded text-xs font-heading font-black uppercase transition-all ${
              filter === 'all'
                ? 'bg-[#14532D] text-white shadow-mech-sm'
                : 'text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            {t.filterAll} ({transactions.length})
          </button>

          <button
            onClick={() => setFilter('pending')}
            className={`flex-1 py-1.5 px-3 rounded text-xs font-heading font-black uppercase transition-all ${
              filter === 'pending'
                ? 'bg-[#14532D] text-white shadow-mech-sm'
                : 'text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            {language === 'hi' ? 'प्रक्रियाधीन' : language === 'mr' ? 'प्रक्रियेत' : 'In Progress'} ({transactions.filter((t) => t.status !== 'COMPLETED').length})
          </button>

          <button
            onClick={() => setFilter('completed')}
            className={`flex-1 py-1.5 px-3 rounded text-xs font-heading font-black uppercase transition-all ${
              filter === 'completed'
                ? 'bg-[#14532D] text-white shadow-mech-sm'
                : 'text-[#57534E] hover:text-[#1C1917]'
            }`}
          >
            {t.statusCompleted} ({transactions.filter((t) => t.status === 'COMPLETED').length})
          </button>
        </div>

        {/* Transactions List */}
        {filteredTransactions.length === 0 ? (
          <div className="bg-white border-2 border-[#1C1917] rounded-lg p-8 text-center space-y-2 shadow-mech">
            <Receipt className="w-10 h-10 text-[#78716C] mx-auto opacity-50" />
            <h3 className="font-heading font-black text-base text-[#1C1917]">
              {t.historyEmpty}
            </h3>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTransactions.map((txn) => {
              const materialName = (language === 'hi' && txn.materialTitleHindi)
                ? txn.materialTitleHindi
                : (language === 'mr' && txn.materialTitleMarathi)
                  ? txn.materialTitleMarathi
                  : txn.materialTitleEnglish || getCategoryDisplayName(txn.materialCategoryCode || 'PCB_MOTHERBOARD', language);

              return (
                <div
                  key={txn.id}
                  onClick={() => navigate(`/collector/transactions/${txn.id}`)}
                  className="bg-white border-2 border-[#1C1917] rounded-lg p-4 shadow-mech hover:border-[#14532D] cursor-pointer transition-all active:translate-y-0.5 space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-sm text-[#1C1917]">
                          {txn.id}
                        </span>
                        <span className="text-[10px] text-[#78716C]">
                          • {txn.lotId}
                        </span>
                      </div>
                      <h4 className="font-heading font-black text-base text-[#14532D]">
                        {materialName}
                      </h4>
                    </div>

                    <span
                      className={`font-heading font-black text-[10px] px-2 py-0.5 rounded border uppercase shrink-0 ${
                        txn.status === 'COMPLETED'
                          ? 'bg-[#ECFDF5] text-[#14532D] border-[#14532D]'
                          : txn.status === 'COLLECTED'
                            ? 'bg-[#EFF6FF] text-[#1D4ED8] border-[#1D4ED8]'
                            : txn.status === 'ACCEPTED'
                              ? 'bg-[#FEF3C7] text-[#B45309] border-[#B45309]'
                              : 'bg-[#FFFBEB] text-[#78716C] border-[#78716C]'
                      }`}
                    >
                      {txn.status}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#E2D9C8] grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-[#57534E] uppercase block">
                        {t.handoverTargetFacility}
                      </span>
                      <span className="font-bold text-[#1C1917] truncate block">
                        {txn.recyclerFacilityName}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-[#57534E] uppercase block">
                        {t.receiveCollectorDeclared}
                      </span>
                      <span className="font-mono font-bold text-[#1C1917]">
                        {txn.declaredWeightKg} KG
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-[#57534E] uppercase block">
                        {txn.receivedWeightKg ? t.receiveActualWeight : t.reviewWeight}
                      </span>
                      <span className="font-mono font-black text-[#14532D]">
                        {txn.receivedWeightKg ? `${txn.receivedWeightKg} KG` : '—'}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-[#57534E] uppercase block">
                        {txn.status === 'COMPLETED' ? t.paymentFinalSettlement : t.paymentEstValue}
                      </span>
                      <span className="font-heading font-black text-sm text-[#B45309]">
                        ₹{txn.status === 'COMPLETED' && txn.totalAmount ? txn.totalAmount : (txn.estimatedTotal ?? 620)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#E2D9C8] flex items-center justify-between">
                    <span className="text-[10px] text-[#78716C]">
                      {txn.createdAt ? new Date(txn.createdAt).toLocaleDateString() : '24 Sep 2026'}
                    </span>

                    <button
                      type="button"
                      className="text-xs font-heading font-black text-[#14532D] hover:underline flex items-center gap-1"
                    >
                      <span>{t.viewDigitalRecord}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
