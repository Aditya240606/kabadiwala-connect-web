import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Layers, Receipt, Search, ArrowRight, Smartphone, Cpu, Cable, AlertTriangle, Tag, ShieldAlert } from 'lucide-react';
import { Header } from '../../components/common/Header';
import { AudioGuidanceCard } from '../../components/common/AudioGuidanceCard';
import { useApp } from '../../hooks/useApp';
import { collectionRepository } from '../../services/collectionRepository';
import type { CollectionLot, CollectionSummary } from '../../models/collection';

export const CollectorHomePage: React.FC = () => {
  const [summary, setSummary] = useState<CollectionSummary | null>(null);
  const [recentLots, setRecentLots] = useState<CollectionLot[]>([]);
  const navigate = useNavigate();
  const { language, t } = useApp();

  const homeAudioPrompts: Record<string, string> = {
    en: 'Collector Home. Tap the top button to log new scrap material. Today summary and options to find recyclers are available.',
    hi: 'कलेक्टर होम। नई सामग्री दर्ज करने के लिए ऊपर हरा बटन दबाएं। आज का सारांश और रिसाइक्लर खोजने के विकल्प उपलब्ध हैं।',
    mr: 'कलेक्टर मुख्य पृष्ठ. नवीन सामग्री नोंदवण्यासाठी वरील बटण दाबा. आजचा सारांश आणि रिसायकलर शोधण्याचे पर्याय उपलब्ध आहेत.',
  };

  const getLotTitle = (lot: CollectionLot) => {
    if (language === 'hi') return lot.titleHindi;
    if (language === 'mr') return lot.titleMarathi || lot.titleHindi;
    return lot.titleEnglish;
  };

  useEffect(() => {
    collectionRepository.getCollectionSummary().then(setSummary);
    collectionRepository.getLots().then((lots) => setRecentLots(lots.slice(0, 2)));
  }, []);

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'smartphone':
        return <Smartphone className="w-5 h-5 text-[#14532D]" />;
      case 'motherboard':
        return <Cpu className="w-5 h-5 text-[#14532D]" />;
      default:
        return <Cable className="w-5 h-5 text-[#14532D]" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB]">
      <Header />

      <div className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6 space-y-4 overflow-y-auto pb-12">
        {/* Status Chip Strip */}
        <div className="flex items-center justify-between text-xs font-bold px-1">
          <div className="flex items-center gap-1.5 text-[#14532D]">
            <span className="w-2 h-2 rounded-full bg-[#15803D] animate-ping" />
            <span className="w-2 h-2 rounded-full bg-[#15803D] -ml-3.5" />
            <span>{t.homeCollectorMode}</span>
          </div>
          <span className="bg-[#FEF3C7] text-[#B45309] border border-[#F59E0B] px-2 py-0.5 rounded text-xs font-black uppercase">
            {t.sampleDataBadge}
          </span>
        </div>

        {/* Audio Guidance Feature */}
        <AudioGuidanceCard
          audioId="A02_collector_home"
          instruction={homeAudioPrompts[language] || homeAudioPrompts.hi}
        />

        {/* Responsive Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
          {/* Left Column: Hero CTA + Quick Actions + Recent Collections */}
          <div className="md:col-span-7 space-y-4">
            {/* 1. Primary Hero CTA: START NEW COLLECTION */}
            <div className="bg-[#14532D] text-white border-2 border-[#1C1917] rounded-lg p-4 shadow-mech relative overflow-hidden">
              <div className="relative z-10 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading font-black text-xl md:text-2xl text-white leading-tight">
                    {t.homeHeroTitle}
                  </h2>
                  <span className="bg-[#F59E0B] text-[#1C1917] font-black text-xs tracking-wider px-2 py-0.5 rounded uppercase">
                    {t.homePrimaryActionTag}
                  </span>
                </div>

                <button
                  onClick={() => navigate('/collector/start')}
                  className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1917] border-2 border-[#1C1917] rounded-md py-3 px-4 font-heading font-black text-lg tracking-wide shadow-mech-sm flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
                >
                  <PlusCircle className="w-5 h-5 stroke-[3]" />
                  <span>{t.homeHeroCta}</span>
                  <ArrowRight className="w-5 h-5 stroke-[3] ml-auto" />
                </button>
              </div>
            </div>

            {/* 2. Quick Action Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              <button
                onClick={() => navigate('/collector/rates')}
                className="bg-white border-2 border-[#1C1917] rounded-lg p-2.5 shadow-mech-sm flex flex-col items-center text-center active:translate-y-0.5 transition-all group hover:border-[#14532D]"
              >
                <div className="w-10 h-10 rounded bg-[#ECFDF5] border border-[#14532D] flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                  <Tag className="w-5 h-5 text-[#14532D]" />
                </div>
                <span className="font-heading font-black text-xs sm:text-sm text-[#1C1917] leading-tight">
                  {t.homeQuickRates}
                </span>
              </button>

              <button
                onClick={() => navigate('/collector/safety')}
                className="bg-white border-2 border-[#1C1917] rounded-lg p-2.5 shadow-mech-sm flex flex-col items-center text-center active:translate-y-0.5 transition-all group hover:border-[#B45309]"
              >
                <div className="w-10 h-10 rounded bg-[#FEF3C7] border border-[#B45309] flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                  <ShieldAlert className="w-5 h-5 text-[#B45309]" />
                </div>
                <span className="font-heading font-black text-xs sm:text-sm text-[#1C1917] leading-tight">
                  {t.homeQuickSafety}
                </span>
              </button>

              <button
                onClick={() => navigate('/collector/collections')}
                className="bg-white border-2 border-[#1C1917] rounded-lg p-2.5 shadow-mech-sm flex flex-col items-center text-center active:translate-y-0.5 transition-all group hover:border-[#14532D]"
              >
                <div className="w-10 h-10 rounded bg-[#ECFDF5] border border-[#14532D] flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                  <Layers className="w-5 h-5 text-[#14532D]" />
                </div>
                <span className="font-heading font-black text-xs sm:text-sm text-[#1C1917] leading-tight">
                  {t.homeQuickCollections}
                </span>
              </button>

              <button
                onClick={() => navigate('/collector/transactions')}
                className="bg-white border-2 border-[#1C1917] rounded-lg p-2.5 shadow-mech-sm flex flex-col items-center text-center active:translate-y-0.5 transition-all group hover:border-[#B45309]"
              >
                <div className="w-10 h-10 rounded bg-[#FFFBEB] border border-[#B45309] flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                  <Receipt className="w-5 h-5 text-[#B45309]" />
                </div>
                <span className="font-heading font-black text-xs sm:text-sm text-[#1C1917] leading-tight">
                  {t.homeQuickTransactions}
                </span>
              </button>

              <button
                onClick={() => navigate('/collector/recyclers')}
                className="bg-white border-2 border-[#1C1917] rounded-lg p-2.5 shadow-mech-sm flex flex-col items-center text-center active:translate-y-0.5 transition-all col-span-2 sm:col-span-1 group hover:border-[#14532D]"
              >
                <div className="w-10 h-10 rounded bg-[#ECFDF5] border border-[#14532D] flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                  <Search className="w-5 h-5 text-[#14532D]" />
                </div>
                <span className="font-heading font-black text-xs sm:text-sm text-[#1C1917] leading-tight">
                  {t.homeQuickRecycler}
                </span>
              </button>
            </div>

            {/* 4. Recent Collections Deck */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-0.5">
                <h3 className="font-heading font-black text-sm text-[#1C1917] tracking-wider uppercase">
                  {t.homeRecentCollections}
                </h3>
                <button
                  onClick={() => navigate('/collector/collections')}
                  className="text-xs sm:text-sm font-black text-[#14532D] hover:underline flex items-center gap-0.5"
                >
                  <span>{t.homeViewAll}</span>
                  <span>→</span>
                </button>
              </div>

              <div className="space-y-2">
                {recentLots.map((lot) => (
                  <div
                    key={lot.id}
                    onClick={() => navigate(`/collector/collections/${lot.id}`)}
                    className="bg-white border-2 border-[#1C1917] rounded-lg p-3 shadow-mech-sm flex items-center justify-between gap-2.5 cursor-pointer hover:border-[#14532D] transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-lg bg-[#ECFDF5] border border-[#14532D] flex items-center justify-center shrink-0">
                        {getCategoryIcon(lot.categoryIcon)}
                      </div>
                      <div>
                        <h4 className="font-heading font-black text-base text-[#1C1917] leading-tight">
                          {getLotTitle(lot)}
                        </h4>
                        <p className="text-xs sm:text-sm font-bold text-[#57534E] mt-0.5">
                          {lot.weightDetails}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-heading font-black text-base md:text-lg text-[#B45309] block">
                        {lot.estimatedPriceMax ? `₹${lot.estimatedPrice} - ₹${lot.estimatedPriceMax}` : `₹${lot.estimatedPrice}`}
                      </span>
                      <span className="bg-[#ECFDF5] text-[#14532D] border border-[#14532D] text-xs font-black px-1.5 py-0.5 rounded">
                        {lot.status === 'ready' ? t.statusReady : t.statusWaiting}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Today's Summary + Safety Sorting Tip Card */}
          <div className="md:col-span-5 space-y-4">
            {/* 3. Today's Summary (Truthful Labels) */}
            <div className="bg-white border-2 border-[#1C1917] rounded-lg p-3.5 shadow-mech-sm space-y-2.5">
              <div className="flex items-center justify-between border-b border-[#E2D9C8] pb-2">
                <h3 className="font-heading font-black text-sm text-[#1C1917] tracking-wider uppercase">
                  {t.homeSummaryTitle}
                </h3>
                <span className="text-xs font-bold text-[#78716C] bg-[#F2EEDE] px-1.5 py-0.5 rounded">
                  24 Sep 2026
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-[#FFFBEB] border border-[#E2D9C8] rounded p-2.5">
                  <span className="text-xs sm:text-sm font-bold text-[#57534E] block">
                    {t.homeSummaryEstValue}
                  </span>
                  <span className="font-heading font-black text-2xl md:text-3xl text-[#B45309] block mt-0.5 font-mono">
                    ₹{summary?.todayEstimatedValue ?? 1850}
                  </span>
                  <span className="text-xs font-semibold text-[#78716C]">
                    {t.homeSummaryIndicative}
                  </span>
                </div>

                <div className="bg-[#F2F9F3] border border-[#14532D]/30 rounded p-2.5">
                  <span className="text-xs sm:text-sm font-bold text-[#166534] block">
                    {t.homeSummaryTotalWeight}
                  </span>
                  <span className="font-heading font-black text-2xl md:text-3xl text-[#14532D] block mt-0.5 font-mono">
                    {summary?.todayWeightKg ?? 12.5} KG
                  </span>
                  <span className="text-xs font-semibold text-[#166534]">
                    {summary?.todayLotsCount ?? 3} {t.homeSummaryActiveLots}
                  </span>
                </div>
              </div>
            </div>

            {/* 5. Safety Sorting Tip Card (Clickable to /collector/safety) */}
            <div
              onClick={() => navigate('/collector/safety')}
              className="bg-[#FEF3C7] border-2 border-[#1C1917] rounded-lg p-3.5 shadow-mech-sm flex items-start gap-2.5 cursor-pointer hover:border-[#B45309] transition-all group"
            >
              <AlertTriangle className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5 group-hover:scale-105 transition-transform" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-black text-sm text-[#B45309] uppercase tracking-wide">
                    {t.homeSafetyTipTitle}
                  </h4>
                  <span className="text-xs font-black text-[#B45309] group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#78350F] font-semibold mt-0.5 leading-snug">
                  {t.homeSafetyTipText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
