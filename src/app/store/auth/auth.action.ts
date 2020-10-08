import { User } from '@app/models';
import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '@@Auth/Login',
  props<{ email: string; password: string; isRegister: boolean }>(),
);
export const loginSuccess = createAction(
  '@@Auth/Login__SUCCESS',
  props<{ user: User; token: string }>(),
);
export const loginFailure = createAction('@@Auth/Login__FAILURE', props<{ error: string }>());

export const logout = createAction('@@Auth/Logout');
export const logoutSuccess = createAction('@@Auth/Logout Success');
export const logoutFailure = createAction('@@Auth/Logout Failure');
