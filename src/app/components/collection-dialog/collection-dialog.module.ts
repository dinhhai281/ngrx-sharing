import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { CollectionDialogComponent } from './collection-dialog.component';

@NgModule({
  declarations: [CollectionDialogComponent],
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule],
  exports: [CollectionDialogComponent],
})
export class CollectionDialogModule {}
