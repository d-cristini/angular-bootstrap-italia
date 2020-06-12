import { Component, Input } from '@angular/core';

// Models
import { HeaderNavbarItemDropdown } from '../../../../models/header-navbar-item-dropdown';

@Component({
  selector: 'lib-dropdown',
  templateUrl: './header-navbar-dropdown.component.html',
  styleUrls: ['./header-navbar-dropdown.component.scss']
})
export class HeaderNavbarDropdownComponent {

  @Input() title: string;
  @Input() heading: string;
  @Input() items: HeaderNavbarItemDropdown[];

  constructor() { }
}
