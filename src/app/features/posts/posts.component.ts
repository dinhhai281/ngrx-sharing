import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fromAuth, State } from '@app/store/reducers';
import { fromPost } from '@store/reducers';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent implements OnInit {
  posts$ = this.store.pipe(select(fromPost.selectAllPosts));
  selectedPost$ = this.store.pipe(select(fromPost.selectCurrentPost));
  me$ = this.store.pipe(select(fromAuth.selectMe));

  vm$ = combineLatest([this.posts$, this.selectedPost$]).pipe(
    map(([posts, selectedPost]) => ({ posts, selectedPost })),
  );

  ngOnInit() {
    this.store.dispatch(fromPost.fetchPosts());
  }

  onSelectPost = (postId: number) => {
    this.store.dispatch(fromPost.selectPost({ id: postId }));
  };

  constructor(private store: Store<State>) {}
}
