import { Component, AfterViewInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// jQuery
declare var $: any;

// Models
import { FormDropdown } from './form-dropdown';


@Component({
  selector: 'lib-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements AfterViewInit {
  @Input() field: FormDropdown;
  @Input() form: FormGroup;

  @Input() valid: boolean;
  @Input() invalid: boolean;

  constructor() { }

  ngAfterViewInit(): void {
    $('.custom-select').selectpicker();
  }

  getFormattedValue(value: any) {
    if (this.field.formattedValueKey && typeof value === 'object') {
      return value[this.field.formattedValueKey];
    } else {
      return value;
    }
  }

}
