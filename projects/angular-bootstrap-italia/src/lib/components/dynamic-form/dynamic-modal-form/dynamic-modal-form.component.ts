import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Models
import { FormRow } from '../../form/form-row';

// Services
import { DynamicFormControlService } from '../dynamic-form-control.service';


@Component({
  selector: 'lib-dynamic-modal-form',
  templateUrl: './dynamic-modal-form.component.html',
  styleUrls: ['./dynamic-modal-form.component.scss']
})
export class DynamicModalFormComponent implements OnInit {

  @Input() rows: FormRow<string>[] = [];
  @Input() defaultState: any;

  @Output() submitEvent = new EventEmitter();

  form: FormGroup;

  needConfirm: boolean;

  constructor(private qcs: DynamicFormControlService) { }

  ngOnInit() {
    this.needConfirm = false;

    const elements = [].concat(...this.rows.map(e => e.items));
    this.form = this.qcs.toFormGroup(elements, this.defaultState);
  }

  toggleConfirm(state: boolean) {
    this.needConfirm = state;
  }

  get flatValues() {
    const formKeys = Object.keys(this.form.getRawValue());
    const elements = [].concat(...this.rows.map(e => e.items));

    return formKeys.map(key => {
      let value;
      if (typeof this.form.get(key).value !== 'object') {
        value = this.form.get(key).value;
      } else {
        const elemKey = elements.find(elem => elem.key === key)?.asyncParams?.searchField
          || elements.find(elem => elem.key === key).formattedValueKey;

        value = this.form.get(key).value[elemKey];
      }

      return {
        label: elements.find(elem => elem.key === key).label,
        value
      };
    });
  }

  onSubmit() {
    this.submitEvent.emit(this.form.getRawValue());
  }

}
