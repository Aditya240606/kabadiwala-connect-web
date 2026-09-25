import type {
  CollectionLot,
  CollectionSummary,
  CollectorProfile,
  CollectionLotStatus,
  RecyclerDto,
  HandoverTransactionDto,
  InitiateHandoverParams,
  AcceptHandoverParams,
  CollectHandoverParams,
  CompleteTransactionParams,
} from '../models/collection';

export interface CollectionRepository {
  getCollectionSummary(): Promise<CollectionSummary>;
  getLots(status?: CollectionLotStatus): Promise<CollectionLot[]>;
  getLotById(id: string): Promise<CollectionLot | null>;
  getCollectorProfile(): Promise<CollectorProfile>;
  getRecyclers(categoryCode?: string, city?: string): Promise<RecyclerDto[]>;
  getRecyclerById(id: string): Promise<RecyclerDto | null>;
  initiateHandover(params: InitiateHandoverParams): Promise<HandoverTransactionDto>;
  getHandoverTransactions(): Promise<HandoverTransactionDto[]>;
  getRecyclerPendingTransactions(): Promise<HandoverTransactionDto[]>;
  getTransactionById(id: string): Promise<HandoverTransactionDto | null>;
  acceptHandover(params: AcceptHandoverParams): Promise<HandoverTransactionDto>;
  collectHandover(params: CollectHandoverParams): Promise<HandoverTransactionDto>;
  completeTransaction(params: CompleteTransactionParams): Promise<HandoverTransactionDto>;
  updateAudioGuide(enabled: boolean): Promise<void>;
  updateLanguage(languageCode: 'en' | 'hi' | 'mr'): Promise<void>;
}

export class MockCollectionRepository implements CollectionRepository {
  private profile: CollectorProfile = {
    fullName: 'Your Name',
    phoneNumber: '+91 XXXXX XXXXX',
    areaName: 'Service Area',
    role: 'Collector',
    languageCode: 'hi',
    languageDisplayName: 'हिन्दी',
    isAudioGuideEnabled: true,
    isLocalLotStorageActive: true,
    appVersion: 'v1.0.0 (SIH 2026 PS 26229)',
  };

  private sampleLots: CollectionLot[] = [
    {
      id: 'LOT-2026-0824',
      categoryCode: 'SMARTPHONE',
      titleEnglish: 'Smartphone Scrap',
      titleHindi: 'स्मार्टफोन स्क्रैप',
      titleMarathi: 'स्मार्टफोन भंगार',
      declaredWeightKg: 3.2,
      weightDetails: '3.2 kg • 2 Units',
      subtitleHindi: 'मोबाइल फोन',
      itemDetails: 'Notified to 4 registered recyclers',
      estimatedPrice: 450,
      estimatedPriceMax: 500,
      status: 'waitingForRecycler',
      createdAt: '2026-09-24T10:15:00',
      formattedDate: '24 Sep 2026, 10:15 AM',
      locationName: 'Service Area',
      hasPhoto: true,
      gradeDescription: 'Grade B • Intact displays',
      categoryIcon: 'smartphone',
    },
    {
      id: 'LOT-2026-0818',
      categoryCode: 'PCB_MOTHERBOARD',
      titleEnglish: 'Motherboard PCB',
      titleHindi: 'सर्किट बोर्ड',
      titleMarathi: 'मदरबोर्ड पीसीबी',
      declaredWeightKg: 2.1,
      weightDetails: '2.1 kg • Class A',
      subtitleHindi: 'सर्किट प्लेट',
      itemDetails: 'Weight Entry: Manual • Collector Declared',
      estimatedPrice: 620,
      estimatedPriceMax: 700,
      status: 'ready',
      createdAt: '2026-09-24T09:30:00',
      formattedDate: '24 Sep 2026, 09:30 AM',
      locationName: 'Service Area',
      hasPhoto: true,
      gradeDescription: 'Grade A • Clean Dismantled • No heavy chassis metals',
      categoryIcon: 'motherboard',
    },
    {
      id: 'LOT-2026-0902',
      categoryCode: 'COPPER_WIRE',
      titleEnglish: 'Copper Wire & Motors',
      titleHindi: 'तांबे की तार',
      titleMarathi: 'तांब्याची तार आणि मोटर्स',
      declaredWeightKg: 5.8,
      weightDetails: '5.8 kg • Clean Copper',
      subtitleHindi: 'मोटर और तार',
      itemDetails: 'Matching nearby aggregators',
      estimatedPrice: 1450,
      estimatedPriceMax: 1600,
      status: 'waitingForRecycler',
      createdAt: '2026-09-23T16:45:00',
      formattedDate: '23 Sep 2026, 04:45 PM',
      locationName: 'Service Area',
      hasPhoto: false,
      gradeDescription: 'Stripped copper wire & small fan motors',
      categoryIcon: 'cable',
    },
    {
      id: 'LOT-2026-0871',
      categoryCode: 'TELECOM_CARDS',
      titleEnglish: 'Mixed Telecom Cards',
      titleHindi: 'टेलीकॉम कार्ड',
      titleMarathi: 'मिश्र टेलिकॉम कार्ड्स',
      declaredWeightKg: 3.0,
      weightDetails: '3.0 kg • Verified',
      subtitleHindi: 'टेलीकॉम प्लेट्स',
      itemDetails: 'Handover Completed • #840 Receipt',
      estimatedPrice: 840,
      finalPayout: 840,
      receiptCode: 'REC-2026-0840',
      status: 'completed',
      createdAt: '2026-09-22T14:00:00',
      formattedDate: '22 Sep 2026',
      locationName: 'Service Area',
      hasPhoto: true,
      gradeDescription: 'Audited telecom line cards',
      categoryIcon: 'telecom',
    },
  ];

  private sampleSummary: CollectionSummary = {
    totalLotsCount: 4,
    totalDeclaredWeightKg: 14.1,
    todayLotsCount: 3,
    todayWeightKg: 12.5,
    todayEstimatedValue: 1850,
    isSampleData: true,
  };

  async getCollectionSummary(): Promise<CollectionSummary> {
    return { ...this.sampleSummary };
  }

  async getLots(status?: CollectionLotStatus): Promise<CollectionLot[]> {
    if (!status) return [...this.sampleLots];
    return this.sampleLots.filter((lot) => lot.status === status);
  }

  async getLotById(id: string): Promise<CollectionLot | null> {
    const lot = this.sampleLots.find((l) => l.id === id);
    if (lot) return { ...lot };
    // Fallback for direct URL access matching Stitch reference
    return {
      id,
      categoryCode: 'PCB_MOTHERBOARD',
      titleEnglish: 'Motherboard PCB',
      titleHindi: 'सर्किट बोर्ड',
      declaredWeightKg: 2.1,
      weightDetails: '2.1 kg • Class A',
      subtitleHindi: 'सर्किट प्लेट',
      itemDetails: 'Weight Entry: Manual • Collector Declared',
      estimatedPrice: 620,
      estimatedPriceMax: 700,
      status: 'ready',
      createdAt: '2026-09-24T09:30:00',
      formattedDate: '24 Sep 2026, 09:30 AM',
      locationName: 'Service Area / सेवा क्षेत्र',
      hasPhoto: true,
      gradeDescription: 'Grade A • Clean Dismantled • No heavy chassis metals',
      categoryIcon: 'motherboard',
    };
  }

  async getCollectorProfile(): Promise<CollectorProfile> {
    return { ...this.profile };
  }

  async updateAudioGuide(enabled: boolean): Promise<void> {
    this.profile.isAudioGuideEnabled = enabled;
  }

  async updateLanguage(languageCode: 'en' | 'hi' | 'mr'): Promise<void> {
    const displayNames = {
      en: 'English',
      hi: 'हिन्दी / Hindi',
      mr: 'मराठी / Marathi',
    };
    this.profile.languageCode = languageCode;
    this.profile.languageDisplayName = displayNames[languageCode];
  }

  private sampleRecyclers: RecyclerDto[] = [
    {
      id: 'rec-pune-01',
      facilityName: 'EcoRecycle Green Hub',
      facilityNameHi: 'इको-रीसायकल ग्रीन हब',
      facilityNameMr: 'इको-रिसायकल ग्रीन हब',
      locationAddress: 'Plot 12, Industrial Area, Phase II',
      locationAddressHi: 'प्लॉट १२, औद्योगिक क्षेत्र, फेज २',
      locationAddressMr: 'प्लॉट १२, औद्योगिक क्षेत्र, टप्पा २',
      city: 'Pune',
      contactPhone: '+91 98220 12345',
      contactEmail: 'ops@ecorecycle.in',
      status: 'ACTIVE',
      acceptedCategoryCodes: ['SMARTPHONE', 'PCB_MOTHERBOARD', 'COPPER_WIRE', 'BATTERY_PACK', 'TELECOM_CARDS'],
      distanceKm: 2.4,
      operatingHours: '09:00 AM – 06:00 PM',
      verifiedBadge: true,
    },
    {
      id: 'rec-pune-02',
      facilityName: 'Maha Clean Metals & Scrap',
      facilityNameHi: 'महा क्लीन मेटल्स एंड स्क्रैप',
      facilityNameMr: 'महा क्लीन मेटल्स आणि भंगार',
      locationAddress: 'Gat 45, Hadapsar Industrial Zone',
      locationAddressHi: 'गट ४५, हडपसर औद्योगिक क्षेत्र',
      locationAddressMr: 'गट ४५, हडपसर इंडस्ट्रिअल झोन',
      city: 'Pune',
      contactPhone: '+91 94225 67890',
      contactEmail: 'contact@mahaclean.com',
      status: 'ACTIVE',
      acceptedCategoryCodes: ['PCB_MOTHERBOARD', 'LOW_GRADE_PCB', 'COPPER_WIRE', 'FAN_MOTOR', 'MIXED_EWASTE'],
      distanceKm: 4.8,
      operatingHours: '08:30 AM – 06:30 PM',
      verifiedBadge: true,
    },
    {
      id: 'rec-pune-03',
      facilityName: 'Apex Battery & Telecom Refiners',
      facilityNameHi: 'एपेक्स बैटरी एंड टेलीकॉम रिफाइनर्स',
      facilityNameMr: 'एपेक्स बॅटरी आणि टेलिकॉम रिफायनर्स',
      locationAddress: 'Shed 8, Bhosari MIDC',
      locationAddressHi: 'शेड ८, भोसरी एमआयडीसी',
      locationAddressMr: 'शेड ८, भोसरी एमआयडीसी',
      city: 'Pune',
      contactPhone: '+91 98810 54321',
      contactEmail: 'info@apexrefiners.in',
      status: 'ACTIVE',
      acceptedCategoryCodes: ['BATTERY_PACK', 'TELECOM_CARDS', 'SMARTPHONE', 'HDD_STORAGE'],
      distanceKm: 7.2,
      operatingHours: '10:00 AM – 07:00 PM',
      verifiedBadge: true,
    },
  ];

  private transactions: HandoverTransactionDto[] = [
    {
      id: 'TXN-2026-001',
      lotId: 'LOT-2026-0818',
      collectorId: 'col-service-area',
      recyclerId: 'rec-pune-01',
      recyclerFacilityName: 'EcoRecycle Green Hub',
      materialCategoryCode: 'PCB_MOTHERBOARD',
      materialTitleEnglish: 'Motherboard PCB',
      materialTitleHindi: 'सर्किट बोर्ड',
      materialTitleMarathi: 'मदरबोर्ड पीसीबी',
      declaredWeightKg: 2.1,
      estimatedTotal: 620,
      agreedPricePerKg: 295,
      status: 'INITIATED',
      handoverNotes: 'Scheduled yard delivery tomorrow 10 AM, clean dismantled units',
      createdAt: '2026-09-24T11:00:00Z',
    },
    {
      id: 'TXN-2026-002',
      lotId: 'LOT-2026-0871',
      collectorId: 'col-service-area',
      recyclerId: 'rec-pune-03',
      recyclerFacilityName: 'Apex Battery & Telecom Refiners',
      materialCategoryCode: 'TELECOM_CARDS',
      materialTitleEnglish: 'Mixed Telecom Cards',
      materialTitleHindi: 'टेलीकॉम कार्ड',
      materialTitleMarathi: 'मिश्र टेलिकॉम कार्ड्स',
      declaredWeightKg: 3.0,
      receivedWeightKg: 3.0,
      agreedPricePerKg: 280,
      estimatedTotal: 840,
      totalAmount: 840,
      qualityGrade: 'ACCEPTED',
      status: 'COMPLETED',
      paymentMethod: 'CASH',
      handoverNotes: 'Audited telecom line cards',
      createdAt: '2026-09-22T14:00:00Z',
      completedAt: '2026-09-22T14:30:00Z',
    },
  ];

  async getRecyclers(categoryCode?: string, city?: string): Promise<RecyclerDto[]> {
    let list = [...this.sampleRecyclers];
    if (categoryCode) {
      list = list.filter((r) => r.acceptedCategoryCodes.includes(categoryCode));
    }
    if (city) {
      list = list.filter((r) => r.city.toLowerCase() === city.toLowerCase());
    }
    return list;
  }

  async getRecyclerById(id: string): Promise<RecyclerDto | null> {
    const found = this.sampleRecyclers.find((r) => r.id === id);
    return found ? { ...found } : null;
  }

  async initiateHandover(params: InitiateHandoverParams): Promise<HandoverTransactionDto> {
    const recycler = this.sampleRecyclers.find((r) => r.id === params.recyclerId);
    const lot = this.sampleLots.find((l) => l.id === params.lotId);

    const declaredWeight = lot?.declaredWeightKg ?? 2.1;
    const estPrice = lot?.estimatedPrice ?? 620;
    const pricePerKg = declaredWeight > 0 ? Math.round(estPrice / declaredWeight) : 295;

    const txn: HandoverTransactionDto = {
      id: `TXN-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      lotId: params.lotId,
      collectorId: 'col-service-area',
      recyclerId: params.recyclerId,
      recyclerFacilityName: recycler?.facilityName || 'EcoRecycle Green Hub',
      materialCategoryCode: lot?.categoryCode || 'PCB_MOTHERBOARD',
      materialTitleEnglish: lot?.titleEnglish || 'Motherboard PCB',
      materialTitleHindi: lot?.titleHindi || 'सर्किट बोर्ड',
      materialTitleMarathi: lot?.titleMarathi || 'मदरबोर्ड पीसीबी',
      declaredWeightKg: declaredWeight,
      estimatedTotal: estPrice,
      agreedPricePerKg: pricePerKg,
      status: 'INITIATED',
      handoverNotes: params.notes || '',
      createdAt: new Date().toISOString(),
    };
    this.transactions.unshift(txn);

    if (lot) {
      lot.status = 'waitingForRecycler';
    }

    return { ...txn };
  }

  async getHandoverTransactions(): Promise<HandoverTransactionDto[]> {
    return [...this.transactions];
  }

  async getRecyclerPendingTransactions(): Promise<HandoverTransactionDto[]> {
    return this.transactions.filter((t) => t.status === 'INITIATED' || t.status === 'ACCEPTED');
  }

  async getTransactionById(id: string): Promise<HandoverTransactionDto | null> {
    const txn = this.transactions.find((t) => t.id === id);
    if (txn) return { ...txn };
    if (this.transactions.length > 0) {
      return { ...this.transactions[0], id };
    }
    return null;
  }

  async acceptHandover(params: AcceptHandoverParams): Promise<HandoverTransactionDto> {
    let txn = this.transactions.find((t) => t.id === params.transactionId);
    if (!txn) {
      txn = this.transactions[0];
    }
    txn.status = 'ACCEPTED';
    if (params.notes && params.notes.trim()) {
      txn.handoverNotes = txn.handoverNotes ? `${txn.handoverNotes} | ${params.notes.trim()}` : params.notes.trim();
    }
    return { ...txn };
  }

  async collectHandover(params: CollectHandoverParams): Promise<HandoverTransactionDto> {
    let txn = this.transactions.find((t) => t.id === params.transactionId);
    if (!txn) {
      txn = this.transactions[0];
    }
    const finalAmount = Math.round(params.confirmedWeightKg * params.confirmedPricePerKg);
    txn.receivedWeightKg = params.confirmedWeightKg;
    txn.agreedPricePerKg = params.confirmedPricePerKg;
    txn.totalAmount = finalAmount;
    txn.qualityGrade = params.qualityGrade || 'ACCEPTED';
    txn.status = 'COLLECTED';
    if (params.notes && params.notes.trim()) {
      txn.inspectionNotes = params.notes.trim();
    }
    return { ...txn };
  }

  async completeTransaction(params: CompleteTransactionParams): Promise<HandoverTransactionDto> {
    let txn = this.transactions.find((t) => t.id === params.transactionId);
    if (!txn) {
      txn = this.transactions[0];
    }
    txn.paymentMethod = params.paymentMethod;
    txn.status = 'COMPLETED';
    txn.completedAt = new Date().toISOString();
    if (params.notes && params.notes.trim()) {
      txn.handoverNotes = txn.handoverNotes
        ? `${txn.handoverNotes} | Payment [${params.paymentMethod}]: ${params.notes.trim()}`
        : `Payment [${params.paymentMethod}]: ${params.notes.trim()}`;
    }

    const lot = this.sampleLots.find((l) => l.id === txn!.lotId);
    if (lot) {
      lot.status = 'completed';
      lot.finalPayout = txn.totalAmount ?? txn.estimatedTotal;
      lot.receiptCode = `REC-2026-${txn.id.slice(-4)}`;
    }

    return { ...txn };
  }
}

export const collectionRepository: CollectionRepository = new MockCollectionRepository();
