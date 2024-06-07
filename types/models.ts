type Bid = {
  _id: string;
  amount: number;
  createdBy: User;
  createdAt: string;
};

type User = {
  id: string;
  name: string;
  email: string;
};

type AuctionCategory = {
  _id: string;
  name: string;
};

type Product = {
  name: string;
  category: AuctionCategory;
  description: string;
  pictureUrl?: string;
};

type Auction = {
  _id: string;
  product: Product;
  bids: string[];
  charity: boolean;
  minPrice?: number;
  minBidStep?: number;
  currentMaxBidPrice?: number;
  closeDate?: string;
  currency: string;
  createdBy: User;
  createdAt?: string;
  updatedAt?: string;
  picture?: {
    url: string;
    type: string;
  }
};

type AuctionWithBids = Omit<Auction, 'bids'> & { bids: Bid[] };
