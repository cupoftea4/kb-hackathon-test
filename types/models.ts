type Bid = {
  _id: string;
  amount: number;
  createdBy: User; 
  createdAt: string;
}

type User = {
  id: string;
  name: string;
  email: string;
}

type AuctionCategory = {
  _id: string;
  name: string;
}

type Product = {
  name: string;
  category: AuctionCategory;
  pictureUrl?: string;
}

type Auction = {
  _id: string;
  product: Product;
  bids: string[];
  charity: boolean;
  currency: string;
  createdBy: User; 
  createdAt?: string;
  updatedAt?: string;
}

type AuctionWithBids =  Omit<Auction, 'bids'>  & { bids: Bid[] };
