export type APIResponse<T> = {
  data: T;
  error?: string;
};

export type AuctionSearchParams = {
  charity?: string
  category?: string
}
