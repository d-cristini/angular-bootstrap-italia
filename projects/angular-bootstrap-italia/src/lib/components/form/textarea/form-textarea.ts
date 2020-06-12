import { FormBase } from '../form-base';

export class FromTextarea extends FormBase<string> {
  controlType = 'textarea';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    // tslint:disable-next-line: no-string-literal
    this.type = options['type'] || '';
  }
}
