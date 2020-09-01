import * as fromPost from '@store/post';
import * as fromAuth from '@store/auth';

export interface State {
  [fromPost.POST_FEATURE_KEY]?: fromPost.PostEntityState;
  [fromAuth.AUTH_FEATURE_KEY]?: fromAuth.AuthState;
}

export { fromPost, fromAuth };
