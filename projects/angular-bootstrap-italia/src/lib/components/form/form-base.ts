export class FormBase<T> {
  value: T;
  key: string;
  parentFieldKey: string;
  parentFieldFilterKey: string;
  parentShowCondition: {
    parentKey: string;
    parentValue: any;
  };
  formattedValueKey: string;
  label: string;
  required: boolean;
  disabled: boolean;
  order: number;
  controlType: string;
  type: string;
  class: string;
  options: { key: string, value: any }[];
  validMessage: string;
  invalidMessage: string;

  min: number;
  max: number;

  constructor(options: {
    value?: T,
    key?: string,
    parentFieldKey?: string,
    parentFieldFilterKey?: string,
    parentShowCondition?: {
      parentKey: string,
      parentValue: any,
    },
    formattedValueKey?: string,
    label?: string,
    required?: boolean,
    disabled?: boolean,
    order?: number,
    controlType?: string,
    type?: string,
    class?: string,
    validMessage?: string,
    invalidMessage?: string,
    min?: number,
    max?: number
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.parentFieldKey = options.parentFieldKey || null;
    this.parentFieldFilterKey = options.parentFieldFilterKey || null;
    this.parentShowCondition = options.parentShowCondition || null;
    this.formattedValueKey = options.formattedValueKey || null;
    this.label = options.label || '';
    this.required = !!options.required;
    this.disabled = options.disabled || false;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.class = options.class || '';
    this.validMessage = options.validMessage || '';
    this.invalidMessage = options.invalidMessage || '';
    this.min = options.min || null;
    this.max = options.max || null;
  }
}
