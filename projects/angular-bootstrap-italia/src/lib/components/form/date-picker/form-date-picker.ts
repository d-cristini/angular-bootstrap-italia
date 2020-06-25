import { FormBase } from '../form-base';

export class FormDatePicker extends FormBase<string> {
  controlType = 'datepicker';

  constructor(options: {} = {}) {
    super(options);
  }
}
