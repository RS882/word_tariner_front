import {Component, EventEmitter, Input, Output} from '@angular/core';
import {PaginationInterface} from "../../data/interfaces/pagination.interface";
import {getUUID} from "../../utilites/uuid.utilites";

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Input() pagination: PaginationInterface | null = null;
  @Output() nextPageNumberEvent = new EventEmitter<number>();

  sendNextPageNumber(num: number): void {
    this.nextPageNumberEvent.emit(num);
  }

  getStartPrevPages(): number [] {
    if (this.pagination) {
      const page = this.pagination.pageNumber + 1;
      if (page < 2) return []
      return page === 2 ? [1] : [1, 2];
    } else {
      return []
    }
  }

  getEndPrevPages(): number [] {
    if (this.pagination) {
      const page = this.pagination.pageNumber + 1;
      if (page <=  3) return []
      return page === 4 ? [3] : [page - 2, page - 1];
    } else {
      return []
    }
  }

  getStartNextPages(): number [] {
    if (this.pagination) {
      const totalPages = this.pagination.totalPages;
      const page = this.pagination.pageNumber + 1;
      if (page> totalPages-1) return []
      return page === totalPages - 1 ? [totalPages] : [totalPages-1, totalPages];
    } else {
      return []
    }
  }

  getEndNextPages(): number [] {
    if (this.pagination) {
      const totalPages = this.pagination.totalPages;
      const page = this.pagination.pageNumber + 1;
      if (page>= totalPages-2) return []
      return page === totalPages - 3 ? [totalPages-2] : [page +1, page +2];
    } else {
      return []
    }
  }
  protected readonly getUUID = getUUID;

}

// pageNumber: number;
// pageSize: number;
// totalElements: number;
// totalPages: number;
// last:boolean;
// first: boolean;
