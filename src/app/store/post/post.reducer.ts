import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Post } from '@app/models';
import { loadPosts, selectPost } from './post.action';

export const POST_FEATURE_KEY = 'posts';
export const adapter: EntityAdapter<Post> = createEntityAdapter<Post>();

export interface PostEntityState extends EntityState<Post> {
  selectedPostId: number | null;
}

export const initialState: PostEntityState = adapter.getInitialState({
  selectedPostId: null,
});

const _postReducer = createReducer(
  initialState,
  on(selectPost, (state, { id }) => ({ ...state, selectedPostId: id })),
  on(loadPosts, (state, { posts }) => adapter.addMany(posts, { ...state, selectedPostId: null })),
);

export function reducer(state: PostEntityState | undefined, action: Action) {
  return _postReducer(state, action);
}
