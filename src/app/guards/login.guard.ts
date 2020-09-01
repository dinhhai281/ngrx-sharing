import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { fromAuth } from '@store/reducers';
import { not } from 'ramda';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select(fromAuth.selectIsLoggedIn),
      map(not),
      tap(isNotLoggedIn => {
        if (!isNotLoggedIn) {
          this.router.navigate(['/posts']);
        }
      }),
    );
  }

  constructor(private readonly store: Store, private readonly router: Router) {}
}
