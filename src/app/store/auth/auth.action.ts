import { User } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ email: string; password: string }>());
export const loginSuccess = createAction(
  '[Auth] Login__SUCCESS',
  props<{ user: User; token: string }>(),
);
export const loginFailure = createAction('[Auth] Login__FAILURE', props<{ error: string }>());
