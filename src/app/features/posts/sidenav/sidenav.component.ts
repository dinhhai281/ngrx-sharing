import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { fromCollection, State } from '@store/reducers';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit {
  collections$ = this.store.pipe(select(fromCollection.selectAllCollections));

  ngOnInit() {
    this.store.dispatch(fromCollection.loadCollections());
    this.collections$.subscribe(console.log);
  }

  constructor(private readonly store: Store<State>) {}
}
