import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarModule } from '@app/shared-modules';

import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';

@NgModule({
  declarations: [PostsComponent, PostListComponent, PostDetailComponent],
  imports: [CommonModule, PostsRoutingModule, NavbarModule],
})
export class PostsModule {}
