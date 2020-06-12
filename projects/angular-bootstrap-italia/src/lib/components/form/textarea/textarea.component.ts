import { Component, Input } from '@angular/core';

// Models
import { FromTextarea } from './form-textarea';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'lib-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent {
  @Input() field: FromTextarea;
  @Input() form: FormGroup;

  @Input() valid: boolean;
  @Input() invalid: boolean;

  constructor() { }

  get isActive() {
    return this.form.controls[this.field.key].value;
  }

}
