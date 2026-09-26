export type {
  CollectionRepository,
  CreateLotParams,
} from './collectionRepositoryTypes';

export { MockCollectionRepository } from './mockCollectionRepository';
export { ApiCollectionRepository } from './apiCollectionRepository';

import type { CollectionRepository } from './collectionRepositoryTypes';
import { MockCollectionRepository } from './mockCollectionRepository';
import { ApiCollectionRepository } from './apiCollectionRepository';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

export const collectionRepository: CollectionRepository = USE_MOCK
  ? new MockCollectionRepository()
  : new ApiCollectionRepository();
