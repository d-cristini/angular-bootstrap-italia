import { FormBase } from '../form-base';

export class FromTextboxNumber extends FormBase<string> {
  controlType = 'textbox-number';
  type: string;
  min: number;
  max: number;

  constructor(options: {} = {}) {
    super(options);
    // tslint:disable-next-line: no-string-literal
    this.type = options['type'] || '';
    // tslint:disable-next-line: no-string-literal
    this.min = options['min'] || options['min'] === 0 ? options['min'] : null;
    // tslint:disable-next-line: no-string-literal
    this.max = options['max'] || options['max'] === 0 ? options['max'] : null;
  }
}
