export interface PaginationInterface{
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last:boolean;
  first: boolean;
}
