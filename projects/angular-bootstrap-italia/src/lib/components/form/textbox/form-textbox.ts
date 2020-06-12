import { FormBase } from '../form-base';

export class FromTextbox extends FormBase<string> {
  controlType = 'textbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    // tslint:disable-next-line: no-string-literal
    this.type = options['type'] || '';
  }
}
