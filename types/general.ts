export type APIErrorResponse<T> = {
  message: string
};

export type AuctionSearchParams = {
  name?: string
  charity?: string
  category?: string
}

export type ApiAttachment = {
  id: number;
  path?: string;
  data?: any;
  fileType: string;
  name: string;
}
