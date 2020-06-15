import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input() timeHistory: {
    datetime: string,
    user: string,
    changes: object
  }[];

  lastElem: {
    datetime: string,
    user: string,
    changes: object,
    changesName: string
  };

  timeline: {
    datetime: string,
    user: string,
    changes: object,
    changesName: string
  }[];

  constructor() { }

  ngOnInit(): void {
    const arrayLastElem = this.timeHistory[this.timeHistory.length - 1];
    this.lastElem = {
      datetime: arrayLastElem.datetime,
      changes: arrayLastElem.changes,
      user: arrayLastElem.user,
      changesName: arrayLastElem.changes ? Object.keys(arrayLastElem.changes).join(', ') : null
    };

    this.timeHistory.pop();
    this.timeline = this.timeHistory.map(elem => {
      return {
        datetime: elem.datetime,
        user: elem.user,
        changes: elem.changes,
        changesName: elem.changes ? Object.keys(elem.changes).join(', ') : null
      };
    });
  }

}
