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
import type { CollectionRepository, CreateLotParams } from './collectionRepositoryTypes';
import { getCategoryByCode } from '../data/categories';

export class MockCollectionRepository implements CollectionRepository {
  private profile: CollectorProfile = {
    fullName: 'Ramesh Kumar',
    phoneNumber: '+91 98765 43210',
    areaName: 'Service Area / सेवा क्षेत्र',
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

  private sampleRecyclers: RecyclerDto[] = [
    {
      id: 'b1c9dc74-72e0-439e-a8a2-0baa63f19022',
      facilityName: 'Green Earth E-Waste Recyclers',
      facilityNameHi: 'ग्रीन अर्थ ई-कचरा रिसाइक्लर्स',
      facilityNameMr: 'ग्रीन अर्थ ई-कचरा रिसायक्लर्स',
      locationAddress: 'Plot 42, Sector 8, Industrial Area',
      locationAddressHi: 'प्लॉट ४२, सेक्टर ८, औद्योगिक क्षेत्र',
      locationAddressMr: 'प्लॉट ४२, सेक्टर ८, औद्योगिक क्षेत्र',
      city: 'Mumbai',
      contactPhone: '+91 98201 12345',
      contactEmail: 'contact@greenearth.in',
      status: 'ACTIVE',
      acceptedCategoryCodes: ['PCB', 'BATTERY', 'MOTOR_MECHANICAL', 'STORAGE_DEVICE', 'CHARGER_ADAPTER', 'PHONE_SMALL_ELECTRONICS', 'ELECTRONIC_COMPONENTS', 'METAL_SCRAP', 'MIXED_EWASTE', 'PCB_MOTHERBOARD', 'SMARTPHONE', 'COPPER_WIRE'],
      distanceKm: 2.4,
      operatingHours: '09:00 AM – 06:00 PM',
      verifiedBadge: true,
    },
    {
      id: 'c2d0ed85-83f1-54af-b9b3-1cbb74f20133',
      facilityName: 'EcoShred Recycling Hub',
      facilityNameHi: 'इको-श्रेड रिसाइक्लिंग हब',
      facilityNameMr: 'इको-श्रेड रिसायकलिंग हब',
      locationAddress: 'Gala 14, MIDC Phase 2',
      locationAddressHi: 'गाला १४, एमआईडीसी फेज २',
      locationAddressMr: 'गाळा १४, एमआयडीसी टप्पा २',
      city: 'Navi Mumbai',
      contactPhone: '+91 98202 23456',
      contactEmail: 'info@ecoshred.org',
      status: 'ACTIVE',
      acceptedCategoryCodes: ['PCB', 'CABLE_WIRE', 'DISPLAY_SCREEN', 'PLASTIC_EWASTE', 'METAL_SCRAP', 'OTHER_EWASTE', 'PCB_MOTHERBOARD', 'COPPER_WIRE'],
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
      collectorId: '11111111-1111-1111-1111-111111111111',
      recyclerId: 'b1c9dc74-72e0-439e-a8a2-0baa63f19022',
      recyclerFacilityName: 'Green Earth E-Waste Recyclers',
      materialCategoryCode: 'PCB_MOTHERBOARD',
      materialTitleEnglish: 'Motherboard PCB',
      materialTitleHindi: 'सर्किट बोर्ड',
      materialTitleMarathi: 'मदरबोर्ड पीसीबी',
      declaredWeightKg: 2.1,
      receivedWeightKg: 2.0,
      agreedPricePerKg: 295,
      estimatedTotal: 620,
      totalAmount: 590,
      qualityGrade: 'ACCEPTED',
      status: 'INITIATED',
      handoverNotes: 'Clean dismantled PCB, minor connector oxidation',
      createdAt: '2026-09-24T10:00:00',
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

  injectLot(lot: CollectionLot): void {
    const existingIdx = this.sampleLots.findIndex(l => l.id === lot.id);
    if (existingIdx >= 0) {
      this.sampleLots[existingIdx] = lot;
    } else {
      this.sampleLots.unshift(lot);
    }
  }

  injectTransaction(tx: HandoverTransactionDto): void {
    const existingIdx = this.transactions.findIndex(t => t.id === tx.id);
    if (existingIdx >= 0) {
      this.transactions[existingIdx] = tx;
    } else {
      this.transactions.unshift(tx);
    }
  }

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

  async getRecyclers(categoryCode?: string, _city?: string): Promise<RecyclerDto[]> {
    if (!categoryCode) return [...this.sampleRecyclers];
    return this.sampleRecyclers.filter((r) =>
      r.acceptedCategoryCodes.some(c => c.toUpperCase() === categoryCode.toUpperCase())
    );
  }

  async getRecyclerById(id: string): Promise<RecyclerDto | null> {
    const recycler = this.sampleRecyclers.find((r) => r.id === id);
    return recycler ? { ...recycler } : this.sampleRecyclers[0] || null;
  }

  async createLot(params: CreateLotParams): Promise<{ id: string; status: string; estimatedPrice?: number }> {
    const id = `LOT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    const cat = params.categoryCode ? getCategoryByCode(params.categoryCode) : null;
    const weight = params.weightKg || 2.1;
    const pricePerKg = cat?.pricePerKgLow || 250;
    const estimatedPrice = Math.round(weight * pricePerKg);

    const newLot: CollectionLot = {
      id,
      categoryCode: params.categoryCode || 'PCB_MOTHERBOARD',
      titleEnglish: cat?.displayName || 'Motherboard PCB',
      titleHindi: cat?.displayNameHi || 'सर्किट बोर्ड',
      titleMarathi: cat?.displayNameMr || 'मदरबोर्ड पीसीबी',
      declaredWeightKg: weight,
      weightDetails: `${weight} kg • Collector Declared`,
      itemDetails: 'Status: Ready for Recycler Handover',
      estimatedPrice,
      status: 'ready',
      createdAt: new Date().toISOString(),
      formattedDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      locationName: 'Service Area / सेवा क्षेत्र',
      hasPhoto: true,
      gradeDescription: 'Grade A • Clean Dismantled',
      categoryIcon: 'motherboard',
    };
    this.sampleLots.unshift(newLot);
    return { id, status: 'READY_FOR_HANDOVER', estimatedPrice };
  }

  async initiateHandover(params: InitiateHandoverParams): Promise<HandoverTransactionDto> {
    const recycler = await this.getRecyclerById(params.recyclerId);
    const lot = await this.getLotById(params.lotId);

    const newTxn: HandoverTransactionDto = {
      id: `TXN-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      lotId: params.lotId,
      collectorId: '11111111-1111-1111-1111-111111111111',
      recyclerId: params.recyclerId,
      recyclerFacilityName: recycler?.facilityName || 'Green Earth E-Waste Recyclers',
      materialCategoryCode: lot?.categoryCode || 'PCB_MOTHERBOARD',
      materialTitleEnglish: lot?.titleEnglish || 'Motherboard PCB',
      materialTitleHindi: lot?.titleHindi || 'सर्किट बोर्ड',
      materialTitleMarathi: lot?.titleMarathi || 'मदरबोर्ड पीसीबी',
      declaredWeightKg: lot?.declaredWeightKg || 2.1,
      agreedPricePerKg: 295,
      estimatedTotal: lot?.estimatedPrice || 620,
      status: 'INITIATED',
      handoverNotes: params.notes,
      createdAt: new Date().toISOString(),
    };

    if (lot) {
      lot.status = 'matched';
    }

    this.transactions.unshift(newTxn);
    return { ...newTxn };
  }

  async getHandoverTransactions(): Promise<HandoverTransactionDto[]> {
    return [...this.transactions];
  }

  async getRecyclerPendingTransactions(): Promise<HandoverTransactionDto[]> {
    return this.transactions.filter(t => t.status === 'INITIATED' || t.status === 'ACCEPTED');
  }

  async getTransactionById(id: string): Promise<HandoverTransactionDto | null> {
    const txn = this.transactions.find((t) => t.id === id);
    if (txn) return { ...txn };
    return this.transactions[0] || null;
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
