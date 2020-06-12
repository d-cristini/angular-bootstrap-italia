import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Models
import { FromCheckbox } from './form-checkbox';


@Component({
  selector: 'lib-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent {
  @Input() field: FromCheckbox;
  @Input() form: FormGroup;

  @Input() valid: boolean;
  @Input() invalid: boolean;

  constructor() { }

}
