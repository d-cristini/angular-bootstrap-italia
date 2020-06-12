import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormControlService } from './dynamic-form-control.service';
import { DynamicFormElementComponent } from './dynamic-form-element/dynamic-form-element.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

// Modules
import { FormComponentsModule } from '../form/form-components.module';
import { DynamicModalFormComponent } from './dynamic-modal-form/dynamic-modal-form.component';


@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormComponentsModule],
  declarations: [DynamicFormComponent, DynamicFormElementComponent, DynamicModalFormComponent, ConfirmDialogComponent],
  providers: [DynamicFormControlService],
  exports: [DynamicFormComponent, DynamicFormElementComponent, DynamicModalFormComponent, ConfirmDialogComponent]
})
export class DynamicFormModule {
  constructor() {
  }
}
