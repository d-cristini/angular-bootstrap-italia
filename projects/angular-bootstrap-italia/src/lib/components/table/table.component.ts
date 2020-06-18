import { Component, Input, EventEmitter, Output, OnInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

// Models
import { IPagination } from './table-pagination/pagination.model';


@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges, OnDestroy {

  @Input() columns: string[];
  @Input() detailUpdate: boolean;
  @Input() $rows: Observable<any[]>;
  @Input() pagination: IPagination;

  @Output() paginationChange = new EventEmitter();
  @Output() detailSelected = new EventEmitter();

  loading: boolean;
  loadingSub: Subscription;

  constructor() { }

  ngOnInit(): void {
     // start loading
     this.loading = true;

     // check result
     this.loadingSub = this.$rows.subscribe(newValue => {
       if (newValue) {
         this.loading = false;
       }
     });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pagination) {
      this.loading = false;
    }
  }

  ngOnDestroy(): void {
    if (this.loadingSub) {
      this.loadingSub.unsubscribe();
    }
  }

  emitNewPagination(newPagination: IPagination) {
    this.loading = true;
    this.paginationChange.emit(newPagination);
  }

  getElemKeys(elem: object) {
    return Object.keys(elem);
  }

  onDetail(rowElem: object) {
    this.detailSelected.emit(rowElem);
  }

}
