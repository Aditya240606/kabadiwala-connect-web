export type CollectionLotStatus = 'waitingForRecycler' | 'ready' | 'matched' | 'completed';

export interface CollectionLot {
  id: string;
  categoryCode: string;
  titleEnglish: string;
  titleHindi: string;
  titleMarathi?: string;
  declaredWeightKg: number;
  weightDetails: string;
  subtitleHindi?: string;
  itemDetails?: string;
  estimatedPrice: number;
  estimatedPriceMax?: number;
  finalPayout?: number;
  receiptCode?: string;
  status: CollectionLotStatus;
  createdAt: string; // ISO
  formattedDate: string;
  locationName: string;
  imageUrl?: string;
  hasPhoto: boolean;
  gradeDescription?: string;
  categoryIcon: 'smartphone' | 'motherboard' | 'cable' | 'telecom';
}

export interface CollectionSummary {
  totalLotsCount: number;
  totalDeclaredWeightKg: number;
  todayLotsCount: number;
  todayWeightKg: number;
  todayEstimatedValue: number;
  isSampleData: boolean;
}

export interface CollectorProfile {
  fullName: string;
  phoneNumber: string;
  areaName: string;
  role: string;
  languageCode: 'en' | 'hi' | 'mr';
  languageDisplayName: string;
  isAudioGuideEnabled: boolean;
  isLocalLotStorageActive: boolean;
  appVersion: string;
}
