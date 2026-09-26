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
import type {
  CollectionRepository,
  CreateLotParams,
  PricingRateDto,
} from './collectionRepositoryTypes';
import { MockCollectionRepository } from './mockCollectionRepository';
import { getCategoryByCode } from '../data/categories';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080').replace(/\/$/, '');
const FORCE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isUuid(str: string): boolean {
  return UUID_REGEX.test(str);
}

function toBackendCategory(code?: string): string {
  if (!code) return 'PCB';
  const map: Record<string, string> = {
    SMARTPHONE: 'PHONE_SMALL_ELECTRONICS',
    PCB_MOTHERBOARD: 'PCB',
    LOW_GRADE_PCB: 'PCB',
    TELECOM_CARDS: 'PCB',
    COPPER_WIRE: 'CABLE_WIRE',
    BATTERY_PACK: 'BATTERY',
    HDD_STORAGE: 'STORAGE_DEVICE',
    CRT_MONITOR: 'DISPLAY_SCREEN',
    PRINTER_COPIER: 'PLASTIC_EWASTE',
    LED_LAMP: 'OTHER_EWASTE',
    COMPRESSOR: 'MOTOR_MECHANICAL',
    WEARABLE: 'PHONE_SMALL_ELECTRONICS',
    FAN_MOTOR: 'MOTOR_MECHANICAL',
    MIXED_EWASTE: 'MIXED_EWASTE',
  };
  return map[code] || code;
}

export class ApiCollectionRepository implements CollectionRepository {
  private mockRepo = new MockCollectionRepository();

  async getCollectionSummary(): Promise<CollectionSummary> {
    return this.mockRepo.getCollectionSummary();
  }

  async getCollectorProfile(): Promise<CollectorProfile> {
    return this.mockRepo.getCollectorProfile();
  }

  async updateAudioGuide(enabled: boolean): Promise<void> {
    return this.mockRepo.updateAudioGuide(enabled);
  }

  async updateLanguage(languageCode: 'en' | 'hi' | 'mr'): Promise<void> {
    return this.mockRepo.updateLanguage(languageCode);
  }

  async createLot(params: CreateLotParams): Promise<{ id: string; status: string; estimatedPrice?: number }> {
    if (FORCE_MOCK) {
      return this.mockRepo.createLot(params);
    }

    try {
      const categoryCode = toBackendCategory(params.categoryCode);
      const notes = params.notes || 'Created via Kabadiwala Connect web application';

      // 1. Create Lot
      const createRes = await fetch(`${API_BASE_URL}/api/v1/lots`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Demo-Role': 'COLLECTOR',
        },
        body: JSON.stringify({
          initialCategoryCode: categoryCode,
          notes,
        }),
      });

      if (!createRes.ok) {
        throw new Error(`Failed to create lot: ${createRes.status}`);
      }

      const createJson = await createRes.json();
      const lotId = createJson.data?.id;
      if (!lotId) throw new Error('No lot ID returned');

      // 2. Confirm classification
      await fetch(`${API_BASE_URL}/api/v1/lots/${lotId}/confirm-classification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Demo-Role': 'COLLECTOR',
        },
        body: JSON.stringify({
          confirmedCategoryCode: categoryCode,
          predictedClass: params.predictedClass || categoryCode,
          confidence: params.confidence ?? 0.94,
          modelName: params.modelName || 'ShuffleNetV2-x1.0-onnx',
          modelVersion: 'v1.0',
          notes: 'Worker confirmed via mobile/web UI',
        }),
      });

      // 3. Record weight if provided
      let estimatedPrice = 0;
      if (params.weightKg && params.weightKg > 0) {
        const weightRes = await fetch(`${API_BASE_URL}/api/v1/lots/${lotId}/weight`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Demo-Role': 'COLLECTOR',
          },
          body: JSON.stringify({
            weightKg: params.weightKg,
          }),
        });
        if (weightRes.ok) {
          const weightJson = await weightRes.json();
          estimatedPrice = Number(weightJson.data?.estimatedPrice || 0);
        }
      }

      // 4. Mark ready for handover
      await fetch(`${API_BASE_URL}/api/v1/lots/${lotId}/ready-for-handover`, {
        method: 'POST',
        headers: {
          'X-Demo-Role': 'COLLECTOR',
        },
      });

      // Synchronize into local fallback cache
      const cat = params.categoryCode ? getCategoryByCode(params.categoryCode) : null;
      const lotRecord: CollectionLot = {
        id: lotId,
        categoryCode: params.categoryCode || 'PCB_MOTHERBOARD',
        titleEnglish: cat?.displayName || 'Motherboard PCB',
        titleHindi: cat?.displayNameHi || 'सर्किट बोर्ड',
        titleMarathi: cat?.displayNameMr || 'मदरबोर्ड पीसीबी',
        declaredWeightKg: params.weightKg || 2.1,
        weightDetails: `${params.weightKg || 2.1} kg • Collector Declared`,
        itemDetails: 'Status: Ready for Recycler Handover',
        estimatedPrice: estimatedPrice || Math.round((params.weightKg || 2.1) * (cat?.pricePerKgLow || 250)),
        status: 'ready',
        createdAt: new Date().toISOString(),
        formattedDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        locationName: 'Service Area / सेवा क्षेत्र',
        hasPhoto: true,
        gradeDescription: 'Grade A • Clean Dismantled',
        categoryIcon: 'motherboard',
      };
      this.mockRepo.injectLot(lotRecord);

      return {
        id: lotId,
        status: 'READY_FOR_HANDOVER',
        estimatedPrice: lotRecord.estimatedPrice,
      };
    } catch (err) {
      console.warn('[ApiCollectionRepository] Backend unavailable, falling back to mock:', err);
      return this.mockRepo.createLot(params);
    }
  }

  async getLots(status?: CollectionLotStatus): Promise<CollectionLot[]> {
    if (FORCE_MOCK) {
      return this.mockRepo.getLots(status);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/lots`, {
        headers: {
          'X-Demo-Role': 'COLLECTOR',
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch lots: ${res.status}`);
      }

      const json = await res.json();
      const content = json.data?.content || [];

      if (!Array.isArray(content) || content.length === 0) {
        return this.mockRepo.getLots(status);
      }

      const backendLots: CollectionLot[] = content.map((item: any) => {
        const cat = getCategoryByCode(item.confirmedCategoryCode) || getCategoryByCode('PCB_MOTHERBOARD');
        return {
          id: item.id,
          categoryCode: item.confirmedCategoryCode || 'PCB_MOTHERBOARD',
          titleEnglish: item.confirmedCategoryDisplayName || cat?.displayName || 'E-Waste Lot',
          titleHindi: cat?.displayNameHi || 'ई-कचरा लॉट',
          titleMarathi: cat?.displayNameMr || 'ई-कचरा लॉट',
          declaredWeightKg: Number(item.weightKg) || 0,
          weightDetails: `${item.weightKg || 0} kg • Verified`,
          itemDetails: `Status: ${item.status}`,
          estimatedPrice: Number(item.estimatedPrice) || 0,
          finalPayout: item.finalPrice ? Number(item.finalPrice) : undefined,
          status: item.status === 'COMPLETED' ? 'completed' : item.status === 'READY_FOR_HANDOVER' ? 'ready' : 'waitingForRecycler',
          createdAt: item.createdAt || new Date().toISOString(),
          formattedDate: new Date(item.createdAt || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
          locationName: 'Service Area',
          hasPhoto: !!item.imageUrl,
          imageUrl: item.imageUrl,
          categoryIcon: 'motherboard',
        };
      });

      // Merge backend lots with sample lots for comprehensive view
      const sampleLots = await this.mockRepo.getLots();
      const merged = [...backendLots];
      for (const s of sampleLots) {
        if (!merged.some(b => b.id === s.id)) {
          merged.push(s);
        }
      }

      if (!status) return merged;
      return merged.filter(l => l.status === status);
    } catch (err) {
      console.warn('[ApiCollectionRepository] getLots error, falling back:', err);
      return this.mockRepo.getLots(status);
    }
  }

  async getLotById(id: string): Promise<CollectionLot | null> {
    if (FORCE_MOCK || !isUuid(id)) {
      return this.mockRepo.getLotById(id);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/lots/${id}`, {
        headers: {
          'X-Demo-Role': 'COLLECTOR',
        },
      });

      if (!res.ok) {
        return this.mockRepo.getLotById(id);
      }

      const json = await res.json();
      const item = json.data;
      if (!item) return this.mockRepo.getLotById(id);

      const cat = getCategoryByCode(item.confirmedCategoryCode) || getCategoryByCode('PCB_MOTHERBOARD');
      return {
        id: item.id,
        categoryCode: item.confirmedCategoryCode || 'PCB_MOTHERBOARD',
        titleEnglish: item.confirmedCategoryDisplayName || cat?.displayName || 'Motherboard PCB',
        titleHindi: cat?.displayNameHi || 'सर्किट बोर्ड',
        titleMarathi: cat?.displayNameMr || 'मदरबोर्ड पीसीबी',
        declaredWeightKg: Number(item.weightKg) || 0,
        weightDetails: `${item.weightKg || 0} kg • Verified`,
        itemDetails: `Status: ${item.status}`,
        estimatedPrice: Number(item.estimatedPrice) || 0,
        finalPayout: item.finalPrice ? Number(item.finalPrice) : undefined,
        status: item.status === 'COMPLETED' ? 'completed' : item.status === 'READY_FOR_HANDOVER' ? 'ready' : 'waitingForRecycler',
        createdAt: item.createdAt || new Date().toISOString(),
        formattedDate: new Date(item.createdAt || Date.now()).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        locationName: 'Service Area',
        hasPhoto: !!item.imageUrl,
        imageUrl: item.imageUrl,
        categoryIcon: 'motherboard',
      };
    } catch {
      return this.mockRepo.getLotById(id);
    }
  }

  async getRecyclers(categoryCode?: string, city?: string): Promise<RecyclerDto[]> {
    if (FORCE_MOCK) {
      return this.mockRepo.getRecyclers(categoryCode, city);
    }

    try {
      const backendCat = toBackendCategory(categoryCode);
      const url = new URL(`${API_BASE_URL}/api/v1/recyclers/matching`);
      if (backendCat) url.searchParams.append('categoryCode', backendCat);
      if (city) url.searchParams.append('city', city);

      const res = await fetch(url.toString(), {
        headers: {
          'X-Demo-Role': 'COLLECTOR',
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch matching recyclers: ${res.status}`);
      }

      const json = await res.json();
      const list = json.data;

      if (!Array.isArray(list) || list.length === 0) {
        return this.mockRepo.getRecyclers(categoryCode, city);
      }

      const sampleRecyclers = await this.mockRepo.getRecyclers();

      return list.map((item: any, idx: number) => {
        const sampleMatch = sampleRecyclers.find(s => s.id === item.id || s.facilityName.toLowerCase().includes(item.facilityName?.toLowerCase() || ''));
        return {
          id: item.id,
          facilityName: item.facilityName,
          facilityNameHi: sampleMatch?.facilityNameHi || item.facilityName,
          facilityNameMr: sampleMatch?.facilityNameMr || item.facilityName,
          locationAddress: item.locationAddress || 'Industrial Area',
          locationAddressHi: sampleMatch?.locationAddressHi || item.locationAddress,
          locationAddressMr: sampleMatch?.locationAddressMr || item.locationAddress,
          city: item.city || 'Mumbai',
          contactPhone: item.contactPhone || '+91 98201 12345',
          contactEmail: item.contactEmail || 'contact@recycler.in',
          status: (item.status === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE') as 'ACTIVE' | 'INACTIVE',
          acceptedCategoryCodes: item.acceptedCategoryCodes || ['PCB', 'BATTERY'],
          distanceKm: sampleMatch?.distanceKm ?? Number((2.1 + idx * 1.8).toFixed(1)),
          operatingHours: sampleMatch?.operatingHours || '09:00 AM – 06:00 PM',
          verifiedBadge: true,
        };
      });
    } catch (err) {
      console.warn('[ApiCollectionRepository] getRecyclers error, falling back:', err);
      return this.mockRepo.getRecyclers(categoryCode, city);
    }
  }

  async getRecyclerById(id: string): Promise<RecyclerDto | null> {
    const list = await this.getRecyclers();
    const found = list.find(r => r.id === id);
    if (found) return found;
    return this.mockRepo.getRecyclerById(id);
  }

  async initiateHandover(params: InitiateHandoverParams): Promise<HandoverTransactionDto> {
    if (FORCE_MOCK || !isUuid(params.lotId) || !isUuid(params.recyclerId)) {
      return this.mockRepo.initiateHandover(params);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/transactions/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Demo-Role': 'COLLECTOR',
        },
        body: JSON.stringify({
          lotId: params.lotId,
          recyclerId: params.recyclerId,
          notes: params.notes || 'Initiated handover via web app',
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to initiate handover: ${res.status}`);
      }

      const json = await res.json();
      const tx = json.data;

      const recycler = await this.getRecyclerById(params.recyclerId);
      const lot = await this.getLotById(params.lotId);

      const mapped: HandoverTransactionDto = {
        id: tx.id,
        lotId: tx.lotId,
        collectorId: tx.collectorId,
        recyclerId: tx.recyclerId,
        recyclerFacilityName: recycler?.facilityName || 'Green Earth E-Waste Recyclers',
        materialCategoryCode: lot?.categoryCode || 'PCB_MOTHERBOARD',
        materialTitleEnglish: lot?.titleEnglish || 'Motherboard PCB',
        materialTitleHindi: lot?.titleHindi || 'सर्किट बोर्ड',
        materialTitleMarathi: lot?.titleMarathi || 'मदरबोर्ड पीसीबी',
        declaredWeightKg: Number(tx.agreedWeightKg) || lot?.declaredWeightKg || 2.1,
        agreedPricePerKg: Number(tx.agreedPricePerKg) || 180,
        estimatedTotal: Number(tx.totalAmount) || lot?.estimatedPrice || 378,
        status: 'INITIATED',
        handoverNotes: tx.handoverNotes || params.notes,
        createdAt: tx.createdAt || new Date().toISOString(),
      };

      this.mockRepo.injectTransaction(mapped);
      return mapped;
    } catch (err) {
      console.warn('[ApiCollectionRepository] initiateHandover error, falling back:', err);
      return this.mockRepo.initiateHandover(params);
    }
  }

  async getRecyclerPendingTransactions(): Promise<HandoverTransactionDto[]> {
    if (FORCE_MOCK) {
      return this.mockRepo.getRecyclerPendingTransactions();
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/transactions/recycler/pending`, {
        headers: {
          'X-Demo-Role': 'RECYCLER',
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch pending transactions: ${res.status}`);
      }

      const json = await res.json();
      const content = json.data?.content || [];

      if (!Array.isArray(content) || content.length === 0) {
        return this.mockRepo.getRecyclerPendingTransactions();
      }

      const mappedList: HandoverTransactionDto[] = [];
      for (const item of content) {
        const lot = await this.getLotById(item.lotId);
        const recycler = await this.getRecyclerById(item.recyclerId);
        mappedList.push({
          id: item.id,
          lotId: item.lotId,
          collectorId: item.collectorId,
          recyclerId: item.recyclerId,
          recyclerFacilityName: recycler?.facilityName || 'Green Earth E-Waste Recyclers',
          materialCategoryCode: lot?.categoryCode || 'PCB_MOTHERBOARD',
          materialTitleEnglish: lot?.titleEnglish || 'Motherboard PCB',
          materialTitleHindi: lot?.titleHindi || 'सर्किट बोर्ड',
          materialTitleMarathi: lot?.titleMarathi || 'मदरबोर्ड पीसीबी',
          declaredWeightKg: lot?.declaredWeightKg || Number(item.agreedWeightKg) || 2.1,
          receivedWeightKg: item.status === 'COLLECTED' || item.status === 'COMPLETED' ? Number(item.agreedWeightKg) : undefined,
          agreedPricePerKg: Number(item.agreedPricePerKg) || 180,
          estimatedTotal: Number(item.totalAmount) || 378,
          totalAmount: Number(item.totalAmount) || undefined,
          status: item.status,
          paymentMethod: item.paymentMethod,
          handoverNotes: item.handoverNotes,
          createdAt: item.createdAt,
          completedAt: item.completedAt,
        });
      }

      return mappedList;
    } catch (err) {
      console.warn('[ApiCollectionRepository] getRecyclerPendingTransactions error, falling back:', err);
      return this.mockRepo.getRecyclerPendingTransactions();
    }
  }

  async getHandoverTransactions(): Promise<HandoverTransactionDto[]> {
    if (FORCE_MOCK) {
      return this.mockRepo.getHandoverTransactions();
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/transactions`, {
        headers: {
          'X-Demo-Role': 'COLLECTOR',
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch transactions: ${res.status}`);
      }

      const json = await res.json();
      const content = json.data?.content || [];

      if (!Array.isArray(content) || content.length === 0) {
        return this.mockRepo.getHandoverTransactions();
      }

      const mappedList: HandoverTransactionDto[] = [];
      for (const item of content) {
        const lot = await this.getLotById(item.lotId);
        const recycler = await this.getRecyclerById(item.recyclerId);
        mappedList.push({
          id: item.id,
          lotId: item.lotId,
          collectorId: item.collectorId,
          recyclerId: item.recyclerId,
          recyclerFacilityName: recycler?.facilityName || 'Green Earth E-Waste Recyclers',
          materialCategoryCode: lot?.categoryCode || 'PCB_MOTHERBOARD',
          materialTitleEnglish: lot?.titleEnglish || 'Motherboard PCB',
          materialTitleHindi: lot?.titleHindi || 'सर्किट बोर्ड',
          materialTitleMarathi: lot?.titleMarathi || 'मदरबोर्ड पीसीबी',
          declaredWeightKg: lot?.declaredWeightKg || Number(item.agreedWeightKg) || 2.1,
          receivedWeightKg: item.status === 'COLLECTED' || item.status === 'COMPLETED' ? Number(item.agreedWeightKg) : undefined,
          agreedPricePerKg: Number(item.agreedPricePerKg) || 180,
          estimatedTotal: Number(item.totalAmount) || 378,
          totalAmount: Number(item.totalAmount) || undefined,
          status: item.status,
          paymentMethod: item.paymentMethod,
          handoverNotes: item.handoverNotes,
          createdAt: item.createdAt,
          completedAt: item.completedAt,
        });
      }

      const sampleTxns = await this.mockRepo.getHandoverTransactions();
      const merged = [...mappedList];
      for (const s of sampleTxns) {
        if (!merged.some(m => m.id === s.id)) {
          merged.push(s);
        }
      }

      return merged;
    } catch (err) {
      console.warn('[ApiCollectionRepository] getHandoverTransactions error, falling back:', err);
      return this.mockRepo.getHandoverTransactions();
    }
  }

  async getTransactionById(id: string): Promise<HandoverTransactionDto | null> {
    if (FORCE_MOCK || !isUuid(id)) {
      return this.mockRepo.getTransactionById(id);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/transactions/${id}`, {
        headers: {
          'X-Demo-Role': 'COLLECTOR',
        },
      });

      if (!res.ok) {
        return this.mockRepo.getTransactionById(id);
      }

      const json = await res.json();
      const item = json.data;
      if (!item) return this.mockRepo.getTransactionById(id);

      const lot = await this.getLotById(item.lotId);
      const recycler = await this.getRecyclerById(item.recyclerId);

      const mapped: HandoverTransactionDto = {
        id: item.id,
        lotId: item.lotId,
        collectorId: item.collectorId,
        recyclerId: item.recyclerId,
        recyclerFacilityName: recycler?.facilityName || 'Green Earth E-Waste Recyclers',
        materialCategoryCode: lot?.categoryCode || 'PCB_MOTHERBOARD',
        materialTitleEnglish: lot?.titleEnglish || 'Motherboard PCB',
        materialTitleHindi: lot?.titleHindi || 'सर्किट बोर्ड',
        materialTitleMarathi: lot?.titleMarathi || 'मदरबोर्ड पीसीबी',
        declaredWeightKg: lot?.declaredWeightKg || 2.1,
        receivedWeightKg: item.status === 'COLLECTED' || item.status === 'COMPLETED' ? Number(item.agreedWeightKg) : undefined,
        agreedPricePerKg: Number(item.agreedPricePerKg) || 180,
        estimatedTotal: lot?.estimatedPrice || (Number(item.agreedWeightKg) * Number(item.agreedPricePerKg)),
        totalAmount: Number(item.totalAmount) || undefined,
        status: item.status,
        paymentMethod: item.paymentMethod,
        handoverNotes: item.handoverNotes,
        createdAt: item.createdAt,
        completedAt: item.completedAt,
      };

      this.mockRepo.injectTransaction(mapped);
      return mapped;
    } catch {
      return this.mockRepo.getTransactionById(id);
    }
  }

  async acceptHandover(params: AcceptHandoverParams): Promise<HandoverTransactionDto> {
    if (FORCE_MOCK || !isUuid(params.transactionId)) {
      return this.mockRepo.acceptHandover(params);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/transactions/${params.transactionId}/accept`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Demo-Role': 'RECYCLER',
        },
        body: JSON.stringify({
          notes: params.notes || 'Accepted by recycler for weighing and settlement',
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to accept handover: ${res.status}`);
      }

      const tx = await this.getTransactionById(params.transactionId);
      if (tx) {
        tx.status = 'ACCEPTED';
        if (params.notes) {
          tx.handoverNotes = tx.handoverNotes ? `${tx.handoverNotes} | ${params.notes}` : params.notes;
        }
        this.mockRepo.injectTransaction(tx);
        return tx;
      }
      return this.mockRepo.acceptHandover(params);
    } catch (err) {
      console.warn('[ApiCollectionRepository] acceptHandover error, falling back:', err);
      return this.mockRepo.acceptHandover(params);
    }
  }

  async collectHandover(params: CollectHandoverParams): Promise<HandoverTransactionDto> {
    if (FORCE_MOCK || !isUuid(params.transactionId)) {
      return this.mockRepo.collectHandover(params);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/transactions/${params.transactionId}/collect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Demo-Role': 'RECYCLER',
        },
        body: JSON.stringify({
          confirmedWeightKg: params.confirmedWeightKg,
          confirmedPricePerKg: params.confirmedPricePerKg,
          notes: params.notes || 'Measured at receiving dock',
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to record collection: ${res.status}`);
      }

      const tx = await this.getTransactionById(params.transactionId);
      if (tx) {
        tx.status = 'COLLECTED';
        tx.receivedWeightKg = params.confirmedWeightKg;
        tx.agreedPricePerKg = params.confirmedPricePerKg;
        tx.totalAmount = Math.round(params.confirmedWeightKg * params.confirmedPricePerKg);
        tx.qualityGrade = params.qualityGrade || 'ACCEPTED';
        if (params.notes) tx.inspectionNotes = params.notes;
        this.mockRepo.injectTransaction(tx);
        return tx;
      }
      return this.mockRepo.collectHandover(params);
    } catch (err) {
      console.warn('[ApiCollectionRepository] collectHandover error, falling back:', err);
      return this.mockRepo.collectHandover(params);
    }
  }

  async completeTransaction(params: CompleteTransactionParams): Promise<HandoverTransactionDto> {
    if (FORCE_MOCK || !isUuid(params.transactionId)) {
      return this.mockRepo.completeTransaction(params);
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/transactions/${params.transactionId}/complete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Demo-Role': 'RECYCLER',
        },
        body: JSON.stringify({
          paymentMethod: params.paymentMethod,
          notes: params.notes || 'Paid and completed',
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to complete transaction: ${res.status}`);
      }

      const tx = await this.getTransactionById(params.transactionId);
      if (tx) {
        tx.status = 'COMPLETED';
        tx.paymentMethod = params.paymentMethod;
        tx.completedAt = new Date().toISOString();
        if (params.notes) {
          tx.handoverNotes = tx.handoverNotes ? `${tx.handoverNotes} | ${params.notes}` : params.notes;
        }
        this.mockRepo.injectTransaction(tx);
        return tx;
      }
      return this.mockRepo.completeTransaction(params);
    } catch (err) {
      console.warn('[ApiCollectionRepository] completeTransaction error, falling back:', err);
      return this.mockRepo.completeTransaction(params);
    }
  }

  async getPricingRates(): Promise<PricingRateDto[]> {
    if (FORCE_MOCK) {
      return this.mockRepo.getPricingRates();
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/pricing/rates`, {
        headers: {
          'X-Demo-Role': 'COLLECTOR',
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch pricing rates: ${res.status}`);
      }

      const json = await res.json();
      const list = json.data;

      if (!Array.isArray(list) || list.length === 0) {
        return this.mockRepo.getPricingRates();
      }

      return list.map((item: any) => ({
        id: item.id,
        categoryCode: item.categoryCode,
        pricePerKg: Number(item.pricePerKg) || 0,
        currency: item.currency || 'INR',
        effectiveFrom: item.effectiveFrom,
        active: item.active !== false,
      }));
    } catch (err) {
      console.warn('[ApiCollectionRepository] getPricingRates error, falling back to mock:', err);
      return this.mockRepo.getPricingRates();
    }
  }
}

