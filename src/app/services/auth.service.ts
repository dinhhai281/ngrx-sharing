import { Injectable } from '@angular/core';
import { User } from '@app/models';
import { of, throwError, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginWithLocal(username: string, password: string) {
    return timer(Math.random() * 1000 + 1000).pipe(
      switchMap(() => {
        if (username === 'dinhhai281@gmail.com' && password === '123456789') {
          return of<{ user: User; token: string }>({
            user: {
              id: 1,
              name: 'Hai Dinh Nguyen',
            },
            token: 'f4k3t0k311',
          });
        }
        return throwError('Unauthenticated');
      }),
    );
  }
}
