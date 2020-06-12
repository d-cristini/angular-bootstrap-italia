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

  constructor() { }

  ngOnInit(): void {
  }

  openModal() {
    $('#libModal').modal('show');
  }

}
