import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Post } from '@app/models';
import { select, Store } from '@ngrx/store';
import { fromCollection, fromPost, State } from '@store/reducers';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailComponent implements OnInit, OnDestroy {
  post$: Observable<Post>;
  removePost$ = new Subject<number>();
  unsubcribe$ = new Subject<void>();

  @Input()
  set postId(value: number) {
    this.post$ = this.store.pipe(select(fromPost.selectPostById(value)));
  }

  removePostEffect$ = this.removePost$.pipe(
    withLatestFrom(this.store.pipe(select(fromCollection.selectSelectedCollection))),
    map(([postId, collection]) =>
      fromCollection.deletePostFromCollection({ postId, collectionId: collection.id }),
    ),
    tap(this.store.dispatch.bind(this.store)),
    takeUntil(this.unsubcribe$),
  );

  ngOnInit() {
    this.removePostEffect$.subscribe();
  }

  ngOnDestroy() {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
  }

  constructor(private store: Store<State>) {}
}
