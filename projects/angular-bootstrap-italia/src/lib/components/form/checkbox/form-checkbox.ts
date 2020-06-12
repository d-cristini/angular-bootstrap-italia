import { FormBase } from '../form-base';

export class FromCheckbox extends FormBase<boolean> {
  controlType = 'checkbox';
  type: string;

  constructor(options: {} = {}) {
    super(options);
    // tslint:disable-next-line: no-string-literal
    this.type = options['type'] || '';
  }
}
