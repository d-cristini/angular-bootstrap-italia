import { FormRow } from '../form/form-row';

export class StepperElement<T> {
  index: number;
  label: string;
  fromRows: FormRow<T>[];
  mapId?: string;
}
