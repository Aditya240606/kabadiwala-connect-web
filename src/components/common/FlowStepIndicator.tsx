import React from 'react';
import { useApp } from '../../hooks/useApp';

interface FlowStepIndicatorProps {
  currentStep: 1 | 2 | 3 | 4;
}

export const FlowStepIndicator: React.FC<FlowStepIndicatorProps> = ({ currentStep }) => {
  const { t } = useApp();

  const steps = [
    { num: 1, label: t.flowStep1Capture },
    { num: 2, label: t.flowStep2Classify },
    { num: 3, label: t.flowStep3Weight },
    { num: 4, label: t.flowStep4Review },
  ];

  return (
    <div className="flex items-center justify-between px-1 py-2">
      {steps.map((step, i) => {
        const isComplete = step.num < currentStep;
        const isCurrent = step.num === currentStep;
        return (
          <React.Fragment key={step.num}>
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-black transition-all ${
                  isComplete
                    ? 'bg-[#14532D] border-[#14532D] text-white'
                    : isCurrent
                      ? 'bg-[#F59E0B] border-[#1C1917] text-[#1C1917] shadow-mech-sm'
                      : 'bg-[#F2EEDE] border-[#E2D9C8] text-[#78716C]'
                }`}
              >
                {isComplete ? '✓' : step.num}
              </div>
              <span
                className={`text-[10px] font-bold leading-tight ${
                  isCurrent ? 'text-[#1C1917]' : isComplete ? 'text-[#14532D]' : 'text-[#78716C]'
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-1 rounded ${
                  step.num < currentStep ? 'bg-[#14532D]' : 'bg-[#E2D9C8]'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
