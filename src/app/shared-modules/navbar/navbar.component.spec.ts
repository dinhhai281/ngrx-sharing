import { OverlayModule } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { FakeMatIconRegistry } from '@angular/material/icon/testing';
import { User } from '@app/models';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { createInitialState } from '@store/auth';
import { State } from '@store/reducers';
import { render, RenderResult } from '@testing-library/angular';

import { PipesModule } from '../pipes/pipes.module';
import { UserAvatarPipe } from '../pipes/user-avatar.pipe';
import { NavbarComponent } from './navbar.component';
import { NavbarStore } from './navbar.store';

describe('NavbarComponent', () => {
  let component: RenderResult<NavbarComponent>;
  const testUser: User = { token: 'test', email: 'Test User' };
  const initialState: State = {
    auth: { ...createInitialState(), me: { token: 'test', email: 'Test User' } },
  };
  let store: MockStore<State>;
  let componentStore: NavbarStore;

  beforeEach(async () => {
    component = await render(NavbarComponent, {
      imports: [MatIconModule, OverlayModule, PipesModule, MatDialogModule],
      providers: [
        { provide: MatIconRegistry, useClass: FakeMatIconRegistry },
        NavbarStore,
        provideMockStore({ initialState }),
      ],
    });
    store = TestBed.inject(MockStore);
    componentStore = TestBed.inject(NavbarStore);
  });

  it('should match snapshot', () => {
    expect(component.container).toMatchSnapshot();
  });

  it('should render avatar with username', () => {
    const userAvatarPipe = new UserAvatarPipe();
    expect(component.getByTestId('avatar').textContent.trim()).toEqual(
      userAvatarPipe.transform(testUser).toUpperCase(),
    );
  });
});
