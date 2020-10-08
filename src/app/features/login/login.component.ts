import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { LoginFormValue } from '@components/login-form';
import { select, Store } from '@ngrx/store';
import { fromAuth, State } from '@store/reducers';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

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
      .pipe(map(fromAuth.login), takeUntil(this.unsubscribe$))
      .subscribe(this.store.dispatch.bind(this.store));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  constructor(private readonly store: Store<State>) {}
}
