export type ItemsPage<T> = {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
};
