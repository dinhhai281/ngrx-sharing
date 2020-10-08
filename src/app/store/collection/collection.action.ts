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

export const addPostToCollection = createAction(
  '@@Collection/Add Post To Collection',
  props<{ postId: number; collectionId: string }>(),
);
export const addPostToCollectionSuccess = createAction(
  '@@Collection/Add Post To Collection Success',
  props<{ collection: Collection }>(),
);
export const addPostToCollectionFailure = createAction(
  '@@Collection/Add Post To Collection Failure',
  props<{ error: string }>(),
);

export const deletePostFromCollection = createAction(
  '@@Collection/Delete Post From Collection',
  props<{ postId: number; collectionId: string }>(),
);
export const deletePostFromCollectionSuccess = createAction(
  '@@Collection/Delelte Post From Collection Success',
  props<{ collection: Collection }>(),
);
export const deletePostFromCollectionFailure = createAction(
  '@@Collection/Delete Post From Collection Failure',
  props<{ error: string }>(),
);

export const changeSelectedCollectionId = createAction(
  '@@Colleciton/Change Selected Collection ID',
  props<{ collectionId: string }>(),
);
