import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Models
import { FromTextboxNumber } from './form-textbox-number';


@Component({
  selector: 'lib-textbox-number',
  templateUrl: './textbox-number.component.html',
  styleUrls: ['./textbox-number.component.scss']
})
export class TextboxNumberComponent implements OnInit {
  @Input() field: FromTextboxNumber;
  @Input() form: FormGroup;

  @Input() valid: boolean;
  @Input() invalid: boolean;

  @Input() min: number;
  @Input() max: number;

  constructor() { }

  ngOnInit(): void {
    if (this.field.value) {
      this.form.get(this.field.key).setValue(this.field.value);
    } else if (this.min > 0) {
      this.form.get(this.field.key).setValue(this.min);
    } else {
      this.form.get(this.field.key).setValue(0);
    }
  }

  increseValue(event) {
    event.stopPropagation();

    const oldValue: number = this.form.get(this.field.key).value || 0;
    const newValue = oldValue + 1;

    if (this.max === null || newValue <= this.max) {
      this.form.get(this.field.key).setValue(newValue);
    }
  }

  decreseValue(event) {
    event.stopPropagation();

    const oldValue: number = this.form.get(this.field.key).value || 0;
    const newValue = oldValue - 1;

    if (this.min === null || newValue >= this.min) {
      this.form.get(this.field.key).setValue(newValue);
    }
  }

}
