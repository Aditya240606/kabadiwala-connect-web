import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { QrCode, Copy, Check } from 'lucide-react';
import { useApp } from '../../hooks/useApp';

interface DigitalLotQrCardProps {
  lotId: string;
  size?: number;
  compact?: boolean;
  className?: string;
  showUrlLink?: boolean;
}

const getLotCanonicalUrl = (lotId: string): string => {
  const origin = typeof window !== 'undefined' && window.location.origin
    ? window.location.origin
    : 'http://localhost:5173';
  return `${origin}/collector/lots/${encodeURIComponent(lotId)}`;
};

export const DigitalLotQrCard: React.FC<DigitalLotQrCardProps> = ({
  lotId,
  size = 168,
  compact = false,
  className = '',
  showUrlLink = true,
}) => {
  const { t } = useApp();
  const [copied, setCopied] = useState(false);
  const lotUrl = getLotCanonicalUrl(lotId);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(lotUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <div
      className={`bg-white border-2 border-[#1C1917] rounded-lg p-4 shadow-mech text-center space-y-3 ${className}`}
    >
      {/* Header with Title Badge */}
      <div className="flex items-center justify-between gap-2 border-b border-[#E2D9C8] pb-2.5">
        <span className="bg-[#14532D] text-white text-[11px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
          {t.digitalLotIdTitle}
        </span>
        <span className="text-xs font-mono font-black text-[#57534E]">
          {lotId}
        </span>
      </div>

      {/* QR Code Container */}
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white border-2 border-[#1C1917] rounded-lg p-3 inline-flex items-center justify-center shadow-mech-sm">
          {lotId ? (
            <QRCodeSVG
              value={lotUrl}
              size={size}
              level="M"
              fgColor="#1C1917"
              bgColor="#FFFFFF"
            />
          ) : (
            <div
              style={{ width: size, height: size }}
              className="flex flex-col items-center justify-center bg-[#F2EEDE] rounded text-[#78716C]"
            >
              <QrCode className="w-10 h-10 mb-1 opacity-50" />
              <span className="text-xs font-bold font-mono">NO LOT ID</span>
            </div>
          )}
        </div>
      </div>

      {/* Instructions & Canonical Subtitle */}
      <div className="space-y-1">
        <p className="font-heading font-black text-sm sm:text-base text-[#1C1917] flex items-center justify-center gap-1.5">
          <QrCode className="w-4 h-4 text-[#14532D] shrink-0" />
          <span>{t.scanQrInstruction}</span>
        </p>
        {!compact && (
          <p className="text-xs font-semibold text-[#78716C]">
            {t.digitalLotIdSub}
          </p>
        )}
      </div>

      {/* Canonical URL preview & Copy action */}
      {showUrlLink && (
        <div className="pt-2 border-t border-[#E2D9C8] flex items-center justify-between text-xs text-[#57534E] gap-2">
          <span className="font-mono text-[11px] font-bold text-[#14532D] truncate text-left">
            /collector/lots/{lotId}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1 bg-[#F2EEDE] hover:bg-[#E2D9C8] text-[#1C1917] border border-[#1C1917] rounded px-2 py-0.5 text-[11px] font-black uppercase transition-all shrink-0 active:scale-95"
            title="Copy lot access URL"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[#15803D]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy URL</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
