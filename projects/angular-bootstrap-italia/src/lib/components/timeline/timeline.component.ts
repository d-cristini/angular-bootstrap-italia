import { Component, OnInit, Input } from '@angular/core';

// jQuery
declare var $: any;

// Models
import { ITimeHistory } from './time-history.model';
import { IDictionary } from './dictionary.model';


@Component({
  selector: 'lib-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  @Input() timeHistory: ITimeHistory[];

  @Input() changesDictionary: IDictionary<string>;

  lastElem: {
    id: any,
    datetime: string,
    user: string,
    changes: object,
    changesName: string
  };

  timeline: {
    id: any,
    datetime: string,
    user: string,
    changes: object,
    changesName: string
  }[] = [];

  modalDetails: any[];

  constructor() { }

  ngOnInit(): void {
    const arrayLastElem = this.timeHistory[this.timeHistory.length - 1];
    this.lastElem = {
      id: arrayLastElem.id,
      datetime: arrayLastElem.datetime,
      changes: arrayLastElem.changes,
      user: arrayLastElem.user,
      changesName: arrayLastElem.changes ? this.getElemChanges(arrayLastElem.changes) : null
    };

    this.timeHistory.forEach((elem, index) => {
      if (index < this.timeHistory.length - 1) {
        this.timeline.push({
          id: elem.id,
          datetime: elem.datetime,
          user: elem.user,
          changes: elem.changes,
          changesName: elem.changes ? this.getElemChanges(elem.changes) : null
        });
      }
    });
  }

  openDetailModal(item) {
    const mainItemIndex = this.timeHistory.indexOf(this.timeHistory.find(elem => elem.id === item.id));
    const previusElem = mainItemIndex - 1 >= 0 ? this.timeline[mainItemIndex - 1] : null;

    this.modalDetails = [];

    const keys = Object.keys(item.changes);
    keys.forEach(key => {
      if (this.changesDictionary[key]) {
        this.modalDetails.push({
          key: this.changesDictionary[key],
          value: typeof item.changes[key] !== 'object'
            ? item.changes[key]
            : this.translateObject(item.changes[key]),
          oldValue: typeof item.changes[key] !== 'object'
            ? previusElem?.changes[key]
            : this.translateObject(previusElem?.changes[key]),
        });
      }
    });

    $('#timelineModal').modal('show');
  }

  private translateObject(obj) {
    if (obj) {
      const translatedObj = {};

      const keys = Object.keys(obj);
      keys.forEach(key => {
        if (this.changesDictionary[key]) {
          translatedObj[this.changesDictionary[key]] = obj[key];
        } else {
          translatedObj[key] = obj[key];
        }
      });

      return translatedObj;
    } else {
      return null;
    }
  }

  private getElemChanges(changes: object) {
    const transaltedKeys = [];

    const keys = Object.keys(changes);
    keys.forEach(key => {
      if (this.changesDictionary[key]) {
        transaltedKeys.push(this.changesDictionary[key]);
      }
    });

    return transaltedKeys.join(', ');
  }

}
