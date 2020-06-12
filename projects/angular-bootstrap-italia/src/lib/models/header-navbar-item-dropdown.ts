export interface HeaderNavbarItemDropdown {
  heading?: string;
  elements: HeaderNavbarItemDropdownElement[];
}

interface HeaderNavbarItemDropdownElement {
  title?: string;
  href?: string;
  isDivider?: boolean;
  disabled?: boolean;
}
