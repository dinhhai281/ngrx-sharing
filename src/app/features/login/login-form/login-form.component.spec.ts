import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { render, RenderResult } from '@testing-library/angular';

import { LoginFormComponent } from './login-form.component';
import { LoginFormStore } from './login-form.store';

describe('LoginFormComponent', () => {
  let component: RenderResult<LoginFormComponent>;

  beforeEach(async () => {
    component = await render(LoginFormComponent, {
      imports: [ReactiveFormsModule],
      providers: [LoginFormStore],
    });
  });

  it('should match snapshot', () => {
    expect(component.container).toMatchSnapshot();
  });
});
