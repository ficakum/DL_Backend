export type ItemsPage<T> = {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalCount: number;
};

export type Tokens = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
};
