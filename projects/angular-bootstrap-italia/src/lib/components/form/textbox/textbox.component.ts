import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Models
import { FromTextbox } from './form-textbox';


@Component({
  selector: 'lib-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent {
  @Input() field: FromTextbox;
  @Input() form: FormGroup;

  @Input() valid: boolean;
  @Input() invalid: boolean;

  activeLabel = false;

  constructor() { }

  get isActive() {
    return this.form.controls[this.field.key].value;
  }

}
