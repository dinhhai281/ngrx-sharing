import { createFeatureSelector, createSelector } from '@ngrx/store';
import { COLLECTION_FEATURE_KEY, adapter, CollectionState } from './collection.reducer';

const selectCollectionState = createFeatureSelector<CollectionState>(COLLECTION_FEATURE_KEY);
const { selectEntities, selectIds, selectAll } = adapter.getSelectors();

export const selectCollectionIds = createSelector(selectCollectionState, selectIds);
export const selectCollectionEntities = createSelector(selectCollectionState, selectEntities);
export const selectAllCollections = createSelector(selectCollectionState, selectAll);
export const selectCollectionById = (collectionId: string) =>
  createSelector(selectCollectionEntities, entities => entities[collectionId]);
export const selectHasCollection = createSelector(selectCollectionIds, ids => ids.length > 0);
export const selectSelectedCollection = createSelector(
  selectCollectionState,
  selectCollectionEntities,
  (state, entities) => entities[state.selectedCollectionId],
);
