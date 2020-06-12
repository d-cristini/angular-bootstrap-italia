import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { FormBase } from '../form/form-base';


@Injectable()
export class DynamicFormControlService {
  constructor() { }

  toFormGroup(fields: FormBase<any>[], defaultState: any = null) {
    const group: any = {};

    fields.forEach(field => {
      let defaultValue;

      if (typeof field.value === 'boolean') {
        defaultValue = false;
      } else {
        defaultValue = '';
      }

      if (defaultState) {
        defaultValue = defaultState[field.key];
      }

      group[field.key] = field.required ?
        new FormControl({ value: field.value || defaultValue, disabled: field.disabled }, Validators.required)
        : new FormControl({ value: field.value || defaultValue, disabled: field.disabled });
    });
    return new FormGroup(group);
  }
}
