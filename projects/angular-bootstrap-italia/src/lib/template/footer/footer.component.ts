import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent {
  @Input() owner: string;
  @Input() appName: string;

  constructor() { }

}
