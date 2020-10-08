import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormControl, NgValidatorsErrors } from '@ngneat/reactive-forms';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, startWith, tap, withLatestFrom } from 'rxjs/operators';

import { LoginFormStore } from './login-form.store';

export interface LoginFormValue {
  email: string;
  password: string;
  isRegister: boolean;
}

type NgError = Observable<Partial<NgValidatorsErrors>>;

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [LoginFormStore],
})
export class LoginFormComponent implements OnInit {
  @Input()
  set loading(value: boolean) {
    this.state.setLoading(value);
  }

  form = this.fb.group<LoginFormValue, NgValidatorsErrors>({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required]),
    isRegister: this.fb.control(false),
  });

  vm$ = combineLatest([
    this.form.value$.pipe(map(value => value.isRegister)),
    this.getControlErrors('email'),
    this.getControlErrors('password'),
    this.state.vm$,
  ]).pipe(
    map(([isRegister, emailError, passwordError, { loading, buttonColorClass }]) => ({
      emailError,
      passwordError,
      loading,
      buttonColorClass,
      isRegister,
    })),
  );

  submit$ = new Subject<void>();
  @Output() submitForm = this.submit$.pipe(
    tap(this.form.markAllAsTouched.bind(this.form)),
    withLatestFrom(this.form.value$, this.form.status$),
    filter(([, , status]) => status !== 'INVALID'),
    map(([, value]) => value),
  );

  getControlErrors(controlName: keyof LoginFormValue): NgError {
    const control = this.form.getControl(controlName) as FormControl<unknown>;
    return combineLatest([control.errors$ as NgError, control.touch$]).pipe(
      map(([errors, isTouch]) => (isTouch ? errors ?? {} : {})),
      startWith({}),
    );
  }

  ngOnInit() {}

  constructor(private readonly fb: FormBuilder, private readonly state: LoginFormStore) {}
}
