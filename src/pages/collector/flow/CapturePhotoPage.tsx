import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, ImagePlus, ArrowRight, RotateCcw, Lightbulb } from 'lucide-react';
import { Header } from '../../../components/common/Header';
import { AudioGuidanceCard } from '../../../components/common/AudioGuidanceCard';
import { FlowStepIndicator } from '../../../components/common/FlowStepIndicator';
import { useApp } from '../../../hooks/useApp';
import { useCollectionFlow } from '../../../hooks/useCollectionFlow';
import { SAMPLE_EWASTE_PHOTO } from '../../../data/samplePhoto';

export const CapturePhotoPage: React.FC = () => {
  const navigate = useNavigate();
  const { language, t } = useApp();
  const { flow, setPhoto } = useCollectionFlow();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(flow.photoDataUrl);

  const captureAudioPrompts: Record<string, string> = {
    en: 'Step 1: Take a clear photo of the e-waste material on a flat surface with good lighting.',
    hi: 'चरण 1: अच्छी रोशनी में समतल जगह पर ई-कचरे की साफ फोटो खींचें।',
    mr: 'टप्पा 1: चांगल्या प्रकाशात सपाट जागी ई-कचऱ्याचा स्पष्ट फोटो घ्या.',
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setPreview(dataUrl);
      setPhoto(dataUrl, file);
    };
    reader.readAsDataURL(file);
  };

  const handleUseSample = () => {
    // Synthetic file for prototype state
    const blob = new Blob(['sample-pcb'], { type: 'image/svg+xml' });
    const dummyFile = new File([blob], 'sample-pcb.svg', { type: 'image/svg+xml' });
    setPreview(SAMPLE_EWASTE_PHOTO);
    setPhoto(SAMPLE_EWASTE_PHOTO, dummyFile);
  };

  const handleRetake = () => {
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleUsePhoto = () => {
    if (preview) {
      navigate('/collector/flow/classify');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB]">
      <Header
        showBack
        onBack={() => navigate('/collector')}
        titleOverride={t.captureTitle}
        subtitleOverride={t.flowStep1Capture}
      />

      <div className="flex-1 w-full max-w-3xl mx-auto p-4 md:p-6 space-y-4 overflow-y-auto pb-12">
        <FlowStepIndicator currentStep={1} />

        {/* Audio Guidance Card */}
        <AudioGuidanceCard
          audioId="A03_take_photo"
          instruction={captureAudioPrompts[language] || captureAudioPrompts.hi}
        />

        {/* Photo Area */}
        <div className="bg-white border-2 border-[#1C1917] rounded-lg shadow-mech overflow-hidden">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Captured material"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute top-3 right-3">
                <span className="bg-[#14532D] text-white text-xs font-black px-2 py-1 rounded uppercase">
                  {t.cameraCaptured}
                </span>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-[4/3] bg-[#F2EEDE] flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#EDE8D5] transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-[#14532D] text-white flex items-center justify-center border-2 border-[#1C1917] shadow-mech">
                <Camera className="w-8 h-8" />
              </div>
              <span className="font-heading font-black text-base sm:text-lg text-[#1C1917]">
                {t.captureBtn}
              </span>
            </div>
          )}
        </div>

        {/* Tip */}
        <div className="bg-[#FEF3C7] border-2 border-[#1C1917] rounded-lg p-3 shadow-mech-sm flex items-start gap-2.5">
          <Lightbulb className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
          <p className="text-sm text-[#78350F] font-semibold leading-snug">
            {t.capturePhotoTip}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          {preview ? (
            <>
              <button
                onClick={handleUsePhoto}
                className="w-full bg-[#14532D] hover:bg-[#0F3F22] text-white border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-lg tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
              >
                <ImagePlus className="w-5 h-5" />
                <span>{t.captureUsePhoto}</span>
                <ArrowRight className="w-5 h-5 ml-auto" />
              </button>

              <button
                onClick={handleRetake}
                className="w-full bg-white hover:bg-[#F2EEDE] text-[#1C1917] border-2 border-[#1C1917] rounded-lg py-3 px-4 font-heading font-black text-base tracking-wide shadow-mech-sm flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.captureRetake}</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-[#1C1917] border-2 border-[#1C1917] rounded-lg py-3.5 px-4 font-heading font-black text-lg tracking-wide shadow-mech flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
              >
                <Camera className="w-5 h-5 stroke-[3]" />
                <span>{t.captureBtn}</span>
              </button>

              <button
                type="button"
                onClick={handleUseSample}
                className="w-full bg-white hover:bg-[#F2EEDE] text-[#1C1917] border-2 border-[#1C1917] rounded-lg py-2.5 px-4 font-heading font-black text-sm tracking-wide shadow-mech-sm flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
              >
                <ImagePlus className="w-4 h-4 text-[#14532D]" />
                <span>{language === 'hi' ? 'नमूना फोटो का उपयोग करें' : language === 'mr' ? 'नमुना फोटो वापरा' : 'Use Sample Photo'}</span>
              </button>
            </>
          )}
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};
