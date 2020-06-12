import { Component, Input } from '@angular/core';

// Models
import { HeaderNavbarItem } from '../../../models/header-navbar-item';

@Component({
  selector: 'lib-header-navbar',
  templateUrl: './header-navbar.component.html',
  styleUrls: ['./header-navbar.component.scss']
})
export class HeaderNavbarComponent {

  @Input() menuItems: HeaderNavbarItem[];

  constructor() { }

}
