import React, { useState, useCallback } from 'react';
import {
  CollectionFlowContext,
  type FlowStep,
  type CollectionFlowState,
  type ClassificationResult,
} from './collectionFlowContextDefinition';

export type {
  ClassificationResult,
  WasteCategory,
  FlowStep,
  CollectionFlowState,
  CollectionFlowContextType,
} from './collectionFlowContextDefinition';

const initialFlowState: CollectionFlowState = {
  step: 'start',
  photoDataUrl: null,
  photoFile: null,
  classificationResult: null,
  confirmedCategoryCode: null,
  confirmedCategoryDisplayName: null,
  classificationMethod: null,
  weightKg: null,
  estimatedPricePerKg: null,
  estimatedTotal: null,
  lotId: null,
  notes: '',
};

export const CollectionFlowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flow, setFlow] = useState<CollectionFlowState>(initialFlowState);

  const setStep = useCallback((step: FlowStep) => {
    setFlow(prev => ({ ...prev, step }));
  }, []);

  const setPhoto = useCallback((dataUrl: string, file: File) => {
    setFlow(prev => ({ ...prev, photoDataUrl: dataUrl, photoFile: file }));
  }, []);

  const setClassificationResult = useCallback((result: ClassificationResult) => {
    setFlow(prev => ({ ...prev, classificationResult: result }));
  }, []);

  const confirmCategory = useCallback((code: string, displayName: string, method: 'AI_CONFIRMED' | 'AI_CORRECTED' | 'MANUAL') => {
    setFlow(prev => ({
      ...prev,
      confirmedCategoryCode: code,
      confirmedCategoryDisplayName: displayName,
      classificationMethod: method,
    }));
  }, []);

  const setWeight = useCallback((kg: number) => {
    setFlow(prev => ({ ...prev, weightKg: kg }));
  }, []);

  const setEstimatedPrice = useCallback((perKg: number, total: number) => {
    setFlow(prev => ({ ...prev, estimatedPricePerKg: perKg, estimatedTotal: total }));
  }, []);

  const setLotId = useCallback((id: string) => {
    setFlow(prev => ({ ...prev, lotId: id }));
  }, []);

  const setNotes = useCallback((notes: string) => {
    setFlow(prev => ({ ...prev, notes }));
  }, []);

  const resetFlow = useCallback(() => {
    setFlow(initialFlowState);
  }, []);

  return (
    <CollectionFlowContext.Provider
      value={{
        flow,
        setStep,
        setPhoto,
        setClassificationResult,
        confirmCategory,
        setWeight,
        setEstimatedPrice,
        setLotId,
        setNotes,
        resetFlow,
      }}
    >
      {children}
    </CollectionFlowContext.Provider>
  );
};
