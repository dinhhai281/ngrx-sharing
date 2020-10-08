import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { fromCollection, State } from '@store/reducers';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit {
  collections$ = this.store.pipe(select(fromCollection.selectAllCollections));
  selectedCollection$ = this.store.pipe(select(fromCollection.selectSelectedCollection));

  vm$ = combineLatest([this.collections$, this.selectedCollection$]).pipe(
    map(([collections, selectedCollection]) => ({ collections, selectedCollection })),
  );

  ngOnInit() {
    this.store.dispatch(fromCollection.loadCollections());
  }

  onSelectCollection(id: string) {
    this.store.dispatch(fromCollection.changeSelectedCollectionId({ collectionId: id }));
  }

  constructor(private readonly store: Store<State>) {}
}
