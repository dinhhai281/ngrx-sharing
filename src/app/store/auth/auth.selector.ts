import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, AUTH_FEATURE_KEY } from './auth.reducer';

const selectAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectToken = createSelector(selectAuthState, state => state.token);
export const selectMe = createSelector(selectAuthState, state => state.me);
export const selectLoading = createSelector(selectAuthState, state => state.loading);
export const selectIsLoggedIn = createSelector(
  selectToken,
  selectLoading,
  (token, loading) => !!token && !loading,
);
