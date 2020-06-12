import { Component, Input, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

// Form Models
import { FormRow } from '../form/form-row';

// Services
import { DynamicFormControlService } from './dynamic-form-control.service';


@Component({
  selector: 'lib-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicFormComponent implements OnInit {

  @Input() rows: FormRow<string>[] = [];
  @Input() defaultState: any;

  @Output() submitEvent = new EventEmitter();
  @Output() cancelEvent = new EventEmitter();

  form: FormGroup;
  payLoad = '';

  constructor(private qcs: DynamicFormControlService) {  }

  ngOnInit() {
    const elements = [].concat(...this.rows.map(e => e.items));
    this.form = this.qcs.toFormGroup(elements, this.defaultState);
  }

  onSubmit() {
    this.submitEvent.emit(this.form.getRawValue());
  }

  onCancel() {
    this.form.reset();
    this.cancelEvent.emit();
  }
}

