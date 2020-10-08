import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { provideMockStore } from '@ngrx/store/testing';
import { State } from '@store/reducers';
import { render, RenderResult } from '@testing-library/angular';

import { PostListComponent } from './post-list.component';

describe('PostListComponent', () => {
  let component: RenderResult<PostListComponent>;

  beforeEach(async () => {
    component = await render(PostListComponent, {
      imports: [MatCardModule, MatDividerModule, MatMenuModule],
      providers: [
        provideMockStore<State>({
          initialState: {
            posts: {
              ids: [1],
              entities: {
                '1': {
                  id: 1,
                  body: 'test',
                  title: 'test',
                  userId: 1,
                },
              },
              selectedPostId: null,
            },
            collections: {
              ids: ['1'],
              entities: {
                '1': {
                  id: '1',
                  name: 'test',
                  posts: [1],
                  userId: '1',
                },
              },
              selectedCollectionId: null,
              error: null,
              loading: false,
            },
          },
        }),
      ],
    });
  });

  it('should match snapshot', () => {
    expect(component.container).toMatchSnapshot();
  });
});
