import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { render, RenderResult } from '@testing-library/angular';

import { CollectionDialogComponent } from './collection-dialog.component';

describe('CollectionDialogComponent', () => {
  let component: RenderResult<CollectionDialogComponent>;

  beforeEach(async () => {
    component = await render(CollectionDialogComponent, {
      imports: [MatDialogModule, ReactiveFormsModule],
    });
  });

  it('should match snapshot', () => {
    expect(component.container).toMatchSnapshot();
  });
});
