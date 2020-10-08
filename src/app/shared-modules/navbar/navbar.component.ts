import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { NavbarStore } from './navbar.store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NavbarStore],
})
export class NavbarComponent {
  constructor(public readonly state: NavbarStore) {}

  onLogout() {
    this.state.logout();
  }

  onAddCollection() {
    this.state.addCollection();
  }

  onToggleUserMenu() {
    this.state.toggleUserMenu();
  }

  onOverlayOutsideClick(event: Event) {
    event.stopImmediatePropagation();
    this.state.toggleUserMenu();
  }
}
