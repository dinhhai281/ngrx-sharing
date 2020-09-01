import { RouterTestingModule } from '@angular/router/testing';
import { render, RenderResult } from '@testing-library/angular';

import { MainComponent } from './main.component';

describe('MainComponent', () => {
  let component: RenderResult<MainComponent>;

  beforeEach(async () => {
    component = await render(MainComponent, {
      imports: [RouterTestingModule],
    });
  });

  it('should match snapshot', () => {
    expect(component.container).toMatchSnapshot();
  });
});
