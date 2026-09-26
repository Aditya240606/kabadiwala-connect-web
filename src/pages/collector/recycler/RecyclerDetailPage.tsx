import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Building2, MapPin, Phone, Mail, Clock, ShieldCheck, Tag, ArrowRight, AlertTriangle } from 'lucide-react';
import { Header } from '../../../components/common/Header';
import { AudioGuidanceCard } from '../../../components/common/AudioGuidanceCard';
import { useApp } from '../../../hooks/useApp';
import { collectionRepository } from '../../../services/collectionRepository';
import type { RecyclerDto } from '../../../models/collection';
import { getCategoryDisplayName } from '../../../data/categories';

export const RecyclerDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const { language, t } = useApp();
  const [recycler, setRecycler] = useState<RecyclerDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const lotId = searchParams.get('lotId') || '';

  const detailAudioPrompts: Record<string, string> = {
    en: 'Verified recycler facility profile. Review accepted scrap categories, yard address, and initiate handover.',
    hi: 'सत्यापित रिसाइक्लर सुविधा प्रोफाइल। स्वीकृत स्क्रैप श्रेणियों और यार्ड पते की समीक्षा करें और हस्तांतरण शुरू करें।',
    mr: 'अधिकृत रिसायकलर सुविधा तपशील. स्वीकार्य भंगार वर्ग आणि यार्ड पत्ता तपासा आणि हस्तांतरण सुरू करा.',
  };

  useEffect(() => {
    if (!id) return;
    collectionRepository.getRecyclerById(id).then((data) => {
      setRecycler(data);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading || !recycler) {
    return (
      <div className="flex-1 flex flex-col bg-[#FFFBEB]">
        <Header showBack onBack={() => navigate(-1)} titleOverride={t.recyclerDetailTitle} />
        <div className="flex-1 flex items-center justify-center p-8 text-sm font-bold text-[#78716C]">
          {language === 'hi' ? 'सुविधा विवरण लोड हो रहा है…' : language === 'mr' ? 'सुविधा तपशील लोड होत आहे…' : 'Loading facility profile…'}
        </div>
      </div>
    );
  }

  const facilityName = (language === 'hi' && recycler.facilityNameHi)
    ? recycler.facilityNameHi
    : (language === 'mr' && recycler.facilityNameMr)
      ? recycler.facilityNameMr
      : recycler.facilityName;

  const facilityAddress = (language === 'hi' && recycler.locationAddressHi)
    ? recycler.locationAddressHi
    : (language === 'mr' && recycler.locationAddressMr)
      ? recycler.locationAddressMr
      : recycler.locationAddress;

  const handleInitiateHandover = () => {
    const params = new URLSearchParams();
    params.set('recyclerId', recycler.id);
    if (lotId) params.set('lotId', lotId);
    navigate(`/collector/handover?${params.toString()}`);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB]">
      <Header
        showBack
        onBack={() => navigate('/collector/recyclers')}
        titleOverride={t.recyclerDetailTitle}
        subtitleOverride={facilityName}
      />

      <div className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-6 space-y-4 overflow-y-auto pb-12">
        {/* Audio Guidance Card */}
        <AudioGuidanceCard
          audioId="A17_recycler_detail"
          instruction={detailAudioPrompts[language] || detailAudioPrompts.hi}
        />

        {/* Main Facility Card */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-5 sm:p-6 shadow-mech space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-lg bg-[#ECFDF5] border-2 border-[#14532D] flex items-center justify-center shrink-0">
                <Building2 className="w-6 h-6 text-[#14532D]" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#1C1917] leading-tight">
                    {facilityName}
                  </h2>
                  {recycler.verifiedBadge && (
                    <span className="inline-flex items-center gap-1 bg-[#ECFDF5] text-[#14532D] border border-[#14532D]/40 text-xs font-black px-2 py-0.5 rounded uppercase">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {t.matchingVerifiedBadge}
                    </span>
                  )}
                </div>
                <span className="text-xs font-bold text-[#78716C] uppercase tracking-wider block mt-1">
                  ID: {recycler.id} • {recycler.status}
                </span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-[#E2D9C8]">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#57534E] uppercase tracking-wider block">
                {t.recyclerAddressLabel}
              </span>
              <div className="flex items-start gap-1.5 text-sm text-[#1C1917] font-semibold">
                <MapPin className="w-4 h-4 text-[#B45309] shrink-0 mt-0.5" />
                <span>{facilityAddress}, {recycler.city}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-bold text-[#57534E] uppercase tracking-wider block">
                {t.recyclerContactLabel}
              </span>
              <div className="flex items-center gap-1.5 text-sm text-[#1C1917] font-bold">
                <Phone className="w-4 h-4 text-[#14532D] shrink-0" />
                <span>{recycler.contactPhone}</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-[#57534E] font-medium">
                <Mail className="w-4 h-4 text-[#78716C] shrink-0" />
                <span>{recycler.contactEmail}</span>
              </div>
            </div>
          </div>

          {/* Operating hours */}
          <div className="bg-[#FFFBEB] border border-[#E2D9C8] rounded-md p-3 flex items-center gap-2 text-sm font-bold text-[#78350F]">
            <Clock className="w-4 h-4 text-[#B45309]" />
            <span>{recycler.operatingHours || t.recyclerOperatingHours}</span>
          </div>
        </div>

        {/* Accepted Categories */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-5 shadow-mech space-y-3">
          <h3 className="font-heading font-black text-base text-[#1C1917] tracking-wider uppercase">
            {t.recyclerAcceptedMaterials}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {recycler.acceptedCategoryCodes.map((code) => (
              <div
                key={code}
                className="bg-[#F2EEDE] border border-[#E2D9C8] rounded p-2.5 flex items-center gap-2"
              >
                <Tag className="w-4 h-4 text-[#14532D]" />
                <span className="font-heading font-black text-sm text-[#1C1917]">
                  {getCategoryDisplayName(code, language)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Product Truth Notice Box */}
        <div className="bg-[#FEF3C7] border-2 border-[#1C1917] rounded-lg p-3.5 shadow-mech-sm flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
          <p className="text-sm text-[#78350F] font-semibold leading-relaxed">
            {t.recyclerPolicyNotice}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={handleInitiateHandover}
          className="w-full bg-[#14532D] hover:bg-[#0F3F22] text-white border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-base sm:text-lg tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
        >
          <span>{t.recyclerInitiateBtn}</span>
          <ArrowRight className="w-5 h-5 ml-auto" />
        </button>
      </div>
    </div>
  );
};
