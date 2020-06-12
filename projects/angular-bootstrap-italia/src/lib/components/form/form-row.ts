import { FormBase } from './form-base';

export class FormRow<T> {
  id: number;
  items: FormBase<T>[];
}
