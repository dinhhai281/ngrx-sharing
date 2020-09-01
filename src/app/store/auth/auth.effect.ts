import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { login, loginFailure, loginSuccess } from './auth.action';

@Injectable()
export class AuthEffects {
  loginEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(login),
      exhaustMap(({ email, password }) =>
        this.authService.loginWithLocal(email, password).pipe(
          map(response => loginSuccess({ user: response.user, token: response.token })),
          catchError(err => of(loginFailure({ error: err }))),
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

  constructor(
    private readonly action$: Actions,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}
}
