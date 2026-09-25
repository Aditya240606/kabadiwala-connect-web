import { createContext } from 'react';

export interface ClassificationResult {
  predictedClass: string;
  confidence: number;
  suggestedCategoryCode: string;
  suggestedCategoryDisplayName: string;
  modelName: string;
  modelVersion: string;
  needsConfirmation: boolean;
  requiresManualSelection: boolean;
}

export interface WasteCategory {
  code: string;
  displayName: string;
  description: string;
  icon: string;
}

export type FlowStep = 'start' | 'capture' | 'classifying' | 'classification-result' | 'manual-category' | 'weight' | 'review' | 'created';

export interface CollectionFlowState {
  step: FlowStep;
  photoDataUrl: string | null;
  photoFile: File | null;
  classificationResult: ClassificationResult | null;
  confirmedCategoryCode: string | null;
  confirmedCategoryDisplayName: string | null;
  classificationMethod: 'AI_CONFIRMED' | 'AI_CORRECTED' | 'MANUAL' | null;
  weightKg: number | null;
  estimatedPricePerKg: number | null;
  estimatedTotal: number | null;
  lotId: string | null;
  notes: string;
}

export interface CollectionFlowContextType {
  flow: CollectionFlowState;
  setStep: (step: FlowStep) => void;
  setPhoto: (dataUrl: string, file: File) => void;
  setClassificationResult: (result: ClassificationResult) => void;
  confirmCategory: (code: string, displayName: string, method: 'AI_CONFIRMED' | 'AI_CORRECTED' | 'MANUAL') => void;
  setWeight: (kg: number) => void;
  setEstimatedPrice: (perKg: number, total: number) => void;
  setLotId: (id: string) => void;
  setNotes: (notes: string) => void;
  resetFlow: () => void;
}

export const CollectionFlowContext = createContext<CollectionFlowContextType | null>(null);
