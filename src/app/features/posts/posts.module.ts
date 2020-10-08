import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CollectionDialogModule } from '@components/collection-dialog';
import { NavbarModule } from '@app/shared-modules';

import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  declarations: [PostsComponent, PostListComponent, PostDetailComponent, SidenavComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    NavbarModule,
    MatSidenavModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    MatChipsModule,
    MatBadgeModule,
    MatMenuModule,
    ReactiveFormsModule,
    CollectionDialogModule,
  ],
})
export class PostsModule {}
