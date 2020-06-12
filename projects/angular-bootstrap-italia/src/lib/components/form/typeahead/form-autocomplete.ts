import { FormBase } from '../form-base';

// Models
import { AsyncSearchParams } from './async-search-params.model';

export class FormAutocomplete extends FormBase<string> {
  controlType = 'autocomplete';
  options: { key: string, value: string }[] = [];
  asyncParams: AsyncSearchParams;

  constructor(options: {} = {}, asyncParams: AsyncSearchParams) {
    super(options);
    // tslint:disable-next-line: no-string-literal
    this.options = options['options'] || [];
    this.asyncParams = asyncParams;
  }
}
