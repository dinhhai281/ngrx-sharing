import { createFeatureSelector, createSelector } from '@ngrx/store';

import { adapter, POST_FEATURE_KEY, PostEntityState } from './post.reducer';

const selectPostState = createFeatureSelector<PostEntityState>(POST_FEATURE_KEY);
const { selectIds, selectAll, selectEntities, selectTotal } = adapter.getSelectors();

export const selectPostIds = createSelector(selectPostState, selectIds);
export const selectPostEntities = createSelector(selectPostState, selectEntities);
export const selectPostTotal = createSelector(selectPostState, selectTotal);
export const selectAllPosts = createSelector(selectPostState, selectAll);
export const selectCurrentPostId = createSelector(selectPostState, state => state.selectedPostId);
export const selectCurrentPost = createSelector(
  selectPostEntities,
  selectCurrentPostId,
  (postEntities, postId) => postEntities[postId],
);
export const selectPostById = (id: number) =>
  createSelector(selectPostEntities, entities => entities[id]);
