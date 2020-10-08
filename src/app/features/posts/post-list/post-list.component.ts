import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Collection, Post } from '@app/models';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnInit {
  @Input() posts: Post[];
  @Input() collections: Collection[];
  @Output('selectPost') select$ = new EventEmitter<number>();
  @Output('addToCollection') collectionClick$ = new EventEmitter<{
    postId: number;
    collectionId: string;
  }>();

  constructor() {}

  ngOnInit() {}
}
