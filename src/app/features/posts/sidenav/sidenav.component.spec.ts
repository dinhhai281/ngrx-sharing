import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { provideMockStore } from '@ngrx/store/testing';
import { fromPost, State } from '@store/reducers';
import { render, RenderResult } from '@testing-library/angular';

import { PostDetailComponent } from '../post-detail/post-detail.component';
import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: RenderResult<SidenavComponent>;

  beforeEach(async () => {
    component = await render(SidenavComponent, {
      declarations: [PostDetailComponent],
      imports: [MatChipsModule, MatBadgeModule, MatDividerModule, MatCardModule],
      providers: [
        provideMockStore<State>({
          initialState: {
            posts: fromPost.createInitialState(),
          },
        }),
      ],
    });
  });

  it('should match snapshot', () => {
    expect(component.container).toMatchSnapshot();
  });
});
