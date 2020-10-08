import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { render, RenderResult } from '@testing-library/angular';

import { PostListComponent } from './post-list.component';

describe('PostListComponent', () => {
  let component: RenderResult<PostListComponent>;

  beforeEach(async () => {
    component = await render(PostListComponent, {
      imports: [MatCardModule, MatDividerModule],
      componentProperties: {
        posts: [{ title: 'title', id: 1, userId: 1, body: 'body' }],
        collections: [{ name: 'collection', posts: [], userId: 'userid', id: 'test-collection' }],
      },
    });
  });

  it('should match snapshot', () => {
    expect(component.container).toMatchSnapshot();
  });
});
