import { FormBase } from '../form-base';

export class FormDropdown extends FormBase<string> {
  controlType = 'dropdown';
  options: { key: string, value: any }[] = [];

  constructor(options: {} = {}) {
    super(options);
    // tslint:disable-next-line: no-string-literal
    this.options = options['options'] || [];
  }
}
