export type APIResponse<T> = {
  data: T;
  error?: string;
};

export type AuctionSearchParams = {
  query?: string
  charity?: string
  category?: string
}
