import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserAvatarPipe } from './user-avatar.pipe';

@NgModule({
  declarations: [UserAvatarPipe],
  imports: [CommonModule],
  exports: [UserAvatarPipe],
})
export class PipesModule {}
