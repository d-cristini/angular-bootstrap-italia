import { Component, AfterViewInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// jQuery
declare var $: any;

// Models
import { FormDatePicker } from './form-date-picker';


@Component({
  selector: 'lib-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements AfterViewInit {
  @Input() field: FormDatePicker;
  @Input() form: FormGroup;

  @Input() valid: boolean;
  @Input() invalid: boolean;

  constructor() { }

  ngAfterViewInit(): void {
    $('.it-date-datepicker').datepicker({
      inputFormat: ['dd/MM/yyyy'],
      outputFormat: 'dd/MM/yyyy',
    });
  }

}
