import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'lib-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  @Input() isLoading: boolean;
  @Output() formSubmit = new EventEmitter<{email: string, password: string}>();

  constructor() { }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.formSubmit.emit({ email, password });

    form.reset();
  }

}
