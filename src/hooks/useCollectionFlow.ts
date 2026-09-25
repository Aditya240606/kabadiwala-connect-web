import { useContext } from 'react';
import { CollectionFlowContext } from '../context/collectionFlowContextDefinition';

export const useCollectionFlow = () => {
  const context = useContext(CollectionFlowContext);
  if (!context) throw new Error('useCollectionFlow must be used within CollectionFlowProvider');
  return context;
};
