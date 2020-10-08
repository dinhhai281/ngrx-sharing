import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fromAuth, fromCollection, State } from '@app/store/reducers';
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
  collections$ = this.store.pipe(select(fromCollection.selectAllCollections));

  vm$ = combineLatest([this.posts$, this.collections$]).pipe(
    map(([posts, collections]) => ({ posts, collections })),
  );

  ngOnInit() {
    this.store.dispatch(fromPost.fetchPosts());
  }

  onSelectPost(postId: number) {
    this.store.dispatch(fromPost.selectPost({ id: postId }));
  }

  onAddToCollection({ postId, collectionId }: { postId: number; collectionId: string }) {
    this.store.dispatch(fromCollection.updateCollection({ postId, collectionId }));
  }

  constructor(private store: Store<State>) {}
}
