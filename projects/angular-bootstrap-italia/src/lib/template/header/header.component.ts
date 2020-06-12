import { Component, Input, Output, EventEmitter } from '@angular/core';

// Models
import { HeaderNavbarItem } from '../../models/header-navbar-item';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent {
  @Input() owner: string;
  @Input() appName: string;
  @Input() isAuthenticated: boolean;
  @Input() menuItems: HeaderNavbarItem[];
  @Input() loginRoute: string;
  @Input() userName: string;

  @Output() logout = new EventEmitter();

  constructor() { }

  onLogout(event) {
    this.logout.emit(event);
  }

}
