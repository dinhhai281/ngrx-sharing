import { createAction, props } from '@ngrx/store';
import { Post } from '@app/models';

export const fetchPosts = createAction('@@Posts/Fetch Posts');
export const selectPost = createAction('@@Posts/Select Post', props<{ id: number }>());

export const loadPosts = createAction('@@Posts/Load Posts', props<{ posts: Post[] }>());
