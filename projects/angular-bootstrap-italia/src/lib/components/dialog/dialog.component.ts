import { Component, OnInit, Input } from '@angular/core';

// jQuery
declare var $: any;


@Component({
  selector: 'lib-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  @Input() buttonLabel: string;
  @Input() modalTitle: string;
  @Input() modalId: string;

  constructor() { }

  ngOnInit(): void {
    if (!this.modalId) {
      this.modalId = 'libModal';
    }
  }

  openModal() {
    $('#' + this.modalId).modal('show');
  }

  closeModal() {
    $('#' + this.modalId).modal('hide');
  }

}
