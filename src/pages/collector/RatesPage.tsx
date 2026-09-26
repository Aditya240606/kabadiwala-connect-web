import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, PlusCircle, ArrowRight, ShieldCheck, Tag } from 'lucide-react';
import { Header } from '../../components/common/Header';
import { AudioGuidanceCard } from '../../components/common/AudioGuidanceCard';
import { useApp } from '../../hooks/useApp';
import { EWASTE_CATEGORIES, getCategoryDisplayName, getCategoryByCode, toBackendCategory } from '../../data/categories';
import { collectionRepository } from '../../services/collectionRepository';
import type { PricingRateDto } from '../../models/pricing';

export const RatesPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, t } = useApp();
  const [rates, setRates] = useState<PricingRateDto[]>([]);
  const [, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    collectionRepository
      .getPricingRates()
      .then((data) => {
        if (isMounted) {
          setRates(data);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.warn('[RatesPage] Failed to fetch pricing rates, using fallback:', err);
        if (isMounted) {
          setIsLoading(false);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const ratesAudioPrompts: Record<string, string> = {
    en: 'Indicative e-waste rates per kilogram. Rates vary based on material category and yard physical inspection.',
    hi: 'प्रति किलोग्राम सांकेतिक ई-कचरा दरें। सामग्री श्रेणी और यार्ड जांच के आधार पर दरें निर्धारित होती हैं।',
    mr: 'प्रति किलो अंदाजे ई-कचरा दर. सामग्री प्रकार आणि यार्ड प्रत्यक्ष तपासणीनुसार दर ठरतात.',
  };

  const getRateForCategory = (categoryCode: string): number => {
    const direct = rates.find((r) => r.categoryCode === categoryCode);
    if (direct && direct.pricePerKg > 0) return direct.pricePerKg;

    const backendCode = toBackendCategory(categoryCode);
    const mapped = rates.find((r) => r.categoryCode === backendCode);
    if (mapped && mapped.pricePerKg > 0) return mapped.pricePerKg;

    const fallbackCat = getCategoryByCode(categoryCode);
    return fallbackCat ? fallbackCat.pricePerKgLow : 50;
  };

  const formattedUpdateDate = useMemo(() => {
    const sample = rates.find((r) => r.effectiveFrom)?.effectiveFrom;
    if (!sample) return t.ratesUpdatedToday;
    try {
      const d = new Date(sample);
      if (isNaN(d.getTime())) return t.ratesUpdatedToday;
      const formatted = d.toLocaleDateString(
        language === 'hi' ? 'hi-IN' : language === 'mr' ? 'mr-IN' : 'en-IN',
        { day: '2-digit', month: 'short', year: 'numeric' }
      );
      return `${t.ratesUpdatedToday} (${formatted})`;
    } catch {
      return t.ratesUpdatedToday;
    }
  }, [rates, language, t.ratesUpdatedToday]);

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB]">
      <Header
        showBack
        onBack={() => navigate('/collector')}
        titleOverride={t.ratesTitle}
        subtitleOverride={t.ratesSub}
      />

      <div className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6 space-y-4 overflow-y-auto pb-24">
        {/* Audio Guidance Card */}
        <AudioGuidanceCard
          audioId="A25_rates"
          instruction={ratesAudioPrompts[language] || ratesAudioPrompts.hi}
        />

        {/* Informational Strip (Product Truthful: Indicative / Current App Rate, No Live Mandi Claims) */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-3 shadow-mech-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-[#14532D] text-white text-[11px] font-black px-2 py-0.5 rounded uppercase flex items-center gap-1">
              <Tag className="w-3 h-3" />
              <span>{t.ratesIndicativeTag}</span>
            </span>
            <span className="font-bold text-[#57534E] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#B45309]" />
              <span>{formattedUpdateDate}</span>
            </span>
          </div>

          <div className="flex items-center gap-1 text-[#78716C] font-semibold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#14532D]" />
            <span>{t.ratesNotice}</span>
          </div>
        </div>

        {/* Categories Rates Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {EWASTE_CATEGORIES.map((cat) => {
            const CatIcon = cat.icon;
            const displayName = getCategoryDisplayName(cat.code, language);
            const rateValue = getRateForCategory(cat.code);

            return (
              <div
                key={cat.code}
                onClick={() => navigate('/collector/start')}
                className="bg-white border-2 border-[#1C1917] rounded-lg p-4 shadow-mech hover:border-[#14532D] cursor-pointer transition-all active:translate-y-0.5 space-y-3 flex flex-col justify-between group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-black text-[#B45309] uppercase tracking-wider block">
                      {cat.code.replace(/_/g, ' ')}
                    </span>
                    <h3 className="font-heading font-black text-lg text-[#1C1917] leading-snug group-hover:text-[#14532D] transition-colors">
                      {displayName}
                    </h3>
                  </div>

                  <div className="w-11 h-11 rounded-lg bg-[#ECFDF5] border border-[#14532D] flex items-center justify-center shrink-0">
                    <CatIcon className="w-6 h-6 text-[#14532D]" />
                  </div>
                </div>

                {/* Price Display (Largest Element on Card) */}
                <div className="pt-2 border-t border-[#E2D9C8] flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] font-black text-[#57534E] uppercase tracking-wider block">
                      {t.ratesIndicativeTag}
                    </span>
                    <div className="font-heading font-black text-2xl sm:text-3xl text-[#B45309] font-mono leading-none mt-1">
                      ₹{rateValue}
                      <span className="text-sm font-black text-[#57534E] ml-1">{t.ratesPerKg}</span>
                    </div>
                  </div>

                  <span className="text-xs font-black text-[#14532D] flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    <span>+</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Action Bottom Bar */}
        <div className="pt-2">
          <button
            onClick={() => navigate('/collector/start')}
            className="w-full bg-[#14532D] hover:bg-[#0F3F22] text-white border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-base sm:text-lg tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
          >
            <PlusCircle className="w-5 h-5 stroke-[2.5]" />
            <span>{t.homeHeroCta}</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5] ml-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};
