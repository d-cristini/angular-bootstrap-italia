import { Component, Input } from '@angular/core';

// Models
import { FormBase } from '../form-base';


@Component({
  selector: 'lib-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.scss']
})
export class ValidationMessagesComponent {
  @Input() field: FormBase<string>;

  @Input() valid: boolean;
  @Input() invalid: boolean;

  constructor() { }
}
