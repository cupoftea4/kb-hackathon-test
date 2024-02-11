export type APIResponse<T> = {
  data: T;
  error?: string;
};

export type AuctionSearchParams = {
  name?: string
  charity?: string
  category?: string
}
