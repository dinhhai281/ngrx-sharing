import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface LoginFormState {
  loading: boolean;
}

@Injectable()
export class LoginFormStore extends ComponentStore<LoginFormState> {
  constructor() {
    super({ loading: false });
  }

  readonly loading$ = this.select(state => state.loading);
  readonly buttonColorClass$ = this.select(this.loading$, isLoading => ({
    'bg-indigo-400 hover:bg-indigo-500 text-gray-200': !isLoading,
    'bg-gray-300 text-gray-600': isLoading,
  }));

  readonly setLoading = this.updater<boolean>((_, isLoading) => ({
    loading: isLoading,
  }));

  readonly vm$ = this.select(
    this.loading$,
    this.buttonColorClass$,
    (loading, buttonColorClass) => ({
      loading,
      buttonColorClass,
    }),
  );
}
