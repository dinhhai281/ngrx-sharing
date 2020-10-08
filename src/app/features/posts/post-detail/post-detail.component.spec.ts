import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { provideMockStore } from '@ngrx/store/testing';
import { fromCollection, fromPost, State } from '@store/reducers';
import { render, RenderResult } from '@testing-library/angular';
import { PostDetailComponent } from './post-detail.component';

describe('PostListComponent', () => {
  let component: RenderResult<PostDetailComponent>;
  let initialState: State = {
    collections: fromCollection.createInitialState(),
    posts: fromPost.createInitialState(),
  };

  beforeEach(async () => {
    component = await render(PostDetailComponent, {
      imports: [MatCardModule, MatDividerModule],
      componentProperties: {
        postId: 1,
      },
      providers: [provideMockStore({ initialState })],
    });
  });

  it('should match snapshot', () => {
    expect(component.container).toMatchSnapshot();
  });
});
