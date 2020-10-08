import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { NavbarModule } from '@app/shared-modules';

import { CollectionDialogComponent } from './collection-dialog/collection-dialog.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [
    PostsComponent,
    PostListComponent,
    PostDetailComponent,
    CollectionDialogComponent,
    SidenavComponent,
  ],
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
  ],
})
export class PostsModule {}
