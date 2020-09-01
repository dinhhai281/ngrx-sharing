import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMapTo } from 'rxjs/operators';
import { PostService } from '@app/services';

import { fetchPosts, loadPosts } from './post.action';

@Injectable()
export class PostEffects {
  fetchPostsEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fetchPosts),
      mergeMapTo(this.postService.getAllPost()),
      map(posts => loadPosts({ posts })),
    ),
  );

  constructor(private action$: Actions, private postService: PostService) {}
}
