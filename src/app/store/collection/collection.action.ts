import { Collection } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const loadCollections = createAction('@@Collections/Load Collections');
export const loadCollectionsSuccess = createAction(
  '@@Collections/Load Collections Success',
  props<{ collections: Collection[] }>(),
);
export const loadCollectionsFailure = createAction(
  '@@Collections/Load Collections Failure',
  props<{ error: string }>(),
);

export const createCollection = createAction(
  '@@Collection/Create Collection',
  props<{ collectionName: string; userId: string }>(),
);
export const createCollectionSuccess = createAction(
  '@@Collection/Create Collection Success',
  props<{ collection: Collection }>(),
);
export const createCollectionFailure = createAction(
  '@@Collection/Create Collection Failure',
  props<{ error: string }>(),
);

export const updateCollection = createAction(
  '@@Collection/Update Collection',
  props<{ postId: number; collectionId: string }>(),
);
export const updateCollectionSucces = createAction(
  '@@Collection/Update Collection Success',
  props<{ collection: Collection }>(),
);
export const updateCollectionFailure = createAction(
  '@@Collection/Update Collection Failure',
  props<{ error: string }>(),
);
