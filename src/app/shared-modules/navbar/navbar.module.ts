import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';

import { PipesModule } from '../pipes/pipes.module';
import { NavbarComponent } from './navbar.component';

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, MatBadgeModule, MatIconModule, OverlayModule, PipesModule],
  exports: [NavbarComponent],
})
export class NavbarModule {}
