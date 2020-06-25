import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { SelectComponent } from './select/select.component';
import { TextboxComponent } from './textbox/textbox.component';
import { TextboxNumberComponent } from './textbox-number/textbox-number.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { TextareaComponent } from './textarea/textarea.component';
import { ValidationMessagesComponent } from './validation-messages/validation-messages.component';

// Services
import { TypeaheadSearchService } from './typeahead/typeahead-search.service';
import { DatePickerComponent } from './date-picker/date-picker.component';


@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    TypeaheadComponent,
    SelectComponent,
    TextboxComponent,
    TextboxNumberComponent,
    CheckboxComponent,
    TextareaComponent,
    ValidationMessagesComponent,
    DatePickerComponent
  ],
  exports: [
    TypeaheadComponent,
    SelectComponent,
    TextboxComponent,
    TextboxNumberComponent,
    CheckboxComponent,
    TextareaComponent,
    ValidationMessagesComponent,
    DatePickerComponent
  ],
  providers: [TypeaheadSearchService]
})
export class FormComponentsModule {
  constructor() {
  }
}
