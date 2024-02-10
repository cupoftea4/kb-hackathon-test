import AuctionCard from "@/components/AuctionCard";
import HomeTop from "@/components/HomeTop";

const auction: Auction = {
  product: {
    name: "product name",
    category: "category",
  },
  bids: [],
  charity: true,
  currency: "USD",
  createdBy: {
    id: "id",
    name: "name",
    email: "email",
  },
};

export default function Home() {
  return (
    <main>
      <div className="max-w-screen-xl m-auto">
        <HomeTop />
        <div className="max-w-screen-md px-4">
          <AuctionCard auction={auction} />
        </div>
      </div>
    </main>
  );
}
