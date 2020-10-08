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
  updateCollection,
  updateCollectionFailure,
  updateCollectionSucces,
} from './collection.action';
import { selectCollection } from './collection.selector';

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
      tap(console.log),
      mergeMap(({ collectionName, userId }) =>
        this.collectionService.createCollection(collectionName, userId).pipe(
          map(response => createCollectionSuccess({ collection: response.result })),
          catchError(err => {
            console.log(err);
            return of(createCollectionFailure({ error: err.error.message }));
          }),
        ),
      ),
    ),
  );

  updateCollectionEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateCollection),
      mergeMap(({ collectionId, postId }) =>
        this.store.pipe(
          select(selectCollection(collectionId)),
          take(1),
          switchMap(collection =>
            this.collectionService
              .updateCollection(collectionId, {
                ...collection,
                posts: uniq([...collection.posts, postId]),
              })
              .pipe(
                map(response => updateCollectionSucces({ collection: response.result })),
                catchError(err => of(updateCollectionFailure({ error: err.error.message }))),
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
