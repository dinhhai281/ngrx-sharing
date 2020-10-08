import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl } from '@ngneat/reactive-forms';
import { Subject } from 'rxjs';
import { map, take, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-collection-dialog',
  templateUrl: './collection-dialog.component.html',
  styleUrls: ['./collection-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionDialogComponent implements OnInit {
  collectionName = new FormControl<string>('', Validators.required);
  submit$ = new Subject<void>();

  constructor() {}

  get value$() {
    return this.submit$.pipe(
      withLatestFrom(this.collectionName.value$),
      map(([, collectionName]) => collectionName),
      take(1),
    );
  }

  ngOnInit() {}
}
