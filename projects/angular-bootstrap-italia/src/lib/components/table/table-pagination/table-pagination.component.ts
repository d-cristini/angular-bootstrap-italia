import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';

// Models
import { IPagination } from './pagination.model';


@Component({
  selector: 'lib-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit, OnChanges {

  @Input() currentPagination: IPagination;
  @Output() paginationChange = new EventEmitter();

  pages = [];
  currentPageRound = [];

  constructor() { }

  ngOnInit(): void {
    this.setPageRound(1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentPagination) {
      this.setPageRound(this.currentPagination.currentPage);
    }
  }

  setPage(page: number) {
    this.currentPagination.currentPage = page;
    this.setPageRound(page);
    this.paginationChange.emit( { page: this.currentPagination.currentPage, pageSize: this.currentPagination.pageSize });
  }

  nextPage() {
    const newCurrentPage = this.currentPagination.currentPage + 1;
    if (this.pages.find(elem => elem.page === newCurrentPage)) {
      this.currentPagination.currentPage = newCurrentPage;
      this.setPageRound(newCurrentPage);
      this.paginationChange.emit( { page: this.currentPagination.currentPage, pageSize: this.currentPagination.pageSize });
    }
  }

  previousPage() {
    const newCurrentPage = this.currentPagination.currentPage - 1;
    if (this.pages.find(elem => elem.page === newCurrentPage)) {
      this.currentPagination.currentPage = newCurrentPage;
      this.setPageRound(newCurrentPage);
      this.paginationChange.emit( { page: this.currentPagination.currentPage, pageSize: this.currentPagination.pageSize });
    }
  }

  changePageSize(newPageSizeValue: number) {
    this.currentPagination.pageSize = newPageSizeValue;
    this.paginationChange.emit( { page: 1, pageSize: this.currentPagination.pageSize });
  }

  private setPageRound(currentPage: number) {
    this.pages = [];

    if (this.currentPagination.totalPages > 7) {
      const lower = currentPage - 2 > 1 ? currentPage - 2 : 2;
      const max = currentPage + 2 < this.currentPagination.totalPages ? currentPage + 2 : this.currentPagination.totalPages - 1;

      // Inserisci primo elemento
      this.pages.push({ separator: false, page: 1 });

      // Seprator
      if (lower > 2) {
        this.pages.push({ separator: true });
      }

      // Round
      const minNext = currentPage > this.currentPagination.totalPages - 4 ? this.currentPagination.totalPages - 4 : lower;
      const maxNext = lower > 2 ? max : lower + 3;
      for (let i = minNext; i <= maxNext; i++) {
        this.pages.push(
          {
            separator: false,
            page: i
          }
        );
      }

      // Seprator
      if (max < this.currentPagination.totalPages - 1) {
        this.pages.push({ separator: true });
      }

      // Inserisci ultimo elemento
      this.pages.push({ separator: false, page: this.currentPagination.totalPages });
    } else {
      for (let i = 1; i <= this.currentPagination.totalPages; i++) {
        this.pages.push(
          {
            separator: false,
            page: i
          }
        );
      }
    }
  }

}
