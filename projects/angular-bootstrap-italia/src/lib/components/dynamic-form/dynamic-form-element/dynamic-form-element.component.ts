import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

// Models
import { FormBase } from '../../form/form-base';


@Component({
  selector: 'lib-dynamic-form-element',
  templateUrl: './dynamic-form-element.component.html',
  styleUrls: ['./dynamic-form-element.component.scss']
})
export class DynamicFormElementComponent implements OnInit, OnDestroy {
  @Input() field: FormBase<string>;
  @Input() form: FormGroup;

  @Input() parentField: FormBase<string>;

  @Output() newInsertEvent = new EventEmitter();

  parentSubscription: Subscription;

  parentValue: object = null;

  constructor() { }

  ngOnInit(): void {
    if (this.field.parentFieldKey) {
      this.parentSubscription = this.form.get(this.field.parentFieldKey)
        .valueChanges
        .subscribe(newValue => {
          let validParent = false;

          if (this.form.get(this.field.parentFieldKey).valid && this.parentField?.controlType !== 'autocomplete') {
            validParent = true;
          } else if (this.form.get(this.field.parentFieldKey)?.value
            && typeof this.form.get(this.field.parentFieldKey).value === 'object'
            && Object.keys(this.form.get(this.field.parentFieldKey).value).length > 0) {
            validParent = true;
          }

          if (validParent) {
            if (this.form.get(this.field.key)?.disabled) {
              this.form.get(this.field.key).enable();
            }
          } else {
            if (this.form.get(this.field.key)?.enable) {
              this.form.get(this.field.key).reset();
              this.form.get(this.field.key).disable();
            }
          }

          this.parentValue  = newValue;
        });
    }
  }

  ngOnDestroy(): void {
    if (this.parentSubscription) {
      this.parentSubscription.unsubscribe();
    }
  }

  get isValid() {
    return this.form.controls[this.field.key].valid;
  }

  get isTouched() {
    return this.form.controls[this.field.key].touched;
  }

  get isDirty() {
    return this.form.controls[this.field.key].dirty;
  }

  get isPristine() {
    return this.form.controls[this.field.key].pristine;
  }

  emitNewInsert(event) {
    this.newInsertEvent.emit(event);
  }

}
