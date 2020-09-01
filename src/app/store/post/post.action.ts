import { createAction, props } from '@ngrx/store';
import { Post } from '@app/models';

export const fetchPosts = createAction('[Post] Fetch Posts');
export const selectPost = createAction('[Post] Select Post', props<{ id: number }>());

export const loadPosts = createAction('[Post] Load Posts', props<{ posts: Post[] }>());
