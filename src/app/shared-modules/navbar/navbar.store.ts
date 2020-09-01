import { Injectable } from '@angular/core';
import { User } from '@app/models';
import { ComponentStore } from '@ngrx/component-store';
import { select, Store } from '@ngrx/store';
import { fromAuth, State } from '@store/reducers';

export interface NavbarState {
  me: User;
  isOpenUserMenu: boolean;
}

@Injectable()
export class NavbarStore extends ComponentStore<NavbarState> {
  constructor(private store: Store<State>) {
    super({ me: null, isOpenUserMenu: false });
  }

  readonly me$ = this.store.pipe(select(fromAuth.selectMe));
  readonly isOpenUserMenu$ = this.select(state => state.isOpenUserMenu);
  readonly vm$ = this.select(this.me$, this.isOpenUserMenu$, (me, isOpenUserMenu) => ({
    me,
    isOpenUserMenu,
  }));

  readonly setMe = this.updater<User>((state, me) => ({
    ...state,
    me,
  }));
  readonly toggleUserMenu = this.updater<boolean>(state => ({
    ...state,
    isOpenUserMenu: !state.isOpenUserMenu,
  }));
}
