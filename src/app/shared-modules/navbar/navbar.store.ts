import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CollectionDialogComponent } from '@components/collection-dialog';
import { User } from '@app/models';
import { ComponentStore } from '@ngrx/component-store';
import { select, Store } from '@ngrx/store';
import { fromAuth, fromCollection, State } from '@store/reducers';
import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

export interface NavbarState {
  me: User;
  isOpenUserMenu: boolean;
}

@Injectable()
export class NavbarStore extends ComponentStore<NavbarState> {
  constructor(private store: Store<State>, private matDialog: MatDialog) {
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
  readonly toggleUserMenu = this.updater<void>(state => ({
    ...state,
    isOpenUserMenu: !state.isOpenUserMenu,
  }));

  readonly logout = this.effect(logoutEvent$ =>
    logoutEvent$.pipe(map(fromAuth.logout), tap(this.store.dispatch.bind(this.store))),
  );

  readonly addCollection = this.effect(addCollectionEvent$ =>
    addCollectionEvent$.pipe(
      withLatestFrom(this.me$),
      switchMap(([, me]) => {
        const dialog = this.matDialog.open(CollectionDialogComponent);
        return dialog.componentInstance.value$.pipe(
          tap(() => dialog.close()),
          map(collectionName =>
            fromCollection.createCollection({ collectionName, userId: me.token }),
          ),
        );
      }),
      tap(this.store.dispatch.bind(this.store)),
    ),
  );
}
