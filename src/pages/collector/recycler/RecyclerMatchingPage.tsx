import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Building2, MapPin, Phone, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { Header } from '../../../components/common/Header';
import { useApp } from '../../../hooks/useApp';
import { collectionRepository } from '../../../services/collectionRepository';
import type { RecyclerDto } from '../../../models/collection';
import { getCategoryDisplayName } from '../../../data/categories';

export const RecyclerMatchingPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { language, t } = useApp();
  const [recyclers, setRecyclers] = useState<RecyclerDto[]>([]);
  const [filterNearby, setFilterNearby] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const categoryFilter = searchParams.get('categoryCode') || '';
  const lotId = searchParams.get('lotId') || '';

  useEffect(() => {
    collectionRepository.getRecyclers(categoryFilter || undefined).then((data) => {
      setRecyclers(data);
      setIsLoading(false);
    });
  }, [categoryFilter]);

  const filteredList = filterNearby
    ? recyclers.filter((r) => (r.distanceKm ?? 10) <= 5)
    : recyclers;

  const getFacilityName = (r: RecyclerDto) => {
    if (language === 'hi' && r.facilityNameHi) return r.facilityNameHi;
    if (language === 'mr' && r.facilityNameMr) return r.facilityNameMr;
    return r.facilityName;
  };

  const getLocationAddress = (r: RecyclerDto) => {
    if (language === 'hi' && r.locationAddressHi) return r.locationAddressHi;
    if (language === 'mr' && r.locationAddressMr) return r.locationAddressMr;
    return r.locationAddress;
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB]">
      <Header
        showBack
        onBack={() => navigate('/collector')}
        titleOverride={t.matchingTitle}
        subtitleOverride={t.matchingSub}
      />

      <div className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-6 space-y-4 overflow-y-auto pb-12">
        {/* Active Lot / Category banner if filtering */}
        {categoryFilter && (
          <div className="bg-white border-2 border-[#1C1917] rounded-lg p-3 sm:p-4 shadow-mech-sm flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-[#57534E] uppercase tracking-wider block">
                {language === 'hi' ? 'चयनित स्क्रैप श्रेणी' : language === 'mr' ? 'निवडलेला भंगार वर्ग' : 'Selected Scrap Category'}:
              </span>
              <span className="font-heading font-black text-sm text-[#14532D] bg-[#ECFDF5] px-2.5 py-1 rounded border border-[#14532D]/30">
                {getCategoryDisplayName(categoryFilter, language)}
              </span>
            </div>
            {lotId && (
              <span className="text-xs font-mono font-bold text-[#78716C]">
                {lotId}
              </span>
            )}
          </div>
        )}

        {/* Filter Bar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterNearby(false)}
            className={`px-3.5 py-2 rounded-md border-2 font-heading font-black text-sm transition-all ${
              !filterNearby
                ? 'bg-[#14532D] text-white border-[#1C1917] shadow-mech-sm'
                : 'bg-white text-[#1C1917] border-[#1C1917] hover:bg-[#F2EEDE]'
            }`}
          >
            {t.matchingFilterAll} ({recyclers.length})
          </button>
          <button
            onClick={() => setFilterNearby(true)}
            className={`px-3.5 py-2 rounded-md border-2 font-heading font-black text-sm transition-all ${
              filterNearby
                ? 'bg-[#14532D] text-white border-[#1C1917] shadow-mech-sm'
                : 'bg-white text-[#1C1917] border-[#1C1917] hover:bg-[#F2EEDE]'
            }`}
          >
            {t.matchingFilterNearby}
          </button>
        </div>

        {/* Recyclers List */}
        {isLoading ? (
          <div className="p-12 text-center text-base font-bold text-[#78716C] animate-pulse">
            {language === 'hi' ? 'सत्यापित रिसाइक्लर्स खोजे जा रहे हैं…' : language === 'mr' ? 'अधिकृत रिसायकलर्स शोधत आहे…' : 'Finding verified recyclers…'}
          </div>
        ) : filteredList.length === 0 ? (
          <div className="bg-white border-2 border-[#1C1917] rounded-lg p-8 shadow-mech text-center space-y-2">
            <Search className="w-8 h-8 text-[#B45309] mx-auto" />
            <p className="font-heading font-black text-base text-[#1C1917]">
              {t.matchingEmptyMsg}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredList.map((recycler) => (
              <div
                key={recycler.id}
                className="bg-white border-2 border-[#1C1917] rounded-lg p-4 sm:p-5 shadow-mech hover:border-[#14532D] transition-all space-y-3.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-lg bg-[#ECFDF5] border border-[#14532D] flex items-center justify-center shrink-0 mt-0.5">
                      <Building2 className="w-6 h-6 text-[#14532D]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-heading font-black text-lg sm:text-xl text-[#1C1917] leading-tight">
                          {getFacilityName(recycler)}
                        </h3>
                        {recycler.verifiedBadge && (
                          <span className="inline-flex items-center gap-1 bg-[#ECFDF5] text-[#14532D] border border-[#14532D]/40 text-xs font-black px-2 py-0.5 rounded uppercase">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            {t.matchingVerifiedBadge}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-[#57534E] font-medium mt-1 flex-wrap">
                        <MapPin className="w-4 h-4 text-[#B45309] shrink-0" />
                        <span>{getLocationAddress(recycler)}, {recycler.city}</span>
                        {recycler.distanceKm && (
                          <span className="font-bold text-[#B45309] ml-1">
                            • {recycler.distanceKm} km
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Accepted Categories Pills */}
                <div>
                  <span className="text-xs font-bold text-[#78716C] uppercase tracking-wider block mb-1.5">
                    {t.matchingAcceptedWaste}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {recycler.acceptedCategoryCodes.map((code) => {
                      const isMatchingLot = categoryFilter && code === categoryFilter;
                      return (
                        <span
                          key={code}
                          className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded border ${
                            isMatchingLot
                              ? 'bg-[#14532D] text-white border-[#14532D]'
                              : 'bg-[#F2EEDE] text-[#1C1917] border-[#E2D9C8]'
                          }`}
                        >
                          <Tag className="w-3 h-3" />
                          {getCategoryDisplayName(code, language)}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-[#E2D9C8] flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-sm text-[#57534E] font-bold">
                    <Phone className="w-4 h-4 text-[#14532D]" />
                    <span>{recycler.contactPhone}</span>
                  </div>

                  <button
                    onClick={() => {
                      const params = new URLSearchParams();
                      if (lotId) params.set('lotId', lotId);
                      navigate(`/collector/recyclers/${recycler.id}${params.toString() ? `?${params.toString()}` : ''}`);
                    }}
                    className="bg-[#14532D] hover:bg-[#0F3F22] text-white border-2 border-[#1C1917] rounded-md py-2.5 px-4 font-heading font-black text-sm tracking-wide shadow-mech-sm flex items-center gap-1.5 active:translate-y-0.5 transition-all"
                  >
                    <span>{t.matchingSelectBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
