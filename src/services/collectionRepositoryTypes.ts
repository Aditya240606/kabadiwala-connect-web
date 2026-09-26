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

export interface CreateLotParams {
  categoryCode?: string;
  notes?: string;
  weightKg?: number;
  classificationMethod?: 'AI_CONFIRMED' | 'AI_CORRECTED' | 'MANUAL';
  predictedClass?: string;
  confidence?: number;
  modelName?: string;
}

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
  createLot(params: CreateLotParams): Promise<{ id: string; status: string; estimatedPrice?: number }>;
  updateAudioGuide(enabled: boolean): Promise<void>;
  updateLanguage(languageCode: 'en' | 'hi' | 'mr'): Promise<void>;
}
