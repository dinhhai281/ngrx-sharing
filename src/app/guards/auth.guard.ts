import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { select, Store } from '@ngrx/store';
import { fromAuth } from '@store/reducers';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.pipe(
      select(fromAuth.selectIsLoggedIn),
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['/login'], {
            queryParams: {
              redirect: route.url,
            },
          });
        }
      }),
    );
  }

  constructor(private readonly store: Store, private readonly router: Router) {}
}
