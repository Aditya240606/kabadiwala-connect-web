import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Construction, ArrowLeft } from 'lucide-react';
import { Header } from '../../components/common/Header';

export const FutureBatchPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getRouteDetails = (pathname: string) => {
    switch (pathname) {
      case '/collector/start':
        return {
          title: 'Start New Collection / नई सामग्री',
          batch: 'Planned in Batch 2 (Capture & Material Entry)',
          desc: 'Image upload and manual weight entry workflow will be implemented in Batch 2.',
        };
      case '/collector/classification':
        return {
          title: 'Classification Review / श्रेणी समीक्षा',
          batch: 'Planned in Batch 2 (Assistive AI Classification)',
          desc: 'Assistive computer-vision category suggestion with collector manual override.',
        };
      case '/collector/weight':
        return {
          title: 'Manual Weight Entry / वज़न दर्ज करें',
          batch: 'Planned in Batch 2 (Weight Entry)',
          desc: 'Truthful manual weight entry input with unit validation.',
        };
      case '/collector/pricing':
        return {
          title: 'Benchmark Pricing / मानक दरें',
          batch: 'Planned in Batch 2 (Pricing Summary)',
          desc: 'CPCB and formal recycler benchmark pricing guidance.',
        };
      case '/collector/recyclers':
        return {
          title: 'Find Recycler / रिसाइक्लर खोजें',
          batch: 'Planned in Batch 3 (Recycler Matching)',
          desc: 'Location-based matching with registered informal and formal recyclers.',
        };
      case '/collector/handover':
        return {
          title: 'Handover & Payment / हैंडओवर और भुगतान',
          batch: 'Planned in Batch 4 (Physical Handover)',
          desc: 'Recycler physical re-weigh verification and transaction slip generation.',
        };
      case '/collector/transactions':
        return {
          title: 'Transactions / लेन-देन',
          batch: 'Planned in Batch 4 (History & Receipts)',
          desc: 'Ledger of completed physical handovers and payment records.',
        };
      case '/recycler':
        return {
          title: 'Recycler Mode / रिसाइक्लर मोड',
          batch: 'Planned in Subsequent Phase',
          desc: 'Recycler portal for accepting scrap lots and issuing physical verification receipts.',
        };
      default:
        return {
          title: 'Planned Route / आगामी चरण',
          batch: 'Subsequent Batch',
          desc: 'This screen is scoped for subsequent implementation batches.',
        };
    }
  };

  const details = getRouteDetails(location.pathname);

  return (
    <div className="flex-1 flex flex-col bg-[#FFFBEB]">
      <Header showBack onBack={() => navigate('/collector')} />

      <div className="flex-1 p-4 flex flex-col items-center justify-center text-center">
        <div className="bg-white border-2 border-[#1C1917] rounded-xl p-6 shadow-mech max-w-sm w-full space-y-4">
          <div className="w-14 h-14 rounded-full bg-[#FEF3C7] border-2 border-[#1C1917] flex items-center justify-center mx-auto text-[#B45309] shadow-mech-sm">
            <Construction className="w-7 h-7" />
          </div>

          <div>
            <span className="bg-[#14532D] text-white text-xs font-black px-2.5 py-1 rounded tracking-wide uppercase inline-block mb-2">
              {details.batch}
            </span>
            <h2 className="font-heading font-black text-xl sm:text-2xl text-[#1C1917]">
              {details.title}
            </h2>
            <p className="text-sm text-[#57534E] font-medium mt-2 leading-relaxed">
              {details.desc}
            </p>
          </div>

          <div className="bg-[#F2EEDE] border border-[#E2D9C8] rounded-md p-2.5 text-xs font-mono text-[#1C1917]">
            Route: {location.pathname}
          </div>

          <button
            onClick={() => navigate('/collector')}
            className="w-full bg-[#14532D] hover:bg-[#0F3F22] text-white border-2 border-[#1C1917] rounded-lg py-3 px-4 font-heading font-black text-sm tracking-wide shadow-mech-sm flex items-center justify-center gap-2 active:translate-y-0.5 transition-all"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" />
            <span>Back to Collector Home / मुख्य पृष्ठ</span>
          </button>
        </div>
      </div>
    </div>
  );
};
