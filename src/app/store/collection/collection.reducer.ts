import { Collection } from '@app/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import {
  loadCollectionsFailure,
  loadCollections,
  loadCollectionsSuccess,
  createCollectionSuccess,
  createCollectionFailure,
  changeSelectedCollectionId,
  addPostToCollectionSuccess,
  addPostToCollectionFailure,
  deletePostFromCollection,
  deletePostFromCollectionSuccess,
  deletePostFromCollectionFailure,
} from './collection.action';

export const COLLECTION_FEATURE_KEY = 'collections';
export const adapter: EntityAdapter<Collection> = createEntityAdapter<Collection>();

export interface CollectionState extends EntityState<Collection> {
  error: string;
  loading: boolean;
  selectedCollectionId: string;
}

export const createInitialState = (): CollectionState =>
  adapter.getInitialState({
    loading: false,
    error: null,
    selectedCollectionId: null,
  });

const _collectionReducer = createReducer(
  createInitialState(),
  on(loadCollections, state => ({ ...state, loading: true })),
  on(loadCollectionsSuccess, (state, { collections }) =>
    adapter.setAll(collections, { ...state, loading: false, error: null }),
  ),
  on(loadCollectionsFailure, (state, { error }) => ({ ...state, error })),
  on(createCollectionSuccess, (state, { collection }) =>
    adapter.addOne(collection, { ...state, error: null }),
  ),
  on(createCollectionFailure, (state, { error }) => ({ ...state, error })),
  on(addPostToCollectionSuccess, (state, { collection: { id, ...rest } }) =>
    adapter.updateOne({ id, changes: rest }, { ...state, error: null }),
  ),
  on(addPostToCollectionFailure, (state, { error }) => ({ ...state, error })),
  on(deletePostFromCollectionSuccess, (state, { collection: { id, ...rest } }) =>
    adapter.updateOne({ id, changes: rest }, { ...state, error: null }),
  ),
  on(deletePostFromCollectionFailure, (state, { error }) => ({ ...state, error })),
  on(changeSelectedCollectionId, (state, { collectionId }) => ({
    ...state,
    selectedCollectionId: collectionId,
  })),
);

export function reducer(state: CollectionState | undefined, action: Action) {
  return _collectionReducer(state, action);
}
