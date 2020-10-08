import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectAllPosts } from '@store/post';
import { COLLECTION_FEATURE_KEY, adapter, CollectionState } from './collection.reducer';

const selectCollectionState = createFeatureSelector<CollectionState>(COLLECTION_FEATURE_KEY);
const { selectEntities, selectIds, selectAll } = adapter.getSelectors();

export const selectCollectionIds = createSelector(selectCollectionState, selectIds);
export const selectCollectionEntities = createSelector(selectCollectionState, selectEntities);
export const selectAllCollections = createSelector(selectCollectionState, selectAll);
export const selectCollection = (collectionId: string) =>
  createSelector(selectCollectionEntities, entities => entities[collectionId]);
