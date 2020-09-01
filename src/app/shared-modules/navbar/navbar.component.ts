import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

import { NavbarStore } from './navbar.store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NavbarStore],
})
export class NavbarComponent implements OnInit {
  ngOnInit() {}

  constructor(public readonly state: NavbarStore) {}
}
