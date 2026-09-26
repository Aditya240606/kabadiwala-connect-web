import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Smartphone, Cpu, Cable, Radio, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { Header } from '../../components/common/Header';
import { useApp } from '../../hooks/useApp';
import { collectionRepository } from '../../services/collectionRepository';
import type { CollectionLot, CollectionLotStatus } from '../../models/collection';

export const CollectionsPage: React.FC = () => {
  const [lots, setLots] = useState<CollectionLot[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | CollectionLotStatus>('all');
  const navigate = useNavigate();
  const { language, t } = useApp();

  const collectionsAudioPrompts: Record<string, string> = {
    en: 'My Collections. Here is the list of all e-waste scrap lots logged by you. Tap any lot to view details.',
    hi: 'मेरी सामग्री सूची। यहां आपके द्वारा दर्ज की गई सभी ई-कचरा सामग्री की सूची है। विवरण देखने के लिए किसी भी लॉट पर क्लिक करें।',
    mr: 'माझी सामग्री यादी. आपण नोंदवलेल्या सर्व ई-कचरा लॉट्सची यादी येथे आहे. तपशील पाहण्यासाठी कोणत्याही लॉटवर दाबा.',
  };

  const getLotTitle = (lot: CollectionLot) => {
    if (language === 'hi') return lot.titleHindi;
    if (language === 'mr') return lot.titleMarathi || lot.titleHindi;
    return lot.titleEnglish;
  };

  useEffect(() => {
    collectionRepository.getLots().then(setLots);
  }, []);

  const filteredLots = lots.filter((lot) => {
    if (activeFilter === 'all') return true;
    return lot.status === activeFilter;
  });

  const getStatusBadge = (status: CollectionLotStatus) => {
    switch (status) {
      case 'ready':
        return (
          <span className="bg-[#ECFDF5] text-[#14532D] border border-[#14532D] text-xs font-black px-2 py-0.5 rounded">
            {t.statusReady}
          </span>
        );
      case 'waitingForRecycler':
        return (
          <span className="bg-[#FEF3C7] text-[#B45309] border border-[#F59E0B] text-xs font-black px-2 py-0.5 rounded">
            {t.statusWaiting}
          </span>
        );
      case 'completed':
        return (
          <span className="bg-[#F2EEDE] text-[#57534E] border border-[#78716C] text-xs font-black px-2 py-0.5 rounded">
            {t.statusCompleted}
          </span>
        );
      default:
        return (
          <span className="bg-[#F2EEDE] text-[#57534E] border border-[#78716C] text-xs font-black px-2 py-0.5 rounded">
            {status}
          </span>
        );
    }
  };

  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case 'smartphone':
        return <Smartphone className="w-5 h-5 text-[#14532D]" />;
      case 'motherboard':
        return <Cpu className="w-5 h-5 text-[#14532D]" />;
      case 'telecom':
        return <Radio className="w-5 h-5 text-[#14532D]" />;
      default:
        return <Cable className="w-5 h-5 text-[#14532D]" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB]">
      <Header
        titleOverride={t.collectionsTitle}
        audioPromptText={collectionsAudioPrompts[language] || collectionsAudioPrompts.hi}
      />

      <div className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6 space-y-4 overflow-y-auto pb-12">
        {/* Header Strip & Sample Data Badge */}
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#1C1917] leading-tight">
            {t.collectionsTitle}
          </h2>
          <span className="bg-[#FEF3C7] text-[#B45309] border border-[#F59E0B] px-2 py-0.5 rounded text-xs font-black uppercase">
            {t.sampleDataBadge}
          </span>
        </div>

        {/* Controls Row: Filters + Action Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs sm:text-sm font-black">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-full border-1.5 whitespace-nowrap transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#14532D] text-white border-[#1C1917] shadow-mech-sm'
                  : 'bg-white text-[#57534E] border-[#E2D9C8] hover:border-[#1C1917]'
              }`}
            >
              {t.filterAll} ({lots.length})
            </button>
            <button
              onClick={() => setActiveFilter('waitingForRecycler')}
              className={`px-3 py-1.5 rounded-full border-1.5 whitespace-nowrap transition-all ${
                activeFilter === 'waitingForRecycler'
                  ? 'bg-[#14532D] text-white border-[#1C1917] shadow-mech-sm'
                  : 'bg-white text-[#57534E] border-[#E2D9C8] hover:border-[#1C1917]'
              }`}
            >
              {t.filterWaiting} (2)
            </button>
            <button
              onClick={() => setActiveFilter('ready')}
              className={`px-3 py-1.5 rounded-full border-1.5 whitespace-nowrap transition-all ${
                activeFilter === 'ready'
                  ? 'bg-[#14532D] text-white border-[#1C1917] shadow-mech-sm'
                  : 'bg-white text-[#57534E] border-[#E2D9C8] hover:border-[#1C1917]'
              }`}
            >
              {t.filterReady} (1)
            </button>
            <button
              onClick={() => setActiveFilter('completed')}
              className={`px-3 py-1.5 rounded-full border-1.5 whitespace-nowrap transition-all ${
                activeFilter === 'completed'
                  ? 'bg-[#14532D] text-white border-[#1C1917] shadow-mech-sm'
                  : 'bg-white text-[#57534E] border-[#E2D9C8] hover:border-[#1C1917]'
              }`}
            >
              {t.filterCompleted} (1)
            </button>
          </div>

          {/* Action Button: + NEW COLLECTION */}
          <button
            onClick={() => navigate('/collector/start')}
            className="w-full sm:w-auto bg-[#14532D] hover:bg-[#0F3F22] text-white border-2 border-[#1C1917] rounded-lg py-2.5 px-4 font-heading font-black text-base tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>{t.newCollectionBtn}</span>
          </button>
        </div>

        {/* Lots Grid: 1 column on mobile, 2 columns on desktop/tablet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredLots.map((lot) => (
            <div
              key={lot.id}
              onClick={() => navigate(`/collector/collections/${lot.id}`)}
              className="bg-white border-2 border-[#1C1917] rounded-lg p-3.5 shadow-mech cursor-pointer hover:border-[#14532D] transition-all active:translate-y-0.5"
            >
              {/* Top row: ID, Date & Status */}
              <div className="flex items-center justify-between pb-2 border-b border-[#E2D9C8]">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#78716C]">
                  <span className="font-heading font-black text-[#1C1917]">{lot.id}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {lot.formattedDate}
                  </span>
                </div>
                {getStatusBadge(lot.status)}
              </div>

              {/* Main content row */}
              <div className="flex items-start justify-between gap-3 my-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#ECFDF5] border-1.5 border-[#14532D] flex items-center justify-center shrink-0">
                    {getCategoryIcon(lot.categoryIcon)}
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-lg sm:text-xl text-[#1C1917] leading-tight">
                      {getLotTitle(lot)}
                    </h3>
                    <p className="text-sm font-semibold text-[#57534E] mt-1">
                      {lot.weightDetails}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-[#57534E] block">
                    {t.estValueLabel}
                  </span>
                  <span className="font-heading font-black text-xl sm:text-2xl text-[#B45309] block leading-tight font-mono">
                    {lot.estimatedPriceMax ? `₹${lot.estimatedPrice} - ₹${lot.estimatedPriceMax}` : `₹${lot.estimatedPrice}`}
                  </span>
                </div>
              </div>

              {/* Location & Details footer */}
              <div className="pt-2 border-t border-[#E2D9C8] flex items-center justify-between text-xs sm:text-sm text-[#57534E] font-medium">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#B45309]" />
                  <span>{t.serviceArea}</span>
                </div>

                <span className="text-xs sm:text-sm font-black text-[#14532D] flex items-center gap-0.5">
                  <span>{t.viewDetails}</span>
                  <ChevronRight className="w-4 h-4 stroke-[3]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
