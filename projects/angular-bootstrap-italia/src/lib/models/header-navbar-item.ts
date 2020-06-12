import { HeaderNavbarItemTypeEnum } from './header-navbar-item-type-enum';
import { HeaderNavbarItemDropdown } from './header-navbar-item-dropdown';

export interface HeaderNavbarItem {
  title: string;
  type: HeaderNavbarItemTypeEnum;
  payload?: HeaderNavbarItemDropdown;
  href?: string;
  disabled?: boolean;
}
