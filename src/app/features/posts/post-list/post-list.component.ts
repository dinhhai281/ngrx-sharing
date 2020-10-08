import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { fromCollection, fromPost, State } from '@store/reducers';
import { not } from 'ramda';
import { combineLatest, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnInit {
  unsubscribe$ = new Subject<void>();
  posts$ = this.store.pipe(select(fromPost.selectAllPosts));
  collections$ = this.store.pipe(select(fromCollection.selectAllCollections));
  disableAdd$ = this.collections$.pipe(map(not));

  vm$ = combineLatest([this.posts$, this.collections$, this.disableAdd$]).pipe(
    map(([posts, collections, disableAdd]) => ({ posts, collections, disableAdd })),
  );

  constructor(private readonly store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(fromPost.fetchPosts());
  }

  onAddPostToCollection(postId: number, collectionId: string) {
    this.store.dispatch(fromCollection.addPostToCollection({ postId, collectionId }));
  }
}
