import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { fromCollection, State } from '@app/store/reducers';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent {
  hasCollection$ = this.store.pipe(select(fromCollection.selectHasCollection));

  constructor(private store: Store<State>) {}
}
