import { render, RenderResult } from '@testing-library/angular';
import { PostDetailComponent } from './post-detail.component';

describe('PostListComponent', () => {
  let component: RenderResult<PostDetailComponent>;

  beforeEach(async () => {
    component = await render(PostDetailComponent, {
      componentProperties: {
        post: { id: 1, userId: 1, title: 'title', body: 'body' },
      },
    });
  });

  it('should match snapshot', () => {
    expect(component.container).toMatchSnapshot();
  });
});
