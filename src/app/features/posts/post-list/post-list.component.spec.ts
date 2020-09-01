import { render, RenderResult } from '@testing-library/angular';

import { PostListComponent } from './post-list.component';

describe('PostListComponent', () => {
  let component: RenderResult<PostListComponent>;

  beforeEach(async () => {
    component = await render(PostListComponent, {
      componentProperties: {
        posts: [{ title: 'title', id: 1, userId: 1, body: 'body' }],
      },
    });
  });

  it('should match snapshot', () => {
    expect(component.container).toMatchSnapshot();
  });
});
