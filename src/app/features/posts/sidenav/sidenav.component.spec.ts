import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { render, RenderResult } from '@testing-library/angular';

import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: RenderResult<SidenavComponent>;

  beforeEach(async () => {
    component = await render(SidenavComponent, {
      imports: [MatChipsModule, MatBadgeModule, MatDividerModule],
    });
  });

  it('should match snapshot', () => {
    expect(component.container).toMatchSnapshot();
  });
});
