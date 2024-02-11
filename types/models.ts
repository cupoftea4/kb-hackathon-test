type Bid = {
  _id: string;
  amount: number;
  createdBy: User; 
  createdAt: Date;
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
  _id: string;
  product: Product;
  bids: string[];
  charity: boolean;
  currency: string;
  createdBy: User; 
  createdAt?: Date;
  updatedAt?: Date;
}

type AuctionWithBids =  Omit<Auction, 'bids'>  & { bids: Bid[] };
