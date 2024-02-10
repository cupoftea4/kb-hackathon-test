type Bid = {
  id: string;
  amount: number;
  createdBy: User; 
}

type User = {
  id: string;
  name: string;
  email: string;
}

type Product = {
  name: string;
  category: string;
  pictureUrl?: string;
}

type Auction = {
  product: Product;
  bids: string[];
  charity: boolean;
  currency: string;
  createdBy: User; 
  createdAt?: Date;
  updatedAt?: Date;
}

type AuctionWithBids = Auction & { bids: Bid[] };
