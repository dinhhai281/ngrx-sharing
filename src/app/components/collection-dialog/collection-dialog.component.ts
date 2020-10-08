import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@ngneat/reactive-forms';
import { Subject } from 'rxjs';
import { map, take, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-collection-dialog',
  templateUrl: './collection-dialog.component.html',
  styleUrls: ['./collection-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionDialogComponent {
  submit$ = new Subject<void>();
  form = this.fb.group<{ collectionName: string }>({
    collectionName: this.fb.control('', Validators.required),
  });

  constructor(private readonly fb: FormBuilder) {}

  get value$() {
    return this.submit$.pipe(
      withLatestFrom(this.form.value$),
      map(([, fromValue]) => fromValue.collectionName),
      take(1),
    );
  }
}
