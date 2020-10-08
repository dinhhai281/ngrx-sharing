import { Collection } from '@app/models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import {
  loadCollectionsFailure,
  loadCollections,
  loadCollectionsSuccess,
  createCollectionSuccess,
  createCollectionFailure,
  updateCollection,
  updateCollectionSucces,
  updateCollectionFailure,
} from './collection.action';

export const COLLECTION_FEATURE_KEY = 'collections';
export const adapter: EntityAdapter<Collection> = createEntityAdapter<Collection>();

export interface CollectionState extends EntityState<Collection> {
  error: string;
  loading: boolean;
}

export const initialState: CollectionState = adapter.getInitialState({
  loading: false,
  error: null,
});

const _collectionReducer = createReducer(
  initialState,
  on(loadCollections, state => ({ ...state, loading: true })),
  on(loadCollectionsSuccess, (state, { collections }) =>
    adapter.setAll(collections, { ...state, loading: false, error: null }),
  ),
  on(loadCollectionsFailure, (state, { error }) => ({ ...state, error })),
  on(createCollectionSuccess, (state, { collection }) =>
    adapter.addOne(collection, { ...state, error: null }),
  ),
  on(createCollectionFailure, (state, { error }) => ({ ...state, error })),
  on(updateCollectionSucces, (state, { collection: { id, ...rest } }) =>
    adapter.updateOne({ id, changes: rest }, { ...state, error: null }),
  ),
  on(updateCollectionFailure, (state, { error }) => ({ ...state, error })),
);

export function reducer(state: CollectionState | undefined, action: Action) {
  return _collectionReducer(state, action);
}
