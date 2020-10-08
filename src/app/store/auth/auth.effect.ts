import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, timer } from 'rxjs';
import { catchError, exhaustMap, map, take, tap } from 'rxjs/operators';

import { login, loginFailure, loginSuccess, logout, logoutSuccess } from './auth.action';

@Injectable()
export class AuthEffects {
  loginEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(login),
      exhaustMap(({ email, password, isRegister }) =>
        isRegister
          ? this.authService.register(email, password).pipe(
              map(response =>
                loginSuccess({ user: response.result, token: response.result.token }),
              ),
              catchError(err => of(loginFailure({ error: err.error.message }))),
            )
          : this.authService.login(email, password).pipe(
              map(response =>
                loginSuccess({ user: response.result, token: response.result.token }),
              ),
              catchError(err => of(loginFailure({ error: err.error.message }))),
            ),
      ),
    ),
  );

  loginSuccessEffect$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(loginSuccess),
        tap(() => this.router.navigate(['/posts'])),
      ),
    {
      dispatch: false,
    },
  );

  loginFailureEffect$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(loginFailure),
        tap(() => this.snackBar.open('Can not login', 'Dismiss', { duration: 1500 })),
      ),
    { dispatch: false },
  );

  logoutEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(logout),
      exhaustMap(() => timer(500).pipe(map(logoutSuccess), take(1))),
    ),
  );

  logoutSuccessEffect$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(logoutSuccess),
        tap(() => this.router.navigate(['/login'])),
      ),
    { dispatch: false },
  );

  constructor(
    private readonly action$: Actions,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
  ) {}
}
