import { Injectable } from '@angular/core';
import { CollectionService } from '@app/services/collection.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { selectToken } from '@store/auth';
import { State } from '@store/reducers';
import { uniq } from 'ramda';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, take, tap, withLatestFrom } from 'rxjs/operators';

import {
  createCollection,
  createCollectionFailure,
  createCollectionSuccess,
  loadCollections,
  loadCollectionsFailure,
  loadCollectionsSuccess,
  addPostToCollection,
  addPostToCollectionSuccess,
  addPostToCollectionFailure,
  deletePostFromCollection,
  deletePostFromCollectionSuccess,
  deletePostFromCollectionFailure,
} from './collection.action';
import { selectCollectionById } from './collection.selector';

@Injectable()
export class CollectionEffects {
  loadCollectionsEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(loadCollections),
      withLatestFrom(this.store.pipe(select(selectToken))),
      switchMap(([, token]) =>
        this.collectionService.getCollections(token).pipe(
          map(response => loadCollectionsSuccess({ collections: response.result })),
          catchError(err => of(loadCollectionsFailure({ error: err.error.message }))),
        ),
      ),
    ),
  );

  createCollectionEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(createCollection),
      mergeMap(({ collectionName, userId }) =>
        this.collectionService.createCollection(collectionName, userId).pipe(
          map(response => createCollectionSuccess({ collection: response.result })),
          catchError(err => {
            return of(createCollectionFailure({ error: err.error.message }));
          }),
        ),
      ),
    ),
  );

  updateCollectionEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(addPostToCollection),
      mergeMap(({ collectionId, postId }) =>
        this.store.pipe(
          select(selectCollectionById(collectionId)),
          take(1),
          switchMap(collection =>
            this.collectionService
              .updateCollection(collectionId, {
                ...collection,
                posts: uniq([...collection.posts, postId]),
              })
              .pipe(
                map(response => addPostToCollectionSuccess({ collection: response.result })),
                catchError(err => of(addPostToCollectionFailure({ error: err.error.message }))),
              ),
          ),
        ),
      ),
    ),
  );

  deletePostFromCollectionEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(deletePostFromCollection),
      mergeMap(({ postId, collectionId }) =>
        this.store.pipe(
          select(selectCollectionById(collectionId)),
          take(1),
          switchMap(collection =>
            this.collectionService
              .updateCollection(collectionId, {
                ...collection,
                posts: collection.posts.filter(post => post !== postId),
              })
              .pipe(
                map(response => deletePostFromCollectionSuccess({ collection: response.result })),
                catchError(err => of(deletePostFromCollectionFailure({ error: err.error }))),
              ),
          ),
        ),
      ),
    ),
  );

  constructor(
    private readonly action$: Actions,
    private readonly collectionService: CollectionService,
    private readonly store: Store<State>,
  ) {}
}
