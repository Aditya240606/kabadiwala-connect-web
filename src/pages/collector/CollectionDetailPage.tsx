import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Camera,
  Cpu,
  CheckCircle2,
  Shield,
  ArrowRight,
  Edit3,
  Calendar,
  MapPin,
  Upload,
} from 'lucide-react';
import { Header } from '../../components/common/Header';
import { useApp } from '../../hooks/useApp';
import { collectionRepository } from '../../services/collectionRepository';
import type { CollectionLot } from '../../models/collection';

export const CollectionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [lot, setLot] = useState<CollectionLot | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { language, t } = useApp();

  const lotId = id || 'LOT-2026-0818';

  const detailAudioPrompts: Record<string, string> = {
    en: 'Lot details. Motherboard PCB. Declared weight 2.1 kilograms. Indicative estimated value 620 to 700 rupees. Tap button below to find recyclers.',
    hi: 'लॉट विवरण। मदरबोर्ड पीसीबी। घोषित वजन २.१ किलो। सांकेतिक मूल्य ६२० से ७०० रुपये। रिसाइक्लर खोजने के लिए नीचे बटन दबाएं।',
    mr: 'लॉट तपशील. मदरबोर्ड पीसीबी. घोषित वजन २.१ किलो. अंदाजे मूल्य ६२० ते ७०० रुपये. रिसायकलर शोधण्यासाठी खालील बटण दाबा.',
  };

  const getLotTitle = (item: CollectionLot | null) => {
    if (!item) return t.pcbMotherboardTitle;
    if (language === 'hi') return item.titleHindi;
    if (language === 'mr') return item.titleMarathi || item.titleHindi;
    return item.titleEnglish;
  };

  useEffect(() => {
    collectionRepository.getLotById(lotId).then(setLot);
  }, [lotId]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB]">
      {/* Header with Back button */}
      <Header
        showBack
        onBack={() => navigate('/collector/collections')}
        titleOverride={`${lotId} • ${t.detailTitleSuffix}`}
        subtitleOverride={t.manifestTitle}
        audioPromptText={detailAudioPrompts[language] || detailAudioPrompts.hi}
      />

      {/* Truthful Manual Weight Indicator Strip */}
      <div className="bg-[#F2EEDE] border-b-2 border-[#1C1917] px-3.5 py-1.5 flex items-center justify-between text-[11px] font-bold">
        <div className="flex items-center gap-1.5 text-[#14532D]">
          <Edit3 className="w-3.5 h-3.5 text-[#14532D]" />
          <span>{t.weightEntryManual}</span>
        </div>
      </div>

      <div className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-6 space-y-4 overflow-y-auto pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
          {/* Left Column: Category, Photo, Verification Policy */}
          <div className="md:col-span-7 space-y-4">
            {/* 1. Category Hero Card */}
            <div className="bg-white border-2 border-[#1C1917] rounded-lg p-3.5 shadow-mech">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-black text-[#B45309] tracking-wider uppercase block">
                    {t.categoryHighYieldPcb}
                  </span>
                  <h2 className="font-heading font-black text-lg text-[#1C1917] mt-0.5 leading-tight">
                    {getLotTitle(lot)}
                  </h2>
                </div>

                <div className="w-10 h-10 rounded-lg bg-[#ECFDF5] border border-[#14532D] flex items-center justify-center shrink-0">
                  <Cpu className="w-6 h-6 text-[#14532D]" />
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-[#E2D9C8] flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="bg-[#ECFDF5] text-[#14532D] border border-[#14532D] text-[10px] font-black px-2 py-0.5 rounded flex items-center gap-1">
                  <span>⏳</span>
                  <span>{lot?.status === 'ready' ? t.statusReady : t.statusWaiting}</span>
                </span>

                <div className="flex items-center gap-3 text-[11px] font-bold text-[#57534E]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {lot?.formattedDate || '24 Sep 2026, 09:30 AM'}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#B45309]" />
                    {t.serviceArea}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Material Photo Card (Truthful: Not proof of transaction or ownership) */}
            <div className="bg-white border-2 border-[#1C1917] rounded-lg p-3.5 shadow-mech space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-heading font-black text-xs text-[#1C1917]">
                  <Camera className="w-4 h-4 text-[#14532D]" />
                  <span>{t.materialPhotoTitle}</span>
                </div>
                <span className="text-[10px] font-bold text-[#B45309] bg-[#FEF3C7] px-1.5 py-0.5 rounded">
                  {t.attachmentCount}
                </span>
              </div>

              {/* Photo visual container with browser upload support */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-44 rounded-md bg-[#163322] border-2 border-[#1C1917] relative flex flex-col items-center justify-center text-white p-3 cursor-pointer overflow-hidden group"
                title="Click to capture/select material photo"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />

                {photoPreview ? (
                  <img src={photoPreview} alt="Captured material" className="w-full h-full object-cover" />
                ) : (
                  <>
                    {/* Visual badge top left */}
                    <div className="absolute top-2 left-2 bg-[#ECFDF5] text-[#14532D] border border-[#14532D] px-2 py-0.5 rounded text-[10px] font-black flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{t.cameraCaptured}</span>
                    </div>

                    <Cpu className="w-12 h-12 text-[#4ADE80] mb-2 opacity-90 group-hover:scale-110 transition-transform" />
                    <span className="font-heading font-black text-xs tracking-wider uppercase text-stone-200">
                      {getLotTitle(lot).toUpperCase()} LOT • {lotId}
                    </span>
                    <span className="text-[10px] font-mono text-stone-300 mt-1">
                      STAMP: 2026-09-24 10:14:52
                    </span>
                    <span className="text-[10px] font-bold text-[#F59E0B] mt-2 underline flex items-center gap-1">
                      <Upload className="w-3 h-3" /> {t.changePhotoBtn}
                    </span>
                  </>
                )}
              </div>

              <div className="bg-[#FFFBEB] border border-[#E2D9C8] rounded p-2 text-xs font-semibold text-[#57534E] flex items-center justify-between">
                <span>🛡 {t.gradeANote}</span>
                <span className="text-[10.5px] font-bold text-[#B45309] bg-[#FEF3C7] px-1.5 py-0.5 rounded">
                  {t.noteTag}
                </span>
              </div>
            </div>

            {/* 5. Verification Policy Box */}
            <div className="bg-[#FFF4E5] border-2 border-[#1C1917] rounded-lg p-3.5 shadow-mech-sm flex items-start gap-2.5">
              <Shield className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-heading font-black text-xs text-[#B45309] uppercase tracking-wider">
                  {t.verificationPolicyTitle}
                </h4>
                <p className="text-xs text-[#78350F] font-semibold mt-1 leading-relaxed">
                  {t.verificationPolicyBody}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Weight & Valuation, Lifecycle, CTAs */}
          <div className="md:col-span-5 space-y-4">
            {/* 3. Weight & Estimated Value Grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Declared Weight */}
              <div className="bg-white border-2 border-[#1C1917] rounded-lg p-3 shadow-mech-sm">
                <span className="text-[10px] font-black text-[#57534E] uppercase tracking-wider block">
                  {t.declaredWeightTitle}
                </span>
                <div className="font-heading font-black text-3xl text-[#1C1917] mt-1 flex items-baseline gap-1 font-mono">
                  <span>{lot?.declaredWeightKg ?? 2.1}</span>
                  <span className="text-sm font-black text-[#78716C]">KG</span>
                </div>
                <span className="text-[10px] font-semibold text-[#57534E] block mt-0.5">
                  {t.declaredWeightSub}
                </span>
              </div>

              {/* Indicative Estimated Value */}
              <div className="bg-[#B45309] text-white border-2 border-[#1C1917] rounded-lg p-3 shadow-mech-sm">
                <span className="text-[10px] font-black text-[#FEF3C7] uppercase tracking-wider block">
                  {t.estValueTitle}
                </span>
                <div className="font-heading font-black text-2xl text-white mt-1 leading-tight font-mono">
                  {lot?.estimatedPriceMax ? `₹${lot.estimatedPrice} - ₹${lot.estimatedPriceMax}` : `₹${lot?.estimatedPrice ?? 620}`}
                </div>
                <span className="text-[10px] font-semibold text-[#FEF3C7] block mt-0.5">
                  {t.estValueSub}
                </span>
              </div>
            </div>

            {/* 4. Lifecycle Tracker (Batch Progress) */}
            <div className="bg-white border-2 border-[#1C1917] rounded-lg p-3.5 shadow-mech space-y-3">
              <div className="flex items-center justify-between border-b border-[#E2D9C8] pb-2">
                <h3 className="font-heading font-black text-xs text-[#1C1917] tracking-wider uppercase">
                  {t.batchProgressTitle}
                </h3>
                <span className="text-[10.5px] font-extrabold text-[#B45309] bg-[#FEF3C7] px-2 py-0.5 rounded">
                  {t.stepOfProgress}
                </span>
              </div>

              <div className="space-y-3.5 relative pl-2">
                {/* Step 1: Lot Created */}
                <div className="flex items-start gap-3 relative">
                  <div className="w-6 h-6 rounded-full bg-[#15803D] text-white border-1.5 border-[#1C1917] flex items-center justify-center shrink-0 z-10">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1 -mt-0.5">
                    <h4 className="font-heading font-black text-xs text-[#1C1917]">
                      {t.step1Title}
                    </h4>
                    <p className="text-[11px] text-[#57534E] font-medium">
                      {t.step1Desc}
                    </p>
                  </div>
                </div>

                {/* Connecting line */}
                <div className="absolute left-[19px] top-4 w-0.5 h-10 bg-[#15803D]" />

                {/* Step 2: Waiting for Recycler (Current Active Step) */}
                <div className="flex items-start gap-3 relative">
                  <div className="w-6 h-6 rounded-full bg-[#F59E0B] text-[#1C1917] border-1.5 border-[#1C1917] flex items-center justify-center font-black text-xs shrink-0 z-10 shadow-mech-sm">
                    2
                  </div>
                  <div className="flex-1 -mt-0.5 bg-[#FFFBEB] border border-[#F59E0B] rounded p-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-heading font-black text-xs text-[#B45309]">
                        {t.step2Title}
                      </h4>
                      <span className="bg-[#F59E0B] text-[#1C1917] text-[9.5px] font-black px-1.5 py-0.2 rounded uppercase">
                        {t.step2CurrentBadge}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#78350F] font-semibold mt-0.5">
                      {t.step2Desc}
                    </p>
                  </div>
                </div>

                {/* Connecting line */}
                <div className="absolute left-[19px] top-18 w-0.5 h-12 bg-[#E2D9C8]" />

                {/* Step 3: Recycler Matched */}
                <div className="flex items-start gap-3 relative">
                  <div className="w-6 h-6 rounded-full bg-[#F2EEDE] text-[#78716C] border border-[#A8A29E] flex items-center justify-center font-bold text-xs shrink-0 z-10">
                    3
                  </div>
                  <div className="flex-1 -mt-0.5">
                    <h4 className="font-heading font-bold text-xs text-[#78716C]">
                      {t.step3Title}
                    </h4>
                    <p className="text-[11px] text-[#A8A29E] font-medium">
                      {t.step3Desc}
                    </p>
                  </div>
                </div>

                {/* Connecting line */}
                <div className="absolute left-[19px] top-32 w-0.5 h-10 bg-[#E2D9C8]" />

                {/* Step 4: Handover & Payment */}
                <div className="flex items-start gap-3 relative">
                  <div className="w-6 h-6 rounded-full bg-[#F2EEDE] text-[#78716C] border border-[#A8A29E] flex items-center justify-center font-bold text-xs shrink-0 z-10">
                    4
                  </div>
                  <div className="flex-1 -mt-0.5">
                    <h4 className="font-heading font-bold text-xs text-[#78716C]">
                      {t.step4Title}
                    </h4>
                    <p className="text-[11px] text-[#A8A29E] font-medium">
                      {t.step4Desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Action CTAs */}
            <div className="space-y-2.5 pt-1">
              <button
                onClick={() => navigate('/collector/recyclers')}
                className="w-full bg-[#14532D] hover:bg-[#0F3F22] text-white border-2 border-[#1C1917] rounded-lg py-3 px-4 font-heading font-black text-sm tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
              >
                <span>{t.findRecyclerBtn}</span>
                <span className="bg-[#166534] text-[#FEF3C7] text-[10px] px-1.5 py-0.5 rounded font-black uppercase ml-auto flex items-center gap-1">
                  {t.nextStepBadge} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>

              <button
                onClick={() => navigate('/collector/start')}
                className="w-full bg-white hover:bg-[#F2EEDE] text-[#1C1917] border-2 border-[#1C1917] rounded-lg py-2.5 px-4 font-heading font-bold text-xs tracking-wide shadow-mech-sm flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#57534E]" />
                <span>{t.editLotBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
