import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  @Input() confirmMessage: string;

  constructor() { }

  ngOnInit(): void {
  }

}
