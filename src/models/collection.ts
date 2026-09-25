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

// ── Batch 3: Recycler & Handover Models (Aligned with backend schema) ──
export interface RecyclerDto {
  id: string;
  facilityName: string;
  facilityNameHi?: string;
  facilityNameMr?: string;
  locationAddress: string;
  locationAddressHi?: string;
  locationAddressMr?: string;
  city: string;
  contactPhone: string;
  contactEmail: string;
  status: 'ACTIVE' | 'INACTIVE';
  acceptedCategoryCodes: string[];
  distanceKm?: number;
  operatingHours?: string;
  verifiedBadge?: boolean;
}

export type HandoverStatus = 'INITIATED' | 'ACCEPTED' | 'COLLECTED' | 'REJECTED' | 'COMPLETED';

export interface HandoverTransactionDto {
  id: string;
  lotId: string;
  collectorId: string;
  recyclerId: string;
  recyclerFacilityName: string;
  agreedWeightKg?: number;
  agreedPricePerKg?: number;
  totalAmount?: number;
  status: HandoverStatus;
  paymentMethod?: 'CASH' | 'DIGITAL';
  handoverNotes?: string;
  createdAt: string;
  completedAt?: string;
}

export interface InitiateHandoverParams {
  lotId: string;
  recyclerId: string;
  notes?: string;
}

