import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { fromAuth } from '@store/reducers';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { LoginFormValue } from './login-form/login-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading$ = this.store.pipe(select(fromAuth.selectLoading));
  doLogin$ = new Subject<LoginFormValue>();

  private unsubscribe$ = new Subject<void>();

  ngOnInit() {
    this.doLogin$
      .pipe(
        map(fromAuth.login),
        tap(this.store.dispatch.bind(this.store)),
        takeUntil(this.unsubscribe$),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  constructor(private readonly store: Store) {}
}
