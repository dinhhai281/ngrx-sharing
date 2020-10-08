import * as fromPost from '@store/post';
import * as fromAuth from '@store/auth';
import * as fromCollection from '@store/collection';

export interface State {
  [fromPost.POST_FEATURE_KEY]?: fromPost.PostEntityState;
  [fromAuth.AUTH_FEATURE_KEY]?: fromAuth.AuthState;
  [fromCollection.COLLECTION_FEATURE_KEY]?: fromCollection.CollectionState;
}

export { fromPost, fromAuth, fromCollection };
